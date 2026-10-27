"""11 · Decisions, with the case for every option.

A recommended option works like a default, and a model's recommendation can echo the leaning in
your own question (article 10). So each option carries the best case for it, written before the
choice. The option the model recommended is recorded, so how often it was taken can be counted;
and a settled decision keeps the decider's own one-line explanation (explain-back).
The round that settled D2, and left D1 open, is in rounds/round-01.md.
"""
from _boot import PROTO
from protolib import Proto
from parts import icon

p = Proto(PROTO)
p.decide('D1', 'Does the cost estimate appear before saving, or after?',
         context='The scope asks for an estimate before saving (B5); nothing serves it yet.',
         options=[{'label': 'Before saving', 'buys': 'nobody is surprised by a charge',
                   'costs': 'the estimate is computed on a file that is not saved yet', 'kills': 'the one-click save',
                   'case_for': 'An irreversible spend should never rest on a number the person has not seen.'},
                  {'label': 'After saving, before publishing', 'buys': 'an exact number instead of an estimate',
                   'costs': 'the person has already committed', 'kills': 'the promise that nothing happens until you choose',
                   'case_for': 'An exact figure is honest where an estimate may be wrong, and a wrong estimate '
                               'shown before saving is a claim the product cannot stand behind.'}],
         right_if='Before wins if arrivals are price-sensitive rather than already committed.', screens=['Files'],
         round='rounds/round-01.md', recommended='Before saving')
p.decide('D2', 'Does search include removed files?',
         context='Search was designed after Removed existed; the two were not built together.',
         options=[{'label': 'Include, marked as removed', 'buys': 'a file someone half-remembers removing is findable',
                   'costs': 'every result needs a removed marker', 'kills': 'a result list that is only files',
                   'case_for': 'Removing hides; it does not delete, so search should not pretend it did.'},
                  {'label': 'Exclude removed files', 'buys': 'search only returns things you can use now',
                   'costs': 'a removed file is invisible twice over', 'kills': 'finding a file removed an hour ago',
                   'case_for': 'People remove things to get them out of the way, including out of search. A result '
                               'list full of things you put aside is a list you stop trusting.'}],
         right_if='Include wins if removal is read as "out of the way" rather than "gone".', screens=['SearchResults'],
         round='rounds/round-01.md', recommended='Include, marked as removed')
p.settle('D2', 'Include, marked as removed', by='A. Example (product owner)', date='2026-10-27',
         explained='Exclusion would make removing behave like deleting, which is the claim Removed was renamed to stop making.')
# Settling D2 changes a board: the removed plan-v1.pdf now matches "plan" too, marked as removed.
removed_row = (f'<div class="tr"><span class="name">{icon("file")}<span>plan-v1.pdf</span>'
               '<span class="chip">Removed</span></span><span>Only you</span><span>220 KB</span>'
               '<span class="muted">Removed 2 Oct</span></div>')
p.set_copy('SearchResults', '<span class="muted">1 Oct</span></div></div>',
           '<span class="muted">1 Oct</span></div>' + removed_row + '</div>')
p.set_copy('SearchResults', '<p class="lede">We only match names.</p>',
           '<p class="lede">We only match names. Removed files are included, and marked.</p>')
p.decide('D3', 'What is the place for removed files called?',
         options=[{'label': 'Trash', 'buys': 'a word everyone knows', 'costs': 'implies gone and space back; neither is true',
                   'kills': 'nothing', 'case_for': 'Convention: people already know where to look.'},
                  {'label': 'Removed', 'buys': 'the button and the place agree; nothing false is implied',
                   'costs': 'one unfamiliar word', 'kills': 'the familiar metaphor',
                   'case_for': 'It is the past tense of the button, and it promises nothing the product cannot keep.'}],
         chosen='Removed', by='A. Example (product owner)', date='2026-10-20',
         explained='Trash promises that the space comes back, and here it never does.',
         right_if='Right while the storage genuinely cannot be reclaimed.', screens=['Removed'])
p.set('SearchResults', decisions=['D2'])
p.set('Files', decisions=['D1'])
p.set('Removed', decisions=['D3'])
p.save()
