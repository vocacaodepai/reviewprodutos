/**
 * Descoberta e validação de imagens reais de produtos da Amazon.com.br a partir do ASIN.
 *
 * Ordem de preferência (ver docs/PADRAO-EDITORIAL.md → Política de imagens):
 *  1. Creators API da Amazon (quando a conta atingir 10 vendas/30 dias) — a implementar em scripts/lib/creators-api.mjs.
 *  2. Snapshot público da Wayback Machine da página do produto → URL "hiRes" (m.media-amazon.com/images/I/...),
 *     exibida por LINK DIRETO no site (nunca baixada, cacheada ou derivada).
 *  3. Página do produto ao vivo, com user-agent identificado "Agent/reviewprodutos" (sem burlar bloqueios; se a Amazon negar, desistimos).
 *  4. Miniatura por ASIN (images/P/ASIN.01._SL500_.jpg) — baixa resolução (~160px), último recurso.
 * A validação baixa a imagem apenas em memória para checar HTTP 200/dimensões; nada é gravado em disco.
 * AVISO: o Contrato Operacional só autoriza imagens via API/links fornecidos pela Amazon. Enquanto a API não estiver
 * disponível, prefira imagens oficiais do fabricante (imagem.fonte: fabricante) sempre que o redator encontrar.
 */
import sharp from 'sharp';

// Licença de PI do Programa de Associados BR: agentes automatizados devem se identificar como "Agent/<nome>" e nunca burlar CAPTCHA.
const UA = 'Agent/reviewprodutos (+https://reviewprodutos.com.br; contato@reviewprodutos.com.br)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, { timeout = 25000, headers = {} } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'pt-BR,pt;q=0.9', ...headers }, redirect: 'follow', signal: ctrl.signal });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text, url: res.url };
  } finally { clearTimeout(t); }
}

/** Valida uma URL de imagem: retorna {ok, width, height, bytes, contentType} */
export async function validateImage(url, { minSide = 300, minBytes = 3000 } = {}) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 25000);
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return { ok: false, reason: `content-type ${contentType}` };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < minBytes) return { ok: false, reason: `apenas ${buf.length} bytes (placeholder?)`, bytes: buf.length };
    const meta = await sharp(buf).metadata();
    const ok = (meta.width ?? 0) >= minSide && (meta.height ?? 0) >= minSide;
    return { ok, width: meta.width, height: meta.height, bytes: buf.length, contentType, reason: ok ? undefined : `dimensões ${meta.width}x${meta.height} < ${minSide}` };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}

function extractAmazonImages(html) {
  const out = new Set();
  for (const m of html.matchAll(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)) out.add(m[1]);
  for (const m of html.matchAll(/data-old-hires="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)) out.add(m[1]);
  for (const m of html.matchAll(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)) out.add(m[1]);
  // normaliza para SL1500 quando possível
  return [...out].map((u) => u.replace(/\._[A-Z0-9_,]+_\.jpg$/, '._AC_SL1500_.jpg'));
}

function extractTitle(html) {
  const m = html.match(/<span id="productTitle"[^>]*>\s*([^<]+?)\s*<\/span>/);
  return m ? m[1].trim() : undefined;
}

/** Tenta a página ao vivo (normalmente bloqueada em datacenters). */
async function fromLivePage(asin) {
  try {
    const r = await fetchText(`https://www.amazon.com.br/dp/${asin}`);
    // Página de bloqueio/CAPTCHA: não insistimos nem contornamos.
    if (!r.ok || r.text.length < 50000 || /api-services-support@amazon\.com|validateCaptcha/.test(r.text)) return null;
    return { images: extractAmazonImages(r.text), title: extractTitle(r.text), source: 'amazon-live' };
  } catch { return null; }
}

/** Snapshot da Wayback Machine (modo id_ = HTML original). */
async function fromWayback(asin, years = ['2026', '2025', '2024', '2023', '2022']) {
  for (const y of years) {
    try {
      const r = await fetchText(`https://web.archive.org/web/${y}id_/https://www.amazon.com.br/dp/${asin}`, { timeout: 40000 });
      if (r.status === 429) { await sleep(4000); continue; }
      if (!r.ok || r.text.length < 20000) continue;
      const images = extractAmazonImages(r.text);
      if (images.length) return { images, title: extractTitle(r.text), source: `wayback:${r.url}` };
    } catch { /* tenta próximo ano */ }
    await sleep(1200);
  }
  return null;
}

/** Miniatura por ASIN (sempre existe quando o ASIN é válido, mas é pequena). */
function thumbnailByAsin(asin) {
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SL500_.jpg`;
}

/**
 * Resolve a melhor imagem para um ASIN.
 * @returns {Promise<{asin, src, width, height, source, quality: 'alta'|'baixa', title?} | null>}
 */
export async function resolveProductImage(asin, { allowLowRes = true } = {}) {
  if (!/^[A-Z0-9]{10}$/.test(asin)) throw new Error(`ASIN inválido: ${asin}`);
  const attempts = [fromWayback, fromLivePage];
  for (const fn of attempts) {
    const r = await fn(asin);
    if (!r) continue;
    for (const src of r.images.slice(0, 6)) {
      const v = await validateImage(src, { minSide: 500 });
      if (v.ok) return { asin, src, width: v.width, height: v.height, source: r.source, quality: 'alta', title: r.title };
    }
  }
  if (allowLowRes) {
    const src = thumbnailByAsin(asin);
    const v = await validateImage(src, { minSide: 100, minBytes: 2500 });
    if (v.ok) return { asin, src, width: v.width, height: v.height, source: 'asin-thumbnail', quality: 'baixa' };
  }
  return null;
}
