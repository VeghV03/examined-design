// Four questions a screen must answer for a person who cannot see it:
// is there a heading, is every control labelled, is any status colour-only,
// is any line of prose too long to track. 42 boards had no heading.
// What it cannot see: whether the heading says the right thing, whether a label
// describes what the control does, and a status shown by colour without [data-status].
import { targets, open, report, controls, noControls } from './lib.mjs';
const T = await targets();
const { p, close } = await open();
const found = [];
let seen = 0;
for (const board of T) {
  await p.goto(board.url);
  const [n, hits] = await p.evaluate(sel => {
    const out = [];
    if (!document.querySelector('h1,h2,h3,[role=heading]')) out.push('no heading element');
    const cs = document.querySelectorAll(sel);
    cs.forEach(c => {
      const name = (c.getAttribute('aria-label') || c.textContent || c.getAttribute('title') || '').trim();
      if (!name) out.push(`unlabelled <${c.tagName.toLowerCase()}>`);
    });
    document.querySelectorAll('[data-status]').forEach(s => {
      if (!(s.textContent || '').trim() && !s.getAttribute('aria-label')) out.push('status carried by colour alone');
    });
    for (const el of document.querySelectorAll('p,li,[data-prose]')) {
      const t = (el.textContent || '').trim();
      if (t.length > 40 && el.getBoundingClientRect().width / parseFloat(getComputedStyle(el).fontSize) > 40)
        out.push(`line measure over 40em: "${t.slice(0, 24)}"`);
    }
    return [cs.length, out];
  }, controls);
  seen += n;
  for (const detail of hits) found.push({ target: board.id, detail });
}
await close();
if (!seen) console.log(`  ${noControls}`);
report('boards with a structure failure', T.length, found);
