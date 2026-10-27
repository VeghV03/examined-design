// Does every declared link bind to text on its board. The build refuses on the same
// property; this is the standalone report, run against the rendered board, so it also
// catches a board whose markup was edited by hand after the build. Written after 22 of
// 162 routes turned out to point at buttons deleted months earlier. The rule is the
// viewer's: the deepest element whose trimmed text is the label.
// What it cannot see: whether the link goes to the right board.
import { targets, open, report, proto, skip } from './lib.mjs';
if (!proto) skip('no prototype — route binding needs declared links.', 'links.mjs checks a live app instead.');
const T = await targets();
const S = proto.screens, L = proto.links || {};
const { p, close } = await open();
const found = [];
let total = 0;
for (const board of T) {
  const rules = L[board.id] || [];
  total += rules.length;
  if (!rules.length) continue;
  await p.goto(board.url);
  const missing = await p.evaluate(labels => {
    const all = [...document.querySelectorAll('#board *')];
    return labels.filter(label => !all.some(el => (el.textContent || '').trim() === label &&
      ![...el.children].some(c => (c.textContent || '').trim() === label)));
  }, rules.map(r => r[0]));
  for (const [label, to] of rules) {
    if (!S[to]) found.push({ target: board.id, detail: `"${label}" → "${to}" is not a screen` });
    else if (missing.includes(label)) found.push({ target: board.id, detail: `"${label}" is not on the board` });
  }
}
await close();
const reach = new Set([...Object.values(L).flat().map(r => r[1]), ...(proto.globalLinks || []).map(r => r[1])]);
const unreachable = Object.keys(S).filter(n => !reach.has(n) && !S[n].entry && !S[n].variantOf && S[n].kind !== 'entrance');
if (unreachable.length) console.log(`  no way in: ${unreachable.join(', ')}`);
report(`declared links that do not bind (of ${total})`, T.length, found, { count: 'items' });
