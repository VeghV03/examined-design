// WCAG 2.5.8 Target Size (Minimum): a clickable target under cfg.targetSize CSS
// px on a side is hard to hit precisely — for anyone with a motor or vision
// impairment, and for anyone at all on a touchscreen with a moving vehicle.
// What it cannot see: a target drawn with no element the control selector matches,
// and two targets closer together than the spacing exception allows.
import { cfg, targets, open, report, controls, noControls } from './lib.mjs';
const T = await targets();
const { p, close } = await open();
const found = [];
let seen = 0;
for (const board of T) {
  await p.goto(board.url);
  const [n, hits] = await p.evaluate(([min, sel]) => {
    const out = [];
    const cs = document.querySelectorAll(sel);
    cs.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && (r.width < min || r.height < min)) {
        const name = (el.textContent || '').trim().slice(0, 20) || el.tagName.toLowerCase();
        out.push({ name, detail: `"${name}" ${Math.round(r.width)}x${Math.round(r.height)}` });
      }
    });
    return [cs.length, out];
  }, [cfg.targetSize, controls]);
  seen += n;
  for (const h of hits) found.push({ target: board.id, detail: h.detail, key: `target under minimum: ${h.name}` });
}
await close();
if (!seen) console.log(`  ${noControls}`);
report(`boards with a target under ${cfg.targetSize}px`, T.length, found, { noun: `under ${cfg.targetSize}px` });
