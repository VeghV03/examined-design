#!/bin/sh
# Rebuild the demo from nothing: every patch, in order. The patches are the record of how the
# prototype was made; running them again must give the same file.
set -e
cd "$(dirname "$0")"
rm -f prototype.html
for f in patches/[0-9][0-9]-*.py; do
  echo "── $f"
  python3 "$f"
done

# The Pages site shows the same file.
cp prototype.html ../../docs/demo.html
