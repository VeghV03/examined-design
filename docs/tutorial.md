# Tutorial: a file manager from an empty file

This walks through [`examples/demo`](../examples/demo), a fifteen-board file manager built from an
empty file in thirteen patches. Each section is one patch: what it adds, the rule from the paper it
follows, and what to look at afterwards. On the way there is a decision round, a story, the checks,
the backlog and the scope drift.

Run the whole thing from nothing at any point:

```sh
sh examples/demo/rebuild.sh
```

The patches are the record of how the prototype was made. Running them again gives the same file, byte
for byte, and CI checks that it does.

**What you need.** Python 3.9 or later. For renders, Python Playwright and a Chromium
(`pip install playwright && python3 -m playwright install chromium`). For the checks, Node 22 or
later (CI runs 24) and `npm install` in `checks/`. Nothing at all to open the prototype:
double-click it.

## The scope

[`scope.md`](../examples/demo/scope.md) is the agreed scope: four journeys, nine steps, written by
whoever owns the product. The prototype copies its structure and never paraphrases it. When the two
disagree later, the difference is *drift*, and it is reported rather than resolved quietly. By the end
of this tutorial the prototype disagrees with it on purpose, once.

## 00 · An empty prototype

```python
protolib.new(PROTO, 'File manager · demo', system='plain')
p = Proto(PROTO)
p.set_meta(title='File manager · demo', start='Welcome', home='Files',
           source={'label': 'agreed scope (scope.md)', 'short': 'scope', 'url': 'scope.md'})
```

`new` writes one HTML file with five marked blocks:

| Block | Belongs to | Holds |
|---|---|---|
| `examined:runtime` | the harness | React 18.3.1, inlined, so the file opens offline |
| `examined:system` | you | the design system the boards are drawn with (`plain.css` here) |
| `examined:viewer-css` | the harness | the viewer's own styles |
| `examined:data` | you | `var DATA = {...}`: every board and what it means |
| `examined:viewer` | the harness | the viewer |

`protolib.py upgrade` replaces the three harness blocks and never touches yours.

The patch also names the **components** the build should count on every board (a component is any
element carrying all the classes in its `match`), and the **vocabulary policy**: the words the product
must not say, and the zone where a word is allowed. Here: *postage batch* and *chunk* only inside an
Advanced zone, *trash* nowhere. That last one matters in patch 07.

And it names the **controls**: `controls='.btn, .nav'` in `meta`. This design system draws buttons and
sidebar rows as `span`s. Without that line, the two checks that measure controls (`target-size` and
half of `structure`) would find nothing to measure on any board and pass without being able to fail.
They now say so when that happens, which is how this line came to exist.

Every patch ends in `p.save()`. It computes the derived fields and either writes the file or refuses
and writes nothing. After this one it reports `0 screens`, which is true.

## 01 · Journeys and steps

```python
p.add_journey('B', 'Manage files', 'See what is here, move, remove and share files.')
p.add_step('B', 'B2', 'Move a file into a folder', 'Moves a file.', 'Who gains access before anything moves.')
p.add_gap('B', 'B5', 'A cost estimate before saving',
          'The scope asks for it and nothing serves it. Decision D1 is open: before saving, or after.')
```

Steps are copied from the scope word for word. Each carries what the person does and what must be
clear to them at that point. The step nothing will serve yet is recorded as a **gap**, keyed to its
step: "not on my list" and "the scope asks for this and nothing serves it" are different claims, and
only the second is honest. A **gate** (`G1`) is a question that must be answered before a step can be
built: "Can a share be withdrawn once it has gone out?"

Open the file now and the **map** view shows four journeys with empty steps and one gap.

## 02 · The entrance, and 03 · Files and its empty state

```python
p.add_board('Files', 'Files', 'place', files, steps=[['B', 'B1']], note='Where you land after the first visit',
            why='The files are the memory a periodic visitor comes back for, so the list is the place.')
p.add_board('FilesEmpty', 'Files, nothing here yet', 'state', none, place='Files', empty=True,
            steps=[['A', 'A2']], variantOf='Files', variantWhen='the list was read and holds nothing')
```

Every board has a **kind**, and the kinds oblige (paper, article 3):

- an **entrance** assumes nothing about who arrives (the persona opens this every few weeks and has
  forgotten what it is for, so it opens on what is true here);
- a **place** is somewhere you can be, and it owes an empty state, because every account starts there;
- a **state** is a place in a condition, and names its place and when it holds (`variantWhen`);
- a **detour** is a step away that comes back.

Note what the empty state's `variantWhen` says: *the list was read and holds nothing*. A list not yet
read is a different state, and it gets its own board in patch 05.

**Look at it.** After every patch, render every board you touched, in light and dark:

```sh
python3 harness/render.py examples/demo/prototype.html Welcome Files FilesEmpty --both
```

`render.py` opens each board alone (`#board=Files&theme=dark`) at the prototype's frame size and writes
PNGs to `renders/`. A board that reads well in light and falls apart in dark is found here or by a user.

## 04 · Links, and the first refusal

