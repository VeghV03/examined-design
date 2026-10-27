"""09 · Two failure states.

A screen is a failure state when something was refused, timed out, ran out or cannot be done
here. Each says what did not happen and what is still true; neither guesses a cause.
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, table, banner

p = Proto(PROTO)
share = win('Files', top() + banner('bad', 'Sharing budget-2026.xlsx with Chidi didn\'t finish.',
            'Nobody new can open it. Anna and Ben still can.', 'Try again')
            + '<div><div class="h1">Files</div><p class="lede">4 files · read just now</p></div>' + table())
p.add_board('ShareFailed', 'Share did not go out', 'state', share, place='Files', steps=[['B', 'B4']],
            variantOf='Files', variantWhen='a share was asked for and did not come back',
            trouble='a share was asked for and did not come back')
sync = win('Files', top() + banner('bad', 'Changes on this computer haven\'t reached your other devices.',
           'Your copy here is untouched.', 'Retry')
           + '<div><div class="h1">Files</div><p class="lede">4 files · read just now</p></div>' + table())
p.add_board('SyncFailed', 'Sync did not finish', 'state', sync, place='Files', steps=[['B', 'B1']],
            variantOf='Files', variantWhen='changes made here have not reached the other devices',
            trouble='changes made here have not reached the other devices')
p.link('ShareFailed', 'Try again', 'Files')
p.link('SyncFailed', 'Retry', 'Files')
p.save()
