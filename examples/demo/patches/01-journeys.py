"""01 · Journeys and steps, copied verbatim from scope.md.

Copy the scope's structure; never paraphrase it. A developer holding both documents must never
have to build the mapping in their head. Where the prototype and the scope later disagree, the
difference is drift, and it is reported, not silently resolved (examined-design-drift).

The one step nothing serves yet is recorded as a gap, keyed to its step: "not on my list" and
"the scope asks for this and nothing serves it" are different claims.
"""
from _boot import PROTO
from protolib import Proto

p = Proto(PROTO)
p.add_gate('G1', 'Can a share be withdrawn once it has gone out?')
p.add_journey('A', 'First run', 'Arrive with no account and add the first file.')
p.add_step('A', 'A1', 'Arrive with no account', 'Opens the app for the first time.',
           'What this is for, and that nothing added can be deleted from the network.')
p.add_step('A', 'A2', 'Add the first file', 'Adds a file.', 'Where it went, and who can open it: only you.')
p.add_journey('B', 'Manage files', 'See what is here, move, remove and share files.')
p.add_step('B', 'B1', 'See what is here', 'Opens Files.', 'What is here, and when the list was read.')
p.add_step('B', 'B2', 'Move a file into a folder', 'Moves a file.', 'Who gains access before anything moves.')
p.add_step('B', 'B3', 'Remove a file from Trash', 'Removes a file, or removes it for good.',
           'Removing hides; nothing comes back as space.')
p.add_step('B', 'B4', 'Share a file', 'Shares a file with a person.', 'What happened, and what is still true.',
           gates=['G1'])
p.add_step('B', 'B5', 'See the cost before saving', 'Saves a large file.', 'What it will cost, before it costs it.')
p.add_journey('C', 'Find things', 'Search by name.')
p.add_step('C', 'C1', 'Search for a file', 'Searches.', 'What matched, and what could not be looked in.')
p.add_journey('D', 'Manage account', 'Check storage.')
p.add_step('D', 'D1', 'Check storage used', 'Opens Storage.', 'How much is used, until when, and when it was checked.')
p.add_gap('B', 'B5', 'A cost estimate before saving',
          'The scope asks for it and nothing serves it. Decision D1 is open: before saving, or after.')
p.save()
