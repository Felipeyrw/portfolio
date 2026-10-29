# Felipe Carolino — Portfolio

Site estático em HTML, CSS e JavaScript puros (sem build). O `index.html` é a página inicial e funciona como entrada do site, tanto ao abrir localmente quanto na hospedagem.

## Estrutura

```
index.html          página inicial
pages/              about, projects, article, contact; home.html mantém compatibilidade com a URL antiga
themes/             light.css e dark.css (cores, fontes e filtro da foto)
css/                base.css, components.css, pages.css
js/components/      scripts de idioma, tema, cópia e interação
assets/             foto, imagens de projetos e ícones
```

## Convenções

- Idioma: botão EN/PT no header; escolha salva em `localStorage`.
- Tema: segue a preferência de cor do navegador/sistema até uma escolha manual; o botão no header salva essa escolha em `localStorage`, com variáveis em `themes/`.
- Formatação: `npm install` e depois `npm run format` antes de cada entrega.
