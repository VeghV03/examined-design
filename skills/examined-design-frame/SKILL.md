---
name: examined-design-frame
description: First stage of examined design. Use before anything is drawn, or when nobody has written down the worst thing the product can do or who it is designed for; it names the worst outcome, signs it, and fixes the persona's few facts as premises.
---
# Frame: the worst outcome, and the yardstick

**Output:** the worst thing the product can do, in one sentence, with a name and a date; the
persona as two or three facts written as premises; a definition of Ready (examined-design-stop).

## The rules

**Before you draw anything, name the worst thing your product can do: an act a user cannot undo,
taken on a belief the product gave them. Put your name to it.**

**Keep the persona to the few facts that change the design, ask it the same question every time,
and never cite it as evidence about people.**

## Why

A list of findings is all "is"; it does not rank itself (Hume). Any ranking rests on a premise
about what matters, and if nobody writes one down, one is used anyway: whoever ranks supplies it,
and for a model that is usually what is typical of similar products. Jonas argued that where
effects are long and hard to reverse, the bad case should come first, because we recognise what
we must avoid more readily than what we want.

The worst outcome needs both halves. An act that cannot be undone throws away the chance to
correct course (Arrow and Fisher's option value), but on a system that deletes nothing,
irreversibility alone names everything. A false belief alone is common and usually cheap.
Together they mark where the product's testimony does the most damage.

Naming it first does anchor what follows (Tversky and Kahneman). The answer is not to leave the
premise unwritten but to make it face its opposite: listing reasons an anchor may be wrong
weakens its pull. An unwritten anchor cannot be opposed at all.

A persona nobody has met cannot be a sample, and Chapman and Milham are right that it can be
neither verified nor falsified as one. It can be a yardstick: a fiction in Vaihinger's sense,
legitimate while everyone knows it is one, like the law's reasonable person. Experienced
practitioners used personas best when they kept only the role facts (Matthews and colleagues).

## Hearing side: what you take from the model

- Let the model list the harms. It will find more than you. It cannot choose among them:
  choosing is a value premise, the plainest case of a claim that must be signed. A log reading
  "worst outcome: suggested by the model" records that nothing was decided.
- The model may play the persona. Its answers sound like what outsiders imagine a group says and
  vary less than real people do (Wang and colleagues). Tag every such answer
  **persona (fiction)**. Untagged, its source fades, and two copies later it reads as "what users
  think".

## Speaking side: what the product tells the user

The worst outcome says where the product's word must be strictest. In the demo it is a file in
front of the wrong person, so moving into a shared folder asks first and says who gains access
before anything moves (`MoveShare`: "Client work is shared with Anna and Ben. Moving notes.md in
shares it with them, and with every later version."). The persona says what the product must say
unprompted: a periodic visitor arrives having forgotten what this is for, so `Welcome` opens on
what is true here ("Nothing here is deleted… What you share, you cannot take back.").

## Steps

1. Ask the model for every harm it can find: lost work, money, exposure, a wrong recipient.
2. For each, ask: can the user undo it? Did the product lead them to believe something false?
   Keep the ones where both are yes.
3. The person picks one. Record it as a decision so it carries a name, a date and a Right if:
   ```python
   p.decide('W1', 'What is the worst thing this product can do?',
            options=[{'label': 'A file reaches the wrong person', 'buys': '…', 'costs': '…',
                      'kills': '…', 'case_for': '…'}, …],
            context='Harms listed by the model; ranked by the person below.')
   p.settle('W1', 'A file reaches the wrong person', by='A. Example', date='2026-10-27',
            explained='Sharing writes access for good; every other harm can be put back.')
   p.save()
   ```
   Add it to the decision log (`harness/templates/decision-log.md`). The other harms are still
   designed for; they lose only where they conflict with this one.
4. Write the strongest reasons the choice might be wrong, beside it. That is what lets it be
   reopened later (examined-design-reopen) and not merely doubted.
5. Write the persona as facts that change the design: how often they come, what they stand to
   lose. Drop everything decorative. Write the one question you will ask at every decision:
   "what would the periodic owner make of this?"
6. Name what the persona cannot reach: what a word means to a real reader. Checks against the
   system (how it behaves, what engineering answers, the rendered screen) test the product's
   claims; the persona tests nothing.
7. Write Ready now, before the work starts (examined-design-stop).

## What the checks cannot see

No check reads a value premise. The build does not know the worst outcome exists; it only
refuses an id that does not resolve. Whether the persona is cited as evidence is visible only by
reading the record.

## Stop when

The worst outcome is one sentence, signed and dated, with its strongest objection beside it; the
persona is a handful of premises, tagged as a fiction; Ready is written.

Paper: articles 1 and 2.
