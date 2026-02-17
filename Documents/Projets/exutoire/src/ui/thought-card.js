import { ACTIVE_CATEGORIES, CATEGORY_MAP } from "../core/categories.js";

export function createThoughtCard(thought, { onCategorize, onDelete }) {
  const card = document.createElement("article");
  card.className = "thought-card";
  card.tabIndex = 0;
  card.setAttribute("aria-label", `Pensée: ${thought.content}`);

  const text = document.createElement("p");
  text.className = "thought-content";
  text.textContent = thought.content;

  const row = document.createElement("div");
  row.className = "thought-actions";

  const status = document.createElement("p");
  status.className = "thought-status";
  status.setAttribute("aria-live", "polite");
  const currentCategory = thought.category
    ? CATEGORY_MAP[thought.category].label
    : CATEGORY_MAP["non-classe"].label;
  status.textContent = `Categorie enregistree: ${currentCategory}`;

  for (const category of ACTIVE_CATEGORIES) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `btn btn--compact ${category.buttonClass}`;
    button.setAttribute(
      "aria-pressed",
      String(thought.category === category.id),
    );
    button.setAttribute("aria-label", `Catégorie ${category.label}`);
    button.textContent = `${category.emoji} ${category.label}`;
    button.addEventListener("click", () =>
      onCategorize(thought.id, category.id),
    );
    row.append(button);
  }

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "btn btn--compact btn--danger";
  remove.textContent = "Supprimer";
  remove.addEventListener("click", () => onDelete(thought.id));
  row.append(remove);

  card.addEventListener("keydown", (event) => {
    const map = { 1: "action", 2: "idee", 3: "inquietude", 4: "information" };
    const category = map[event.key];
    if (!category) {
      return;
    }
    event.preventDefault();
    onCategorize(thought.id, category);
  });

  card.append(text, row, status);
  return card;
}
