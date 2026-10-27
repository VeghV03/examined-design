---
name: examined-design-structure
description: Second stage of examined design. Use when sorting screens into kinds or choosing the words users act on; it makes every kind oblige something checkable and runs the implicature check on every word a user acts on.
---
# Structure: kinds that oblige, words that imply nothing false

**Output:** every screen classified as one kind, each kind with its obligation written down;
an implicature row for every word a user acts on, marked untested with readers; the vocabulary
policy in `DATA.policy`.

## The rules

**Sort your screens into kinds only if each kind obliges something, then check that every screen
of each kind meets it.**

**For every word a user acts on, list what it implies beyond what it says, check that the product
delivers each, and record that it is still untested with readers.**

## Why

A taxonomy is judged by its usefulness, not its truth (Nickerson and colleagues). A kind earns
its place only through an obligation that can be checked: calling a screen a place is then a
claim, and its failure is a finding. Nor are the kinds waiting to be found: Nielsen's analysis of
249 usability problems needed 53 factors to explain 90% of them. Choose kinds for what they let
you catch, in this product. Kinds also guard against reading a property of the parts as one of
the whole: every screen passing its checks does not make the product coherent.

A word means what it does to the reader, who brings every product they have used. Two people
pick the same word for the same thing less than one time in five (Furnas), and speakers
overestimate how often they were understood (Keysar and Henly). The designer is the speaker.
What a word implies is part of what it says (Grice), and an implication the product does not
deliver is a false claim, however exact the definition.

## Hearing side

- Hand the sorting to the model, then check the borderline cases yourself. Specialists agree on
  only about two-thirds of a simple classification. A row of small chips may be status marks, not
  controls, and then the minimum target size does not apply to them.
- The model reads a new product through every old one. Its word choices probably lean toward
  convention: right where the product resembles its peers, wrong exactly where it is new. That is
  a judgement, not a measurement. Look hardest at the words it proposes most confidently for the
  new parts.

## Speaking side

A state is a claim about the world. "Nothing here yet" says the list was read and found empty;
a list still loading has not been read, and showing it as empty asserts what nobody observed. In
the demo, `FilesEmpty` is reached when "the list was read and holds nothing" and `FilesReading`
when "the list has not been read yet". Search says "Nothing matches" only after every folder was
read (`SearchEmpty`); otherwise "Nothing found so far" and it names what it could not look in
(`SearchSoFar`).

## Steps

1. Use the harness's kinds, which the build enforces, and write what each obliges:
   - **place**: somewhere you can be and come back to; needs a navigation row (a global link) and
     an empty state. The build reports a place with no empty state.
   - **state**: a place under a condition; names its `place`, keeps its parent's heading. The
     build refuses a state with no place.
   - **detour**: ends where it started (a Cancel back to its place). Nothing checks this; read the
     board's out-links in the viewer.
   - **entrance**: assumes nothing. Nothing checks this either.
   These four are one product's choice, not a general taxonomy. If your product needs another
   dimension, write it and its obligation in the record, and check it yourself.
2. Mark empty states with `empty=True`, failure states with `trouble='…'`, and every variant with
   `variantOf` and a `variantWhen` that says what was observed:
   `p.add_board('FilesEmpty', 'Files, nothing here yet', 'state', html, place='Files', empty=True,
   variantOf='Files', variantWhen='the list was read and holds nothing')`.
3. `examined build prototype.html`. Weigh every report. The demo's `Storage` has no empty state;
   either draw one or sign why not.
4. For each word a user acts on (buttons, place names, status words), write a row: the word,
   what it implies beyond what it says, whether the product delivers each. Trash implies the item
   is gone and its space comes back: on a system that deletes nothing, both are false, so the demo
   renamed the place Removed (decision D3). Removed implies the file is out of the list (true) and
   can be undone (Put back makes it true). Mark the row **untested with readers**.
5. Put retired words in the policy so the vocab check counts them and drift finds them in the
   scope. There is no Proto call for the policy; set it in a patch, as `00-new.py` does:
   `{'word': 'trash', 'allow_zones': [], 'severity': 'error'}`. Mechanism words get a zone
   (`'advanced'`) where they are allowed.
6. Take the part-to-whole question last: is a problem solved on one screen solved on every screen
   of its kind?

## What the checks cannot see

The build's empty-state report cannot tell whether the empty state says the right thing. Nothing
checks that a detour returns or that an entrance assumes nothing. `vocab` counts listed words on
rendered boards; it cannot see whether a word that passes is understood as meant, and it does not
read journey or story text. That is why the demo's patch 07, which makes the place Removed, also
renames step B3 by hand with `p.set_step`: its old title, copied from the scope, said Trash.

## Stop when

The build has no refusals; every place has an empty state or a signed reason; every word a user
acts on has its implicature row, each marked untested with readers; retired words are in the policy.

Paper: articles 3 and 4.
