import {
  BRAND_IDENTITY,
  SilhouettePreference,
  createEarlyAccessConfirmation,
  validateEarlyAccessInput,
} from '../domain/lirisDropData';

export interface KVNamespaceBinding {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
}

export interface D1DatabaseBinding {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      run: () => Promise<unknown>;
      all: () => Promise<{ results?: unknown[] }>;
    };
  };
}

export interface R2BucketBinding {
  get: (key: string) => Promise<{
    body: unknown;
    httpMetadata?: { contentType?: string };
    arrayBuffer: () => Promise<ArrayBuffer>;
  } | null>;
}

export interface Env {
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
  LIRIS_CLEARANCE_KV?: KVNamespaceBinding;
  LIRIS_ARCHIVE_DB?: D1DatabaseBinding;
  LIRIS_LOOKBOOK_R2?: R2BucketBinding;
  PUBLIC_SITE_URL?: string;
  FORWARD_TO?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_PRICE_ID_FOUNDERS_PASS?: string;
}

// Inbound email (Cloudflare Email Workers) — minimal structural type
interface EmailMessageLike {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  headers: { get: (name: string) => string | null };
  forward?: (address: string) => Promise<void>;
  reply?: (message: unknown) => Promise<void>;
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': 'https://liris.world',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
};

// Security headers applied to every response (edge-hardening; WAF does the rest)
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(body: unknown, status = 200): Response {
  return withSecurityHeaders(
    new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...CORS_HEADERS,
      },
    }),
  );
}

