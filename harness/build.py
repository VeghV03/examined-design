"""Compute DATA.derived from the hand-kept fields, and refuse when the prototype lies.

    python3 harness/build.py prototype.html            compute, report, write DATA.derived
    python3 harness/build.py prototype.html --check    compute and report, write nothing

Refuses (exit 1), because a map that lies to the people reading it is worse than none:
  - a link label that is not text on its own board (the viewer binds hotspots by text, so
    an unbound label is a button that does not exist);
  - any id that does not resolve: a link target, a variantOf, a place, a journey step, a
    gate, a decision, a gap's step;
  - a screen with no kind (place, state, detour, entrance, or one declared in meta.kinds), or a
    state or detour that names no place.

Reports, without refusing: places with no empty state, screens with no way in, steps that
nothing serves and no gap records, settled decisions with no explain-back, open decisions,
failure states. A report is a number for
a person to weigh, not a verdict.
"""
import json
import re
import sys
from html.parser import HTMLParser

KINDS = ('place', 'state', 'detour', 'entrance')
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param',
        'source', 'track', 'wbr'}
SKIP_TEXT = {'style', 'script'}
DECISION_ID = re.compile(r'^[A-Za-z][\w.-]*$')


class _Node:
    __slots__ = ('tag', 'classes', 'children', 'parts', 'parent')

    def __init__(self, tag, classes, parent):
        self.tag, self.classes, self.parent = tag, classes, parent
        self.children, self.parts = [], []   # parts: text strings and child nodes, in order

    def text(self):
        out = []
        for p in self.parts:
            out.append(p if isinstance(p, str) else p.text())
        return ''.join(out)


