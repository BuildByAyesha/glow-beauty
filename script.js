"use strict";
/* ============ GLOWÉ BEAUTY — script.js ============ */

/* ---- helpers ---- */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---- images (all files live in the "images" folder next to index.html) ---- */
const IM=/*IM*/Object.fromEntries(/*KEYS*/["dl0", "dl1", "dl2", "i1", "i10", "i14", "i2", "i5", "i6", "i7", "i8", "i9", "model-cherry-wine", "model-classic-red", "model-dusty-pink", "model-mocha-brown", "model-nude-rose", "model-soft-coral", "n1", "n10", "n11", "n12", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "o1", "o2", "o3", "o4", "o5", "pill0", "pill1", "pill2", "pill3", "pill4"].map(k=>[k,"images/"+k+".jpg"]))/*IME*/;

/* ---- settings you can change ---- */
const IG_HANDLE="";            // your Instagram username, e.g. "glowe.beauty"
const WA_NUMBER="923410739914"; // WhatsApp number in international format (no + or 0)

const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* if an image is not found inside /images, try the same file next to index.html */
document.addEventListener("error",e=>{const i=e.target;if(i.tagName!=="IMG"||i.dataset.fb)return;i.dataset.fb=1;const s=i.getAttribute("src")||"";if(/^images\//.test(s))i.src=s.replace(/^images\//,"")},true);

/* ================= DATA ================= */
const SHADES=[
 {n:"Nude Rose",  c:"#c98f86",bg:"#f0e3d2",f:"Satin",  d:"A sheer rosewood nude with a soft-focus glow.",p:42,m:"model-nude-rose"},
 {n:"Dusty Pink", c:"#c07a96",bg:"#f1c8cb",f:"Velvet", d:"A muted mauve-pink with a velvet whisper.",p:42,m:"model-dusty-pink"},
 {n:"Classic Red",c:"#d62a28",bg:"#e5c7a8",f:"Satin",  d:"A timeless true red with a lacquered shine.",p:44,m:"model-classic-red"},
 {n:"Cherry Wine",c:"#7a1c2e",bg:"#c5a29d",f:"Lacquer",d:"Deep burgundy with a candlelit sheen.",p:44,m:"model-cherry-wine"},
 {n:"Mocha Brown",c:"#8f5a40",bg:"#d4bda4",f:"Cream",  d:"Warm chocolate nude, effortlessly polished.",p:42,m:"model-mocha-brown"}
];
/* To add Soft Coral later: add a shade object here with m:"model-soft-coral", add a matching pill image, and update the "5" counts in index.html */
const S=SHADES.map(s=>[s.n,s.c]);
const FND=[["Porcelain","#f1d5c3"],["Sand","#d9a88a"],["Mocha","#9a6548"]],
      BLS=[["Rose","#e7918e"],["Coral","#f08f72"],["Berry","#b4506b"]],
      HLT=[["Champagne","#ead7a8"],["Pearl","#f3e6e8"],["Gold","#d8b25c"]];

const P=[
 {id:30,n:"Signature Lipstick",c:"Lips",p:42,r:5,t:"pill0",s:S,pr:[42,42,44,44,42],d:"Our hero lipstick in five signature shades. Rich colour, a comfortable cushiony feel and up to 12 hours of wear."},
 {id:1,n:"Velvet Matte Lipstick",c:"Lips",p:28,r:4.9,t:"n2",s:S},
 {id:7,n:"Nude Satin Lipstick",c:"Lips",p:28,r:4.8,t:"n3",s:S},
 {id:8,n:"Maroon Noir Lipstick",c:"Lips",p:30,r:4.9,t:"n1",s:S},
 {id:9,n:"Carved Floral Lipstick",c:"Lips",p:42,r:4.9,t:"n7",s:S},
 {id:6,n:"Nude Lip Gloss",c:"Lips",p:22,r:4.8,t:"i10",s:S},
 {id:5,n:"Peptide Lip Tint Set",c:"Lips",p:34,r:4.6,t:"i2",s:S},
 {id:2,n:"Rose Glow Blush",c:"Face",p:32,r:4.7,t:"i5",s:BLS},
 {id:18,n:"Rose Petal Blush",c:"Face",p:32,r:4.9,t:"o4",s:BLS},
 {id:3,n:"Silk Touch Tinted Moisturizer",c:"Face",p:46,r:4.8,t:"i1",s:FND},
 {id:10,n:"Sunscreen Pressed Powder",c:"Face",p:30,r:4.7,t:"n8",s:FND},
 {id:11,n:"Diamond Glow Highlighter",c:"Face",p:36,r:4.9,t:"n4",s:HLT},
 {id:19,n:"Glow Highlighter Palette",c:"Face",p:40,r:4.8,t:"o1",s:HLT},
 {id:20,n:"Cherub Heart Compact Set",c:"Face",p:48,r:4.9,t:"o3",s:BLS},
 {id:4,n:"Nude Eyeshadow Palette",c:"Eyes",p:36,r:4.9,t:"i6",s:BLS},
 {id:12,n:"Chocolate Eyeshadow Palette",c:"Eyes",p:44,r:4.9,t:"n6",s:BLS},
 {id:13,n:"Butterfly Blush & Shadow Palette",c:"Eyes",p:38,r:4.8,t:"n5",s:BLS},
 {id:21,n:"Strawberry Cupid Palette",c:"Eyes",p:52,r:4.9,t:"o2",s:BLS},
 {id:14,n:"Bordeaux Noir Nail Polish",c:"Nails",p:15,r:4.8,t:"n9",s:[["Bordeaux","#4a0f12"]]},
 {id:15,n:"Ruby Glitter Nail Polish",c:"Nails",p:15,r:4.8,t:"n10",s:[["Ruby","#9b0f1f"]]},
 {id:16,n:"Emerald Holo Nail Polish",c:"Nails",p:15,r:4.8,t:"n11",s:[["Emerald","#0f5f5a"]]},
 {id:17,n:"Rose Holo Nail Polish",c:"Nails",p:15,r:4.8,t:"n12",s:[["Rose Holo","#d9a090"]]}
];
const DESC={
 Lips:"Rich, comfortable colour with a mirror-like finish. Enriched with vitamin E and shea butter. Cruelty-free.",
 Face:"A weightless, skin-loving formula that blends seamlessly for a soft-focus, healthy glow. Cruelty-free.",
 Eyes:"Highly pigmented, silky shades that blend easily and last all day without creasing. Cruelty-free.",
 Nails:"A glossy, chip-resistant polish with salon-quality shine. 10-free and cruelty-free."
};

/* ================= UTILITIES ================= */
const stars=r=>"★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r));
const pp=(p,k)=>p.pr?p.pr[k]:p.p;                 // price of product p in shade k
const pimg=(p,k)=>p.id===30?"pill"+k:p.t;          // image key of product p in shade k
const imgTag=(key,alt)=>`<img src="${IM[key]}" alt="${alt||""}" loading="lazy">`;
function toast(m){const t=$("#tt");t.textContent=m;t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),2600)}
const waLink=text=>"https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(text);

$$("img[data-img]").forEach(i=>i.src=IM[i.dataset.img]);
$("#wa").href=waLink("Hi GLOWÉ BEAUTY! I need help with an order.");

/* ================= STATE ================= */
let si=0,man=0,zi=1,cat="All",qry="",promo=null;
const sel={},cart={},wl=new Set();

/* ================= HERO ================= */
$("#fa").innerHTML=SHADES.map(s=>`<img class="hp" alt="${s.n} look" src="${IM[s.m]}">`).join("");
$("#pl").innerHTML=SHADES.map((s,i)=>`<img class="hp" alt="${s.n} lipstick" src="${IM["pill"+i]}">`).join("");
SHADES.forEach((s,i)=>{const b=document.createElement("button");b.style.background=s.c;b.title=s.n;b.setAttribute("aria-label",s.n);b.onclick=()=>go(i);$("#dt").append(b)});

function wipeIn(el,fromBottom){
  el.style.zIndex=++zi;
  el.animate([{clipPath:fromBottom?"inset(100% 0 0 0)":"inset(0 100% 0 0)",transform:"scale(1.12)"},{clipPath:"inset(0 0 0 0)",transform:"scale(1)"}],
    {duration:rm?1:1100,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});
}
function setShade(i){
  si=(i+SHADES.length)%SHADES.length;const h=SHADES[si];
  document.documentElement.style.setProperty("--shade",h.c);
  $("#top").style.backgroundColor=h.bg;
  $("#sn").textContent=h.n;$("#sd").textContent=h.d;$("#sf").textContent=h.f;
  $("#pr").textContent="$"+h.p;$("#cnt").textContent="0"+(si+1);
  $$("#dt button").forEach((b,k)=>b.classList.toggle("on",k===si));
  wipeIn($$("#fa .hp")[si],0);wipeIn($$("#pl .hp")[si],1);
}
function go(i){man=1;setShade(i)}
$("#pv").onclick=()=>go(si-1);
$("#nx").onclick=()=>go(si+1);
$("#hab").onclick=()=>addC(30,si);
setShade(0);
setInterval(()=>{if(!man&&scrollY<60&&!document.hidden)setShade(si+1)},4600);
/* scrolling inside the tall hero also changes the shade */
addEventListener("scroll",()=>{
  const r=$("#hw").getBoundingClientRect(),p=-r.top/(r.height-innerHeight);
  if(p<0||p>1)return;
  const i=Math.min(Math.floor(p*SHADES.length),SHADES.length-1);
  if(i!==si)setShade(i);
},{passive:true});

/* ================= SHOP ================= */
function card(p){
  const k=sel[p.id]||0;
  return `<div class="card tilt" data-id="${p.id}">
    <button class="wl" data-wl="${p.id}" aria-label="Wishlist">${wl.has(p.id)?"♥":"♡"}</button>
    <div class="art">${imgTag(pimg(p,k),p.n)}</div>
    <h3>${p.n}</h3>
    <div class="pr"><b>$${pp(p,k)}</b><span class="st">${stars(p.r)} ${p.r}</span></div>
    <div class="sw">${p.s.map((s,i)=>`<i class="${i===k?"on":""}" style="background:${s[1]}" title="${s[0]}" data-sw="${i}" data-p="${p.id}"></i>`).join("")}</div>
    <button class="add" data-add="${p.id}">Add to Cart</button>
  </div>`;
}
function render(){
  const l=P.filter(p=>(cat==="All"||p.c===cat)&&p.n.toLowerCase().includes(qry));
  $("#gr").innerHTML=l.length
    ?["Lips","Face","Eyes","Nails"].filter(c=>l.some(p=>p.c===c)).map(c=>{
        const it=l.filter(p=>p.c===c);
        return `<h3 class="ch">${c}<small>${it.length} PRODUCTS</small></h3><div class="grid">${it.map(card).join("")}</div>`;
      }).join("")
    :"<p>No products found.</p>";
  $("#bsl").innerHTML=[...P].sort((a,b)=>b.r-a.r).slice(0,8).map(card).join("");
}
$("#ch").innerHTML=["All","Lips","Face","Eyes","Nails"].map(c=>`<button class="${c==="All"?"on":""}">${c}</button>`).join("");
$("#ch").onclick=e=>{if(e.target.tagName==="BUTTON")setCat(e.target.textContent,false)};
function setCat(c,scroll=true){
  cat=c;$$("#ch button").forEach(b=>b.classList.toggle("on",b.textContent===c));render();
  if(scroll)$("#shop").scrollIntoView({behavior:"smooth"});
}
$("#bs").onclick=()=>{$("#sb").classList.toggle("on");$("#q").focus()};
$("#q").oninput=e=>{qry=e.target.value.toLowerCase();render();if(qry)location.hash="shop"};
$("#bm").onclick=()=>$("#nv").classList.toggle("on");
$("#nv").onclick=()=>$("#nv").classList.remove("on");

/* ================= PRODUCT POPUP ================= */
let pm={id:0,k:0,q:1};
function openPM(id){pm={id,k:sel[id]||0,q:1};drawPM();$("#pm").classList.add("on");$("#pm").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closePM(){$("#pm").classList.remove("on");$("#pm").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function drawPM(){
  const p=P.find(x=>x.id===pm.id),k=pm.k,sig=p.id===30;
  const main=sig?SHADES[k].m:p.t;
  $("#pmimg").src=IM[main];$("#pmimg").alt=p.n;
  $("#pmth").innerHTML=sig?SHADES.map((s,i)=>`<img data-pmt="${i}" class="${i===k?"on":""}" src="${IM[s.m]}" alt="${s.n}">`).join("")+`<img data-pmt="${k}" src="${IM["pill"+k]}" alt="Lipstick">`:"";
  $("#pmc").textContent=p.c;$("#pmn").textContent=p.n;
  $("#pmr").textContent=stars(p.r)+"  "+p.r+" · 120+ reviews";
  $("#pmp").textContent="$"+pp(p,k).toFixed(2);
  $("#pmdesc").textContent=p.d||DESC[p.c];
  $("#pmsw").innerHTML=p.s.map((s,i)=>`<i class="${i===k?"on":""}" style="background:${s[1]}" title="${s[0]}" data-pmk="${i}"></i>`).join("")+`<span>${p.s[k][0]}</span>`;
  $("#pmqn").textContent=pm.q;
  $("#pmw").href=waLink(`Hello GLOWÉ BEAUTY! I would like to order:\n${pm.q} x ${p.n} (${p.s[k][0]}) - $${(pp(p,k)*pm.q).toFixed(2)}\n\nName:\nAddress:\nCity:`);
}
$("#pmx").onclick=closePM;
$("#pm").addEventListener("click",e=>{if(e.target.id==="pm")closePM()});
addEventListener("keydown",e=>{if(e.key==="Escape")closePM()});
$("#pmm").onclick=()=>{pm.q=Math.max(1,pm.q-1);drawPM()};
$("#pmpl").onclick=()=>{pm.q++;drawPM()};
$("#pma").onclick=()=>{addC(pm.id,pm.k,pm.q);closePM()};

/* ================= CART ================= */
function addC(id,k,q=1){
  const key=id+"-"+k;cart[key]=(cart[key]||0)+q;drawC();
  toast(P.find(x=>x.id===id).n+" added to bag");
  $("#bd").animate([{transform:"scale(1.6)"},{transform:"scale(1)"}],300);
}
function qt(key,d){cart[key]+=d;if(cart[key]<=0)delete cart[key];drawC()}
function bundle(ks){ks.forEach(k=>{const key="30-"+k;cart[key]=(cart[key]||0)+1});drawC();$("#dr").classList.add("on");toast("Bundle added — your saving is applied")}
function drawC(){
  const ks=Object.keys(cart);let tot=0,n=0;
  const rows=ks.map(key=>{const[id,k]=key.split("-").map(Number),p=P.find(x=>x.id===id),q=cart[key];tot+=pp(p,k)*q;n+=q;return{key,p,k,q}});
  /* automatic bundle saving on Signature Lipstick shades */
  const sg=rows.filter(r=>r.p.id===30),dn=new Set(sg.map(r=>r.k)).size;
  const sgt=sg.reduce((a,r)=>a+pp(r.p,r.k)*r.q,0),bp=dn>=5?.25:dn>=3?.2:dn>=2?.1:0,bd=sgt*bp;
  /* promo codes */
  let pd=0;
  if(promo==="GLOWE10")pd=tot*.1;
  else if(promo==="LIPS15")pd=rows.reduce((a,r)=>a+(r.p.c==="Lips"?pp(r.p,r.k)*r.q*.15:0),0);
  else if(promo==="GLOW20"&&tot>=100)pd=tot*.2;
  const disc=Math.max(bd,pd),fin=tot-disc;
  const lab=disc?(bd>=pd?`Bundle saving (${dn} shades, ${Math.round(bp*100)}% off)`:`Code ${promo}`):"";
  $("#ci").innerHTML=rows.length?rows.map(r=>`<div class="ci"><div>${imgTag(pimg(r.p,r.k),r.p.n)}</div><b>${r.p.n}<br><small>${r.p.s[r.k][0]} · $${pp(r.p,r.k)}</small></b><span class="q"><button data-qt="${r.key}" data-d="-1">−</button> ${r.q} <button data-qt="${r.key}" data-d="1">+</button></span></div>`).join(""):"<p style='margin-top:20px'>Your bag is empty.</p>";
  $("#tot").innerHTML=(disc?`<small style="display:block;font:300 14px Jost">${lab}: −$${disc.toFixed(2)}</small>`:(promo?`<small style="display:block;font:300 14px Jost">Code ${promo} does not apply to this bag yet</small>`:""))+"Total: $"+fin.toFixed(2);
  $("#bd").textContent=n;
  const ln=rows.map(r=>`${r.q} x ${r.p.n} (${r.p.s[r.k][0]}) - $${(pp(r.p,r.k)*r.q).toFixed(2)}`);
  const msg=`Hello GLOWÉ BEAUTY! I would like to place an order:\n\n${ln.join("\n")}\n\n${disc?lab+": -$"+disc.toFixed(2)+"\n":""}${dn>=5?"Includes free gift pouch (Full Wardrobe)\n":""}Total: $${fin.toFixed(2)}\n\nName:\nAddress:\nCity:\nPayment method:`;
  $("#co").href=rows.length?waLink(msg):"#";
}
$("#co").onclick=e=>{if(!Object.keys(cart).length){e.preventDefault();toast("Your bag is empty")}};
$("#bc").onclick=()=>$("#dr").classList.add("on");
$("#cx").onclick=()=>$("#dr").classList.remove("on");

/* ================= ONE CLICK HANDLER FOR DYNAMIC ELEMENTS ================= */
document.addEventListener("click",e=>{
  const c=s=>e.target.closest(s);let el;
  if(el=c("[data-sw]")){sel[el.dataset.p]=+el.dataset.sw;render();return}
  if(el=c("[data-add]")){addC(+el.dataset.add,sel[el.dataset.add]||0);return}
  if(el=c("[data-wl]")){const id=+el.dataset.wl;wl.has(id)?wl.delete(id):wl.add(id);render();return}
  if(el=c("[data-qt]")){qt(el.dataset.qt,+el.dataset.d);return}
  if(el=c("[data-pmk]")){pm.k=+el.dataset.pmk;drawPM();return}
  if(el=c("[data-pmt]")){pm.k=+el.dataset.pmt;drawPM();return}
  if(el=c("[data-bundle]")){bundle(el.dataset.bundle.split(",").map(Number));return}
  if(el=c("[data-code]")){promo=el.dataset.code;$$("[data-code]").forEach(x=>x.textContent=x===el?"Applied ✓":"Apply "+x.dataset.code);drawC();toast("Code "+promo+" applied to your bag");return}
  if(el=c(".tile")){setCat(el.dataset.c);return}
  if(el=c(".card")){openPM(+el.dataset.id)}
});

/* ================= QUIZ ================= */
const QS=[["Your makeup style?",["Natural","Bold","Glam"]],["Your skin tone?",["Fair","Medium","Deep"]],["Your favourite finish?",["Matte","Glossy"]]];
const SM=[[0,1,3],[1,2,3],[1,3,2]];   // [skin tone][style] -> shade index
let qa=[];
function quiz(){
  const i=qa.length,q=$("#qz");
  if(i<3){
    q.innerHTML=`<small>Question ${i+1} of 3</small><h3 style="font-size:30px;margin:6px 0 14px">${QS[i][0]}</h3>`+QS[i][1].map((o,k)=>`<button class="o" data-qa="${k}">${o}</button>`).join("");
  }else{
    const k=SM[qa[1]][qa[0]],p=P.find(x=>x.id===(qa[2]?6:30));
    q.innerHTML=`<small>Your match</small><h3 style="font-size:32px">${p.n} in ${S[k][0]}</h3><div class="qimg">${imgTag(pimg(p,k),p.n)}</div><button class="btn pri" data-qadd="${p.id},${k}">Add to Cart</button> <button class="btn sec" data-qretake="1">Retake</button>`;
  }
}
$("#qz").addEventListener("click",e=>{
  const a=e.target.closest("[data-qa]"),b=e.target.closest("[data-qadd]"),r=e.target.closest("[data-qretake]");
  if(a){qa.push(+a.dataset.qa);quiz()}
  else if(b){const[id,k]=b.dataset.qadd.split(",").map(Number);addC(id,k)}
  else if(r){qa=[];quiz()}
});
quiz();

/* ================= REVIEWS ================= */
const RV=[["The dark pink is unreal — stays put all day.","Amina K."],["Finally a nude that suits my skin tone.","Sara M."],["Packaging feels like Dior, price does not.","Hira R."],["Cherry Wine is my forever shade.","Zoya A."]];
$("#rt").innerHTML=RV.map(r=>`<div>${"★".repeat(5)}<br>“${r[0]}”<small>— ${r[1]}</small></div>`).join("");
let ri=0;setInterval(()=>{ri=(ri+1)%RV.length;$("#rt").style.transform=`translateX(-${ri*100}%)`},4500);

/* ================= INSTAGRAM / NEWSLETTER ================= */
function ig(){
  if(!IG_HANDLE){toast("Add your Instagram username in script.js (IG_HANDLE)");return false}
  window.open("https://ig.me/m/"+IG_HANDLE,"_blank","noopener");return true;
}
if(IG_HANDLE){$("#igb").href="https://instagram.com/"+IG_HANDLE;$("#fig").href="https://instagram.com/"+IG_HANDLE;$("#fig").target="_blank"}
else{$("#igb").onclick=e=>{e.preventDefault();ig()}}
$("#nf").onsubmit=e=>{e.preventDefault();if(ig()){toast("Welcome to GLOWÉ ♥ Say hi on Instagram");e.target.reset()}};

/* ================= LOOKBOOK / MARQUEE ================= */
const L1=["model-nude-rose","n2","o4","model-cherry-wine","n7","n3","o3","model-classic-red","i14","i10","i9","n1"],
      L2=["model-dusty-pink","o2","n6","model-mocha-brown","o1","n5","i6","i5","n4","n8","i1","i2","n10","n12","o5","i8","i7"];
const row=a=>a.concat(a).map(k=>`<img src="${IM[k]}" alt="" loading="lazy">`).join("");
$("#l1").innerHTML=row(L1);$("#l2").innerHTML=row(L2);
$(".mq div").innerHTML="<span>GLOWÉ ✦ NUDE ROSE ✦ DUSTY PINK ✦ CLASSIC RED ✦ CHERRY WINE ✦ MOCHA BROWN ✦ </span>".repeat(8);

/* ================= ANIMATIONS ================= */
/* gold sparkles in the hero */
(function(){
  const c=$("#sp"),x=c.getContext("2d");let w,h;const ps=[];
  const rs=()=>{w=c.width=c.offsetWidth;h=c.height=c.offsetHeight};rs();addEventListener("resize",rs);
  for(let i=0;i<(innerWidth<800?22:55);i++)ps.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+.6,s:Math.random()*.4+.15,p:Math.random()*6});
  (function f(t){
    x.clearRect(0,0,w,h);
    ps.forEach(q=>{
      q.y-=q.s;if(q.y<-5){q.y=h+5;q.x=Math.random()*w}
      x.globalAlpha=.3+.7*Math.abs(Math.sin(t/700+q.p));x.fillStyle="#d4b25a";x.beginPath();x.arc(q.x,q.y,q.r,0,6.3);x.fill();
      if(q.r>1.7){x.strokeStyle="#d4b25a";x.beginPath();x.moveTo(q.x-q.r*3,q.y);x.lineTo(q.x+q.r*3,q.y);x.moveTo(q.x,q.y-q.r*3);x.lineTo(q.x,q.y+q.r*3);x.stroke()}
    });
    if(!rm)requestAnimationFrame(f);
  })(0);
})();
/* count-up numbers */
new IntersectionObserver((es,o)=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  $$("[data-n]",e.target).forEach(b=>{const n=+b.dataset.n;let s=null;(function f(t){s=s||t;const k=Math.min((t-s)/1800,1);b.textContent=Math.floor(n*(1-Math.pow(1-k,3))).toLocaleString();if(k<1)requestAnimationFrame(f)})(performance.now())});
  o.unobserve(e.target);
})).observe($(".stats"));
/* scroll reveal */
const io=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}}),{threshold:.12});
$$(".rv").forEach(x=>io.observe(x));
/* 3D tilt on product cards */
document.addEventListener("pointermove",e=>{
  if(rm)return;
  const c=e.target.closest&&e.target.closest(".tilt");if(!c)return;
  const r=c.getBoundingClientRect();
  c.style.setProperty("--ry",(((e.clientX-r.left)/r.width-.5)*10)+"deg");
  c.style.setProperty("--rx",(-((e.clientY-r.top)/r.height-.5)*10)+"deg");
});
document.addEventListener("pointerout",e=>{const c=e.target.closest&&e.target.closest(".tilt");if(c){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")}});
/* cursor glow + scroll progress */
addEventListener("pointermove",e=>{$("#cg").style.transform=`translate(${e.clientX-150}px,${e.clientY-150}px)`});
addEventListener("scroll",()=>{$("#pg").style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%"},{passive:true});
/* loader */
addEventListener("load",()=>setTimeout(()=>{const l=$("#ld");l.style.opacity=0;setTimeout(()=>l.remove(),800)},600));

/* ================= START ================= */
render();drawC();
