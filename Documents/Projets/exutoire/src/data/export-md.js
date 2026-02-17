import { CATEGORY_MAP, CATEGORY_ORDER } from "../core/categories.js";

function formatDateTitle(iso) {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
}

function normalizeCategory(category) {
  return category ?? "non-classe";
}

export function buildMarkdownExport(session, thoughts) {
  const lines = [];
  lines.push(`# Exutoire — ${formatDateTitle(session.createdAt)}`);
  lines.push("");

  for (const key of CATEGORY_ORDER) {
    const meta = CATEGORY_MAP[key];
    lines.push(`## ${meta.exportTitle}`);

    const bucket = thoughts.filter(
      (thought) => normalizeCategory(thought.category) === key,
    );
    if (bucket.length === 0) {
      lines.push("- ");
    } else {
      for (const thought of bucket) {
        lines.push(`- ${thought.content}`);
      }
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}
