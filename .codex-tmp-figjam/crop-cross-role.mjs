import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("./cross-role-swimlane.svg", import.meta.url), "utf8");

for (const [name, x] of [["left", 0], ["right", 6560]]) {
  const cropped = source.replace(
    /<svg\s+[^>]*>/,
    `<svg xmlns="http://www.w3.org/2000/svg" width="6560" height="6600" viewBox="${x} 0 6560 6600">`,
  );
  await writeFile(new URL(`./cross-role-${name}.svg`, import.meta.url), cropped, "utf8");
}
