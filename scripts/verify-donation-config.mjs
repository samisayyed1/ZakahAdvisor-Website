#!/usr/bin/env node
/**
 * Production readiness gate for the donation flow.
 *
 * Every monthly support tier must resolve to an absolute https: checkout URL
 * before the site is built for production. Run directly, or via
 * `npm run build:production`, which runs it before `next build`.
 *
 * Exit codes: 0 = every tier configured, 1 = at least one missing or invalid.
 */

import fs from "node:fs";
import path from "node:path";

const TIERS = ["10", "25", "50", "100", "200"];
const varName = (tier) => `NEXT_PUBLIC_DONATE_${tier}_URL`;

/** Minimal .env reader — enough for `KEY=value`, no dependency required. */
function readEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match) continue;
    out[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const root = process.cwd();
const fileEnv = {
  ...readEnvFile(path.join(root, ".env")),
  ...readEnvFile(path.join(root, ".env.production")),
  ...readEnvFile(path.join(root, ".env.local")),
};

const resolve = (key) => process.env[key] ?? fileEnv[key];

const isValid = (value) => {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const problems = [];

for (const tier of TIERS) {
  const key = varName(tier);
  const value = resolve(key);
  if (!value) {
    problems.push(`${key} is not set ($${tier}/month tier)`);
  } else if (!isValid(value)) {
    problems.push(`${key} is not an absolute https: URL ($${tier}/month tier)`);
  }
}

const siteUrl = resolve("NEXT_PUBLIC_SITE_URL");
if (!siteUrl) {
  problems.push(
    "NEXT_PUBLIC_SITE_URL is not set (canonical URLs, Open Graph and sitemap would fall back to localhost)",
  );
} else if (!isValid(siteUrl)) {
  problems.push("NEXT_PUBLIC_SITE_URL is not an absolute https: URL");
}

if (problems.length > 0) {
  console.error("\n✗ Deployment configuration is incomplete:\n");
  for (const problem of problems) console.error(`  • ${problem}`);
  console.error(
    "\nSet these in the deployment environment (see .env.example), then re-run.\n" +
      "Until they are set, tier buttons render disabled rather than sending donors to the wrong place.\n",
  );
  process.exit(1);
}

console.log("✓ Donation links and site URL are configured for production.");
