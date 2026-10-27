---
name: examined-design-ship
description: Ship stage of examined design. Use when handing boards and stories to engineering; it makes every required string trace to a board and every board's claims trace to a decision with a name and a date, and ships whatever was not examined marked as such.
---
# Ship: a name behind every claim

**Output:** stories whose required strings are quoted exactly and point at their boards
(`harness/templates/story.md`, or the backlog generator); every board that ships governed by
settled decisions with a name and a date; a list of what ships marked: pending answers, words
untested with readers, things not checked.

## The rule

**Let every claim that ships trace to a decision with a name and a date. Sign only what you
examined, and ship the rest marked.**

## Why

Telling someone something is not handing them evidence. It is taking responsibility for its truth
and inviting them to trust you (Moran; Hinchman). A model can produce the words; it cannot take on
the responsibility, any more than an actor who says "I promise" on a stage has promised (Austin).
Model output is a performance of a claim, with nobody behind it until a person adopts it.

The responsibility gap is real: nobody can fairly answer for what they could not predict or check
(Matthias). Accept the premise and it becomes the condition of signing: sign only what you
checked. A signature must not make you a crumple zone, blamed for what you could neither control
nor see (Elish); the marks put the limits of the examination in the record, so a signature cannot
be stretched past them. The gap is closed by design, not by pretending the machine is responsible:
build the work so its behaviour tracks the reasons of people who can be named (Santoni de Sio and
Mecacci). And being accountable is among the few things found to reduce the bias toward automated
advice.

## Hearing side

Nothing the model drafted enters the chain except through a person who adopts it. "The model
recommended it" can never be the reason in the log, and the model's name never goes in `by`.
Teams ship; decisions are made by people. One name per decision, not per product.

## Speaking side

Behind every assertion the product makes stands a decision with a name, and an honest edge to what
was checked. A required string on a screen ("Checking who can open it…", proto:
RemoveForGoodChecking) traces to its board, and the board's decision record names who decided and
when.

## Steps

1. `examined build prototype.html`: no refusals. Read the reports and the open decisions.
2. List the boards that ship and the decisions behind them. Every board whose claims rest on a
   decision should name it in `decisions`, and each should be settled with `by` and `date`:
   ```python
   import sys; sys.path.insert(0, 'harness'); from protolib import Proto
   p = Proto('prototype.html'); D = p.data['decisions']
   for n, b in p.screens.items():
       for d in b.get('decisions', []):
           r = D.get(d, {})
           if r.get('status') != 'settled' or not r.get('by') or not r.get('explained'):
               print(n, d, r.get('status'), r.get('by'), 'explained' if r.get('explained') else 'NOT explained')
   ```
   Settle what can be settled (examined-design-decide). What cannot be settled ships blocked.
3. Write the stories. `python3 backlog/build_backlog.py --prototype prototype.html` carries each
   board's required text as "Required text (proto: Board)" (examined-design-backlog). For a story
   written by hand, use `harness/templates/story.md`: every required string in bold, quoted
   exactly, with `(proto: BoardName)`.
4. Check every required string in every story against its board, character for character. Text
   copied from an earlier version keeps travelling after its source changes: in one project 15 of
   122 required strings in the stories no longer existed in the prototype.
5. Mark what was not examined and ship it marked: steps standing on open gates (the Open view's
   gate register), open decisions (spikes that block), words untested with readers, each check's
   cannot-see line, anything not rendered in both themes.
6. Settled decisions without a drawn board are not shipped claims yet. In the demo, D2 chose
   "Include, marked as removed", and no board yet shows a removed file in results.

## What the checks cannot see

The build checks that decision ids resolve, not that a person decided. `routes` checks that link
labels are on their boards, not that the strings in a story match a board. `vocab` reads rendered
boards, not story text: a retired word left in a step title reaches every story name unseen, which
is why the demo renames step B3 when Trash becomes Removed. Nothing checks that `by` is a person.

## Stop when

Every required string traces to a board; every board's claims trace to a settled decision with a
name, a date and an explain-back; everything unexamined ships with its mark.

Paper: article 11.
