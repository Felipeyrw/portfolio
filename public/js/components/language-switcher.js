/* Alterna os textos presentes no HTML entre português e inglês. */
(function () {
  var KEY = "lang";
  var supported = ["en", "pt"];
  var language = "en";

  try {
    var queryLanguage = new URLSearchParams(location.search).get(KEY);
    var storedLanguage = localStorage.getItem(KEY);
    if (supported.indexOf(queryLanguage) !== -1) {
      language = queryLanguage;
      localStorage.setItem(KEY, language);
    } else if (supported.indexOf(storedLanguage) !== -1) {
      language = storedLanguage;
    }
  } catch (error) {
    language = new URLSearchParams(location.search).get(KEY) === "pt" ? "pt" : "en";
  }

  function apply(nextLanguage) {
    language = supported.indexOf(nextLanguage) !== -1 ? nextLanguage : "en";
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-language]").forEach(function (content) {
      content.hidden = content.dataset.language !== language;
    });
    var activeTheme = document.documentElement.getAttribute("data-theme") || "light";
    document.querySelectorAll("[data-theme-label]").forEach(function (label) {
      label.hidden = label.dataset.language !== language || label.dataset.themeLabel === activeTheme;
    });
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });
    document.querySelectorAll("[data-alt-en][data-alt-pt]").forEach(function (image) {
      image.alt = language === "pt" ? image.dataset.altPt : image.dataset.altEn;
    });
    document.querySelectorAll("[data-drag-title-en][data-drag-title-pt]").forEach(function (element) {
      element.title = language === "pt" ? element.dataset.dragTitlePt : element.dataset.dragTitleEn;
    });
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
      var parts = href.split("#");
      var path = parts[0].split("?")[0];
      link.setAttribute("href", path + "?lang=" + language + (parts.length > 1 ? "#" + parts.slice(1).join("#") : ""));
    });
    var pageTitle = document.body.dataset["title" + (language === "pt" ? "Pt" : "En")];
    if (pageTitle) document.title = "Felipe Carolino — " + pageTitle;
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-lang]");
    if (!button || supported.indexOf(button.dataset.lang) === -1) return;

    apply(button.dataset.lang);
    try {
      localStorage.setItem(KEY, language);
      history.replaceState(null, "", "?lang=" + language + location.hash);
    } catch (error) {
      button.setAttribute("data-storage-unavailable", "true");
    }
  });

  apply(language);
})();
