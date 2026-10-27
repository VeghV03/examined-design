# Move a file into a folder · B/B2

**When** I am in Files and choose Move to folder…, **I want to** move a file into a folder, **so I
can** ⟨blank until someone who knows writes it⟩.

*The "so I can" is blank on purpose. The scope says what the step does, not what the person walks away
with, and a plausible sentence written here would be a requirement nobody decided.*

**What it does.** Moves a file into a folder. Moving into a folder nobody else can open happens at
once, with nothing asked. Moving into a folder other people can open asks first, and says who gains
access, before anything moves.
**What it must never do.** Widen who can open a file without saying so first. Putting a file in front
of the wrong person is the worst thing this product can do (article 1; patch 06).
**Empty.** Not applicable: Move to folder… is on a file row.
**Fails.** ⟨not drawn yet: the move is asked for and does not come back⟩
**Assumes.** Files exists, with Move to folder… on a row (B1).

Prototype: `examples/demo/prototype.html#B2/MoveShare`. Dragging a row onto a shared folder opens the
same question.

## Required text

- **"Move to folder…"** (proto: Files)
- **"Move notes.md to Client work?"** (proto: MoveShare)
- **"Client work is shared with Anna and Ben. Moving notes.md in shares it with them, and with every
  later version."** (proto: MoveShare)
- **"Cancel"** (proto: MoveShare), leaves the file where it was
- **"Move and share"** (proto: MoveShare), the only control that moves the file

`notes.md`, `Client work` and `Anna and Ben` are the example's data; the build fills in the real file,
folder and people.

## Acceptance criteria

- [ ] MoveShare renders with nothing off the frame, a heading, labelled controls, targets of 24px or
      more, and no text under its contrast threshold in either theme. Tested by overflow, structure,
      target-size, contrast.
- [ ] Every link declared from these boards binds to a label on its board. Tested by routes.
- [ ] Every required string above matches its board exactly. Needs a person to compare; no check
      reads story text.
- [ ] Moving into a folder nobody else can open moves at once, with no question. Needs a person.
- [ ] Moving into a shared folder asks first, names the folder and everyone who gains access, before
      anything moves. Needs a person.
- [ ] Cancel leaves the file where it was and shares nothing. Needs a person.
- [ ] No term the vocabulary policy forbids appears outside its zone. Tested by vocab.

A check named here refutes; it never proves. A pass means the board was not refuted on that one
condition. The criteria marked "needs a person" are the ones that matter most, and no check here can
see them.

## Rests on

- W1 (the worst outcome, article 1): a file in front of the wrong person. Drawn into patch 06; not a
  decision record in the demo.
- No open decision blocks this story.

## Ships marked

- Untested with readers: "Move and share"; whether "every later version" is understood (it is true,
  and it is the line most likely to be skimmed).
- Pending: the failure of a move; moving several files at once into a shared folder (not drawn, not
  in the scope).
- Not checked: what happens when the folder's members change while the question is open; keyboard and
  focus order.
