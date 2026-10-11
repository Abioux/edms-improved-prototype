"use strict";
/* EDMS Economic Dossier – data-entry prototype v2 (front-end only, sample data, localStorage). */
const KEY="edms_proto_v2",MISSION="Embassy of Malaysia, Muscat",EMAIL="mwmuscat@sample.example";
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const IC={
 save:'<path d="M5 3h11l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 0v5h8V3M7 21v-7h10v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
 send:'<path d="M21 3 3 10.5l6.5 2.5L12 19.5 14.5 14 21 3zM9.5 13 21 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
 building:'<path d="M5 21V3h10v18M15 9h4v12M3 21h18M8 7h4M8 11h4M8 15h4" fill="none" stroke="currentColor" stroke-width="2"/>',
 cal:'<path d="M4 6h16v15H4zM4 10h16M8 3v5M16 3v5" fill="none" stroke="currentColor" stroke-width="2"/>',
 info:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
 up:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
 geo:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
 ppl:'<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5a3.2 3.2 0 0 1 0 6.2M18 14.5c2 .8 3 2.700 3 5.500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 folder:'<path d="M3 6a1 1 0 0 1 1-1h5l2 2.500h9a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" fill="currentColor"/>',
 hour:'<path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" fill="none" stroke="currentColor" stroke-width="2"/>',
 ok:'<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7.500 12.500l3 3 6-6.500" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/>',
 warn:'<path d="M12 2.500 22.500 21h-21z" fill="currentColor"/><path d="M12 9v5.500M12 17.200v.5" stroke="#fff" stroke-width="2.200" stroke-linecap="round"/>',
 pdf:'<path d="M6 2h8l5 5v15H6zM14 2v5h5M9 14h6M9 17.500h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
 clock:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'};
const ico=(n,cls,sz)=>`<svg class="${cls||""}" width="${sz||"1em"}" height="${sz||"1em"}" viewBox="0 0 24 24" aria-hidden="true" style="vertical-align:-.125em">${IC[n]}</svg>`;
const CHEV='<svg viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
const JATA='<svg viewBox="0 0 40 40" aria-label="Logo Aplikasi" role="img"><path d="M20 3 6 8v11c0 9 6 15 14 18 8-3 14-9 14-18V8z" fill="#1f3a8a"/><path d="M20 8l2.200 4.500 5 .7-3.600 3.500.9 5-4.500-2.400-4.500 2.400.9-5-3.600-3.500 5-.7z" fill="#f5c518"/><path d="M11 24c2 4 5 6.500 9 8 4-1.500 7-4 9-8" fill="none" stroke="#f5c518" stroke-width="1.800"/></svg>';

/* ---------- model ---------- */
const rows=(n,k)=>Array.from({length:n},()=>k==="h"?{h:"",v:""}:{c:"",v:""});
const kr=()=>({key:"",industry:""});
function blank(e){return{econ:e,status:"Draft",type:"Country",city:"",note:"",updated:"",
 sa:{assessment:"",implications:"",preparedness:"",potential:"",recommendation:""},
 macro:{q:"",y:"",f:{growth:"",gdp:"",pc:"",pop:"",popg:"",ccy:"",fx:"",infl:"",rate:""},na:{}},
 trade:{q:"",y:"",ex:rows(5,"h"),im:rows(5,"h"),gl:rows(3,"c"),as:rows(3,"c"),na:{}},
 kp:{local:[kr()],mnc:[kr()],my:[kr()],watch:[kr()],assoc:[kr()]}}}
function demo(){
 const o=blank("Oman"),s=blank("Sudan"),y=blank("Yemen"),P="[Sample] ";
 Object.assign(o.sa,{assessment:P+"Real GDP growth is estimated at a moderate pace, supported by non-oil sectors, with hydrocarbon output managed within OPEC+ commitments. Fiscal consolidation continues.",
  implications:P+"Diversification and logistics projects open room for Malaysian services and halal food exporters; energy price swings affect the Gulf outlook.",
  preparedness:P+"• New local-content and labour-localisation rules may raise compliance costs for foreign contractors.\n• Customs documentation requirements were updated.",
  potential:P+"• Port and free-zone developments.\n• Renewable energy.\n• Halal food and digital services.",
  recommendation:P+"• Share with MATRADE and MIDA.\n• Consider a halal food business mission in the second half of the year."});
 o.macro.q="1";o.macro.y="2026";Object.assign(o.macro.f,{growth:"1.7",gdp:"108.4",pc:"20800",pop:"5.2",popg:"2.1",ccy:"OMR",fx:"0.385",infl:"0.9",rate:"4.5"});
 o.trade.q="1";o.trade.y="2026";
 [["2709",9800],["2711",4200],["2710",1900],["3901",1100],["7601",620]].forEach((r,i)=>o.trade.ex[i]={h:r[0],v:String(r[1])});
 [["8703",1500],["8517",1100],["1006",520],["3004",450],["1001",400]].forEach((r,i)=>o.trade.im[i]={h:r[0],v:String(r[1])});
 [["China",6200],["United Arab Emirates",4100],["India",3300]].forEach((r,i)=>o.trade.gl[i]={c:r[0],v:String(r[1])});
 [["Singapore",520],["Thailand",410],["Malaysia",330]].forEach((r,i)=>o.trade.as[i]={c:r[0],v:String(r[1])});
 o.kp.local=[{key:"Petroleum Development Oman",industry:"Oil and gas"}];
 o.kp.mnc=[{key:"Shell",industry:"Oil and gas"}];
 o.kp.my=[{key:"PETRONAS",industry:"Oil, gas and energy"},{key:"Maybank",industry:"Banking"}];
 o.kp.watch=[{key:"Duqm Special Economic Zone",industry:"Logistics and shipping"}];
 o.kp.assoc=[{key:"Oman Chamber of Commerce and Industry",industry:"Cross-sector"}];
 s.sa.assessment=P+"Conflict continues to depress output and disrupt supply chains; official statistics are limited.";
 s.macro.q="4";s.macro.y="2025";s.macro.f.growth="-12.5";s.macro.f.gdp="28";s.macro.na.pc=true;
 y.status="Action";y.note="JPDP comment (sample): Please complete all tabs and the reporting periods.";
 return{dossiers:{Oman:o,Sudan:s,Yemen:y},order:["Sudan","Yemen","Oman"]}}
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.dossiers)return s}catch(e){}return demo()}
let S=load();
const ui={view:"login",role:"",sview:"dash",cur:null,area:"",tab:"sa",dirty:false,V:null,navOpen:false};
const D=()=>S.dossiers[ui.cur];
const getP=(o,p)=>p.split(".").reduce((a,k)=>a==null?a:a[k],o);
function setP(o,p,v){const k=p.split("."),l=k.pop();k.reduce((a,x)=>a[x],o)[l]=v}
const pid=p=>"f-"+p.replace(/\./g,"-");
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const STAT={Draft:["Draft","secondary"],Pending:["Pending Approval","warning"],Approved:["Approved","success"],Action:["Requires Action","danger"]};
const PH={sa:"Economic growth remained resilient at 4.2%, supported by domestic consumption and manufacturing exports. The Government announced a new industrial transformation programme focused on advanced manufacturing and digital infrastructure, while maintaining fiscal consolidation through targeted subsidy reforms."};
const SA=[
 ["assessment","i) Overall Economic Assessment *","Provide a concise assessment of the host country's overall economic performance during the reporting period. Highlight significant economic developments, major policy changes and the key factors driving the economy.",PH.sa],
 ["implications","ii) Strategic Implications for Malaysia *","Assess the direct impact of the host country’s economic and regulatory shifts on Malaysia's strategic interests.","The introduction of stricter foreign investment screening may increase compliance requirements for Malaysian companies seeking to invest in the host country. At the same time, expanded renewable energy incentives present opportunities for Malaysian firms specialising in solar and energy infrastructure."],
 ["preparedness","iii) Regulatory Preparedness & Risks *","Identify new or emerging regulatory developments, trade measures, compliance requirements or other risks that may affect Malaysian businesses, investments or economic interests.","• New carbon reporting requirements for exporters.\n• Export licensing introduced for critical minerals.\n• Foreign ownership limits tightened in strategic sectors.\n• Political instability may delay infrastructure projects."],
 ["potential","iv) Opportunities in Priority Domains *","Identify emerging commercial, investment or strategic opportunities that Malaysia could pursue through government engagement or private sector collaboration.","• Expansion of halal food imports.\n• PPP Infrastructure projects.\n• Renewable energy investment.\n• Smart city initiatives.\n• Healthcare cooperation.\n• Semiconductor supply chain."],
 ["recommendation","v) Mission's Recommendations *","Suggest follow-up actions, agencies to notify, or platforms for escalation.","• Monitor developments or no immediate action required\n• Share with relevant agency (e.g., MITI, MIDA, Bank Negara)\n• Raise at Bilateral Consultation / Joint Commission (JC) meeting\n• Propose targeted engagement (e.g., working group, capacity-building, policy dialogue)"]];
