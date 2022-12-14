import * as fs from "fs";
import * as path from "path";
import { createSvg } from "..";
import * as grids from "@snk/types/__fixtures__/grid";
import { snake3 as snake } from "@snk/types/__fixtures__/snake";
import { getBestRoute } from "@snk/solver/getBestRoute";

const drawOptions = {
  sizeBorderRadius: 2,
  sizeCell: 16,
  sizeDot: 12,
  colorBorder: "#1b1f230a",
  colorDots: { 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39" },
  colorEmpty: "rgba(200,200,200,0.1)",
  colorSnake: "blue",
  dark: {
    colorEmpty: "rgba(200,200,200,0.1)",
    colorDots: { 1: "#01311f", 2: "#034525", 3: "#0f6d31", 4: "#00c647" },
  },
};

const gifOptions = { frameDuration: 100, step: 1 };

const dir = path.resolve(__dirname, "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

for (const [key, grid] of Object.entries(grids))
  it(`should generate ${key} svg`, async () => {
    const chain = [snake, ...getBestRoute(grid, snake)!];

    const svg = await createSvg(grid, chain, drawOptions, gifOptions);

    expect(svg).toBeDefined();

    fs.writeFileSync(path.resolve(dir, key + ".svg"), svg);
  });
