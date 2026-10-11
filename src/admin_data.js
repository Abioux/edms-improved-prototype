/* ===== JPDP Secretariat side – sample data (all fictitious; nothing real) ===== */
const AKEY="edms_proto_v3_admin";
const REGIONS=["Americas","Europe","Africa","Middle East","Central Asia","East Asia","South Asia","ASEAN","Oceania"];
/* [mission, kind, region, countries] */
const MISSIONS=[
["Abu Dhabi","Embassy","Middle East",["United Arab Emirates"]],["Abuja","High Commission","Africa",["Nigeria"]],["Almaty","Embassy","Central Asia",[]],["Amman","Embassy","Middle East",["Jordan","Palestine","Syria"]],
["Ankara","Embassy","Middle East",["Türkiye"]],["Astana","Embassy","Central Asia",["Kazakhstan"]],["Bangkok","Embassy","ASEAN",["Thailand"]],["Beijing","Embassy","East Asia",["China"]],
["Berlin","Embassy","Europe",["Germany"]],["Brasilia","Embassy","Americas",["Brazil"]],["Buenos Aires","Embassy","Americas",["Argentina","Uruguay","Paraguay"]],["Cairo","Embassy","Africa",["Egypt"]],
["Canberra","High Commission","Oceania",["Australia"]],["Colombo","High Commission","South Asia",["Sri Lanka"]],["Dhaka","High Commission","South Asia",["Bangladesh"]],["Doha","Embassy","Middle East",["Qatar"]],
["Hanoi","Embassy","ASEAN",["Vietnam"]],["Islamabad","High Commission","South Asia",["Pakistan"]],["Jakarta","Embassy","ASEAN",["Indonesia"]],["Kathmandu","Embassy","South Asia",["Nepal"]],
["Lima","Embassy","Americas",["Peru"]],["London","High Commission","Europe",["United Kingdom"]],["Madrid","Embassy","Europe",["Spain"]],["Manila","Embassy","ASEAN",["Philippines"]],
["Mexico City","Embassy","Americas",["Mexico","Costa Rica"]],["Muscat","Embassy","Middle East",["Oman","Sudan","Yemen"]],["Nairobi","High Commission","Africa",["Kenya"]],["New Delhi","High Commission","South Asia",["India"]],
["Ottawa","High Commission","Americas",["Canada"]],["Paris","Embassy","Europe",["France"]],["Pontianak","Consulate-General","ASEAN",["Indonesia"]],["Pretoria","High Commission","Africa",["South Africa"]],
["Riyadh","Embassy","Middle East",["Saudi Arabia"]],["Rome","Embassy","Europe",["Italy"]],["Seoul","Embassy","East Asia",["Korea (South)"]],["Tashkent","Embassy","Central Asia",["Uzbekistan"]],
["Tehran","Embassy","Middle East",["Iran"]],["Tokyo","Embassy","East Asia",["Japan"]],["Vienna","Embassy","Europe",["Austria"]],["Wellington","High Commission","Oceania",["New Zealand"]]];
const MREGION=Object.fromEntries(MISSIONS.map(m=>[m[0],m[2]]));
const mFull=n=>{const m=MISSIONS.find(x=>x[0]===n);return m?`${m[1]==="High Commission"?"High Commission":m[1]==="Consulate-General"?"Consulate-General":"Embassy"} of Malaysia, ${n}`:n};
const mMail=n=>"mw"+n.toLowerCase().replace(/[^a-z]/g,"")+"@sample.example";
const ROUNDS0=[{id:"2026-2",y:2026,p:2,label:"2026 (July-Dec)",due:"2027-02-15"},{id:"2026-1",y:2026,p:1,label:"2026 (Jan-June)",due:"2026-09-30"},{id:"2025-2",y:2025,p:2,label:"2025 (July-Dec)",due:"2026-02-16"}];
const ROUNDLAB=id=>{const r=ROUNDS0.find(x=>x.id===id);return r?r.label:id};
const PHASELAB={1:"Jan-June",2:"July-Dec"};
/* archetypes: HS4 export/import headings (checked against the HS4 list at load) */
const ARCH={
 mfg:{ex:["8542","8517","8703","8708","8471"],im:["2709","8542","2711","8517","7108"]},
 agri:{ex:["0901","0902","1701","0306","0803"],im:["2710","3102","8703","1001","8517"]},
 oil:{ex:["2709","2711","2710","3901","3102"],im:["8703","8517","1006","3004","8708"]},
 mix:{ex:["8703","3004","8708","8411","8479"],im:["2709","8542","8517","2711","3004"]},
 tex:{ex:["6109","6110","6203","6204","6403"],im:["5201","5205","5407","2710","8445"]},
 svc:{ex:["8703","8541","3004","7108","8803"],im:["2709","8517","8471","3004","2711"]}};
