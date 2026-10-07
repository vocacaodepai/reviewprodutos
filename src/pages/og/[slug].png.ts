import type { APIContext } from 'astro';
import { getArtigos, getCategoria } from '@/lib/articles';
import { renderArticleOg } from '@/lib/og';

export async function getStaticPaths() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({ params: { slug: artigo.id }, props: { artigo } }));
}

export async function GET({ props }: APIContext) {
  const { artigo } = props as { artigo: Awaited<ReturnType<typeof getArtigos>>[number] };
  const cat = await getCategoria(artigo.data.categoria.id);
  const png = await renderArticleOg(artigo, cat.data.nome);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' } });
}
