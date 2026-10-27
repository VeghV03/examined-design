---
description: Generate a reviewable Jira backlog from the prototype (epics, stories, sub-tasks with required text, decision spikes)
argument-hint: '[path/to/prototype.html] [--config backlog.config.json]'
---
Turn the prototype into planned work: $ARGUMENTS

Use the `examined-design-backlog` skill. For a project with no prototype, use `jira-backlog` instead.

1. `examined build prototype.html`: it must not refuse. The generator needs `DATA.derived`.
2. If a scope document exists, run `/drift` first and deal with retired words in step titles.
3. If there is no `backlog.config.json`, ask the person for the Jira settings (project key and style,
   issue type names, the blocks link name, labels, required fields) and write it. Do not guess them.
4. Generate: `python3 backlog/build_backlog.py --prototype prototype.html --config backlog.config.json
   --out .`
5. Read `backlog.md` and report: the decisions under "Answer these first" and what each blocks; the
   count of blank "so I can" lines (do not fill them); required text that does not match its board;
   sentences on boards the generator did not carry; blockers that are not real preconditions.
6. Stop there. Importing `jira.csv` or running `--push` creates real tickets. Do it only on the
   person's explicit go-ahead in this conversation, `--push --dry-run` first, never `--yes` on their
   behalf. Credentials come from their environment, never from a file or the chat.
