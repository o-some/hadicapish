import { defineConfig } from "vite";
import { readdirSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";

const root = resolve(import.meta.dirname);
const ignored = new Set(["node_modules", "dist", "docs"]);
const htmlEntries = {};

function collect(directory) {
  for (const name of readdirSync(directory)) {
    if (ignored.has(name)) continue;
    const absolute = resolve(directory, name);
    if (statSync(absolute).isDirectory()) collect(absolute);
    else if (name.endsWith(".html")) htmlEntries[relative(root, absolute).replace(/\.html$/, "")] = absolute;
  }
}

collect(root);

export default defineConfig({
  base: "./",
  build: { rollupOptions: { input: htmlEntries } }
});
