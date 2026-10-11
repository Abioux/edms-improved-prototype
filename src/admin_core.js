/* ===== Secretariat: seeding, store, flags, export ===== */
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const T1=n=>Number(n).toFixed(1);
const rnd1=(v)=>String(Math.round(v*10)/10);
const roundN=v=>String(v>=1000?Math.round(v):v>=100?Math.round(v*10)/10:Math.round(v*100)/100);
/* sentence variants – picked per dossier so that different dossiers do not read alike */
const SAV={
 assessment:[
  (c,g,i)=>`Real GDP growth in ${c} was about ${T1(g)} percent in the period, supported by domestic demand and external trade. Inflation was ${T1(i)} percent and the central bank kept its stance data-dependent.`,
  (c,g,i)=>`The ${c} economy expanded by ${T1(g)} percent, with services leading and industry mixed. Consumer prices rose ${T1(i)} percent over the period, within the authorities' comfort range.`,
  (c,g,i)=>`${c}'s output growth came in at ${T1(g)} percent as investment recovered slowly. Headline inflation stood at ${T1(i)} percent, and the exchange rate was broadly stable.`,
  (c,g,i)=>`Economic activity in ${c} grew ${T1(g)} percent, helped by commodity prices and public spending, while price pressures eased to ${T1(i)} percent inflation.`],
 implications:[
  c=>`Closer ties with ${c} could widen room for Malaysian exporters in food, services and manufacturing, while tighter local rules may raise compliance costs for investors.`,
  c=>`Policy shifts in ${c} create openings for Malaysian GLCs in infrastructure and energy, but payment risks and currency swings need monitoring.`,
  c=>`${c} is seeking foreign capital for its priority sectors; Malaysia can position halal, digital and construction expertise if market access conditions improve.`,
  c=>`Changes in ${c}'s trade regime affect Malaysian palm oil, electronics and machinery shipments, so early engagement with its ministries is advisable.`],
 preparedness:[
  c=>`• New local-content rules in ${c} may affect foreign contractors.\n• Customs procedures were revised and clearance times vary.`,
  c=>`• ${c} introduced stricter foreign ownership screening in some sectors.\n• Tax administration changes may raise filing burdens.`,
  c=>`• Licensing for imported food products in ${c} has become more detailed.\n• Repatriation of profits can be delayed at times.`,
  c=>`• Regulatory approvals in ${c} are slower than before.\n• Anti-dumping reviews on steel and chemicals are ongoing.`],
 potential:[
  c=>`• Renewable energy projects in ${c}.\n• Halal food and beverage imports.\n• Digital payments and e-commerce.`,
  c=>`• Port, rail and logistics upgrades in ${c}.\n• Healthcare and pharmaceutical cooperation.`,
  c=>`• Smart city and housing programmes in ${c}.\n• Education and skills training partnerships.`,
  c=>`• Oil and gas services and petrochemicals in ${c}.\n• Tourism and aviation links.`],
 recommendation:[
  c=>`• Share this report with MITI and MATRADE.\n• Propose a business matching event in ${c} in the next half.`,
  c=>`• Notify MIDA of investment openings in ${c}.\n• Raise market access issues at the next bilateral meeting.`,
  c=>`• Brief Bank Negara on currency developments in ${c}.\n• Monitor policy announcements monthly.`,
  c=>`• Arrange a trade mission to ${c} with the relevant chambers.\n• No immediate escalation required.`]};
