#!/usr/bin/env python3
"""examined-design prototype → the shared plan.

Everything the plan needs is already in the prototype's DATA, so nothing here invents it:

    journeys        the epics, and the ordered steps inside them
    derived.steps   which boards serve each step (computed by harness/build.py)
    links           what leads to what, and the label that does it
    screens         kind, place, variantOf, trouble (the failure clause), empty, why
    gaps            a step the scope asks for that nothing serves
    decisions       the open questions, the case for each option, and what they hold up

Each sub-task carries its board's required text — headings, banner titles, status lines and
link labels, quoted exactly and pointed at the board ("proto: Name") — so every string a
developer builds traces to a board, and the board's decision record names who decided it.

The one thing it does not answer is the "so I can" of a job story. Rather than writing a
plausible sentence nobody decided, the slot is left blank and counted.
"""
import json
import re
import sys
from pathlib import Path

HARNESS = Path(__file__).resolve().parent.parent / 'harness'
sys.path.insert(0, str(HARNESS))
import build as harness_build  # noqa: E402
from protolib import Proto  # noqa: E402


def kebab(name):
    """Board names are CamelCase; plan ids are lowercase and hyphenated."""
    out = ''
    for i, c in enumerate(name):
        if c.isupper() and i and (not name[i - 1].isupper() or (i + 1 < len(name) and name[i + 1].islower())):
            out += '-'
        out += c.lower()
    return out.replace('_', '-').replace(' ', '-')


def _inside(el, cls):
    n = el.parent
    while n is not None:
        if cls in n.classes:
            return True
        n = n.parent
    return False


def _matchers(sel):
    """`meta.controls` as matchers: simple selectors only, a tag or .classes ("button", ".btn")."""
    out = []
    for part in (sel or '').split(','):
        part = part.strip()
        if part and all(c.isalnum() or c in '.-_' for c in part):
            tag, *cls = part.split('.')
            out.append((tag or None, set(cls)))
    return out


def _required(board, links, controls=(), chrome=()):
    """Exact strings on the board that a build must ship: headings, status lines, banner titles
    and messages, what a dialog says (its heading, its consequence lines, what it will not do),
    the line under an empty state, every link label, and the label of every control the design
    system declares in meta.controls, live or disabled, except inside the shared chrome that
    global links bind in (the sidebar is one story, not a line on every board). File names and other data inside a
    dialog are marked muted and left out: they are examples, not copy."""
    t = harness_build.parse(board.get('html', ''))
    want = []
    for el in t.all:
        txt = el.text().strip()
        if not txt:
            continue
        if el.tag in ('h1', 'h2', 'h3') or 'h' in el.classes or 'status' in el.classes or 'checking' in el.classes \
                or (('t' in el.classes or 'm' in el.classes) and _inside(el, 'banner')) \
                or (el.tag in ('p', 'li') and _inside(el, 'dialog') and 'muted' not in el.classes) \
                or ('k' in el.classes and _inside(el, 'dialog')) \
                or (el.tag == 'p' and 'lede' in el.classes and _inside(el, 'empty')) \
                or (any((t is None or el.tag == t) and c <= set(el.classes) for t, c in controls)
                    and not any(_inside(el, c) for c in chrome)):
            want.append(txt)
    for label, _ in links:
        want.append(label)
    seen, out = set(), []
    for w in want:
        if w not in seen:
            seen.add(w)
            out.append(w)
    return out


def build(path, title=None) -> dict:
    d = Proto(str(path)).data
    if not d.get('derived'):
        raise SystemExit(f'{path} has no derived fields — run harness/build.py on it first.')
    S, L, J = d['screens'], d.get('links', {}), d.get('journeys', [])
    steps_d = d['derived']['steps']
    decisions = d.get('decisions', {})
    gaps = {(g['journey'], g['step']): g for g in d.get('gaps', [])}
    policy = d.get('policy', {})
    controls = _matchers(d.get('meta', {}).get('controls'))
    chrome = {r[2].lstrip('.') for r in d.get('globalLinks', []) if len(r) > 2 and r[2].startswith('.')}

    owner, order = {}, []
    for j in J:
        for st in j['steps']:
            sid = f"{j['id']}/{st['id']}".lower()
            order.append((j, st, sid))
            for scr in steps_d.get(f"{j['id']}|{st['id']}", {}).get('screens', []):
                owner.setdefault(scr, sid)

    inbound = {}
    for src, rules in L.items():
        for label, to in rules:
            inbound.setdefault(to, []).append((src, label))

    epics = [{'id': j['id'].lower(), 'name': j['name'],
              'intent': j.get('end') or ('Steps: ' + ', '.join(s['title'] for s in j['steps']) + '.'),
              'labels': [j['id']]} for j in J]

    stories = []
    for j, st, sid in order:
        scr_ids = list(steps_d.get(f"{j['id']}|{st['id']}", {}).get('screens', []))
        primary = scr_ids[0] if scr_ids else None
        gap = gaps.get((j['id'], st['id']))
        stories.append({
            'id': sid, 'epic': j['id'].lower(), 'name': st['title'],
            'job': _job(st, primary, inbound, S),
            'body': gap['why'] if gap else ' '.join(x for x in (st.get('clear') and f"The product makes clear: {st['clear']}",
                                                                  primary and S[primary].get('why')) if x),
            'criteria': _criteria(scr_ids, S, policy, gap, d['derived']),
            'subtasks': [_subtask(s, S, L, controls, chrome) for s in scr_ids if owner.get(s) == sid],
            'blocked_by': [],
            'notes': [f"{S[s]['title']}: {S[s].get('statusNote', '')}" for s in scr_ids if S[s].get('status') in ('redraw', 'note')],
            'labels': [j['id']],
            'nothing_serves': bool(gap) or not scr_ids,
        })
    by_id = {s['id']: s for s in stories}
    _block(stories, by_id, S, owner, J)
    return {'version': 1, 'title': title or d.get('meta', {}).get('title') or 'Backlog',
            'epics': epics, 'stories': stories, 'spikes': _spikes(decisions, owner)}


