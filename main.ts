// main.ts copies the rant in entry.txt to MAKEFUN_OUTPUT_DIR/entry.txt.
// It validates the entry first so an over-long or empty rant never reaches the grader.
// The entry is read from disk next to this file, so the output always matches entry.txt.
// Length is counted in code points, matching the contest's 400-character limit.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const content = readFileSync(entryPath, "utf8");

if (content.trim().length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}

if (Array.from(content).length > 400) {
  console.error("entry.txt exceeds 400 characters");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), content, "utf8");
