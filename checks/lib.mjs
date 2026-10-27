// Shared plumbing so each check stays under thirty lines and says one thing.
//
// Config is found in the project first (examined.config.json beside the thing
// being checked), then beside this file (checks.config.json). Relative paths resolve against
// whichever config was found, not against this directory — otherwise a pack
// installed under node_modules resolves every path into itself.
import { chromium } from 'playwright';
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname, join, basename } from 'path';
import { createHash } from 'crypto';

const here = new URL('.', import.meta.url).pathname;
const found = [join(process.cwd(), 'examined.config.json'),
               join(here, 'checks.config.json')].find(existsSync);
const cfgDir = found ? dirname(found) : here;

const user = found ? JSON.parse(readFileSync(found, 'utf8')) : {};

// A prototype target: one examined-design file. Its DATA is read once, here, so the
// checks that need meaning (routes, vocab) read it from the same object the viewer does.
export const protoFile = user.target && user.target.mode === 'prototype'
  ? resolve(cfgDir, user.target.file) : null;
export const proto = protoFile ? readProto(protoFile) : null;
function readProto(f) {
  if (!existsSync(f)) { console.error(`\n  no prototype at ${f}.\n`); process.exit(2); }
  const s = readFileSync(f, 'utf8');
  const a = s.indexOf('<!-- examined:data -->'), b = s.indexOf('<!-- /examined:data -->');
  if (a < 0 || b < 0) { console.error(`\n  ${f} is not an examined-design prototype.\n`); process.exit(2); }
  const body = s.slice(a, b), i = body.indexOf('{'), j = body.lastIndexOf('}');
  return JSON.parse(body.slice(i, j + 1));
}
const frame = proto && proto.meta && proto.meta.frame;

export const cfg = Object.assign({
  boards: '../boards',
  // Boards in a prototype have one fixed frame, so they are checked at that width only;
  // a folder of built pages or a running app is checked at the responsive widths.
  widths: frame ? [frame.w] : [1440, 1024, 768],
  height: frame ? frame.h : 900,
  executablePath: null,
  scrimSelector: '.scrim',
  cellChildSelector: '.chip',
  densityBudget: 400,
  targetSize: 24
}, user);

// What counts as a control. A design system that draws its buttons as <span class="btn">
// says so in DATA.meta.controls, or in "controls" in the config. Without that, target-size
// and the control half of structure find nothing to measure on such boards, and pass
// without being able to fail; both say so when they find no control anywhere.
export const controls = ['button', 'a', 'input', 'select', 'textarea', '[role=button]', '[role=link]']
  .concat([proto && proto.meta && proto.meta.controls, cfg.controls].filter(Boolean)).join(',');
export const noControls = 'no control found on any board, so this could not fail. If the design system draws ' +
  'controls without button, a or a role, name them in DATA.meta.controls (for example ".btn").';

