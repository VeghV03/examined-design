"""12 · What the checks found.

The first run of the checks reported 15 boards with no heading element (the boards drew their
titles as styled divs, which a screen reader cannot navigate by) and three lines of prose wider
than 40em. Both are findings about these boards, not about the checks, so they are fixed here,
one exact replacement at a time, each asserting how many times it occurs.
"""
import re
from _boot import PROTO
from protolib import Proto

p = Proto(PROTO)
# The pattern only finds the headings; each one is then changed by its exact text, once.
HEAD = re.compile(r'<div class="h1"([^>]*)>(.*?)</div>')
for name, b in p.screens.items():
    for attrs, text in HEAD.findall(b['html']):
        p.set_copy(name, f'<div class="h1"{attrs}>{text}</div>', f'<h1 class="h1"{attrs}>{text}</h1>')
for name in ('Removed', 'RemoveForGoodChecking'):
    p.set_copy(name, '<p class="muted small">Nothing in here can be freed.',
               '<p class="lede small">Nothing in here can be freed.')
p.set_copy('Storage', '<div class="adv"><p class="muted small">', '<div class="adv"><p class="lede small">')
p.save()
