"""08 · Search: a match, nothing, and nothing so far.

"Nothing matches" is a claim the product may make only after it has looked everywhere it was
asked to. When some folders could not be read, it says "Nothing found so far" and names what it
could not look in (article 3).
"""
from _boot import PROTO
from protolib import Proto
from parts import win, top, table, empty, banner, FILES

p = Proto(PROTO)
res = win('Files', top('plan') + '<div><div class="h1">Results for “plan”</div><p class="lede">We only match names.</p></div>'
          + table([FILES[3]]) + '<span class="btn ghost">Clear search</span>')
p.add_board('SearchResults', 'Search results', 'place', res, steps=[['C', 'C1']], note='What matched a name')
none = win('Files', top('invoice') + empty('search', 'Nothing matches “invoice”',
           'We only match names. If the words are inside a document, we cannot see them.', 'Clear search'))
p.add_board('SearchEmpty', 'Search, nothing matches', 'state', none, place='SearchResults', empty=True,
            steps=[['C', 'C1']], variantOf='SearchResults', variantWhen='every folder was read and nothing matched')
sofar = win('Files', top('invoice') + '<div><div class="h1">Nothing found so far for “invoice”</div></div>'
            + banner('warn', 'Couldn\'t look in 2 folders just now.',
                     'The network answered, but they didn\'t come back.', 'Try again')
            + '<span class="btn ghost">Clear search</span>')
p.add_board('SearchSoFar', 'Search, some folders unread', 'state', sofar, place='SearchResults', steps=[['C', 'C1']],
            variantOf='SearchResults', variantWhen='some folders could not be read',
            trouble='two folders were asked for and did not come back')
p.link('Files', 'Search files', 'SearchResults')
p.link('SearchResults', 'Clear search', 'Files')
p.link('SearchEmpty', 'Clear search', 'Files')
p.link('SearchSoFar', 'Try again', 'SearchResults')
p.link('SearchSoFar', 'Clear search', 'Files')
p.save()
