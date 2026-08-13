import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("./enpath-discovery-map.svg", import.meta.url), "utf8");
const xs = [0, 6800];
const ys = [0, 6800, 12200];

for (let row = 0; row < ys.length; row += 1) {
  for (let col = 0; col < xs.length; col += 1) {
    const tiled = source.replace(
      /<svg\s+[^>]*>/,
      `<svg xmlns="http://www.w3.org/2000/svg" width="6800" height="6800" viewBox="${xs[col]} ${ys[row]} 6800 6800">`,
    );
    await writeFile(new URL(`./tile-${row}-${col}.svg`, import.meta.url), tiled, "utf8");
  }
}
