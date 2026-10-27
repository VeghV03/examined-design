---
name: examined-design-retire
description: Coming-back stage of examined design. Use when a tool of the method has become a burden or a second copy, or when a claim on a screen feels inconvenient; it judges tools by whether they still serve and retires them openly, and judges the product's claims only by whether they are true.
---
# Retire: tools by use, claims by truth

**Output:** a one-line verdict for each tool in use (keep, change, retire); each retirement written
down openly, with why the tool looked right; no claim on a screen dropped or kept for being useful.

## The rule

**Judge your tools by whether they still serve the work, and retire them openly. Judge the
product's claims only by whether they are true.**

## Why

We are like sailors who have to rebuild their ship on the open sea, never able to put it in dry dock
and start from the best parts (Neurath). A method that never retires a tool keeps its mistakes.

The method's tools and the product's claims are different kinds of thing and answer to different
tests. Tools are means, judged by whether they serve. Claims are beliefs offered to users, and they
answer to evidence whatever their use: believing what the evidence supports cannot be reduced to
taking effective means to one's goals (Kelly). James's pragmatism is the right test for tools and the
wrong one for claims.

Retiring a tool is harder than it sounds. With $10 million already spent on a plane a rival had beaten
to market, 41 of 48 people said finish it; with nothing spent, 10 of 60 would spend the last million
(Arkes and Blumer). Effort already spent feels like a reason. It is not one. Only the work still to
come counts.

This method retired its own first principle. Its first version, "screens are compiled, not drawn",
built every board from generator scripts and promised a product you could prove. Compiling made
boards cheap and consistent while the design was small; once the prototype held the decisions, it was
the source and the generators were a second copy that could only drift. A product cannot be proved by
checks that only refute. Why it looked right: the counted failures were real and no review had caught
them, and going from 158 jargon words to 0 felt like a demonstration. It demonstrated that the listed
words were gone. The checks stayed, as refuters, and so did the decision record with its Right if.

## Hearing side

The method's own tools fall under the same test: the multiple-choice rounds, the model's-wording
tag, the snippets, the checks and their selectors, the templates, even the stage skills. Multiple
choice stays, with its counterweight added (examined-design-decide). A tool the model proposes keeping
"because it took so long to build" has given a sunk cost as a reason.

## Speaking side

A sentence on a screen is not a means to the product's comfort; it is testimony a user acts on. A
reassuring line that keeps people calm and is not true goes, however well it works. A true line that
is awkward stays until it is false; then it is reopened (examined-design-reopen), not retired.

## Steps

1. List the tools in use: patch scripts and their snippets (`parts.py`), `rebuild.sh`, the checks
   and their config (`cellChildSelector`, `densityBudget`, `targetSize`), the baseline and waivers,
   the backlog generator, the round and story templates, any generator or script that writes boards.
2. For each, ask: what work does this serve now? Would we adopt it today if we did not have it?
   Write the answer in one line. Leave out what it cost.
3. Look for second copies. Anything that can regenerate boards (a snippet file plus a script that
   replays patches, a design file exported to markup) is a second source. If it diverges from
   `prototype.html`, the prototype wins; if it can only drift, retire it.
4. Look for checks bent toward passing. A check whose findings are waived without reasons, or whose
   selector was narrowed until it finds nothing, is being tuned, not used. The honest forms are a fix,
   a waiver with a reason, or a retirement written down. Deleting a check to make a count go down
   retires a claim about the product, which this rule forbids.
5. Retire openly: write in the decision log (or the changelog) what was retired, from when, what
   replaces it if anything, and why it looked right. Remove it or freeze it so nobody runs it by habit.
6. Keep what still serves, and say so in one line. Keeping is a verdict too.

## What the checks cannot see

Nothing tells you a tool has stopped serving. No check compares a snippet file with the boards it
once produced, and `rebuild.sh` reproduces the prototype only while every snippet is unchanged. A
waiver's reason is required by the CLI; whether it is a good reason is not checked.

## Stop when

Every tool has a verdict; every retirement is written with its error theory; no claim on a screen was
kept or dropped for any reason but whether it is true.

Paper: article 14.