const saFor=(c,g,i,idx)=>{const o={};let k=0;for(const key in SAV){const L=SAV[key];o[key]="[Sample] "+L[(idx*(k+1)+k*3+Math.floor(idx/4))%L.length](c,g,i);k++}return o};
const kpFor=(c,idx,asean)=>{const co=["National Energy Company","Grand Holdings","Central Trading Group","Prime Logistics","Metro Foods","Unity Telecom","Pioneer Steel"],mn=["Shell","Siemens","Samsung","Nestle","Toyota","Unilever","Huawei"],ass=["Chamber of Commerce and Industry","Federation of Manufacturers","Business Council"],ws=["Digital Economy Agency","Green Energy Authority","Investment Promotion Board"];
 const p=(a,i)=>a[(idx+i)%a.length];return{local:[{key:`${c} ${p(co,0)} (sample)`,industry:"Energy"},{key:`${c} ${p(co,2)} (sample)`,industry:"Trading"}],mnc:[{key:p(mn,0),industry:"Manufacturing"},{key:p(mn,3),industry:"Consumer goods"}],my:[{key:["PETRONAS","Maybank","Sime Darby","CIMB","Gamuda","Axiata"][idx%6],industry:"Energy, banking or plantation"}],watch:[{key:`${c} ${p(ws,0)}`,industry:"Digital governance"}],assoc:[{key:`${c} ${p(ass,0)}`,industry:"Cross-sector"}]}};
function mkDoss(sp,idx){
 const [mission,country,status,y,p,gdp,pop,g,infl,rate,ccy,fx,arch,gl,as,flaw,created,type]=sp,R=rng(idx*7919+13);
 const d=blank(country);d.status=status;d.mission=mission;d.y=y;d.p=p;d.created=created;d.region=MREGION[mission]||"";d.type=type==="CG"?"Consulate-General":"Country";if(type==="CG")d.city=mission;
 d.id=`${mission}|${country}|${y}-${p}`;
 const pc=Math.round(gdp*1000/pop);
 d.sa=saFor(country,g,infl,idx);
 const mq=p===1?"2":"4",mv=p===1?"2":"4";
 d.macro.q=p===1?"2":"4";d.macro.y=String(y);d.trade.q=d.macro.q;d.trade.y=String(y);
 if(idx%3===0&&p===1){d.macro.q="1";d.trade.q="1"}
 Object.assign(d.macro.f,{growth:T1(g),gdp:roundN(gdp),pc:String(pc),pop:roundN(pop),popg:T1(0.2+R()*1.8),ccy,fx:String(fx),infl:T1(infl),rate:String(rate)});
 const A=ARCH[arch],tot=gdp*1000;
 const sh=[0.075,0.05,0.035,0.025,0.018];
 d.trade.ex=A.ex.map((h,i)=>({h,v:String(Math.round(tot*sh[i]*(0.85+R()*0.3)))}));
 d.trade.im=A.im.map((h,i)=>({h,v:String(Math.round(tot*sh[i]*(0.9+R()*0.3)))}));
 [d.trade.ex,d.trade.im].forEach(L=>{for(let i=1;i<L.length;i++)if(+L[i].v>=+L[i-1].v)L[i].v=String(Math.round(+L[i-1].v*0.8))});
 const gv=[0.17,0.11,0.07].map(s=>Math.round(tot*s*(0.9+R()*0.2)));d.trade.gl=gl.map((c,i)=>({c,v:String(gv[i])}));
 const av=Math.round(Math.min(...gv)*0.4);d.trade.as=as.map((c,i)=>({c,v:String(Math.round(av*(1-i*0.25)))}));
 d.kp=kpFor(country,idx);
 /* previous round (kept for the compare screen) */
 const dl=(a,b)=>a+(R()*2-1)*b;
 d.prev={label:p===1?`${y-1} Phase 2 (Jul-Dec)`:`${y} Phase 1 (Jan-June)`,macro:{growth:T1(dl(g,0.8)),gdp:roundN(gdp*dl(0.97,0.03)),pc:String(Math.round(pc*dl(0.97,0.03))),pop:roundN(pop*0.992),infl:T1(Math.max(0,dl(infl,0.8))),rate:String(rate+(R()>0.5?0.25:0))},ex:d.trade.ex.map(r=>({h:r.h,v:String(Math.round(+r.v*dl(0.94,0.07)))}))};
 /* flaws */
 if(flaw==="textinfl"){d.sa.assessment="[Sample] Growth for the first half was recorded at 3.9 percent, lower than 4.4 percent a year earlier. Inflation dropped sharply to 1.7 percent due to falling food prices. External sector strengthened with higher remittances."}
 if(flaw==="textgrowth"){d.sa.assessment="[Sample] The economy expanded by 4.6 percent in the first half on the back of strong consumption. Inflation was "+T1(infl)+" percent."}
 if(flaw==="popraw")d.macro.f.pop="1425000000";
 if(flaw==="gdpmil"){d.macro.f.gdp="640000"}
 if(flaw==="nogdp"){d.macro.f.gdp="";}
 if(flaw==="period"){d.macro.q="4";d.macro.y="2025";d.trade.q="3";d.trade.y="2025"}
 if(flaw==="h2late"){d.macro.q="2";d.macro.y="2026";d.trade.q="2";d.trade.y="2026"}
 if(flaw==="tradefull"){d.trade.ex[0].v=String(Math.round(+d.trade.ex[0].v*1e6));}
 if(flaw==="missing"){d.macro.f.gdp="";d.macro.f.pc="";d.macro.f.rate="";d.macro.f.infl=""}
 if(flaw==="partial"){d.sa.recommendation="";d.sa.potential="";d.macro.f.rate="";d.trade.im=rows(5,"h");d.kp.watch=[kr()];d.kp.assoc=[kr()]}
 if(flaw==="copyparis"){const P=SEEDS.findIndex(x=>x[1]==="France");const pd=mkDoss0(SEEDS[P],P);d.sa=JSON.parse(JSON.stringify(pd.sa));for(const k in d.sa)d.sa[k]=d.sa[k].replace(/France/g,"Italy");}
 /* decision memory for returned ones */
 if(status==="Action"){const R2={tradefull:{gen:"Please correct the trade values (USD million) and resubmit.",chk:["unit_trade"],sec:{trade:"Export value looks like full US dollars, not USD million."}},textgrowth:{gen:"The growth figure in your narrative does not match the table. Please align them.",chk:["text_table"],sec:{sa:"Narrative says 4.6% growth, table says 2.9%."}},missing:{gen:"Several macro figures are missing. Please complete the Macro Snapshot.",chk:["missing"],sec:{macro:"GDP value, GDP per capita, inflation and policy rate are blank."}}}[flaw];
  d.rem={at:created+"T16:00:00",by:"JPDP Secretariat",gen:R2.gen,chk:R2.chk.map(k=>CHKLAB[k]),sec:R2.sec};d.note=R2.gen}
 return d}
