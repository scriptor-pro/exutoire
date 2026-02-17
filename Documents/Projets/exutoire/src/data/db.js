const DB_NAME = "exutoire-db";
const DB_VERSION = 1;

let dbPromise;

function openDb() {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("sessions")) {
        const store = db.createObjectStore("sessions", { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }

      if (!db.objectStoreNames.contains("thoughts")) {
        const store = db.createObjectStore("thoughts", { keyPath: "id" });
        store.createIndex("sessionId", "sessionId", { unique: false });
        store.createIndex("sessionDeleted", ["sessionId", "deleted"], {
          unique: false,
        });
      }

      if (!db.objectStoreNames.contains("keys")) {
        db.createObjectStore("keys", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

async function runReadWrite(storeName, callback) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const output = callback(store);
    tx.oncomplete = () => resolve(output);
    tx.onerror = () => reject(tx.error);
  });
}

async function runReadOnly(storeName, callback) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = callback(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function putSession(session) {
  return runReadWrite("sessions", (store) => store.put(session));
}

export async function getSessionById(sessionId) {
  return runReadOnly("sessions", (store) => store.get(sessionId));
}

export async function getActiveSession() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("sessions", "readonly");
    const index = tx.objectStore("sessions").index("status");
    const req = index.get("active");
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function listSessions() {
  const sessions = await runReadOnly("sessions", (store) => store.getAll());
  return sessions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function putThought(thought) {
  return runReadWrite("thoughts", (store) => store.put(thought));
}

export async function getThoughtById(thoughtId) {
  return runReadOnly("thoughts", (store) => store.get(thoughtId));
}

export async function listThoughtsBySession(sessionId, includeDeleted = true) {
  const db = await openDb();

  if (!includeDeleted) {
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction("thoughts", "readonly");
        const index = tx.objectStore("thoughts").index("sessionDeleted");
        const req = index.getAll([sessionId, false]);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } catch {
      const fallback = await new Promise((resolve, reject) => {
        const tx = db.transaction("thoughts", "readonly");
        const index = tx.objectStore("thoughts").index("sessionId");
        const req = index.getAll(sessionId);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      return fallback.filter((thought) => !thought.deleted);
    }
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction("thoughts", "readonly");
    const index = tx.objectStore("thoughts").index("sessionId");
    const req = index.getAll(sessionId);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function putKeyRecord(record) {
  return runReadWrite("keys", (store) => store.put(record));
}

export async function getKeyRecord(id) {
  return runReadOnly("keys", (store) => store.get(id));
}

export async function clearAllData() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["sessions", "thoughts", "keys"], "readwrite");
    tx.objectStore("sessions").clear();
    tx.objectStore("thoughts").clear();
    tx.objectStore("keys").clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
