function formatDate(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function renderHistoryList(container, { sessions, onOpen }) {
  const section = document.createElement("section");
  section.className = "panel";

  const title = document.createElement("h2");
  title.textContent = "Historique";

  const list = document.createElement("ul");
  list.className = "history-list";

  if (sessions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Aucune session enregistrée.";
    section.append(title, empty);
    container.replaceChildren(section);
    return;
  }

  for (const session of sessions) {
    const item = document.createElement("li");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-item";
    button.textContent = `${formatDate(session.createdAt)} — ${session.thoughtCount} pensées (${session.categorizedCount} classées)`;
    button.addEventListener("click", () => onOpen(session.id));

    item.append(button);
    list.append(item);
  }

  section.append(title, list);
  container.replaceChildren(section);
}

export function renderHistorySession(container, { session, thoughts }) {
  const section = document.createElement("section");
  section.className = "panel";

  const title = document.createElement("h2");
  title.textContent = `Session du ${formatDate(session.createdAt)}`;

  const list = document.createElement("ul");
  list.className = "history-thoughts";

  for (const thought of thoughts) {
    const item = document.createElement("li");
    const label = thought.category ?? "non classé";
    item.textContent = `${thought.content} — ${label}`;
    list.append(item);
  }

  section.append(title, list);
  container.replaceChildren(section);
}