/* [mission,country,status,y,p,gdp(bn),pop(m),growth,infl,rate,ccy,fx,arch,partners(global),aseanPartners,flaw,createdISO] */
const SEEDS=[
["Kathmandu","Nepal","Pending",2026,1,42.3,29.7,3.9,4.3,5.5,"NPR",134,"tex",["India","China","United States"],["Singapore","Thailand","Indonesia"],"textinfl","2026-10-07"],
["New Delhi","India","Pending",2026,1,3910,1425,6.8,4.6,5.5,"INR",84,"mix",["United States","China","United Arab Emirates"],["Singapore","Indonesia","Thailand"],"popraw","2026-10-05"],
["Dhaka","Bangladesh","Pending",2026,1,455,174,4.2,9.1,10,"BDT",120,"tex",["China","India","United States"],["Singapore","Indonesia","Thailand"],"period","2026-10-03"],
["Colombo","Sri Lanka","Pending",2026,1,99.5,22.2,3.1,2.4,8,"LKR",300,"agri",["India","China","United States"],["Singapore","Thailand","Indonesia"],"nogdp","2026-10-04"],
["Tokyo","Japan","Pending",2026,1,4250,123.8,0.9,2.7,0.5,"JPY",150,"mfg",["China","United States","Korea (South)"],["Thailand","Singapore","Vietnam"],"","2026-10-02"],
["Seoul","Korea (South)","Pending",2026,1,1710,51.7,2.1,2.4,3,"KRW",1350,"mfg",["China","United States","Japan"],["Vietnam","Singapore","Thailand"],"","2026-10-01"],
["Canberra","Australia","Pending",2026,1,1790,27.2,1.6,3.3,4.1,"AUD",1.52,"agri",["China","Japan","Korea (South)"],["Singapore","Thailand","Indonesia"],"","2026-10-06"],
["Berlin","Germany","Approved",2026,1,4660,84.5,0.3,2.2,2.4,"EUR",0.92,"mfg",["United States","China","France"],["Singapore","Thailand","Vietnam"],"","2026-09-22"],
["Paris","France","Approved",2026,1,3130,68.4,0.9,1.8,2.4,"EUR",0.92,"mix",["Germany","United States","Italy"],["Singapore","Thailand","Vietnam"],"","2026-09-23"],
["Rome","Italy","Pending",2026,1,2380,58.9,0.8,1.6,2.4,"EUR",0.92,"mix",["Germany","France","United States"],["Singapore","Thailand","Vietnam"],"copyparis","2026-10-08"],
["London","United Kingdom","Approved",2026,1,3590,69.3,1.1,2.9,4.5,"GBP",0.78,"svc",["United States","Germany","China"],["Singapore","Thailand","Vietnam"],"","2026-09-24"],
["Beijing","China","Approved",2026,1,18900,1408,4.8,0.4,3.1,"CNY",7.2,"mfg",["United States","Japan","Korea (South)"],["Vietnam","Thailand","Singapore"],"","2026-09-20"],
["Jakarta","Indonesia","Approved",2026,1,1420,282.4,5,2.5,5.75,"IDR",15800,"agri",["China","United States","Japan"],["Singapore","Malaysia","Thailand"],"","2026-09-29"],
["Pontianak","Indonesia","Pending",2026,2,38.4,5.5,4.9,2.6,5.75,"IDR",15800,"agri",["China","Malaysia","Japan"],["Malaysia","Singapore","Thailand"],"h2late","2026-10-01","CG"],
["Buenos Aires","Argentina","Pending",2026,1,640,46.6,-1.8,38,35,"ARS",950,"agri",["Brazil","China","United States"],["Vietnam","Thailand","Indonesia"],"gdpmil","2026-09-28"],
["Buenos Aires","Uruguay","Approved",2026,1,80.9,3.4,3.1,4.8,8.5,"UYU",40,"agri",["China","Brazil","Argentina"],["Vietnam","Thailand","Indonesia"],"","2026-09-28"],
["Buenos Aires","Paraguay","Approved",2026,1,43.5,6.8,3.8,3.8,6,"PYG",7500,"agri",["Brazil","Argentina","China"],["Vietnam","Thailand","Indonesia"],"","2026-09-30"],
["Mexico City","Costa Rica","Approved",2026,1,95.6,5.2,4.1,0.8,4,"CRC",510,"svc",["United States","China","Mexico"],["Singapore","Thailand","Vietnam"],"","2026-09-28"],
["Riyadh","Saudi Arabia","Approved",2026,1,1110,35.3,3.2,1.9,5.5,"SAR",3.75,"oil",["China","India","Japan"],["Singapore","Indonesia","Thailand"],"","2026-09-25"],
["Abu Dhabi","United Arab Emirates","Approved",2026,1,537,10.1,4.3,2.3,5.4,"AED",3.6725,"oil",["India","China","Japan"],["Singapore","Thailand","Indonesia"],"","2026-09-26"],
["Tehran","Iran","Approved",2026,1,436,89.2,2.7,32,18,"IRR",42000,"oil",["China","United Arab Emirates","Türkiye"],["Indonesia","Thailand","Singapore"],"","2026-10-01"],
["Cairo","Egypt","Action",2026,1,396,112.7,3.6,26,27.25,"EGP",49,"mix",["China","Saudi Arabia","United Arab Emirates"],["Indonesia","Thailand","Singapore"],"tradefull","2026-09-27"],
["Ankara","Türkiye","Action",2026,1,1120,85.8,2.9,42,46,"TRY",36,"mix",["Germany","China","Russia"],["Singapore","Thailand","Indonesia"],"textgrowth","2026-09-26"],
["Lima","Peru","Action",2026,1,274,34.4,2.8,2.1,4.75,"PEN",3.75,"agri",["China","United States","Brazil"],["Thailand","Singapore","Vietnam"],"missing","2026-09-30"],
["Doha","Qatar","Draft",2026,1,213,2.7,2.1,1.2,5,"QAR",3.64,"oil",["China","India","Japan"],["Singapore","Thailand","Indonesia"],"partial","2026-10-09"],
["Ottawa","Canada","Draft",2026,1,2140,40.1,1.4,2.2,3.25,"CAD",1.37,"svc",["United States","China","Mexico"],["Singapore","Vietnam","Thailand"],"partial","2026-10-10"],
["Nairobi","Kenya","Pending",2026,1,112,55.1,4.9,4.2,10.75,"KES",129,"agri",["China","India","United Arab Emirates"],["Indonesia","Singapore","Thailand"],"tradefull","2026-10-02"],
["Pretoria","South Africa","Approved",2025,2,403,63.2,0.6,3.2,7.5,"ZAR",18,"mix",["China","United States","Germany"],["Singapore","Thailand","Indonesia"],"","2026-02-10"],
["Wellington","New Zealand","Approved",2025,2,252,5.3,-0.2,2.7,3.75,"NZD",1.65,"agri",["China","Australia","United States"],["Singapore","Thailand","Indonesia"],"","2026-02-11"],
["Astana","Kazakhstan","Approved",2026,1,288,20.6,5.1,10.8,15.5,"KZT",480,"oil",["China","Russia","Türkiye"],["Singapore","Thailand","Indonesia"],"","2026-09-27"]];
/* Malaysia reference snapshot (sample figures) */
const MY0=[
{y:2027,p:2,growth:"5.50",gdp:"0",pc:"0",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2027,p:1,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2026,p:2,growth:"5.40",gdp:"0",pc:"0",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2026,p:1,growth:"5.40",gdp:"470.0",pc:"13650",pop:"34.2",popg:"1.2",fx:"4.20",infl:"1.5",rate:"3.00"},
{y:2025,p:2,growth:"5.10",gdp:"455.2",pc:"13400",pop:"34.0",popg:"1.2",fx:"4.35",infl:"1.7",rate:"3.00"},
{y:2025,p:1,growth:"5.00",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2024,p:2,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2024,p:1,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2023,p:2,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2023,p:1,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""},
{y:2022,p:1,growth:"5.40",gdp:"",pc:"",pop:"",popg:"",fx:"",infl:"",rate:""}];
const CHK=[["unit_gdp","Update GDP value to USD billion"],["unit_pop","Update population to millions"],["unit_pc","Check GDP per capita (USD per person)"],["unit_trade","Update trade values to USD million"],["missing","Complete the missing macro values"],["text_table","Make the narrative and the table figures agree"],["copied","Rewrite the copied text in your own words"],["period","Align the macro and trade reporting periods"],["partners","Check the trade partner ranking and amounts"],["kp","Complete the Key Players tab"]];
const CHKLAB=Object.fromEntries(CHK);
