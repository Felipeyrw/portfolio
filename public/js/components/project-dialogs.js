(function () {
  var repositories = {
    Koffe: "https://github.com/Felipeyrw/KoffeApp",
    "Jonas AI": "https://github.com/Felipeyrw/jonasAI",
    "Business KPI Automation":
      "https://github.com/Felipeyrw/automacaoIndicadores",
    "Automação de Indicadores":
      "https://github.com/Felipeyrw/automacaoIndicadores",
    "Planej.ai": "https://github.com/Felipeyrw/planejai",
    SellingControl: "https://github.com/Felipeyrw/SellingControl",
    DevRoast: "https://github.com/Felipeyrw/devroast",
  };

  var summaries = {
    Koffe: {
      en: "Offline-First management for barbershops and massage clinics.",
      pt: "Gestão offline-first para barbearias e clínicas.",
    },
    "Jonas AI": {
      en: "WhatsApp AI assistant for customer service and scheduling.",
      pt: "Assistente de IA no WhatsApp para atendimento e agendamentos.",
    },
    "Business KPI Automation": {
      en: "Creates business KPI reports from spreadsheets.",
      pt: "Gera relatórios de indicadores a partir de planilhas.",
    },
    "Automação de Indicadores": {
      en: "Creates business KPI reports from spreadsheets.",
      pt: "Gera relatórios de indicadores a partir de planilhas.",
    },
    "Planej.ai": {
      en: "Financial planning to help you reach your goals.",
      pt: "Planejamento financeiro para alcançar suas metas.",
    },
    SellingControl: {
      en: "Manage products, suppliers and sales in one place.",
      pt: "Organize produtos, fornecedores e vendas em um só lugar.",
    },
    DevRoast: {
      en: "Get direct reviews and scores for your code.",
      pt: "Receba análises diretas e notas para seus códigos.",
    },
  };

  function addLocalizedText(element, english, portuguese) {
    var labels = [
      { language: "en", text: english },
      { language: "pt", text: portuguese },
    ];

    labels.forEach(function (label) {
      var span = document.createElement("span");
      span.dataset.language = label.language;
      span.textContent = label.text;
      span.hidden =
        document.documentElement.lang !==
        (label.language === "pt" ? "pt-BR" : "en");
      element.appendChild(span);
    });
  }

  document.querySelectorAll(".project").forEach(function (project) {
    var heading = project.querySelector("h3");
    var description = project.querySelector("p");
    var technologies = project.querySelector(".chips");
    if (!heading || !description) return;

    var title = heading.textContent.trim();
    var preview = document.createElement("div");
    preview.className = "project__preview";
    preview.appendChild(heading.cloneNode(true));

    var intro = document.createElement("p");
    intro.classList.add("project__intro");
    var summary = summaries[title];
    if (summary) {
      ["en", "pt"].forEach(function (language) {
        var text = document.createElement("span");
        text.dataset.language = language;
        text.textContent = summary[language];
        text.hidden =
          document.documentElement.lang !==
          (language === "pt" ? "pt-BR" : "en");
        intro.appendChild(text);
      });
    } else {
      intro.textContent = description.textContent.trim();
    }
    preview.appendChild(intro);

    if (technologies) preview.appendChild(technologies.cloneNode(true));

    var dialog = document.createElement("dialog");
    dialog.className = "project__dialog";
    dialog.setAttribute("aria-label", title);

    var closeButton = document.createElement("button");
    closeButton.className = "btn btn--ghost project__dialog-close";
    closeButton.type = "button";
    addLocalizedText(closeButton, "Close", "Fechar");
    closeButton.addEventListener("click", function () {
      dialog.close();
    });

    var body = document.createElement("div");
    body.className = "project__dialog-body";
    while (project.firstChild) body.appendChild(project.firstChild);

    var githubLink = document.createElement("a");
    githubLink.className = "btn btn--solid project__github";
    githubLink.href = repositories[title] || "https://github.com/Felipeyrw";
    githubLink.target = "_blank";
    githubLink.rel = "noopener";
    addLocalizedText(githubLink, "View on GitHub", "Ver no GitHub");

    dialog.appendChild(closeButton);
    dialog.appendChild(body);
    dialog.appendChild(githubLink);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    var openButton = document.createElement("button");
    openButton.className = "btn btn--ghost project__open";
    openButton.type = "button";
    addLocalizedText(openButton, "View details", "Ver detalhes");
    openButton.addEventListener("click", function () {
      dialog.showModal();
    });

    project.appendChild(preview);
    project.appendChild(openButton);
    project.appendChild(dialog);
  });
})();