const mkDoss0=mkDoss;
function seedAudit(A,d){const key=d.id;const L=[];const st=d.status,t0=d.created;
 L.push({t:t0+"T09:10:00",who:mFull(d.mission)+" (mission)",a:"Created dossier",k:key,x:"Report started"});
 if(st!=="Draft"){L.push({t:t0+"T15:40:00",who:mFull(d.mission)+" (mission)",a:"Submitted for approval",k:key,x:"All tabs completed"})}
 if(st==="Approved")L.push({t:addDays(t0,3)+"T11:05:00",who:"JPDP Secretariat – Sample Officer A",a:"Report approved",k:key,x:"No remarks"});
 if(st==="Action")L.push({t:t0+"T16:00:00",who:"JPDP Secretariat – Sample Officer B",a:"Returned for edit",k:key,x:d.rem?d.rem.gen:""});
 return L}
function addDays(iso,n){const d=new Date(iso+"T00:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function seedUsers(){const U=[["JPDP Secretariat (Demo)","secretariat.demo@sample.example","SECRETARIAT","2026-01-05","2026-10-11 09:12",1],["Sample Officer A","officer.a@sample.example","SECRETARIAT","2026-02-11","2026-10-09 14:30",1],["Sample Officer B","officer.b@sample.example","SECRETARIAT","2026-03-02","2026-10-08 10:02",1],["Sample Officer C","officer.c@sample.example","SECRETARIAT","2026-03-02","",0],["Regional Desk Africa (Demo)","desk.africa@sample.example","KLN STAFF","2026-10-01","2026-10-05 16:45",1]];
 MISSIONS.forEach((m,i)=>U.push([mFull(m[0]),mMail(m[0]),"MISSION : "+m[0],addDays("2026-08-06",-(i%9)),i%7===3?"":`2026-10-${String(1+((i*3)%10)).padStart(2,"0")} ${String(8+(i%9)).padStart(2,"0")}:${String((i*7)%60).padStart(2,"0")}`,i===17?0:1]));
 return U.map(u=>({name:u[0],email:u[1],role:u[2],reg:u[3],last:u[4],active:!!u[5]}))}
function buildA(){const A={v:3,dossiers:{},audit:[],reminders:[],my:MY0.map(x=>({...x})),rounds:ROUNDS0.map(x=>({...x})),users:seedUsers(),settings:{twoStep:false},prevS:{}};
 SEEDS.forEach((sp,i)=>{const d=mkDoss(sp,i);A.dossiers[d.id]=d;A.audit.push(...seedAudit(A,d))});
 /* previous-round values for the three Muscat sample dossiers */
 A.prevS={Oman:{label:"2025 Phase 2 (Jul-Dec)",macro:{growth:"1.2",gdp:"104.9",pc:"20400",pop:"5.1",infl:"1.1",rate:"5.0"},ex:[{h:"2709",v:"9300"},{h:"2711",v:"4500"},{h:"2710",v:"1700"},{h:"3901",v:"950"},{h:"7601",v:"600"}]},Sudan:{label:"2025 Phase 2 (Jul-Dec)",macro:{growth:"-13.0",gdp:"31",pop:"49.0",infl:"145",rate:"0"},ex:[]}};
 A.audit.push({t:"2026-10-08T10:20:00",who:mFull("Muscat")+" (mission)",a:"Created dossier",k:"mission:Oman",x:"Report started"},{t:"2026-10-08T10:25:00",who:mFull("Muscat")+" (mission)",a:"Created dossier",k:"mission:Yemen",x:"Report started"},{t:"2026-10-09T09:00:00",who:"JPDP Secretariat – Sample Officer A",a:"Returned for edit",k:"mission:Yemen",x:"Please complete all tabs and the reporting periods."});
 return A}
function loadA(){try{const s=JSON.parse(localStorage.getItem(AKEY));if(s&&s.v===3)return s}catch(e){}return buildA()}
let A=loadA();
function persistA(){try{localStorage.setItem(AKEY,JSON.stringify(A))}catch(e){}}
const NOW=()=>{const d=new Date();return d.toISOString().slice(0,19)};
const SECWHO="JPDP Secretariat – Demo User";
function audit(k,a,who,x){A.audit.push({t:NOW(),who:who||SECWHO,a,k,x:x||""});persistA()}
/* ---- unified dossier list (sample dossiers + the Muscat mission dossiers) ---- */
function allD(){const L=[];
 for(const id in A.dossiers){const d=A.dossiers[id];L.push({key:id,d,mission:d.mission,country:d.econ,region:d.region,y:d.y,p:d.p,created:d.created})}
 for(const e of S.order){const d=S.dossiers[e];L.push({key:"mission:"+e,d,mission:"Muscat",country:e,region:"Middle East",y:2026,p:1,created:(d.updated||"2026-10-08").slice(0,10)})}
 L.forEach(w=>{w.d.mission=w.mission;w.d.y=w.y;w.d.p=w.p});
 return L}
const getW=k=>allD().find(w=>w.key===k);
const SL={Draft:["Draft","secondary"],Pending:["Submitted","warning"],Approved:["Approved","success"],Action:["Returned","danger"]};
const sBadge=s=>`<span class="badge rounded-pill bg-${SL[s][1]}${SL[s][1]==="warning"?" text-dark":""} px-2 py-1 fw-semibold" style="font-size:.72rem" data-st="${SL[s][0]}">${SL[s][0]}</span>`;
const fDate=iso=>{if(!iso)return "–";const d=new Date(String(iso).slice(0,10)+"T00:00:00");return d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})};
const fDT=iso=>{if(!iso)return "–";const d=new Date(iso);return d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})+" "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})};
const perLab=(y,p)=>`${y} (${PHASELAB[p]})`;
/* ---- Malaysia reference lookup ---- */
const myRec=(y,p)=>A.my.find(r=>+r.y===+y&&+r.p===+p);
const isMissingMY=v=>v===""||v==null||num(v)===0||isNaN(num(v));
const MYFIELDS=[["growth","GDP growth"],["gdp","GDP value"],["pc","GDP per capita"],["pop","population"],["popg","population growth"],["fx","exchange rate"],["infl","inflation"],["rate","policy rate"]];
function myMissing(y,p){const r=myRec(y,p);if(!r)return MYFIELDS.map(x=>x[1]);return MYFIELDS.filter(([k])=>isMissingMY(r[k])).map(x=>x[1])}
const phaseEnd=(y,p)=>new Date(y,p===1?5:11,p===1?30:31,23,59);
const isProjection=(y,p)=>phaseEnd(y,p)>new Date();
/* ---- similarity ---- */
const SHC={};
function shingles(t){const w=String(t).toLowerCase().replace(/\[sample\]/g,"").replace(/[^a-z\s]/g," ").split(/\s+/).filter(Boolean);const s=new Set();for(let i=0;i+5<=w.length;i++)s.add(w.slice(i,i+5).join(" "));return s}
function sh(d){const k=SA.map(s=>d.sa[s[0]]).join("\n");if(!SHC[k])SHC[k]=shingles(k);return SHC[k]}
function jac(a,b){if(!a.size||!b.size)return 0;let n=0;for(const x of a)if(b.has(x))n++;return n/(a.size+b.size-n)}
function similarTo(w,all){const a=sh(w.d),out=[];if(a.size<8)return out;for(const o of all){if(o.key===w.key)continue;const j=jac(a,sh(o.d));if(j>=0.5)out.push({o,j})}return out.sort((x,y)=>y.j-x.j)}
/* ---- text vs table ---- */
function textHints(d){const out=[];const txt=SA.map(s=>d.sa[s[0]]||"").join(" \n ");const sents=txt.split(/(?<=[.!?\n])\s+/);
 const nums=s=>[...s.matchAll(/(-?\d+(?:\.\d+)?)\s*(?:%|per ?cent|percent)/gi)].map(m=>parseFloat(m[1]));
 const one=(re,ex,field,lab)=>{const tv=num(d.macro.f[field]);if(tv===null||isNaN(tv)||d.macro.na[field])return;const f=[];sents.forEach(s=>{if(re.test(s)&&!(ex&&ex.test(s)))f.push(...nums(s))});
  if(f.length&&!f.some(n=>Math.abs(n-tv)<=0.15))out.push({lv:"w",cat:"text",sec:"sa",msg:`The text mentions ${lab} of ${f.map(x=>x+"%").join(" / ")}, but the table shows ${fmt(tv)}%.`,sug:"text_table"})};
 one(/inflation|consumer prices/i,null,"infl","inflation");one(/growth|grew|expanded/i,/population/i,"growth","growth");return out}
