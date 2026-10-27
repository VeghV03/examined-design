// Every text node against the colour that actually reaches the eye, in both themes.
// The text colour is composited (source-over) through every background beneath it,
// and then through any translucent layer painted above it at the text's centre.
// Version 1 of this check claimed to do that and read declared colours instead; a
// 34% white veil took text from 4.74:1 to 2.53:1 while it passed. What it still
// cannot see: text whose centre is clear but whose edges sit under a layer, gradients
// and images behind text, and anti-aliasing. translucency.mjs looks for the layers
// themselves. Text behind a modal scrim is inert and skipped; so are disabled
// controls, which WCAG 1.4.3 exempts.
import { cfg, targets, open, report } from './lib.mjs';
const T = await targets();
const theme = process.argv[2] || 'light';
const { p, close } = await open();
const found = [];
for (const board of T) {
  await p.goto(theme === 'dark' && board.urlDark ? board.urlDark : board.url);
  await p.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
  const hits = await p.evaluate(scrim => {
    const lum = c => { const g = v => { v /= 255; return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
      return .2126 * g(c[0]) + .7152 * g(c[1]) + .0722 * g(c[2]); };
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
    const rgba = s => { const m = (s || '').match(/[\d.]+/g); if (!m) return null;
      const v = m.map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
    // source-over: top painted on bottom
    const over = (t, b) => { const a = t[3] + b[3] * (1 - t[3]); if (!a) return [0, 0, 0, 0];
      return [0, 1, 2].map(i => (t[i] * t[3] + b[i] * b[3] * (1 - t[3])) / a).concat([a]); };
    const opacity = el => { let o = 1; for (let n = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity); return o; };
    const beneath = el => {
      const chain = []; for (let n = el; n; n = n.parentElement) chain.unshift(n);
      let c = [255, 255, 255, 1];                       // the page under everything
      for (const n of chain) { const b = rgba(getComputedStyle(n).backgroundColor); if (b && b[3] > 0) c = over(b, c); }
      return c;
    };
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length || !(el.textContent || '').trim()) continue;
      if (el.closest('[aria-disabled="true"],:disabled')) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const stack = document.elementsFromPoint(x, y);
      const i = stack.indexOf(el);
      const above = (i < 0 ? [] : stack.slice(0, i)).filter(n => !n.contains(el) && !el.contains(n));
      if (above.some(n => n.matches(scrim) || n.closest(scrim))) continue;   // behind a modal: inert
      const cs = getComputedStyle(el), fgc = rgba(cs.color); if (!fgc) continue;
      let bg = beneath(el);
      let fg = over([fgc[0], fgc[1], fgc[2], fgc[3] * opacity(el)], bg);
      for (const n of above.reverse()) {                // bottom-most layer first
        const b = rgba(getComputedStyle(n).backgroundColor);
        if (b && b[3] > 0 && b[3] < 1) { bg = over(b, bg); fg = over(b, fg); }
      }
      const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
      const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
      const got = ratio(fg, bg), text = el.textContent.trim().slice(0, 24);
      if (got < need) out.push({ text, detail: `"${text}" ${got.toFixed(2)}:1` });
    }
    return out;
  }, cfg.scrimSelector);
  // The theme is part of the check, not the board: the same label can fail in dark
  // and pass in light, and one identity for both would hide whichever ran second.
  for (const h of hits) found.push({ target: board.id, detail: h.detail, key: `under contrast threshold: ${h.text}` });
}
await close();
report(`boards with a contrast failure (${theme})`, T.length, found,
  { check: `contrast-${theme}`, noun: 'under threshold' });
