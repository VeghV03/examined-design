"""Regenerate viewer-screen.png and viewer.gif from the demo prototype.

    python3 docs/img/shoot.py

Run it after any change to the demo or the viewer that shows in these views; the images are
claims about the demo, and they go stale like any other copy. Needs Python Playwright and Pillow.
"""
import io
import os

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
PROTO = 'file://' + os.path.abspath(os.path.join(HERE, '..', '..', 'examples', 'demo', 'prototype.html'))
# (fragment, dark) in the order the GIF plays them
FRAMES = [('map', False), ('FilesEmpty', False), ('Removed', False), ('RemoveForGoodChecking', False),
          ('B1/FilesReadFailed', False), ('B1/FilesReadFailed', True), ('open', False), ('product', False)]


def main():
    shots = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': 1440, 'height': 860})
        errors = []
        pg.on('pageerror', lambda e: errors.append(str(e)))
        for i, (frag, dark) in enumerate(FRAMES):
            pg.goto(f'{PROTO}?f={i}#{frag}')
            pg.wait_for_timeout(500)
            if dark:
                pg.keyboard.press('d')
                pg.wait_for_timeout(200)
            shots.append(Image.open(io.BytesIO(pg.screenshot())).convert('RGB'))
        b.close()
    if errors:
        raise SystemExit('page errors: ' + ' | '.join(errors))
    shots[4].save(os.path.join(HERE, 'viewer-screen.png'))
    small = [s.resize((1080, 645), Image.LANCZOS) for s in shots]
    small[0].save(os.path.join(HERE, 'viewer.gif'), save_all=True, append_images=small[1:],
                  duration=1800, loop=0, optimize=True)
    print('wrote viewer-screen.png and viewer.gif')


if __name__ == '__main__':
    main()
