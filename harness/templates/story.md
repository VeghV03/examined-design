# <Step title, verbatim from the journey> · <journey id>/<step id>

<!--
A story engineering builds from. Copy to stories/<journey>-<step>.md, or let
`python3 backlog/build_backlog.py --prototype prototype.html` write the same content into Jira.

- Every string a user will read on the built screen is quoted exactly, in bold, with the board it
  comes from: **"…"** (proto: BoardName). Copy it from the prototype, never from memory or from an
  earlier story. Text copied from an earlier version keeps travelling after its source changes.
- The "so I can" stays blank until someone who knows why the step exists writes it. A plausible
  sentence here becomes a requirement somebody builds.
- Criteria that a check can test say "tested by" and the check. A pass means not refuted on that
  condition; the rest needs a person to look.
- The decisions it rests on are listed with their status. An open one blocks the story.
- Nothing tagged model's wording appears here.
Skills: examined-design-ship, examined-design-backlog. Paper: articles 5 and 11.
-->

**When** <the trigger: the board and the control that lead here>, **I want to** <the step, in the
person's words>, **so I can** ⟨blank until someone who knows writes it⟩.

**What it does.** <in the product's own words>
**What it must never do.** <if not obvious; tie it to the worst outcome where it applies>
**Empty.** <what it says with nothing in it> · **Fails.** <what it says when the read or the act
does not come back: what did not happen, what is still true, no guessed cause>
**Assumes.** <what must already exist>

## Required text

- **"<exact string>"** (proto: <BoardName>)
- **"<exact string>"** (proto: <BoardName>), <behaviour, if any: e.g. off until the check is back>

## Acceptance criteria

- [ ] <boards> render with nothing off the frame, a heading, and no text under its contrast threshold
      in either theme. Tested by overflow, structure, contrast.
- [ ] Every link declared from these boards binds to a label on its board. Tested by routes.
- [ ] Every required string above matches its board exactly. Needs a person to compare; no check
      reads story text.
- [ ] <a criterion that only a person can settle, said plainly>

## Rests on

- <Id> · <question> · settled <date> by <name> · right if: <…>
- <Id> · <question> · **open**: this story waits for it
- <gate id> · <question> · open gate: drawn for the likely answer, not signed off

## Ships marked

- Untested with readers: <words a user acts on>
- Pending: <open gates and decisions>
- Not checked: <e.g. keyboard and focus order; each relevant check's cannot-see line>

---

## Example (from the demo)

# Remove a file, or remove it for good · B/B3

**When** I am in Files and choose Remove, **I want to** remove a file, or remove it for good, **so I
can** ⟨blank until someone who knows writes it⟩.

**What it does.** Removing hides a file in Removed, where it can be put back. Removing for good takes
it out of Removed, with no Put back.
**What it must never do.** Claim that removing frees space, or let anyone remove for good before the
product has read who can open the file.
**Empty.** Removed with nothing in it says files wait there, still stored and still paid for.
**Fails.** <not drawn yet: the check of who can open the file does not come back>
**Assumes.** Files exists, with Remove on a row.

## Required text

- **"Removed"** (proto: Removed)
- **"These still use 229 KB of your storage. Removing them for good will not give it back."**
  (proto: Removed), the figure read, not assumed
- **"Remove for good"** (proto: Removed)
- **"Nothing removed"** (proto: RemovedEmpty)
- **"Files you remove wait here, still stored and still paid for, until you put them back."**
  (proto: RemovedEmpty)
- **"plan-v1.pdf leaves Removed. There is no Put back after this."** (proto: RemoveForGoodChecking)
- **"This will not"**, **"delete it from the network"**, **"give you the 220 KB back"**, **"take back
  copies anyone already has"** (proto: RemoveForGoodChecking)
- **"Checking who can open it…"** (proto: RemoveForGoodChecking)
- **"Cancel"** (proto: RemoveForGoodChecking), always works
- **"Remove it for good"** (proto: RemoveForGoodChecking), off (`aria-disabled`) until the check is back

The generator carries all of these but the Removed lede: a place's own paragraphs mix copy with data
("4 files · read just now"), so it leaves them out, and a hand-written story adds them.

## Acceptance criteria

- [ ] Removed, Removed with nothing here, and Remove for good while checking render with nothing off
      the frame, a heading, and no text under its contrast threshold in either theme. Tested by
      overflow, structure, contrast.
- [ ] Every link declared from these boards binds to a label on its board. Tested by routes.
- [ ] Every required string above matches its board exactly. Needs a person to compare.
- [ ] Remove it for good stays off until the product has read who can open the file; Cancel works
      throughout. Needs a person to look; no check reads `aria-disabled` as behaviour.
- [ ] No term the vocabulary policy forbids appears outside its zone. Tested by vocab.

## Rests on

- D3 · What is the place for removed files called? · settled 2026-10-20 by A. Example (product owner) ·
  right if: right while the storage genuinely cannot be reclaimed.

## Ships marked

- Untested with readers: "Removed", "Remove for good"
- Pending: a failed check of who can open the file has no board yet
- Not checked: keyboard and focus order; whether "Remove for good" is read as final