const SALIM=1500;
const MF=[
 {k:"growth",l:"i) GDP Growth (%) *",h:"Enter the GDP growth percentage for the current reporting period.",ph:"e.g., 4.5",neg:1},
 {k:"gdp",l:"ii) GDP Value (in Billions USD) *",h:"Enter the total GDP value converted to Billions USD to ensure standardized reporting across all Missions.",ph:"e.g., 350.2"},
 {k:"pc",l:"iii) GDP Per Capita (USD) *",h:"Enter the host country's GDP per capita value, standardized in USD.",ph:"e.g., 12500"},
 {k:"pop",l:"iv) Population (Million) *",h:"Enter the host country's total population in millions.",ph:"e.g., 5.2"},
 {k:"popg",l:"v) Population Growth Rate (%) *",h:"Enter the annual population growth rate percentage.",ph:"e.g., 1.5",neg:1},
 {k:"fx",l:"vi) Currency Exchange Rate *",h:"Enter the exchange rate of the local currency against 1 USD.",ph:"e.g., 4.50",fx:1},
 {k:"infl",l:"vii) Inflation Rate (%) *",h:"Enter the current inflation rate percentage.",ph:"e.g., 2.8",neg:1},
 {k:"rate",l:"viii) Interest Rate (Policy Rate) (%) *",h:"Enter the central bank's current interest rate percentage.",ph:"e.g., 3.00",neg:1}];
const TL={ex:{t:"i) Top 5 Exports *",h:"Select the top 5 export products (HS4 heading) and enter the total value in Millions USD.",n:5,hs:1,lab:"Top 5 Exports"},
 im:{t:"ii) Top 5 Imports *",h:"Select the top 5 import products (HS4 heading) and enter the total value in Millions USD.",n:5,hs:1,lab:"Top 5 Imports"},
 gl:{t:"iii) Top 3 Trade Partners (Global) *",h:"Select the top 3 global trading partners and enter the total trade volume in Millions USD.",n:3,lab:"Top 3 Trade Partners (Global)"},
 as:{t:"iv) Top 3 Trade Partners (ASEAN) *",h:"Select the top 3 ASEAN trading partners and enter the total trade volume in Millions USD.",n:3,asean:1,lab:"Top 3 Trade Partners (ASEAN)"}};
const KP=[["local","1. Major Local Companies","Identify established domestic or state-owned enterprises that dominate the host country's core marketplace or heavily influence local commercial policy.","e.g., UzAuto Motors, Navoi Mining, Uzbekneftegaz","e.g., Automotive Manufacturing, Mining & Metals, Heavy Industry"],
 ["mnc","2. Multinational Corporations (MNCs)","List established foreign multinational companies with a significant operational presence or major market share within the host country.","e.g., Chevron, Siemens, Samsung","e.g., Oil & Gas, Industrial Technology, Electronics"],
 ["my","3. Major Malaysian Players","List Malaysian government-linked companies (GLCs) or private sector firms that are currently active or pursuing major projects in the host country.","e.g., PETRONAS, Sime Darby, Maybank","e.g., Oil & Gas, Plantation, Banking"],
 ["watch","4. Strategic Watchlist","Identify rising or emerging entities (companies, government agencies, or institutions) involved in future-focused sectors such as semiconductors, digital governance, green energy transition, or supply chain resilience. These are players Malaysia should monitor","e.g., Digital Agency, Green Hydrogen Authority","e.g., Digital Governance, Green Energy, Semiconductors"],
 ["assoc","5. Key Business Association/ Chambers","List influential industry chambers, business councils, or sector-specific trade alliances that can actively facilitate Malaysian market access or provide regulatory insights.","e.g., Semiconductor Industry Association, National Chamber of Commerce & Industry","e.g., High-Tech Trade Advocacy, Bilateral Investment Facilitation"]];
const KPMAX=5;
const QEND={1:"31 March",2:"30 June",3:"30 September",4:"31 December"};
const asAt=(q,y)=>q&&y?`${QEND[q]} ${y}`:"";
const YEARS=["2027","2026","2025","2024","2023"];

/* ---------- numbers ---------- */
function num(s){if(s==null)return null;s=String(s).trim();if(s==="")return null;return /^-?(\d+\.?\d*|\.\d+)$/.test(s)?Number(s):NaN}
const fmt=(n,d)=>Number(n).toLocaleString("en-US",{maximumFractionDigits:d==null?2:d});
function tidy(n){const a=Math.abs(n);return String(a>=100?Math.round(n*100)/100:a>=1?Math.round(n*1000)/1000:Number(n.toPrecision(3)))}
function normNum(s){let t=String(s).trim().replace(/\s/g,"");if(!t)return t;
 if(/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)&&!/^-?0,/.test(t))return t.replace(/,/g,"");
 if(/^-?\d*,\d+$/.test(t))return t.replace(",",".");
 return t.replace(/,/g,"")}

