import { mkdirSync, writeFileSync } from "node:fs";

// One-line entry: the whole internet in a single word.
const LINE = "doomscroll";
const MAX_CHARS = 32;

const problems: string[] = [];
if (!LINE.trim()) problems.push("line is empty or whitespace only");
if (LINE.length > MAX_CHARS)
  problems.push(`line is ${LINE.length} chars, over the ${MAX_CHARS} limit`);
if (LINE.includes("\n")) problems.push("line must be a single line");
if (LINE.trim().split(/\s+/).length !== 1)
  problems.push("line must be exactly one word");
if (problems.length > 0) {
  for (const p of problems) console.error(`invalid entry: ${p}`);
  process.exit(1);
}

// Theme guard: the word must be a single lowercase word, no digits or spaces.
if (!/^[a-z]+$/.test(LINE)) {
  console.error("invalid entry: line must be one lowercase word");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);