/* ---- period check ---- */
const qi=(q,y)=>(+y)*4+(+q);
function periodFlags(d){const out=[],m=d.macro,t=d.trade;if(!d.y)return out;const ex=qi(d.p===1?2:4,d.y),QL=(q,y)=>`Q${q} ${y}`;
 if(m.q&&m.y){const mi=qi(m.q,m.y);
  if(mi>ex)out.push({lv:"e",cat:"period",sec:"macro",msg:`Macro period ${QL(m.q,m.y)} is after the end of the phase ${perLab(d.y,d.p)}.`,sug:"period"});
  else if(ex-mi>=2)out.push({lv:"w",cat:"period",sec:"macro",msg:`Macro period ${QL(m.q,m.y)} is ${ex-mi} quarters older than the phase ${perLab(d.y,d.p)} (expected ${QL(d.p===1?2:4,d.y)} or the quarter before).`,sug:"period"});
  if(t.q&&t.y){const ti=qi(t.q,t.y);
   if(ti>ex)out.push({lv:"e",cat:"period",sec:"trade",msg:`Trade period ${QL(t.q,t.y)} is after the end of the phase.`,sug:"period"});
   else if(Math.abs(ti-mi)>=2&&ti<mi&&mi-ti<=4)out.push({lv:"i",cat:"period",sec:"trade",msg:`Trade data is ${mi-ti} quarters older than the macro data (${QL(t.q,t.y)} vs ${QL(m.q,m.y)}). Older trade data is allowed – confirm it is labelled as such.`,sug:null});
   else if(Math.abs(ti-mi)>=2)out.push({lv:"w",cat:"period",sec:"trade",msg:`Macro (${QL(m.q,m.y)}) and trade (${QL(t.q,t.y)}) periods are ${Math.abs(ti-mi)} quarters apart.`,sug:"period"})}}
 return out}
