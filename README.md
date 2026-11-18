# Albimar - Distribuidora de Bebidas

Site estático (HTML, CSS e JS puros), pronto para o GitHub Pages.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `albimar`).
2. Envie **todos** os arquivos desta pasta para a raiz do repositório:
   `index.html`, `style.css`, `script.js`, `logo.svg`, `favicon.svg`.
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**, branch **main** e pasta **/(root)**. Salve.
5. Em 1 ou 2 minutos o site fica em `https://SEU-USUARIO.github.io/albimar/`.

## Trocar os contatos (quando quiser)

No `index.html`, procure por:

- `5511999999999` → número do WhatsApp com DDI + DDD (aparece em 2 lugares, mais o texto `(11) 99999-9999`)
- `albimar.bebidas` → usuário do Instagram (link e texto)

## Mapa

O mapa usa o embed do Google Maps com o endereço
Rua Ana do Sacramento Andrade, 315, Furnas, São Paulo.
Para mudar, edite o parâmetro `q=` no `src` do `<iframe>` em `index.html`.

## Cores

Definidas no início do `style.css` (`:root`): verde `#065f2c` / `#16a34a` e amarelo `#FFC929`.
