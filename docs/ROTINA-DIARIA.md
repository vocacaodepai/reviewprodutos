# Rotina diária de publicação (10 artigos/dia: 5 da Amazon + 5 da Shopee)

Meta: **10 artigos por dia**, diluídos ao longo do dia, seguindo `docs/PADRAO-EDITORIAL.md`: 5 da Amazon e 5 da Shopee, 1 artigo por rodada, cada marketplace com 3 comparativos + 2 reviews.

## Como roda

A rotina é uma **Routine do Claude Code** (claude.ai/code → Routines), chamada "Review Produtos: lote de 5 artigos". Ela usa a assinatura do Claude, sem chave de API paga.

| Rodada | Amazon | Shopee | Formato |
| --- | --- | --- | --- |
| 1 | 08:52 | 08:22 | comparativo |
| 2 | 11:52 | 11:22 | review |
| 3 | 14:52 | 14:22 | comparativo |
| 4 | 17:52 | 17:22 | review |
| 5 | 20:52 | 20:22 | comparativo |

Horários de Brasília. As rodadas da Shopee saem 30 minutos antes das da Amazon para não disputarem a `main`. Cada rodada confere o limite diário (5 por marketplace) antes de publicar.

Os minutos quebrados evitam o pico de agendamentos na hora cheia.

Cada rodada segue à risca `docs/rotinas/lote.md`: clone isolado em `/tmp`, 5 temas da fila (`content/queue/topics.json`) de categorias diferentes, um redator por tema em paralelo, revisão, `astro check` + `validate-content --images` + `build`, PR para `main`, merge commit quando o CI fica verde e um informe curto.

Para mudar horários, pausar ou alterar a quantidade, edite a Routine em claude.ai/code. Para mudar o processo, edite `docs/rotinas/lote.md` (a Routine sempre lê a versão da `main`).

## Gerador via API (opcional, manual)

`.github/workflows/publicar-artigos.yml` + `scripts/generate-articles.mjs` produzem um lote pela Claude API. O agendamento foi desligado; o workflow só roda por *Actions → Publicar artigos → Run workflow* e exige o secret `ANTHROPIC_API_KEY` (cobrança por uso). Não use os dois no mesmo horário para não publicar em dobro.

## Ramp-up e monitoramento

- Acompanhe indexação e cliques no Google Search Console; se houver sinal de conteúdo em escala sem tração, reduza para 2 lotes/dia na Routine.
- O histórico de cada rodada fica nos PRs `claude/lote-*` e na fila (`published_slug`, `ultimo_erro` dos temas pulados).
- Reabasteça a fila quando restarem menos de ~40 temas `pending` (a própria rotina faz isso, conforme `docs/rotinas/lote.md`).
