"""02 · The entrance.

An entrance assumes nothing. The persona opens this every few weeks and has forgotten what it is
for (article 2), so it opens on what is true here rather than on an empty list.
"""
from _boot import PROTO
from protolib import Proto
from parts import icon

p = Proto(PROTO)
html = ('<div class="win"><div class="titlebar"><span class="tl"></span><span class="tl"></span><span class="tl"></span></div>'
        '<div class="frame"><main class="main" style="align-items:center;justify-content:center">'
        '<div class="empty" style="max-width:520px">'
        f'<div class="glyph">{icon("files", 20)}</div>'
        '<div class="h1">A place for your files</div>'
        '<p class="lede">What you add stays for as long as it is paid for. Nothing here is deleted: '
        'removing a file hides it, and the space never comes back. What you share, you cannot take back.</p>'
        '<span class="btn primary">Add your first file</span>'
        '</div></main></div></div>')
p.add_board('Welcome', 'Welcome', 'entrance', html, steps=[['A', 'A1']],
            entry='The first time the app opens on this computer.',
            why='A periodic visitor arrives having forgotten what this is for; the first thing it says is what is true here.')
p.save()
