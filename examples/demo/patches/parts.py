"""Snippets for writing demo boards in patches. A convenience for typing markup, not a source
of truth: once a patch has run, the board lives in prototype.html, and nothing here
regenerates it. Change a board with a new patch (set_copy, replace_html), not by editing this.
"""

ICON = {
    'files':   '<path d="M3 6h6l2 2h10v11H3z"/>',
    'file':    '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    'removed': '<path d="M4 7h16"/><path d="M6 7v13h12V7"/><path d="M9 4h6"/>',
    'storage': '<rect x="3" y="5" width="18" height="6" rx="1"/><rect x="3" y="13" width="18" height="6" rx="1"/>',
    'shared':  '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19c1-3 3-4 5-4s4 1 5 4M11 19c1-3 3-4 5-4s4 1 5 4"/>',
    'search':  '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    'alert':   '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>',
    'spin':    '<path d="M21 12a9 9 0 1 1-6.2-8.6"/>',
    'plus':    '<path d="M12 5v14M5 12h14"/>',
}


def icon(name, size=16, cls=''):
    c = f' class="{cls}"' if cls else ''
    return (f'<svg{c} width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
            f'{ICON[name]}</svg>')


STORE = ('<div class="store"><div class="t">Your storage</div><div class="n">3.1 GB of 10 GB</div>'
         '<div class="bar"><div style="width:31%"></div></div>'
         '<div class="m">Paid until 14 Mar 2027</div><div class="m">Checked today at 09:12</div></div>')

STORE_READING = ('<div class="store" aria-busy="true"><div class="t">Your storage</div>'
                 '<span class="skel" style="width:70%"></span><div class="bar"><div style="width:0"></div></div>'
                 '<span class="skel" style="width:55%"></span>'
                 '<div class="m" role="status">Checking your storage…</div></div>')


def side(current, store=STORE):
    navs = [('Files', 'files'), ('Shared with me', 'shared'), ('Removed', 'removed'), ('Storage', 'storage')]
    cur = ' aria-current="page"'
    rows = ''.join(f'<span class="nav"{cur if n == current else ""}>{icon(i)}<span>{n}</span></span>'
                   for n, i in navs)
    return f'<aside class="side"><div class="brand">File manager</div><nav class="navs">{rows}</nav>{store}</aside>'


def win(current, main, store=STORE, over=''):
    return ('<div class="win"><div class="titlebar"><span class="tl"></span><span class="tl"></span>'
            f'<span class="tl"></span></div><div class="frame">{side(current, store)}'
            f'<main class="main">{main}</main></div>{over}</div>')


def top(search='Search files', add=True):
    a = f'<span class="btn primary">{icon("plus", 14)}<span>Add</span></span>' if add else ''
    return f'<div class="top"><span class="search">{icon("search", 15)}<span>{search}</span></span>{a}</div>'


HEAD = ('<div class="tr th"><span>Name</span><span>Who can open it</span><span>Size</span>'
        '<span>Changed</span></div>')

FILES = [('notes.md', 'Only you', '12 KB', 'Today'),
         ('budget-2026.xlsx', '<span class="chip">Anna and Ben</span>', '1.1 MB', 'Yesterday'),
         ('photo.jpg', 'Only you', '840 KB', '3 Oct'),
         ('plan.pdf', 'Shared before', '220 KB', '1 Oct')]


def rows(items=FILES):
    return ''.join(f'<div class="tr"><span class="name">{icon("file")}<span>{n}</span></span>'
                   f'<span>{w}</span><span>{s}</span><span class="muted">{c}</span></div>' for n, w, s, c in items)


def table(items=FILES):
    return f'<div class="tbl">{HEAD}{rows(items)}</div>'


def skeleton_rows(n=4):
    r = ('<div class="tr"><span class="skel" style="width:60%"></span><span class="skel" style="width:50%"></span>'
         '<span class="skel" style="width:40%"></span><span class="skel" style="width:45%"></span></div>')
    return f'<div class="tbl" aria-hidden="true">{HEAD}{r * n}</div>'


def status(text, spinning=True):
    s = icon('spin', 15, 'spin') if spinning else ''
    return f'<div class="status" role="status">{s}<span>{text}</span></div>'


def banner(kind, title, message, action=None):
    a = f'<span class="btn outline sm">{action}</span>' if action else ''
    return (f'<div class="banner {kind}" role="status">{icon("alert")}<div style="flex:1"><div class="t">{title}</div>'
            f'<div class="m">{message}</div></div>{a}</div>')


def empty(glyph, title, line, action=None):
    a = f'<span class="btn primary">{action}</span>' if action else ''
    return (f'<div class="empty"><div class="glyph">{icon(glyph, 20)}</div><div class="h1" style="font-size:18px">'
            f'{title}</div><p class="lede">{line}</p>{a}</div>')


def dialog(inner):
    return f'<div class="scrim"></div><div class="dialog" role="dialog">{inner}</div>'
