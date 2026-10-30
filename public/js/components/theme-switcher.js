/* Controla a paleta ativa e salva a preferência do visitante. */
(function () {
  var KEY = "theme";
  var COOKIE_KEY = "portfolio_theme";
  var colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  var storedTheme = null;

  try {
    storedTheme = localStorage.getItem(KEY);
  } catch (error) {
    storedTheme = null;
  }

  function readCookieTheme() {
    var cookie = document.cookie.split(";").find(function (part) {
      return part.trim().indexOf(COOKIE_KEY + "=") === 0;
    });

    return cookie ? cookie.trim().slice(COOKIE_KEY.length + 1) : null;
  }

  function saveCookieTheme(value) {
    try {
      document.cookie =
        COOKIE_KEY +
        "=" +
        value +
        "; Max-Age=31536000; Path=/; SameSite=Lax";
      return readCookieTheme() === value;
    } catch (error) {
      return false;
    }
  }

  function saveLocalStorageTheme(value) {
    try {
      localStorage.setItem(KEY, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  var cookieTheme = readCookieTheme();
  if (cookieTheme === "dark" || cookieTheme === "light") {
    storedTheme = cookieTheme;
  } else if (storedTheme === "dark" || storedTheme === "light") {
    saveCookieTheme(storedTheme);
  }

  var hasStoredTheme = storedTheme === "dark" || storedTheme === "light";
  var theme = hasStoredTheme ? storedTheme : getSystemTheme();

  function getSystemTheme() {
    return colorScheme.matches ? "dark" : "light";
  }

  function syncThemeToggleButtons() {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    if (!buttons.length) return;

    var language = document.documentElement.lang === "pt-BR" ? "pt" : "en";
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.querySelectorAll("[data-theme-label]").forEach(function (label) {
        label.hidden = label.dataset.language !== language || label.dataset.themeLabel === theme;
      });
    });
  }

  function apply(nextTheme) {
    theme = nextTheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeToggleButtons();
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-theme-toggle]");
    if (!button) return;

    apply(theme === "dark" ? "light" : "dark");
    hasStoredTheme = true;
    var persisted = saveCookieTheme(theme);
    persisted = saveLocalStorageTheme(theme) || persisted;

    if (persisted) {
      button.removeAttribute("data-storage-unavailable");
    } else {
      button.setAttribute("data-storage-unavailable", "true");
    }
  });

  document.addEventListener("theme:sync", function () {
    syncThemeToggleButtons();
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
