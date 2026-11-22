// Entry point for the post-x bounty.
// The entry is an X post: this program copies POST.json (which names the
// post's URL) from the repository into the output directory. Nothing else:
// the house reads the post itself from X.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
const src = join(here, "POST.json");
const dst = join(outDir, "POST.json");

if (!existsSync(src)) {
  throw new Error("POST.json is missing from the repository root");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// The grader runs this twice and requires identical bytes both times;
// verify the copy so a partial write fails loudly instead of silently.
if (!readFileSync(src).equals(readFileSync(dst))) {
  throw new Error("POST.json copy does not match the source");
}
