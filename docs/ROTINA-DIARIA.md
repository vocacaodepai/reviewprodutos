# Rotina diária de publicação (20 artigos/dia em 4 lotes)

Meta: **10 artigos de manhã** (2 lotes de 5) e **10 à noite** (2 lotes de 5), todos os dias, seguindo o padrão em `docs/PADRAO-EDITORIAL.md`.

| Lote | Horário (Brasília) | Cron (UTC) |
| --- | --- | --- |
| Manhã 1 | 07:00 | `0 10 * * *` |
| Manhã 2 | 10:00 | `0 13 * * *` |
| Noite 1 | 19:00 | `0 22 * * *` |
| Noite 2 | 22:00 | `0 1 * * *` |

Há duas formas de executar a rotina. Elas usam a **mesma fila** (`content/queue/topics.json`), o **mesmo validador** e o **mesmo padrão editorial**; escolha uma para não publicar em dobro.

## Opção A (padrão do repositório): GitHub Actions + Claude API

Arquivo: `.github/workflows/publicar-artigos.yml`. Requer o secret `ANTHROPIC_API_KEY`. Cada execução roda `scripts/generate-articles.mjs`, valida, faz build e commita em `main`; a hospedagem (Vercel/Cloudflare) publica automaticamente. Detalhes no `README.md`.

Vantagens: roda sozinho no GitHub, logs por execução, custo por artigo previsível. Desvantagem: exige chave de API paga.

## Opção B: Routines do Claude Code (usa sua assinatura do Claude)

Em claude.ai/code, crie **4 Routines** (uma por horário) que iniciam uma sessão nova no ambiente deste repositório com o prompt abaixo. Vantagem: sem chave de API; o agente usa busca na web e as ferramentas do repositório. Desvantagem: consome o uso da sua assinatura e depende do ambiente estar configurado com acesso de push ao repositório.

Prompt sugerido (copie e cole na Routine):

```
Você é a redação automática do site reviewprodutos.com.br. Trabalhe no repositório vocacaodepai/reviewprodutos, branch main (git pull antes de começar).

1. Leia docs/PADRAO-EDITORIAL.md (padrão editorial), src/content.config.ts (schema) e um artigo recente em src/content/artigos/ como exemplo de formato.
2. Abra content/queue/topics.json e selecione os 5 primeiros temas com status "pending" (ordem de prioridade; prefira categorias diferentes). Marque-os como "in_progress".
3. Para cada tema: pesquise na web produtos REAIS na Amazon.com.br (use WebSearch com allowed_domains ["amazon.com.br"] para obter as URLs /dp/ASIN, especificações, média e quantidade de avaliações; faça buscas gerais em português para contexto e fontes). Nunca invente ASIN nem cite preços exatos.
4. Rode `node scripts/find-image.mjs ASIN1 ASIN2 ...` para obter a imagem real validada de cada produto (use a URL retornada em imagem.src; o campo title confirma que o ASIN corresponde ao produto).
5. Escreva o artigo completo (frontmatter YAML + corpo Markdown) em src/content/artigos/<categoria>/<slug>.md seguindo o template do tipo (review, comparativo ou lista) e a regra de duplo funil do padrão.
6. Valide com `node scripts/validate-content.mjs --images` e corrija até passar. Rode `npm run build` para garantir que o site compila.
7. Atualize a fila com o utilitário: `node scripts/update-queue.mjs <id> published <slug>`; se um tema não puder ser feito (produto inexistente etc.), `node scripts/update-queue.mjs <id> skipped --erro "motivo"`.
8. Commit: "conteúdo: publica 5 artigos — lote <dia/mês hora> BRT" e `git push origin main`.
Não publique rascunhos, não altere o código do site e não crie mais de 5 artigos por execução.
```

Horários das 4 Routines: 07:00, 10:00, 19:00 e 22:00 (America/Sao_Paulo).

## Ramp-up e monitoramento

- Comece com 2 lotes/dia nas primeiras 2 a 3 semanas (comente dois crons), acompanhe indexação e cliques no Google Search Console, depois suba para 4 lotes.
- Acompanhe `content/queue/log.jsonl` (Opção A) ou o histórico das Routines (Opção B) para ver erros e temas pulados.
- Reabasteça a fila quando restarem menos de ~40 temas `pending`: peça ao Claude para gerar mais 200 temas seguindo o formato do arquivo e a taxonomia de `src/data/categorias.json`.
