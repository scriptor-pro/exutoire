export function createAppShell({
  onGoToPhase2,
  onShowHistory,
  onBackToSession,
  onManualExport,
  onDismissAlert,
  onRetryAlert,
  version,
  showGoToPhase2,
  showBackToSession,
  timerText,
  alertMessage,
  alertRetryable,
}) {
  const app = document.createElement("div");
  app.className = "app-shell";

  const header = document.createElement("header");
  header.className = "app-header";

  const title = document.createElement("h1");
  title.className = "app-title";
  title.textContent = "Exutoire";

  const actions = document.createElement("div");
  actions.className = "header-actions";

  if (timerText) {
    const timer = document.createElement("p");
    timer.className = "timer-chip";
    timer.textContent = timerText;
    actions.append(timer);
  }

  if (showBackToSession) {
    const back = document.createElement("button");
    back.type = "button";
    back.className = "btn btn--ghost";
    back.textContent = "Retour session";
    back.addEventListener("click", onBackToSession);
    actions.append(back);
  } else {
    const history = document.createElement("button");
    history.type = "button";
    history.className = "btn btn--ghost";
    history.textContent = "Historique";
    history.addEventListener("click", onShowHistory);
    actions.append(history);

    const exportButton = document.createElement("button");
    exportButton.type = "button";
    exportButton.className = "btn btn--ghost";
    exportButton.textContent = "Exporter";
    exportButton.addEventListener("click", onManualExport);
    actions.append(exportButton);

    if (showGoToPhase2) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "btn btn--primary";
      close.textContent = "Clôturer";
      close.addEventListener("click", onGoToPhase2);
      actions.append(close);
    }
  }

  header.append(title, actions);

  if (alertMessage) {
    const alert = document.createElement("div");
    alert.className = "alert-banner";
    alert.setAttribute("role", "alert");

    const text = document.createElement("p");
    text.textContent = alertMessage;

    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "btn btn--ghost";
    dismiss.textContent = "Fermer";
    dismiss.addEventListener("click", onDismissAlert);

    alert.append(text);
    if (alertRetryable) {
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "btn btn--ghost";
      retry.textContent = "Reessayer";
      retry.addEventListener("click", onRetryAlert);
      alert.append(retry);
    }
    alert.append(dismiss);
    app.append(header, alert);
  } else {
    app.append(header);
  }

  const main = document.createElement("main");
  main.className = "app-main";

  const footer = document.createElement("footer");
  footer.className = "app-footer";
  footer.textContent = `Exutoire v${version}`;

  app.append(main, footer);

  return { app, main };
}
