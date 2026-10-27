# Reference

The prototype file, its data, the tools that change it, the viewer, the checks and the backlog. The
[tutorial](tutorial.md) shows all of it in use.

## The file

One HTML page that opens from disk with the network off. It has five marked blocks:

```
<!-- examined:runtime -->     React and ReactDOM 18.3.1, inlined           harness
<!-- examined:system -->      <style id="system">: the boards' design system  yours
<!-- examined:viewer-css -->  <style id="viewer-css">                      harness
<!-- examined:data -->        <script id="data">var DATA = {...};</script>  yours
<!-- examined:viewer -->      <script id="viewer">                         harness
```

`protolib.py upgrade` rewrites the three harness blocks from `harness/` and never touches `system` or
`data`. `DATA` is serialised compactly (`json.dumps(..., ensure_ascii=False, separators=(',', ':'))`)
with every `</` written as `<\/`, so board markup cannot close the script tag. Write it only through
`protolib`, which keeps that format.

**Boards and themes.** A board's markup is drawn with the classes of your design system. The
outermost element of a board is `.win`; the viewer adds `theme-dark` to it for the dark theme, so the
system defines its tokens on `.win` and again on `.win.theme-dark`. A board whose own markup already
carries `theme-dark` is born dark and stays dark. `harness/systems/plain.css` is a starting point.

## DATA

`DATA` has a hand-kept core and one computed part, `derived`. Only `harness/build.py` writes
`derived`; a patch never does.

### `meta`

| Field | |
|---|---|
| `title` | the product's name in the viewer |
| `frame` | `{w, h}`: the board size in pixels; checks and renders use it |
| `start` | the board the viewer opens on |
| `home` | the board the product lands on after first run |
| `source` | `{label, short, url}`: the scope the journey and step names come from |
| `checkedLabel` | what the `checked` status means on this project ("Checked against the network") |
| `kinds` | kinds beyond the four, for a product that needs them; the build counts them and knows no obligations for them |
| `controls` | extra selectors for what the design system draws as controls (`".btn, .nav"`); the checks and the backlog's required text use it |

### `journeys`

```json
{ "id": "B", "name": "Manage files", "end": "what finishing it means", "gates": ["G1"],
  "steps": [ { "id": "B2", "title": "Move a file into a folder", "does": "what the person does",
               "clear": "what the product makes clear at this point", "gates": [] } ],
  "inScope": true }
```

Copy journey and step names from the scope word for word. `inScope: false` keeps a journey visible
but outside the plan.

### `screens`

Keyed by board name (CamelCase, no spaces). Every field but `title`, `kind` and `html` is optional.

| Field | |
|---|---|
| `title` | the board's name for people |
| `kind` | `place`, `state`, `detour` or `entrance`, or a kind the project declares in `meta.kinds` |
| `html` | the board's markup |
| `place` | for a state or detour: the place it belongs to (required) |
| `under` | for a place: the place it sits under |
| `steps` | `[[journey, step], …]`: the steps this board serves |
| `variantOf`, `variantWhen` | the board this is a version of, and when it holds |
| `entry` | how a person gets here, when no link on another board says so |
| `gesture` | a way in that is not a click (drag, shortcut) |
| `trouble` | makes it a failure state: one clause saying what was asked for and did not happen |
| `empty` | `true` for the empty state of its place |
| `why` | why it is designed this way, in a sentence |
| `note` | a short line shown with the board |
| `decisions` | ids in `decisions` that shaped this board |
| `status`, `statusNote` | `new`, `redraw` (will change), `note`, or `checked`; and what that means here |

### `links` and `globalLinks`

```json
"links": { "Files": [["Move to folder…", "MoveShare"], ["Remove", "Removed"]] },
"globalLinks": [["Files", "Files", ".side"]]
```

A link is `[label, target]`. The viewer binds it to **the deepest element on the board whose trimmed
text is exactly the label**, and makes that element clickable and keyboard-focusable. A global link is
`[label, target, selector]` and binds on every board, but only inside elements matching the selector.

### `gates`, `gaps`

```json
"gates": { "G1": { "question": "Can a share be withdrawn once it has gone out?", "draft": false } },
"gaps":  [ { "journey": "B", "step": "B5", "title": "A cost estimate before saving", "why": "…" } ]
```

A gate is a question that must be answered before the steps that name it can be built; `draft: true`
marks one the model wrote and nobody has confirmed. An answered gate carries `answer`, `by` and
`date`. A gap is a step the scope asks for that nothing
serves, with the reason.

### `decisions`

```json
"D2": { "question": "Does search include removed files?", "context": "…",
        "options": [ { "label": "…", "buys": "…", "costs": "…", "kills": "…", "case_for": "…" } ],
        "chosen": "Include, marked as removed", "right_if": "…", "screens": ["SearchResults"],
        "status": "settled", "by": "A. Example (product owner)", "date": "2026-10-27",
        "round": "rounds/round-01.md", "explained": "the decider's own one line on why the others lose" }
```