/* ---- all flags for a dossier ---- */
function flagsFor(w,all){const d=w.d,F=[],V=validate(d);
 for(const x of missing(d)){const sec=x.tab,isM=sec==="macro"&&!/Period/.test(x.l);F.push({lv:sec==="kp"||sec==="trade"?"w":"e",cat:"missing",sec,msg:x.l.replace(/ \(\d of \d rows complete\)/,m=>m)+" is not filled in.",sug:isM?"missing":sec==="kp"?"kp":null})}
 const sc=p=>p.startsWith("macro")?"macro":p.startsWith("trade")?"trade":p.startsWith("kp")?"kp":"sa";
 const sg=(p)=>/gdp$/.test(p)?"unit_gdp":/\.pop$/.test(p)?"unit_pop":/\.pc$/.test(p)?"unit_pc":p.startsWith("trade")?(/\.(gl|as)\./.test(p)?"partners":"unit_trade"):null;
 for(const e of V.err)F.push({lv:"e",cat:"unit",sec:sc(e.p),msg:e.msg,sug:sg(e.p)});
 for(const e of V.warn)F.push({lv:"w",cat:"unit",sec:sc(e.p),msg:e.msg,sug:sg(e.p)});
 F.push(...textHints(d));F.push(...periodFlags(d));
 if(d.y){const mm=myMissing(d.y,d.p);if(mm.length)F.push({lv:"w",cat:"malaysia",sec:"macro",msg:`Malaysia reference data for ${perLab(d.y,d.p)} has no ${mm.slice(0,4).join(", ")}${mm.length>4?" and "+(mm.length-4)+" more":""}. In the original screen the Malaysia column would show 0 or “-”.`,sug:null})}
 for(const s of similarTo(w,all))F.push({lv:"w",cat:"similar",sec:"sa",msg:`Strategic Assessment text is ${Math.round(s.j*100)}% the same as the dossier for ${s.o.country} (${s.o.mission}). Possible copy-and-paste.`,sug:"copied"});
 /* de-duplicate identical messages */
 const seen={};return F.filter(f=>{const k=f.cat+f.msg;if(seen[k])return false;seen[k]=1;return true})}