// The vocabulary policy is the one authored thing a decoupled run still needs.
// A word list cannot be inferred from a DOM, so it is asked for on its own.
export function loadPolicy() {
  if (proto && proto.policy && (proto.policy.terms || []).length) return proto.policy;
  const p = resolve(cfgDir, cfg.vocabPolicy || 'vocab.policy.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

const idFromUrl = u => {
  const p = new URL(u).pathname.replace(/\/+$/, '');
  return p ? p.replace(/^\//, '').replace(/\.html?$/, '').replace(/\//g, '-') : 'index';
};

async function crawl(t) {
  const origin = new URL(t.start).origin, limit = t.limit || 50;
  const b = await chromium.launch(cfg.executablePath ? { executablePath: cfg.executablePath } : {});
  const p = await b.newPage();
  // Dedupe on the reported name, not the URL: "/" and "/index.html" are one page,
  // and two targets sharing a name would double every count taken from them.
  const seen = new Set(), named = new Set(), out = [], queue = [t.start];
  while (queue.length && out.length < limit) {
    const u = queue.shift().split('#')[0];
    if (seen.has(u)) continue;
    seen.add(u);
    let res = null;
    try { res = await p.goto(u, { waitUntil: 'domcontentloaded' }); } catch { continue; }
    if (!res || res.status() >= 400) continue;
    const name = idFromUrl(u);
    if (!named.has(name)) { named.add(name); out.push({ id: name, url: u }); }
    for (const l of await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.href)))
      if (l.startsWith(origin)) queue.push(l);
  }
  await b.close();
  return out;
}

// What is being checked: a prototype, a folder of built pages, an explicit route
// list, or a crawl. Most checks never need to know which — they take a url and a
// name. The two that need meaning (routes, vocab) read the prototype's DATA.
function fail(why) {
  console.error(`\n  ${why}.`);
  console.error(`  Point "target" in ${found || 'examined.config.json'} at what you want checked:`);
  console.error('    { "target": { "mode": "prototype", "file": "./prototype.html" } }');
  console.error('    { "target": { "mode": "dir",   "dir": "./dist" } }');
  console.error('    { "target": { "mode": "crawl", "start": "http://localhost:3000" } }');
  console.error('  Or run `node cli/examined.mjs init` to write one.\n');
  process.exit(2);
}

let cached = null;
export async function targets() {
  if (cached) return cached;
  const t = cfg.target || { mode: 'dir', dir: cfg.boards };
  if (t.mode === 'prototype') {
    // Each board alone, at full size: #board=Name. The query string differs per board so
    // every navigation is a real load; a hash-only change would keep the last board.
    const base = 'file://' + protoFile;
    cached = Object.keys(proto.screens).map(n => {
      const e = encodeURIComponent(n);
      return { id: n, url: `${base}?b=${e}#board=${e}`, urlDark: `${base}?b=${e}&t=dark#board=${e}&theme=dark` };
    });
  }
  else if (t.mode === 'urls')
    cached = t.routes.map(r => ({ id: idFromUrl(new URL(r, t.base).href), url: new URL(r, t.base).href }));
  else if (t.mode === 'crawl')
    cached = await crawl(t);
  else {
    const d = resolve(cfgDir, t.dir || cfg.boards);
    if (!existsSync(d)) fail(`no boards at ${d}`);
    cached = readdirSync(d).filter(f => f.endsWith('.html')).sort()
      .map(f => ({ id: f.replace(/\.html$/, ''), url: 'file://' + join(d, f) }));
  }
  if (!cached.length) fail('the target resolved to nothing to check');
  return cached;
}

export async function open(width = cfg.widths[0]) {
  const b = await chromium.launch(cfg.executablePath ? { executablePath: cfg.executablePath } : {});
  const p = await b.newPage({ viewport: { width, height: cfg.height } });
  return { b, p, close: () => b.close() };
}

// A finding is identified by what it is, not by where it sat in this run's output.
// Volatile numbers are normalised out of the identity: a contrast ratio drifting
// from 3.12 to 3.40 is the same finding, and a fingerprint that rotated on it would
// report one fix and one regression on a day nothing happened.
const norm = s => String(s).toLowerCase().replace(/[\d.]+/g, '#').replace(/\s+/g, ' ').trim();
export const fingerprint = (check, target, key) =>
  createHash('sha256').update(`${check} ${target} ${norm(key)}`).digest('hex').slice(0, 12);

// Every label is written plural, because that is the usual case. Exactly one
// finding is common enough that "1 boards with a structure failure" would be on
// screen most days, and a tool that cannot count to one is not persuasive about
// counting to 158.
//
// The unit is the first plural word, not the first word — "declared routes that do
// not bind" carries it second. The verb only needs fixing in the labels that have
// one, and a non-global replace only ever touches the first.
function one(n, label) {
  if (n !== 1) return label;
  return label.replace(/\b(\w+)s\b/, '$1').replace(/ do not /, ' does not ');
}

// One number, one line, every time. Nothing else prints a summary.
//
// Findings arrive one per hit, not one per board. Three contrast failures on one
// screen are three things a person can fix, waive or regress independently, and
// collapsing them into "board affected" makes two of the three unaddressable.
// The printed shape still groups by board, because that is how the number reads.
export function report(label, total, findings = [], opts = {}) {
  const check = opts.check || basename(process.argv[1] || 'check', '.mjs');
  const records = findings.map(f => ({
    check,
    target: f.target,
    detail: f.detail,
    fingerprint: fingerprint(check, f.target, f.key ?? f.detail),
  }));

  const byTarget = new Map();
  for (const r of records) {
    if (!byTarget.has(r.target)) byTarget.set(r.target, []);
    byTarget.get(r.target).push(r);
  }
  for (const [target, rs] of byTarget) {
    const noun = opts.noun ? ` ${opts.noun}` : '';
    console.log(rs.length === 1
      ? `  ${target}: ${rs[0].detail}`
      : `  ${target}: ${rs.length}${noun} — ${rs[0].detail}`);
  }

  // routes and links count the dead route or link; every other check counts the
  // board. Both print the same way, so the unit being counted lives in the label.
  const affected = opts.count === 'items' ? records.length : byTarget.size;
  console.log(`\n${total} ${one(total, opts.unit || 'boards')} · ${affected} ${one(affected, label)}`);

  // A run writes its findings down so the next run can tell new from known.
  // Standalone there is nothing to compare against, and nothing is written.
  writeResult({ check, label, total, affected, findings: records });
  return affected;
}

// A check that could not run has not passed. It says why, writes an empty result
// marked skipped, and exits 0 — so a missing word list never reads as a clean run.
export function skip(why, ...how) {
  console.log(`  ${why}`);
  for (const line of how) console.log(`  ${line}`);
  writeResult({ check: basename(process.argv[1] || 'check', '.mjs'), skipped: why, findings: [] });
  process.exit(0);
}

function writeResult(result) {
  const dir = process.env.MD_RUN_DIR;
  if (!dir) return;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${result.check.replace(/[^a-z0-9]+/gi, '-')}.json`),
    JSON.stringify(result, null, 2) + '\n');
}
