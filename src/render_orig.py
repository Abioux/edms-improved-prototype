from playwright.sync_api import sync_playwright
A="/home/box/agent-data/agents/1ef4cd03-dd1d-480b-979b-f514772ea011/attachments/"
O="/workspace/edms_prototype/"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    pg=b.new_page(viewport={"width":1280,"height":900})
    pg.route("**/edms.kln.gov.my/**",lambda r:r.abort())
    pg.goto("file://"+A+"612cc2895e41e28242b2aa8dc3bf6cc798ec0bab9a9900e7ffc5afd8529698bd.html",wait_until="load");pg.wait_for_timeout(1500)
    pg.add_style_tag(content=open(O+"fonts.css").read()+open(O+"bootstrap.min.css").read()+"body{font-family:Figtree,sans-serif;background:#f3f4f6}[wire\\:loading]{display:none} nav .hidden,.sm\\:hidden{display:none} svg{max-height:1.25rem;width:auto}.bg-gray-100{background:#f3f4f6}.bg-white{background:#fff}.shadow{box-shadow:0 1px 3px rgba(0,0,0,.1)}")
    for k in ["executive","macro","trade","players"]:
        pg.evaluate("k=>{document.querySelectorAll('.tab-pane').forEach(e=>{e.classList.remove('show','active');e.style.display='none'});const e=document.getElementById('v-pills-'+k);e.classList.add('show','active');e.style.display='block';e.style.opacity=1}",k)
        pg.wait_for_timeout(300);pg.screenshot(path=O+f"orig_{k}.png",full_page=True)
    pg=b.new_page(viewport={"width":1280,"height":900});pg.route("**/edms.kln.gov.my/**",lambda r:r.abort())
    pg.goto("file://"+A+"db66b0462b6b41892d037dea14b37e4d4b363ef37dc0191aca4bbb80817cf870.html");pg.wait_for_timeout(1500);pg.screenshot(path=O+"orig_dashboard.png",full_page=True)
    pg=b.new_page(viewport={"width":1280,"height":900});pg.route("**/edms.kln.gov.my/**",lambda r:r.abort())
    pg.goto("file://"+A+"55cdabc61f53f2e28b53bb113300aa57105acda6ea573eab68dd626468022f9b.html");pg.wait_for_timeout(1500);pg.add_style_tag(content=open(O+"fonts.css").read()+open(O+"bootstrap.min.css").read()+"body{font-family:Figtree,sans-serif;background:#f3f4f6} nav .hidden,.sm\\:hidden{display:none} svg{max-height:1.25rem;width:auto}.bg-white{background:#fff}");pg.screenshot(path=O+"orig_preview.png",full_page=True)
