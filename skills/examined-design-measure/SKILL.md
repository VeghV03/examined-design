---
name: examined-design-measure
description: Measure stage of examined design. Use when running the checks against a prototype, a folder of built pages or a running app; it reads every pass as "not refuted on this one condition", keeps a baseline and waivers with reasons, and writes beside each check what it cannot see.
---
# Measure: checks refute, they never prove

**Output:** `.examined/findings.json` from a run; `examined.baseline.json`; waivers with a reason,
a name and a date in `examined.waivers.json`; for each check, the line saying what it cannot see,
carried into the stop report.

## The rule

**Read a pass as "not refuted on this one condition", and write beside every check what it cannot
see.**

## Why

A check tests one observable consequence of the property it is named after. No number of passes
verifies a general claim; one sound failure refutes it; and a pass counts only in so far as the
test could have failed (Popper). A pass can be wrong in two ways: the check covers too little of
the property, or its score moves with something that is not the property (Messick).

The first contrast check passed a list's text at 4.74:1. A white veil at 34% over the list took
the same text to 2.53:1 on the screen. The check read the declared colours; what reached the eye
was the colour after the veil. A chip 137 px wide in a 132 px cell painted over the next column
while the overflow check passed, because overflowing a cell never crosses the frame. The checks
are the most certain knowledge of lesser things: worth having, and worth less than the judgement
they cannot reach. And once "passes the checks" becomes the goal, designs, and the model making
them, get tuned to pass (Campbell).

## Hearing side

A report from the model that "the checks pass" is a claim about one run, on the conditions those
checks test. Keep the qualifier: which checks, which boards, which theme, this run. "Contrast
passes" is true of the composited colours at each text's centre; it is not "the text is legible".

## Speaking side

The product's own checks are passes too, and it reports them as such: a figure says when it was
checked ("checked today at 09:12"); when a check fails, the line becomes "Couldn't check · last
checked 09:12", never an old pass shown as current.

## Steps

1. In the prototype's folder: `examined init`. It finds the prototype, writes
   `examined.config.json` (`{"target": {"mode": "prototype", "file": "./prototype.html"}}`) and
   runs every check against each board alone (`#board=Name`). The checks need Playwright for
   Node (`npm install` in `checks/`).
2. Read each line as a refutation or a silence. A finding is something to fix or decide. A check
   that errored measured nothing, and the run names it.
3. Fix what is wrong, one patch per change, and render the boards you touched.
4. `examined baseline` freezes today's findings; it refuses while any check errored, and refuses to
   overwrite without `--update`. From then on `examined check --no-new` fails only on a finding
   that is not in the baseline, including one that arrives as another is fixed.
5. To accept a finding, decide it: `examined waive <fingerprint> --why "A. Example: chip is a
   status mark, not a control" --until 2027-01-31`. The CLI has no name field; put the name in
   `--why`. A waiver with no `--until` is reported on every run.
6. `node checks/test-fixtures.mjs` tests the contrast check's claim about itself: the veil fixture
   must fail and the plain page must pass.
7. Copy the "cannot see" lines below into the stop report's "not checked" list for this product.

## What each check cannot see

| Check | A finding means | A pass cannot see |
|---|---|---|
| overflow | content off the frame at a width | overflow inside a cell or container that never crosses the frame edge |
| contrast (light, dark) | composited text under its threshold | edges under a layer, gradients and images behind text, anti-aliasing; skips disabled controls and text behind a modal scrim |
| translucency | text under a large translucent layer | layers under 200 px a side; modals; any ground but white |
| cellfit | a `cellChildSelector` element (default `.chip`) wider than its parent | anything that does not match the selector |
| structure | no heading, an unlabelled control, colour-only `[data-status]`, prose over 40em | whether the heading says the right thing, heading order, focus order; a control the control selector does not match |
| vocab | a policy word outside its zone | whether a passing word is understood as meant; text outside the boards (journeys, stories) |
| routes | a declared link label not on its board | whether the link goes to the right board |
| links | a same-origin link that does not resolve (needs a served origin) | whether it is the right link |
| density | more elements than the budget | whether the screen is usable at that count; set the budget from the real data scale |
| lang | no `<html lang>` | whether the language is right |
| target-size | a control under the minimum (`button`, `a`, `role=button`, form fields, and whatever `meta.controls` names) | anything clickable the selector does not match |
| motion | CSS still animating under reduced motion | motion driven by script, motion that starts on interaction |
| offline | an external request, or a file that paints nothing | whether what painted is right |

The demo shows why the last column matters. Its boards draw buttons as `<span class="btn">`, and
until patch 00 named them (`controls='.btn, .nav'` in `meta`), `target-size` and the control half of
`structure` found nothing on any board: they could not have failed, and passed. Both now say so when
they find no control anywhere. With the controls named, a 32px minimum finds six boards; at 24px,
none. Name your design system's controls in `meta.controls`, or the pass means nothing.

## Stop when

No check errored; every finding is fixed, baselined or waived with a reason, a name and a date; the
cannot-see lines for this product are in the stop report.

Paper: article 9.
