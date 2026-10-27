# File manager · demo

`FILES` · company-managed

Generated. Read it before importing — the import is the irreversible half.

4 epics · 9 stories · 15 sub-tasks · 1 spike · 6 blocked · 1 with nothing serving it · 9 still need their "so I can"

## Answer these first

Each one blocks work that is already written. Both options are live until somebody chooses.

### Does the cost estimate appear before saving, or after?

The scope asks for an estimate before saving (B5); nothing serves it yet.

- **Before saving** — buys nobody is surprised by a charge; costs the estimate is computed on a file that is not saved yet; kills the one-click save. *The case for it:* An irreversible spend should never rest on a number the person has not seen.
- **After saving, before publishing** — buys an exact number instead of an estimate; costs the person has already committed; kills the promise that nothing happens until you choose. *The case for it:* An exact figure is honest where an estimate may be wrong, and a wrong estimate shown before saving is a claim the product cannot stand behind.

*Before wins if arrivals are price-sensitive rather than already committed.*

Blocks: See what is here

## First run

Arrive with no account and add the first file.

### Arrive with no account  ·  M

When the first time the app opens on this computer, I want to arrive with no account, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: What this is for, and that nothing added can be deleted from the network. A periodic visitor arrives having forgotten what this is for; the first thing it says is what is true here.

Acceptance criteria
- Welcome renders with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: M — 1 sub-task, 4 criteria, 0 blockers. A count, not an estimate.

- Welcome — A periodic visitor arrives having forgotten what this is for; the first thing it says is what is true here. Required text (proto: Welcome): "A place for your files" · "What you add stays for as long as it is paid for. Nothing here is deleted: removing a file hides it, and the space never comes back. What you share, you cannot take back." · "Add your first file".

### Add the first file  ·  M  ·  blocked

When I am in Welcome and choose Add your first file, I want to add the first file, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: Where it went, and who can open it: only you.

Acceptance criteria
- Files, nothing here yet renders with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Files, nothing here yet says what this place is for and the one action that fills it
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: M — 1 sub-task, 5 criteria, 1 blocker. A count, not an estimate.

Waits for: See what is here (S-b-b1)

- Files, nothing here yet — Required text (proto: FilesEmpty): "Add" · "Nothing here yet" · "Files you add appear here. Only you can open them until you share one." · "Add a file".

## Manage files

See what is here, move, remove and share files.

### See what is here  ·  L  ·  blocked

When I am in Files, nothing here yet and choose Add a file, I want to see what is here, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: What is here, and when the list was read. The files are the memory a periodic visitor comes back for, so the list is the place.

Acceptance criteria
- Files, Files, reading, Files, could not be read, Sync did not finish render with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Files, could not be read says what did not happen and what is still true, and names no cause it cannot know
- Sync did not finish says what did not happen and what is still true, and names no cause it cannot know
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: L — 4 sub-tasks, 6 criteria, 2 blockers. A count, not an estimate.

Waits for: Decide: does the cost estimate appear before saving, or after? (K-decision-d1), Arrive with no account (S-a-a1)

- Files — The files are the memory a periodic visitor comes back for, so the list is the place. Required text (proto: Files): "Add" · "Files" · "Move to folder…" · "Remove" · "Search files".
- Files, reading — Required text (proto: FilesReading): "Add" · "Files" · "Reading your files…".
- Files, could not be read — A failure state: the list was asked for and did not come back. Required text (proto: FilesReadFailed): "Add" · "We couldn't read your files just now." · "The network answered, but your list didn't come back. What you see is how it stood at 09:12." · "Try again" · "Files".
- Sync did not finish — A failure state: changes made here have not reached the other devices. Required text (proto: SyncFailed): "Add" · "Changes on this computer haven't reached your other devices." · "Your copy here is untouched." · "Retry" · "Files".

### Move a file into a folder  ·  M  ·  blocked

When I am in Files and choose Move to folder…, I want to move a file into a folder, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: Who gains access before anything moves. Every other way of moving is silent; this one widens who can open the file, so it asks.

Acceptance criteria
- Moving into a shared folder renders with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: M — 1 sub-task, 4 criteria, 1 blocker. A count, not an estimate.

Waits for: See what is here (S-b-b1)

- Moving into a shared folder — Every other way of moving is silent; this one widens who can open the file, so it asks. Required text (proto: MoveShare): "Add" · "Files" · "Move notes.md to Client work?" · "Client work is shared with Anna and Ben. Moving notes.md in shares it with them, and with every later version." · "Cancel" · "Move and share".

