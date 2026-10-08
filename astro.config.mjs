// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const SITE = 'https://reviewprodutos.com.br';
/** @type {Record<string, string>} */
const TIPO_SLUG = { review: 'reviews', comparativo: 'comparativos', lista: 'melhores' };

/** Mapa URL -> lastmod (ISO) lido do frontmatter dos artigos, para o sitemap. */
function articleLastmod() {
  /** @type {Map<string, string>} */
  const map = new Map();
  /** @param {string} dir */
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.md')) {
        try {
          const { data } = matter(readFileSync(p, 'utf8'));
          const slug = data.slug ?? f.replace(/\.md$/, '');
          const d = data.updatedDate ?? data.pubDate;
          if (data.tipo && d) map.set(`${SITE}/${TIPO_SLUG[data.tipo]}/${slug}/`, new Date(d).toISOString());
        } catch { /* ignora arquivo inválido; o build acusa depois */ }
      }
    }
  };
  try { walk('./src/content/artigos'); } catch { /* sem artigos ainda */ }
  return map;
}
const LASTMOD = articleLastmod();

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: {
    // Imagens da Amazon NÃO são otimizadas/copiadas (exibidas por link direto). Só fontes próprias/fabricantes passam pelo serviço de imagens.
    remotePatterns: [{ protocol: 'https' }],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/busca/') && !page.includes('/obrigado/') && !page.includes('/404'),
      serialize(item) {
        // Google ignora priority/changefreq; lastmod só quando conhecido (data real do artigo).
        const lm = LASTMOD.get(item.url);
        if (lm) item.lastmod = lm;
        return item;
      },
    }),
  ],
  fonts: [
    { name: 'Inter', cssVariable: '--font-inter', provider: fontProviders.google(), weights: [400, 500, 600, 700], styles: ['normal'], subsets: ['latin', 'latin-ext'], fallbacks: ['system-ui', 'sans-serif'] },
    { name: 'Sora', cssVariable: '--font-sora', provider: fontProviders.google(), weights: [600, 700, 800], styles: ['normal'], subsets: ['latin', 'latin-ext'], fallbacks: ['Inter', 'system-ui', 'sans-serif'] },
  ],
  vite: {
    plugins: [tailwindcss()],
    // satori/resvg trazem WASM e binários nativos: deixar o Node resolvê-los em vez de empacotar no prerender
    ssr: { external: ['satori', '@resvg/resvg-js', 'sharp'] },
  },
});
