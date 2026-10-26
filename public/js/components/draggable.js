/* Torna elementos [data-draggable] arrastáveis (mouse, toque e setas do teclado) dentro do hero */
window.Draggable = {
  init: function () {
    document.querySelectorAll("[data-draggable]").forEach(this.enable);
  },

  enable: function (el) {
    var bounds = el.closest(".hero") || el.parentElement;
    var x = 0;
    var y = 0;
    var drag = null;

    /* Limites de deslocamento para o elemento não sair do container */
    function limits() {
      var box = bounds.getBoundingClientRect();
      var rect = el.getBoundingClientRect();
      var baseLeft = rect.left - x;
      var baseTop = rect.top - y;
      return {
        minX: box.left - baseLeft,
        maxX: box.right - baseLeft - rect.width,
        minY: box.top - baseTop,
        maxY: box.bottom - baseTop - rect.height
      };
    }

    function move(nextX, nextY, range) {
      x = Math.min(Math.max(nextX, range.minX), range.maxX);
      y = Math.min(Math.max(nextY, range.minY), range.maxY);
      el.style.transform = "translate(" + x + "px, " + y + "px)";
    }

    function stop() {
      drag = null;
      el.classList.remove("is-dragging");
    }

    el.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || event.target.closest("a, button")) return;
      drag = { pointerX: event.clientX, pointerY: event.clientY, x: x, y: y, range: limits() };
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    });

    el.addEventListener("pointermove", function (event) {
      if (!drag) return;
      move(
        drag.x + event.clientX - drag.pointerX,
        drag.y + event.clientY - drag.pointerY,
        drag.range
      );
    });

    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);

    el.addEventListener("keydown", function (event) {
      var step = 12;
      var delta = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step]
      }[event.key];
      if (!delta) return;
      event.preventDefault();
      move(x + delta[0], y + delta[1], limits());
    });
  }
};

window.Draggable.init();
