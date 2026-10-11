import json,re,base64,collections
J=json.load(open('/workspace/assets/hs.json'))['results']
h4=[];kids=collections.defaultdict(list)
for r in J:
    lv=r.get('aggrLevel');c=r['id'];t=r['text']
    if lv==4: h4.append([c,re.sub(r'^\d+ - ','',t)])
    elif lv==6: kids[c[:4]].append(re.sub(r'^\d+ - ','',t))
stop=set("and the of or for with other than not in to by from their its are as a an n.e.s.".split())
out=[]
for c,t in h4:
    tl=set(re.findall(r"[a-z]+",t.lower()))
    ws=[]
    for k in kids[c]:
        for w in re.findall(r"[a-z]{4,}",k.lower()):
            if w not in tl and w not in stop and w not in ws: ws.append(w)
    out.append([c,t," ".join(ws)])
# drop 'reserved' headings
out=[o for o in out if not re.search(r'reserved for|\bheading\b.*(not used|deleted)',o[1],re.I)]
cur=json.load(open('/workspace/assets/cur.json'))
bad={"BTC","XAG","XAU","XDR","XPD","XPT","CLF","CNH","GGP","IMP","JEP","XOF2"}
extra={"SSP":"South Sudanese Pound","XOF":"West African CFA Franc","XAF":"Central African CFA Franc","XPF":"CFP Franc","XCD":"East Caribbean Dollar","ANG":"Netherlands Antillean Guilder","SLE":"Sierra Leonean Leone","ZWG":"Zimbabwe Gold","CUC":None,"HRK":None}
C=[[k,v] for k,v in cur.items() if k not in bad]
have={k for k,_ in C}
for k,v in extra.items():
    if v and k not in have: C.append([k,v])
C.sort()
js="const HS4="+json.dumps(out,ensure_ascii=False,separators=(',',':'))+";\nconst CUR="+json.dumps(C,ensure_ascii=False,separators=(',',':'))+";\n"
open('hsdata.js','w').write(js)
fonts=""
for w in (400,500,600):
    b=base64.b64encode(open(f'/workspace/assets/fig{w}.woff2','rb').read()).decode()
    fonts+="@font-face{font-family:'Figtree';font-style:normal;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}\n"%(w,b)
open('fonts.css','w').write(fonts)
bs=open('/workspace/assets/bs.css').read(); bs=re.sub(r'/\*#.*?\*/','',bs)
open('bootstrap.min.css','w').write(bs)
print(len(out),len(C),len(js))
print([o for o in out if o[0] in('1511','2709','8541','8542')])
