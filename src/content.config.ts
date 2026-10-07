import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/** Imagem remota (CDN da Amazon ou fabricante) com alt obrigatório para SEO/acessibilidade. */
const imagem = z.object({
  src: z.url(),
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
  /** ASIN da Amazon.com.br (10 caracteres alfanuméricos). */
  asin: z.string().regex(/^[A-Z0-9]{10}$/, { error: 'ASIN inválido: use 10 caracteres maiúsculos/dígitos' }),
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
  /** Faixa de preço indicativa (nunca exibimos preço exato sem a API da Amazon). */
  faixaPreco: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  idealPara: z.string().optional(),
  naoIndicadoPara: z.string().optional(),
  /** Notas por critério (0-10), usadas em tabelas e gráficos. */
  notasCriterios: z.record(z.string(), z.number().min(0).max(10)).optional(),
  /** Avaliação média de consumidores informada publicamente (ex.: 4.6) e quantidade aproximada. */
  avaliacaoConsumidores: z.object({ media: z.number().min(0).max(5), quantidade: z.number().int().nonnegative().optional(), fonte: z.string().optional() }).optional(),
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
      if (data.tipo === 'comparativo' && n !== 2) ctx.addIssue({ code: 'custom', message: 'Comparativo precisa de exatamente 2 produtos', path: ['produtos'] });
      if (data.tipo === 'lista' && n < 3) ctx.addIssue({ code: 'custom', message: 'Lista precisa de 3 ou mais produtos', path: ['produtos'] });
      const asins = data.produtos.map((p) => p.asin);
      if (new Set(asins).size !== asins.length) ctx.addIssue({ code: 'custom', message: 'ASINs duplicados no mesmo artigo', path: ['produtos'] });
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
