---
name: examined-design-reopen
description: Coming-back stage of examined design. Use when a case seems to break a settled decision, or when the model changes its answer; it reopens only for a named objection, records whether the rule is amended, narrowed or dropped, and writes why the old answer looked right.
---
# Reopen: a named objection, then an error theory

**Output:** a new decision record that names the objection and the decision it reopens; the
outcome written as amend, narrow or drop; the error theory (why the old answer looked right); the
boards patched and rendered; the decision log updated.

## The rule

**Reopen a decision only when you can name the objection, and after reversing, write down why the
old answer looked right.**

## Why

A single anomaly does not refute a research programme. It may be protected and amended so long as
the amendments predict something new; it degenerates when they only patch (Lakatos). A case that
breaks a decision is a reason to look, not yet a reason to reverse. A case may show the rule's
scope rather than its falsity, and only a named objection tells which.

There are five objections worth the name: the conclusion does not follow; a premise is false; the
conclusion is known to be false; a premise is unsupported; a vague word is doing precise work.

After reversing, say why the old answer looked right. People told that their success at a task had
been invented went on rating themselves by it; what removed the false belief was explaining how such
impressions persist (Ross, Lepper and Hubbard). A reversal without its error theory leaves the old
belief in place, and it comes back.

The named objection cuts both ways. People commit more to their own failing choices (Staw, with
mixed replications), so the objection is also the licence to reopen a decision you would rather keep.

## Hearing side

Reversals by the model are a different matter. Told only "Are you sure?", models changed correct
answers on between a third and most of the questions (Sharma and colleagues); argued at with invalid
reasoning, one model abandoned answers it had right on 23% to 96% of problems (Wang, Yue and Sun).
Neither pushback contained an objection. When the model reverses, ask for the objection and the
error theory. Without them the first answer stands, neither refuted nor confirmed: the reversal is
compliance. A second answer is new testimony with no more weight than the first. And when you are
the one pushing back, say the objection; do not just ask again.

## Speaking side

The product reopens its own claims in the open. When something changes, it says what is true now
and what was true before, rather than silently replacing one with the other: "nobody can open this
now, but someone once could". In the record the same holds: the demo's `Removed` keeps the history
of its own name in its status note ("Renamed from Trash after the implicature check, and so is the
step. The scope still says Trash: drift, reported.").

## Steps

1. Write the case in one sentence, then name the objection, one of the five. If you cannot name
   one, do not reopen: write the doubt in the decision log as a doubt, with the date.
2. Decide what the objection does to the rule: **amend** it (it holds, with a change), **narrow** it
   (it holds in a smaller scope), or **drop** it. Write which.
3. Write the error theory: why the old answer looked right, in a sentence that also says when it
   would still be right. The scope that said a first release needed no Home screen was amended with
   "right for a product you live in, wrong for one you visit". For the demo's D3: "Trash looked right
   because every file manager has one, and on those it is true."
4. Record it as a new decision that names the one it reopens. `decide` refuses an id that exists,
   and refuses a reopening without its objection, its outcome and its error theory; the old record
   stays as history, marked reopened:
   ```python
   p.decide('D7', 'What is the place for removed files called?',
            reopens='D3', objection='A premise is false: Trash implies the space comes back.',
            outcome='drop', error_theory='Trash looked right because every file manager has one, '
                                         'and on those it is true.',
            options=[…], right_if='…', screens=['Removed'], round='rounds/round-04.md')
   p.settle('D7', 'Removed', by='A. Example (product owner)', date='2026-10-28', explained='…')
   p.set('Removed', decisions=['D7'])
   p.save()
   ```
   D3 now reads "Reopened by D7" in the viewer; write the same in the decision log.
5. Patch the boards the outcome changes, one patch per change, and render every one in light and
   dark. If a name changed, rename the step too (`p.set_step('B', 'B3', title='…')`), add the old
   word to the policy, and run drift (examined-design-drift): the scope probably says the old thing.

## What the checks cannot see

`decide` refuses a reopening with no objection, outcome or error theory, and the build refuses one
that names a decision that does not exist. Nothing checks that the objection is one of the five, or
that the error theory explains anything: those are words in a field until a person reads them. `vocab` will count an old word left
on a board once it is in the policy, but not one left in journeys, stories or the scope.

## Stop when

The objection is named in one sentence; the outcome is written as amend, narrow or drop; the error
theory is written; boards are patched and rendered; drift is clean on the changed names.

Paper: article 13.