/* ---------- validation (the "logical thinking" layer) ---------- */
const SPEC={growth:{n:"GDP growth",lo:-100,hi:200,wl:-25,wh:25,eg:"4.5"},infl:{n:"Inflation",lo:-50,hi:10000,wl:-5,wh:40,eg:"2.8"},rate:{n:"Policy rate",lo:-10,hi:200,wl:-1,wh:30,eg:"3.00"},popg:{n:"Population growth",lo:-20,hi:20,wl:-3,wh:6,eg:"1.5"}};
function validate(d){
 const V={m:{},fx:[],err:[],warn:[]};
 const add=(p,lv,msg,fix)=>{(V.m[p]=V.m[p]||[]).push({lv,msg,fix:fix?V.fx.push(fix)-1:-1});(lv==="e"?V.err:lv==="w"?V.warn:[]).push({p,msg})};
 const mf=d.macro.f,na=d.macro.na;
 const val=k=>na[k]||mf[k]===""?null:num(mf[k]);
 const bad={};
 for(const k in SPEC){const s=SPEC[k],v=val(k),p="macro.f."+k;if(v===null)continue;
  if(isNaN(v)){add(p,"e","Enter a number only, e.g. "+s.eg+".");bad[k]=1;continue}
  if(v<s.lo||v>s.hi){add(p,"e",`${s.n} of ${fmt(v)}% is not possible. Please enter the percentage, e.g. ${s.eg}.`);bad[k]=1}
  else if(v<s.wl||v>s.wh)add(p,"w",`${fmt(v)}% is unusual for ${s.n.toLowerCase()} – please double-check the figure and that it is in %.`)}
 // population
 let pop=val("pop");
 if(pop!==null){const p="macro.f.pop";
  if(isNaN(pop)){add(p,"e","Enter a number only, e.g. 5.2.");bad.pop=1}
  else if(pop<=0){add(p,"e","Population must be more than zero.");bad.pop=1}
  else if(pop>1600){bad.pop=1;const f=pop>=1e5?1e6:1e3,nv=pop/f;
   add(p,"e",`${fmt(pop,0)} million people is more than the world's largest country. It looks like the number was entered in ${f===1e6?"persons":"thousands"}. This field is in millions (e.g. 5.2 for 5,200,000 people).`,{label:`Convert for me → ${tidy(nv)} million`,set:[[p,tidy(nv)]]})}
  else if(pop<0.001)add(p,"w",`${fmt(pop,5)} million is fewer than 1,000 people – please check the figure is in millions.`)}
 // GDP (billions)
 const gdp=val("gdp");
 if(gdp!==null){const p="macro.f.gdp";
  if(isNaN(gdp)){add(p,"e","Enter a number only, e.g. 350.2.");bad.gdp=1}
  else if(gdp<=0){add(p,"e","GDP must be more than zero.");bad.gdp=1}
  else if(gdp>60000){bad.gdp=1;let fix=null;for(const [f,w] of [[1e3,"USD million"],[1e6,"USD thousand"],[1e9,"full US dollars"]]){const nv=gdp/f;if(nv>=0.05&&nv<=45000){fix={label:`Convert for me → ${tidy(nv)} billion`,set:[[p,tidy(nv)]]};add(p,"e",`USD ${fmt(gdp,0)} billion is larger than the whole world economy’s biggest member. It looks like GDP was entered in ${w} – this field is in billions.`,fix);break}}
   if(!fix)add(p,"e","This GDP is larger than any economy in the world. Enter the value in USD billions.")}
  else if(gdp<0.05)add(p,"w",`USD ${fmt(gdp,4)} billion is very small – please check the unit (billions).`)}
 // GDP per capita
 const pc=val("pc");
 if(pc!==null){const p="macro.f.pc";
  if(isNaN(pc)){add(p,"e","Enter a number only, e.g. 12500.");bad.pc=1}
  else if(pc<=0){add(p,"e","GDP per capita must be more than zero.");bad.pc=1}
  else if(pc>500000){add(p,"e","GDP per capita above USD 500,000 is not possible. Enter USD per person, e.g. 12500.");bad.pc=1}
  else if(pc<100){V.lowpc=1}}
 // cross-check GDP x 1000 / pop ~ per capita
 const ok=k=>val(k)!==null&&!isNaN(val(k))&&!bad[k]&&val(k)>0;
 if(ok("gdp")&&ok("pop")&&ok("pc")){
  const g=val("gdp"),po=val("pop"),c=val("pc"),r=g*1000/po/c,imp=g*1000/po;
  const msg0=`GDP USD ${fmt(g)} bn ÷ population ${fmt(po)} m = about USD ${fmt(imp,0)} per person, but GDP per capita is ${fmt(c,0)}.`;
  if(r>=0.7&&r<=1.43){add("macro.f.pc","o",`Cross-check OK – GDP, population and GDP per capita agree (about USD ${fmt(imp,0)} per person).`)}
  else{
   const cands=[],T=x=>x>=0.7&&x<=1.43;
   if(T(r/1000)){cands.push({f:"gdp",mul:0.001,why:"it looks like GDP was entered in USD million instead of billions"});cands.push({f:"pc",mul:1000,why:"GDP per capita may have been entered in thousands (e.g. 12.5 instead of 12,500)"})}
   if(T(r*1000))cands.push({f:"gdp",mul:1000,why:"it looks like GDP was entered in USD trillion instead of billions"});
   if(T(r/1e6))cands.push({f:"gdp",mul:1e-6,why:"it looks like GDP was entered in USD thousand instead of billions"});
   if(T(r/1e9))cands.push({f:"gdp",mul:1e-9,why:"it looks like GDP was entered in full US dollars instead of billions"});
   const best=cands.find(x=>x.f==="pc"&&c<100)||cands[0],alt=cands.find(x=>x!==best&&x.f!==best.f);
   if(best){const p="macro.f."+best.f,nv=val(best.f)*best.mul,sv=best.f==="pc"?String(Math.round(nv)):tidy(nv);
    add(p,"e",`${msg0} These do not agree – ${best.why}.${alt?" (Otherwise: "+alt.why+".)":""}`,{label:`Convert for me → ${best.f==="pc"?fmt(nv,0):sv}`,set:[[p,sv]]})}
   else if(r>0.4&&r<2.5)add("macro.f.pc","w",`${msg0} They differ by ${Math.round(Math.abs(r-1)*100)}% – please check they come from the same source and year.`);
   else add("macro.f.pc","e",`${msg0} These figures cannot all be right. Please re-check the three numbers (GDP in billions USD, GDP per capita in USD, population in millions).`)}}
 else if(V.lowpc&&pc!==null)add("macro.f.pc","w",`USD ${fmt(pc)} per person is very low – if you entered thousands (e.g. 12.5 for 12,500) please convert.`,{label:`Convert for me → ${fmt(pc*1000,0)}`,set:[["macro.f.pc",String(Math.round(pc*1000))]]});
 // currency & rate
 const ccy=mf.ccy,fx=val("fx");
 if(fx!==null){const p="macro.f.fx";
  if(isNaN(fx))add(p,"e","Enter a number only, e.g. 4.50.");
  else if(fx<=0)add(p,"e","The exchange rate must be more than zero.");
  else if(fx>1e8)add(p,"e","This exchange rate is too large to be real – please check.");
  else if(!ccy)add("macro.f.ccy","e","Choose the currency first (type the code or name, e.g. MYR or ringgit).");
  else if(ccy==="USD"&&fx!==1)add(p,"e","1 USD = 1 USD. For US dollars the rate must be 1.",{label:"Convert for me → 1",set:[[p,"1"]]});
  else if(FXREF[ccy]){const ref=FXREF[ccy];
   if(fx<ref*0.4||fx>ref*2.5){const inv=1/fx;
    if(inv>ref*0.6&&inv<ref*1.6)add(p,"w",`It looks upside-down: you entered USD per 1 ${ccy}. This field is ${ccy} per 1 USD (about ${tidy(ref)}).`,{label:`Convert for me → ${tidy(inv)}`,set:[[p,tidy(inv)]]});
    else add(p,"w",`1 USD is usually around ${tidy(ref)} ${ccy} – ${fmt(fx,4)} looks unusual. Please check.`)}}}
 // trade
 const T=d.trade,gm=ok("gdp")?val("gdp")*1000:null,tna=T.na;
 const amtChk=(p,v,cap,gl)=>{ // cap multiple of GDP
  if(v===null)return;
  if(isNaN(v)){add(p,"e","Enter a number only, e.g. 850.2.");return}
  if(v<0){add(p,"e","The amount cannot be negative.");return}
  if(v>2.5e6){const nv=v/1e6;add(p,"e",`USD ${fmt(v,0)} million is more than the largest economy’s annual trade. It looks like full US dollars – this field is in USD million.`,{label:`Convert for me → ${tidy(nv)}`,set:[[p,tidy(nv)]]});return}
  if(gm&&v>cap*gm){let fix=null;for(const f of [1e6,1e3]){if(v/f<=cap*gm&&v/f>=0.001){fix={label:`Convert for me → ${tidy(v/f)}`,set:[[p,tidy(v/f)]]};break}}
   add(p,"e",`USD ${fmt(v,0)} million is ${fmt(v/gm,1)}× this country’s whole GDP (USD ${fmt(gm,0)} million), which is not possible. ${fix?"It looks like the amount was not in USD million.":"Please check the amount and the GDP figure."}`,fix);return}
  if(gm&&!gl&&v>gm)add(p,"w",`USD ${fmt(v,0)} million is larger than this country’s GDP (USD ${fmt(gm,0)} million) – please double-check.`)};
 for(const k of ["ex","im"]){if(tna[k])continue;const L=T[k],seen={};let sum=0,cnt=0;
  L.forEach((r,i)=>{const v=num(r.v);amtChk(`trade.${k}.${i}.v`,v,3,0);if(v!==null&&!isNaN(v)&&v>=0){sum+=v;cnt++}
   if(r.h){if(seen[r.h])add(`trade.${k}.${i}.h`,"e","This product is already selected in another row.");seen[r.h]=1}});
  const lp=`trade.${k}`;
  if(gm&&cnt>=2&&sum>0){
   if(sum>2.5*gm&&sum<=3*gm*5)add(lp,"w",`The total of these ${cnt} rows (USD ${fmt(sum,0)} million) is ${fmt(sum/gm,1)}× GDP – unusually high. Please check the units.`);
   if(sum<0.0005*gm)add(lp,"w",`The total (USD ${fmt(sum,2)} million) is tiny compared with GDP (USD ${fmt(gm,0)} million). Were the amounts entered in USD billion?`,{label:"Convert for me → ×1,000 on all rows",set:L.map((r,i)=>[`trade.${k}.${i}.v`,r.v!==""&&!isNaN(num(r.v))?tidy(num(r.v)*1000):r.v])})}
  const vs=L.map(r=>num(r.v));for(let i=1;i<vs.length;i++)if(vs[i]!==null&&vs[i-1]!==null&&!isNaN(vs[i])&&!isNaN(vs[i-1])&&vs[i]>vs[i-1]){add(lp,"w","The rows should be ranked from largest to smallest – row "+(i+1)+" is bigger than row "+i+".");break}}
 const gv={};
 for(const k of ["gl","as"]){if(tna[k])continue;const L=T[k],seen={};let sum=0,cnt=0;
  L.forEach((r,i)=>{const v=num(r.v);amtChk(`trade.${k}.${i}.v`,v,4,1);if(v!==null&&!isNaN(v)&&v>=0){sum+=v;cnt++}
   if(r.c){if(seen[r.c])add(`trade.${k}.${i}.c`,"e","This country is already selected in another row.");seen[r.c]=1;
    if(r.c===d.econ)add(`trade.${k}.${i}.c`,"e",`${r.c} cannot be its own trade partner.`);
    if(k==="gl"&&v!==null&&!isNaN(v))gv[r.c]=v}});
  if(gm&&cnt>=2&&sum>4*gm)add(`trade.${k}`,"w",`The ${cnt} partner volumes add up to USD ${fmt(sum,0)} million – ${fmt(sum/gm,1)}× GDP. Total trade is rarely above 4× GDP, so please check the amounts.`);
  const vs=L.map(r=>num(r.v));for(let i=1;i<vs.length;i++)if(vs[i]!==null&&vs[i-1]!==null&&!isNaN(vs[i])&&!isNaN(vs[i-1])&&vs[i]>vs[i-1]){add(`trade.${k}`,"w","Partners should be ranked from largest to smallest – row "+(i+1)+" is bigger than row "+i+".");break}}
 if(!tna.as&&!tna.gl){const glv=T.gl.map(r=>num(r.v)).filter(x=>x!==null&&!isNaN(x)),min3=glv.length===3?Math.min(...glv):null;
  T.as.forEach((r,i)=>{const v=num(r.v);if(!r.c||v===null||isNaN(v))return;const p=`trade.as.${i}.v`;
   if(gv[r.c]!=null){const g=gv[r.c];if(g>0&&(v/g<0.8||v/g>1.25))add(p,"w",`${r.c} is also in your global list with USD ${fmt(g,0)} million – the same trade should show about the same figure.`)}
   else if(min3!=null&&v>min3)add(p,"w",`USD ${fmt(v,0)} million is more than your #3 global partner (USD ${fmt(min3,0)} million), so ${r.c} should also be in the global top 3.`)})}
 // key players: duplicate names
 for(const [k] of KP){const seen={};d.kp[k].forEach((r,i)=>{const n=r.key.trim().toLowerCase();if(!n)return;if(seen[n])add(`kp.${k}.${i}.key`,"w","Already listed above.");seen[n]=1})}
 return V}
function missing(d){const m=[],a=(tab,l)=>m.push({tab,l});
 SA.forEach(s=>{if(!d.sa[s[0]].trim())a("sa","Strategic Assessment – "+s[1].replace(/ \*$/,""))});
 if(d.type==="Consulate-General"&&!d.city.trim())a("sa","Report type – name of the Consulate-General city");
 if(!d.macro.q||!d.macro.y)a("macro","Macro Snapshot – Reporting Period (quarter and year)");
 MF.forEach(f=>{if(d.macro.na[f.k])return;if(d.macro.f[f.k]==="")a("macro","Macro Snapshot – "+f.l.replace(/ \*$/,""));else if(f.fx&&!d.macro.f.ccy)a("macro","Macro Snapshot – currency")});
 if(!d.macro.na.fx&&d.macro.f.fx!==""&&!d.macro.f.ccy){}
 if(!d.trade.q||!d.trade.y)a("trade","Trade Profile – Data As Of (quarter and year)");
 for(const k in TL){if(d.trade.na[k])continue;const L=d.trade[k],t=TL[k],f=t.hs?"h":"c";const n=L.filter(r=>r[f]&&r.v!=="").length;if(n<t.n)a("trade","Trade Profile – "+t.lab+" ("+n+" of "+t.n+" rows complete)")}
 for(const [k,l] of KP){if(!d.kp[k].some(r=>r.key.trim()&&r.industry.trim()))a("kp","Key Players – "+l.replace(/^\d\. /,""))}
 return m}
