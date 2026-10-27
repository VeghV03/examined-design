# Round NN · <topic> · <YYYY-MM-DD>

<!--
One multiple-choice round. Copy to rounds/round-NN.md beside the prototype.

- Up to four questions. More than four, and the later ones get less weighing.
- Each option says what it buys, what it costs, what it kills, and when it is right.
- One option is marked recommended. Beside it, the drafter writes the best case for another
  option, as strongly as it can. A recommendation works like a default; this is its counterweight.
- State each question without the drafter's leaning. The context says what is known.
- After the answer, the decider explains the choice back in one line, in their own words. The
  drafter never writes the explain-back. A decision that ships is not logged without one.
- "The model recommended it" is never a reason. The decider's name goes in `by`.
Skill: examined-design-decide. Paper: article 10.
-->

Drafted by: <the model / a person> · Decides: <name, role> · Questions: <n of at most 4>

## Q1 · <decision id> · <the question, one sentence, ending in a question mark>

**Context.** What is known, and what it rests on: boards, earlier decisions, gaps, gates. No
leaning.
**Boards it governs:** <BoardName, BoardName>

| | Option | Buys | Costs | Kills | Right if |
|---|---|---|---|---|---|
| A | <label> **(recommended)** | <what it gets you> | <what it costs> | <what it rules out> | <the condition under which A is the right choice> |
| B | <label> | … | … | … | … |
| C | <label> | … | … | … | … |

**Why A is recommended.** <two or three sentences>

**Best case for B instead.** <the strongest case for the best alternative, written as if you held it>

**Case for each option** (recorded as `case_for`, written before the answer):
- A: <…>
- B: <…>
- C: <…>

**What separates them** (recorded as `right_if`, phrased so it reads true whichever wins):
<"A wins if …, rather than …">

---
**Answer:** <option label, exactly as written above>
**Explain-back** (the decider's words, one line, why the others lose): <…>
**Recommended taken:** yes / no
**Decided by:** <name> · **Date:** <YYYY-MM-DD>

## Q2 · …

<!-- repeat, up to Q4 -->

## Tally

Recommended taken: <k> of <n>. <Running total across rounds, if kept.>

## How this round is recorded

Before the round is put, record each question as open, so the options are fixed before anyone
answers. Use the same id, label text and round path as above:

```python
import sys; sys.path.insert(0, 'harness'); from protolib import Proto
p = Proto('prototype.html')
p.decide('D2', 'Does search include removed files?',
         context='Search was designed after Removed existed; the two were not built together.',
         options=[{'label': 'Include, marked as removed', 'buys': '…', 'costs': '…', 'kills': '…',
                   'case_for': '…'},
                  {'label': 'Exclude removed files', 'buys': '…', 'costs': '…', 'kills': '…',
                   'case_for': '…'}],
         right_if='Include wins if removal is read as "out of the way" rather than "gone".',
         screens=['SearchResults'], round='rounds/round-01.md', recommended='Include, marked as removed')
p.save()
```

After the answer, in the next patch:

```python
p.settle('D2', 'Include, marked as removed', by='A. Example (product owner)', date='2026-10-27',
         explained='Exclusion would make removing behave like deleting, which is the claim Removed '
                   'was renamed to stop making.')
p.set('SearchResults', decisions=['D2'])
p.save()
```

- `settle` refuses a label that is not one of the options, so copy it exactly.
- `recommended` records the option you marked. DATA has no per-option Right if; this file keeps it,
  and `right_if` in DATA is the separating line.
- Then add the decision to the log (`decision-log.md`) and change the boards in their own patch,
  citing the id. A question left open stays `status: open`: the build reports it, the viewer's Open
  view lists it, and the backlog makes it a spike that blocks what it touches.

---

## Example (from the demo)

## Q1 · D2 · Does search include removed files?

**Context.** Search was designed after Removed existed; the two were not built together. Removed
files still use storage and can be put back (D3).
**Boards it governs:** SearchResults

| | Option | Buys | Costs | Kills | Right if |
|---|---|---|---|---|---|
| A | Include, marked as removed **(recommended)** | a file someone half-remembers removing is findable | every result needs a removed marker | a result list that is only files | removal is read as "out of the way", not "gone" |
| B | Exclude removed files | search only returns things you can use now | a removed file is invisible twice over | finding a file removed an hour ago | people remove things to get them out of search too |

**Why A is recommended.** Removing hides; it does not delete. A search that leaves removed files
out behaves as if they were deleted, which is the claim the place was renamed to stop making.

**Best case for B instead.** People remove things to get them out of the way, and search is one of
the ways. A result list full of removed files makes every search slower to read for the sake of the
rare person looking for one, and Removed has its own search.

**Case for each option:**
- A: Removing hides; it does not delete, so search should not pretend it did.
- B: People remove things to get them out of the way, including out of search.

**What separates them:** Include wins if removal is read as "out of the way" rather than "gone".

---
**Answer:** Include, marked as removed
**Explain-back:** Exclusion would make removing behave like deleting, which is the claim Removed was
renamed to stop making.
**Recommended taken:** yes
**Decided by:** A. Example (product owner) · **Date:** 2026-10-27
