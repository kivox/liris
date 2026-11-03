/**
 * Client-side download helpers for the LIRIS brand suite.
 * SVG exports serialize the live DOM <svg> with computed colors baked in
 * (currentColor / CSS vars resolved), so files render standalone.
 * PNG exports rasterize via canvas at 2x over the theme background.
 */

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Clone the live svg and bake computed colors so currentColor / var() resolve standalone. */
function exportableSvg(svg: SVGSVGElement, withBackground: boolean): SVGSVGElement {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  if (!clone.getAttribute('viewBox')) {
    clone.setAttribute('viewBox', `0 0 ${svg.getAttribute('width') ?? 100} ${svg.getAttribute('height') ?? 100}`);
  }
  // root color drives currentColor inheritance when rendered standalone
  const cs = getComputedStyle(svg);
  clone.setAttribute('style', `color:${cs.color};background:${withBackground ? cs.getPropertyValue('--bg-void').trim() || 'transparent' : 'transparent'}`);
  if (withBackground) {
    const vb = clone.viewBox.baseVal;
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', String(vb.x));
    bg.setAttribute('y', String(vb.y));
    bg.setAttribute('width', String(vb.width));
    bg.setAttribute('height', String(vb.height));
    bg.setAttribute('fill', cs.getPropertyValue('--bg-void').trim() || '#050508');
    clone.insertBefore(bg, clone.firstChild);
  }
  // resolve var(--...) / currentColor attrs element-by-element from the live tree
  const liveEls = svg.querySelectorAll('*');
  const cloneEls = clone.querySelectorAll('*');
  liveEls.forEach((live, i) => {
    const target = cloneEls[i] as SVGElement;
    if (!target) return;
    const lcs = getComputedStyle(live as Element);
    for (const attr of ['fill', 'stroke']) {
      const v = target.getAttribute(attr);
      if (v && (v.includes('var(') || v === 'currentColor')) {
        target.setAttribute(attr, attr === 'fill' ? lcs.fill : lcs.stroke);
      }
    }
  });
  return clone;
}

export function downloadSvgByLabel(labelPart: string, filename: string): void {
  const svg = document.querySelector<SVGSVGElement>(`svg[aria-label*="${labelPart}"]`);
  if (!svg) return;
  const source = new XMLSerializer().serializeToString(exportableSvg(svg, true));
  triggerDownload(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }), filename);
}

export async function downloadPngByLabel(labelPart: string, filename: string, scale = 2): Promise<void> {
  const svg = document.querySelector<SVGSVGElement>(`svg[aria-label*="${labelPart}"]`);
  if (!svg) return;
  const vb = svg.viewBox.baseVal;
  const w = Math.max(1, Math.round(vb.width * scale));
  const h = Math.max(1, Math.round(vb.height * scale));
  const source = new XMLSerializer().serializeToString(exportableSvg(svg, true));
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('rasterize failed'));
    img.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (blob) triggerDownload(blob, filename);
}

export async function downloadFile(url: string, filename: string): Promise<void> {
  const res = await fetch(url);
  const blob = await res.blob();
  triggerDownload(blob, filename);
}
