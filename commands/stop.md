---
description: Check the written definition of Ready against the record and write the stop report
argument-hint: '[path/to/prototype.html]'
---
Decide whether the work on $ARGUMENTS is done, using the `examined-design-stop` skill.

1. Find Ready as it was written before the work started: the `READY` decision in DATA and the top of
   the decision log. If there is none, say so plainly. Do not invent one now; ask the person to write
   it, and note that a Ready written at the end is shaped by the work it judges.
2. Gather the state, without changing anything:
   - `examined build prototype.html --check`: refusals, reports, open decisions, gaps, failure states;
   - `examined check --no-new`, if a baseline exists (otherwise `examined check`);
   - `python3 harness/drift.py <scope> prototype.html`, if there is a scope document;
   - the viewer's Open view (`prototype.html#open`): gaps, open decisions, screens that will change,
     gates and the screens standing on each.
3. Check Ready clause by clause against that state. Quote each clause and say holds / does not hold,
   with the evidence.
4. Write the stop report:
   - **Ready:** holds, or which clause does not.
   - **Waiting, and on whom:** each open decision and its owner, each gate and who can answer it,
     each gap.
   - **Not checked:** by name, including each check's cannot-see line, words untested with readers,
     conclusions with no outside check, and anything not rendered in both themes.
5. If Ready holds, say the work can stop, even if more could be done. If it does not, name the
   clause that fails and the stage skill that addresses it.
