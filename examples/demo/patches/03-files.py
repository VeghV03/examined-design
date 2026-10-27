"""03 · Files, and its empty state.

A place obliges an empty state (article 3): every account starts there, and it is the screen
nobody draws. The empty state says the list was read and found empty; a list not yet read is a
different state (patch 05).
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, table, empty

p = Proto(PROTO)
files = win('Files', top() + '<div><div class="h1">Files</div><p class="lede">4 files · read just now</p></div>'
        + table() + '<div class="row"><span class="btn outline">Move to folder…</span>'
        '<span class="btn destructive">Remove</span></div>')
p.add_board('Files', 'Files', 'place', files, steps=[['B', 'B1']], note='Where you land after the first visit',
            why='The files are the memory a periodic visitor comes back for, so the list is the place.')
none = win('Files', top() + empty('files', 'Nothing here yet',
           'Files you add appear here. Only you can open them until you share one.', 'Add a file'))
p.add_board('FilesEmpty', 'Files, nothing here yet', 'state', none, place='Files', empty=True,
            steps=[['A', 'A2']], variantOf='Files', variantWhen='the list was read and holds nothing')
p.save()
