const state = {
  view: "phase1",
  activeSession: null,
  thoughts: [],
  history: [],
  historySession: null,
  historyThoughts: [],
  errorMessage: "",
  actionMessage: "",
  actionRetryable: false,
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  for (const listener of listeners) {
    listener(state);
  }
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
