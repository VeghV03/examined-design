"""05 · Before the list is read, and when it cannot be.

Name what is being read, never why it failed (article 6). Figures and badges wait for the read;
a failed read keeps the last list, with its time, and offers Try again (article 7). The storage
box says it is checking rather than showing an old number as current.
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, table, skeleton_rows, status, banner, STORE_READING

p = Proto(PROTO)
reading = win('Files', top() + '<div><div class="h1">Files</div></div>' + status('Reading your files…')
              + skeleton_rows(), store=STORE_READING)
p.add_board('FilesReading', 'Files, reading', 'state', reading, place='Files', steps=[['B', 'B1']],
            variantOf='Files', variantWhen='the list has not been read yet',
            entry='Opening Files, before the list comes back. After a short pause; the line changes to '
                  '"Still reading. It\'s taking longer than usual." if it runs long.')
failed = win('Files', top() + banner('bad', 'We couldn\'t read your files just now.',
             'The network answered, but your list didn\'t come back. What you see is how it stood at 09:12.',
             'Try again')
             + '<div><div class="h1">Files</div><p class="lede">4 files · as they stood at 09:12</p></div>' + table())
p.add_board('FilesReadFailed', 'Files, could not be read', 'state', failed, place='Files', steps=[['B', 'B1']],
            variantOf='Files', variantWhen='the list was asked for and did not come back',
            trouble='the list was asked for and did not come back',
            why='Says what was observed and when; names no cause it cannot see.')
p.link('FilesReadFailed', 'Try again', 'Files')
p.save()
