import { APP_VERSION } from "./version.js";
import { getState, setState, subscribe } from "./core/state.js";
import {
  categorizeThought,
  closeSession,
  loadHistorySummary,
  loadSessionByIdWithThoughts,
  loadSessionThoughts,
  restoreOrCreateActiveSession,
  saveThought,
  setSessionPhase,
  softDeleteThought,
  startNewSession,
} from "./core/session.js";
import { getOrCreateCryptoKey } from "./data/crypto.js";
import { buildMarkdownExport } from "./data/export-md.js";
import { buildJsonExport } from "./data/export-json.js";
import { buildSessionFilename, downloadTextFile } from "./data/files.js";
import { createAppShell } from "./ui/layout.js";
import { renderPhase1 } from "./ui/phase1.js";
import { renderPhase2 } from "./ui/phase2.js";
import { renderHistoryList, renderHistorySession } from "./ui/history.js";
import { renderEndScreen } from "./ui/end-screen.js";
import { confirmDialog } from "./ui/dialog.js";

let cryptoKey;
let retryAction = null;
const appRoot = document.querySelector("#app");

function clearActionMessage() {
  retryAction = null;
  setState({ actionMessage: "", actionRetryable: false });
}

function setActionMessage(message, onRetry = null) {
  retryAction = typeof onRetry === "function" ? onRetry : null;
  setState({ actionMessage: message, actionRetryable: Boolean(retryAction) });
}

async function exportCurrentSession() {
  const state = getState();
  if (!state.activeSession) {
    return false;
  }

  const exportableThoughts = state.thoughts.filter(
    (thought) => !thought.deleted,
  );

  const markdown = buildMarkdownExport(state.activeSession, exportableThoughts);
  const json = buildJsonExport(state.activeSession, exportableThoughts);

  downloadTextFile(
    buildSessionFilename(state.activeSession.createdAt, "md"),
    "text/markdown;charset=utf-8",
    markdown,
  );
  downloadTextFile(
    buildSessionFilename(state.activeSession.createdAt, "json"),
    "application/json;charset=utf-8",
    json,
  );

  return true;
}

async function initializeApp() {
  try {
    cryptoKey = await getOrCreateCryptoKey();
    const activeSession = await restoreOrCreateActiveSession();
    const thoughts = await loadSessionThoughts(
      cryptoKey,
      activeSession.id,
      true,
    );

    setState({
      activeSession,
      thoughts,
      view: activeSession.phase === "categorize" ? "phase2" : "phase1",
      errorMessage: "",
      actionMessage: "",
      actionRetryable: false,
    });
  } catch (error) {
    setState({
      errorMessage:
        error instanceof Error
          ? error.message
          : "Erreur de démarrage inconnue.",
    });
  }
}

function render() {
  const state = getState();

  if (state.errorMessage) {
    appRoot.textContent = state.errorMessage;
    return;
  }

  const shell = createAppShell({
    version: APP_VERSION,
    alertMessage: state.actionMessage,
    alertRetryable: state.actionRetryable,
    onDismissAlert: () => clearActionMessage(),
    onRetryAlert: async () => {
      if (!retryAction) {
        return;
      }
      await retryAction();
    },
    showGoToPhase2: state.view === "phase1",
    showBackToSession:
      state.view === "history" || state.view === "history-session",
    timerText: state.activeSession?.timerEnabled
      ? `${state.activeSession.timerMinutes ?? 0} min`
      : "",
    onGoToPhase2: async () => {
      const nextSession = await setSessionPhase(
        state.activeSession,
        "categorize",
      );
      setState({ activeSession: nextSession, view: "phase2" });
    },
    onShowHistory: async function openHistory() {
      try {
        const history = await loadHistorySummary();
        setState({
          history,
          historySession: null,
          historyThoughts: [],
          view: "history",
          actionMessage: "",
          actionRetryable: false,
        });
      } catch {
        setActionMessage(
          "Impossible d'ouvrir l'historique pour le moment. Rechargez la page puis reessayez.",
          openHistory,
        );
      }
    },
    onBackToSession: () => {
      const fallbackView =
        state.activeSession?.status === "closed"
          ? "end"
          : state.activeSession?.phase === "categorize"
            ? "phase2"
            : "phase1";
      setState({
        view: fallbackView,
        actionMessage: "",
        actionRetryable: false,
      });
    },
    onManualExport: async () => {
      await exportCurrentSession();
    },
  });

  appRoot.replaceChildren(shell.app);

  if (state.view === "phase1") {
    renderPhase1(shell.main, {
      onSave: async (content) => {
        const saved = await saveThought(
          cryptoKey,
          state.activeSession.id,
          content,
        );
        if (!saved) {
          return false;
        }

        const thoughts = [...state.thoughts, saved];
        setState({ thoughts });
        return true;
      },
    });
    return;
  }

  if (state.view === "phase2") {
    renderPhase2(shell.main, {
      thoughts: state.thoughts,
      onCategorize: async (thoughtId, category) => {
        const target = state.thoughts.find(
          (thought) => thought.id === thoughtId,
        );
        if (!target) {
          return;
        }
        const updated = await categorizeThought(target, category);
        const thoughts = state.thoughts.map((entry) =>
          entry.id === thoughtId ? { ...entry, ...updated } : entry,
        );
        setState({ thoughts });
      },
      onDelete: async (thoughtId) => {
        const target = state.thoughts.find(
          (thought) => thought.id === thoughtId,
        );
        if (!target) {
          return;
        }

        const confirmed = await confirmDialog(
          "Déplacer cette pensée dans la corbeille ?",
        );
        if (!confirmed) {
          return;
        }

        const deleted = await softDeleteThought(target);
        const thoughts = state.thoughts.map((entry) =>
          entry.id === thoughtId ? { ...entry, ...deleted } : entry,
        );
        setState({ thoughts });
      },
      onFinish: async () => {
        const closed = await closeSession(state.activeSession);
        setState({ activeSession: closed });
        await exportCurrentSession();
        setState({ view: "end" });
      },
    });
    return;
  }

  if (state.view === "history") {
    renderHistoryList(shell.main, {
      sessions: state.history,
      onOpen: async function openHistorySession(sessionId) {
        try {
          const selected = await loadSessionByIdWithThoughts(
            cryptoKey,
            sessionId,
          );
          if (!selected) {
            setActionMessage("Cette session est introuvable.");
            return;
          }
          setState({
            historySession: selected.session,
            historyThoughts: selected.thoughts,
            view: "history-session",
            actionMessage: "",
            actionRetryable: false,
          });
        } catch {
          setActionMessage(
            "Impossible d'ouvrir cette session d'historique. Rechargez la page puis reessayez.",
            () => openHistorySession(sessionId),
          );
        }
      },
    });
    return;
  }

  if (state.view === "history-session") {
    renderHistorySession(shell.main, {
      session: state.historySession,
      thoughts: state.historyThoughts,
    });
    return;
  }

  renderEndScreen(shell.main, {
    onNewSession: async () => {
      const session = await startNewSession();
      setState({
        activeSession: session,
        thoughts: [],
        view: "phase1",
      });
    },
  });
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch {
    // Intentionally ignored: app still works online without SW.
  }
}

subscribe(render);
await initializeApp();
render();
await registerServiceWorker();
