# Instruções do projeto Review Produtos (reviewprodutos.com.br)

## Regras do dono (Bruno Danello)

- **Merge automático autorizado:** pull requests abertos pelo Claude para a `main` podem ser mergeados automaticamente, sem pedir confirmação, quando o CI estiver verde, não houver conflitos e não houver comentários de revisão pendentes. Use merge commit (não reescreva histórico). Depois do merge, avise em uma linha.
- **Fim de toda entrega ou publicação:** terminar a mensagem com as pendências do dono (`docs/PENDENCIAS-DONO.md`, cada uma com o link de onde fazer) e com o link clicável do site: https://reviewprodutos.com.br
- O domínio oficial é **sem www**: `https://reviewprodutos.com.br`.
- Tag de afiliado Amazon: `reviewprodutos-20`. Google Analytics: `G-55940SV53K`.
- Autor de todos os artigos: `bruno-danello` (`src/data/autores.json`).
- O site **não** menciona que o conteúdo é feito com IA (artigos, páginas institucionais, rodapé, metadados). Continua proibido alegar teste físico ou experiência pessoal que não houve.
- **Botões de compra:** "Comprar agora na Amazon" (nunca "Ver preço"). O aviso de afiliado fica **só no rodapé** (bloco "Transparência"); nada de avisos ou rótulos "Link de afiliado" no meio dos artigos.
- **Preço:** todo produto leva `precoMercado` (estimativa de preço de mercado em várias lojas + variação nos últimos meses, com fontes de comparadores). Nunca o preço da Amazon, nunca R$ no corpo do texto.
- Artigos **não** exibem fontes de pesquisa nem o texto "Como este conteúdo foi produzido"; devem ter vários botões de compra ao longo do texto.

## Rotina diária de publicação

- Roda como **Routine do Claude Code** (assinatura do Claude, sem API paga): 4 lotes de 5 artigos por dia (10 comparativos de 2 ou 3 produtos + 10 reviews de produto único; sem listas) (06:52, 09:52, 18:52 e 21:52 de Brasília). Roteiro completo e obrigatório: `docs/rotinas/lote.md`. Toda rodada inclui revisão de erros e segurança (`node scripts/site-health.mjs --live` + revisão do que mudou na `main`).
- O workflow `.github/workflows/publicar-artigos.yml` (Claude API) fica só para disparo manual; não reative o agendamento dele.

## Antes de commitar

```bash
npx astro check                      # 0 erros
node scripts/validate-content.mjs    # todos os artigos válidos
npm run build                        # build + índice de busca
```

Padrão editorial: `docs/PADRAO-EDITORIAL.md`. Regras de Amazon Associados, AdSense e Google: `docs/PESQUISA-REFERENCIAS.md`.
