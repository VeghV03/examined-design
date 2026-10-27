---
name: examined-design-outside
description: First coming-back stage of examined design. Use whenever you and the model have reached a conclusion together (an audit merge, a decision, "no contradictions", "the checks pass"); it finds one check independent of both of you and records what it was.
---
# Outside: one check from neither of you

**Output:** for each conclusion reached with the model in this cycle, one check that comes from
outside the conversation, recorded with what was checked, by whom and when; or the conclusion
marked unchecked.

## The rule

**Before you trust a conclusion you and the model reached together, find one check that comes from
neither of you, and record what it was.**

## Why

Every check is a claim that needs checking in turn, and any chain of reasons ends somewhere
unsupported (Agrippa's modes). The sceptic is right against certainty. An engineer's answer is
testimony too. What makes a check outside is not certainty but independence: its reliability does
not come from the designer or the model.

The evidence on models correcting themselves is direct. It works where reliable feedback comes
from outside, and hardly anywhere else (Kamoi and colleagues). Models reviewing their own answers
with no outside signal stayed flat or got worse; told only whether an answer was right, they
improved. On one benchmark two rounds of self-review took a model from 75.8% to 41.8%, and being
told took it to 89.7% (Huang and colleagues).

Goodman called the circle between rules and cases virtuous, but only because one side brings
judgements made independently of the rules. A circle in which both sides draw on the same text has
no such input. Loosely, models trained on their own output lose the rare cases first (Shumailov
and colleagues), and the rare cases are the edge states a design is for.

## Hearing side

A designer who reads only the model's text adds no independent signal, and the conversation
becomes a loop of one source. Another run of the same model, a fresh session or a model of the same
family is not outside: it is close to the same source, and models favour output like their own.
It is cheaper because it is less independent.

What counts as outside:
- how the system actually behaves (the running system, its documentation, a measured result);
- an engineer's answer to a question only engineering can answer;
- a rendered screen a person looked at;
- a user, when there is one.

## Speaking side

The product needs its outside too. It says what it read from the system, with the time, not what
it assumes about itself: "3.1 GB of 10 GB used · paid until 14 Mar 2027 · checked today at 09:12".

## Steps

1. List the conclusions reached with the model since the last stop: audit causes, "no further
   contradictions", decisions resting on how the system behaves, check results summarised by the
   model, words judged clear.
2. For each, choose the cheapest check that is independent of both of you. Prefer the system and
   engineering for claims about behaviour, a person looking at renders for claims about what
   reaches the eye.
3. Renders: `examined render prototype.html <Board …> --both`, then a person looks. The model
   looking at its own renders still helps (it reads what reached the eye, not the declared code),
   but the recorded outside check is the person.
4. Record what the check was. On a board that has been checked against something outside the
   design: `p.set('Removed', status='checked', statusNote='Checked with engineering, 27 Oct (B.
   Engineer): removed files keep using storage.')`. The viewer's Open view lists checked boards
   under `meta.checkedLabel` (the demo's is "Checked against the network").
5. For a question only engineering can answer, keep it as a gate (`p.add_gate('G1', '…')`, named on
   the steps that rest on it) until the answer comes. Then record it with who gave it and when,
   `p.answer_gate('G1', 'No. A share that has gone out cannot be withdrawn.', by='B. Engineer',
   date='2026-10-28')`, redraw what it changes, and take the gate off the steps with
   `p.set_step(jid, sid, gates=[…])` in the same patch. The answered gate stays in the register.
6. A conclusion with no outside check yet is marked unchecked in the record and in the stop report.

## What the checks cannot see

The checks read rendered boards, which puts them outside the model's prose but not outside the
design: they were written by the same people and can share its blind spots. The demo's boards draw
controls as spans, and the target-size check, which looks only for buttons and links, passed them
all. `node checks/test-fixtures.mjs` tests one check against a known case (the veil); most checks
have no such test.

## Stop when

Every conclusion from this cycle has one recorded outside check, or is marked unchecked with the
reason.

Paper: article 12.
