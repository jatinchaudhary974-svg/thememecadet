"""
Knock out only near-black background pixels from the cadet mascot PNGs.
Does NOT alter the mascot artwork itself:
- Only pixels with R,G,B all <= threshold AND currently opaque become transparent.
- Anti-aliased edge pixels (dark but not pure black) get proportional alpha so
  the silhouette stays smooth without any halo.
"""
from PIL import Image
import os

files = [
    "/app/public/cadet-army.png",
    "/app/public/cadet-airforce.png",
    "/app/public/cadet-navy.png",
]

# threshold for "background black"
LO = 12      # <= LO => fully transparent
HI = 45      # between LO and HI => partial transparency (smooth edge)

for path in files:
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            m = max(r, g, b)
            if m <= LO:
                px[x, y] = (r, g, b, 0)
                changed += 1
            elif m <= HI:
                # linear ramp
                t = (m - LO) / (HI - LO)
                px[x, y] = (r, g, b, int(a * t))
    out = path  # overwrite in place
    img.save(out, optimize=True)
    print(f"OK {os.path.basename(path)}  size={w}x{h}  knocked={changed}")
