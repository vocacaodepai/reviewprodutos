/**
 * Configuração central do site Review Produtos.
 * Valores públicos podem vir de variáveis de ambiente PUBLIC_* (ver .env.example).
 */
export const SITE = {
  name: 'Review Produtos',
  shortName: 'ReviewProdutos',
  tagline: 'Reviews honestos, comparativos e guias de compra',
  description:
    'Reviews honestos, comparativos e listas dos melhores produtos vendidos no Brasil. Analisamos especificações, avaliações reais de consumidores e testes para você comprar sem erro.',
  url: 'https://www.reviewprodutos.com.br',
  domain: 'reviewprodutos.com.br',
  locale: 'pt-BR',
  language: 'pt',
  email: 'contato@reviewprodutos.com.br',
  foundedYear: 2026,
  // Tag de afiliado Amazon Associados Brasil
  amazonTag: import.meta.env.PUBLIC_AMAZON_TAG || 'reviewprodutos-20',
  amazonHost: 'https://www.amazon.com.br',
  // AdSense (vazio = desativado)
  adsenseClient: import.meta.env.PUBLIC_ADSENSE_CLIENT || '',
  gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION || '',
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',
  social: {
    instagram: 'https://www.instagram.com/reviewprodutos',
    youtube: '',
    x: '',
  },
  themeColor: '#0B3C5D',
  // Texto de divulgação exigido pelo Programa de Associados da Amazon (Brasil)
  // Frase exata exigida pela cláusula 5 do Contrato Operacional do Programa de Associados da Amazon (Brasil)
  affiliateDisclosureOfficial: 'Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.',
  affiliateDisclosure:
    'Publicidade (links de afiliado): como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas. Você não paga nada a mais por isso e as comissões não influenciam nossas análises e notas.',
  affiliateDisclosureShort: 'Publicidade: como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.',
} as const;

export const ARTICLE_TYPES = {
  review: { slug: 'reviews', label: 'Review', labelPlural: 'Reviews', description: 'Análise completa de um produto: vale a pena ou não?' },
  comparativo: { slug: 'comparativos', label: 'Comparativo', labelPlural: 'Comparativos', description: 'Dois produtos frente a frente: qual comprar?' },
  lista: { slug: 'melhores', label: 'Melhores', labelPlural: 'Listas dos melhores', description: 'Os melhores produtos de cada categoria, ranqueados.' },
} as const;

export type ArticleType = keyof typeof ARTICLE_TYPES;

export const BADGES: Record<string, { label: string; short: string; color: string }> = {
  'escolha-do-editor': { label: 'Escolha do Editor', short: 'Editor', color: 'badge-editor' },
  'melhor-custo-beneficio': { label: 'Melhor Custo-Benefício', short: 'Custo-benefício', color: 'badge-value' },
  'melhor-premium': { label: 'Melhor Premium', short: 'Premium', color: 'badge-premium' },
  'melhor-barato': { label: 'Melhor Barato', short: 'Barato', color: 'badge-budget' },
  'melhor-para-iniciantes': { label: 'Melhor para Iniciantes', short: 'Iniciantes', color: 'badge-value' },
  'melhor-compacto': { label: 'Melhor Compacto', short: 'Compacto', color: 'badge-value' },
  'melhor-para-familias': { label: 'Melhor para Famílias', short: 'Famílias', color: 'badge-value' },
  'mais-vendido': { label: 'Mais Vendido', short: 'Mais vendido', color: 'badge-budget' },
  'melhor-desempenho': { label: 'Melhor Desempenho', short: 'Desempenho', color: 'badge-premium' },
  'melhor-silencioso': { label: 'Melhor Silencioso', short: 'Silencioso', color: 'badge-value' },
};

export const FUNNEL_LABELS = {
  topo: 'Descoberta (problema/dor)',
  meio: 'Consideração (qual escolher)',
  fundo: 'Decisão (vale a pena?)',
} as const;

/** Monta o link de afiliado da Amazon a partir do ASIN. */
export function amazonUrl(asin: string, tag: string = SITE.amazonTag): string {
  return `${SITE.amazonHost}/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}
