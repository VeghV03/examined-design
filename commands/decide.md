---
description: Run one multiple-choice decision round, with the case against each recommendation and the decider's explain-back
argument-hint: '[decision ids or topic] [path/to/prototype.html]'
---
Run one decision round on: $ARGUMENTS

Use the `examined-design-decide` skill and the template `harness/templates/round.md`.

1. Collect the open questions: the build's "decisions open" line (`examined build prototype.html
   --check`), the viewer's Open view, gaps, and anything the person named. Take at most four.
2. Write the round in `rounds/round-NN.md` (next free number). For each question: context without
   your leaning; options with what each buys, costs and kills, and when each is right; one option
   marked recommended; beside it, the best case for another option, as strong as you can make it;
   the case for every option; the line that separates them.
3. Record each question as open with `p.decide(…, round='rounds/round-NN.md')` in a patch, so the
   options are fixed before the answer. Run it.
4. Put the round to the person and wait. Do not answer it yourself.
5. For each answer, ask for a one-line explain-back in their own words if they did not give one.
   Write it verbatim in the round file, with whether the recommended option was taken.
6. Settle in a new patch: `p.settle(id, label, by='<their name>', date='YYYY-MM-DD',
   explained='<their line>')`, attach it to its boards with `p.set(Board, decisions=[…])`, `p.save()`.
   A question they leave open stays open.
7. Add each decision to the decision log (`harness/templates/decision-log.md`).
8. Report what was settled, what stays open and what it blocks, and the round's tally. Board changes
   that follow from the answers go in their own patches, after this.