`case_for` is the best case for that option, written before the choice. `recommended` is the option
the model marked; the viewer shows whether it was taken. `status` is `open`, `settled` or `reopened`;
a settled decision with nothing chosen refuses the build, and one with no `explained` (the
explain-back) is reported. A decision that reopens another carries `reopens`, `objection`, `outcome`
and `error_theory`; the old one carries `reopenedBy`.

### `components`, `policy`

```json
"components": [ { "name": "Button · primary", "match": "btn primary" } ],
"policy": { "terms": [ { "word": "chunk", "allow_zones": ["advanced"], "severity": "error" } ],
            "zones": { "advanced": { "screens": ["Storage"], "selectors": [".adv"] } },
            "scan":  { "ignore_selectors": ["code", "pre", "[data-verbatim]"] } }
```

A component is counted on every element carrying all the classes in `match`. The policy is the
product's vocabulary: each word, and the zones (whole boards, or selectors on a board) where it is
allowed. The `vocab` check and `drift.py` read it.

### `derived`

Written by `build.py`. Do not edit it.

| Field | |
|---|---|
| `screens[Name].in`, `.out` | the boards that link here; the links out, `[label, target]` |
| `screens[Name].made` | `[component, count here, boards using it]`, counted from this board's markup |
| `screens[Name].find` | the text the viewer's search looks in |
| `steps["B|B2"]` | the boards and gaps under each step |
| `places`, `entrances` | each place with its states and detours, and whether it lacks an empty state |
| `register` | each gate, the steps that name or inherit it, and how many boards stand on it |
| `components` | every component and the boards it appears on |
| `counts`, `nTrouble`, `summary` | the numbers in the build's first line |

## The tools

### `harness/protolib.py`

```sh
python3 harness/protolib.py new prototype.html --title "My product" [--system plain|path/to/system.css]
python3 harness/protolib.py upgrade prototype.html
```

In a patch:

| Call | |
|---|---|
| `Proto(path)` | load; `.data` is `DATA`, `.screens` is `DATA.screens` |
| `.save()` | build, then write; refuses (raises `SystemExit`) and writes nothing if the build refuses |
| `.write()` | write without building; for tools, not for patches |
| `.board(name)` | one screen; raises if there is none |
| `.add_board(name, title, kind, html, after=None, links=(), **fields)` | add a board; `links` is a list of `(label, target)` |
| `.remove_board(name)` | remove a board and every link to it |
| `.set(name, **fields)` | set fields on a board; `None` removes a field |
| `.replace_html(name, html)` | replace a board's markup |
| `.set_copy(name, old, new, count=1)` | replace exact text, asserting it occurs `count` times |
| `.link(name, label, target)`, `.unlink(name, label)` | add or remove a link |
| `.set_meta(**fields)` | set fields on `meta` |
| `.add_journey(id, name, end='', gates=(), in_scope=True)` | add a journey |
| `.add_step(journey, id, title, does='', clear='', gates=())` | add a step |
| `.set_step(journey, id, **fields)` | change a step (rename it when the product renames it) |
| `.add_gap(journey, step, title, why)`, `.remove_gap(title)` | record or clear a gap |
| `.add_gate(id, question, draft=False)` | add a gate |
| `.add_component(name, match)` | count a component |
| `.decide(id, question, options, context='', right_if='', screens=(), chosen=None, by=None, date=None, round=None, recommended=None, explained=None, reopens=None, objection=None, outcome=None, error_theory=None)` | record a decision, open unless `chosen` is given; `reopens` marks the old one reopened and requires `objection`, `outcome` (amend, narrow, drop) and `error_theory` |
| `.settle(id, chosen, by, date, explained=None, right_if=None)` | settle an open decision |
| `.answer_gate(id, answer, by, date)` | record a gate's answer; the gate stays in the register |

Change markup by exact text. A regex may *find* what to change; the change itself is a `set_copy`
that asserts its count, so a match somewhere you did not expect stops the patch instead of damaging a
board quietly.

### `harness/build.py`

```sh
python3 harness/build.py prototype.html            # compute, report, write DATA.derived
python3 harness/build.py prototype.html --check    # compute and report, write nothing
```

**Refuses** (exit 1, nothing written):

- a link label that is not text on its own board;
- an id that does not resolve: a link or global link target, `variantOf`, `place`, `under`, a step in
  `steps`, a gate named by a journey or step, a decision named by a board, a board named by a
  decision, a gap's step;
- a board with no valid `kind`, or a state or detour with no place;
- a settled decision with nothing chosen, a decision status other than open, settled or reopened,
  and a `reopens` or `reopenedBy` that names no decision.

