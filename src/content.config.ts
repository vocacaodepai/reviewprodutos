import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/** Imagem remota (CDN da Amazon ou fabricante) com alt obrigatório para SEO/acessibilidade. */
const imagem = z.object({
  src: z.url(),
  /** Origem da imagem: amazon (link direto, sem cópia), fabricante (site oficial), propria, api (Creators API), outra. */
  fonte: z.enum(['amazon', 'shopee', 'fabricante', 'propria', 'api', 'outra']).default('amazon'),
  alt: z.string().min(8, { error: 'alt text precisa descrever o produto (mín. 8 caracteres)' }).max(160),
  credito: z.string().optional(),
  largura: z.number().int().positive().optional(),
  altura: z.number().int().positive().optional(),
});

export const SELOS = [
  'escolha-do-editor',
  'melhor-custo-beneficio',
  'melhor-premium',
  'melhor-barato',
  'melhor-para-iniciantes',
  'melhor-compacto',
  'melhor-para-familias',
  'mais-vendido',
  'melhor-desempenho',
  'melhor-silencioso',
] as const;

const produto = z.object({
  nome: z.string().min(3).max(140),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  /** Loja do botão de compra (padrão: amazon). */
  loja: z.enum(['amazon', 'shopee']).default('amazon'),
  /** ASIN da Amazon.com.br (10 caracteres alfanuméricos). Obrigatório quando loja = amazon. */
  asin: z.string().regex(/^[A-Z0-9]{10}$/, { error: 'ASIN inválido: use 10 caracteres maiúsculos/dígitos' }).optional(),
  /** Dados da Shopee (API de Afiliados): itemId/shopId do anúncio e link curto de afiliado (offerLink). Obrigatório quando loja = shopee. */
  shopee: z
    .object({
      itemId: z.number().int().positive(),
      shopId: z.number().int().positive(),
      link: z.url().refine((u) => /^https:\/\/s\.shopee\.com\.br\//.test(u), { error: 'link da Shopee precisa ser o offerLink curto (https://s.shopee.com.br/...) gerado pela API de Afiliados' }),
      loja: z.string().min(2).max(80).optional(),
    })
    .optional(),
  /** Link alternativo (se vazio, gerado a partir do ASIN + tag de afiliado). */
  url: z.url().optional(),
  imagem,
  /** Nota final de 0 a 10 (uma casa decimal). */
  nota: z.number().min(0).max(10),
  selo: z.enum(SELOS).optional(),
  /** Frase-resumo: para quem este produto é ideal. */
  resumo: z.string().min(20).max(260),
  pros: z.array(z.string().min(3)).min(2).max(8),
  contras: z.array(z.string().min(3)).min(1).max(6),
  /** Especificações em pares chave/valor (ex.: Potência: 1500 W). */
  especificacoes: z.record(z.string(), z.string()).default({}),
  /** Voltagem do modelo (ex.: "127V", "220V", "Bivolt"), importante no Brasil. */
  voltagem: z.string().optional(),
  /** Variantes com ASIN próprio (ex.: outra voltagem ou cor), viram botões adicionais. */
  variantes: z.array(z.object({ rotulo: z.string().min(2).max(40), asin: z.string().regex(/^[A-Z0-9]{10}$/) })).max(4).default([]),
  /** Outros vendedores (Mercado Livre, loja oficial...), recomendados pelo Google para reviews. */
  linksAlternativos: z.array(z.object({ loja: z.string().min(2).max(40), url: z.url() })).max(3).default([]),
  /** Faixa de preço indicativa (nunca exibimos preço exato sem a API da Amazon). */
  faixaPreco: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  /**
   * Estimativa de preço de MERCADO (várias lojas, histórico de comparadores como Buscapé/Zoom), nunca o preço da Amazon:
   * preço da Amazon só pode ser exibido via API. Valores em reais, faixas arredondadas, mês de referência AAAA-MM.
   */
  precoMercado: z
    .object({
      min: z.number().positive(),
      max: z.number().positive(),
      referencia: z.string().regex(/^\d{4}-\d{2}$/),
      historico: z.array(z.object({ periodo: z.string().regex(/^\d{4}-\d{2}$/), min: z.number().positive(), max: z.number().positive() })).max(12).default([]),
      tendencia: z.enum(['caindo', 'estavel', 'subindo']).optional(),
      observacao: z.string().max(240).optional(),
      fontes: z.array(z.object({ nome: z.string().min(2), url: z.url() })).min(1),
    })
    .refine((v) => v.max >= v.min && v.max <= v.min * 2.5 && v.historico.every((h) => h.max >= h.min), { error: 'precoMercado: faixa inválida (min <= max e max até 2,5x o min)' })
    .optional(),
  idealPara: z.string().optional(),
  naoIndicadoPara: z.string().optional(),
  /** Notas por critério (0-10), usadas em tabelas e gráficos. */
  notasCriterios: z.record(z.string(), z.number().min(0).max(10)).optional(),
  /**
   * Avaliação de consumidores de fonte NÃO-Amazon (ex.: Reclame Aqui, Buscapé). Notas/estrelas da Amazon só podem ser
   * exibidas via Creators API (Contrato Operacional do Programa de Associados BR).
   */
  avaliacaoConsumidores: z.object({ media: z.number().min(0).max(5), quantidade: z.number().int().nonnegative().optional(), fonte: z.string().min(2).refine((f) => !/amazon/i.test(f), { error: 'Notas de clientes da Amazon só via Creators API' }) }).optional(),
});

const artigos = defineCollection({
  // URLs planas (/reviews/<slug>/): o id é só o nome do arquivo, independente da pasta da categoria.
  loader: glob({ base: './src/content/artigos', pattern: '**/*.md', generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.md$/, '') }),
  schema: z
    .object({
      /** Título H1 (pode ter até 90 caracteres; o SEO title fica em seoTitle). */
      title: z.string().min(20).max(100),
      /** Title tag (≤ 62 caracteres). Se ausente, usa title. */
      seoTitle: z.string().max(62).optional(),
      /** Meta description (120-160 caracteres). */
      description: z.string().min(100).max(170),
      tipo: z.enum(['review', 'comparativo', 'lista']),
      categoria: reference('categorias'),
      /** Slug da subcategoria (precisa existir na categoria). */
      subcategoria: z.string().min(2),
      tags: z.array(z.string()).default([]),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      autor: reference('autores'),
      /** Imagem de destaque (hero + Open Graph). */
      imagem,
      /** Estratégia de funil do artigo. */
      funil: z.object({
        estagio: z.enum(['topo', 'meio', 'fundo']),
        /** Dor/problema do leitor que o artigo resolve (ex.: "dor nas costas ao dirigir"). */
        problema: z.string().optional(),
        palavrasChave: z.array(z.string()).min(1).max(12),
        intencao: z.string().optional(),
      }),
      /** Veredito rápido (resumo em 30 segundos), 120-500 caracteres. */
      veredito: z.string().min(120).max(600),
      produtos: z.array(produto).min(1).max(12),
      /** Critérios de avaliação com pesos (soma ≈ 100). */
      criterios: z.array(z.object({ nome: z.string(), peso: z.number().min(0).max(100), descricao: z.string().optional() })).optional(),
      /** Chaves de especificações exibidas na tabela comparativa (na ordem). */
      tabelaComparativa: z.array(z.string()).optional(),
      faq: z.array(z.object({ pergunta: z.string().min(10), resposta: z.string().min(40) })).min(2).max(10),
      fontes: z.array(z.object({ nome: z.string(), url: z.url() })).default([]),
      /** Se o produto foi testado fisicamente pela equipe (transparência). */
      testadoFisicamente: z.boolean().default(false),
      rascunho: z.boolean().default(false),
      destaque: z.boolean().default(false),
      /** Slugs de artigos relacionados (links internos manuais, opcionais). */
      relacionados: z.array(z.string()).default([]),
    })
    .superRefine((data, ctx) => {
      const n = data.produtos.length;
      if (data.tipo === 'review' && n !== 1) ctx.addIssue({ code: 'custom', message: 'Review individual precisa de exatamente 1 produto', path: ['produtos'] });
      if (data.tipo === 'comparativo' && (n < 2 || n > 3)) ctx.addIssue({ code: 'custom', message: 'Comparativo precisa de 2 ou 3 produtos', path: ['produtos'] });
      if (data.tipo === 'lista' && n < 3) ctx.addIssue({ code: 'custom', message: 'Lista precisa de 3 ou mais produtos', path: ['produtos'] });
      data.produtos.forEach((p, i) => {
        if (p.loja === 'amazon' && !p.asin) ctx.addIssue({ code: 'custom', message: 'Produto da Amazon precisa de asin', path: ['produtos', i, 'asin'] });
        if (p.loja === 'shopee' && !p.shopee) ctx.addIssue({ code: 'custom', message: 'Produto da Shopee precisa do bloco shopee (itemId, shopId, link)', path: ['produtos', i, 'shopee'] });
      });
      if (new Set(data.produtos.map((p) => (p.loja === 'shopee' ? p.shopee?.itemId : p.asin))).size !== n) ctx.addIssue({ code: 'custom', message: 'Produtos duplicados no mesmo artigo', path: ['produtos'] });
      if (data.funil.estagio === 'topo' && !data.funil.problema) ctx.addIssue({ code: 'custom', message: 'Artigo de topo de funil precisa declarar o problema/dor do leitor', path: ['funil', 'problema'] });
    }),
});

const categorias = defineCollection({
  loader: file('./src/data/categorias.json'),
  schema: z.object({
    nome: z.string(),
    descricao: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    icone: z.string(),
    cor: z.string().default('#0B3C5D'),
    ordem: z.number().int().default(99),
    subcategorias: z.array(z.object({ slug: z.string(), nome: z.string(), descricao: z.string().optional() })),
  }),
});

const autores = defineCollection({
  loader: file('./src/data/autores.json'),
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    bio: z.string(),
    bioCurta: z.string(),
    avatar: z.string(),
    especialidades: z.array(z.string()).default([]),
    links: z.object({ site: z.url().optional(), linkedin: z.url().optional(), instagram: z.url().optional(), x: z.url().optional() }).default({}),
  }),
});

export const collections = { artigos, categorias, autores };
