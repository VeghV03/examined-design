---
name: examined-design
description: Entry point for designing a product or feature with a model by the examined-design method. Use it first whenever someone asks to design, prototype, audit, decide or ship screens with a model's help; it says what tied, tested and signed mean and routes to the stage skills.
---
# Examined design

When you design with a model you stand between two lines of testimony. The model tells you
things: that two screens agree, that a word is clear, that one option is better. The product
then tells its users things: that a file is shared with one person, that the list was read at
09:12. They act on it. Much of what you pass on as the product's word you first took on the
model's.

One discipline governs both lines: **every claim, on a screen or in the record, says what it
rests on, and a person answers for it.**

## What "examined" means

A claim is examined when three things are true of it.

- **Tied.** It says what it rests on. A true opinion with no account of why it holds is a
  statue of Daedalus: it walks off (Plato, *Meno*). A recommendation can be right and still untied.
- **Tested.** It has met the strongest objection anyone could find, and it still stands.
- **Signed.** A person answers for it. A model can produce the words of a promise without
  taking on the promise; anything that ships needs someone behind it.

Examination is necessary, not sufficient. An examined design can still be wrong. An
unexamined one is right only by luck.

## The same three failures on both lines

| Failure | In the record (hearing) | On the screen (speaking) |
|---|---|---|
| A claim that lost its source | wording nobody decided reaches a story as a requirement | an old storage figure shown as current |
| A dropped qualifier | a finding true of one board reported as true of the product | "we opened them" when the product saw a request go out and data come back |
| A pass read as proof | a green contrast check read as "the text is legible" | "checked today" read as "nothing has changed since" |

Errors in design reasoning rarely sit in the deduction. They sit in a premise, in how
something was classified, in what a word means to the reader, or in where a claim came from.
Each stage below asks one of those questions.

## The loop

The method is a loop, not a line. Part I goes out; Part II comes back and returns to the start.

```
Part I, going out    Frame → Structure → Draw → Audit → Measure → Decide → Ship
                                                                            ↓
Part II, coming back  Frame ← Stop ← Retire ← Reopen ← Outside ←────────────┘
                      "what is the worst thing this product can do?"
```

A named objection at any point sends you back. The stop is not the end.

## Where to go

Read **examined-design-harness** before drawing anything. It is the contract every stage
writes into: one prototype file, one scripted patch per change, render and look.

| Stage | Articles | Skill | Use when | Leaves behind |
|---|---|---|---|---|
| Frame | 1–2 | examined-design-frame | starting, or the worst outcome is unwritten | the worst outcome, signed; the persona's few facts; Ready |
| Structure | 3–4 | examined-design-structure | sorting screens, naming things | kinds with obligations; an implicature row per word a user acts on |
| Draw | 5–7 | examined-design-draw | adding or changing boards and copy | boards that say what was observed; reading, failed and checking states |
| Audit | 8 | examined-design-audit | many boards exist and may disagree | findings each checked by looking; causes tested by applying fixes |
| Measure | 9 | examined-design-measure | running the checks | findings, a baseline, waivers with reasons; what each check cannot see |
| Decide | 10 | examined-design-decide | a question needs an answer | a multiple-choice round; decisions with explain-back |
| Ship | 11 | examined-design-ship | handing work to engineering | strings that trace to boards and boards to signed decisions; the rest marked |
| Outside | 12 | examined-design-outside | you and the model agree on something | one independent check per conclusion, recorded |
| Reopen | 13 | examined-design-reopen | a case seems to break a decision | the named objection; amend, narrow or drop; the error theory |
| Retire | 14 | examined-design-retire | a tool feels like a burden, or a claim feels inconvenient | verdicts on tools, retirements written openly |
| Stop | 15 | examined-design-stop | deciding whether the work is done | Ready checked; what waits, on whom; what was not checked |
| Drift | — | examined-design-drift | a scope document exists beside the prototype | edits to the scope, each with its reason |
| Backlog | — | examined-design-backlog | turning the prototype into tickets | epics, stories, sub-tasks with required text, spikes |

Commands that run these: `/examine`, `/decide`, `/reopen`, `/stop`, `/drift`, `/backlog`, `/check`.

## The hearing side, for an agent

You are the model in the first line. Behave like testimony that expects to be checked.

- Propose, list, compare and draft freely. Choosing what matters, and signing, stays with a person.
- Tag wording nobody has decided as **model's wording**. Nothing tagged reaches a board's
  required text, a story or a screen.
- Say how far each finding reached: one board, the declared colours, this run.
- When you recommend an option, write the best case for another beside it.
- Never record "the model recommended it" as a reason, and never put the model's name in `by`.
- A clean report on your own work shows little. Say so, and ask for a check from outside.
- If you reverse an answer, give the objection and why the first answer looked right. Without
  them, the reversal is compliance.

## The speaking side

Every sentence on a screen is the product's testimony. It says what was observed, with the
qualifiers that say how far it reaches: when, from where, now or ever. It names what, never
why. It shows no figure before it is read, and it never lets anyone take an irreversible step
on a fact that has not been read.

## What this rests on

The method was worked out on one project, by one designer, with one model, checked against a
persona and against what the system does, with no users observed. That is a method and also
a limit, and the work should say so where it matters: a word that passes the implicature check
is still untested with readers.

Paper: *Examined Design: Testimony in both directions when you design with a model*
(Valentin Vegh, Solar Punk), prologue.
