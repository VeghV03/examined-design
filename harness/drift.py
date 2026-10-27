#!/usr/bin/env python3
"""Compare the agreed scope document with the prototype.

    python3 harness/drift.py scope.md prototype.html

Where the two disagree, the audited prototype dictates: the output is a list of edits to the
scope document, not to the prototype. Otherwise every audit finding is optional.

A near-match is worse than a miss. A miss means the step is not in the scope; a near-match
means somebody paraphrased, and two names now exist for one thing. And a word the product
has retired (one the vocabulary policy forbids everywhere) still standing in the scope is a
claim the scope makes that the product no longer does.

Markdown, HTML and plain text are handled. If the scope lives in Confluence, Notion or a
ticket system, save it as a file first: you want a fixed thing to compare against next month.
"""
import difflib
import html
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from protolib import Proto  # noqa: E402


def plain(path):
    t = open(path, encoding='utf-8').read()
    if path.lower().endswith(('.html', '.htm')):
        t = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', t, flags=re.S | re.I)
        t = html.unescape(re.sub(r'<[^>]+>', '\n', t))
    return t


def norm(s):
    return re.sub(r'\s+', ' ', re.sub(r'^[#\-*\s]+', '', s)).strip().lower()


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2
    scope, proto = argv[1], argv[2]
    d = Proto(proto).data
    text = plain(scope)
    lines = [l for l in (norm(x) for x in text.splitlines()) if l]
    blob = ' \n '.join(lines)
    J = d.get('journeys', [])
    steps = [(j, st) for j in J for st in j['steps']]
    dsteps = (d.get('derived') or {}).get('steps', {})
    gapkeys = {(g['journey'], g['step']) for g in d.get('gaps', [])}

    verbatim, near, missing = [], [], []
    for j, st in steps:
        name = norm(st['title'])
        if name in blob:
            verbatim.append(name)
            continue
        close = difflib.get_close_matches(name, lines, n=1, cutoff=0.72)
        (near if close else missing).append((f"{j['id']}/{st['id']}", st['title'], close[0] if close else None))
    unserved = [(j['id'], st['id']) for j, st in steps if not dsteps.get(f"{j['id']}|{st['id']}", {}).get('screens')]
    orphans = [n for n, s in d['screens'].items() if not s.get('steps')]
    retired = []
    for t in (d.get('policy') or {}).get('terms', []):
        if t.get('allow_zones'):
            continue
        for k, raw in enumerate(text.splitlines()):
            if re.search(r'\b' + re.escape(t['word']) + r'\b', raw, re.I):
                retired.append((t['word'], k + 1, raw.strip()))

    print(f'scope: {scope} · prototype: {proto}')
    print(f'  steps in the scope, verbatim in journeys  {len(verbatim):>3} / {len(steps)}')
    print(f'  near-matches (somebody paraphrased)       {len(near):>3}')
    print(f'  steps not in the scope at all             {len(missing):>3}')
    print(f'  steps nothing serves                      {len(unserved):>3}  ({len(gapkeys)} recorded as gaps)')
    print(f'  boards serving no step                    {len(orphans):>3}')
    print(f'  retired words still in the scope          {len(retired):>3}')
    if near:
        print('\nnear-matches — two names now exist for one thing:')
        for sid, name, match in near:
            print(f'  {sid}: prototype says "{name}", scope says "{match}"')
    if missing:
        print('\nnot in the scope — bring the scope level, or drop the step:')
        for sid, name, _ in missing:
            print(f'  {sid}: "{name}"')
    if unserved:
        print('\nnothing serves these — the honest scope gap:')
        for jid, sid in unserved:
            print(f"  {jid}/{sid}{'  (recorded as a gap)' if (jid, sid) in gapkeys else '  (NOT recorded as a gap)'}")
    if orphans:
        print('\nboards serving no step — an audit produced them; flag them as claims the scope has not seen:')
        for n in orphans:
            print(f'  {n}')
    if retired:
        print('\nwords the product retired, still in the scope — edit the scope:')
        for w, k, raw in retired:
            print(f'  line {k}: "{w}" in "{raw}"')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
