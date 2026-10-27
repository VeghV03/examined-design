"""07 · Removed, and removing for good.

The place was Trash in the scope. Every trash implies the item is gone and its space comes back;
here neither is true, so the word was the false claim (article 4). The door that removes for good
opens at once with what is known, and keeps its commit off until it has read who can open the
file (article 7).
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, empty, dialog, icon

p = Proto(PROTO)
GONE = [('old-notes.md', '9 KB', 'Removed today'), ('plan-v1.pdf', '220 KB', 'Removed 2 Oct')]
rows = ''.join(f'<div class="tr"><span class="name">{icon("file")}<span>{n}</span></span><span class="muted">{w}</span>'
               f'<span class="btn outline sm">Put back</span><span class="btn ghost sm">Remove for good</span></div>'
               for n, s, w in GONE)
head = '<div class="tr th"><span>Name</span><span>When</span><span></span><span></span></div>'
body = (top('Search Removed', add=False) + '<div><div class="h1">Removed</div><p class="lede">These still use 229 KB of '
        'your storage. Removing them for good will not give it back.</p></div>'
        f'<div class="tbl">{head}{rows}</div><p class="muted small">Nothing in here can be freed. Storage only grows.</p>')
p.add_board('Removed', 'Removed', 'place', win('Removed', body), steps=[['B', 'B3']],
            note='Removed, still stored and still paid for',
            status='checked', statusNote='Renamed from Trash after the implicature check, and so is the step. The scope still says Trash: drift, reported.')
p.add_board('RemovedEmpty', 'Removed, nothing here', 'state',
            win('Removed', top('Search Removed', add=False) + empty('removed', 'Nothing removed',
                'Files you remove wait here, still stored and still paid for, until you put them back.')),
            place='Removed', empty=True, steps=[['B', 'B3']], variantOf='Removed', variantWhen='nothing has been removed')
door = dialog('<p class="small muted" style="margin:0">plan-v1.pdf</p>'
              '<p class="h">plan-v1.pdf leaves Removed. There is no Put back after this.</p>'
              '<div class="wont"><div class="k">This will not</div><ul><li>delete it from the network</li>'
              '<li>give you the 220 KB back</li><li>take back copies anyone already has</li></ul></div>'
              f'<div class="checking" role="status">{icon("spin", 15, "spin")}<span>Checking who can open it…</span></div>'
              '<div class="actions"><span class="btn outline">Cancel</span>'
              '<span class="btn destructive" aria-disabled="true">Remove it for good</span></div>')
p.add_board('RemoveForGoodChecking', 'Remove for good, checking', 'detour', win('Removed', body, over=door),
            place='Removed', steps=[['B', 'B3']], status='new',
            statusNote='The commit stays off until the check is back; Cancel always works.',
            entry='Remove for good on a row in Removed, before the product has read who can open the file.')
p.set_step('B', 'B3', title='Remove a file, or remove it for good')
p.link('Files', 'Remove', 'Removed')
p.link('Removed', 'Remove for good', 'RemoveForGoodChecking')
p.link('RemoveForGoodChecking', 'Cancel', 'Removed')
p.data['globalLinks'].append(['Removed', 'Removed', '.side'])
p.save()
