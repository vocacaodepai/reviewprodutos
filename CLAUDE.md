# Instruções do projeto Review Produtos (reviewprodutos.com.br)

## Regras do dono (Bruno Danello)

- **Merge automático autorizado:** pull requests abertos pelo Claude para a `main` podem ser mergeados automaticamente, sem pedir confirmação, quando o CI estiver verde, não houver conflitos e não houver comentários de revisão pendentes. Use merge commit (não reescreva histórico). Depois do merge, avise em uma linha.
- O domínio oficial é **sem www**: `https://reviewprodutos.com.br`.
- Tag de afiliado Amazon: `reviewprodutos-20`. Google Analytics: `G-55940SV53K`.
- Autor de todos os artigos: `bruno-danello` (`src/data/autores.json`).
- Artigos **não** exibem fontes de pesquisa nem o texto "Como este conteúdo foi produzido"; devem ter vários botões de compra ao longo do texto.

## Antes de commitar

```bash
npx astro check                      # 0 erros
node scripts/validate-content.mjs    # todos os artigos válidos
npm run build                        # build + índice de busca
```

Padrão editorial: `docs/PADRAO-EDITORIAL.md`. Regras de Amazon Associados, AdSense e Google: `docs/PESQUISA-REFERENCIAS.md`.