const readyIssues=d=>{const v=validate(d);return{miss:missing(d),errs:v.err}};

/* ---------- typeahead data ---------- */
const HSMAP=Object.fromEntries(HS4.map(x=>[x[0],x]));
const HSIDX=HS4.map(x=>({c:x[0],t:x[1],lt:x[1].toLowerCase(),lk:x[2]}));
const CURMAP=Object.fromEntries(CUR);
const hsLabel=c=>HSMAP[c]?c+" – "+HSMAP[c][1]:"";
const curLabel=c=>CURMAP[c]?c+" – "+CURMAP[c]:"";
function searchHS(q){q=q.trim().toLowerCase();if(!q)return[];
 if(/^\d+$/.test(q))return HSIDX.filter(x=>x.c.startsWith(q)).slice(0,40).map(x=>[x.c,x.t]);
 const toks=q.split(/[^a-z0-9]+/).filter(Boolean);if(!toks.length)return[];
 const want=new Set((HSALIAS[q]||[]).concat(toks.length===1?[]:[]));
 const res=[];
 for(const x of HSIDX){let sc=0,ok=true;
  for(const t of toks){const re=new RegExp("(^|[^a-z0-9])"+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
   if(re.test(x.lt))sc+=3;else if(x.lt.includes(t))sc+=2;else if(re.test(x.lk))sc+=1;else{ok=false;break}}
  if(ok||want.has(x.c)){if(want.has(x.c))sc+=10;if(x.lt.startsWith(toks[0]))sc+=1;res.push([sc,x])}}
 res.sort((a,b)=>b[0]-a[0]||(a[1].c<b[1].c?-1:1));return res.slice(0,30).map(r=>[r[1].c,r[1].t])}
function searchCur(q){q=q.trim().toLowerCase();if(!q)return[];
 const out=[];for(const [c,n] of CUR){const lc=c.toLowerCase(),ln=n.toLowerCase();let sc=0;
  if(lc===q)sc=100;else if(lc.startsWith(q))sc=80;else if(ln.split(/[^a-z]+/).some(w=>w.startsWith(q)))sc=60;else if(ln.includes(q))sc=40;else if(lc.includes(q))sc=30;
  if(sc)out.push([sc,c,n])}
 out.sort((a,b)=>b[0]-a[0]||(a[1]<b[1]?-1:1));return out.slice(0,12).map(x=>[x[1],x[2]])}
function searchCty(q){q=q.trim().toLowerCase();if(!q)return COUNTRIES.slice(0,40).map(x=>[x,""]);
 const a=[],b=[];for(const c of COUNTRIES){const l=c.toLowerCase();if(l.startsWith(q)||l.split(/[ (-]+/).some(w=>w.startsWith(q)))a.push(c);else if(l.includes(q))b.push(c)}
 return a.concat(b).slice(0,40).map(x=>[x,""])}
function searchCo(q){q=q.trim().toLowerCase();if(q.length<1)return[];return MYCOS.filter(c=>c.toLowerCase().includes(q)).slice(0,8).map(x=>[x,""])}
const CB={hs:{s:searchHS,lab:hsLabel,ph:"Type a product or HS code, e.g. palm, 1511, semiconductor"},cur:{s:searchCur,lab:curLabel,ph:"Type code or name, e.g. MYR or ringgit"},cty:{s:searchCty,lab:x=>x,ph:"Type a country name"},co:{s:searchCo,lab:x=>x,ph:"",free:1}};
function takenFor(path,kind){ // values already selected in sibling rows of the same list
 const m=path.match(/^(trade\.\w+)\.(\d+)\.(h|c)$/);if(!m)return[];const L=getP(D(),m[1]);return L.map((r,i)=>i==m[2]?null:r[m[3]]).filter(Boolean)}
let cbState=null;
function cbClose(){const l=$(".cb-list");if(l)l.remove();cbState=null}
function cbOpen(inp,q){
 cbClose();const kind=inp.dataset.cb,cfg=CB[kind];const path=inp.dataset.p;let items=cfg.s(q);
 const taken=kind==="hs"||kind==="cty"?takenFor(path):[];
 const ul=document.createElement("ul");ul.className="cb-list";ul.setAttribute("role","listbox");ul.id="cbl";
 if(!items.length){ul.innerHTML=`<li class="none">${kind==="co"?"":"No match – try another word or code"}</li>`;if(kind==="co"){return}}
 else ul.innerHTML=items.map(([c,t],i)=>{const dis=taken.includes(c);return `<li role="option" data-v="${esc(c)}" class="${dis?"dis":""}${i===0&&!dis?" on":""}" ${dis?'aria-disabled="true"':""}>${kind==="co"?esc(c):`<b>${esc(c)}</b><span>${esc(t)}${dis?" (already selected)":""}</span>`}</li>`}).join("");
 inp.parentNode.appendChild(ul);inp.setAttribute("aria-expanded","true");inp.setAttribute("aria-controls","cbl");cbState={inp,kind}}
function cbPick(inp,v){const kind=inp.dataset.cb,cfg=CB[kind],p=inp.dataset.p;
 if((kind==="hs"||kind==="cty")&&takenFor(p).includes(v))return false;
 setP(D(),p,v);inp.value=kind==="co"?v:cfg.lab(v);inp.title=inp.value;cbClose();inp.setAttribute("aria-expanded","false");dirty();
 if(kind==="cur")updFx();recheck();return true}
function cbResolve(inp){ // on leaving the box: accept an exact code/name, otherwise revert
 const kind=inp.dataset.cb,cfg=CB[kind],p=inp.dataset.p,t=inp.value.trim();
 if(kind==="co"){const n=normCompany(t);if(n&&n!==t){inp.value=n;setP(D(),p,n);dirty();const fb=document.getElementById("fb-"+p.replace(/\./g,"-"));recheck();noteFb(p,"Standardised to “"+n+"”.")}else{setP(D(),p,t);dirty();recheck()}return}
 const cur=getP(D(),p);
 if(!t){if(cur){setP(D(),p,"");dirty();recheck()}return}
 if(cfg.lab(cur)===t){inp.value=t;return}
 let hit=null;const up=t.toUpperCase();
 if(kind==="hs"){const c=t.split(/\s|–/)[0];if(HSMAP[c]&&/^\d{4}$/.test(c))hit=c}
 else if(kind==="cur"){const c=t.split(/\s|–/)[0].toUpperCase();if(CURMAP[c])hit=c;else{const r=CUR.filter(x=>x[1].toLowerCase()===t.toLowerCase());if(r.length===1)hit=r[0][0]}}
 else{hit=COUNTRIES.find(c=>c.toLowerCase()===t.toLowerCase())||null}
 if(hit&&!((kind==="hs"||kind==="cty")&&takenFor(p).includes(hit))){cbPick(inp,hit);return}
 inp.value=cfg.lab(cur);noteFb(p,hit?"That one is already selected in another row.":"Please pick an item from the list.","w")}
function noteFb(p,msg,lv){const e=document.getElementById("fb-"+p.replace(/\./g,"-"));if(e){e.dataset.h="~note";e.insertAdjacentHTML("beforeend",`<div><span class="${lv==="w"?"w":"o"}">${esc(msg)}</span></div>`)}}
function normCompany(v){const l=v.trim().toLowerCase();if(!l)return null;if(ALIAS[l])return ALIAS[l];const hit=MYCOS.find(c=>c.toLowerCase()===l||c.toLowerCase().replace(/\s*\(.*\)/,"")===l);return hit||null}

/* ---------- views ---------- */
function nav(){const a=ui.view,u=a==="dash"?"dash":"list";
 return `<nav class="tw-nav"><div class="tw-wrap"><div class="tw-bar"><div class="tw-left">
 <div class="tw-logo"><a href="#" data-go="dash" aria-label="Dashboard">${JATA}</a></div>
 <div class="tw-links"><a class="tw-link${u==="dash"?" active":""}" href="#" data-go="dash">Dashboard</a></div>
 <div class="tw-links"><a class="tw-link${u==="list"?" active":""}" href="#" data-go="list">Economic Dossier Report</a></div></div>
 <div class="tw-right"><button class="tw-user" type="button" id="usrbtn" aria-haspopup="true"><span>${MISSION}</span>${CHEV}</button>
 <div class="tw-menu" id="usrmenu"><a href="#" data-noop>Profile</a><a href="#" data-logout>Log Out</a></div></div>
 <div class="tw-burger"><button type="button" id="burger" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button></div></div></div>
 <div class="tw-resp${ui.navOpen?" open":""}" id="resp"><div style="padding:.5rem 0 .75rem"><a class="tw-rlink${u==="dash"?" active":""}" href="#" data-go="dash">Dashboard</a><a class="tw-rlink${u==="list"?" active":""}" href="#" data-go="list">Economic Dossier Report</a></div>
 <div class="tw-rinfo"><b>${MISSION}</b><span>${EMAIL}</span><div style="margin-top:.5rem"><a class="tw-rlink" href="#" data-noop>Profile</a><a class="tw-rlink" href="#" data-logout>Log Out</a></div></div></div></nav>`}
const head=h=>`<header class="tw-head"><div class="tw-wrap">${h}</div></header>`;
const area=e=>e;
function counts(){const L=Object.values(S.dossiers).filter(d=>!ui.area||d.econ===ui.area);
 return{t:L.length,p:L.filter(d=>d.status==="Pending").length,a:L.filter(d=>d.status==="Approved").length,r:L.filter(d=>d.status==="Action").length}}
function vDash(){const c=counts(),tile=(l,v,col,i)=>`<div class="col-12 col-sm-6 col-md-3"><div class="card p-4 shadow-sm border-0 rounded-4 bg-white d-flex flex-row align-items-center justify-content-between"><div><small class="text-muted text-uppercase fw-bold mb-1 d-block" style="font-size: 10px;">${l}</small><h3 class="fw-bold m-0">${v}</h3></div><div class="p-3 bg-${col} bg-opacity-10 text-${col} rounded-4">${ico(i,"","1.5rem")}</div></div></div>`;
 const big=(l,v,u,col,i)=>`<div class="col-12 col-md-4"><div class="card p-4 shadow-sm border-0 rounded-4 d-flex flex-row align-items-center justify-content-between bg-white"><div><small class="text-muted text-uppercase fw-bold d-block mb-1" style="font-size: 11px;">${l}</small><h2 class="fw-bold text-dark m-0">${v}${u?` <span class="fs-6 text-muted fw-normal">${u}</span>`:""}</h2></div><div class="p-3 bg-light rounded-4 text-${col}">${ico(i,"","1.75rem")}</div></div></div>`;
 const chips=S.order.map(e=>{const on=ui.area===e;return `<button type="button" data-area="${esc(e)}" aria-pressed="${on}" class="badge ${on?"bg-primary text-white border-primary":"bg-light text-dark"} border px-3 py-2 rounded-pill" style="font-size:.75rem;font-weight:600;cursor:pointer">${e==="Yemen"?"Republic of Yemen":esc(e)}</button>`}).join("");
 return head(`<h2 class="fw-semibold fs-4 text-dark mb-0" style="line-height:1.25">Dashboard</h2>`)+`<main><div class="py-5 bg-light"><div class="container-xl">
 <div class="mb-3 mt-2"><h5 class="fw-bold text-dark m-0" style="font-size:17px;">Malaysia's Current Economic</h5><small class="text-muted fw-medium">${ico("clock","me-1 text-primary")} Data Period: Jan - July 2026</small></div>
 <div class="row g-3 mb-4">${big("GDP Growth","5.40 %","","success","up")}${big("Total Land Size","330803.10","Sq KM","primary","geo")}${big("Total Population","34.2","Mil","info","ppl")}</div>
 <div class="card p-4 shadow-sm border-0 rounded-4 mb-4 bg-white"><div class="row align-items-center"><div class="col-md-2 border-end py-1"><h6 class="fw-bold text-dark m-0">Areas Covered</h6><small class="text-muted d-block mt-1">Muscat</small></div>
 <div class="col-md-10 ps-md-4 mt-2 mt-md-0"><div class="d-flex flex-wrap gap-2 align-items-center">${chips}<span class="text-muted small ms-1">${ui.area?`Showing ${esc(ui.area)} only · <a href="#" data-area="">show all</a>`:"Select an area to filter the figures below"}</span></div></div></div></div>
 ${returnedPanel()}<div class="row g-3">${tile("Total Reports",c.t,"primary","folder")}${tile("Pending Approval",c.p,"warning","hour")}${tile("Approved Reports",c.a,"success","ok")}${tile("Requires Action",c.r,"danger","warn")}</div></div></div></main>`}
function vList(){const L=S.order.filter(e=>!ui.area||e===ui.area).map(e=>S.dossiers[e]);
 const rowsH=L.map(d=>{const st=STAT[d.status];return `<tr><td class="fw-semibold">${esc(d.type)} [${esc(d.econ)}]</td><td>2026 (Jan-June)</td><td><span class="badge text-bg-${st[1]}${st[1]==="warning"?" text-dark":""}">${st[0]}</span>${d.note&&d.status==="Action"?`<div class="small text-danger mt-1">${esc(d.note)}</div>`:""}</td>
  <td class="text-end text-nowrap">${d.status==="Draft"||d.status==="Action"?`<a href="#" class="btn btn-primary btn-sm rounded-3 px-3" data-edit="${esc(d.econ)}">Edit</a>`:""} <a href="#" class="btn btn-outline-secondary btn-sm rounded-3 px-3" data-view="${esc(d.econ)}">View</a></td></tr>`}).join("");
 return head(`<div class="d-flex justify-content-between align-items-center mb-0"><h2 class="fw-bold fs-4 text-dark mb-0">Economic Dossier Report</h2></div>`)+`<main><div class="container-xl my-5"><div class="card shadow-sm border rounded-3"><div class="card-body p-0"><div class="table-responsive"><table class="table align-middle mb-0"><thead class="table-light small text-uppercase"><tr><th>Economic Dossier</th><th>Phase</th><th>Status</th><th></th></tr></thead><tbody>${rowsH||'<tr><td colspan="4" class="text-muted p-3">No record</td></tr>'}</tbody></table></div></div></div>
 ${ui.area?`<p class="small text-muted mt-2">Filtered by area: ${esc(ui.area)} · <a href="#" data-area="">show all</a></p>`:""}</div></main>`}

const fbx=p=>`<div class="fb" id="fb-${p.replace(/\./g,"-")}" role="status" aria-live="polite"></div>`;
const naBox=(p,on)=>`<label class="na-chk"><input type="checkbox" data-na="${p}" ${on?"checked":""}>Data not available</label>`;
function numIn(p,ph,o){o=o||{};return `<input type="text" inputmode="decimal" autocomplete="off" id="${pid(p)}" data-p="${p}" data-num="1" ${o.neg?'data-neg="1"':""} value="${esc(getP(D(),p))}" placeholder="${esc(ph)}" class="form-control form-control-sm rounded-3 ${o.cls||""}" ${o.dis?"disabled":""}>`}
function cbIn(p,kind,ph,o){o=o||{};const v=getP(D(),p),shown=kind==="co"?v:CB[kind].lab(v);
 return `<div class="cb"><input type="text" id="${pid(p)}" data-p="${p}" data-cb="${kind}" role="combobox" aria-autocomplete="list" aria-expanded="false" autocomplete="off" value="${esc(shown)}" title="${esc(shown)}" placeholder="${esc(ph||CB[kind].ph)}" class="form-control form-control-sm rounded-3 ${o.cls||""}" ${o.dis?"disabled":""}></div>`}
function periodSel(p,d,lab,note,id){const o=getP(d,p);
 return `<div class="d-flex align-items-center gap-3 flex-wrap"><label class="form-label fw-bold small text-dark mb-0" for="${pid(p+".q")}">${lab}</label>
 <select id="${pid(p+".q")}" data-p="${p}.q" class="form-select form-select-sm w-auto" aria-label="Quarter"><option value="">Quarter</option>${[1,2,3,4].map(q=>`<option value="${q}"${o.q==q?" selected":""}>Q${q}</option>`).join("")}</select>
 <select id="${pid(p+".y")}" data-p="${p}.y" class="form-select form-select-sm w-auto" aria-label="Year"><option value="">Year</option>${YEARS.map(y=>`<option${o.y==y?" selected":""}>${y}</option>`).join("")}</select>
 <small class="text-muted fst-italic" id="asat-${id}">${o.q&&o.y?"Data as at "+asAt(o.q,o.y):""}</small></div>`}
function paneSA(d){return `<h4 class="fw-bold pb-2">Strategic Assessment and Emerging Trends</h4>
 <small class="text-muted d-block mb-2 border-bottom mb-4" style="text-align: justify; line-height: 1.3;"><i>Focus on developments during the current reporting period rather than repeating historical background. Where possible, explain what has changed, why it matters, and whether it requires further monitoring or follow-up.</i></small>
 <div class="d-flex align-items-center gap-3 flex-wrap mb-4"><label class="form-label fw-semibold small text-dark mb-0" for="f-type">Report Type *</label>
 <select id="f-type" data-p="type" data-rr="sa" class="form-select form-select-sm w-auto"><option${d.type==="Country"?" selected":""}>Country</option><option${d.type==="Consulate-General"?" selected":""}>Consulate-General</option></select>
 ${d.type==="Consulate-General"?`<input type="text" id="f-city" data-p="city" value="${esc(d.city)}" class="form-control form-control-sm rounded-3 w-auto" placeholder="City / Consulate-General, e.g., Jeddah" aria-label="City or Consulate-General">`:""}
 <small class="text-muted fst-italic">${d.type==="Country"?"National-level report for the host country.":"City-level report – figures should be for the host country as a whole unless stated."}</small></div>
 <form data-form="sa" novalidate>${SA.map(s=>`<div class="mb-4"><div class="mb-3"><label class="form-label fw-semibold small text-dark mb-1" for="${pid("sa."+s[0])}">${s[1]}</label>
 <small class="text-muted d-block mb-2" style="text-align: justify; line-height: 1.3;"><i>${esc(s[2])}</i></small>
 <textarea class="form-control rounded-3" id="${pid("sa."+s[0])}" data-p="sa.${s[0]}" data-cnt="1" rows="15" style="font-family: inherit; font-size: 0.85rem;" placeholder="${esc(s[3])}">${esc(d.sa[s[0]])}</textarea><div class="cnt" id="cnt-${s[0]}"></div></div></div>`).join("")}
 ${foot("Save Strategic Assessment","sa")}</form>`}
const foot=(t,k)=>`<div class="modal-footer mt-3 text-end d-flex justify-content-end align-items-center gap-3"><span class="small text-muted unsaved" hidden>You have unsaved changes</span><button class="btn btn-success waves-effect waves-light btn-sm" type="submit" data-save="${k}">${ico("save")}&nbsp; ${t}</button></div>`;
function paneMacro(d){const m=d.macro,c=m.f.ccy;
 const field=f=>{const p="macro.f."+f.k,na=m.na[f.k];
  let ctl;
  if(f.fx)ctl=`<div class="mb-2">${cbIn("macro.f.ccy","cur","Type code or name, e.g. MYR or ringgit",{dis:na})}${fbx("macro.f.ccy")}</div>
   <div class="input-group input-group-sm"><span class="input-group-text bg-light text-secondary border-end-0" style="font-size: 0.78rem;">1 USD =</span>${numIn(p,f.ph,{dis:na,cls:"rounded-0"})}<span class="input-group-text bg-light text-secondary" style="font-size: 0.78rem;min-width:3.4rem;justify-content:center" id="fxccy">${esc(c||"—")}</span></div>`;
  else ctl=numIn(p,f.ph,{neg:f.neg,dis:na});
  return `<div class="col-12 col-md-6 mb-4"><label class="form-label fw-semibold small text-dark mb-0" for="${pid(f.fx?"macro.f.ccy":p)}">${f.l}</label>${naBox("macro.na."+f.k,na)}
  <small class="d-block text-muted mb-2" style="font-size: 0.78rem; text-align: justify;"><i>${f.fx?"Choose the local currency, then enter how many units of it equal 1 USD.":f.h}</i></small>${ctl}${fbx(p)}${f.fx?`<div class="small text-muted mt-1" id="fxcap"></div>`:""}</div>`};
 return `<h4 class="fw-bold border-bottom pb-2 mb-3">Macro Snapshot</h4><div class="container-fluid p-0"><form data-form="macro" novalidate>
 <div class="card shadow-sm border-0 mb-4 bg-light"><div class="card-body p-3">${periodSel("macro",d,"Reporting Period *","","macro")}<small class="text-muted d-block mt-1" style="font-size: 0.78rem;"><i>Select the reporting period of the macro snapshot</i></small></div></div>
 <div class="card shadow-sm border-0 rounded-3"><div class="card-body pt-4 px-4">${[["growth","gdp"],["pc",""],["pop","popg"],["fx","infl"],["rate",""]].map(pr=>`<div class="row align-items-end">${pr.map(k=>k?field(MF.find(f=>f.k===k)):`<div class="col-12 col-md-6"></div>`).join("")}</div>`).join("")}</div></div>${foot("Save Macro Snapshot","macro")}</form></div>`}
function tradeCard(d,k){const t=TL[k],L=d.trade[k],na=d.trade.na[k],f=t.hs?"h":"c";
 const rowsH=L.map((r,i)=>{const pv=`trade.${k}.${i}.v`,pf=`trade.${k}.${i}.${f}`;
  const sel=t.asean?`<select id="${pid(pf)}" data-p="${pf}" data-asean="1" class="form-select form-select-sm rounded-3" aria-label="ASEAN partner ${i+1}" ${na?"disabled":""}><option value="">-- Select ASEAN Country --</option>${ASEAN.map(a=>`<option${r.c===a?" selected":""}${L.some((x,j)=>j!==i&&x.c===a)?" disabled":""}>${a}</option>`).join("")}</select>`:cbIn(pf,t.hs?"hs":"cty",t.hs?"-- Select HS4 heading: type a product or code (e.g. palm, 1511) --":"-- Select Country: type to search --",{dis:na});
  return `<div class="mb-3"><div class="rowfx"><span class="text-secondary small font-weight-bold n">${i+1}.</span><div class="c1">${sel}</div><div class="c2"><input type="text" inputmode="decimal" autocomplete="off" id="${pid(pv)}" data-p="${pv}" data-num="1" value="${esc(r.v)}" placeholder="Amount (Millions USD) e.g., ${t.hs?"850.2":"850.2"}" aria-label="${esc(t.lab)} amount row ${i+1}" class="form-control form-control-sm rounded-3" ${na?"disabled":""}></div></div>${fbx(pf)}${fbx(pv)}</div>`}).join("");
 return `<div class="card mb-4 border shadow-sm rounded-3"><div class="card-header bg-white d-flex flex-column py-3 border-bottom-0"><div class="d-flex flex-wrap align-items-center"><label class="form-label fw-semibold small text-secondary mb-0">${t.t}</label>${naBox("trade.na."+k,na)}</div><p class="text-muted small mb-0 mt-1 fst-italic">${t.h}</p></div>
 <div class="card-body pt-0"><div class="d-flex flex-column">${rowsH}</div>${fbx("trade."+k)}</div></div>`}
function paneTrade(d){return `<h4 class="fw-bold border-bottom pb-2 mb-3">Trade Profile</h4><div class="container-fluid p-0"><div><p class="text-muted small">Please fill in the trade details for this profile.</p></div><form data-form="trade" novalidate>
 <div class="row"><p class="text-muted small fst-italic">Select the quarter that represents the most recent published trade data available from the host country.</p><div class="col-12 mb-3">${periodSel("trade",d,"Data As Of *","","trade")}</div></div>
 ${["ex","im","gl","as"].map(k=>tradeCard(d,k)).join("")}${foot("Save Trade Profile","trade")}</form></div>`}
function kpCard(d,[k,l,h,p1,p2]){const L=d.kp[k];
 return `<div class="card mb-4 border shadow-sm rounded-3"><div class="card-header bg-white d-flex flex-column py-3 border-bottom-0"><label class="form-label fw-semibold small text-secondary mb-0">${esc(l)}</label><p class="text-muted small mb-0 mt-1 fst-italic">${esc(h)}</p></div>
 <div class="card-body pt-0"><div class="d-flex flex-column">${L.map((r,i)=>{const pk=`kp.${k}.${i}.key`,pi=`kp.${k}.${i}.industry`;
  return `<div class="mb-3"><div class="rowfx"><span class="text-secondary small font-weight-bold n">${i+1}.</span><div class="c1">${k==="my"?cbIn(pk,"co",p1):`<input type="text" id="${pid(pk)}" data-p="${pk}" value="${esc(r.key)}" placeholder="${esc(p1)}" aria-label="${esc(l)} name ${i+1}" class="form-control form-control-sm rounded-3">`}</div>
  <div class="c1"><input type="text" id="${pid(pi)}" data-p="${pi}" value="${esc(r.industry)}" placeholder="${esc(p2)}" aria-label="${esc(l)} industry ${i+1}" class="form-control form-control-sm rounded-3"></div>
  <div style="width: 45px;" class="text-center">${i===L.length-1&&L.length<KPMAX?`<button type="button" data-addrow="${k}" class="btn btn-primary btn-sm px-3 rounded-3" aria-label="Add row to ${esc(l)}">＋</button>`:i>0?`<button type="button" data-delrow="${k}.${i}" class="btn btn-outline-secondary btn-sm px-2 rounded-3" aria-label="Remove row ${i+1}">×</button>`:""}</div></div>${fbx(pk)}</div>`}).join("")}</div></div></div>`}
function paneKP(d){return `<h4 class="fw-bold border-bottom pb-2 mb-3">Key Players</h4><div class="container-fluid p-0"><div><p class="text-muted small">List Top 3 corporation that Mission deems imported</p></div><form data-form="kp" novalidate>${KP.map(x=>kpCard(d,x)).join("")}${foot("Save Key Players","kp")}</form></div>`}
const TABS=[["sa","📝 Strategic Assessment"],["macro","🌍 Macro Snapshot"],["trade","📈 Trade Profile"],["kp","👥 Key Players"]];
function vEdit(){const d=D(),ro=d.status==="Pending"||d.status==="Approved";
 return head(`<div class="d-flex justify-content-between align-items-center d-print-none mb-3"><h2 class="fw-bold fs-4 text-dark mb-0">Economic Dossier Report</h2><div class="d-flex gap-2"><a href="#" data-go="list" class="btn btn-secondary text-white btn-sm rounded-3 text-secondary border-0 px-3 py-2 transition-colors">← Back to Report List</a></div></div>`)+
 `<main><div class="container-xl my-5"><div class="row g-4 mb-5"><div><div class="custom-card"><div class="card-blue-header"><h1>Economic Dossier: ${esc(d.type)} [ ${esc(d.econ)}]</h1><p>Mission : Muscat</p><p>Phase: 2026 ( Jan-June )</p><p class="instruction-text">Change the information below and click save to update the database.</p></div>
 <div class="card-body p-4"><div class="row"><div class="col-md-4 col-lg-3"><div class="nav flex-column nav-pills me-3 gap-2" role="tablist" aria-orientation="vertical">
 ${TABS.map(([k,l])=>`<button class="nav-link text-start px-4 py-2 rounded-pill${ui.tab===k?" active":""}" id="tab-${k}" data-tab="${k}" type="button" role="tab" aria-controls="pane-${k}" aria-selected="${ui.tab===k}">${l}</button>`).join("")}
 <a href="#" data-view="${esc(d.econ)}" class="nav-link text-start px-4 py-2 rounded-pill text-decoration-none">👁️‍🗨️ View and Send</a></div></div>
 <div class="col-md-8 col-lg-9 mt-3 mt-md-0"><div class="tab-content bg-light p-4 rounded-4 shadow-sm border h-100">
 ${d.status==="Action"?remarksAlert(d):""}${ro?`<div class="alert alert-info py-2 small" role="alert">This report has been submitted and can no longer be edited.</div>`:""}
 <fieldset ${ro?"disabled":""} style="border:0;padding:0;margin:0;min-width:0">
 ${[["sa",paneSA],["macro",paneMacro],["trade",paneTrade],["kp",paneKP]].map(([k,f])=>`<div class="tab-pane fade${ui.tab===k?" show active":""}" id="pane-${k}" role="tabpanel" aria-labelledby="tab-${k}" tabindex="0">${d.status==="Action"?secComment(d,k):""}${f(d)}</div>`).join("")}</fieldset>
 </div></div></div></div></div></div></div></div></main>`}

function vView(){const d=D(),m=d.macro,T=d.trade,I=readyIssues(d),st=STAT[d.status];
 const nr='<span class="text-muted small ps-2">- No record -</span>',nA='<span class="text-muted small ps-2">- Not available -</span>';
 const mv=(k,u)=>{if(m.na[k])return "N/A";const v=m.f[k];return v===""?"-"+(u?" "+u:""):(k==="fx"?`1 USD = ${esc(v)} ${esc(m.f.ccy)}`:esc(fmt(num(v)||0,4))+(u?" "+u:""))};
 const MY={growth:"5.60 %",gdp:"- Billion",pc:"-",pop:"34.4 Million",popg:"- %",fx:"-",infl:"- %",rate:"- %"};
 const U={growth:"%",gdp:"Billion",pc:"",pop:"Million",popg:"%",fx:"",infl:"%",rate:"%"};
 const lst=(k)=>{if(T.na[k])return nA;const t=TL[k],f=t.hs?"h":"c",L=T[k].filter(r=>r[f]&&r.v!=="");if(!L.length)return nr;
  return `<table class="table table-sm table-borderless mb-0 small">${L.map((r,i)=>`<tr><td style="width:2rem" class="text-muted">${i+1}.</td><td>${esc(t.hs?hsLabel(r.h):r.c)}</td><td class="text-end text-nowrap">USD ${esc(fmt(num(r.v)||0))} million</td></tr>`).join("")}</table>`};
 const kp=k=>{const L=d.kp[k].filter(r=>r.key.trim());return L.length?`<ul class="mb-0 small ps-3">${L.map(r=>`<li>${esc(r.key)}${r.industry?` <span class="text-muted">– ${esc(r.industry)}</span>`:""}</li>`).join("")}</ul>`:nr};
 const lbl=(t,x)=>`<td class="bg-light fw-bold text-secondary text-uppercase small ${x||""}" ${x?"":'style="width: 25%;"'}>${t}</td>`;
 const issues=I.miss.length||I.errs.length?`<div class="alert alert-warning small d-print-none" role="alert" id="issues"><b>This report is not ready to submit yet.</b><ul class="mb-0 mt-1">${I.errs.map(e=>`<li class="text-danger">Please correct: ${esc(e.msg)}</li>`).join("")}${I.miss.map(x=>`<li><a href="#" data-edit="${esc(d.econ)}" data-tab2="${x.tab}">${esc(x.l)}</a> is not filled in</li>`).join("")}</ul></div>`:`<div class="alert alert-success small d-print-none py-2" role="alert" id="issues">${ico("ok","me-1")} Completeness check passed – the report is ready to submit.</div>`;
 return head(`<div class="d-flex justify-content-between align-items-center d-print-none mb-3"><h2 class="fw-bold fs-4 text-dark mb-0">Economic Dossier Report Preview</h2><div class="d-flex align-items-center gap-2"><a href="#" data-edit="${esc(d.econ)}" class="btn btn-secondary text-white btn-sm rounded-3 border-0 px-3 py-2 transition-colors">← Back to edit</a><a href="#" id="printbtn" class="btn btn-danger btn-sm rounded-3 px-3 py-2 shadow-sm d-flex align-items-center gap-2">${ico("pdf")} Print Report</a></div></div>`)+
 `<main><div class="container-xl my-5"><div class="row g-4 mb-5"><div><div class="card shadow-sm border rounded-3"><div class="card-header bg-light border-bottom p-4"><h3 class="text-dark fw-bold mb-1">Economic Dossier: ${esc(d.type)} [${esc(d.econ)}]${d.type==="Consulate-General"&&d.city?` – ${esc(d.city)}`:""}</h3>
 <div class="text-secondary small"><span class="me-3">${ico("building")} <strong>Mission:</strong> Muscat</span><span class="me-3">${ico("cal")} <strong>Phase:</strong> 2026 ( Jan-June )</span><span class="badge text-bg-${st[1]}${st[1]==="warning"?" text-dark":""}">${st[0]}</span></div><hr class="my-3">
 <p class="text-muted small mb-0">${ico("info","text-primary")} Please review all information below before making final submission.</p></div>
 <div class="card-body p-4">${issues}
 <div class="mb-5"><h5 class="text-primary fw-bold mb-3 border-bottom pb-2">1. Strategic Assessment and Emerging Trends</h5><div class="table-responsive"><table class="table table-bordered align-middle bg-white mb-0"><tbody>
 ${SA.map(s=>`<tr>${lbl(s[1].replace(/^[ivx]+\) /,"").replace(/ \*$/,""))}<td class="text-dark p-3" style="white-space: pre-line;">${esc(d.sa[s[0]])||"No record"}</td></tr>`).join("")}</tbody></table></div></div>
 <div class="mb-5"><h5 class="text-primary fw-bold mb-3 border-bottom pb-2">2. Macro Snapshot Reporting Period : ${m.q&&m.y?`Q${m.q} ${m.y}`:"Q-"}${m.q&&m.y?` <small class="text-muted fw-normal">(data as at ${asAt(m.q,m.y)})</small>`:""}</h5><div class="table-responsive"><table class="table table-bordered align-middle bg-white mb-0"><thead class="table-dark small text-uppercase"><tr><th style="width: 40%;">Macro Economic Indicators</th><th style="width: 30%;" class="text-center">${esc(d.econ)}</th><th style="width: 30%;" class="text-center">Malaysia</th></tr></thead><tbody>
 ${MF.map(f=>`<tr><td class="bg-light fw-bold text-secondary text-uppercase small p-3">${f.l.replace(/^[ivx]+\) /,"").replace(/ \*$/,"")}</td><td class="text-center ${f.k==="growth"?"fw-bold ":""}text-dark p-3">${f.fx&&!m.na.fx&&m.f.fx!==""?mv("fx"):mv(f.k,U[f.k])}</td><td class="text-center text-dark p-3">${MY[f.k]}</td></tr>`).join("")}</tbody></table></div></div>
 <div class="mb-5"><h5 class="text-primary fw-bold mb-3 border-bottom pb-2">3. Trade Profile Data As Of ${T.q&&T.y?`Q${T.q} ${T.y}`:"Q-"}${T.q&&T.y?` <small class="text-muted fw-normal">(data as at ${asAt(T.q,T.y)})</small>`:""}</h5><div class="table-responsive"><table class="table table-bordered align-middle bg-white mb-0"><tbody>
 ${["ex","im","gl","as"].map(k=>`<tr>${lbl(TL[k].lab,"align-top p-3")}<td class="p-2">${lst(k)}</td></tr>`).join("")}</tbody></table></div></div>
 <div class="mb-5"><h5 class="text-primary fw-bold mb-3 border-bottom pb-2">4. Key Players</h5><div class="table-responsive"><table class="table table-bordered align-middle bg-white mb-0"><tbody>
 ${[["local","Major Local Companies"],["mnc","Multinational Corporations (MNCs)"],["my","Major Malaysian Players"],["watch","Strategic Watchlist"],["assoc","Key Business Associations / Chambers"]].map(([k,l])=>`<tr>${lbl(l,"align-top p-3")}<td class="p-2">${kp(k)}</td></tr>`).join("")}</tbody></table></div></div>
 <div class="modal-footer mt-5 pt-3 border-top text-end text-right d-flex justify-content-end gap-2 d-print-none"><button type="button" id="jsonbtn" class="btn btn-outline-secondary btn-sm rounded-3">Download JSON</button>
 ${d.status==="Draft"||d.status==="Action"?`<button type="button" id="submitbtn" class="btn btn-primary btn-sm px-5 rounded-3 fw-bold shadow-sm">${ico("send")} Submit Report</button>`:""}</div></div></div></div></div></div></main>`}

