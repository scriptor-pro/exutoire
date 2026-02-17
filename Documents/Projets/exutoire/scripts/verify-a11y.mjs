import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function read(relativePath) {
  return readFile(resolve(rootDir, relativePath), "utf8");
}

try {
  const baseCss = await read("style/base.css");
  const componentsCss = await read("style/components.css");
  const phase1Ui = await read("src/ui/phase1.js");
  const thoughtCardUi = await read("src/ui/thought-card.js");

  assert(
    baseCss.includes(":focus-visible"),
    "Missing visible focus style selector",
  );
  assert(
    baseCss.includes("outline: var(--focus-outline)"),
    "Missing visible focus outline rule",
  );
  assert(
    componentsCss.includes("min-height: 44px"),
    "Missing 44px minimum target size",
  );
  assert(
    phase1Ui.includes('setAttribute("for", "capture-input")'),
    "Missing form label binding",
  );
  assert(
    thoughtCardUi.includes("aria-pressed") &&
      thoughtCardUi.includes("aria-label"),
    "Missing ARIA attributes on category controls",
  );

  process.stdout.write(
    "A11y smoke passed: focus, target size, labels, ARIA.\n",
  );
} catch (error) {
  process.stderr.write(`A11y smoke failed: ${error.message}\n`);
  process.exit(1);
}