const nFlags=F=>F.filter(f=>f.lv==="e"||f.lv==="w").length;
const CATLAB={missing:"Missing values",unit:"Units and logic",text:"Text vs table",malaysia:"Malaysia column",period:"Periods",similar:"Duplicate text"};
/* ---- previous round ---- */
function prevOf(w){if(w.key.startsWith("mission:"))return A.prevS[w.country]||null;return w.d.prev||null}
/* ---- export ---- */
const csvq=v=>{v=v==null?"":String(v);return /[",\n\r]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
function exportRows(all){const H=["id","mission","country","region","report_type","city","year","phase","status","date_created","macro_period","growth_pct","gdp_usd_bn","gdp_per_capita_usd","population_m","pop_growth_pct","currency","usd_fx_rate","inflation_pct","policy_rate_pct","trade_period"];
 for(const [k,n] of [["ex",5],["im",5]])for(let i=1;i<=n;i++)H.push(`${k}${i}_hs4`,`${k}${i}_name`,`${k}${i}_usd_m`);
 for(const [k,n] of [["gl",3],["as",3]])for(let i=1;i<=n;i++)H.push(`${k}${i}_country`,`${k}${i}_usd_m`);
 H.push("assessment","implications","regulatory_risks","opportunities","recommendations","malaysian_players","flags_count","flags");
 const rows=[H];
 for(const w of all){const d=w.d,m=d.macro,f=m.f,F=flagsFor(w,all),r=[w.key,w.mission,w.country,w.region,d.type,d.city||"",w.y,w.p,SL[d.status][0],w.created,m.q&&m.y?`Q${m.q} ${m.y}`:"",f.growth,f.gdp,f.pc,f.pop,f.popg,f.ccy,f.fx,f.infl,f.rate,d.trade.q&&d.trade.y?`Q${d.trade.q} ${d.trade.y}`:""];
  for(const k of ["ex","im"])for(let i=0;i<5;i++){const x=d.trade[k][i]||{h:"",v:""};r.push(x.h,x.h&&HSMAP[x.h]?HSMAP[x.h][1]:"",x.v)}
  for(const k of ["gl","as"])for(let i=0;i<3;i++){const x=d.trade[k][i]||{c:"",v:""};r.push(x.c,x.v)}
  r.push(...SA.map(s=>d.sa[s[0]]||""),d.kp.my.filter(x=>x.key).map(x=>x.key+(x.industry?" ("+x.industry+")":"")).join("; "),nFlags(F),F.map(x=>x.msg).join(" | "));rows.push(r)}
 return rows}
const toCSV=rows=>"\ufeff"+rows.map(r=>r.map(csvq).join(",")).join("\r\n");
function tradeLines(all){const rows=[["dossier_id","mission","country","year","phase","status","section","rank","hs4_or_country","name","usd_million"]];
 for(const w of all){const d=w.d;for(const k of ["ex","im","gl","as"]){const hs=!!TL[k].hs;d.trade[k].forEach((x,i)=>{if(hs?!x.h:!x.c)return;rows.push([w.key,w.mission,w.country,w.y,w.p,SL[d.status][0],TL[k].lab,i+1,hs?x.h:x.c,hs?(HSMAP[x.h]?HSMAP[x.h][1]:""):x.c,x.v])})}}
 return rows}
function exportJSON(all){return JSON.stringify({exported_at:NOW(),note:"Prototype sample data – not real EDMS data",dossiers:all.map(w=>({id:w.key,mission:w.mission,country:w.country,region:w.region,year:w.y,phase:w.p,status:SL[w.d.status][0],date_created:w.created,report_type:w.d.type,city:w.d.city||"",strategic_assessment:w.d.sa,macro:{period:w.d.macro.q&&w.d.macro.y?`Q${w.d.macro.q} ${w.d.macro.y}`:"",...w.d.macro.f},trade:{period:w.d.trade.q&&w.d.trade.y?`Q${w.d.trade.q} ${w.d.trade.y}`:"",top_exports:w.d.trade.ex,top_imports:w.d.trade.im,partners_global:w.d.trade.gl,partners_asean:w.d.trade.as},key_players:w.d.kp,flags:flagsFor(w,all).map(f=>({level:f.lv,category:f.cat,section:f.sec,message:f.msg}))}))},null,1)}
