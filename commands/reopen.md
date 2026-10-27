---
description: Reopen a settled decision for a named objection, record amend, narrow or drop, and write why the old answer looked right
argument-hint: '<decision id> <the case that seems to break it>'
---
Reopen: $ARGUMENTS

Use the `examined-design-reopen` skill.

1. Read the decision in DATA (`p.data['decisions'][id]`) and in the decision log: what was chosen,
   its Right if, its explain-back, the boards it governs.
2. State the case in one sentence. Name the objection, one of five: the conclusion does not follow; a
   premise is false; the conclusion is known to be false; a premise is unsupported; a vague word is
   doing precise work.
3. If no objection can be named, do not reopen. Write the doubt in the decision log with the date, and
   stop there. If the push to reopen is only "are you sure?", say so: that is not an objection.
4. If there is one, draft a round (`/decide`) for the reopened question with a fresh id, recorded with
   `decide(…, reopens=<old id>, objection=…, outcome='amend' | 'narrow' | 'drop', error_theory=…)`.
   The person decides; you do not.
5. After they settle it: repoint the boards (`p.set(Board, decisions=[new id])`), mark the old entry
   "reopened by <new id>" in the log, and patch every board the outcome changes, one patch per change.
   Render each touched board in light and dark and look.
6. If a name changed, rename the step (`p.set_step`), add the old word to the policy, and run `/drift`.
7. Report the objection, the outcome, the error theory and the boards changed.
