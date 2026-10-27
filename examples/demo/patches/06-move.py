"""06 · Moving into a shared folder.

The worst thing this product can do is put a file in front of the wrong person (article 1), and
moving into a shared folder shares. So the move asks first, and says who gains access, before
anything moves. Moves that change nothing stay silent.
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, table, dialog

p = Proto(PROTO)
move = win('Files', top() + '<div><div class="h1">Files</div><p class="lede">4 files · read just now</p></div>'
           + table(), over=dialog(
           '<p class="h">Move notes.md to Client work?</p>'
           '<p class="lede">Client work is shared with Anna and Ben. Moving notes.md in shares it with them, '
           'and with every later version.</p>'
           '<div class="actions"><span class="btn outline">Cancel</span><span class="btn primary">Move and share</span></div>'))
p.add_board('MoveShare', 'Moving into a shared folder', 'detour', move, place='Files', steps=[['B', 'B2']],
            entry='Move to folder… on a file, then a folder other people can open. Dragging a row onto the folder opens it too.',
            why='Every other way of moving is silent; this one widens who can open the file, so it asks.')
p.link('Files', 'Move to folder…', 'MoveShare')
p.link('MoveShare', 'Cancel', 'Files')
p.link('MoveShare', 'Move and share', 'Files')
p.save()
