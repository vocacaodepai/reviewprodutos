/**
 * Geração de imagem Open Graph (1200x630) por artigo com satori + resvg.
 * Fonte: imagem real do produto (hero) sobre fundo da marca, título e selo do tipo.
 */
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
// O build ESM do satori usa __dirname (quebra no Node); carregamos o build CJS.
const require = createRequire(import.meta.url);
const satori: typeof import('satori').default = require('satori').default ?? require('satori');
const { Resvg } = require('@resvg/resvg-js') as typeof import('@resvg/resvg-js');
import { SITE, ARTICLE_TYPES } from '@/site.config';
import type { Artigo } from './articles';

let fontsCache: { name: string; data: ArrayBuffer; weight: 400 | 700 | 800; style: 'normal' }[] | null = null;
async function fonts() {
  if (fontsCache) return fontsCache;
  // Caminho relativo à raiz do projeto (o build roda a partir dela); import.meta.url apontaria para dist/.prerender.
  const base = join(process.cwd(), 'src/assets/fonts');
  const load = async (f: string) => { const b = await readFile(join(base, f)); return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer; };
  fontsCache = [
    { name: 'Inter', data: await load('inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Inter', data: await load('inter-latin-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'Sora', data: await load('sora-latin-800-normal.woff'), weight: 800, style: 'normal' },
  ];
  return fontsCache;
}

async function toDataUri(url: string): Promise<string | null> {
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 ReviewProdutosBot/1.0' } });
    clearTimeout(t);
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') || 'image/jpeg';
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${ct};base64,${buf.toString('base64')}`;
  } catch { return null; }
}

const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

export async function renderArticleOg(artigo: Artigo, categoriaNome: string): Promise<Buffer> {
  const d = artigo.data;
  // Imagens da Amazon não podem ser copiadas/derivadas: só embutimos imagem de fonte própria/fabricante.
  const img = d.imagem.fonte && d.imagem.fonte !== 'amazon' ? await toDataUri(d.imagem.src) : null;
  const tipo = ARTICLE_TYPES[d.tipo].label.toUpperCase();
  const title = d.title.length > 110 ? d.title.slice(0, 107).trimEnd() + '…' : d.title;
  const nota = d.tipo === 'review' ? d.produtos[0].nota.toFixed(1).replace('.', ',') : null;

  const tree = h('div', { style: { width: 1200, height: 630, display: 'flex', background: 'linear-gradient(135deg,#082C45 0%,#145A85 100%)', color: '#fff', fontFamily: 'Inter', position: 'relative' } },
    h('div', { style: { position: 'absolute', right: -120, top: -140, width: 520, height: 520, borderRadius: 999, background: 'rgba(255,255,255,0.05)', display: 'flex' } }),
    h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 60px', width: img ? 720 : 1080, height: 630 } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        h('div', { style: { display: 'flex', padding: '6px 14px', borderRadius: 8, background: '#FBBF24', color: '#0B3C5D', fontWeight: 700, fontSize: 20, letterSpacing: 2 } }, tipo),
        h('div', { style: { display: 'flex', padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.14)', fontWeight: 700, fontSize: 20 } }, categoriaNome.toUpperCase()),
      ),
      h('div', { style: { display: 'flex', fontFamily: 'Sora', fontWeight: 800, fontSize: title.length > 70 ? 44 : 52, lineHeight: 1.12, letterSpacing: -1 } }, title),
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700 } },
          h('div', { style: { display: 'flex', width: 40, height: 40, borderRadius: 999, background: '#fff', alignItems: 'center', justifyContent: 'center' } },
            h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none' }, h('path', { d: 'm5 12 5 5L20 7', stroke: '#0B3C5D', 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))),
          h('div', { style: { display: 'flex' } }, 'Review Produtos'),
          h('div', { style: { display: 'flex', opacity: 0.6, fontWeight: 400 } }, '· reviewprodutos.com.br'),
        ),
        nota ? h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6, padding: '8px 18px', borderRadius: 14, background: '#16B364', fontWeight: 800, fontSize: 34, fontFamily: 'Sora' } }, nota, h('span', { style: { fontSize: 18, opacity: 0.85, fontFamily: 'Inter' } }, '/10')) : h('div', { style: { display: 'flex' } }),
      ),
    ),
    img ? h('div', { style: { position: 'absolute', right: 60, top: 75, width: 400, height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 28, padding: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.35)' } },
      h('img', { src: img, style: { width: 352, height: 432, objectFit: 'contain' } })) : h('div', { style: { display: 'flex' } }),
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await fonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return Buffer.from(png);
}
