---
name: examined-design-harness
description: The prototype contract for examined-design work. Read it before drawing, editing or checking any board; it covers the single prototype file and its five blocks, the DATA fields, what the build refuses, one scripted patch per change, and rendering every touched board in light and dark.
---
# The harness

**Output:** one prototype file (`prototype.html`), a folder of numbered patch scripts that made
it, renders you looked at, and the records the stages write (rounds, decision log, stories).

The harness is the single-file prototype and the working process around it: multiple-choice
rounds → decision log → board edits → story strings that point at boards. The prototype is the
source of truth for copy. Stories quote it; a scope document is brought level with it
(examined-design-drift); nothing regenerates it.

Paths below are relative to the examined-design repo. The CLI is `node cli/examined.mjs …`, or
`examined …` after `npm link` in the repo. It is not on npm.

## Start one

```sh
examined new prototype.html --title "File manager"          # or: python3 harness/protolib.py new prototype.html --title "…" [--system plain|path.css]
examined init                                                # in the prototype's folder: writes examined.config.json, runs the checks
```

`new` refuses to overwrite a file that exists. The worked example is `examples/demo/`: thirteen
patches, `00-new.py` to `12-what-the-checks-found.py`, and `rebuild.sh`, which runs them in order
from nothing.

## The file: five marked blocks

Each block sits between `<!-- examined:NAME -->` and `<!-- /examined:NAME -->`.

| Block | Owner | What it holds |
|---|---|---|
| `runtime` | harness | React, inlined, so the file opens offline |
| `system` | project | your design system's CSS; themes are tokens on `.win`, dark is `.win.theme-dark` |
| `viewer-css` | harness | the viewer's own styles |
| `data` | project | `var DATA = {…}`, every board and what it means |
| `viewer` | harness | the viewer |

`python3 harness/protolib.py upgrade prototype.html` replaces the three harness blocks and leaves
`system` and `data` alone. There is no Proto call for `system`; change it in a patch that replaces
exact text in `p.s` (the whole file) after asserting how often it occurs, then `p.save()`.

## DATA: what you keep, what is computed

Hand-kept core: `meta` (title, frame, source, start, home, checkedLabel, and `controls`: the
selectors your design system draws controls with when they are not `button` or `a`, so the checks
can measure them; `kinds` for screen kinds beyond the four), `journeys` (each with
`steps`), `screens`, `links` (`{Board: [[label, target], …]}`), `globalLinks` (`[label, target,
selector]`), `gates`, `gaps`, `decisions`, `components`, `policy` (vocabulary terms and zones).

A screen: `title`, `kind` (place, state, detour, entrance), `html`, and as needed `place`,
`steps` (`[[journey, step]]`), `entry`, `gesture`, `variantOf`, `variantWhen`, `trouble` (the
failure clause), `empty`, `note`, `under`, `why`, `decisions`, `status` (redraw, note, new,
checked), `statusNote`.

`derived` is computed by the build: back-links and out-links, components per board, the search
index, counts, places with their states, the gate register, the summary. **Never edit
`derived`.** `p.save()` recomputes it.

## What the build refuses, and what it only reports

`examined build prototype.html` (or `python3 harness/build.py prototype.html [--check]`).

Refuses, writing nothing:
- a link label that is not text on its own board (the viewer binds hotspots by text, so an
  unbound label is a button that does not exist);
- an id that does not resolve: link target, `variantOf`, `place`, `under`, a journey step, a
  gate, a decision on a board, a gap's step, a decision's screens, a global link's target;
- a screen with no valid kind, or a state or detour that names no place;
- a decision marked settled with nothing chosen, or a reopening that names no decision.

Reports, for a person to weigh: places with no empty state, screens with no way in, steps that
nothing serves and no gap records, settled decisions with no explain-back, open decisions, failure
states. In the demo the build reports
`place Storage has no empty state`. A report is a number, not a verdict, and not a pass.

## One scripted patch per change

Never edit `prototype.html` by hand, and never bulk-edit it with a regex you have not counted.
Each change is a small script, kept and numbered, whose docstring says what changed and why and
cites the decision ids and articles it answers to.

```python
"""13 · Name the time on the failed read.

The failed read keeps the last list and must say whose list it is and when it was read
(article 6). Wording explained back by A. Example, 2026-10-28.
"""
import sys; sys.path.insert(0, 'harness')
from protolib import Proto

p = Proto('prototype.html')
p.set_copy('FilesReadFailed', 'how it stood at 09:12', 'the list as it stood at 09:12')
p.save()        # builds first; refuses and writes nothing if the build would
```

The calls: `add_board(name, title, kind, html, after=None, links=(), **fields)`,
`remove_board`, `set(name, **fields)` (a value of `None` removes the field), `replace_html`,
`set_copy(name, old, new, count=1)`, `link(name, label, target)`, `unlink(name, label)`,
`add_journey`, `add_step`, `set_step`, `add_gap`, `remove_gap`, `add_gate(gid, question,
draft=False)`, `answer_gate(gid, answer, by, date)`, `add_component(name, match)`, `decide`,
`settle`, `set_meta`, `save`. The full signatures are in `docs/reference.md`.

Exact-match assertions are the point. `set_copy` fails unless the text occurs exactly `count`
times; `add_board` fails if the board exists; `unlink` and `remove_gap` fail if nothing matches.
`replace_html` and `link` assert nothing, so prefer `set_copy` for copy, and read the board before
replacing it whole. Use `save()`, never `write()`, which skips the build. A failed assertion is a
finding: the board is not what you thought it was.

## Render and look, every touched board, light and dark

```sh
examined render prototype.html FilesReadFailed RemoveForGoodChecking --both
```

Writes `renders/<Board>.png` and `renders/<Board>-dark.png` (needs Python Playwright:
`pip install playwright && python3 -m playwright install chromium`). Open every image and look.
The code says what was declared; the render shows what reached the eye. A 34% white veil passed
every check that read the code and was found only on a rendered screen.

## The routes

- `prototype.html#board=Name` shows one board alone at full size; add `&theme=dark` for dark.
  The checks and `render.py` use this route.
- The viewer: Map (`m`, `#map`), Screen (`#Name`), Product (`p`, `#product`), Overview (`g`,
  `#grid`), Open (`o`, `#open`: gaps, open decisions, screens that will change, gates). `d`
  switches theme, `h` hotspots, `n` notes, `f` the happy path, `/` find.

## Snippets are typing aids

`examples/demo/patches/parts.py` holds markup helpers. Once a patch has run, the board lives in
`prototype.html` and nothing regenerates it. Change a board with a new patch, never by editing a
snippet. `rebuild.sh` reproduces the file only while the snippets are unchanged; it checks that
the record still replays, it is not a way to make changes.

## Why the prototype is the source

The first version of this method compiled screens from generator scripts. That kept boards cheap
and consistent while the design was small. Once the prototype held the decisions, the generators
were a second copy that could only drift, and running them would overwrite the work. They were
retired (article 14). It looked right because the failures the generators prevented were real.

Paper: articles 11 and 14.
