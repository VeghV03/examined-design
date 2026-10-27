---
description: Run the checks against the prototype or an app, then baseline or waive findings; every pass read as not refuted on one condition
argument-hint: '[check | check --no-new | baseline [--update] | waive <fingerprint> --why "…" --until YYYY-MM-DD]'
---
Run the examined-design checks: $ARGUMENTS

Use the `examined-design-measure` skill. Run commands from the folder that holds the prototype (or
the app's `examined.config.json`), as `node <repo>/cli/examined.mjs …`, or `examined …` after
`npm link` in the repo. It is not on npm.

- No `examined.config.json` yet: `examined init`. It finds the prototype, writes the config and runs
  every check.
- `check` (the default): `examined check`. With a baseline, add `--no-new` to fail only on findings
  not in it.
- `baseline`: `examined baseline`. It refuses while any check errored, and refuses to overwrite an
  existing baseline unless the person asks for `--update`.
- `waive`: `examined waive <fingerprint> --why "<name>: <reason>" --until YYYY-MM-DD`. A waiver is a
  decision: get the reason and the name from the person, and prefer an expiry.

Then report, for each check: the number it printed, the findings with their fingerprints, and what
it cannot see (from the skill's table). Never say a check "passed" without its condition: say "not
refuted on <condition>". Name any check that errored or was skipped; it measured nothing. If the
boards draw controls as spans, say that target-size and the control half of structure could not fail.

Fix findings in patches, one per change, and render what you touched. Do not baseline or waive on the
person's behalf.