/* ---------- shell, events ---------- */
function render(){const v=ui.view;
 if(v==="login"){$("#app").innerHTML=vLogin();window.scrollTo(0,0);return}
 if(ui.role==="sec"){renderSec();return}
 $("#app").innerHTML=nav()+(v==="dash"?vDash():v==="list"?vList():v==="edit"?vEdit():vView());
 if(v==="edit"){recheck();updFx();$$("textarea[data-cnt]").forEach(cnt)}window.scrollTo(0,0)}
function go(view,econ,tab){if(ui.view==="edit"&&ui.dirty&&!confirm("You have unsaved changes. Leave this page without saving?"))return;ui.dirty=false;ui.view=view;if(econ)ui.cur=econ;if(tab)ui.tab=tab;ui.navOpen=false;render()}
function dirty(){if(!ui.dirty){ui.dirty=true}$$(".unsaved").forEach(e=>e.hidden=false)}
window.addEventListener("beforeunload",e=>{if(ui.dirty){e.preventDefault();e.returnValue=""}});
function updFx(){const d=D();if(!d)return;const c=d.macro.f.ccy,e=$("#fxccy");if(e)e.textContent=c||"—";
 const cap=$("#fxcap");if(cap){const fx=d.macro.f.fx;cap.textContent=c?(fx!==""&&!isNaN(num(fx))?`1 USD = ${fx} ${c}`:`1 USD = [rate] ${c}`)+" ("+CURMAP[c]+")":""}}
