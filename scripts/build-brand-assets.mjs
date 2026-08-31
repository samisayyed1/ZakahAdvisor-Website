#!/usr/bin/env node
/**
 * Regenerate every raster asset the site serves, from the committed sources in
 * `brand-source/`.
 *
 * Run `python3 scripts/build-brand-svgs.py` first — it produces the tightened
 * web SVGs and `src/app/icon.svg`, which this script rasterises.
 *
 * Nothing here is a design decision: it is compression and resizing only. The
 * SVGs remain the canonical assets for anything the browser renders.
 *
 * Usage: node scripts/build-brand-assets.mjs
 */

import { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

process.chdir(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));

const report = (file) =>
  console.log(`  ${file.padEnd(52)} ${fs.statSync(file).size.toLocaleString()} B`);

const iconSvg = fs.readFileSync("src/app/icon.svg");

/* App icons ---------------------------------------------------------------- */

await sharp(iconSvg, { density: 400 })
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile("src/app/apple-icon.png");
report("src/app/apple-icon.png");

// favicon.ico, assembled by hand: an ICO is a small header plus embedded PNGs,
// and this avoids pulling in a dependency for one file.
{
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map((size) =>
      sharp(iconSvg, { density: 800 })
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer(),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  const directory = Buffer.alloc(16 * sizes.length);
  let offset = header.length + directory.length;

  images.forEach((image, index) => {
    const at = index * 16;
    directory.writeUInt8(sizes[index], at); // width
    directory.writeUInt8(sizes[index], at + 1); // height
    directory.writeUInt8(0, at + 2); // palette size
    directory.writeUInt8(0, at + 3); // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(image.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += image.length;
  });

  fs.writeFileSync(
    "src/app/favicon.ico",
    Buffer.concat([header, directory, ...images]),
  );
  report("src/app/favicon.ico");
}

for (const size of [192, 512]) {
  const out = `public/brand/icon-${size}.png`;
  await sharp(iconSvg, { density: 800 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  report(out);
}

/* Raster logo fallbacks ----------------------------------------------------- */
// For social platforms, e-mail signatures and the OG image generator only.
// The brand guide mandates SVG everywhere the browser renders the mark.

for (const [source, out] of [
  ["public/brand/logo-horizontal.svg", "public/brand/logo-horizontal.png"],
  [
    "public/brand/logo-horizontal-inverse.svg",
    "public/brand/logo-horizontal-inverse.png",
  ],
]) {
  await sharp(fs.readFileSync(source))
    .resize({ width: 1200 })
    .png({ compressionLevel: 9 })
    .toFile(out);
  report(out);
}

/* Fundraiser imagery -------------------------------------------------------- */
// Both were extracted from the approved documents at their embedded resolution
// — neither is a re-screenshot. The rating report keeps its full 1024px width
// because its text has to stay readable.

await sharp("brand-source/media/charity-rating-example.png")
  .png({ compressionLevel: 9, effort: 10 })
  .toFile("public/fundraiser/charity-rating-example.png");
report("public/fundraiser/charity-rating-example.png");

await sharp("brand-source/media/checklist-cover.png")
  .resize({ width: 760, withoutEnlargement: true })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile("public/fundraiser/zakah-self-audit-checklist-cover.png");
report("public/fundraiser/zakah-self-audit-checklist-cover.png");
