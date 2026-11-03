import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import {
  BRAND_IDENTITY,
  createEarlyAccessConfirmation,
  validateEarlyAccessInput,
  type SilhouettePreference,
} from './src/domain/lirisDropData';

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte(),
    {
      name: 'liris-cloudflare-worker-dev-bridge',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/health' && req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                ok: true,
                domain: BRAND_IDENTITY.domain,
                brand: BRAND_IDENTITY.name,
                tagline: BRAND_IDENTITY.tagline,
              }),
            );
            return;
          }

          if (req.url === '/api/early-access' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const payload = JSON.parse(body || '{}') as {
                  email?: string;
                  preference?: SilhouettePreference;
                };
                const input = {
                  email: String(payload.email ?? ''),
                  preference: payload.preference ?? 'All Editions',
                };
                const validation = validateEarlyAccessInput(input);
                res.setHeader('Content-Type', 'application/json');
                if (!validation.valid) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ ok: false, errors: validation.errors }));
                  return;
                }
                const confirmation = createEarlyAccessConfirmation(
                  input,
                  1,
                  new Date().toISOString(),
                );
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, confirmation }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false }));
              }
            });
            return;
          }

          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