function cnt(t){const e=$("#cnt-"+t.dataset.p.split(".")[1]);if(!e)return;const n=t.value.length;e.textContent=`${fmt(n,0)} / ${fmt(SALIM,0)} characters`+(n>SALIM?" – longer than recommended; please keep it concise":"");e.className="cnt"+(n>SALIM?" over":"")}
function recheck(){const d=D();if(!d)return;const V=validate(d);ui.V=V;
 const H={};$$(".is-bad,.is-warn").forEach(e=>e.classList.remove("is-bad","is-warn"));
 for(const p in V.m){const fb=document.getElementById("fb-"+p.replace(/\./g,"-"));const el=document.getElementById(pid(p));
  const lv=V.m[p].some(x=>x.lv==="e")?"e":V.m[p].some(x=>x.lv==="w")?"w":"o";
  if(el&&lv!=="o")el.classList.add(lv==="e"?"is-bad":"is-warn");
  if(fb)H[fb.id]=V.m[p].map(x=>`<div><span class="${x.lv}">${esc(x.msg)}</span>${x.fix>=0?`<button type="button" class="btn btn-outline-primary" data-fix="${x.fix}">${esc(V.fx[x.fix].label||"Convert for me")}</button>`:""}</div>`).join("")}
 $$(".fb").forEach(e=>{const h=H[e.id]||"";if(e.dataset.h!==h){e.innerHTML=h;e.dataset.h=h}});
 updFx()}
