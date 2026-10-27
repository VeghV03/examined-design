# Decision log · <product>

<!--
The readable record of every decision, kept beside the prototype as decisions.md.

It mirrors DATA.decisions in prototype.html. The prototype is the source: a decision is made when
`Proto.settle` (or `Proto.decide` with `chosen=` and `explained=`) runs in a patch, and this log is
written in the same sitting. Where the two disagree, fix the log, or reopen the decision; never let
them drift. DATA keeps the recommended option, the explain-back, a reopening's objection, outcome
and error theory, and gate answers; this log keeps them readable in one place, and also holds what
DATA does not: doubts that are not yet objections, and the take rate across rounds.

Ids are short and stable (D1, D2, W1, READY). A reopened decision gets a new id (`decide(…,
reopens='D3', …)`); the old entry stays, marked reopened.
Skills: examined-design-decide, examined-design-reopen. Paper: articles 10, 11 and 13.
-->

## Standing premises

| Id | What | Who | Date |
|---|---|---|---|
| W1 | Worst outcome: <an act a user cannot undo, taken on a belief the product gave them> | <name> | <date> |
| READY | Ready means: <a condition someone else could check> | <name> | <date> |
| — | Persona (a fiction, consulted, never cited): <two or three facts that change the design> | <name> | <date> |

## Decisions

### <Id> · <question>

- **Status:** settled / open / reopened by <Id>
- **Date:** <YYYY-MM-DD> · **Who:** <name, role> · **Round:** <rounds/round-NN.md>
- **Chosen:** <option label, exactly as in DATA> · **Recommended:** <label> (taken: yes / no)
- **Right if:** <the condition under which this stays right; when it fails, reopen>
- **Explained:** "<the decider's own one line: why the other options lose>"
- **Boards:** <BoardName, BoardName>
- **Reopens:** <Id> · **Objection:** <one of the five, in a sentence> · **Outcome:** amend / narrow / drop
- **Why the old answer looked right:** <the error theory>

## Doubts (not yet objections)

- <date> · <decision id> · <the doubt>. Not reopened: no objection named.

## Gates answered

- <gate id> · <question> · answered <date> by <name>: <answer>. Boards changed: <…>.

---

## How each field mirrors DATA.decisions

| Log | `DATA.decisions[id]` | Set by |
|---|---|---|
| Id | the key | `decide(did, …)` |
| question | `question` | `decide` |
| context | `context` | `decide(context=…)` |
| options, with buys, costs, kills | `options[*].label`, `.buys`, `.costs`, `.kills` | `decide(options=[…])` |
| the case for each option | `options[*].case_for` | `decide(options=[…])` |
| Right if | `right_if` | `decide(right_if=…)` |
| Boards | `screens` (and each board's own `decisions` list, via `set(name, decisions=[…])`) | `decide(screens=…)`, `set` |
| Round | `round` | `decide(round=…)` |
| Status | `status`: `open` or `settled` | `decide`, `settle` |
| Chosen | `chosen` | `settle(did, chosen, …)` |
| Who | `by` | `settle(by=…)` |
| Date | `date` | `settle(date=…)` |
| Explained | `explained` | `settle(explained=…)` |
| Recommended, taken, reopens, objection, error theory, doubts | (none) | this log only; put the reopening and error theory in the new decision's `context` too |

To compare the log with DATA, print DATA's side:

```python
import sys; sys.path.insert(0, 'harness'); from protolib import Proto
p = Proto('prototype.html')
for k, d in p.data['decisions'].items():
    print(f"{k} · {d['status']} · {d.get('date') or '—'} · {d.get('by') or '—'} · "
          f"{d.get('chosen') or 'OPEN'} · right if: {d.get('right_if') or '—'} · "
          f"explained: {d.get('explained') or '—'}")
```

A settled decision with no `explained` is not ready to ship. A decision whose `by` is not a person's
name is not signed.

---

## Example (from the demo)

### D2 · Does search include removed files?

- **Status:** settled
- **Date:** 2026-10-27 · **Who:** A. Example (product owner) · **Round:** rounds/round-01.md
- **Chosen:** Include, marked as removed · **Recommended:** Include, marked as removed (taken: yes)
- **Right if:** Include wins if removal is read as "out of the way" rather than "gone".
- **Explained:** "Exclusion would make removing behave like deleting, which is the claim Removed was
  renamed to stop making."
- **Boards:** SearchResults

### D1 · Does the cost estimate appear before saving, or after?

- **Status:** open. Blocks the steps whose boards it names; the gap "A cost estimate before saving"
  (B5) waits on it.
- **Boards:** Files
