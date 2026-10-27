---
name: examined-design-draw
description: Third stage of examined design. Use when adding or changing boards and their copy; it keeps undecided wording out of the product, makes every status line say only what was observed, and keeps irreversible steps off until their facts are read.
---
# Draw: decided text, observed claims, facts read before acts

**Output:** boards whose required text was decided by a person; for every place that reads, a
reading state and a read-failed state; for every irreversible door, a checking state with its
commit off; gates for every engineering answer the boards rest on.

## The rules

**Trust the model only on kinds of claim where checking has shown it reliable. Explain back
everything you accept, and let nothing undecided leave the drafts.**

**Let a screen say what the product observed, with the qualifiers that say how far it reaches:
when, from where, now or ever. Name what, never why.**

**Never let anyone take an irreversible step on a fact that has not been read. Show what is
known, keep the commit off, and mark what is waiting.**

## Why

Where a claim came from is no reason for or against it. But when its origin is its only support,
it is testimony, and a model's testimony gets no default credit (Fricker). Trust should be
calibrated and specific to the function (Lee and See): earned kind by kind, from checking. Good
intentions do not hold: the bias toward automated advice survives expertise and training
(Parasuraman and Manzey), so the discipline is built into the work as a tag, a gate, a record.
Explaining a claim back exposes the gaps in understanding it (Rozenblit and Keil).

A sentence on a screen is the product's testimony (Grice's maxim of Quality). Most false copy is a
dropped qualifier, not a lie. Precision does not cost trust; vagueness does (van der Bles and
colleagues), and forecasts that state their uncertainty keep more trust when they turn out wrong
(Joslyn and LeClerc).

An act that cannot be undone, on facts that are unread or old, with the read about to finish, is
exactly when waiting has value (Arrow and Fisher). The same argument says only the irreversible
step waits. Slow agents should never block the person (Card and colleagues), and an unusually
slow response should be reported (Shneiderman).

## Hearing side

- Keep a short list, in the record, of the kinds of claim where checking has shown the model
  reliable (comparing boards against each other) and where it has not (what a word means to a
  reader; judging its own earlier work).
- Wording the model wrote and nobody decided is tagged **model's wording** and stays in the
  drafts: an unrun patch, a round file, a notes file. If it must sit on a board before it is
  decided, mark the board `status='note'` with a `statusNote` that begins "Model's wording, not
  decided:"; the Open view lists it and the backlog carries it as a note, not a requirement.
- Before a patch writes required text (headings, banners, status and checking lines, link
  labels), the person reads each string and explains it back in one line.
- The model's summaries drop qualifiers because they slow the sentence. Ask how far each finding
  reached: one board, the declared colours, one theme.
- Engineering answers take weeks. Draw ahead for the likely answer and mark what rests on it with
  a gate: `p.add_gate('G1', 'Can a share be withdrawn once it has gone out?')`, then
  `gates=['G1']` on the step. The Open view counts the screens standing on each gate. Nothing
  standing on an open gate is signed off.

## Speaking side, and the boards to draw

1. **Status lines say what was observed, with when and from where, and no cause the product
   cannot see.** `FilesReadFailed`: "We couldn't read your files just now." / "The network
   answered, but your list didn't come back. What you see is how it stood at 09:12." / Try again.
   When the product does know the cause, give it its own state, shown only then.
2. **Facts the product holds need no hedge once read.** A figure from an old read needs its time:
   `Storage` says "checked today at 09:12".
3. **The life of a read.** A short pause, then placeholders that name what is being read
   (`FilesReading`: "Reading your files…", skeleton rows, the storage box "Checking your
   storage…"); a line when it runs long ("Still reading. It's taking longer than usual."); figures
   and badges only once read. Placeholders use the system's `.skel`; status lines carry
   `role="status"`.
4. **Doors that commit something irreversible open at once with what is known.** The lines that
   depend on the read wait under one checking line, the commit stays off, Cancel always works
   (`RemoveForGoodChecking`: "Checking who can open it…", the commit with `aria-disabled="true"`).
   If the read fails, the door says nothing has changed and offers Try again. Actions that need
   nothing read keep working.

Add each as a state or detour of its place, one patch per change, with `trouble='…'` on failure
states. Then `examined render prototype.html <every board you touched> --both` and look at each.

## What the checks cannot see

No check reads whether a sentence is true, whether a cause is guessed, or whether a figure is
shown before it is read. `contrast` skips controls marked `aria-disabled="true"`, as WCAG
allows, so a commit that is off is not tested for legibility. `motion` sees CSS transitions and
animations under reduced motion, not motion driven by script. Nothing checks that a gate is
closed before a board ships.

## Stop when

Every place that reads has its reading and read-failed states; every irreversible door has a
checking state with its commit off; no status line names a cause it cannot observe; no required
text is model's wording; every board resting on an unanswered question stands on a gate.

Paper: articles 5, 6 and 7.
