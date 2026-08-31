#!/usr/bin/env python3
"""
Regenerate the web logo SVGs from the delivered brand package.

The delivered CorelDRAW files are 10000x10000 canvases with the logo centred on
an opaque background plate. For the web we need the same geometry with the plate
removed and the viewBox tightened to the artwork, so the mark can be sized by CSS
without acres of transparent padding.

The path data itself is copied verbatim: nothing is redrawn, recoloured, or
re-kerned. Only the background rect is dropped and the viewBox recomputed.

Usage:  python3 scripts/build-brand-svgs.py
Then:   node scripts/build-brand-assets.mjs   (raster + icon derivatives)
"""

import re, sys, math, os

NUM = re.compile(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?')

def parse_path(d):
    toks = re.findall(r'([MmLlHhVvCcSsQqTtAaZz])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)', d)
    out=[]
    for cmd,num in toks:
        out.append(cmd if cmd else float(num))
    return out

def bezier_pts(p0,p1,p2,p3,n=24):
    pts=[]
    for i in range(n+1):
        t=i/n; mt=1-t
        x=mt**3*p0[0]+3*mt*mt*t*p1[0]+3*mt*t*t*p2[0]+t**3*p3[0]
        y=mt**3*p0[1]+3*mt*mt*t*p1[1]+3*mt*t*t*p2[1]+t**3*p3[1]
        pts.append((x,y))
    return pts

def path_bbox(d):
    toks=parse_path(d)
    i=0; cmd=None; cur=(0.0,0.0); start=(0.0,0.0); prev_c2=None
    xs=[]; ys=[]
    def add(p):
        xs.append(p[0]); ys.append(p[1])
    while i < len(toks):
        t=toks[i]
        if isinstance(t,str):
            cmd=t; i+=1
            if cmd in 'Zz':
                cur=start; continue
        # read args per cmd
        c=cmd
        rel=c.islower()
        C=c.upper()
        def nxt(k):
            nonlocal i
            vals=toks[i:i+k]; i+=k
            return [float(v) for v in vals]
        if C=='M':
            x,y=nxt(2)
            if rel: x+=cur[0]; y+=cur[1]
            cur=(x,y); start=cur; add(cur); cmd='l' if rel else 'L'
        elif C=='L':
            x,y=nxt(2)
            if rel: x+=cur[0]; y+=cur[1]
            cur=(x,y); add(cur)
        elif C=='H':
            x,=nxt(1)
            if rel: x+=cur[0]
            cur=(x,cur[1]); add(cur)
        elif C=='V':
            y,=nxt(1)
            if rel: y+=cur[1]
            cur=(cur[0],y); add(cur)
        elif C=='C':
            x1,y1,x2,y2,x,y=nxt(6)
            if rel:
                x1+=cur[0]; y1+=cur[1]; x2+=cur[0]; y2+=cur[1]; x+=cur[0]; y+=cur[1]
            for p in bezier_pts(cur,(x1,y1),(x2,y2),(x,y)): add(p)
            prev_c2=(x2,y2); cur=(x,y)
        elif C=='S':
            x2,y2,x,y=nxt(4)
            if rel: x2+=cur[0]; y2+=cur[1]; x+=cur[0]; y+=cur[1]
            x1,y1 = (2*cur[0]-prev_c2[0], 2*cur[1]-prev_c2[1]) if prev_c2 else cur
            for p in bezier_pts(cur,(x1,y1),(x2,y2),(x,y)): add(p)
            prev_c2=(x2,y2); cur=(x,y)
        elif C=='Q':
            x1,y1,x,y=nxt(4)
            if rel: x1+=cur[0]; y1+=cur[1]; x+=cur[0]; y+=cur[1]
            c1=(cur[0]+2/3*(x1-cur[0]), cur[1]+2/3*(y1-cur[1]))
            c2=(x+2/3*(x1-x), y+2/3*(y1-y))
            for p in bezier_pts(cur,c1,c2,(x,y)): add(p)
            cur=(x,y)
        elif C=='A':
            rx,ry,rot,laf,sf,x,y=nxt(7)
            if rel: x+=cur[0]; y+=cur[1]
            add((x,y)); cur=(x,y)
        else:
            i+=1
    return min(xs),min(ys),max(xs),max(ys)

def process(src, out, title, pad_ratio=0.0, drop_bg=True):
    s=open(src, encoding='utf-8').read()
    # class -> fill map
    fills = dict(re.findall(r'\.(fil\d+)\s*\{fill:([^}]+)\}', s))
    body_start = s.index('<g id="Layer')
    body = s[body_start:]
    body = body[:body.rindex('</svg>')]
    # collect paths
    items=[]
    for m in re.finditer(r'<path\s+class="(fil\d+)"\s+d="([^"]+)"\s*/>', body):
        items.append((m.group(1), m.group(2)))
    assert items, src
    minx=miny=1e18; maxx=maxy=-1e18
    for cls,d in items:
        a,b,c,dd = path_bbox(d)
        minx=min(minx,a); miny=min(miny,b); maxx=max(maxx,c); maxy=max(maxy,dd)
    w=maxx-minx; h=maxy-miny
    px=w*pad_ratio; py=h*pad_ratio
    vb=(minx-px, miny-py, w+2*px, h+2*py)
    parts=[]
    parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.2f} {vb[1]:.2f} {vb[2]:.2f} {vb[3]:.2f}" fill-rule="evenodd" clip-rule="evenodd" role="img" aria-label="{title}">')
    parts.append(f'<title>{title}</title>')
    for cls,d in items:
        f = fills.get(cls,'#000').strip()
        parts.append(f'<path fill="{f}" d="{d}"/>')
    parts.append('</svg>')
    open(out,'w',encoding='utf-8').write('\n'.join(parts))
    print(f'{os.path.basename(out)}  viewBox={vb[0]:.1f} {vb[1]:.1f} {vb[2]:.1f} {vb[3]:.1f}  ratio={vb[2]/vb[3]:.3f}  size={os.path.getsize(out)}  fills={sorted(set(fills[c] for c,_ in items))}')