```python
p.link('Welcome', 'Add your first file', 'FilesEmpty')
p.link('FilesEmpty', 'Add a file', 'Files')
p.data['globalLinks'] = [['Files', 'Files', '.side']]
```

A link is `[label, target]`. The viewer makes the label clickable by finding it **as text on the
board**: the deepest element whose trimmed text is exactly the label. If the label is not there, the
link is a button that does not exist, and the build refuses. Global links (the sidebar) bind only
inside the selector they name, on every board.

The first draft of this patch also added the sidebar rows for Removed and Storage. Their boards did not
exist yet, and `save()` said so:

```
3 screens · 1 places, 1 states, 0 detours, 1 entrances · 2 links bound · 0 failure states · 1 gaps
  report  step B/B2: nothing serves it and no gap records that
  ...
  REFUSE  globalLinks: "Removed" goes to 'Removed', which is not a screen
  REFUSE  globalLinks: "Storage" goes to 'Storage', which is not a screen
2 refusals · 5 reports
build refused: …/prototype.html not written
```

So those rows join in patches 07 and 10, with their boards. The five reports are steps nothing serves
yet; they are numbers to watch, not errors, because the boards are coming. The build refuses on exactly two kinds of
thing: a label that does not bind, and an id that does not resolve. Both make the prototype say
something false about itself. Everything else it reports as a number for a person to weigh.

## 05 · Before the list is read, and when it cannot be

Two states of Files: **reading** and **could not be read**. The rules are the Swarm project's, argued
in article 6 of the paper:

- name what is being read, never why it is slow or why it failed ("Reading your files…");
- figures and badges wait for the read: nothing is shown as a fact before it is one;
- a failed read keeps the last list, with the time it was read, and offers Try again.

The failure state carries `trouble='the list was asked for and did not come back'`. That field makes
it a **failure state**: the viewer's happy-path switch hides it, and the backlog writes a criterion
for it ("says what did not happen and what is still true, and names no cause it cannot know").

## 06 · Moving into a shared folder

The worst thing this product can do is put a file in front of the wrong person (article 1). Moving a
file into a shared folder shares it. So that one move, and only that one, asks first and says who
gains access before anything moves. Moves that change nothing stay silent.

Frame first, then draw: the worst outcome is decided before the first board, and every board that can
cause it is drawn to prevent it.

## 07 · Removed, and a word that made a false claim

The scope calls the place Trash. Every trash implies two things: the item is gone, and its space comes
back. Here neither is true: removed files are still stored and still paid for. The word was the false
claim (article 4), so the place is **Removed**, the past tense of the button, and the step is renamed
with it:

```python
p.set_step('B', 'B3', title='Remove a file, or remove it for good')
```

