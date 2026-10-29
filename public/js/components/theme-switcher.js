/* Controla a paleta ativa e salva a preferência do visitante. */
(function () {
  var KEY = "theme";
  var colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  var storedTheme = null;

  try {
    storedTheme = localStorage.getItem(KEY);
  } catch (error) {
    storedTheme = null;
  }

  var hasStoredTheme = storedTheme === "dark" || storedTheme === "light";
  var theme = hasStoredTheme ? storedTheme : getSystemTheme();

  function getSystemTheme() {
    return colorScheme.matches ? "dark" : "light";
  }

  function apply(nextTheme) {
    theme = nextTheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    var language = document.documentElement.lang === "pt-BR" ? "pt" : "en";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.querySelectorAll("[data-theme-label]").forEach(function (label) {
        label.hidden = label.dataset.language !== language || label.dataset.themeLabel === theme;
      });
    });
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-theme-toggle]");
    if (!button) return;

    apply(theme === "dark" ? "light" : "dark");
    hasStoredTheme = true;
    try {
      localStorage.setItem(KEY, theme);
    } catch (error) {
      button.setAttribute("data-storage-unavailable", "true");
    }
  });

  colorScheme.addEventListener("change", function (event) {
    if (!hasStoredTheme) apply(event.matches ? "dark" : "light");
  });

  window.addEventListener("storage", function (event) {
    if (event.key !== KEY) return;

    hasStoredTheme = event.newValue === "dark" || event.newValue === "light";
    apply(hasStoredTheme ? event.newValue : getSystemTheme());
  });

  apply(theme);
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        apply(theme);
      },
      { once: true }
    );
  }
})();
