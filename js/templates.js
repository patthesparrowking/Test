async function loadLabelTemplates() {
  const response = await fetch("data/labelTemplates.json");
  const templates = await response.json();

  renderEmptyLabels(templates);
}

function renderEmptyLabels(templates) {
  const container = document.getElementById("label-overview");
  container.innerHTML = "";

  templates.forEach(template => {
    const label = document.createElement("article");
    label.className = "herbarium-label";

    label.innerHTML = `
      <h3>${template.name}</h3>

      ${template.fields.map(field => `
        <div class="label-row">
          <span class="label-caption">${field.label}:</span>
          <span class="label-line"></span>
        </div>
      `).join("")}
    `;

    container.appendChild(label);
  });
}

document.addEventListener("DOMContentLoaded", loadLabelTemplates);