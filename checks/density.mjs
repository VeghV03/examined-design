// Element count per screen at the real data scale, not the demo scale.
// A list looks calm with six rows and unusable with six hundred. Set
// densityBudget in examined.config.json from the scale the product actually sees.
// What it cannot see: whether the board was drawn at the real scale; it counts what is there.
import { cfg, targets, open, report } from './lib.mjs';
const T = await targets();
const { p, close } = await open();
const found = [];
for (const board of T) {
  await p.goto(board.url);
  const n = await p.evaluate(() => document.querySelectorAll('body *').length);
  if (n > cfg.densityBudget)
    found.push({ target: board.id, detail: `${n} elements, budget ${cfg.densityBudget}`, key: 'over density budget' });
}
await close();
report('boards over the density budget', T.length, found);
