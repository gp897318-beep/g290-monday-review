import { mkdirSync, writeFileSync } from "node:fs";

// One-line review of my own Monday for "Monday, Reviewed in One
// Line": the 9am standup that ran 47 minutes. The joke turns on the
// word "standup" itself — a meeting named for standing, where nobody
// stood up, except the one thing that should have stayed down. A
// concrete number (47 minutes), a concrete detail (the standup), and
// the punchline lands in the final clause, deadpan and repeatable
// to a coworker the next morning.
const review =
  "My Monday standup lasted 47 minutes, and the only thing that " +
  "stood up was my blood pressure.";

// The gate requires UTF-8 text of 1-200 characters, a single line,
// not only whitespace. Normalise defensively, then enforce the
// limits before anything is written, so an invalid line can never
// ship. The review is a plain string literal kept in this file —
// nothing is read from the environment, the network, or anywhere
// else — so the program's output is fully determined by the code.
function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > 200 || line.includes("\n")) {
    throw new Error(
      `review must be one line of 1-200 chars, got ${line.length}`,
    );
  }
  return line;
}

const line = oneLine(review);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