### Remove a file, or remove it for good  ·  L

When I am in Files and choose Remove, I want to remove a file, or remove it for good, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: Removing hides; nothing comes back as space.

Acceptance criteria
- Removed, Removed, nothing here, Remove for good, checking render with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Removed, nothing here says what this place is for and the one action that fills it
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: L — 3 sub-tasks, 5 criteria, 0 blockers. A count, not an estimate.

- Removed — Required text (proto: Removed): "Removed" · "Put back" · "Remove for good".
- Removed, nothing here — Required text (proto: RemovedEmpty): "Nothing removed" · "Files you remove wait here, still stored and still paid for, until you put them back.".
- Remove for good, checking — Required text (proto: RemoveForGoodChecking): "Removed" · "Put back" · "Remove for good" · "plan-v1.pdf leaves Removed. There is no Put back after this." · "This will not" · "delete it from the network" · "give you the 220 KB back" · "take back copies anyone already has" · "Checking who can open it…" · "Cancel" · "Remove it for good".

### Share a file  ·  M  ·  blocked

When Files shows that a share was asked for and did not come back, I want to share a file, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: What happened, and what is still true.

Acceptance criteria
- Share did not go out renders with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Share did not go out says what did not happen and what is still true, and names no cause it cannot know
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: M — 1 sub-task, 5 criteria, 1 blocker. A count, not an estimate.

Waits for: See what is here (S-b-b1)

- Share did not go out — A failure state: a share was asked for and did not come back. Required text (proto: ShareFailed): "Add" · "Sharing budget-2026.xlsx with Chidi didn't finish." · "Nobody new can open it. Anna and Ben still can." · "Try again" · "Files".

### See the cost before saving  ·  S  ·  nothing serves this yet

I want to see the cost before saving, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The scope asks for it and nothing serves it. Decision D1 is open: before saving, or after.

Nothing serves this yet. The scope asks for it and no screen was designed for it; the design work is part of this story.

Acceptance criteria
- something serves this step: a board exists, is linked to, and is in the prototype

Size hint: S — 0 sub-tasks, 1 criterion, 0 blockers. A count, not an estimate.

## Find things

Search by name.

### Search for a file  ·  L  ·  blocked

When I am in Files and choose Search files, I want to search for a file, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: What matched, and what could not be looked in.

Acceptance criteria
- Search results, Search, nothing matches, Search, some folders unread render with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Search, nothing matches says what this place is for and the one action that fills it
- Search, some folders unread says what did not happen and what is still true, and names no cause it cannot know
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: L — 3 sub-tasks, 6 criteria, 1 blocker. A count, not an estimate.

Waits for: Arrive with no account (S-a-a1)

- Search results — Required text (proto: SearchResults): "Add" · "Results for “plan”" · "Clear search".
- Search, nothing matches — Required text (proto: SearchEmpty): "Add" · "Nothing matches “invoice”" · "We only match names. If the words are inside a document, we cannot see them." · "Clear search".
- Search, some folders unread — A failure state: two folders were asked for and did not come back. Required text (proto: SearchSoFar): "Add" · "Nothing found so far for “invoice”" · "Couldn't look in 2 folders just now." · "The network answered, but they didn't come back." · "Try again" · "Clear search".

## Manage account

Check storage.

### Check storage used  ·  M  ·  blocked

I want to check storage used, so I can ⟨outcome — one line, from whoever knows why this step exists⟩.

The product makes clear: How much is used, until when, and when it was checked.

Acceptance criteria
- Storage renders with nothing off the frame, a heading, labelled controls, targets at or over the minimum, and no text under its contrast threshold in either theme  [overflow, structure, target-size, contrast]
- every link declared from these boards binds to a label on the board  [routes]
- every required string in the sub-tasks appears in the build exactly as quoted
- Storage has an empty state: an empty place is the most common screen it will show
- no term the vocabulary policy forbids appears outside the zone that allows it  [vocab]

Criteria marked with a check in brackets are tested by that check. A pass means not refuted on that condition, not that the criterion holds; the rest needs a person to look. Run the checks before closing this.

Size hint: M — 1 sub-task, 5 criteria, 1 blocker. A count, not an estimate.

Waits for: Arrive with no account (S-a-a1)

- Storage — Required text (proto: Storage): "Storage" · "Add space" · "More time".
