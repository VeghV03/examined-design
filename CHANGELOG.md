# Changelog

## 2.0.0 — examined-design

The repository was *measured-design*, "design a product you can prove". It is now *examined-design*,
and the reason is in the paper that came out of using it: [*Examined Design*](docs/paper/examined-design.pdf),
article 14. That article says a method's tools may be retired when they stop serving the work, and
that every reversal should say why the old answer looked right. This entry does both.

### Retired

- **"Screens are compiled, not drawn."** The first principle of v1, and the three generator adapters
  (Python, Node, React) and the eight-file `model/` that served it.
  *Why it looked right.* While a design is small, generating boards from one design system in code
  makes them cheap and consistent, and putting the rationale in the generator kept it next to the
  screen. *Why it stopped being right.* Once a prototype holds the decisions, the prototype is the
  source and the generator is a second copy that can only drift. The project this pack came from
  stopped compiling screens after three weeks and went on for six more editing the prototype itself;
  the generators, run again, would have overwritten that work.
  *What replaces it.* The single-file prototype in `harness/`, edited by one patch script per change,
  with a build step that computes everything derivable and refuses when a link lies.
- **The promise to prove.** A check refutes; it never proves. A pass means "not refuted on this one
  condition".
  *Why it looked right.* The counted failures were real, and no review had caught them: 158 jargon
  words to 0, 42 screens with no heading to 0. That felt like a demonstration. It demonstrated that the
  listed words were gone. *What replaces it.* Every check now says, in its first lines, what it cannot
  see, and the README's table carries that column.
- **"Something that prints a number beats something that adds a meeting."** The standing rule of v1.
  Checks give the most certain knowledge of lesser things; the judgement they cannot reach is worth
  more. The numbers stay, as refuters.
- **The 88 vendored library skills and the pairing table.** The method now stands on the paper's
  sources. General designer skill packs pair well and are linked as optional.
- `/prove` (now `/examine`), `scaffold/gate.py` (binding moved into `harness/build.py`),
  `scaffold/check_library.py`, the old viewer, the old demo and the September procedure page. All of
  it is at the `v1.0` tag.

### Corrected

- **`contrast` did not do what it said.** Its header and the README said it measured every text node
  "against its actual composited background"; the next line of its own code said it read declared
  colours, and it did. It now composites, source-over, through every background beneath the text and
  any translucent layer above it, skips text behind a modal and disabled controls, and
  `checks/test-fixtures.mjs` tests the claim on every push: a 34% white veil over muted text must fail
  (it now reads 2.77:1), and the same page without the veil must pass.
- **The install instructions named a package that does not exist.** v1 told people to run
  `npx measured-design`; it was never published. The CLI now runs from the repository
  (`node cli/examined.mjs`, or `examined` after `npm link`). Publishing is a separate decision.
- **The backlog said its criteria were "proved by that harness".** They are tested by it.

### Added

- `harness/`: the prototype (`protolib.py`), the build that derives and refuses (`build.py`),
  board renders in light and dark (`render.py`), scope drift (`drift.py`), the viewer with five views
  and a board-only mode for checks and renders, React inlined so the file opens offline, a starter
  design system, and templates for decision rounds, decision logs and stories.
- Skills that follow the paper's loop: frame, structure, draw, audit, measure, decide, ship, then
  outside, reopen, retire, stop; each carries its article's rule.
- Decisions are records with ids: options carry what they buy, cost and kill, **and the best case for
  each**, written before the choice; a settled decision keeps who decided, when, and their own one-line
  explanation of why the others lose. The option the model recommended is recorded, so the take rate
  can be counted. A reopening names the decision it reopens, the objection, the outcome (amend, narrow
  or drop) and why the old answer looked right, and refuses to record without them. Gates take an
  answer with a name and a date.
- Every check now says in its first lines what it cannot see. `structure` and `target-size` read the
  design system's controls from `meta.controls`, and say so when they find no control on any board
  instead of passing without having been able to fail.
- A project can declare screen kinds beyond place, state, detour and entrance (`meta.kinds`).
- The backlog reads a prototype: every sub-task carries its board's required text, quoted exactly with
  "(proto: Board)", so every string a developer builds traces to a board and its decision record.
- The paper, its figures and its source notes, in `docs/paper/`.

## 1.0 — measured-design

*Designing a Product You Can Prove*: a six-stage procedure, a build contract, a gate that refused a
route map that lied, thirteen checks and a baseline, three generator adapters, and a backlog generator.
Tagged `v1.0`.
