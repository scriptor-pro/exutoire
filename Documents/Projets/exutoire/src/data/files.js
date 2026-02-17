function two(value) {
  return String(value).padStart(2, "0");
}

export function buildSessionFilename(createdAt, extension) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = two(date.getMonth() + 1);
  const day = two(date.getDate());
  const hours = two(date.getHours());
  const minutes = two(date.getMinutes());
  return `exutoire-${year}-${month}-${day}-${hours}${minutes}.${extension}`;
}

export function downloadTextFile(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const href = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