function swal(icon,title,text,list){return new Promise(res=>{const b=document.createElement("div");b.className="swal-bd";
 const ic=icon==="success"?'<svg viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>':icon==="error"?'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>':"!";
 b.innerHTML=`<div class="swal-pop" role="dialog" aria-modal="true" aria-labelledby="swt"><div class="swal-icon ${icon}">${ic}</div><h2 id="swt">${esc(title)}</h2><div class="swal-text">${esc(text)}${list?`<ul>${list.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}</div><button class="btn btn-primary" type="button">OK</button></div>`;
 document.body.appendChild(b);const ok=$("button",b);ok.focus();const close=()=>{b.remove();res()};ok.onclick=close;b.addEventListener("keydown",e=>{if(e.key==="Escape")close()});b.addEventListener("mousedown",e=>{if(e.target===b)close()})})}
function applyFix(i){const f=ui.V.fx[i];if(!f)return;f.set.forEach(([p,v])=>setP(D(),p,v));dirty();const t=ui.tab;rerenderPane(t);}
function rerenderPane(t){const d=D(),f={sa:paneSA,macro:paneMacro,trade:paneTrade,kp:paneKP}[t];$("#pane-"+t).innerHTML=(d.status==="Action"?secComment(d,t):"")+f(d);$$("textarea[data-cnt]").forEach(cnt);recheck()}
function download(name,type,text){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
const TABPFX={sa:"sa.",macro:"macro.",trade:"trade.",kp:"kp."};
async function save(t){const d=D(),V=validate(d);const errs=V.err.filter(e=>e.p.startsWith(TABPFX[t]));
 if(errs.length){recheck();await swal("error","Please check the highlighted fields","These entries cannot be saved yet:",errs.slice(0,4).map(e=>e.msg.length>140?e.msg.slice(0,137)+"…":e.msg));const el=document.getElementById(pid(errs[0].p));if(el)el.focus();return}
 d.updated=new Date().toISOString();persist();audit("mission:"+d.econ,"Saved "+t+" tab",MISSION);ui.dirty=false;$$(".unsaved").forEach(e=>e.hidden=true);await swal("success","Saved!","Data has been saved")}
document.addEventListener("click",e=>{const t=e.target;
 if(!t.closest(".cb"))cbClose();
 let a;
 if((a=t.closest("[data-go]"))){e.preventDefault();go(a.dataset.go);return}
 if(t.closest("[data-noop]")){e.preventDefault();return}
 if((a=t.closest("[data-area]"))){e.preventDefault();ui.area=a.dataset.area===ui.area?"":a.dataset.area;render();return}
 if((a=t.closest("[data-edit]"))){e.preventDefault();go("edit",a.dataset.edit,a.dataset.tab2||ui.tab);return}
 if((a=t.closest("[data-view]"))){e.preventDefault();go("view",a.dataset.view);return}
 if((a=t.closest("[data-tab]"))){ui.tab=a.dataset.tab;$$("[data-tab]").forEach(b=>{const on=b.dataset.tab===ui.tab;b.classList.toggle("active",on);b.setAttribute("aria-selected",on)});$$(".tab-pane").forEach(p=>{const on=p.id==="pane-"+ui.tab;p.classList.toggle("active",on);p.classList.toggle("show",on)});return}
 if(t.closest("#usrbtn")){$("#usrmenu").classList.toggle("open");return}else if($("#usrmenu"))$("#usrmenu").classList.remove("open");
 if(t.closest("#burger")){ui.navOpen=!ui.navOpen;$("#resp").classList.toggle("open",ui.navOpen);return}
 if((a=t.closest("[data-fix]"))){applyFix(+a.dataset.fix);return}
 if((a=t.closest(".cb-list li"))){if(!a.classList.contains("dis")&&a.dataset.v!=null&&cbState)cbPick(cbState.inp,a.dataset.v);return}
 if((a=t.closest("[data-addrow]"))){const k=a.dataset.addrow,L=D().kp[k];if(L.length<KPMAX){L.push(kr());dirty();rerenderPane("kp");const el=document.getElementById(pid(`kp.${k}.${L.length-1}.key`));if(el)el.focus()}return}
 if((a=t.closest("[data-delrow]"))){const[k,i]=a.dataset.delrow.split(".");D().kp[k].splice(+i,1);dirty();rerenderPane("kp");return}
 if((a=t.closest("[data-save]"))){e.preventDefault();save(a.dataset.save);return}
 if(t.closest("#printbtn")){e.preventDefault();window.print();return}
 if(t.closest("#jsonbtn")){download(`dossier_${D().econ}.json`,"application/json",JSON.stringify(D(),null,2));return}
 if(t.closest("#submitbtn")){submitReport();return}});
async function submitReport(){const d=D(),I=readyIssues(d);
 if(I.miss.length||I.errs.length){const el=$("#issues");if(el)el.scrollIntoView({block:"center"});await swal("error","Report is not ready","Please complete or correct "+(I.miss.length+I.errs.length)+" item(s) listed at the top of the page before submitting.");return}
 if(!confirm("Are you sure you want to submit this report for approval? Please review all information below before making final submission."))return;
 d.status="Pending";d.updated=new Date().toISOString();persist();audit("mission:"+d.econ,"Submitted for approval",MISSION);await swal("success","Submitted!","The report has been sent for approval (demo only – nothing leaves your browser).");go("list")}
document.addEventListener("submit",e=>e.preventDefault());
document.addEventListener("input",e=>{const t=e.target;if(!t.dataset||!t.dataset.p||ui.view!=="edit")return;
 if(t.dataset.cb){cbOpen(t,t.value);if(t.dataset.cb==="co")setP(D(),t.dataset.p,t.value);dirty();return}
 if(t.dataset.num){let v=t.value.replace(/[^0-9.,\-]/g,"");if(t.dataset.neg)v=v.replace(/(?!^)-/g,"");else v=v.replace(/-/g,"");if(v!==t.value)t.value=v}
 setP(D(),t.dataset.p,t.value);dirty();if(t.dataset.cnt)cnt(t);recheck();
 if(t.dataset.p.endsWith("fx"))updFx()});
document.addEventListener("change",e=>{const t=e.target;if(ui.view!=="edit")return;
 if(t.dataset.na){const k=t.dataset.na.split(".");setP(D(),t.dataset.na,t.checked);if(t.checked&&k[0]==="macro"){D().macro.f[k[2]]="";if(k[2]==="fx"){D().macro.f.ccy=""}}if(t.checked&&k[0]==="trade"){D().trade[k[2]]=rows(TL[k[2]].n,TL[k[2]].hs?"h":"c")}dirty();rerenderPane(k[0]==="macro"?"macro":"trade");return}
 if(!t.dataset.p)return;
 if(t.dataset.num){const n=normNum(t.value);t.value=n;setP(D(),t.dataset.p,n);dirty();recheck();return}
 if(t.dataset.rr){setP(D(),t.dataset.p,t.value);dirty();$(".card-blue-header h1").textContent=`Economic Dossier: ${D().type} [ ${D().econ}]`;rerenderPane(t.dataset.rr);return}
 if(t.tagName==="SELECT"){setP(D(),t.dataset.p,t.value);dirty();
  const m=t.dataset.p.match(/^(macro|trade)\.(q|y)$/);if(m){const o=D()[m[1]];const e2=$("#asat-"+m[1]);if(e2)e2.textContent=o.q&&o.y?"Data as at "+asAt(o.q,o.y):""}
  recheck()}});
document.addEventListener("focusout",e=>{const t=e.target;if(t.dataset&&t.dataset.cb&&ui.view==="edit"){setTimeout(()=>{if(document.activeElement===t)return;const l=$(".cb-list");if(l&&l.matches(":hover"))return;cbResolve(t);cbClose()},120)}});
document.addEventListener("keydown",e=>{const t=e.target;
 if(t.dataset&&t.dataset.cb){const l=$(".cb-list");
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(!l){cbOpen(t,t.value);return}e.preventDefault();const li=$$("li[data-v]:not(.dis)",l);if(!li.length)return;let i=li.findIndex(x=>x.classList.contains("on"));li.forEach(x=>x.classList.remove("on"));i=(i+(e.key==="ArrowDown"?1:-1)+li.length)%li.length;li[i].classList.add("on");li[i].scrollIntoView({block:"nearest"});return}
  if(e.key==="Enter"){const on=l&&$("li.on[data-v]",l);if(on){e.preventDefault();cbPick(t,on.dataset.v)}else{e.preventDefault();cbResolve(t);cbClose()}return}
  if(e.key==="Escape"){cbClose();return}}});
$("#app").addEventListener("mouseover",e=>{const li=e.target.closest(".cb-list li[data-v]");if(li&&!li.classList.contains("dis")){$$(".cb-list li.on").forEach(x=>x.classList.remove("on"));li.classList.add("on")}});
$("#app").addEventListener("mousedown",e=>{if(e.target.closest(".cb-list"))e.preventDefault()});
