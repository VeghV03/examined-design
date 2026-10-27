"""10 · Storage, with an Advanced zone.

Consequence in plain words, mechanism never, except inside the Advanced zone that the vocabulary
policy allows (the vocab check counts the rest). This place has no empty state: the build reports
it, and that is a number for a person to weigh, not a refusal.
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top

p = Proto(PROTO)
body = (top(add=False) + '<div><div class="h1">Storage</div><p class="lede">3.1 GB of 10 GB used · paid until 14 Mar 2027 · '
        'checked today at 09:12</p></div><div class="bar" style="height:8px"><div style="width:31%"></div></div>'
        '<div class="tbl"><div class="tr th"><span>What uses it</span><span></span><span>Size</span><span></span></div>'
        '<div class="tr"><span>Files</span><span></span><span>2.9 GB</span><span></span></div>'
        '<div class="tr"><span>Earlier versions</span><span></span><span>180 MB</span><span></span></div>'
        '<div class="tr"><span>Removed</span><span></span><span>229 KB</span><span></span></div></div>'
        '<div class="row"><span class="btn primary">Add space</span><span class="btn outline">More time</span></div>'
        '<div class="adv"><p class="muted small">Advanced: postage batch <code>0x8f…c2</code>, depth 22, '
        'about 140 days left at today\'s price.</p></div>')
p.add_board('Storage', 'Storage', 'place', win('Storage', body), steps=[['D', 'D1']], note='What you bought, and until when')
p.data['globalLinks'].append(['Storage', 'Storage', '.side'])
p.save()