if __name__ == "__main__":
    SRC = "brand-source/brand/complete SVG FILES"
    VARIANTS = [
        ("zakah advisory logo on white background.svg", "public/brand/logo-horizontal.svg"),
        ("zakah advisory logo on dark green background.svg", "public/brand/logo-horizontal-inverse.svg"),
        ("zakah advisory logo icon only on white background.svg", "public/brand/logo-icon.svg"),
        ("zakah advisory logo only on dark green background.svg", "public/brand/logo-icon-inverse.svg"),
    ]
    for src, out in VARIANTS:
        process(os.path.join(SRC, src), out, "Zakah Advisor")

    # App icon: the icon-only inverse mark centred on a Deep Evergreen plate,
    # which stays legible in both light and dark browser chrome.
    source = open("public/brand/logo-icon-inverse.svg", encoding="utf-8").read()
    paths = re.findall(r'<path fill="[^"]+" d="[^"]+"/>', source)
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', source).group(1).split()]
    S, PAD = 1024.0, 0.17
    scale = (S * (1 - 2 * PAD)) / max(vb[2], vb[3])
    tx = (S - vb[2] * scale) / 2 - vb[0] * scale
    ty = (S - vb[3] * scale) / 2 - vb[1] * scale
    icon = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"'
        ' fill-rule="evenodd" clip-rule="evenodd" role="img" aria-label="Zakah Advisor">',
        "<title>Zakah Advisor</title>",
        '<rect width="1024" height="1024" rx="180" fill="#003334"/>',
        f'<g transform="translate({tx:.3f} {ty:.3f}) scale({scale:.6f})">',
        *paths,
        "</g>",
        "</svg>",
    ]
    open("src/app/icon.svg", "w", encoding="utf-8").write("\n".join(icon))
    print("icon.svg  1024x1024 on Deep Evergreen")
