import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@/site.config';
import { getArtigos, articleUrl } from '@/lib/articles';

export async function GET(context: APIContext) {
  const artigos = (await getArtigos()).slice(0, 50);
  return rss({
    title: `${SITE.name} — Reviews, comparativos e guias de compra`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: artigos.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: articleUrl(a),
      categories: [a.data.categoria.id, a.data.tipo],
      author: SITE.email,
    })),
    customData: `<language>pt-BR</language><image><url>${SITE.url}/icons/icon-192.png</url><title>${SITE.name}</title><link>${SITE.url}/</link></image>`,
  });
}
