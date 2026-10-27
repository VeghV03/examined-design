# Contributing

The pack is small on purpose: one prototype harness, one build that refuses on two things, thirteen
checks that print a number, and skills that follow the loop of the paper. Anything added to it should
say what it rests on and what it cannot see, the same as a claim on a screen. Keep that in mind and
most decisions about a PR make themselves.

## Before you open anything

Read `AGENTS.md` for the layout and `skills/examined-design-harness/SKILL.md` for what a prototype is
required to be: five marked blocks, a `DATA` object with a hand-kept core and a derived part, links
bound by text. The [reference](docs/reference.md) has the whole schema. Most rejected PRs would not
have been if these had been read first.

## New checks

A check is a file under thirty lines in `checks/` that tests one property and prints one number. Its
first lines say what it looks for and **what it cannot see**; a check without that second sentence
will be sent back. Look at `density.mjs` for the shape:

```js
// Element count per screen at the real data scale, not the demo scale.
// What it cannot see: whether the count is the scale the product really has.
import { cfg, targets, open, report } from './lib.mjs';
const T = await targets();
const { p, close } = await open();
const found = [];
for (const board of T) {
  await p.goto(board.url);
  // test one thing, and push one finding per hit
  found.push({ target: board.id, detail: `${n} elements, budget ${cfg.densityBudget}`, key: 'over budget' });
}
await close();
report('boards over budget', T.length, found);
```

- `targets()` gives you every board of a prototype (each opened alone, in board-only mode), every page
  of a folder, or every route of a running app. Write the check once; it runs against all three.
- Read the config it needs (a budget, a selector, a viewport width) from `cfg`, and add the default to
  `lib.mjs` and `checks.config.json`. A project overrides it in its own `examined.config.json`.
- If the check needs what a board *means* (its links, its zone in the vocabulary policy), read it from
  `proto`, the prototype's `DATA`, exported by `lib.mjs`. Never parse the viewer's DOM for it.
- `report()` is the only thing that prints a summary line. Do not add a second one.
- **One finding per hit, not one per board.** Three failures on one board are three things a person
  can fix, waive or regress independently. `report()` groups them back together for printing.
- **Give the finding a stable `key`.** The fingerprint is built from it, and the fingerprint is what
  lets a baseline tell a known finding from a new one. `detail` is for a person to read and may carry a
  measurement that moves; `key` names the thing that is wrong and nothing else. Digits are normalised
  out of both, so a ratio drifting from 3.12 to 3.40 stays one finding. Anything that changes between
  two runs of an unchanged board does not belong in the identity: a fingerprint that rotates on its own
  reports a fix and a regression on a quiet day, and a baseline that noisy gets deleted within a week.
- If the check counts something other than boards (a dead link), pass `{ count: 'items' }` and name the
  unit in the label.
- If the check cannot run, call `skip(why, ...how)` rather than returning a clean zero. A check that
  tested nothing has not passed, and `baseline` refuses to record a run where one errored.
- Register it in the `checks` array in `run-all.mjs`, and add a row to the README's table with both
  columns filled: what a pass shows, and what it cannot see.
- It **prints**; it does not refuse. The build refuses on exactly two things (a link whose label is not
  on its board, and an id that does not resolve), because both make the prototype say something false
  about itself. A third refusal is a decision with a cost; propose it separately, with the failure it
  prevents and why a printed number would not catch it in time.

Open the PR with a board, real or added to `examples/demo`, that the check actually flags, so the
number is not theoretical. If the check claims to measure something a person cannot easily see (a
composited colour, a computed size), add a fixture to `checks/fixtures/` and a case to
`test-fixtures.mjs` that fails when the claim is false. Version 1 of `contrast` is why.

## Changes to the harness

`harness/build.py` decides what is derived and what refuses; `harness/protolib.py` is the only way
patches touch a prototype; `harness/src/` is the viewer inlined into every file. A change to any of
them must leave `examples/demo/rebuild.sh` producing the same prototype, or say in the PR why it should
not. Run it, then:

```sh
python3 harness/build.py examples/demo/prototype.html --check
python3 harness/render.py examples/demo/prototype.html --both
node checks/run-all.mjs
```

and look at the renders. A change to the viewer is not done until someone has opened the file with the
network off. Existing prototypes take a new viewer with `python3 harness/protolib.py upgrade <file>`,
which rewrites the runtime, viewer and CSS blocks and never touches `DATA` or the design system.

A change to the shape of `DATA` should start as an issue. Every prototype already made depends on it.

## New skills

A skill follows one article of the paper and carries that article's rule in its first lines. It says
when to use it, what it reads, what it writes, and what it hands to the next stage. It never tells the
model to write a decision, a "so I can", or a rationale on a person's behalf; those stay as visible
blanks. Keep `SKILL.md` under about two hundred lines; long material goes in a file beside it.

## Reopening a rule

The rules in the skills come from one project, argued in the paper. If one does not hold on a
different kind of product, open an issue with the rule, the case it failed on, and what you did
instead. Name the objection (article 13): "this felt slow" is not one; "on a product with one screen,
the map view showed nothing the screen did not" is. If the rule is changed, the changelog says why the
old one looked right.

## Bug reports

"The build refused when it should not have" or "this should have refused and did not" is the most
useful kind of report, and it is only actionable with the input that produced it. Attach the smallest
prototype (or patch sequence) that reproduces it and the exact command you ran.

## What does not need an issue first

Wording changes to a `SKILL.md` that do not change what it instructs, cosmetic changes to the viewer's
CSS, and corrections to the docs are fine as small PRs. Anything that changes what the build refuses,
what a check tests, or the shape of `DATA` should start as an issue, so the trade-off is argued before
the diff is.
