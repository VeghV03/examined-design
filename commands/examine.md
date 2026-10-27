---
description: Run the whole examined-design loop on a product or feature, from the worst outcome to a stop report
argument-hint: '<product or feature> [path/to/prototype.html]'
---
Run the examined-design loop on: $ARGUMENTS

Read the `examined-design` skill, then `examined-design-harness`, before doing anything else. Every
claim you produce is testimony the person will check: say what it rests on and how far it reaches.

Ground rules for the whole run:
- You propose, list, compare and draft. The person decides and signs. Never choose for them, never
  write their explain-back, never put your own name in `by`.
- Wording nobody has decided is tagged "model's wording" and stays out of boards' required text,
  stories and screens.
- Every change to the prototype is one numbered patch script using `Proto`; run it, then render
  every board it touched in light and dark (`examined render prototype.html <Board …> --both`) and
  look at each image.
- Do not push tickets, send messages or publish anything without the person's explicit go-ahead
  in this conversation.

Then go round the loop, one stage at a time, using each stage's skill. Stop at the end of each
stage and show the person what it left behind before going on.

Going out:
1. **Frame** (`examined-design-frame`): list the harms; the person picks and signs the worst outcome;
   the persona's few facts; Ready written now (`examined-design-stop`, start).
2. **Structure** (`examined-design-structure`): kinds and their obligations; an implicature row for
   every word a user acts on; the vocabulary policy.
3. **Draw** (`examined-design-draw`): boards, each place's reading and read-failed states, each
   irreversible door's checking state, gates for unanswered engineering questions.
4. **Audit** (`examined-design-audit`): compare in slices by place; the person looks at every finding.
5. **Measure** (`examined-design-measure`): `examined init` or `examined check`; read passes as "not
   refuted on this one condition"; baseline and waivers.
6. **Decide** (`examined-design-decide`): one round at a time from `harness/templates/round.md`, at
   most four questions, the best case for another option beside every recommendation.
7. **Ship** (`examined-design-ship`): strings traced to boards, boards to signed decisions, the rest
   marked.

Coming back:
8. **Outside** (`examined-design-outside`): one independent check per conclusion reached together.
9. **Reopen** (`examined-design-reopen`): only for a named objection, with an error theory.
10. **Retire** (`examined-design-retire`): a verdict on each tool in use.
11. **Stop** (`examined-design-stop`): check Ready against the record and write the stop report.

If no prototype exists yet, create one with `examined new prototype.html --title "…"` after Frame.
If a scope document exists, run `/drift` after Structure and again before Ship.

End with the stop report: whether Ready holds, what waits and on whom, and what was not checked.