class _Tree(HTMLParser):
    """A small DOM: enough to compute each element's textContent and class list."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = _Node('#root', (), None)
        self.cur = self.root
        self.all = []

    def handle_starttag(self, tag, attrs):
        cls = tuple((dict(attrs).get('class') or '').split())
        n = _Node(tag, cls, self.cur)
        self.cur.children.append(n)
        self.cur.parts.append(n)
        self.all.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        cls = tuple((dict(attrs).get('class') or '').split())
        n = _Node(tag, cls, self.cur)
        self.cur.children.append(n)
        self.cur.parts.append(n)
        self.all.append(n)

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        if self.cur.tag not in SKIP_TEXT:
            self.cur.parts.append(data)


def parse(html):
    t = _Tree()
    t.feed(html or '')
    t.close()
    return t


def binds(tree, label):
    """How many elements the viewer would bind for this label: the deepest elements whose
    trimmed text is the label (an element whose child carries the same text yields to it)."""
    n = 0
    for el in tree.all:
        if el.text().strip() != label:
            continue
        if any(c.text().strip() == label for c in el.children):
            continue
        n += 1
    return n


def compute(data):
    """Return (derived, errors, reports)."""
    S = data.get('screens', {})
    L = data.get('links', {})
    J = data.get('journeys', [])
    gates = data.get('gates', {})
    decisions = data.get('decisions', {})
    gaps = data.get('gaps', [])
    comps = data.get('components', [])
    errors, reports = [], []
    # The four kinds are one product's; a project may declare more. The build knows the
    # obligations of the four (a place owes an empty state, a state names its place) and none
    # of the others, which it only counts.
    kinds = KINDS + tuple(k for k in data.get('meta', {}).get('kinds', []) if k not in KINDS)

    step_ix = {}
    for j in J:
        for g in j.get('gates', []):
            if g not in gates:
                errors.append(f'journey {j["id"]}: gate {g} is not in gates')
        for st in j.get('steps', []):
            step_ix[(j['id'], st['id'])] = (j, st)
            for g in st.get('gates', []):
                if g not in gates:
                    errors.append(f'step {j["id"]}/{st["id"]}: gate {g} is not in gates')

    trees = {n: parse(s.get('html', '')) for n, s in S.items()}
    ds = {n: {'in': [], 'out': [], 'made': [], 'find': {}} for n in S}

    # screens: kinds, places, variants, steps, decisions
    for n, s in S.items():
        k = s.get('kind')
        if k not in kinds:
            errors.append(f'{n}: kind is {k!r}, must be one of {", ".join(kinds)} (declare others in meta.kinds)')
        if k in ('state', 'detour'):
            p = s.get('place')
            if not p:
                errors.append(f'{n}: a {k} must name its place')
            elif p not in S or S[p].get('kind') != 'place':
                errors.append(f'{n}: place {p!r} is not a screen of kind place')
        if s.get('under') and (s['under'] not in S or S[s['under']].get('kind') != 'place'):
            errors.append(f'{n}: under {s["under"]!r} is not a place')
        v = s.get('variantOf')
        if v and v not in S:
            errors.append(f'{n}: variantOf {v!r} is not a screen')
        for pr in s.get('steps', []):
            if tuple(pr) not in step_ix:
                errors.append(f'{n}: step {pr[0]}/{pr[1]} is not in journeys')
        for d in s.get('decisions', []):
            if d not in decisions and DECISION_ID.match(d):
                errors.append(f'{n}: decision {d!r} is not in decisions')

    # links: targets resolve, labels bind
    bound = 0
    for n, rules in L.items():
        if n not in S:
            errors.append(f'links: {n!r} is not a screen')
            continue
        for label, target in rules:
            if target not in S:
                errors.append(f'{n}: link "{label}" goes to {target!r}, which is not a screen')
                continue
            if binds(trees[n], label) == 0:
                errors.append(f'{n}: link "{label}" is not text on the board')
                continue
            bound += 1
            ds[n]['out'].append([label, target])
            if target != n and n not in ds[target]['in']:
                ds[target]['in'].append(n)
    for r in data.get('globalLinks', []):
        if r[1] not in S:
            errors.append(f'globalLinks: "{r[0]}" goes to {r[1]!r}, which is not a screen')

    for g in gaps:
        if (g.get('journey'), g.get('step')) not in step_ix:
            errors.append(f'gap "{g.get("title")}": step {g.get("journey")}/{g.get("step")} is not in journeys')

    for k, d in decisions.items():
        for n in d.get('screens', []):
            if n not in S:
                errors.append(f'decision {k}: screen {n!r} does not exist')
        if d.get('status') not in ('open', 'settled', 'reopened'):
            errors.append(f'decision {k}: status is {d.get("status")!r}, must be open, settled or reopened')
        if d.get('status') == 'settled' and d.get('chosen') is None:
            errors.append(f'decision {k}: settled but nothing chosen')
        for f in ('reopens', 'reopenedBy'):
            if d.get(f) and d[f] not in decisions:
                errors.append(f'decision {k}: {f} {d[f]!r} is not a decision')
        if d.get('status') == 'settled' and not d.get('explained'):
            reports.append(f'decision {k} is settled with no explain-back')

    # components: an element matches when it carries every class in `match`
    comp_use = {c['name']: [] for c in comps}
    for n, t in trees.items():
        made = []
        for c in comps:
            need = set(c['match'].split())
            cnt = sum(1 for el in t.all if need.issubset(el.classes))
            if cnt:
                made.append([c['name'], cnt])
                comp_use[c['name']].append(n)
        ds[n]['made'] = made
    for n in S:
        ds[n]['made'] = sorted(([m[0], m[1], len(comp_use[m[0]])] for m in ds[n]['made']), key=lambda m: -m[1])

    # steps: which screens and gaps sit under each
    steps = {}
    for (jid, sid), (j, st) in step_ix.items():
        key = f'{jid}|{sid}'
        steps[key] = {'screens': [n for n, s in S.items() if [jid, sid] in [list(p) for p in s.get('steps', [])]],
                      'gaps': [{'title': g['title'], 'why': g.get('why', '')} for g in gaps
                               if g.get('journey') == jid and g.get('step') == sid]}

    # search index
    for n, s in S.items():
        st_txt, scope_txt = [], []
        for pr in s.get('steps', []):
            if tuple(pr) in step_ix:
                j, st = step_ix[tuple(pr)]
                st_txt.append(f'{j["id"]} {j["name"]} {st["id"]} {st["title"]}')
                scope_txt.append(f'{st.get("does", "")} {st.get("clear", "")}')
        rat = []
        for d in s.get('decisions', []):
            rec = decisions.get(d)
            rat.append(f'{rec.get("question", "")} {rec.get("right_if", "")}' if rec else d)
        ds[n]['find'] = {'name': f'{n} {s.get("title", "")}', 'step': ' '.join(st_txt),
                         'scope': ' '.join(scope_txt),
                         'why': ' '.join(x for x in (s.get('why'), s.get('entry'), s.get('statusNote')) if x),
                         'rationale': ' '.join(rat)}

    counts = {k: sum(1 for s in S.values() if s.get('kind') == k) for k in kinds}
    n_trouble = sum(1 for s in S.values() if s.get('trouble'))

    # gates: which steps name or inherit each, and how many screens stand on it
    register = []
    for g, q in gates.items():
        on, keys = [], set()
        for j in J:
            for st in j.get('steps', []):
                named = g in st.get('gates', [])
                if named or g in j.get('gates', []):
                    on.append({'j': j['id'], 's': st['id'], 'named': named})
                    keys.add((j['id'], st['id']))
        n_scr = sum(1 for s in S.values() if any(tuple(p) in keys for p in s.get('steps', [])))
        qd = q if isinstance(q, dict) else {'question': q}
        register.append({'gate': g, 'question': qd.get('question', ''), 'draft': bool(qd.get('draft')),
                         'steps': on, 'nScreens': n_scr, 'answer': qd.get('answer'),
                         'by': qd.get('by'), 'date': qd.get('date')})

    places = []
    for n, s in S.items():
        if s.get('kind') != 'place':
            continue
        states = [[m, S[m].get('title', m), S[m].get('variantWhen', '')] for m, t in S.items()
                  if t.get('kind') == 'state' and t.get('place') == n]
        detours = [[m, S[m].get('title', m), ''] for m, t in S.items()
                   if t.get('kind') == 'detour' and t.get('place') == n]
        no_empty = not any(S[m].get('empty') for m, _, _ in states) and not s.get('empty')
        places.append({'id': n, 'title': s.get('title', n), 'note': s.get('note', ''), 'under': s.get('under'),
                       'states': states, 'detours': detours, 'noEmpty': no_empty})
        if no_empty:
            reports.append(f'place {n} has no empty state')
    entrances = [[n, s.get('title', n), s.get('entry', '')] for n, s in S.items() if s.get('kind') == 'entrance']

    via_global = {r[1] for r in data.get('globalLinks', [])}
    for n, s in S.items():
        if (not ds[n]['in'] and n not in via_global and not s.get('entry') and not s.get('variantOf')
                and s.get('kind') != 'entrance'):
            reports.append(f'{n} has no way in')
    for key, v in steps.items():
        if not v['screens'] and not v['gaps']:
            reports.append(f'step {key.replace("|", "/")}: nothing serves it and no gap records that')
    open_dec = [k for k, d in decisions.items() if d.get('status') == 'open']

    derived = {'screens': ds, 'steps': steps, 'counts': counts, 'nTrouble': n_trouble,
               'register': register,
               'components': sorted(({'name': k, 'n': len(v), 'screens': v} for k, v in comp_use.items() if v),
                                    key=lambda c: -c['n']),
               'places': places, 'entrances': entrances,
               'summary': {'screens': len(S), 'links': bound, 'openDecisions': open_dec,
                           'trouble': n_trouble, 'gaps': len(gaps)}}
    return derived, errors, reports


def summary_lines(derived, errors, reports):
    sm = derived['summary']
    c = derived['counts']
    out = [f'{sm["screens"]} screens · {c["place"]} places, {c["state"]} states, {c["detour"]} detours, '
           f'{c["entrance"]} entrances · {sm["links"]} links bound · {sm["trouble"]} failure states · '
           f'{sm["gaps"]} gaps']
    if sm['openDecisions']:
        out.append(f'{len(sm["openDecisions"])} decisions open: {", ".join(sm["openDecisions"])}')
    for r in reports:
        out.append(f'  report  {r}')
    for e in errors:
        out.append(f'  REFUSE  {e}')
    out.append(f'{len(errors)} refusals · {len(reports)} reports')
    return out


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    sys.path.insert(0, __file__.rsplit('/', 1)[0])
    import protolib
    p = protolib.Proto(argv[1])
    derived, errors, reports = compute(p.data)
    print('\n'.join(summary_lines(derived, errors, reports)))
    if errors:
        print('build refused: nothing written')
        return 1
    if '--check' not in argv:
        p.data['derived'] = derived
        p.write()
        print(f'wrote {argv[1]}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
