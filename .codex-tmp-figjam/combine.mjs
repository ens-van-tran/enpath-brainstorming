import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("./", import.meta.url).pathname;

const panels = [
  ["header.svg", 0, 0],
  ["pvb.svg", 240, 800],
  ["product-canvas.svg", 4000, 800],
  ["personas.svg", 9400, 800],
  ["customer-journeys.svg", 240, 5300],
  ["user-story-map.svg", 6800, 5300],
  ["cross-role-swimlane.svg", 240, 12000],
];

function nestSvg(svg, x, y) {
  return svg.replace(
    /<svg\s+([^>]*?)>/,
    (_, attrs) => `<svg x="${x}" y="${y}" ${attrs}>`,
  );
}

const nested = [];
for (const [file, x, y] of panels) {
  const svg = await readFile(join(root, file), "utf8");
  nested.push(nestSvg(svg, x, y));
}

const output = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="13600" height="19000" viewBox="0 0 13600 19000">',
  '  <rect width="13600" height="19000" fill="#FFFFFF"/>',
  ...nested,
  "</svg>",
  "",
].join("\n");

await writeFile(join(root, "enpath-discovery-map.svg"), output, "utf8");
