import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const packagePath = resolve(rootDir, "package.json");
const versionPath = resolve(rootDir, "src/version.js");

const packageRaw = await readFile(packagePath, "utf8");
const pkg = JSON.parse(packageRaw);

let commitCount = "0";
try {
  commitCount = execSync("git rev-list --count HEAD", {
    stdio: ["ignore", "pipe", "ignore"],
  })
    .toString()
    .trim();
} catch {
  commitCount = "0";
}

const fullVersion = `${pkg.version}-build${commitCount}`;

const content = `export const APP_VERSION = "${fullVersion}";\n`;
await writeFile(versionPath, content, "utf8");

process.stdout.write(`Version injected: ${fullVersion}\n`);
