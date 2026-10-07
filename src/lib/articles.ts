import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { ARTICLE_TYPES, SITE, amazonUrl } from '@/site.config';

export type Artigo = CollectionEntry<'artigos'>;
export type Categoria = CollectionEntry<'categorias'>;
export type Autor = CollectionEntry<'autores'>;
export type Produto = Artigo['data']['produtos'][number];

const isProd = import.meta.env.PROD;

/** Artigos por página nas listagens. */
export const PER_PAGE = 18;

/** Artigos publicados (sem rascunhos em produção), mais recentes primeiro. */
export async function getArtigos(filter?: (a: Artigo) => boolean): Promise<Artigo[]> {
  const all = await getCollection('artigos', ({ data }) => (isProd ? !data.rascunho : true));
  const list = filter ? all.filter(filter) : all;
  return list.sort((a, b) => (b.data.updatedDate ?? b.data.pubDate).valueOf() - (a.data.updatedDate ?? a.data.pubDate).valueOf());
}

export async function getCategorias(): Promise<Categoria[]> {
  const cats = await getCollection('categorias');
  return cats.sort((a, b) => a.data.ordem - b.data.ordem || a.data.nome.localeCompare(b.data.nome, 'pt-BR'));
}

export async function getAutor(id: string): Promise<Autor> {
  const a = await getEntry('autores', id);
  if (!a) throw new Error(`Autor não encontrado: ${id}`);
  return a;
}

export async function getCategoria(id: string): Promise<Categoria> {
  const c = await getEntry('categorias', id);
  if (!c) throw new Error(`Categoria não encontrada: ${id}`);
  return c;
}

/** URL pública do artigo: /reviews/slug/, /comparativos/slug/, /melhores/slug/ */
export function articleUrl(a: Artigo): string {
  return `/${ARTICLE_TYPES[a.data.tipo].slug}/${a.id}/`;
}

export function categoriaUrl(id: string, sub?: string): string {
  return sub ? `/categoria/${id}/${sub}/` : `/categoria/${id}/`;
}

export function autorUrl(id: string): string {
  return `/autores/${id}/`;
}

export function tipoUrl(tipo: keyof typeof ARTICLE_TYPES): string {
  return `/${ARTICLE_TYPES[tipo].slug}/`;
}

export function produtoUrl(p: Produto): string {
  return p.url ?? amazonUrl(p.asin);
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/** Tempo de leitura estimado em minutos (200 palavras/min). */
export function readingTime(body: string | undefined, extraWords = 0): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length + extraWords;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }): string {
  // Datas do frontmatter são "só data" (meia-noite UTC): formatamos em UTC para não voltar um dia no fuso de Brasília.
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', ...opts }).format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString();
}

/** Nota 0-10 → 0-5 estrelas com meia estrela. */
export function toStars(nota: number): { full: number; half: boolean; empty: number } {
  const stars = Math.round((nota / 2) * 2) / 2; // arredonda a 0.5
  const full = Math.floor(stars);
  const half = stars - full >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
}

export function notaLabel(nota: number): string {
  if (nota >= 9) return 'Excelente';
  if (nota >= 8) return 'Muito bom';
  if (nota >= 7) return 'Bom';
  if (nota >= 6) return 'Razoável';
  if (nota >= 5) return 'Mediano';
  return 'Fraco';
}

export function formatNota(nota: number): string {
  return nota.toFixed(1).replace('.', ',');
}

/** Artigos relacionados: mesma subcategoria > mesma categoria > tags em comum. */
export function relatedArticles(current: Artigo, all: Artigo[], limit = 4): Artigo[] {
  const score = (a: Artigo) => {
    if (a.id === current.id) return -1;
    let s = 0;
    if (a.data.categoria.id === current.data.categoria.id) s += 2;
    if (a.data.subcategoria === current.data.subcategoria) s += 3;
    if (a.data.tipo !== current.data.tipo) s += 1; // diversifica formatos
    s += a.data.tags.filter((t) => current.data.tags.includes(t)).length;
    if (current.data.relacionados.includes(a.id)) s += 10;
    return s;
  };
  return all
    .map((a) => ({ a, s: score(a) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map((x) => x.a);
}

/** Paginação simples. */
export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), current, totalPages, total: items.length };
}

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
