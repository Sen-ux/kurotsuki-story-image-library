/* Kurotsuki Academy — clean illustrated opening and cinematic page-turn entrance.
   Pure page geometry and shading: no blue fire, burning, smoke or embedded page curl. */
(()=>{
 "use strict";
 if(window.KurotsukiEntrance)return;
 const gate=document.getElementById("gate-scene"),site=document.getElementById("site");
 if(!gate||!site)return;

 const art=new Image();
 art.className="bm-art";
 art.alt="";
 art.decoding="async";
 const host=document.createElement("section");
 host.id="blackmoon-landing";
 host.setAttribute("aria-label","Kurotsuki Academy opening screen");
 host.innerHTML=
   '<div class="bm-haze" aria-hidden="true"></div><div class="bm-embers" aria-hidden="true"></div>'+
   '<button class="bm-open-page" id="bm-open-page" type="button" aria-label="Turn the page to explore the Kurotsuki Academy Codex"><span class="bm-sr-only">Turn the page to explore Kurotsuki Academy</span></button>'+
   '<aside class="bm-guide" aria-label="Maribel offers to guide you through the Academy"><span class="bm-guide-index">✦ THE HOLLOW LANTERN · A GREETING</span><div class="bm-guide-head"><span class="bm-guide-glyph" aria-hidden="true">灯</span><div><span class="bm-guide-name">Maribel</span><span class="bm-guide-role">Your half-demon guide</span></div></div><p>Lost your way? I can show you around... or you can explore on your own.</p><div class="bm-guide-actions"><button type="button" id="bm-guide-start">✿ FOLLOW MARIBEL</button><button type="button" id="bm-guide-free">EXPLORE ALONE →</button></div></aside>'+
   '<button class="bm-shirayuki-pin" id="bm-shirayuki-pin" type="button" aria-controls="bm-shirayuki-card" aria-expanded="false" aria-label="Who is Shirayuki?"><span class="bm-shirayuki-spark" aria-hidden="true">✦</span> SHIRAYUKI <span aria-hidden="true">?</span></button>'+ 
   '<aside class="bm-shirayuki-card" id="bm-shirayuki-card" role="region" aria-labelledby="bm-shirayuki-name" hidden>'+
   '<button class="bm-shirayuki-close" id="bm-shirayuki-close" type="button" aria-label="Close Shirayuki information">×</button>'+
   '<span class="bm-shirayuki-index">THE LEGENDARY HUNTERS · INDEPENDENT</span>'+
   '<div class="bm-shirayuki-head"><span class="bm-shirayuki-glyph" aria-hidden="true">白</span><div><span class="bm-shirayuki-name" id="bm-shirayuki-name">Shirayuki</span><span class="bm-shirayuki-role">The Tempest Huntress</span></div></div>'+
   '<p>A restless legendary hunter who goes where the wind takes her. Catching her before she disappears again is quite another matter.</p>'+
   '<div class="bm-shirayuki-warning"><span aria-hidden="true">⚠</span><span>Be warned: her plum wine is deceptively strong. One cup is quite enough.</span></div>'+
   '</aside>'+
   '<header class="bm-top"><div class="bm-brand"><span class="bm-mon">黒月</span><span>KUROTSUKI ACADEMY</span></div>'+
   '<nav class="bm-toplinks" aria-label="Opening navigation">'+
   '<button type="button" data-bm-tab="overview">ARCHIVE</button>'+
   '<button type="button" data-bm-tab="academy" data-short="1">CODEX</button>'+
   '<a href="gallery.html">GALLERY</a>'+
   '<button type="button" data-bm-tab="world" data-short="1">LORE</button></nav></header>';
 host.prepend(art);
 gate.append(host);

 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 let loaded=false,entering=false,pendingTab=null,raf=0;
 const canvas=document.createElement("canvas");
 canvas.id="bm-page-stage";
 canvas.setAttribute("aria-hidden","true");
 document.body.append(canvas);
 const ctx=canvas.getContext("2d",{alpha:true});
 const sheet=document.createElement("canvas");
 const paper=sheet.getContext("2d",{alpha:false});

 art.addEventListener("load",()=>{loaded=true;document.body.classList.add("bm-ready")},{once:true});
 art.addEventListener("error",()=>{loaded=false;document.body.classList.remove("bm-ready");host.hidden=true},{once:true});
 art.src="assets/entrance/kurotsuki-clean-entrance.webp?v=pageflip-v2";

 function tabAfter(){
  const tab=pendingTab;pendingTab=null;
  if(!tab)return;
  const btn=document.querySelector('.rail-nav [data-tab="'+tab+'"]');
  if(btn)btn.click();
 }
 function reveal(){
  site.classList.add("open");
  gate.classList.add("vanished");
  document.body.classList.remove("bm-turning");
  canvas.style.display="none";
  gate.style.pointerEvents="";
  window.scrollTo({top:0,behavior:"instant"});
  entering=false;
  document.dispatchEvent(new CustomEvent("kurotsuki:entrance-complete"));
  tabAfter();
 }
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
 const ease=t=>1-Math.pow(1-t,3);
 function drawCover(W,H){
  const scale=Math.max(W/art.naturalWidth,H/art.naturalHeight);
  const dw=art.naturalWidth*scale,dh=art.naturalHeight*scale;
  paper.drawImage(art,(W-dw)*.5,(H-dh)*.5,dw,dh);
 }
 function drawPageFrame(W,H,t){
  const slide=ease(t);
  const fold=W*(1-slide);
  const revealAmount=Math.min(1,t/.95);
  const belly=Math.min(W*.19,240)*(Math.sin(Math.PI*revealAmount)**.7);
  ctx.clearRect(0,0,W,H);
  if(fold<=1)return;

  // The visible face is clipped to a gently bowed, dimensional paper edge.
  const wave=(y)=>Math.sin((y/H)*Math.PI*1.45+Math.PI*.08)*belly*.12;
  ctx.save();
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(fold+wave(0),0);
  for(let y=H/40;y<=H;y+=H/40)ctx.lineTo(fold+wave(y),y);
  ctx.lineTo(0,H);ctx.closePath();ctx.clip();
  ctx.drawImage(sheet,0,0,W,H);

  // A soft vignette on the page surface increases toward the turning edge.
  const shaded=ctx.createLinearGradient(Math.max(0,fold-Math.max(45,belly*1.2)),0,fold+16,0);
  shaded.addColorStop(0,"rgba(7,9,14,0)");
  shaded.addColorStop(.45,"rgba(12,14,21,.10)");
  shaded.addColorStop(.82,"rgba(13,10,17,.35)");
  shaded.addColorStop(1,"rgba(4,5,10,.54)");
  ctx.fillStyle=shaded;ctx.fillRect(Math.max(0,fold-belly*1.4-50),0,belly*1.5+90,H);
  ctx.restore();

  // The turned-back leaf occupies a narrow moving region rather than being baked into the art.
  if(belly>1){
    ctx.save();
    ctx.beginPath();
    const right=fold+belly*.78;
    ctx.moveTo(fold+wave(0),0);
    ctx.bezierCurveTo(right, H*.13,right+belly*.13,H*.40,right,H*.5);
    ctx.bezierCurveTo(right+belly*.12,H*.75,right,H*.95,fold+wave(H),H);
    ctx.closePath();ctx.clip();

    // Piecewise warped, horizontally mirrored page texture: bend concentrates at the edge.
    const stride=Math.max(1.3,W/900);
    for(let dx=0;dx<belly;dx+=stride){
      const u=dx/Math.max(belly,1);
      const projected=fold+belly*.76*Math.sin(u*Math.PI*.53);
      const sx=clamp(fold-belly*.83*u,0,W-2);
      const stripe=clamp(belly*.76*Math.sin(Math.min(1,(dx+stride)/belly)*Math.PI*.53)-belly*.76*Math.sin(u*Math.PI*.53)+.6,.7,7);
      ctx.save();
      ctx.globalAlpha=.87;
      ctx.drawImage(sheet,sx,0,2,H,projected,0,stripe,H);
      ctx.restore();
    }

    // The reverse of the leaf: warm vellum, not burning parchment.
    const leaf=ctx.createLinearGradient(fold,0,right+15,0);
    leaf.addColorStop(0,"rgba(31,23,23,.70)");
    leaf.addColorStop(.14,"rgba(181,147,110,.62)");
    leaf.addColorStop(.34,"rgba(235,206,159,.81)");
    leaf.addColorStop(.62,"rgba(222,193,148,.64)");
    leaf.addColorStop(.82,"rgba(65,53,57,.52)");
    leaf.addColorStop(1,"rgba(10,12,19,.62)");
    ctx.fillStyle=leaf;ctx.fillRect(fold-10,0,belly+30,H);
    ctx.globalAlpha=.32;
    ctx.strokeStyle="#96744f";ctx.lineWidth=1;
    for(let y=45;y<H-15;y+=66){
      ctx.beginPath();ctx.moveTo(fold+12,y);ctx.bezierCurveTo(fold+belly*.4,y+8,fold+belly*.64,y-4,fold+belly*.66,y+2);ctx.stroke();
    }
    ctx.restore();
  }

  // Edge highlight and realistic cast shadow give the opening image physical depth.
  ctx.save();
  ctx.shadowColor="rgba(1,3,8,.87)";ctx.shadowBlur=Math.max(12,W*.016);
  ctx.lineWidth=7;ctx.strokeStyle="rgba(8,12,17,.63)";
  ctx.beginPath();ctx.moveTo(fold+wave(0),0);
  for(let y=H/40;y<=H;y+=H/40)ctx.lineTo(fold+wave(y),y);
  ctx.stroke();ctx.shadowBlur=0;
  ctx.strokeStyle="rgba(255,227,185,.70)";ctx.lineWidth=1.7;
  ctx.stroke();ctx.restore();
 }

 function enter(){
  if(entering||!loaded)return false;
  entering=true;
  if(reduced||!ctx||!paper){reveal();return true;}
  const W=Math.max(1,Math.round(innerWidth)),H=Math.max(1,Math.round(innerHeight));
  const dpr=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
  canvas.style.width=W+"px";canvas.style.height=H+"px";canvas.style.display="block";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  sheet.width=W;sheet.height=H;drawCover(W,H);
  document.body.classList.add("bm-turning");
  site.classList.add("open");
  gate.style.pointerEvents="none";
  const beginning=performance.now();
  function frame(now){
    const t=clamp((now-beginning)/2150,0,1);
    drawPageFrame(W,H,t);
    if(t<1)raf=requestAnimationFrame(frame);
    else reveal();
  }
  raf=requestAnimationFrame(frame);
  return true;
 }
 function start(tab,mode="free"){
  if(entering||!loaded)return;
  pendingTab=tab||null;
  // Hidden legacy entry controls retain guided-tour state, without showing the obsolete gate.
  const original=document.getElementById(mode==="guided"?"enter":"explore-alone");
  if(original)original.click();
  if(!entering)enter();
 }
 const open=host.querySelector("#bm-open-page");
 open.addEventListener("click",()=>start(null,"free"));
 host.querySelector("#bm-guide-start").addEventListener("click",()=>start(null,"guided"));
 host.querySelector("#bm-guide-free").addEventListener("click",()=>start(null,"free"));

 // Shirayuki: a small discoverable nameplate expands into a lore-and-wine warning.
 // A dedicated close control, outside-click dismissal and Escape keep it accessible.
 const shiraPin=host.querySelector("#bm-shirayuki-pin");
 const shiraCard=host.querySelector("#bm-shirayuki-card");
 const shiraClose=host.querySelector("#bm-shirayuki-close");
 function toggleShirayuki(show,restoreFocus=false){
   const opening=Boolean(show);
   shiraCard.hidden=!opening;
   shiraPin.setAttribute("aria-expanded",String(opening));
   shiraCard.classList.toggle("on",opening);
   if(!opening&&restoreFocus)shiraPin.focus({preventScroll:true});
 }
 shiraPin.addEventListener("click",()=>toggleShirayuki(shiraCard.hidden));
 shiraClose.addEventListener("click",()=>toggleShirayuki(false,true));
 document.addEventListener("pointerdown",event=>{
   if(shiraCard.hidden)return;
   if(shiraCard.contains(event.target)||shiraPin.contains(event.target))return;
   toggleShirayuki(false);
 });
 document.addEventListener("keydown",event=>{
   if(event.key==="Escape"&&!shiraCard.hidden){
     event.preventDefault();
     toggleShirayuki(false,true);
   }
 });
 host.querySelectorAll("[data-bm-tab]").forEach(b=>b.addEventListener("click",()=>start(b.dataset.bmTab,"free")));

 // Existing gate logic calls the public entry interface; keep both paths equivalent.
 window.KurotsukiEntrance={enter,start,get ready(){return loaded;}};
 document.getElementById("return-gate")?.addEventListener("click",()=>{
  entering=false;pendingTab=null;cancelAnimationFrame(raf);
  canvas.style.display="none";gate.style.pointerEvents="";
  document.body.classList.remove("bm-turning");
 });
})();