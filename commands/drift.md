---
description: Compare the agreed scope document with the prototype and list the edits the scope needs
argument-hint: '<path/to/scope.md> [path/to/prototype.html]'
---
Compare the scope with the prototype: $ARGUMENTS

Use the `examined-design-drift` skill.

1. If the scope lives in a wiki or ticket system, ask the person to save it as a file first.
2. Run `python3 harness/drift.py <scope> <prototype.html>` (prototype defaults to `prototype.html`).
3. For each section of the output, say what it means and what to do:
   - near-matches: two names for one thing; the prototype's name stands, the scope's changes;
   - steps not in the scope: bring the scope level, or drop the step;
   - steps nothing serves: if not recorded as a gap, add one with `p.add_gap(jid, sid, title, why)`;
   - boards serving no step: claims the scope has not seen; flag them to the scope's owner;
   - retired words still in the scope: edit the scope; also check the journeys' step titles.
4. Write the list of scope edits, each with its reason: the decision id behind it, the objection,
   and why the old line looked right. If the prototype has not been audited, mark each disagreement
   as a question rather than an edit.
5. Do not edit the scope document or send the list to anyone yourself. Hand it to the person.
