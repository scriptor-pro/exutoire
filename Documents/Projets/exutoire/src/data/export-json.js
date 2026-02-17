import { APP_VERSION } from "../version.js";

export function buildJsonExport(session, thoughts) {
  const payload = {
    schemaVersion: 1,
    app: "Exutoire",
    version: APP_VERSION,
    session: {
      id: session.id,
      createdAt: session.createdAt,
      closedAt: session.closedAt,
      timerEnabled: session.timerEnabled,
      timerMinutes: session.timerMinutes,
    },
    thoughts: thoughts.map((thought) => ({
      id: thought.id,
      content: thought.content,
      createdAt: thought.createdAt,
      category: thought.category,
      categorizedAt: thought.categorizedAt,
      deleted: thought.deleted,
      deletedAt: thought.deletedAt,
    })),
  };

  return JSON.stringify(payload, null, 2) + "\n";
}
