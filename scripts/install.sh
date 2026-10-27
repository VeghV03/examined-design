#!/usr/bin/env sh
# Install the examined-design skills for whichever agent you run.
#
#   sh scripts/install.sh claude
#   sh scripts/install.sh codex
#   sh scripts/install.sh any /path/to/skills
#
# Links every skill in skills/ (the loop, the harness contract, drift, backlog and the
# standalone jira-backlog) into the agent's skill folder. Sixteen skills, small enough for
# agents that pre-load every skill name into their prompt.
set -e
TARGET="$1"
SRC="$(cd "$(dirname "$0")/.." && pwd)/skills"
case "$TARGET" in
  claude) DEST="$HOME/.claude/skills" ;;
  codex)  DEST="$HOME/.agents/skills" ;;
  any)    DEST="$2" ;;
  *) echo "usage: install.sh claude|codex|any <dir>"; exit 1 ;;
esac
[ -n "$DEST" ] || { echo "usage: install.sh any <dir>"; exit 1; }
mkdir -p "$DEST"
for d in "$SRC"/*/; do
  ln -sfn "${d%/}" "$DEST/$(basename "${d%/}")"
done
echo "linked into $DEST"
ls "$DEST" | wc -l | sed 's/$/ skills available/'
