/* Renderiza o header compartilhado e destaca a página atual na navegação. */
(function () {
  var placeholder = document.querySelector("[data-site-header]");
  if (!placeholder) return;

  var page = document.body.dataset.page;
  var base = page === "home" ? "" : "../";
  var pages = [
    { id: "home", href: base + "index.html", en: "Home", pt: "Início" },
    { id: "about", href: base + "pages/about.html", en: "About", pt: "Sobre" },
    {
      id: "projects",
      href: base + "pages/projects.html",
      en: "Projects",
      pt: "Projetos",
    },
    {
      id: "article",
      href: base + "pages/article.html",
      en: "Article",
      pt: "Artigo",
    },
    {
      id: "contact",
      href: base + "pages/contact.html",
      en: "Contact",
      pt: "Contato",
    },
  ];

  function renderLinks() {
    return pages
      .map(function (item) {
        var current = item.id === page ? ' aria-current="page"' : "";
        return (
          '<a href="' +
          item.href +
          '"' +
          current +
          '><span data-language="en">' +
          item.en +
          '</span><span hidden data-language="pt">' +
          item.pt +
          "</span></a>"
        );
      })
      .join("");
  }

  placeholder.outerHTML =
    '<header class="header container">' +
    '<button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />' +
    "</svg>" +
    '<span data-language="en" data-theme-label="dark">Dark mode</span>' +
    '<span hidden data-language="pt" data-theme-label="dark">Modo escuro</span>' +
    '<span hidden data-language="en" data-theme-label="light">Light mode</span>' +
    '<span hidden data-language="pt" data-theme-label="light">Modo claro</span>' +
    "</button>" +
    '<nav class="nav nav--desktop" aria-label="Main navigation">' +
    renderLinks() +
    "</nav>" +
    '<div class="header__right">' +
    '<div class="lang" role="group" aria-label="Language">' +
    '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
    '<button type="button" data-lang="pt" aria-pressed="false">PT</button>' +
    "</div>" +
    '<a class="btn btn--solid" href="https://github.com/Felipeyrw" target="_blank" rel="noopener">' +
    '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z" /></svg>' +
    "<span>GitHub</span></a>" +
    "</div>" +
    '<details class="mobile-nav"><summary><span data-language="en">Menu</span><span hidden data-language="pt">Menu</span></summary>' +
    '<nav class="nav" aria-label="Mobile navigation">' +
    renderLinks() +
    "</nav></details>" +
    "</header>";

  document.dispatchEvent(new CustomEvent("theme:sync"));
})();
