/* Kurotsuki Academy — insignia, illustrated atlas, and The Ninth Silence.
   Self-contained enhancement. Existing character/playlist/guide scripts remain unchanged. */
(()=>{
  "use strict";
  if(window.KurotsukiVeiledAtlas)return;
  const root=document.getElementById("site");
  if(!root)return;
  const $=id=>document.getElementById(id);
  const file=path=>encodeURI(path);
  const emblems={
    "The Nameless Blades":"Factions/Nameless_Blades.png",
    "The Court of a Hundred Masks":"Factions/Court_of_a_Hundred_Masks.png",
    "The Hollow Sutra":"Factions/Hollow_Sutra.png",
    "The Shrine Concordat":"Factions/Shrine_Concordat.png"
  };
  const mainSites=[
    ["Dormitories","Places/Dormitories.png","Where the academy's evenings become their own stories."],
    ["Hall of Nine Seals","Places/Hall_of_Nine_Seals.png","A ritual hall bound by the tradition of sealing."],
    ["Hollow Lantern Tavern","Places/Hollow_Lantern_Tavern.png","Shelter for wanderers, hunters, and untold stories."],
    ["Jadewater Sanctuary","Places/Jadewater_Sanctuary.png","A quiet sanctuary where healing finds its place."],
    ["Lantern Grove","Places/Lantern_Grove.png","A lantern-lit grove beyond the busiest academy paths."],
    ["Mission Board","Places/Mission_Board.png","Where the night's contracts become tomorrow's journeys."],
    ["Moonshadow Archives","Places/Moonshadow_Archives.png","The records of old shrines, treaties, and lost histories."],
    ["Vermilion Courtyard","Places/Vermilion_Courtyard.png","A gathering place beneath weathered crimson eaves."]
  ];
  const sealedSites=[
    ["Abandoned Pagoda","Hidden Places/Abandoned_Pagoda.png","A silhouette the old maps refuse to acknowledge."],
    ["Hidden Shrine Roads","Hidden Places/Hidden_Shrine_Roads.png","Paths drawn only in the margins of forgotten maps."],
    ["Masked Territories","Hidden Places/Masked_Territories.png","An estate of masks, etiquette, and unanswered debts."],
    ["Millennium Tree","Hidden Places/Millennium_Tree.png","Ancient roots woven through the oldest whispers."],
    ["Moonlit Serenity Springs","Hidden Places/Moonlit_Serenity_Springs.png","Still waters beyond the paths usually taken."],
    ["Myriad Horrors Forest","Hidden Places/Myriad_Horrors_Forest.png","A forest where even silence can be a warning."],
    ["Sealed Archive Chambers","Hidden Places/Sealed_Archive_Chambers.png","Records kept under wards rather than locks."],
    ["The Hollow Gate","Hidden Places/The_Hollow_Gate.png","A threshold best approached without certainty."]
  ];

  function artwork(src,alt,eager=false){
    const im=document.createElement("img");
    im.src=file(src);im.alt=alt;
    im.loading=eager?"eager":"lazy";im.decoding="async";
    im.addEventListener("error",()=>{im.classList.add("atlas-missing");im.alt=alt+" — image unavailable";},{once:true});
    return im;
  }

  /* Faction symbols: navigation insignia and a prominent full-size emblem. */
  const chooser=$("faction-chooser"),details=$("faction-detail");
  if(chooser&&details){
    const options=[...chooser.querySelectorAll(".faction-option")];
    options.forEach((btn,i)=>{
      const name=btn.querySelector("div")?.firstChild?.textContent?.trim()||"";
      const src=emblems[name];
      if(!src)return;
      const shield=document.createElement("span");shield.className="atlas-faction-mark";
      shield.append(artwork(src,name+" faction insignia",i===0));
      btn.prepend(shield);
      btn.dataset.insignia=name;
    });
    const renderFeature=()=>{
      const name=details.querySelector("h3")?.textContent?.trim();
      const src=emblems[name];
      if(!src||details.querySelector(".atlas-faction-hero"))return;
      const hero=document.createElement("figure");hero.className="atlas-faction-hero";
      hero.append(artwork(src,name+" · faction symbol"));
      const cap=document.createElement("figcaption");
      cap.textContent="INSIGNIA · "+name.toUpperCase();
      hero.append(cap);details.insertBefore(hero,details.firstChild);
    };
    const observer=new MutationObserver(renderFeature);
    observer.observe(details,{childList:true});
    renderFeature();
  }

  const modal=document.createElement("dialog");
  modal.className="atlas-lightbox";
  modal.setAttribute("aria-label","Location artwork");
  modal.innerHTML='<button class="atlas-lightbox-close" type="button" aria-label="Close artwork">×</button><figure><img alt=""><figcaption><strong></strong><small></small></figcaption></figure>';
  document.body.append(modal);
  modal.querySelector(".atlas-lightbox-close").addEventListener("click",()=>modal.close());
  modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
  function openArtwork(item,confidential){
    const [name,src,desc]=item;
    const img=modal.querySelector("figure img");
    img.src=file(src);img.alt=name+" illustrated setting artwork";
    modal.querySelector("figcaption strong").textContent=name;
    modal.querySelector("figcaption small").textContent=(confidential?"THE NINTH SILENCE · ":"THE LIVING MAP · ")+desc;
    if(!modal.open)modal.showModal();
  }
  function makeCard(item,i,sealed=false){
    const [name,src,desc]=item;
    const card=document.createElement("button");
    card.type="button";card.className="atlas-site-card";
    card.setAttribute("aria-label","View artwork and record for "+name);
    const figure=document.createElement("span");figure.className="atlas-site-art";
    figure.append(artwork(src,name+" · Kurotsuki Academy location",!sealed&&i<2));
    const body=document.createElement("span");body.className="atlas-site-meta";
    const id=document.createElement("span");id.className="atlas-site-index";
    id.textContent=(sealed?"REDACTED ":"ARCHIVE ")+String(i+1).padStart(2,"0");
    const title=document.createElement("strong");title.textContent=name;
    const about=document.createElement("small");about.textContent=desc;
    body.append(id,title,about);card.append(figure,body);
    card.addEventListener("click",()=>openArtwork(item,sealed));
    return card;
  }
  const ledger=$("place-ledger");
  if(ledger){
    ledger.replaceChildren(...mainSites.map((item,i)=>makeCard(item,i)));
    ledger.className="atlas-site-grid";
    ledger.setAttribute("aria-label","Eight illustrated places in Kurotsuki Academy");
  }

  /* A dedicated sealed chapter. Its counterseal is intentionally discreet,
     but remains a real accessible button for keyboard and touch users. */
  const sealedPage=$("page-ninth-silence");
  const unlock=$("ninth-counterseal");
  const cover=$("ninth-seal");
  const gallery=$("ninth-gallery");
  const grid=$("ninth-cards");
  const reseal=$("ninth-reseal");
  let opened=false;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  function showContents(shouldFocus=true){
    cover.hidden=true;gallery.hidden=false;
    grid.replaceChildren(...sealedSites.map((item,i)=>makeCard(item,i,true)));
    sealedPage.classList.add("is-unsealed");
    unlock.setAttribute("aria-expanded","true");
    opened=true;
    try{sessionStorage.setItem("kurotsuki.ninth-silence.unsealed","yes");}catch(e){}
    if(shouldFocus)grid.querySelector(".atlas-site-card")?.focus({preventScroll:true});
  }
  if(sealedPage&&unlock&&cover&&gallery&&grid&&reseal){
    unlock.addEventListener("click",()=>{
      if(opened||cover.classList.contains("is-opening"))return;
      if(reduced.matches){showContents();return;}
      cover.classList.add("is-opening");
      window.setTimeout(()=>{cover.classList.remove("is-opening");showContents();},1100);
    });
    reseal.addEventListener("click",()=>{
      opened=false;gallery.hidden=true;cover.hidden=false;
      grid.replaceChildren();
      sealedPage.classList.remove("is-unsealed");
      unlock.setAttribute("aria-expanded","false");
      try{sessionStorage.removeItem("kurotsuki.ninth-silence.unsealed");}catch(e){}
      unlock.focus({preventScroll:true});
    });
    try{if(sessionStorage.getItem("kurotsuki.ninth-silence.unsealed")==="yes")showContents(false);}catch(e){}
  }
  window.KurotsukiVeiledAtlas={mainSites:mainSites.length,sealedSites:sealedSites.length,emblems:Object.keys(emblems).length};
})();