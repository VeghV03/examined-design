"""00 · An empty prototype.

One file: the design system the boards are drawn with, the data, and the viewer. Nothing to
install to open it, nothing to build to view it. Names the scope it answers to, the board it
opens on, and the components the build should count on every board.
"""
from _boot import PROTO
import protolib
from protolib import Proto

protolib.new(PROTO, 'File manager · demo', system='plain')
p = Proto(PROTO)
p.set_meta(title='File manager · demo', start='Welcome', home='Files',
           source={'label': 'agreed scope (scope.md)', 'short': 'scope', 'url': 'scope.md'},
           checkedLabel='Checked against the network',
           # This design system draws buttons and sidebar rows as spans; the checks that
           # measure controls must be told, or they find none and cannot fail.
           controls='.btn, .nav')
for name, match in [('Button · primary', 'btn primary'), ('Button · outline', 'btn outline'),
                    ('Button · destructive', 'btn destructive'), ('Sidebar row', 'nav'),
                    ('Storage box', 'store'), ('Table row', 'tr'), ('Chip', 'chip'), ('Banner', 'banner'),
                    ('Empty state', 'empty'), ('Dialog', 'dialog'), ('Placeholder', 'skel'),
                    ('Checking line', 'checking'), ('Status line', 'status')]:
    p.add_component(name, match)
# The vocabulary policy: consequence in plain words, mechanism never, except in Advanced.
p.data['policy'] = {
    'terms': [{'word': 'postage batch', 'allow_zones': ['advanced'], 'severity': 'error'},
              {'word': 'chunk', 'allow_zones': ['advanced'], 'severity': 'error'},
              {'word': 'trash', 'allow_zones': [], 'severity': 'error'}],
    'zones': {'advanced': {'screens': ['Storage'], 'selectors': ['.adv']}},
    'scan': {'ignore_selectors': ['code', 'pre', '[data-verbatim]']}}
p.save()
