import {
  getActiveSession,
  getSessionById,
  listSessions,
  listThoughtsBySession,
  putSession,
  putThought,
} from "../data/db.js";
import { decryptText, encryptText } from "../data/crypto.js";

function nowIso() {
  return new Date().toISOString();
}

function toStoredThought(thought) {
  const { content, ...stored } = thought;
  return stored;
}

function createSessionRecord() {
  return {
    id: crypto.randomUUID(),
    createdAt: nowIso(),
    status: "active",
    phase: "capture",
    timerEnabled: false,
    timerMinutes: null,
    closedAt: null,
  };
}

async function decryptThoughts(key, thoughts) {
  const output = [];
  for (const thought of thoughts) {
    const content = await decryptText(key, {
      ciphertext: thought.ciphertext,
      iv: thought.iv,
    });
    output.push({ ...thought, content });
  }
  return output;
}

export async function restoreOrCreateActiveSession() {
  const existing = await getActiveSession();
  if (existing) {
    return existing;
  }

  const created = createSessionRecord();
  await putSession(created);
  return created;
}

export async function loadSessionThoughts(
  key,
  sessionId,
  includeDeleted = true,
) {
  const thoughts = await listThoughtsBySession(sessionId, includeDeleted);
  const sorted = thoughts.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  return decryptThoughts(key, sorted);
}

export async function saveThought(key, sessionId, rawContent) {
  const content = rawContent.trim();
  if (!content) {
    return null;
  }

  const encrypted = await encryptText(key, content);
  const thought = {
    id: crypto.randomUUID(),
    sessionId,
    createdAt: nowIso(),
    category: null,
    categorizedAt: null,
    deleted: false,
    deletedAt: null,
    ciphertext: encrypted.ciphertext,
    iv: encrypted.iv,
  };

  await putThought(thought);
  return { ...thought, content };
}

export async function setSessionPhase(session, phase) {
  const next = { ...session, phase };
  await putSession(next);
  return next;
}

export async function categorizeThought(thought, category) {
  const next = {
    ...thought,
    category,
    categorizedAt: nowIso(),
  };
  await putThought(toStoredThought(next));
  return next;
}

export async function softDeleteThought(thought) {
  const next = {
    ...thought,
    deleted: true,
    deletedAt: nowIso(),
  };
  await putThought(toStoredThought(next));
  return next;
}

export async function closeSession(session) {
  const next = {
    ...session,
    status: "closed",
    phase: "done",
    closedAt: nowIso(),
  };
  await putSession(next);
  return next;
}

export async function startNewSession() {
  const created = createSessionRecord();
  await putSession(created);
  return created;
}

export async function loadHistorySummary() {
  const sessions = await listSessions();
  const summary = [];
  for (const session of sessions) {
    const thoughts = await listThoughtsBySession(session.id, false);
    const categorized = thoughts.filter((entry) => entry.category).length;
    summary.push({
      ...session,
      thoughtCount: thoughts.length,
      categorizedCount: categorized,
    });
  }
  return summary;
}

export async function loadSessionByIdWithThoughts(key, sessionId) {
  const session = await getSessionById(sessionId);
  if (!session) {
    return null;
  }
  const thoughts = await loadSessionThoughts(key, sessionId, false);
  return { session, thoughts };
}
