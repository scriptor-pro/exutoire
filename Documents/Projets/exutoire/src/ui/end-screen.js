export function renderEndScreen(container, { onNewSession }) {
  const section = document.createElement("section");
  section.className = "panel panel--center";

  const title = document.createElement("h2");
  title.textContent = "Session terminée";

  const subtitle = document.createElement("p");
  subtitle.className = "panel-helper";
  subtitle.textContent = "Exports générés";

  const action = document.createElement("button");
  action.type = "button";
  action.className = "btn btn--primary";
  action.textContent = "Nouvelle session";
  action.addEventListener("click", onNewSession);

  section.append(title, subtitle, action);
  container.replaceChildren(section);
}