**Reports** (a number for a person to weigh): places with no empty state, boards with no way in, steps
nothing serves and no gap records, settled decisions with no explain-back, open decisions, failure
states.

### `harness/render.py`

```sh
python3 harness/render.py prototype.html [Board …] [--both | --dark] [--out renders/] [--scale 2]
```

Each board alone, at the frame size, to `renders/Board.png` and `renders/Board-dark.png`. No names
renders every board. Page errors are printed.

### `harness/drift.py`

```sh
python3 harness/drift.py scope.md prototype.html
```

Steps in the scope that are verbatim in the journeys, near-matches (somebody paraphrased), steps not in
the scope, steps nothing serves, boards serving no step, and retired words (forbidden in every zone)
still in the scope, with line numbers. The prototype dictates: the output is a list of edits to the
scope.

## The viewer

| View | Key | URL | Shows |
|---|---|---|---|
| Map | `m` | `#map`, `#map/B` | journeys and steps, the boards under each, gaps marked "Not drawn" |
| Screen | | `#Files`, `#B2/MoveShare` | one board with hotspots, its step, ways in and out, components, decisions |
| Product | `p` | `#product` | places with their states and detours, and entrances |
| Overview | `g` | `#grid` | every board |
| Open | `o` | `#open`, `#open/G1` | gaps, open decisions, boards that will change, gates |

`f` (or the *Happy path* switch, or `!happy` appended to any URL) hides failure states. `h` toggles
the hotspot outlines, `n` the notes, `/` finds a board or step, `d` switches theme, the arrow keys
walk the current journey in step order, Backspace goes back, and `+`, `-`, `0` zoom the board.
Tab and Enter work on hotspots.

**Board-only mode.** `#board=Files` renders one board alone at full size with nothing else on the page,
and `#board=Files&theme=dark` in dark. The checks and `render.py` use it.

## The checks

```sh
node cli/examined.mjs init                 # write examined.config.json for what is here, and run them
node cli/examined.mjs check [--no-new]     # run them; --no-new fails only on what is not in the baseline
node cli/examined.mjs baseline [--update]  # freeze today's findings; --update replaces a baseline
node cli/examined.mjs waive <fingerprint> --why "…" [--until YYYY-MM-DD]
node cli/examined.mjs new | build | render # the harness tools, by another name
```

`npm link` in the repository makes the command available as `examined`.

### `examined.config.json`

Read from the current directory, then from `checks/checks.config.json`. Relative paths resolve
against the file they are in.

| Key | Default | |
|---|---|---|
| `target` | | what to check: `{"mode": "prototype", "file": "./prototype.html"}`, `{"mode": "dir", "dir": "./dist"}`, `{"mode": "crawl", "start": "http://localhost:3000", "limit": 50}`, or `{"mode": "urls", "base": "…", "routes": ["/", "/files"]}` |
| `widths`, `height` | the prototype's frame; else `[1440, 1024, 768]`, `900` | viewport sizes |
| `densityBudget` | `400` | elements per board at the real data scale |
| `targetSize` | `24` | minimum target, in CSS pixels |
| `scrimSelector` | `.scrim` | a modal's backdrop; text behind it is skipped |
| `cellChildSelector` | `.chip` | what `cellfit` measures against its cell |
| `vocabPolicy` | `vocab.policy.json` | the policy file, when there is no prototype to read it from |
| `executablePath` | `null` | a Chromium to use instead of Playwright's |

### Findings, baseline, waivers

Each run writes `.examined/findings.json`. A finding has a 12-character **fingerprint** built from the
check, the board and what is wrong, with digits normalised out, so a measurement that moves does not
make it a new finding. `examined.baseline.json` holds the fingerprints a person accepted as already
there; `examined.waivers.json` holds the ones accepted with a reason and a date. An expired waiver brings
its finding back. `baseline` refuses to record a run in which a check errored, because a check that
tested nothing has not passed.

What each check shows and what it cannot see is in the [README's table](../README.md#the-checks) and in
the first lines of each file in `checks/`.

## The backlog

```sh
python3 backlog/build_backlog.py --prototype prototype.html [--config backlog.config.json] [--out .]
python3 backlog/build_backlog.py --plan backlog.plan.json
python3 backlog/build_backlog.py --prototype prototype.html --push [--dry-run] [--yes]
```

From a prototype: journeys become epics, steps become stories, the boards serving a step become its
sub-tasks, each with its **required text** quoted exactly and pointed at the board (`proto: Name`), and
each open decision becomes a spike carrying its options and the case for each, blocking the stories
whose boards it names. Required text is the board's headings, status lines, banner titles and
messages, what a dialog says, the line under an empty state, and every link label. *What it cannot
see:* buttons that are not links, and copy in a place's own paragraphs; the story names the board, and
the board is the source.

The plan format, the Jira settings, push and re-runs are in [`backlog/README.md`](../backlog/README.md).
