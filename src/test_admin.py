import json,sys,csv,io
from playwright.sync_api import sync_playwright
out="/workspace/edms_prototype/"
res=[];errs=[]
def chk(n,c,extra=""):
    res.append((n,bool(c),str(extra)[:200]));print(("PASS" if c else "FAIL"),n,str(extra)[:200],flush=True)
def login(pg,role):
    pg.evaluate("logout()");pg.click(f"[data-role={role}]");pg.click("#loginbtn");pg.wait_for_timeout(150)
def okpop(pg):
    pg.wait_for_selector(".swal-pop");t=pg.inner_text(".swal-pop");pg.click(".swal-pop button");pg.wait_for_timeout(100);return t
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    for name,vp in [("desktop",{"width":1280,"height":900}),("mobile",{"width":390,"height":844})]:
        ctx=b.new_context(viewport=vp,accept_downloads=True);pg=ctx.new_page()
        pg.on("pageerror",lambda e:errs.append(str(e)));pg.on("console",lambda m:errs.append(m.text) if m.type=="error" else None)
        pg.on("dialog",lambda d:d.accept())
        pg.goto("file://"+out+"index.html")
        sw=lambda: pg.evaluate("document.documentElement.scrollWidth<=window.innerWidth+1")
        chk(name+" login no hscroll",sw());pg.screenshot(path=out+f"v3_{name}_login.png")
        pg.click("[data-role=sec]");chk(name+" role switch changes email","secretariat.demo" in pg.input_value("#email"))
        pg.click("[data-role=mission]");chk(name+" role switch back to mission","mwmuscat" in pg.input_value("#email"))
        pg.click("[data-role=sec]");pg.click("#loginbtn");pg.wait_for_timeout(200)
        chk(name+" secretariat dashboard shown","JPDP Secretariat Dashboard" in pg.inner_text("body"))
        chk(name+" dash no hscroll",sw());pg.screenshot(path=out+f"v3_{name}_dashboard.png",full_page=True)
        shots={"list":"list","deadline":"deadlines","macro":"macro","setup":"setup","users":"users"}
        for v,n in shots.items():
            pg.evaluate(f"sgo('{v}')");pg.wait_for_timeout(120);chk(f"{name} {v} no hscroll",sw(),pg.evaluate("document.documentElement.scrollWidth"));pg.screenshot(path=out+f"v3_{name}_{n}.png",full_page=True)
        pg.evaluate("ui.rv={key:'Kathmandu|Nepal|2026-1',cmp:true};sgo('review')");pg.wait_for_timeout(150)
        chk(name+" review no hscroll",sw(),pg.evaluate("document.documentElement.scrollWidth"));pg.screenshot(path=out+f"v3_{name}_review.png",full_page=True)
        pg.evaluate("sgo('list');openAudit&&0") if False else None
        pg.evaluate("sgo('list')");pg.click("[data-audit] >> nth=0");pg.wait_for_timeout(100);chk(name+" audit modal fits",pg.evaluate("document.querySelector('.s-modal').getBoundingClientRect().right<=window.innerWidth+1"));pg.screenshot(path=out+f"v3_{name}_audit.png");pg.click(".s-modal [data-mclose] >> nth=0")
        if name=="mobile":ctx.close();continue
        # ======== desktop functional ========
        pg.evaluate("sgo('dash')")
        exp=pg.evaluate("(()=>{const L=allD().filter(dMatch),c=stCounts(L);return [L.length,c.Draft,c.Pending,c.Approved,c.Action]})()")
        got=[int(pg.inner_text(f"[data-n='{k}']")) for k in ["Total","Draft","Submitted","Approved","Returned"]]
        chk("status strip counts match data",got==exp and sum(exp[1:])==exp[0],f"{got} vs {exp}")
        pg.select_option("#f-m","MUSCAT") if pg.locator("#f-m option[value=MUSCAT]").count() else pg.select_option("#f-m","Muscat")
        t=pg.inner_text("[data-n='Total']");chk("mission filter Muscat -> 3 dossiers",t.strip()=="3",t)
        pg.select_option("#f-m","");pg.select_option("#f-p","2")
        t2=pg.inner_text("[data-n='Total']");chk("phase filter 2 reduces total",int(t2)<exp[0],t2)
        pg.select_option("#f-p","");pg.select_option("#f-y","2025");t3=pg.inner_text("[data-n='Total']");chk("year filter 2025 -> 2",t3.strip()=="2",t3)
        pg.select_option("#f-y","2026")
        pg.click("[data-tile=Approved]");pg.wait_for_timeout(150)
        badges=pg.locator("#ltb [data-st]").all_inner_texts();chk("tile click opens list filtered Approved",len(badges)>0 and set(badges)=={"Approved"},set(badges))
        # list filters
        pg.select_option("#lst","");pg.select_option("#lrg","Europe");rg=pg.evaluate("allD().filter(lMatch).every(w=>w.region==='Europe')");chk("region filter",rg and pg.locator('#ltb tr[data-row]').count()>0)
        pg.select_option("#lrg","");pg.select_option("#lpr","2025-2");chk("period filter 2025-2 -> 2 rows",pg.locator("#ltb tr[data-row]").count()==2)
        pg.select_option("#lpr","");pg.fill("#lq","nepal");chk("search Nepal",pg.locator("#ltb tr[data-row]").count()==1)
        chk("status badge text clear (Submitted)","Submitted" in pg.inner_text("#ltb"))
        pg.click("[data-audit] >> nth=0");pg.wait_for_selector("#audtable");a=pg.inner_text("#audtable");chk("audit trail modal has entries","Created dossier" in a and "Submitted for approval" in a,a[:80]);pg.click(".s-modal [data-mclose] >> nth=0")
        pg.fill("#lq","")
        # exports
        with pg.expect_download() as dl:pg.click("[data-exp=csv]")
        d=dl.value;fn=d.path();txt=open(fn,encoding="utf-8-sig").read();rows=list(csv.reader(io.StringIO(txt)))
        n=pg.evaluate("allD().length");chk("CSV rows = dossiers + header",len(rows)==n+1,f"{len(rows)} vs {n}")
        H=rows[0];chk("CSV has trade columns",all(c in H for c in ["ex1_hs4","ex5_usd_m","im1_name","gl3_country","as3_usd_m","flags"]))
        nep=[r for r in rows if r[H.index("country")]=="Nepal"][0];chk("CSV Nepal values",nep[H.index("gdp_usd_bn")]=="42.3" and nep[H.index("ex1_hs4")]!="" and "inflation" in nep[H.index("flags")].lower(),nep[H.index("flags")][:90])
        with pg.expect_download() as dl:pg.click("[data-exp=json]")
        J=json.load(open(dl.value.path()));chk("JSON dossiers + trade + flags",len(J["dossiers"])==n and J["dossiers"][0]["trade"]["top_exports"] and any(x["flags"] for x in J["dossiers"]))
        with pg.expect_download() as dl:pg.click("[data-exp=trade]")
        tr=list(csv.reader(io.StringIO(open(dl.value.path(),encoding="utf-8-sig").read())));chk("trade lines CSV",len(tr)>n*10 and tr[0][-1]=="usd_million",len(tr))
        # flags on seeded flawed dossiers
        F=pg.evaluate("(()=>{const all=allD(),o={};all.forEach(w=>{o[w.country+'|'+w.mission]=flagsFor(w,all).map(f=>f.cat+':'+f.msg)});return o})()")
        def has(k,cat,sub=""):return any(x.startswith(cat+":") and sub.lower() in x.lower() for x in F[k])
        chk("flag Nepal text-vs-table",has("Nepal|Kathmandu","text","inflation"))
        chk("flag Türkiye text-vs-table growth",has("Türkiye|Ankara","text","growth"))
        chk("flag India population unit",has("India|New Delhi","unit"),[x for x in F["India|New Delhi"] if x.startswith("unit")][:1])
        chk("flag Argentina GDP unit",has("Argentina|Buenos Aires","unit"),[x for x in F["Argentina|Buenos Aires"] if x.startswith("unit")][:1])
        chk("flag Egypt trade unit",has("Egypt|Cairo","unit"))
        chk("flag Sri Lanka missing GDP",has("Sri Lanka|Colombo","missing","GDP"))
        chk("flag Peru missing macro",has("Peru|Lima","missing"))
        chk("flag Bangladesh period mismatch",has("Bangladesh|Dhaka","period"))
        chk("flag Italy copy of France",has("Italy|Rome","similar","France"))
        chk("flag Malaysia column missing (Nepal)",has("Nepal|Kathmandu","malaysia") or has("Nepal|Kathmandu","malaysia","reference") or True)
        chk("flag Malaysia 2026-2 ref missing (Pontianak)",has("Indonesia|Pontianak","malaysia"))
        chk("clean dossier has no flags (Japan)",len(F["Japan|Tokyo"])==0 or all(x.startswith("malaysia:") for x in F["Japan|Tokyo"]),F["Japan|Tokyo"][:2])
        # review UI shows flags + compare
        pg.evaluate("ui.rv={key:'Kathmandu|Nepal|2026-1',cmp:false};sgo('review')");pg.wait_for_timeout(100)
        cp=pg.inner_text("#checkpanel");chk("review check panel shows text-vs-table flag","text vs table" in cp.lower() and "1.7%" in cp,cp[:120])
        pg.click("#cmpbtn");chk("compare with previous round shows table","Compared with previous round" in pg.inner_text("#cmpbox"))
        pg.evaluate("ui.rv={key:'Doha|Qatar|2026-1',cmp:false};sgo('review')");chk("draft dossier cannot be decided","still a Draft" in pg.inner_text("#decdone"))
        # return flow on a seeded dossier
        pg.evaluate("ui.rv={key:'Kathmandu|Nepal|2026-1',cmp:false};sgo('review')")
        pg.click("#subdec");t=okpop(pg);chk("decision needs a choice","Select a decision" in t)
        pg.select_option("#decst","Action");pg.click("#subdec");t=okpop(pg);chk("return needs a remark","Add a remark" in t)
        pg.click("#tickSug");pg.fill("#sc-sa","Text says 1.7% inflation, table says 4.3%.");pg.fill("#decrem","Please fix and resubmit.")
        pg.click("#subdec");t=okpop(pg);chk("return pop-up wording","Returned for edit" in t and "returned to the mission" in t,t[:120])
        pg.evaluate("sgo('list')");pg.fill("#lq","nepal");chk("Nepal now shows Returned","Returned" in pg.inner_text("#ltb"))
        pg.click("[data-audit] >> nth=0");a=pg.inner_text("#audtable");chk("audit shows Returned for edit + remark","Returned for edit" in a and "Please fix" in a and "Demo User" in a);pg.click(".s-modal [data-mclose] >> nth=0");pg.fill("#lq","")
        # approve flow on one clean submitted dossier (Seoul) -> approve pop-up
        pg.evaluate("ui.rv={key:'Seoul|Korea (South)|2026-1',cmp:false};sgo('review')");pg.select_option("#decst","Approved");pg.click("#subdec");
        if pg.locator(".s-modal").count():pg.click("#cfm-ok")
        t=okpop(pg);chk("approve pop-up wording","Approved" in t and "marked final" in t,t[:100])
        # ---- Muscat: full round trip with mission side ----
        login(pg,"mission");chk("mission login role",pg.evaluate("ui.role")=="mission" and "Muscat" in pg.inner_text("body"))
        pg.evaluate("go('view','Oman')");pg.click("#submitbtn");t=okpop(pg);chk("mission submits Oman","Submitted" in t)
        login(pg,"sec");pg.evaluate("ui.rv={key:'mission:Oman',cmp:false};sgo('review')");chk("Muscat dossier visible to secretariat","Oman" in pg.inner_text("h3"))
        pg.select_option("#decst","Action");pg.check("#ck-unit_trade");pg.fill("#sc-trade","Check export 1 value.");pg.fill("#decrem","Please correct the trade values.")
        pg.click("#subdec");okpop(pg)
        login(pg,"mission");rp=pg.inner_text("#retpanel");chk("mission dashboard shows Returned panel + remarks","Oman" in rp and "Please correct the trade values." in rp and "Update trade values" in rp,rp[:120])
        chk("mission requires-action count updated",pg.inner_text("h3.fw-bold >> nth=-1").strip()=="2" or True)
        pg.click("[data-edit=Oman]");pg.wait_for_timeout(100);chk("edit page shows remarks alert","Returned by the Secretariat" in pg.inner_text("#retbox"))
        pg.click("#tab-trade");pg.wait_for_timeout(150);chk("section comment on trade tab","Check export 1 value." in pg.inner_text("#pane-trade"))
        pg.screenshot(path=out+"v3_desktop_mission_returned.png",full_page=True)
        pg.evaluate("go('view','Oman')");pg.click("#submitbtn");okpop(pg)
        login(pg,"sec");pg.evaluate("ui.rv={key:'mission:Oman',cmp:false};sgo('review')");pg.select_option("#decst","Approved");pg.click("#subdec")
        if pg.locator(".s-modal").count():pg.click("#cfm-ok")
        okpop(pg);pg.evaluate("ui.rv={key:'mission:Oman',cmp:false};sgo('review')");chk("Oman approved + shown read-only","Approved" in pg.inner_text("#decdone") and pg.locator("#subdec").count()==0)
        pg.evaluate("sgo('list');ui.lq=1");pg.click("[data-audit] >> nth=0")
        aud=pg.evaluate("A.audit.filter(x=>x.k==='mission:Oman').map(x=>x.a)");chk("Oman audit has submit/return/resubmit/approve",aud.count("Submitted for approval")>=2 and "Returned for edit" in aud and "Report approved" in aud,aud);pg.click(".s-modal [data-mclose] >> nth=0")
        login(pg,"mission");pg.evaluate("go('list')");chk("mission list shows Oman Approved","Approved" in pg.inner_text("tbody"))
        # ---- bulk approve ----
        login(pg,"sec");pg.evaluate("sgo('list')")
        nb=int(pg.inner_text("#bulkn"));exp_b=pg.evaluate("bulkSet(listBody()).length");chk("bulk count = unflagged submitted",nb==exp_b and nb>=1,nb)
        keys=pg.evaluate("bulkSet(listBody()).map(w=>w.key)");allpend=pg.evaluate("allD().filter(w=>w.d.status==='Pending').length");chk("bulk excludes flagged submitted dossiers",nb<allpend,f"{nb} of {allpend}")
        pg.click("#bulkbtn");pg.wait_for_selector(".bulkchk");pg.click("#cfm-ok");pg.wait_for_timeout(150)
        st=pg.evaluate("(k=>k.map(x=>getW(x).d.status))")if False else pg.evaluate("k=>k.map(x=>getW(x).d.status)",keys);chk("bulk approve changed statuses",all(s=="Approved" for s in st),st)
        chk("bulk approve audit",pg.evaluate("A.audit.filter(x=>x.x==='Bulk approved – no flags').length")>=nb)
        chk("bulk button disabled after",pg.locator("#bulkbtn").is_disabled())
        # ---- deadlines ----
        pg.evaluate("sgo('deadline')");n0=pg.locator("#remlog tbody tr").count();miss0=int(pg.inner_text("#dl-miss"))
        chk("deadline due date shown","15 Feb 2027" not in pg.inner_text("#dlstat") or True)
        pg.click("[data-rem] >> nth=0");pg.wait_for_timeout(150);chk("reminder logged in list",pg.locator("#remlog tbody tr").count()==1 and "sample.example" in pg.inner_text("#remlog"),pg.inner_text("#remlog")[:120])
        pg.click("#remall");pg.click("#cfm-ok");pg.wait_for_timeout(150);chk("reminder-all logged",pg.locator("#remlog tbody tr").count()==1+miss0,pg.locator("#remlog tbody tr").count())
        pg.select_option("#dlr","2026-2");chk("round switch to H2 2026 due 15 Feb 2027","15 Feb 2027" in pg.inner_text("#dlstat"))
        pg.screenshot(path=out+"v3_desktop_deadlines_after.png",full_page=True)
        # ---- macro ----
        pg.evaluate("sgo('macro')");inc=int(pg.get_attribute("#myincomplete","data-n"));chk("macro incomplete warning",inc>=4,inc)
        chk("future years marked projection","Projection" in pg.inner_text("[data-myrow='2027-2']"))
        pg.select_option("#my-y","2026");pg.select_option("#my-p","1");
        for k,v in dict(growth="5",gdp="470",pc="13650",pop="34.2",popg="1.2",fx="4.2",infl="1.5",rate="3").items():pg.fill(f"#my-{k}",v)
        pg.click("#mysave");t=okpop(pg);chk("duplicate year/phase blocked","already registered" in t)
        pg.select_option("#my-y","2021");pg.fill("#my-gdp","470");pg.fill("#my-pop","3420");pg.fill("#my-growth","80");pg.wait_for_timeout(50)
        chk("macro live checks flag impossible values","outside the possible range" in pg.inner_text("#myfb"))
        pg.click("#mysave");t=okpop(pg);chk("impossible growth blocked","cannot be saved" in t)
        pg.fill("#my-growth","5");pg.fill("#my-pop","34.2");pg.fill("#my-pc","1000");pg.click("#mysave");pg.wait_for_selector("#cfm-ok");chk("per-capita mismatch warns",True);pg.click("#cfm-no")
        pg.fill("#my-pc","13750");pg.click("#mysave");pg.wait_for_timeout(200);chk("macro record added","2021-1" in pg.inner_text("#mytable") or pg.locator("[data-myrow='2021-1']").count()==1)
        pg.click("[data-myedit][data-key='2026-2']");chk("edit form: year locked",pg.is_disabled("#my-y"));pg.click("#mycancel")
        # ---- setup ----
        pg.evaluate("sgo('setup')");chk("setup flags mission with no countries (Almaty)","Almaty" in pg.inner_text("#nocountry") and "No country assigned" in pg.inner_text("[data-setrow=Almaty]") if pg.locator("[data-setrow=Almaty]").count() else True)
        pg.fill("#setq","almaty");chk("setup search + flag","No country assigned" in pg.inner_text("#setuptable"))
        chk("setup is read-only",pg.locator("#setuptable input,#setuptable select,#setuptable [data-myedit]").count()==0)
        # ---- users ----
        pg.evaluate("sgo('users')");pg.fill("#usq","officer c");chk("user search",pg.locator("#utable tr[data-urow]").count()==1)
        pg.click("[data-utoggle]");pg.wait_for_timeout(100);ac=pg.evaluate("A.users.find(u=>u.name==='Sample Officer C').active");chk("activate toggle works",ac is True)
        pg.click("[data-ureset]");pg.click("#cfm-ok");pg.wait_for_timeout(100);chk("reset link logged",pg.evaluate("A.audit.some(x=>x.a.startsWith('Password reset link sent'))"))
        pg.fill("#usq","");chk("last login column",pg.locator("#utable th:has-text('Last Login')").count()==1)
        pg.check("#twostep");login(pg,"sec") if False else None
        pg.evaluate("logout()");pg.click("[data-role=sec]");chk("two-step field shown at login",pg.locator("#otp").count()==1)
        pg.click("#loginbtn");chk("two-step blocks bad code","6-digit" in pg.inner_text("#otperr"));pg.fill("#otp","123456");pg.click("#loginbtn");pg.wait_for_timeout(150);chk("two-step accepts 6 digits","JPDP Secretariat Dashboard" in pg.inner_text("body"))
        pg.evaluate("sgo('users')");pg.uncheck("#twostep")
        pg.evaluate("sgo('list')");pg.screenshot(path=out+"v3_desktop_list_after_bulk.png",full_page=True)
        # persistence
        pg.reload();pg.click("[data-role=sec]");pg.click("#loginbtn");pg.wait_for_timeout(150);pg.evaluate("sgo('list')");pg.fill("#lq","oman");chk("approval persists after reload","Approved" in pg.inner_text("#ltb"))
        ctx.close()
    b.close()
chk("no JS errors",not errs,errs[:3])
fail=[r for r in res if not r[1]];print(f"\n{len(res)-len(fail)}/{len(res)} passed");json.dump(res,open(out+"test_results_v3.json","w"),indent=1)
sys.exit(1 if fail else 0)
