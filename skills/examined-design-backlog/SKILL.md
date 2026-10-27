---
name: examined-design-backlog
description: Turn an examined-design prototype into planned work. Use when asked to plan the build, write stories or tickets, or produce a Jira backlog from a prototype; it reads journeys, boards, gaps and open decisions from DATA and invents nothing (without a prototype, use jira-backlog).
---
# Backlog: the prototype as planned work

**Output:** `backlog.json` (the canonical record), `backlog.md` (read this), `jira.csv` (the import)
and `backlog.keys.json` (the map from each unit to the ticket it became), generated from the prototype.

## The core rule

**Every string a developer builds points at the board it comes from, every open decision blocks what
it touches, and the reason for a step is left blank until someone who knows it writes it.**

## Why

A story is the product's testimony one step removed: engineering builds what it says, and users read
what engineering built. So the signing chain of article 11 runs through it. Each required string is
quoted exactly with "(proto: Board)", and the board's decision record names who decided it. A
plausible sentence nobody decided, written into a ticket, becomes a requirement somebody builds; that
is article 5's undecided text leaving the drafts. And an open decision is work with an owner: until
it is settled both options are live and they build different things, so it blocks.

## What maps to what

| In the prototype | In the backlog |
|---|---|
| a journey | an epic (its `end` is the intent) |
| a step | a story, with a job-story frame: When / I want to / so I can ⟨blank⟩ |
| a board serving the step | a sub-task carrying "Required text (proto: Board)": headings and `.h` titles, banner title and message, `.status` and `.checking` lines, a dialog's lines (muted ones are treated as example data), the line under an empty state, every link label |
| `trouble`, `empty`, a place with no empty state | acceptance criteria |
| a gap | a story marked as having nothing serving it |
| an open decision | a spike that blocks the stories owning its screens; its options keep buys, costs, kills and the case for each |
| a state or detour | blocked by the story that owns its place |

## Hearing side

The generator writes the "when" from the link that leads to the board and the "want" from the step
title. It leaves "so I can" blank and counts the blanks, because what a person walks away with is the
one thing it cannot know. If the model offers to fill those blanks, that is model's wording: it stays
out of the tickets until the person who knows why the step exists writes it.

## Speaking side

Story names and required strings become the product's words. They obey the vocabulary policy like the
boards do, and nothing checks that for them. In the demo, step B3 was copied verbatim from a scope
that says Trash; had patch 07 not renamed it, the story would have been called "Remove a file from
Trash" while the product says Removed.

## Steps

1. `examined build prototype.html`: no refusals. The generator needs `DATA.derived` and stops without it.
2. Run drift first (examined-design-drift) and rename any step that still carries a retired word.
3. Ask for the Jira settings per project, and write `backlog.config.json` (see jira-backlog, section 1):
   project key and style, issue type names, the blocks link name, labels, required fields.
4. Generate:
   ```sh
   python3 backlog/build_backlog.py --prototype prototype.html --config backlog.config.json --out .
   ```
5. Read `backlog.md` before anything else. Check:
   - "Answer these first": every open decision, with what it blocks. Settle what you can
     (examined-design-decide) and regenerate;
   - every sub-task's required text against its board, character for character, and the board
     for sentences the generator does not read (a place's lede, a disabled commit's label). In the
     demo it carries neither "These still use 229 KB of your storage…" on Removed nor "Remove it for
     good" on RemoveForGoodChecking; add them by hand (`harness/templates/story.md`);
   - the blank "so I can" lines: count them, do not fill them;
   - that every blocker is a real precondition.
6. Import `jira.csv`, or push deliberately. Pushing creates real tickets and cannot be undone by the
   generator; it needs the person's explicit go-ahead in this conversation:
   ```sh
   python3 backlog/build_backlog.py --prototype prototype.html --push --dry-run
   python3 backlog/build_backlog.py --prototype prototype.html --push
   ```
   Credentials come from the environment (`JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`), never from
   a file or the chat. Never pass `--yes` on someone's behalf.
7. Re-run after every change. Identity is structural: a reworded story keeps its ticket, and the run
   reports added, changed and gone. A unit that was imported and has gone must be closed by hand.

## What the checks cannot see

Acceptance criteria name checks in brackets, and the backlog says so: a pass means not refuted on that
condition, not that the criterion holds. `routes` tests only that link labels are on their boards;
whether every required string reaches the build exactly is a criterion with no check, for a person.
The structure and target-size criteria can fail only on controls they recognise, so a design system
that draws buttons as spans must name them in `meta.controls`. `vocab` does not read story text. The
spikes carry each option's buys, costs, kills and the case for it.

## Stop when

`backlog.md` has been read by a person; every sub-task's required text matches its board; every open
decision is a spike that blocks something; the blanks are counted, not filled; nothing was pushed
without a go-ahead.

Paper: articles 5 and 11.
