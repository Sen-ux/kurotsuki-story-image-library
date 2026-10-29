/* Kurotsuki Academy — approved opening image, working navigation, blue-fire parchment reveal */
(()=>{
 "use strict";
 if(window.KurotsukiEntrance)return;
 const gate=document.getElementById("gate-scene"),site=document.getElementById("site");
 if(!gate||!site)return;
 const art=new Image();
 art.className="bm-art";art.alt="";art.decoding="async";
 const host=document.createElement("section");
 host.id="blackmoon-landing";
 host.setAttribute("aria-label","Kurotsuki Academy opening screen");
 host.innerHTML=
  '<div class="bm-haze" aria-hidden="true"></div><div class="bm-embers" aria-hidden="true"></div>'+
  '<header class="bm-top"><div class="bm-brand"><span class="bm-mon">黒月</span><span>KUROTSUKI ACADEMY</span></div>'+
  '<nav class="bm-toplinks" aria-label="Opening navigation">'+
  '<button type="button" data-bm-tab="overview">ARCHIVE</button>'+
  '<button type="button" data-bm-tab="academy" data-short="1">CODEX</button>'+
  '<a href="gallery.html">GALLERY</a>'+
  '<button type="button" data-bm-tab="world" data-short="1">LORE</button></nav></header>'+
  '<div class="bm-mobile-title" aria-hidden="true">黒月学園</div>'+
  '<button class="bm-enter" id="bm-begin" type="button">BEGIN YOUR STORY</button>'+
  '<div class="bm-tile-bar" role="group" aria-label="Explore Kurotsuki Academy">'+
  '<button class="bm-tile" type="button" data-bm-tab="people" aria-label="View Students and Characters"><span>STUDENTS</span></button>'+
  '<button class="bm-tile" type="button" data-bm-tab="legends" aria-label="View Legendary and Senior Hunters"><span>SENIOR HUNTERS</span></button>'+
  '<button class="bm-tile" type="button" data-bm-tab="tavern" aria-label="Visit Hollow Lantern Tavern"><span>HOLLOW LANTERN</span></button>'+
  '<button class="bm-tile" type="button" data-bm-tab="factions" aria-label="Explore Factions"><span>FACTIONS</span></button>'+
  '<button class="bm-tile" type="button" data-bm-tab="bestiary" aria-label="Read Bestiary"><span>BESTIARY</span></button></div>';
 host.prepend(art);gate.append(host);
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 let loaded=false,entering=false,pendingTab=null,raf=0;
 const canvas=document.createElement("canvas");canvas.id="bm-burn-stage";
 canvas.setAttribute("aria-hidden","true");document.body.append(canvas);
 const ctx=canvas.getContext("2d",{alpha:true,desynchronized:true});
 art.addEventListener("load",()=>{loaded=true;document.body.classList.add("bm-ready")},{once:true});
 art.addEventListener("error",()=>{loaded=false;document.body.classList.remove("bm-ready");host.hidden=true},{once:true});
 art.src="assets/entrance/kurotsuki-approved-entrance.webp";
 function tabAfter(){
  const tab=pendingTab;pendingTab=null;
  if(!tab)return;
  const btn=document.querySelector('.rail-nav [data-tab="'+tab+'"]');
  if(btn)btn.click();
 }
 function start(tab){
  if(entering)return;
  pendingTab=tab||null;
  const original=document.getElementById(tab?"explore-alone":"enter");
  if(original)original.click();else enter();
 }
 host.querySelector("#bm-begin").addEventListener("click",()=>start(null));
 host.querySelectorAll("[data-bm-tab]").forEach(b=>b.addEventListener("click",()=>start(b.dataset.bmTab)));
 const rand=Math.random;
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 const particles=[];
 const edge=(y,progress,W,time)=>
   progress*W + 14*Math.sin(y*.019+time*.012)+6*Math.sin(y*.063-time*.024)
   +3.3*Math.sin(y*.12+time*.048)+1.4*Math.sin(y*.32-time*.09);
 function spawn(x,y,n){
  for(let i=0;i<n;i++){
   const smoke=rand()<.34;
   particles.push({x:x+(rand()-.5)*22,y:y+(rand()-.5)*10,smoke,
     vx:smoke?(-.3-rand()*.9):(-.6-rand()*2.5),
     vy:smoke?(-.6-rand()*1.1):(-.2-rand()*2),
     radius:smoke?(11+rand()*26):(.8+rand()*2),
     age:0,life:smoke?(45+rand()*30):(24+rand()*35)});
  }
  if(particles.length>290)particles.splice(0,particles.length-290);
 }
 function drawCover(W,H){
  const scale=Math.max(W/art.naturalWidth,H/art.naturalHeight);
  const width=art.naturalWidth*scale,height=art.naturalHeight*scale;
  ctx.drawImage(art,(W-width)/2,(H-height)/2,width,height);
 }
 function drawParticles(dt){
  for(let i=particles.length-1;i>=0;i--){
   const q=particles[i];q.age+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;
   const a=q.age/q.life;if(a>=1){particles.splice(i,1);continue;}
   const opacity=Math.sin(Math.PI*a);
   if(q.smoke){
    ctx.globalAlpha=.2*opacity;
    const gr=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,q.radius*(1+a));
    gr.addColorStop(0,"#b5d3e2");gr.addColorStop(.36,"#6794a655");gr.addColorStop(1,"#0a1d2700");
    ctx.fillStyle=gr;ctx.beginPath();
    ctx.ellipse(q.x,q.y,q.radius*(1+a),q.radius*.64*(1+a),-.2,0,Math.PI*2);ctx.fill();
   }else{
    ctx.globalAlpha=.87*opacity;ctx.shadowBlur=12;ctx.shadowColor="#46baff";
    ctx.fillStyle=q.age%3<1?"#edffff":"#61b7ff";
    ctx.fillRect(q.x,q.y,q.radius,q.radius*2);
    ctx.shadowBlur=0;
   }
  }
  ctx.globalAlpha=1;
 }
 function reveal(){
  site.classList.add("open");gate.classList.add("vanished");
  document.body.classList.remove("bm-burning");
  canvas.style.display="none";gate.style.pointerEvents="";
  window.scrollTo({top:0,behavior:"instant"});entering=false;
  tabAfter();
 }
 function enter(){
  if(entering||!loaded||!ctx)return false;
  entering=true;
  if(reduced){reveal();return true;}
  particles.length=0;
  const dpr=Math.min(devicePixelRatio||1,1.4),W=Math.max(1,innerWidth),H=Math.max(1,innerHeight);
  canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
  canvas.style.width=W+"px";canvas.style.height=H+"px";canvas.style.display="block";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,W,H);drawCover(W,H);
  document.body.classList.add("bm-burning");
  site.classList.add("open");
  gate.style.pointerEvents="none";
  const started=performance.now();let previous=started;
  function tick(time){
   const dt=Math.max(.2,Math.min(2,(time-previous)/16));previous=time;
   const t=Math.min(1,(time-started)/2600),advance=ease(t);
   ctx.clearRect(0,0,W,H);
   const line=[];
   for(let y=-8;y<=H+8;y+=5)line.push([edge(y,advance,W,time),y]);
   ctx.save();
   ctx.beginPath();ctx.moveTo(W+10,-10);ctx.lineTo(W+10,H+10);
   for(let i=line.length-1;i>=0;i--)ctx.lineTo(line[i][0],line[i][1]);
   ctx.closePath();ctx.clip();drawCover(W,H);
   // Four concentric charred layers produce the illusion of parchment being consumed.
   for(const [width,fill,blur] of [
    [34,"rgba(1,5,12,.89)",0],[18,"rgba(4,24,45,.94)",5],
    [8,"rgba(18,101,192,.98)",17],[2.6,"rgba(221,253,255,1)",9]
   ]){
    ctx.beginPath();line.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.lineWidth=width;ctx.strokeStyle=fill;ctx.lineJoin="round";
    ctx.shadowBlur=blur;ctx.shadowColor="#2daeff";ctx.stroke();
   }
   ctx.restore();
   ctx.save();ctx.globalCompositeOperation="screen";ctx.shadowColor="#319bff";ctx.shadowBlur=24;
   for(let i=0;i<line.length;i+=4){
    const [x,y]=line[i];if(x< -55||x>W+50)continue;
    const curl=13+10*Math.abs(Math.sin(y*.072+time*.008));
    ctx.fillStyle=i%3===0?"rgba(183,250,255,.58)":"rgba(29,125,250,.40)";
    ctx.beginPath();ctx.moveTo(x-4,y+9);
    ctx.bezierCurveTo(x+8,y-5,x+curl,y-14-curl,x+curl*.58,y-16-curl);
    ctx.quadraticCurveTo(x+2,y-10,x-4,y+9);ctx.fill();
    if(i%3===0)spawn(x-4,y,1);
   }
   ctx.restore();ctx.save();drawParticles(dt);ctx.restore();
   if(t<1)raf=requestAnimationFrame(tick);
   else setTimeout(reveal,140);
  }
  raf=requestAnimationFrame(tick);return true;
 }
 window.KurotsukiEntrance={enter,start,get ready(){return loaded;}};
 document.getElementById("return-gate")?.addEventListener("click",()=>{
  entering=false;pendingTab=null;cancelAnimationFrame(raf);
  canvas.style.display="none";gate.style.pointerEvents="";
  document.body.classList.remove("bm-burning");
 });
})();
