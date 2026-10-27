# Round 01 · search and cost · 2026-10-27

Drafted by: the model, from the boards as they stood after patch 10 · Decides: A. Example, product
owner · Questions: 2 of at most 4

Recorded in patch 11 (`p.decide`, `p.settle`) as D1 and D2.

## Q1 · D2 · Does search include removed files?

**Context.** Search was drawn after Removed existed (patches 07 and 08), and the two were not
designed together. A file removed an hour ago is still stored and still paid for (D3).
**Boards it governs:** SearchResults

| | Option | Buys | Costs | Kills | Right if |
|---|---|---|---|---|---|
| A | Include, marked as removed **(recommended)** | a file someone half-remembers removing is findable | every result needs a removed marker | a result list that is only files | people read removing as "out of the way" |
| B | Exclude removed files | search only returns things you can use now | a removed file is invisible twice over | finding a file removed an hour ago | people read removing as "gone" |

**Why A is recommended.** Removing hides; it does not delete. If search drops removed files, the
product behaves as if they were deleted, which is the impression Removed exists to avoid.

**Best case for B instead.** People remove things to get them out of the way, including out of
search. A result list full of things you put aside is a list you stop trusting.

**Case for each option** (recorded as `case_for`, written before the answer):
- A: Removing hides; it does not delete, so search should not pretend it did.
- B: People remove things to get them out of the way, including out of search. A result list full
  of things you put aside is a list you stop trusting.

**What separates them** (recorded as `right_if`):
Include wins if removal is read as "out of the way" rather than "gone".

---
**Answer:** Include, marked as removed
**Explain-back:** Exclusion would make removing behave like deleting, which is the claim Removed was
renamed to stop making.
**Recommended taken:** yes
**Decided by:** A. Example (product owner) · **Date:** 2026-10-27

The explanation names why B loses in the decider's own words, and ties this decision to D3. Settling
it changed a board: SearchResults now shows the removed `plan-v1.pdf`, marked Removed (patch 11).

## Q2 · D1 · Does the cost estimate appear before saving, or after?

**Context.** The scope asks for an estimate before saving (step B5). Nothing serves it yet; it is a
gap.
**Boards it governs:** Files (where saving starts)

| | Option | Buys | Costs | Kills | Right if |
|---|---|---|---|---|---|
| A | Before saving **(recommended)** | nobody is surprised by a charge | the estimate is computed on a file that is not saved yet | the one-click save | the people arriving are price-sensitive |
| B | After saving, before publishing | an exact number instead of an estimate | the person has already committed | the promise that nothing happens until you choose | the people arriving have already committed |

**Why A is recommended.** Saving here spends money that does not come back. A spend that cannot be
undone should not rest on a number the person has not seen.

**Best case for B instead.** An exact figure is honest where an estimate may be wrong, and a wrong
estimate shown before saving is a claim the product cannot stand behind.

**Case for each option** (recorded as `case_for`):
- A: An irreversible spend should never rest on a number the person has not seen.
- B: An exact figure is honest where an estimate may be wrong, and a wrong estimate shown before
  saving is a claim the product cannot stand behind.

**What separates them** (recorded as `right_if`):
Before wins if arrivals are price-sensitive rather than already committed.

---
**Answer:** not yet. "I don't know whether the people who save large files here are
price-sensitive. Ask again after the first five interviews."
**Recommended taken:** no answer yet
**Decided by:** A. Example (product owner) · **Date:** 2026-10-27

Not deciding is an answer, and it is recorded as one: D1 stays open, B5 stays a gap, the Open view
lists it, and the backlog makes it a spike that blocks the six items it holds up. Nobody draws B5 on
a guess in the meantime.

## Tally

Recommended taken: 1 of 1 answered. One question left open.

## What this round did not settle

- D1, above, and when it will be asked again (after five interviews).
- Whether search should also match text inside documents. Not asked: nothing in the scope calls for
  it, and SearchEmpty says plainly that only names are matched.
