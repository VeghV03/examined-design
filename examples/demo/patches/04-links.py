"""04 · Links, and the sidebar.

A link is [label, target]. The viewer makes the label a hotspot by finding it as text on the
board, and the build refuses if it is not there: a map that lies to QA is worse than none.
Sidebar rows are global links, bound only inside .side on every board.
"""
from _boot import PROTO
from protolib import Proto

p = Proto(PROTO)
p.link('Welcome', 'Add your first file', 'FilesEmpty')
p.link('FilesEmpty', 'Add a file', 'Files')
p.data['globalLinks'] = [['Files', 'Files', '.side']]   # Removed and Storage join when their boards exist
p.save()
