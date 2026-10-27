---
name: examined-design-decide
description: Decide stage of examined design. Use whenever a design question needs an answer; it runs one multiple-choice round in which every recommended option carries the best case for another, and records each answer with the decider's own explain-back, a name and a date.
---
# Decide: multiple choice, with the case against

**Output:** a round file (`rounds/round-NN.md`, from `harness/templates/round.md`); each answer
recorded with `Proto.decide` and `Proto.settle`; the decision log updated
(`harness/templates/decision-log.md`).

## The rule

**Take the recommended option only after stating the best case for another and explaining your
choice in your own words. Log it as your decision.**

## Why

A recommended option is a default with reasons attached, and defaults move choices a long way.
Where changing the default took one click, 42% agreed to be organ donors when they had to opt in
and 82% when they had to opt out (Johnson and Goldstein). Defaults work hardest by endorsement, by
telling people what the chooser thinks they should do, and a "Recommended" tag is pure endorsement.

The recommendation is not independent of you. Models lean toward the view the user signals: they
drop correct answers when asked "Are you sure?", and match a stated view on open questions most of
the time (Sharma and colleagues; Perez and colleagues). A recommendation may echo the leaning in
your own question, and taking it then feels like confirmation from outside. Agreement with the
model is closer to one judgement than two.

The paper's own rounds took the marked recommendation 27 times in 29. That fits two readings: the
recommendations had become good, or the alternatives had stopped being weighed. The record cannot
tell them apart. What would tell them apart is also the remedy. Of the reasons people write after
choosing, only reasons against their answer bring confidence into line with accuracy (Koriat and
colleagues). And "I take option B", written in the log, does not report a decision; it makes one
(Austin). "The model recommended it", offered as the reason, presents your choice as something that
happened to you.

## Hearing side

The model writes the options, what each buys, costs and kills, when each is right, and marks one
as recommended. Beside the recommendation it writes the best case for another option, as strongly
as it can. The person weighs that case, chooses, and explains the choice back in one line of their
own. The model never writes the explain-back, and never appears in `by`.

## Speaking side

The product's defaults are its own recommendations to the user, and the same rule applies. Where
the act cannot be undone, set no default at all: in a share picker nothing is ticked until the
person ticks it.

## Steps

1. Collect the open questions: the build's "decisions open" line, the Open view (`#open`), gaps,
   audit findings that need a choice. Up to four per round.
2. Write the round from `harness/templates/round.md`. State each question without your leaning:
   the context says what is known, not what you hope.
3. Record each question as open before it is answered, so the options are fixed first:
   ```python
   p.decide('D2', 'Does search include removed files?', context='…',
            options=[{'label': 'Include, marked as removed', 'buys': '…', 'costs': '…',
                      'kills': '…', 'case_for': '…'},
                     {'label': 'Exclude removed files', 'buys': '…', 'costs': '…',
                      'kills': '…', 'case_for': '…'}],
            right_if='…', screens=['SearchResults'], round='rounds/round-01.md',
            recommended='Include, marked as removed')
   ```
   `case_for` holds the best case for each option. `recommended` is the option you marked, so the
   viewer can show whether it was taken and the take rate can be counted from DATA.
4. Put the round to the person. When they answer, ask for the one-line explain-back if they have
   not given it, and write it verbatim in the round file.
5. Settle it: `p.settle('D2', 'Include, marked as removed', by='A. Example (product owner)',
   date='2026-10-27', explained='Exclusion would make removing behave like deleting, which is the
   claim Removed was renamed to stop making.')`. Attach it to the boards it governs:
   `p.set('SearchResults', decisions=['D2'])`. Then `p.save()`. A decision made outside a round
   can be recorded settled in one call, `decide(…, chosen=…, by=…, date=…, explained=…)`; the build
   reports any settled decision that has no explain-back.
6. Note in the round file whether the recommended option was taken. Count it across rounds.
   Now and then run a round with no option marked.
7. Change the boards in a separate patch that cites the decision id, then render and look.

## What the checks cannot see

The build refuses a settled decision with nothing chosen, a decision id on a board that does not
exist, and a decision naming a screen that does not exist; it reports open decisions. It cannot see
whether the case for another option was weighed, whether the explain-back is the decider's own, or
whether `by` names a person. It reports a settled decision with no explain-back at all, and the
viewer shows whether the recommended option was taken; counting the take rate across rounds is still
yours to do.

## Stop when

Every question in the round is settled with a name, a date and an explain-back, or deliberately
left open (an open decision blocks what it touches, as a spike in the backlog); the round file
says which option was recommended and whether it was taken.

Paper: article 10.
