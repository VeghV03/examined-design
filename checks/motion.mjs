// Vestibular safety: prefers-reduced-motion is a person telling the OS that
// motion makes them sick, not a hint. An element still transitioning or
// animating once that preference is on did not read it.
// What it cannot see: motion driven by script (requestAnimationFrame, canvas, video),
// and motion that starts only when someone interacts.
import { targets, open, report } from './lib.mjs';
const T = await targets();
const { p, close } = await open();
await p.emulateMedia({ reducedMotion: 'reduce' });
const found = [];
for (const board of T) {
  await p.goto(board.url);
  const hits = await p.evaluate(() => {
    const tags = new Set();
    document.querySelectorAll('body *').forEach(el => {
      const s = getComputedStyle(el);
      if (parseFloat(s.transitionDuration) > 0 || parseFloat(s.animationDuration) > 0)
        tags.add(el.tagName.toLowerCase());
    });
    return [...tags];
  });
  for (const tag of hits) found.push({ target: board.id, detail: `still animating: <${tag}>` });
}
await close();
report('boards still animating under reduced motion', T.length, found, { noun: 'still animating' });