def _job(st, primary, inbound, S):
    when = ''
    if primary:
        for src, label in inbound.get(primary, []):
            when = f"I am in {S[src]['title']} and choose {label}"
            break
        if not when and S[primary].get('variantOf'):
            v = S[primary]['variantOf']
            when = f"{S[v]['title']} shows that {S[primary].get('variantWhen', 'something changed')}"
        if not when and S[primary].get('entry'):
            when = S[primary]['entry'][0].lower() + S[primary]['entry'][1:].rstrip('.')
    want = st['title'][0].lower() + st['title'][1:]
    return {'when': when, 'want': want, 'so': ''}


def _subtask(scr, S, L, controls=(), chrome=()):
    s = S[scr]
    req = _required(s, L.get(scr, []), controls, chrome)
    body = s.get('trouble') and f"A failure state: {s['trouble']}." or s.get('why', '')
    if req:
        body = (body + ' ' if body else '') + f"Required text (proto: {scr}): " + ' · '.join(f'"{r}"' for r in req) + '.'
    return {'id': kebab(scr), 'board': scr, 'name': s['title'], 'body': body, 'labels': [s.get('kind', '')]}


def _criteria(scr_ids, S, policy, gap, derived):
    out = []
    if scr_ids:
        names = ', '.join(S[s]['title'] for s in scr_ids)
        out.append({'text': f"{names} {'renders' if len(scr_ids) == 1 else 'render'} with nothing off the frame, a heading, "
                            "labelled controls, targets at or over the minimum, and no text under its contrast "
                            "threshold in either theme",
                    'check': 'overflow, structure, target-size, contrast'})
        out.append({'text': 'every link declared from these boards binds to a label on the board', 'check': 'routes'})
        out.append({'text': 'every required string in the sub-tasks appears in the build exactly as quoted'})
    if gap:
        out.append({'text': 'something serves this step: a board exists, is linked to, and is in the prototype'})
    places = {p['id']: p for p in derived.get('places', [])}
    for s in scr_ids:
        b = S[s]
        if b.get('trouble'):
            out.append({'text': f"{b['title']} says what did not happen and what is still true, and names no cause it cannot know"})
        if b.get('empty'):
            out.append({'text': f"{b['title']} says what this place is for and the one action that fills it"})
        if b.get('kind') == 'place' and places.get(s, {}).get('noEmpty'):
            out.append({'text': f"{b['title']} has an empty state: an empty place is the most common screen it will show"})
    if policy.get('terms') and scr_ids:
        out.append({'text': 'no term the vocabulary policy forbids appears outside the zone that allows it', 'check': 'vocab'})
    return out


def _block(stories, by_id, S, owner, J):
    """Only what cannot start: a state or detour before its place, and every journey's first
    step before the entrance."""
    for s in stories:
        deps = set()
        for t in s['subtasks']:
            p = S.get(t['board'], {}).get('place')
            if p and owner.get(p) and owner[p] != s['id']:
                deps.add(owner[p])
        s['blocked_by'] = sorted(deps)
    entrance = next((n for n, b in S.items() if b.get('kind') == 'entrance'), None)
    es = owner.get(entrance)
    if es:
        for j in J:
            if j['steps']:
                first = f"{j['id']}/{j['steps'][0]['id']}".lower()
                if first != es and first in by_id:
                    by_id[first]['blocked_by'] = sorted(set(by_id[first]['blocked_by']) | {es})


def _spikes(decisions, owner):
    """An open decision is work with an owner, and until it is settled both options are live,
    so it blocks what it touches. Each option keeps the case written for it."""
    out = []
    for k, d in decisions.items():
        if d.get('status') != 'open':
            continue
        blocks = sorted({owner[s] for s in d.get('screens', []) if s in owner})
        epic = blocks[0].split('/')[0] if blocks else None
        out.append({**({'epic': epic} if epic else {}),
                    'id': 'decision-' + re.sub(r'[^a-z0-9]+', '-', k.lower()).strip('-'), 'name': 'Decide: ' + d['question'][0].lower() + d['question'][1:],
                    'question': d['question'], 'context': d.get('context', ''), 'options': d.get('options', []),
                    'right_if': d.get('right_if', ''), 'blocks': blocks, 'labels': ['decision']})
    return out
