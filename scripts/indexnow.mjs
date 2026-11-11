#!/usr/bin/env node
/**
 * Envia as URLs do sitemap ao Bing e demais buscadores via IndexNow.
 * Uso: node scripts/indexnow.mjs [--dry]
 * A chave é pública por desenho do protocolo: o arquivo public/<chave>.txt precisa estar no ar.
 */
const HOST = 'reviewprodutos.com.br';
const KEY = '9191782e07d3d54c7362513278300ffb';
const BASE = `https://${HOST}`;
const dry = process.argv.includes('--dry');

async function urlsDoSitemap(url) {
  const xml = await (await fetch(url)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.every((l) => l.endsWith('.xml'))) return (await Promise.all(locs.map(urlsDoSitemap))).flat();
  return locs;
}

const urls = [...new Set(await urlsDoSitemap(`${BASE}/sitemap-index.xml`))].filter((u) => u.startsWith(BASE));
console.log(`${urls.length} URLs no sitemap`);
if (dry) process.exit(0);
for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log('Bing IndexNow:', res.status, res.statusText);
  if (res.status >= 400) process.exit(1);
}
