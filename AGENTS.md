# examined-design

Design with a model so that every claim, on a screen or in the record, says what it rests on, and a
person answers for it. The argument is the paper in `docs/paper/`; the method is a loop of fifteen
questions, one per article, carried by eleven stage skills.

Read `skills/examined-design/SKILL.md` first. It routes to the stages.
Read `skills/examined-design-harness/SKILL.md` before creating or changing a prototype.

## Layout

```
skills/examined-design*      the entry skill, the harness contract, one skill per stage of the loop,
                             drift and backlog
skills/jira-backlog/         standalone: a brief, a running app or a codebase → a Jira structure
commands/                    slash commands for agents that have them
harness/protolib.py          create, edit, save, upgrade a single-file prototype
harness/build.py             compute DATA.derived; refuse on an unbound link or an unresolved id
harness/render.py            render boards alone, light and dark
harness/drift.py             scope document versus prototype
harness/src/, vendor/        the viewer and the React runtime inlined into every prototype
harness/systems/             a starter design system for boards
harness/templates/           an MCQ round, a decision log, a story
checks/                      thirteen checks; each says what it cannot see; test-fixtures.mjs tests contrast
cli/examined.mjs             new | build | render | init | check | baseline | waive
backlog/                     the plan and its emitter; --prototype or --plan
examples/demo/               a file manager built from an empty file in thirteen patches
docs/                        the tutorial, the reference, the paper
```

## The short version

The prototype is the source. Change it with one patch script per change, using `protolib`, with
exact-match assertions; never bulk-edit its markup with a regex. `save()` refuses if a link label is
not on its board or an id does not resolve. Render and look at every board you touched, in light and
dark, before calling a change done.

Text the model wrote that nobody decided stays in drafts. Explain back everything you accept. A
decision is a record with options, the case for each, who decided, when, and "right if". When you
offer the product owner a recommended option, write the best case for another beside it.

A check refutes; it never proves. Read a pass as "not refuted on this one condition". A clean report
from the model on its own work is not a clean product: find one check that comes from neither of you.

Reopen a decision only with a named objection; after reversing, write down why the old answer looked
right. Stop when the written definition of Ready holds, and ship with what was not checked named.

## If you have no slash commands

Invoke the skills by name. `examined-design` is the entry point; the rest are reached from it.
