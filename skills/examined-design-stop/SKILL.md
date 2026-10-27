---
name: examined-design-stop
description: Last stage of examined design, and also the first thing written at the start. Use at the start to define Ready in writing, and at the end to decide whether the work is done; it stops when Ready holds and ships with what was not checked named.
---
# Stop: Ready, written first

**Output:** at the start, a definition of Ready, signed and dated. At the end, a stop report: does
Ready hold; what is still waiting, and on whom; what was not checked, by name.

## The rule

**Write down what Ready means before you start, stop when it holds, and ship with what you did not
check named.**

## Why

The loop is reflective equilibrium: rules and cases adjusted against each other until they cohere.
A rule is amended when it yields a verdict we will not accept, and a verdict dropped when it breaks a
rule we will not amend (Goodman). Wide equilibrium tests both against background facts as well
(Daniels); in design those are the outside checks. The equilibrium is never final (Rawls), and its
known failures are the design loop's: unjustified starting judgements (the persona), different
equilibria on different days, whatever was decided first anchoring the rest, and a method that absorbs
every criticism instead of deciding. That last is why the loop needs a stopping rule, and Goodman's
account has none.

People satisfice: they set a level that is good enough and take the first option that meets it
(Simon). Ready is that level, with one change. Simon lets the level move during the search; here it is
fixed in writing before the work starts, because a threshold set during the loop is shaped by the
loop. It is revised only for a named objection. Then stop with your doubts named. Whoever knows only
their own side of a case knows little even of that (Mill).

## Hearing side

A model asked "is this done?" will usually find one more thing, or agree that it is. Neither answer
is the stop. The stop is the written definition, checked against the record. A proposal to move the
definition mid-loop needs a named objection (examined-design-reopen), not a feeling that the work is
nearly there.

## Speaking side

The product stops the same way. It says how many things need you "so far" and keeps a line saying it
is still checking; it never says nothing is waiting until every check has answered. The demo's search
says "Nothing found so far for “invoice”" and "Couldn't look in 2 folders just now." until every
folder is read.

## Steps

At the start (with examined-design-frame):

1. Write Ready as a condition someone else could check. One that has worked: "specified and handed to
   development, so the only remaining job is answering questions about the specification".
2. Sign it. Record it as a decision so it has a name, a date and a Right if (`p.decide('READY', …)`
   then `p.settle(…)`), and put it at the top of the decision log.

At the end:

3. Gather the state:
   - `examined build prototype.html`: refusals (must be none), reports, open decisions, gaps;
   - `examined check --no-new`: new findings since the baseline, errored checks;
   - `python3 harness/drift.py scope.md prototype.html`, if there is a scope;
   - the Open view (`prototype.html#open`): gaps, open decisions, screens that will change, gates
     and the screens standing on each;
   - the backlog's "Answer these first", if a backlog was built.
4. Check Ready, clause by clause, against that state. If it holds, stop, even if you can think of more.
5. Write the stop report:
   - **Ready:** holds, or which clause does not.
   - **Waiting, and on whom:** each open decision with its owner, each gate with who can answer it,
     each gap.
   - **Not checked:** by name. For example: keyboard and focus order, screen readers, motion beyond
     CSS, words untested with readers, conclusions with no outside check, and each check's
     cannot-see line (examined-design-measure).
6. Ship with that report attached. The stop is not the end: a named objection reopens the work, and
   the loop returns to the first question, what is the worst thing this product can do?

## What the checks cannot see

The build counts screens, links, open decisions and gaps, and reports what it was written to report.
The checks refute on their conditions. None of them says Ready, and a clean run is not a stop. The
stop report's "not checked" list is the only place the limits of the examination are written down.

## Stop when

Ready, written before the work started, holds; the stop report names what waits and on whom, and what
was not checked.

Paper: article 15.