/** Fixed-window rate limit (5 req / 60s per IP) on the signup endpoint, via KV. */
async function rateLimited(request: Request, env: Env): Promise<boolean> {
  if (!env.LIRIS_CLEARANCE_KV) return false; // fail open when unbound
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const minute = Math.floor(Date.now() / 60000);
  const key = `ratelimit:early-access:${ip}:${minute}`;
  const current = await env.LIRIS_CLEARANCE_KV.get(key);
  const count = current ? Number(current) : 0;
  if (count >= 5) return true;
  await env.LIRIS_CLEARANCE_KV.put(key, String(count + 1), { expirationTtl: 120 });
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...CORS_HEADERS, ...SECURITY_HEADERS } });
    }

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return jsonResponse({
        ok: true,
        domain: BRAND_IDENTITY.domain,
        brand: BRAND_IDENTITY.name,
        tagline: BRAND_IDENTITY.tagline,
        stripeConfigured: Boolean(env.STRIPE_SECRET_KEY),
        emailRouting: Boolean(env.FORWARD_TO),
      });
    }

    if (url.pathname === '/api/early-access' && request.method === 'POST') {
      if (await rateLimited(request, env)) {
        return jsonResponse({ ok: false, errors: { email: 'Too many attempts. Try again shortly.' } }, 429);
      }
      try {
        const payload = (await request.json()) as {
          email?: string;
          preference?: SilhouettePreference;
          utm_source?: string;
          utm_medium?: string;
          utm_campaign?: string;
        };
        const input = {
          email: String(payload.email ?? ''),
          preference: payload.preference ?? 'All Editions',
        };
        const validation = validateEarlyAccessInput(input);
        if (!validation.valid) {
          return jsonResponse({ ok: false, errors: validation.errors }, 400);
        }

        const utm = {
          source: String(payload.utm_source ?? ''),
          medium: String(payload.utm_medium ?? ''),
          campaign: String(payload.utm_campaign ?? ''),
        };

        const confirmation = createEarlyAccessConfirmation(
          input,
          1,
          new Date().toISOString(),
        );

        // Persist clearance record in Cloudflare KV & D1 when bound
        if (env.LIRIS_CLEARANCE_KV) {
          await env.LIRIS_CLEARANCE_KV.put(
            `clearance:${confirmation.email}`,
            JSON.stringify({ ...confirmation, utm }),
          );
        }
        if (env.LIRIS_ARCHIVE_DB) {
          await env.LIRIS_ARCHIVE_DB.prepare(
            'INSERT OR REPLACE INTO clearances (email, access_key, preference, issued_at, utm_source, utm_medium, utm_campaign) VALUES (?, ?, ?, ?, ?, ?, ?)',
          )
            .bind(
              confirmation.email,
              confirmation.accessKey,
              confirmation.preference,
              confirmation.issuedAtIso,
              utm.source,
              utm.medium,
              utm.campaign,
            )
            .run();
        }

        return jsonResponse({ ok: true, confirmation }, 200);
      } catch {
        return jsonResponse(
          { ok: false, errors: { email: 'Unable to process request.' } },
          400,
        );
      }
    }

    if (url.pathname === '/api/stripe/checkout' && request.method === 'POST') {
      if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID_FOUNDERS_PASS) {
        return jsonResponse(
          {
            ok: false,
            mode: 'standby',
            message: 'Priority Gate opens 24h prior to release.',
          },
          200,
        );
      }

      const siteUrl = env.PUBLIC_SITE_URL || BRAND_IDENTITY.canonicalUrl;
      const params = new URLSearchParams({
        mode: 'payment',
        'line_items[0][price]': env.STRIPE_PRICE_ID_FOUNDERS_PASS,
        'line_items[0][quantity]': '1',
        success_url: `${siteUrl}/?access=confirmed`,
        cancel_url: `${siteUrl}/#access`,
      });

      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const sessionData = (await stripeRes.json()) as { url?: string; error?: { message?: string } };
      if (!stripeRes.ok || !sessionData.url) {
        return jsonResponse(
          { ok: false, message: sessionData.error?.message ?? 'Session error' },
          502,
        );
      }

      return jsonResponse({ ok: true, checkoutUrl: sessionData.url });
    }

    // Lookbook / brand-suite assets served from R2 when bound
    if (url.pathname.startsWith('/assets/lookbook/') && env.LIRIS_LOOKBOOK_R2) {
      const key = url.pathname.replace('/assets/lookbook/', '');
      const object = await env.LIRIS_LOOKBOOK_R2.get(key);
      if (object) {
        const headers = new Headers();
        headers.set('Content-Type', object.httpMetadata?.contentType ?? 'application/octet-stream');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return withSecurityHeaders(new Response(object.body as BodyInit, { status: 200, headers }));
      }
      return jsonResponse({ ok: false, message: 'Not found' }, 404);
    }

    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      return withSecurityHeaders(response);
    }

    return jsonResponse({ ok: false, message: 'Not Found' }, 404);
  },

  /**
   * Inbound email collection (Cloudflare Email Routing → this Worker).
   * Stores every message in D1 + KV, then forwards to FORWARD_TO when set.
   */
  async email(message: EmailMessageLike, env: Env, ctx: { waitUntil: (p: Promise<unknown>) => void }): Promise<void> {
    const record = {
      from: message.from,
      to: message.to,
      subject: message.subject ?? '',
      text: (message.text ?? '').slice(0, 4000),
      receivedAt: new Date().toISOString(),
      messageId: message.headers.get('message-id') ?? '',
    };
    ctx.waitUntil((async () => {
      if (env.LIRIS_ARCHIVE_DB) {
        await env.LIRIS_ARCHIVE_DB.prepare(
          'INSERT INTO emails (from_addr, to_addr, subject, body, received_at, message_id) VALUES (?, ?, ?, ?, ?, ?)',
        )
          .bind(record.from, record.to, record.subject, record.text, record.receivedAt, record.messageId)
          .run();
      }
      if (env.LIRIS_CLEARANCE_KV) {
        await env.LIRIS_CLEARANCE_KV.put(`email:${record.receivedAt}:${record.messageId}`, JSON.stringify(record));
      }
      if (env.FORWARD_TO && message.forward) {
        await message.forward(env.FORWARD_TO);
      }
    })());
  },
};
