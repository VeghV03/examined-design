"""Load, edit and save a single-file examined-design prototype.

Every change goes through here, in a small patch script you keep: the script is the record
of what changed and why, and it can be read, reviewed and run again. Edits that replace
text assert how many times the text occurs, because a replace that matches somewhere you
did not expect damages boards silently (a regex bulk-edit across generators once swallowed
closing tags in five files at once).

    python3 harness/protolib.py new prototype.html --title "My product" [--system plain|path.css]
    python3 harness/protolib.py upgrade prototype.html      # newer viewer and runtime, same data

In a patch:

    import sys; sys.path.insert(0, 'harness'); from protolib import Proto
    p = Proto('prototype.html')
    p.add_board('Files', 'Files', 'place', html, steps=[['B', 'B1']], note='Where you land')
    p.link('Files', 'Remove', 'Removed')
    p.save()            # computes DATA.derived and refuses, writing nothing, if the build would

The file has five marked blocks. `system` (your design system) and `data` belong to the
project; `runtime`, `viewer-css` and `viewer` belong to the harness and `upgrade` replaces them.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BLOCKS = ('runtime', 'system', 'viewer-css', 'data', 'viewer')


def _span(s, name):
    a, b = f'<!-- examined:{name} -->', f'<!-- /examined:{name} -->'
    i, j = s.find(a), s.find(b)
    if i < 0 or j < 0:
        raise ValueError(f'block {name!r} not found; is this an examined-design prototype?')
    return i + len(a), j


def _read(*parts):
    with open(os.path.join(HERE, *parts), encoding='utf-8') as f:
        return f.read()


def _data_js(data):
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    return f'\n<script id="data">\nvar DATA = {js};\n</script>\n'


def _harness_blocks():
    runtime = ('\n<script>' + _read('vendor', 'react.production.min.js') + '</script>\n'
               '<script>' + _read('vendor', 'react-dom.production.min.js') + '</script>\n')
    return {'runtime': runtime,
            'viewer-css': '\n<style id="viewer-css">\n' + _read('src', 'viewer.css') + '\n</style>\n',
            'viewer': '\n<script id="viewer">\n' + _read('src', 'viewer.js') + '\n</script>\n'}


def assemble(title, system_css, data):
    hb = _harness_blocks()
    return ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
            f'<title>{title}</title>\n'
            f'<!-- examined:runtime -->{hb["runtime"]}<!-- /examined:runtime -->\n'
            f'<!-- examined:system -->\n<style id="system">\n{system_css}\n</style>\n<!-- /examined:system -->\n'
            f'<!-- examined:viewer-css -->{hb["viewer-css"]}<!-- /examined:viewer-css -->\n'
            '</head><body>\n<div id="root"></div>\n'
            f'<!-- examined:data -->{_data_js(data)}<!-- /examined:data -->\n'
            f'<!-- examined:viewer -->{hb["viewer"]}<!-- /examined:viewer -->\n'
            '</body></html>\n')


def empty_data(title, frame=(1280, 800), source=None):
    return {'meta': {'title': title, 'frame': {'w': frame[0], 'h': frame[1]},
                     'source': source, 'start': None, 'home': None},
            'journeys': [], 'screens': {}, 'links': {}, 'globalLinks': [], 'gates': {},
            'gaps': [], 'decisions': {}, 'components': [], 'policy': {'terms': [], 'zones': {}, 'scan': {}},
            'derived': {}}


def new(path, title, system='plain', frame=(1280, 800), source=None):
    if os.path.exists(path):
        raise FileExistsError(f'{path} exists; refusing to overwrite it')
    css = _read('systems', system + '.css') if not system.endswith('.css') else open(system, encoding='utf-8').read()
    with open(path, 'w', encoding='utf-8') as f:
        f.write(assemble(title, css, empty_data(title, frame, source)))
    return path


def upgrade(path):
    with open(path, encoding='utf-8') as f:
        s = f.read()
    for name, body in _harness_blocks().items():
        a, b = _span(s, name)
        s = s[:a] + body + s[b:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)


class Proto:
    def __init__(self, path):
        self.path = path
        with open(path, encoding='utf-8') as f:
            self.s = f.read()
        a, b = _span(self.s, 'data')
        body = self.s[a:b]
        i = body.find('var DATA')
        j = body.find('{', i)
        self.data, _ = json.JSONDecoder().raw_decode(body, j)

    # ---- writing -------------------------------------------------------------------
    def write(self):
        a, b = _span(self.s, 'data')
        self.s = self.s[:a] + _data_js(self.data) + self.s[b:]
        with open(self.path, 'w', encoding='utf-8') as f:
            f.write(self.s)

    def save(self):
        """Compute DATA.derived and write. Refuses, writing nothing, if the build refuses."""
        import build
        derived, errors, reports = build.compute(self.data)
        print('\n'.join(build.summary_lines(derived, errors, reports)))
        if errors:
            raise SystemExit(f'build refused: {self.path} not written')
        self.data['derived'] = derived
        self.write()

    # ---- reading -------------------------------------------------------------------
    @property
    def screens(self):
        return self.data['screens']

    def board(self, name):
        if name not in self.screens:
            raise KeyError(f'no board named {name!r}')
        return self.screens[name]

    # ---- boards --------------------------------------------------------------------
    def add_board(self, name, title, kind, html, after=None, links=(), **fields):
        """Add a board. `kind` is place, state, detour or entrance; a state or detour names
        its `place`. Other fields: steps=[[journey, step]], entry, gesture, variantOf,
        variantWhen, trouble, empty, note, under, why, decisions=[ids], status, statusNote."""
        if name in self.screens:
            raise ValueError(f'board {name!r} already exists')
        b = {'title': title, 'kind': kind, 'html': html}
        b.update(fields)
        out = {}
        for k, v in self.screens.items():
            out[k] = v
            if k == after:
                out[name] = b
        if name not in out:
            out[name] = b
        self.data['screens'] = out
        if links:
            self.data['links'][name] = [list(r) for r in links]
        return b

    def remove_board(self, name):
        self.board(name)
        del self.screens[name]
        self.data['links'].pop(name, None)
        for k in list(self.data['links']):
            self.data['links'][k] = [r for r in self.data['links'][k] if r[1] != name]

    def set(self, name, **fields):
        b = self.board(name)
        for k, v in fields.items():
            if v is None:
                b.pop(k, None)
            else:
                b[k] = v

    def replace_html(self, name, html):
        self.board(name)['html'] = html

    def set_copy(self, name, old, new, count=1):
        """Replace exact text in a board's markup, asserting it occurs `count` times."""
        b = self.board(name)
        n = b['html'].count(old)
        if n != count:
            raise AssertionError(f'{name}: expected {count} of {old!r}, found {n}')
        b['html'] = b['html'].replace(old, new)

    # ---- links ---------------------------------------------------------------------
    def link(self, name, label, target):
        self.board(name)
        rules = self.data['links'].setdefault(name, [])
        if [label, target] not in rules:
            rules.append([label, target])

    def unlink(self, name, label):
        rules = self.data['links'].get(name, [])
        n = len(rules)
        self.data['links'][name] = [r for r in rules if r[0] != label]
        if len(self.data['links'][name]) == n:
            raise AssertionError(f'{name}: no link labelled {label!r}')

    # ---- structure -----------------------------------------------------------------
    def set_meta(self, **kw):
        self.data['meta'].update(kw)

    def add_journey(self, jid, name, end='', gates=(), in_scope=True):
        if any(j['id'] == jid for j in self.data['journeys']):
            raise ValueError(f'journey {jid!r} already exists')
        j = {'id': jid, 'name': name, 'end': end, 'gates': list(gates), 'steps': []}
        if not in_scope:
            j['inScope'] = False
        self.data['journeys'].append(j)
        return j

    def add_step(self, jid, sid, title, does='', clear='', gates=()):
        j = next((x for x in self.data['journeys'] if x['id'] == jid), None)
        if j is None:
            raise KeyError(f'no journey {jid!r}')
        if any(s['id'] == sid for s in j['steps']):
            raise ValueError(f'step {jid}/{sid} already exists')
        st = {'id': sid, 'title': title, 'does': does, 'clear': clear, 'gates': list(gates)}
        j['steps'].append(st)
        return st

    def set_step(self, jid, sid, **fields):
        j = next((x for x in self.data['journeys'] if x['id'] == jid), None)
        st = next((s for s in (j or {}).get('steps', []) if s['id'] == sid), None)
        if st is None:
            raise KeyError(f'no step {jid}/{sid}')
        st.update(fields)
        return st

    def add_gap(self, jid, sid, title, why):
        self.data['gaps'].append({'journey': jid, 'step': sid, 'title': title, 'why': why})

    def remove_gap(self, title):
        n = len(self.data['gaps'])
        self.data['gaps'] = [g for g in self.data['gaps'] if g['title'] != title]
        if len(self.data['gaps']) == n:
            raise AssertionError(f'no gap titled {title!r}')

    def add_gate(self, gid, question, draft=False):
        self.data['gates'][gid] = {'question': question, 'draft': draft}

    def answer_gate(self, gid, answer, by, date):
        """Record a gate's answer, with who gave it and when. The gate stays in the register."""
        g = self.data['gates'][gid]
        g.update({'answer': answer, 'by': by, 'date': date, 'draft': False})

    def add_component(self, name, match):
        """A component is counted on every element carrying all the classes in `match`."""
        self.data['components'].append({'name': name, 'match': match})

    # ---- decisions -----------------------------------------------------------------
    def decide(self, did, question, options, context='', right_if='', screens=(), chosen=None,
               by=None, date=None, round=None, recommended=None, explained=None,
               reopens=None, objection=None, outcome=None, error_theory=None):
        """Record a decision. Each option: {label, buys, costs, kills, case_for}. `case_for`
        is the best case for that option, written before the choice (see templates/round.md).

        `recommended` is the label the model marked, so the take rate can be counted later.
        `explained` is the decider's explain-back; give it whenever `chosen` is given.
        `reopens` names the decision this one reopens, which is marked reopened and kept as
        history; `objection`, `outcome` (amend, narrow or drop) and `error_theory` (why the old
        answer looked right) go with it."""
        if did in self.data['decisions']:
            raise ValueError(f'decision {did!r} already exists')
        labels = [o['label'] for o in options]
        for name, v in (('chosen', chosen), ('recommended', recommended)):
            if v is not None and v not in labels:
                raise ValueError(f'{did}: {name} {v!r} is not one of the options')
        rec = {'question': question, 'context': context, 'options': list(options),
               'chosen': chosen, 'right_if': right_if, 'screens': list(screens),
               'status': 'settled' if chosen is not None else 'open', 'by': by, 'date': date, 'round': round}
        for k, v in (('recommended', recommended), ('explained', explained), ('reopens', reopens),
                     ('objection', objection), ('outcome', outcome), ('error_theory', error_theory)):
            if v is not None:
                rec[k] = v
        if reopens is not None:
            old = self.data['decisions'].get(reopens)
            if old is None:
                raise KeyError(f'{did} reopens {reopens!r}, which is not a decision')
            if not (objection and outcome and error_theory):
                raise ValueError(f'{did}: a reopening names its objection, its outcome and why the old answer looked right')
            if outcome not in ('amend', 'narrow', 'drop'):
                raise ValueError(f'{did}: outcome is amend, narrow or drop, not {outcome!r}')
            old.update({'status': 'reopened', 'reopenedBy': did})
        self.data['decisions'][did] = rec

    def settle(self, did, chosen, by, date, explained=None, right_if=None):
        """Settle an open decision. `explained` is the decider's own one-line explanation of
        why the other options lose (explain-back), kept with the record."""
        d = self.data['decisions'][did]
        if chosen not in [o['label'] for o in d['options']]:
            raise ValueError(f'{did}: {chosen!r} is not one of the options')
        d.update({'chosen': chosen, 'status': 'settled', 'by': by, 'date': date})
        if explained:
            d['explained'] = explained
        if right_if:
            d['right_if'] = right_if

if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) >= 2 and a[0] == 'new':
        title = a[a.index('--title') + 1] if '--title' in a else 'Prototype'
        system = a[a.index('--system') + 1] if '--system' in a else 'plain'
        print(new(a[1], title, system))
    elif len(a) == 2 and a[0] == 'upgrade':
        upgrade(a[1])
        print(f'upgraded {a[1]}')
    else:
        print(__doc__)
        sys.exit(2)
