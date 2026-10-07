import type { APIContext } from 'astro';
import { SITE } from '@/site.config';
export function GET(context: APIContext) {
  const site = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');
  const body = `User-agent: *
Allow: /
Disallow: /busca/
Disallow: /pagefind/

# Robôs de anúncios do Google precisam ler as páginas para servir anúncios relevantes
User-agent: Mediapartners-Google
Allow: /

User-agent: Google-Display-Ads-Bot
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
