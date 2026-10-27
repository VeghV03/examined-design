# demo — a file manager in thirteen patches

A fifteen-board file manager, built from an empty file. Generic on purpose: it carries the method,
not any real product. The [tutorial](../../docs/tutorial.md) walks through it patch by patch.

Open `prototype.html` in a browser. Nothing to install, and it works with the network off.

| | |
|---|---|
| `scope.md` | the agreed scope the prototype answers to; it still says Trash, which is the drift |
| `patches/` | `00-new.py` … `12-what-the-checks-found.py`, one change each, kept as the record; `_boot.py` finds the harness, `parts.py` is a typing aid for markup |
| `rebuild.sh` | runs every patch from nothing; the result must equal `prototype.html` byte for byte |
| `prototype.html` | the prototype: design system, boards, meaning, viewer |
| `rounds/round-01.md` | the multiple-choice round that settled D2 and left D1 open |
| `stories/b2-move-into-shared-folder.md` | one story written from the prototype, with its required text, its criteria and what was not checked |
| `examined.config.json` | points the checks at the prototype |
| `examined.baseline.json` | the checks' baseline: empty, because patch 12 fixed what the first run found |
| `backlog.config.json` | the Jira settings for the backlog (company-managed) |
| `backlog.md`, `jira.csv`, `backlog.json`, `backlog.keys.json` | the backlog, generated from the prototype |

```sh
sh rebuild.sh                                                     # the prototype, from nothing
python3 ../../harness/render.py prototype.html --both             # every board, light and dark
node ../../cli/examined.mjs check                                 # the thirteen checks
python3 ../../backlog/build_backlog.py --prototype prototype.html  # the backlog
python3 ../../harness/drift.py scope.md prototype.html            # scope against prototype
```

## Ready

The demo is done when all of these hold. They are checked in this order, and the last line is part of
the definition, not an afterthought.

1. Every step in the scope is served by a board or recorded as a gap with its reason.
2. Every place has an empty state, or the build's report that it has none was read and accepted by a
   person.
3. The build has no refusals.
4. The checks have no finding that is not fixed, baselined or waived with a reason and a date.
5. Every decision is settled with who decided, when, and their explain-back, or is open with a spike
   in the backlog that names what it blocks.
6. Every board was rendered and looked at, in light and dark, after the last patch that touched it.
7. What was not checked is written down: no person outside the project has used it; nobody has read
   the strings cold; none of the checks can see whether a board says the right thing.

It holds today with D1 open, B5 a gap, and Storage reported without an empty state.

## What is generic and what is not

The rules the boards follow (name what is read, never why it failed; nothing irreversible on a fact not
yet read; a word that makes a false claim is renamed) came from designing the File Manager of Swarm
Desktop at Solar Punk. None of that product's boards, copy or data is here.