The scope still says Trash. That is drift, and it stays visible until the scope is edited (see
[Drift](#drift)).

The door that removes for good opens at once with what is known, and keeps its commit button off
(`aria-disabled="true"`) until it has read who can open the file (article 7: nothing irreversible on a
fact not yet read). Cancel always works.

## 08 · Search, and "nothing so far"

Three states: a match, nothing, and **nothing so far**. "Nothing matches" is a claim the product may
make only after it has looked everywhere it was asked to. When two folders could not be read, it says
"Nothing found so far" and names what it could not look in.

## 09 · Two failure states, and 10 · Storage

Each failure state says what did not happen and what is still true; neither guesses a cause.

Storage has an **Advanced** zone, where the vocabulary policy allows mechanism words. Everywhere else,
consequence in plain words. Storage has no empty state, and the build reports it:

```
  report  place Storage has no empty state
```

That is a report, not a refusal. A storage page always has a number to show; a person decided that the
report is fine, and it stays in the output as a number anyone can question.

## 11 · Decisions, and a round

A decision is a record, not a sentence in a chat:

```python
p.decide('D2', 'Does search include removed files?',
         options=[{'label': 'Include, marked as removed', 'buys': '…', 'costs': '…', 'kills': '…',
                   'case_for': 'Removing hides; it does not delete, so search should not pretend it did.'},
                  {'label': 'Exclude removed files', 'buys': '…', 'costs': '…', 'kills': '…',
                   'case_for': 'People remove things to get them out of the way, including out of search.'}],
         right_if='Include wins if removal is read as "out of the way" rather than "gone".',
         screens=['SearchResults'], round='rounds/round-01.md')
p.settle('D2', 'Include, marked as removed', by='A. Example (product owner)', date='2026-10-27',
         explained='Exclusion would make removing behave like deleting, which is the claim Removed was renamed to stop making.')
```

Every option carries what it buys, what it costs, what it kills, **and the best case for it, written
before the choice**. A recommended option works like a default, and a model's recommendation tends to
echo the leaning in the question you asked it (article 10). Writing the case for the other option
before anyone chooses is the cheapest counterweight there is.

The decision was settled in a multiple-choice round: [`rounds/round-01.md`](../examples/demo/rounds/round-01.md).
Read it for the shape: three or four questions at a time, each with its options and the case for each,
the model's recommendation marked, the answer, and then the **explain-back**: the person who decided
says in one line, in their own words, why the other option loses. That line is what `explained`
records. A decision nobody can explain back has not been made yet.

The round also marked which option the model recommended, and patch 11 records it
(`recommended='Include, marked as removed'`), so the viewer can show "Recommended: … (taken)" and the
take rate can be counted later. A decision settled outside a round, like D3 (Removed over Trash), still
gets its explain-back: the build reports any settled decision without one.

A decision usually changes a board. Settling D2 does: the same patch adds the removed `plan-v1.pdf` to
SearchResults, marked Removed, so the board and the record say the same thing.

D1 (whether the cost estimate comes before or after saving) stays open. The **open** view lists it,
the build summary counts it, and the backlog turns it into a spike that blocks what it holds up.

## The checks, and 12 · what they found

Point the checks at the prototype and run them:

```sh
cd examples/demo
node ../../cli/examined.mjs init     # writes examined.config.json and runs all thirteen
```

After patch 11, the first run printed thirteen lines like these:

```
15 boards · 0 boards with a contrast failure (light)
15 boards · 0 boards with a contrast failure (dark)
15 boards · 15 boards with a structure failure
15 boards · 0 declared links that do not bind (of 16)
...
13 checks · 0 errored
18 findings
```

Fifteen boards had no heading element: they drew their titles as styled `div`s, which a screen reader
cannot navigate by. Three boards had a line of prose wider than 40em. Both are findings about the
boards, so [patch 12](../examples/demo/patches/12-what-the-checks-found.py) fixes them, one exact
replacement at a time, each asserting how many times its text occurs. The next run: 0 findings.

Read that zero carefully. It means none of the thirteen checks refuted the boards on the one condition
each tests. It does not mean the boards are right. Each check says, in its first lines and in the
README's table, **what it cannot see**: `structure` cannot tell whether the heading says the right
thing; `vocab` cannot tell whether the words that pass are understood; `contrast` cannot see a gradient
behind text. The judgement those checks cannot reach is still yours.

On a real project the first run is rarely zero. Freeze what is there and stop it growing:

```sh
node ../../cli/examined.mjs baseline
node ../../cli/examined.mjs check --no-new          # fails only on what is new
node ../../cli/examined.mjs waive <fingerprint> --why "…" --until 2027-01-01
```

A waiver is a decision with a reason and a date, never a deleted check.

## A story

[`stories/b2-move-into-shared-folder.md`](../examples/demo/stories/b2-move-into-shared-folder.md) is
the story for step B2, written the way the Swarm project wrote its Jira stories: the job, the boards
that serve it, every string a developer must build quoted exactly with the board it comes from, the
decisions behind it with who made them, the acceptance criteria and the check that tests each, and
**what was not checked**. The "so I can" is left blank: it is the one line only someone who knows why
the step exists can write.

## The backlog

```sh
cd examples/demo
python3 ../../backlog/build_backlog.py --prototype prototype.html
```

Journeys become epics, steps become stories, boards become sub-tasks, and the open decision becomes a
spike that blocks the six items it holds up. Every sub-task carries its board's required text:

```
- Moving into a shared folder — Every other way of moving is silent; this one widens who can open
  the file, so it asks. Required text (proto: MoveShare): "Add" · "Files" · "Move notes.md to Client
  work?" · "Client work is shared with Anna and Ben. Moving notes.md in shares it with them, and with
  every later version." · "Cancel" · "Move and share".
```

Required text is the board's headings, status lines, banner titles and messages, what a dialog says,
the line under an empty state, every link label, and the label of every control `meta.controls`
names, except inside the sidebar (it is one story, not a line on every board). It leaves out a place's
own paragraphs, which mix copy with data; the story names the board, and the board is the source.

Read `backlog.md`, then import `jira.csv`, or create the issues with `--push` (it prints the plan and
asks first). The summary line counts the stories still missing their "so I can". Nine, here. The
generator never writes them.

## Drift

```sh
python3 harness/drift.py examples/demo/scope.md examples/demo/prototype.html
```

```
not in the scope — bring the scope level, or drop the step:
  B/B3: "Remove a file, or remove it for good"

words the product retired, still in the scope — edit the scope:
  line 10: "trash" in "- Remove a file from Trash"
```

The prototype dictates: it is where decisions were made and checked. The scope is brought level by
whoever owns it, and until then the difference is visible to anyone who runs this.

## Stopping

The demo stops here because its definition of Ready, in [its README](../examples/demo/README.md),
holds: every step is
served or recorded as a gap, every place has its empty state or a report a person accepted, the build
has no refusals, the checks have no findings that are not baselined or waived, and every open decision
is a spike with a name on it. What was not checked is named: no person has used it, the strings have
not been read by anyone outside the project, and none of the checks can see whether a board says the
right thing.

Ship with that list attached (article 15).

## Starting your own

```sh
python3 harness/protolib.py new prototype.html --title "My product"
```

Copy `examples/demo/patches/_boot.py`, point `PROTO` at your file, and write patch 00. The
[reference](reference.md) has every field of `DATA`, every `protolib` call, the viewer's views and
URLs, and the checks' configuration. The skills in `skills/` walk the same loop with an agent.
