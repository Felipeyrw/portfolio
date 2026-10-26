/* Copia o valor do contato e apresenta o estado correspondente no botão. */
(function () {
  function showState(button, state) {
    button.querySelectorAll("[data-copy-state]").forEach(function (label) {
      label.hidden = label.dataset.copyState !== state;
    });
  }

  function fallbackCopy(value) {
    var field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      return document.execCommand("copy");
    } finally {
      field.remove();
    }
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).catch(function () {
        if (fallbackCopy(value)) return;
        throw new Error("Clipboard access failed");
      });
    }

    if (fallbackCopy(value)) return Promise.resolve();
    return Promise.reject(new Error("Clipboard access failed"));
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-copy]");
    if (!button) return;

    copyText(button.dataset.copy)
      .then(function () {
        showState(button, "done");
        window.setTimeout(function () {
          showState(button, "idle");
        }, 1600);
      })
      .catch(function () {
        showState(button, "failed");
        window.setTimeout(function () {
          showState(button, "idle");
        }, 2500);
      });
  });
})();
