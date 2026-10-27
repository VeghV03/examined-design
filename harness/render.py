"""Render boards to PNG, alone and at full size, in light and dark: for looking at every board
you touched before calling a change done, and for figures.

    python3 harness/render.py prototype.html [Board ...] [--dark] [--both] [--out renders/] [--scale 2]

With no board names, renders every board. Needs Python Playwright and a Chromium:
    pip install playwright && python3 -m playwright install chromium
"""
import os
import sys


def render(path, names=None, themes=('light',), out='renders', scale=2):
    from playwright.sync_api import sync_playwright
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import protolib
    p = protolib.Proto(path)
    names = names or list(p.screens)
    frame = p.data['meta'].get('frame') or {'w': 1280, 'h': 800}
    os.makedirs(out, exist_ok=True)
    url = 'file://' + os.path.abspath(path)
    done = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': frame['w'], 'height': frame['h']}, device_scale_factor=scale)
        errors = []
        pg.on('pageerror', lambda e: errors.append(str(e)))
        for theme in themes:
            for n in names:
                pg.goto(f'{url}#board={n}' + ('&theme=dark' if theme == 'dark' else ''))
                pg.reload()
                pg.wait_for_selector('#board')
                pg.wait_for_timeout(150)
                f = os.path.join(out, f'{n}{"-dark" if theme == "dark" else ""}.png')
                pg.locator('#board').screenshot(path=f)
                done.append(f)
        b.close()
    if errors:
        print('page errors:', ' | '.join(errors))
    return done


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0].startswith('-'):
        print(__doc__)
        sys.exit(2)
    out, scale, themes, names = 'renders', 2, ('light',), []
    i = 1
    while i < len(a):
        x = a[i]
        if x == '--out':
            out, i = a[i + 1], i + 2
        elif x == '--scale':
            scale, i = float(a[i + 1]), i + 2
        elif x == '--both':
            themes, i = ('light', 'dark'), i + 1
        elif x == '--dark':
            themes, i = ('dark',), i + 1
        else:
            names, i = names + [x], i + 1
    for f in render(a[0], names or None, themes, out, scale):
        print(f)
