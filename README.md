# O Ninho da Mariazinha — site

Site estático (HTML/CSS/JS puro, sem build necessário).

## Estrutura de pastas

```
/
├── index.html
├── sobre.html
├── acoes.html
├── impacto.html
├── noticias.html
├── apoiar.html
├── voluntariado.html
├── privacidade.html
├── css/
│   └── style.css        ← todo o CSS do site
├── js/
│   └── main.js           ← modais, menu mobile, slider, gráfico
└── images/
    └── *.jpg              ← todas as imagens do site
```

## Publicar no GitHub Pages (provisório, sem domínio próprio nem SSL configurado à parte)

1. Crie um repositório novo no GitHub (pode ser privado ou público).
2. Faça upload de todo o conteúdo desta pasta para a raiz do repositório
   (mantendo a estrutura `css/`, `js/`, `images/` tal como está).
3. No repositório, vá a **Settings → Pages**.
4. Em "Source", escolha a branch `main` (ou `master`) e a pasta `/ (root)`.
5. Grave. Ao fim de 1–2 minutos o GitHub disponibiliza um URL do género:
   `https://SEU-UTILIZADOR.github.io/NOME-DO-REPOSITORIO/`

Esse URL já vem com **HTTPS incluído automaticamente** pelo GitHub — não precisa
de configurar SSL à parte enquanto usar este domínio `github.io`. Quando tiver
o domínio definitivo, basta apontar o DNS para o GitHub Pages (ou mudar de
alojamento) e o site funciona da mesma forma, sem alterações ao código.

## Por resolver antes de publicar definitivamente

- Link do Google Forms (procure pelo texto `SUBSTITUIR-PELO-LINK-DO-FORMULARIO-GOOGLE`
  dentro de `index.html`, `acoes.html` e `voluntariado.html` — é o botão do modal
  "Quero ser voluntário").
- Texto da página **Sobre** (história da associação e da Mariazinha) — está
  marcado no site como ilustrativo.
- Política de Privacidade — é um modelo de referência, recomenda-se revisão
  por jurista antes de publicar em definitivo.
- Dados do gráfico de impacto — atualmente ilustrativos.
