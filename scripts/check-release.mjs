import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const configText = readFileSync(resolve("assets/js/config.js"), "utf8");
const blockedPatterns = [
  /\[[A-ZÄÖÜ][^\]]+\]/,
  /hello@\[domain\]\.com/,
  /\+49 6204 000000/,
  /previewMode:\s*true/,
  /portraitsApproved:\s*false/,
  /legalApproved:\s*false/,
  /paymentsConfigured:\s*false/,
  /calendarConfigured:\s*false/
];
const matches = blockedPatterns.filter(pattern => pattern.test(configText)).map(String);
if (matches.length) {
  console.error("PUBLIC RELEASE BLOCKED: unresolved production requirements remain.");
  matches.forEach(match => console.error(` - ${match}`));
  process.exit(1);
}
console.log("Release gate passed.");
