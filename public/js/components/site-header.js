/* Renderiza o header compartilhado e destaca a página atual na navegação. */
(function () {
  var placeholder = document.querySelector("[data-site-header]");
  if (!placeholder) return;

  var linkedinUrl = "https://www.linkedin.com/in/felipe-da-silva-carolino-10b7b8353/";
  var page = document.body.dataset.page;
  var base = page === "home" ? "" : "../";
  var pages = [
    { id: "home", href: base + "index.html", en: "Home", pt: "Início" },
    { id: "about", href: base + "pages/about.html", en: "About", pt: "Sobre" },
    { id: "projects", href: base + "pages/projects.html", en: "Projects", pt: "Projetos" },
    { id: "contact", href: base + "pages/contact.html", en: "Contact", pt: "Contato" }
  ];

  function renderLinks() {
    return pages
      .filter(function (item) {
        if (page === "article") {
          return item.id === "home" || item.id === "projects" || item.id === "contact";
        }
        return item.id !== page;
      })
      .map(function (item) {
        return (
          '<a href="' +
          item.href +
          '">' +
          '<span data-language="en">' +
          item.en +
          "</span>" +
          '<span hidden data-language="pt">' +
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
    '<a class="header__social" href="' +
    linkedinUrl +
    '" target="_blank" rel="noopener" aria-label="LinkedIn">' +
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />' +
    "</svg></a>" +
    '<div class="lang" role="group" aria-label="Language">' +
    '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
    '<button type="button" data-lang="pt" aria-pressed="false">PT</button>' +
    "</div>" +
    "</div>" +
    '<details class="mobile-nav"><summary><span data-language="en">Menu</span><span hidden data-language="pt">Menu</span></summary>' +
    '<nav class="nav" aria-label="Mobile navigation">' +
    renderLinks() +
    "</nav></details>" +
    "</header>";

  document.dispatchEvent(new CustomEvent("theme:sync"));
})();