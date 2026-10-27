---
name: examined-design-audit
description: Audit stage of examined design. Use when many boards exist and may contradict each other or the product's promises; the model compares them in slices, every finding is checked by looking, and a clean report on the model's own work is never read as a clean product.
---
# Audit: the model compares, a person looks

**Output:** a list of contradictions, each confirmed by opening both boards; the findings merged
into causes, each cause tested by applying its fix everywhere; a line in the record saying what
the audit's silence does not cover.

## The rule

**Let the model compare what is written, in slices. Check every finding by looking, and never
read a clean report on its own work as a clean product.**

## Why

Once the premises are written down, checking them against each other is work a model does well,
at a scale no person matches. There are two limits.

The first is length. Models use the start and end of a long context far better than the middle;
in one test a model given twenty documents did worse with the answer in the tenth than with no
documents at all (Liu and colleagues). So the work is sliced, and the merge, where claims about
the whole product get made, is where to look hardest.

The second is the circle. If every check on testimony is more testimony, the checking goes round
(Coady). The circle is narrower than it looks. A contradiction the audit reports can be checked by
anyone: open both boards and look. What the circle undermines is the silence. Models are poor at
locating the first mistake in a chain yet good at fixing it once shown (Tyen and colleagues), and
they rate their own output above others' (Panickssery and colleagues). A model's verdict on its own
work leans toward clean.

Consistent is not true: an audit can find that two boards disagree, but only something outside
can say which is right. And merging many findings into a few causes is an inference to the best
explanation, whose risk is that the best you thought of is the best of a bad lot (Lipton).

## Hearing side

What you take from the model is a list of places to look, not a verdict. Each finding is a claim
that two boards disagree; it counts once a person has opened both. "No other contradictions" is
the model's silence about its own work, and it is recorded as unchecked.

## Speaking side

An audit is the product's testimony examined for consistency with itself. Its strongest move is
Socrates' own: take the product's promise and find a case where its own text breaks it. The demo
promises that removing never gives space back; `Removed` ("These still use 229 KB of your storage.
Removing them for good will not give it back."), `RemoveForGoodChecking` ("give you the 220 KB
back" under "This will not") and `Storage` (Removed, 229 KB) must all keep it. Row sizes that add
up to more than the total under them is the kind of break to look for.

## Steps

1. Make sure the premises are written: the worst outcome, the kinds and their obligations, the
   vocabulary policy, the settled decisions. The audit checks claims against these and against
   each other.
2. Slice by place. The build lists each place with its states and detours:
   ```python
   import sys; sys.path.insert(0, 'harness'); from protolib import Proto
   p = Proto('prototype.html')
   for pl in p.data['derived']['places']:
       print(pl['id'], [s[0] for s in pl['states']], [d[0] for d in pl['detours']])
   ```
   Give each slice to its own reader (a subagent per slice), with every board's `html` in full and
   the premises. Ask for contradictions between boards, between a board and a premise, and cases
   where the product's own text breaks its promise.
3. Look at every finding. Open `prototype.html#board=A` and `#board=B`, or render both with
   `examined render prototype.html A B --both`. Discard what does not hold; keep the rest with the
   board names and the exact strings.
4. Merge by cause at the end, yourself or with the model, and treat each cause as a hypothesis:
   "solved on one board, not applied on the others" is the common one. Test it by applying the
   existing fix everywhere, one patch per cause, and re-reading the slice. A cause whose findings
   do not clear was the wrong cause.
5. Where two boards disagree about what the system does, the audit cannot say which is right.
   Take it outside (examined-design-outside): an engineer, the running system.
6. Record the silence: "No further contradictions found by the model in slices X–Y; not checked
   from outside."

## What the checks cannot see

The build checks that ids resolve and labels bind, not what boards claim. `routes` checks that a
link label is on its board, not that the link goes to the right board. No check compares two
boards' figures or promises. That comparison is the audit, and its silence is not a check.

## Stop when

Every finding has been looked at by a person; every cause has been tested by applying its fix and
re-reading; disagreements about the system are taken outside; the silence is recorded as
unchecked.

Paper: article 8.
