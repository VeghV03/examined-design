---
name: examined-design-drift
description: Compare an agreed scope document with the prototype in examined-design work. Use when a scope, brief or PRD exists beside the prototype, after any reopen that changes a name, and before building a backlog; it lists the edits the scope needs, each with its reason.
---
# Drift: the scope against the prototype

**Output:** a list of edits to the scope document, each with its reason; every step nothing serves
recorded as a gap in the prototype; no retired word left in the scope.

## The core rule

**Where the scope and the audited prototype disagree, the prototype dictates: the output is edits to
the scope, never silent edits to the prototype. Each edit is a reopened decision, and carries its
objection.**

## Why

Text outlives its source. In one project, 15 of 122 required strings in the stories no longer
existed in the prototype: they had been copied from an earlier version and kept moving after their
source changed (article 5). A scope is the same kind of copy. Once the prototype has been audited
and its decisions signed, it holds what was decided; a scope that disagrees is making claims the
product no longer makes.

A near-match is worse than a miss. A miss means the step is not in the scope. A near-match means
somebody paraphrased, and two names now exist for one thing; a developer holding both documents has
to build the mapping in their head. A word the product has retired that still stands in the scope is
a claim the scope makes and the product does not: the demo's scope still says Trash.

The scope was agreed by people. An edit to it reverses something they agreed, so it needs what any
reversal needs (article 13): a named objection and why the old line looked right. "The scope said the
first release needed no Home screen" was right for a product you live in and wrong for one you visit.

## Hearing side

The model is good at noticing that two texts differ and poor at knowing which is right. Drift tells
you where the scope and the prototype disagree; whether the prototype is right is settled by the audit
and the decisions behind it. If the prototype has not been audited, the disagreement is a question,
not an edit.

## Speaking side

The scope is not shown to users, but its words reach them: steps are copied verbatim into journeys,
journeys become epics and stories, and story names become the words engineering builds. A retired
word in the scope travels into the product's vocabulary by that route.

## Steps

1. Save the scope as a file if it lives in a wiki or a ticket system. You want a fixed thing to
   compare against next month. Markdown, HTML and plain text are read.
2. Run it:
   ```sh
   python3 harness/drift.py scope.md prototype.html
   ```
3. Read each section. On the demo:
   - **steps verbatim in journeys** 8 / 9;
   - **not in the scope:** `B/B3: "Remove a file, or remove it for good"`, the step renamed when
     Trash became Removed. Bring the scope level, or drop the step;
   - **nothing serves:** `B/B5 (recorded as a gap)`. Honest. A step marked `NOT recorded as a gap`
     needs `p.add_gap(jid, sid, title, why)` in a patch;
   - **boards serving no step:** claims the scope has not seen; flag them to the scope's owner;
   - **near-matches:** two names for one thing. The prototype's name stands; change the scope's;
   - **retired words:** `line 10: "trash" in "- Remove a file from Trash"`. Edit the scope.
4. Retired words also sit in the prototype's own journeys, because steps are copied verbatim. Rename
   the step in the patch that retires the word, as the demo's patch 07 does with
   `p.set_step('B', 'B3', title='Remove a file, or remove it for good')`, and propose the matching
   scope edit at the same time, so the two become verbatim again.
5. Write each scope edit with its reason: the decision id that changed it, the objection, and why the
   old line looked right. Hand the list to whoever owns the scope; sending it is their call and yours,
   not the model's.
6. Run drift again after the scope is edited, and before every backlog build.

## What the checks cannot see

Drift compares step titles and listed words, not meaning: a scope line that says the opposite in
different words is a miss, not a contradiction. `vocab` reads rendered boards only, so a retired word
in a journey step or a story name passes it. Drift cannot tell which side is right.

## Stop when

No near-matches; every step in the journeys is verbatim in the scope or deliberately dropped; every
unserved step is recorded as a gap; no retired word stands in the scope or in the journeys; each scope
edit carries its reason.

Paper: articles 4, 5 and 13.
