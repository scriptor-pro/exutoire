export function renderPhase1(container, { onSave }) {
  const section = document.createElement("section");
  section.className = "panel";

  const title = document.createElement("h2");
  title.textContent = "Phase 1 — Capture";

  const helper = document.createElement("p");
  helper.className = "panel-helper";
  helper.textContent = "Une pensée à la fois. Sans censure. Sans suppression.";

  const form = document.createElement("form");
  form.className = "capture-form";

  const label = document.createElement("label");
  label.setAttribute("for", "capture-input");
  label.textContent = "Saisir une pensée";

  const input = document.createElement("input");
  input.id = "capture-input";
  input.type = "text";
  input.name = "thought";
  input.className = "input";
  input.autocomplete = "off";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "btn btn--primary";
  button.textContent = "Enregistrer";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input.value;
    const ok = await onSave(value);
    if (ok) {
      form.reset();
      input.focus();
    }
  });

  form.append(label, input, button);
  section.append(title, helper, form);
  container.replaceChildren(section);
  input.focus();
}
