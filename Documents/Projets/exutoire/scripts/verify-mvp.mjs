import { constants as fsConstants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { buildMarkdownExport } from "../src/data/export-md.js";
import { buildJsonExport } from "../src/data/export-json.js";
import { buildSessionFilename } from "../src/data/files.js";

const rootDir = resolve(process.cwd());

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function assertFilesExist(paths) {
  for (const relativePath of paths) {
    const absolutePath = resolve(rootDir, relativePath);
    await access(absolutePath, fsConstants.F_OK);
  }
}

async function verifyOfflineShell() {
  const requiredFiles = [
    "index.html",
    "manifest.webmanifest",
    "sw.js",
    "style/variables.css",
    "style/base.css",
    "style/components.css",
    "src/main.js",
    "src/version.js",
    "src/data/db.js",
    "src/data/crypto.js",
  ];

  await assertFilesExist(requiredFiles);

  const swPath = resolve(rootDir, "sw.js");
  const swContent = await readFile(swPath, "utf8");

  for (const filePath of requiredFiles) {
    assert(
      swContent.includes(`"./${filePath}"`),
      `Service worker shell is missing: ./${filePath}`,
    );
  }
}

function verifyExports() {
  const session = {
    id: "session-1",
    createdAt: "2026-02-17T08:45:00.000Z",
    closedAt: "2026-02-17T09:12:00.000Z",
    timerEnabled: false,
    timerMinutes: null,
  };

  const thoughts = [
    {
      id: "t1",
      content: "Appeler le dentiste",
      createdAt: "2026-02-17T08:45:01.000Z",
      category: "action",
      categorizedAt: "2026-02-17T09:00:00.000Z",
      deleted: false,
      deletedAt: null,
    },
    {
      id: "t2",
      content: "Tester une expo sonore",
      createdAt: "2026-02-17T08:46:00.000Z",
      category: "idee",
      categorizedAt: "2026-02-17T09:01:00.000Z",
      deleted: false,
      deletedAt: null,
    },
    {
      id: "t3",
      content: "Stress pour demain",
      createdAt: "2026-02-17T08:47:00.000Z",
      category: "inquietude",
      categorizedAt: "2026-02-17T09:02:00.000Z",
      deleted: false,
      deletedAt: null,
    },
    {
      id: "t4",
      content: "Numero de contrat",
      createdAt: "2026-02-17T08:48:00.000Z",
      category: "information",
      categorizedAt: "2026-02-17T09:03:00.000Z",
      deleted: false,
      deletedAt: null,
    },
    {
      id: "t5",
      content: "Penser a marcher",
      createdAt: "2026-02-17T08:49:00.000Z",
      category: null,
      categorizedAt: null,
      deleted: false,
      deletedAt: null,
    },
  ];

  const markdown = buildMarkdownExport(session, thoughts);
  assert(
    markdown.includes("## Actions concrètes"),
    "Missing Markdown section: Actions concretes",
  );
  assert(
    markdown.includes("## Idées créatives"),
    "Missing Markdown section: Idees creatives",
  );
  assert(
    markdown.includes("## Inquiétudes / émotions"),
    "Missing Markdown section: Inquietudes / emotions",
  );
  assert(
    markdown.includes("## Informations à garder"),
    "Missing Markdown section: Informations a garder",
  );
  assert(
    markdown.includes("## Non classé"),
    "Missing Markdown section: Non classe",
  );
  assert(
    markdown.includes("- Appeler le dentiste"),
    "Missing Markdown thought item",
  );

  const jsonRaw = buildJsonExport(session, thoughts);
  const json = JSON.parse(jsonRaw);

  assert(json.schemaVersion === 1, "Invalid JSON schemaVersion");
  assert(json.app === "Exutoire", "Invalid JSON app name");
  assert(Array.isArray(json.thoughts), "JSON thoughts is not an array");
  assert(
    json.thoughts.length === thoughts.length,
    "JSON thoughts length mismatch",
  );

  const mdFilename = buildSessionFilename(session.createdAt, "md");
  const jsonFilename = buildSessionFilename(session.createdAt, "json");

  assert(
    /^exutoire-\d{4}-\d{2}-\d{2}-\d{4}\.md$/.test(mdFilename),
    "Invalid Markdown filename format",
  );
  assert(
    /^exutoire-\d{4}-\d{2}-\d{2}-\d{4}\.json$/.test(jsonFilename),
    "Invalid JSON filename format",
  );
}

try {
  verifyExports();
  await verifyOfflineShell();
  process.stdout.write("MVP verification passed: export + offline shell.\n");
} catch (error) {
  process.stderr.write(`MVP verification failed: ${error.message}\n`);
  process.exit(1);
}
