# Felipe Carolino — Portfolio

Site estático em HTML, CSS e JavaScript puros (sem build). Abra `index.html` no navegador.

## Estrutura

```
index.html          redireciona para pages/home.html
pages/              home, about, projects, article, contact
themes/             light.css e dark.css (cores, fontes e filtro da foto)
css/                base.css, components.css, pages.css
js/
  theme.js          aplica o tema (?theme=dark)
  data/             site.js (dados) e i18n.js (textos EN/PT)
  components/       icons, language-switcher, header, views, marquee, copy-button, draggable
  main.js           ponto de entrada
assets/             foto e imagens
```

## Convenções

- Idioma: botão EN/PT no header; escolha salva em `localStorage` e repassada via `?lang=`.
- Tema: variáveis em `themes/`; troque com `?theme=dark`.
- Formatação: `npm install` e depois `npm run format` antes de cada entrega.
