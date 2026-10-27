// The checks make claims about themselves; this is where the claims are tested.
// contrast.mjs says it composites translucent layers: the veil fixture must fail it,
// and the same page without the veil must pass. Run by CI on every push.
import { execFileSync } from 'child_process';
import { mkdtempSync, readFileSync, readdirSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
const here = new URL('.', import.meta.url).pathname;
const run = mkdtempSync(join(tmpdir(), 'examined-'));
execFileSync('node', [join(here, 'contrast.mjs'), 'light'],
  { cwd: join(here, 'fixtures'), stdio: 'inherit', env: { ...process.env, MD_RUN_DIR: run } });
const r = JSON.parse(readFileSync(join(run, readdirSync(run)[0]), 'utf8'));
const by = t => r.findings.filter(f => f.target === t).length;
const ok = by('veil') > 0 && by('plain') === 0;
console.log(ok ? 'fixtures pass: the veil fails contrast, the plain page passes'
               : `fixtures FAIL: veil ${by('veil')} findings, plain ${by('plain')}`);
process.exitCode = ok ? 0 : 1;
