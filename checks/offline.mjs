// Does the deliverable open with the network refused. An artifact that pulls a
// library from a CDN is useless on a plane and in five years. Run it against the
// viewer output as well as the boards.
// What it cannot see: a request made only after someone interacts, and a path on this
// machine that will not exist on the next one.
import { targets, open, report, protoFile } from './lib.mjs';
import { basename } from 'path';
const T = await targets();
const target = process.argv[2];
const { p, close } = await open();
await p.route('**', r => (r.request().url().startsWith('file://') ? r.continue() : r.abort()));
const found = [];
// A prototype is one file: check the file, not each board view of it.
const list = target ? [{ id: target, url: 'file://' + target }]
  : protoFile ? [{ id: basename(protoFile), url: 'file://' + protoFile }] : T;
for (const board of list) {
  const blocked = [];
  p.on('requestfailed', r => blocked.push(r.url()));
  await p.goto(board.url);
  const painted = await p.evaluate(() => document.body && document.body.innerText.trim().length > 0);
  if (blocked.length) found.push({ target: board.id, detail: `${blocked.length} external requests`, key: 'reaches the network' });
  else if (!painted) found.push({ target: board.id, detail: 'rendered empty' });
}
await close();
report('files that do not open with the network refused', list.length, found, { unit: 'files' });
