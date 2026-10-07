import { SITE } from '@/site.config';
import type { Artigo, Autor, Categoria } from './articles';
import { absoluteUrl, articleUrl, autorUrl, produtoUrl, formatNota } from './articles';

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/icons/icon-512.png'), width: 512, height: 512 },
    email: SITE.email,
    sameAs: Object.values(SITE.social).filter(Boolean),
    contactPoint: [{ '@type': 'ContactPoint', email: SITE.email, contactType: 'customer support', availableLanguage: ['Portuguese'] }],
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/busca/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.url) })),
  };
}

export function personSchema(autor: Autor): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}${autorUrl(autor.id)}#person`,
    name: autor.data.nome,
    jobTitle: autor.data.cargo,
    description: autor.data.bioCurta,
    url: absoluteUrl(autorUrl(autor.id)),
    image: absoluteUrl(autor.data.avatar),
    sameAs: Object.values(autor.data.links).filter(Boolean),
    worksFor: { '@id': `${SITE.url}/#organization` },
  };
}

function productSchema(p: Artigo['data']['produtos'][number], autor: Autor, artigo: Artigo): JsonLd {
  const prod: JsonLd = {
    '@type': 'Product',
    name: p.nome,
    image: [p.imagem.src],
    description: p.resumo,
    sku: p.asin,
    ...(p.marca ? { brand: { '@type': 'Brand', name: p.marca } } : {}),
    ...(p.modelo ? { model: p.modelo } : {}),
    url: produtoUrl(p),
    review: {
      '@type': 'Review',
      name: `${p.nome}: análise do ${SITE.name}`,
      reviewBody: p.resumo,
      datePublished: artigo.data.pubDate.toISOString(),
      ...(artigo.data.updatedDate ? { dateModified: artigo.data.updatedDate.toISOString() } : {}),
      author: { '@id': `${SITE.url}${autorUrl(autor.id)}#person` },
      publisher: { '@id': `${SITE.url}/#organization` },
      reviewRating: { '@type': 'Rating', ratingValue: formatNota(p.nota).replace(',', '.'), bestRating: '10', worstRating: '0' },
      positiveNotes: { '@type': 'ItemList', itemListElement: p.pros.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t })) },
      negativeNotes: { '@type': 'ItemList', itemListElement: p.contras.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t })) },
    },
  };
  return prod;
}

export function articleSchema(artigo: Artigo, autor: Autor, categoria: Categoria, wordCount: number): JsonLd[] {
  const url = absoluteUrl(articleUrl(artigo));
  const d = artigo.data;
  const graph: JsonLd[] = [
    organizationSchema(),
    websiteSchema(),
    personSchema(autor),
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: d.seoTitle ?? d.title,
      alternativeHeadline: d.title,
      description: d.description,
      image: [absoluteUrl(`/og/${artigo.id}.png`), d.imagem.src],
      datePublished: d.pubDate.toISOString(),
      dateModified: (d.updatedDate ?? d.pubDate).toISOString(),
      author: { '@id': `${SITE.url}${autorUrl(autor.id)}#person` },
      publisher: { '@id': `${SITE.url}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: categoria.data.nome,
      keywords: [...d.funil.palavrasChave, ...d.tags].join(', '),
      inLanguage: 'pt-BR',
      wordCount,
      isAccessibleForFree: true,
    },
    breadcrumbSchema([
      { name: 'Início', url: '/' },
      { name: categoria.data.nome, url: `/categoria/${categoria.id}/` },
      { name: d.title, url: articleUrl(artigo) },
    ]),
  ];

  if (d.tipo === 'review') {
    graph.push(productSchema(d.produtos[0], autor, artigo));
  } else {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#lista`,
      name: d.title,
      numberOfItems: d.produtos.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: d.produtos.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: productSchema(p, autor, artigo) })),
    });
  }

  if (d.faq.length >= 2) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: d.faq.map((f) => ({ '@type': 'Question', name: f.pergunta, acceptedAnswer: { '@type': 'Answer', text: f.resposta } })),
    });
  }
  return graph;
}

export function collectionPageSchema(name: string, description: string, url: string, items: Artigo[]): JsonLd[] {
  return [
    organizationSchema(),
    websiteSchema(),
    {
      '@type': 'CollectionPage',
      '@id': absoluteUrl(url),
      name,
      description,
      url: absoluteUrl(url),
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.slice(0, 20).map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(articleUrl(a)), name: a.data.title })),
      },
    },
  ];
}

export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
