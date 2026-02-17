import { createThoughtCard } from "./thought-card.js";

export function renderPhase2(
  container,
  { thoughts, onCategorize, onDelete, onFinish },
) {
  const section = document.createElement("section");
  section.className = "panel";

  const title = document.createElement("h2");
  title.textContent = "Phase 2 — Catégorisation";

  const helper = document.createElement("p");
  helper.className = "panel-helper";
  helper.textContent =
    "Raccourcis clavier: 1 Action, 2 Idée, 3 Inquiétude, 4 Information.";

  const list = document.createElement("div");
  list.className = "thought-list";

  const activeThoughts = thoughts.filter((thought) => !thought.deleted);
  if (activeThoughts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Aucune pensée à classer.";
    list.append(empty);
  } else {
    for (const thought of activeThoughts) {
      list.append(createThoughtCard(thought, { onCategorize, onDelete }));
    }
  }

  const finish = document.createElement("button");
  finish.type = "button";
  finish.className = "btn btn--primary";
  finish.textContent = "Terminer et exporter";
  finish.addEventListener("click", onFinish);

  section.append(title, helper, list, finish);
  container.replaceChildren(section);
}
