/* Kurotsuki Academy — Black Moon Records: original soundtrack playlist.
   The main theme attempts autoplay on entry, with first-interaction fallback for browser policies. */
(() => {
  "use strict";
  if (document.getElementById("kurotsuki-player")) return;

  const tracks = [
    {title:"Whispers Beneath the Black Moon",artist:"Kurotsuki Academy · Main Theme",tag:"THE BLACK MOON",seconds:218,path:"assets/audio/tracks/whispers-beneath-the-black-moon.mp3"},
    {title:"Lanterns Beyond the Veil",artist:"The World of Kurotsuki",tag:"BEYOND THE VEIL",seconds:188,path:"assets/audio/tracks/lanterns-beyond-the-veil.mp3"},
    {title:"The Night Governs",artist:"Tsukuyomi Shizuka · Headmaster",tag:"THE HEADMASTER",seconds:0,path:"assets/audio/tracks/the-night-governs.mp3"},
    {title:"A Tavern Saved For You",artist:"The Hollow Lantern Tavern",tag:"THE HOLLOW LANTERN",seconds:173,path:"assets/audio/tracks/a-tavern-saved-for-you.mp3"},
    {title:"One More Round",artist:"The Hollow Lantern Tavern",tag:"THE HOLLOW LANTERN",seconds:110,path:"assets/audio/tracks/one-more-round.mp3"},
    {title:"One More Round, Dear Friend",artist:"The Hollow Lantern Tavern",tag:"THE HOLLOW LANTERN",seconds:158,path:"assets/audio/tracks/one-more-round-dear-friend.mp3"},
    {title:"The Lantern's Mischievous Guide",artist:"Maribel",tag:"CHARACTER THEME",seconds:163,path:"assets/audio/tracks/the-lanterns-mischievous-guide.mp3"},
    {title:"A Smile Behind the Smoke",artist:"Mr. Hollow",tag:"CHARACTER THEME",seconds:205,path:"assets/audio/tracks/a-smile-behind-the-smoke.mp3"},
    {title:"The Hunt's Tempest",artist:"Shirayuki · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:168,path:"assets/audio/tracks/the-hunts-tempest.mp3"},
    {title:"A Hunt for the Divine",artist:"Shirayuki · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:0,path:"assets/audio/tracks/a-hunt-for-the-divine.mp3"},
    {title:"Thunder Without a Master",artist:"Tatsuya Kagetsu · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:203,path:"assets/audio/tracks/thunder-without-a-master.mp3"},
    {title:"Spirit of the Lightning Wolf",artist:"Tatsuya Kagetsu · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:0,path:"assets/audio/tracks/spirit-of-the-lightning-wolf.mp3"},
    {title:"The Foxfire Masquerade",artist:"Shizuru Nuehara · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:182,path:"assets/audio/tracks/the-foxfire-masquerade.mp3"},
    {title:"Mischief of the Fox",artist:"Shizuru Nuehara · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:0,path:"assets/audio/tracks/mischief-of-the-fox.mp3"},
    {title:"Mercy Beneath the Jade Sky",artist:"Lóngqí Seiran · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:229,path:"assets/audio/tracks/mercy-beneath-the-jade-sky.mp3"},
    {title:"Will of the Qilin",artist:"Lóngqí Seiran · Legendary Hunter",tag:"THE LEGENDARY HUNTERS",seconds:0,path:"assets/audio/tracks/will-of-the-qilin.mp3"}
  ];
  const player=document.createElement("aside");
  player.id="kurotsuki-player";
  player.className="kurotsuki-player";
  player.setAttribute("aria-label","Kurotsuki Academy music player");
  player.innerHTML=
    '<div class="km-head"><div class="km-emblem" aria-hidden="true"><span>月</span><i></i></div>'+
      '<div class="km-heading"><div class="km-eyebrow">黒月 · BLACK MOON RECORDS</div><div class="km-album">Songs from beneath the veil</div></div>'+
      '<button class="km-icon km-playlist-button" id="km-playlist-toggle" type="button" aria-controls="km-playlist" aria-expanded="false" aria-label="Show playlist" title="Playlist">☷ <span>PLAYLIST</span></button></div>'+
    '<div class="km-track"><span class="km-number" id="km-track-number">01 / 16</span><div class="km-track-name" id="km-track-name"></div><div class="km-artist" id="km-track-artist"></div></div>'+
    '<div class="km-progress"><span id="km-elapsed">0:00</span><input id="km-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek through track"><span id="km-duration">3:38</span></div>'+
    '<div class="km-controls"><div class="km-transport">'+
      '<button class="km-icon" id="km-previous" type="button" title="Previous track" aria-label="Previous track">‹‹</button>'+
      '<button class="km-play" id="km-toggle" type="button" aria-pressed="false" aria-label="Play music"><span id="km-play-symbol">▶</span></button>'+
      '<button class="km-icon" id="km-next" type="button" title="Next track" aria-label="Next track">››</button>'+
      '</div><div class="km-sound"><span aria-hidden="true">♫</span><label class="km-sr-only" for="km-volume">Volume</label><input id="km-volume" type="range" min="0" max="100" step="1" value="38" aria-label="Music volume"></div></div>'+
    '<div class="km-state" id="km-state" role="status" aria-live="polite">STARTING THE BLACK MOON THEME…</div>'+
    '<div class="km-list-panel" id="km-playlist" hidden><div class="km-list-head"><span>THE BLACK MOON COLLECTION</span><small>16 TRACKS</small></div><div class="km-list" id="km-track-list" role="group" aria-label="Choose a song"></div></div>';
  const audio=document.createElement("audio");
  audio.id="kurotsuki-audio";
  audio.preload="none";
  audio.loop=false;
  player.append(audio);
  document.body.append(player);

  const find=id=>player.querySelector("#"+id);
  const btn=find("km-toggle"), symbol=find("km-play-symbol"), volume=find("km-volume");
  const panel=find("km-playlist"), list=find("km-track-list"), playlistBtn=find("km-playlist-toggle");
  const seek=find("km-seek"), state=find("km-state"), elapsed=find("km-elapsed"), duration=find("km-duration");
  let index=0, request=0, hasError=false, pendingAutoplay=false;
  const resumeFromGesture=event=>{
    if(!pendingAutoplay)return;
    if(event.type==="keydown"&&(event.key==="Tab"||event.key==="Escape"||event.repeat))return;
    const target=event.target;
    if(target instanceof Element&&target.closest("#kurotsuki-player"))return;
    pendingAutoplay=false;
    play();
  };
  const removeGestureFallback=()=>{
    pendingAutoplay=false;
    document.removeEventListener("pointerdown",resumeFromGesture,true);
    document.removeEventListener("keydown",resumeFromGesture,true);
    player.classList.remove("autoplay-blocked");
  };
  const armGestureFallback=()=>{
    if(pendingAutoplay)return;
    pendingAutoplay=true;
    player.classList.add("autoplay-blocked");
    state.textContent="BROWSER BLOCKED AUTOPLAY · TAP THE PAGE TO START";
    document.addEventListener("pointerdown",resumeFromGesture,true);
    document.addEventListener("keydown",resumeFromGesture,true);
  };
  const fmt=n=>{if(!Number.isFinite(n)||n<0)return "0:00";n=Math.floor(n);return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  try{const saved=localStorage.getItem("kurotsuki.music.volume");if(saved!==null&&Number.isFinite(Number(saved)))volume.value=Math.min(100,Math.max(0,Number(saved)));}catch(e){}
  audio.volume=Number(volume.value)/100;

  const rows=tracks.map((t,i)=>{
    const row=document.createElement("button");
    row.type="button";row.className="km-list-item";row.dataset.index=String(i);
    const num=document.createElement("span");num.className="km-list-number";num.textContent=String(i+1).padStart(2,"0");
    const info=document.createElement("span");info.className="km-list-info";
    const name=document.createElement("strong");name.textContent=t.title;
    const artist=document.createElement("small");artist.textContent=t.artist;
    const length=document.createElement("span");length.className="km-list-duration";length.textContent=t.seconds?fmt(t.seconds):"♪";
    info.append(name,artist);row.append(num,info,length);
    row.addEventListener("click",()=>select(i,true));
    list.append(row);return row;
  });
  function render(){
    const t=tracks[index],playing=!audio.paused;
    find("km-track-name").textContent=t.title;
    find("km-track-artist").textContent=t.artist;
    find("km-track-number").textContent=String(index+1).padStart(2,"0")+" / "+String(tracks.length).padStart(2,"0")+"  ·  "+t.tag;
    const max=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:t.seconds;
    duration.textContent=fmt(max);
    elapsed.textContent=fmt(audio.currentTime);
    seek.value=max>0?String(Math.max(0,Math.min(1000,Math.round(audio.currentTime/max*1000)))):"0";
    seek.style.setProperty("--fill",seek.value/10+"%");
    btn.setAttribute("aria-pressed",String(playing));
    btn.setAttribute("aria-label",playing?"Pause music":"Play music");
    symbol.textContent=playing?"Ⅱ":"▶";
    player.classList.toggle("is-playing",playing);
    rows.forEach((r,i)=>{r.classList.toggle("active",i===index);r.setAttribute("aria-current",i===index?"true":"false")});
  }
  function select(i,autoplay){
    index=(i+tracks.length)%tracks.length;
    ++request;hasError=false;player.classList.remove("has-error");
    audio.pause();
    audio.removeAttribute("src");
    audio.src=new URL(tracks[index].path, document.baseURI).href;
    audio.load();
    state.textContent="SELECTED · "+tracks[index].tag;
    render();
    if(autoplay)play();
  }
  async function play(){
    const serial=++request;
    hasError=false;player.classList.remove("has-error");
    state.textContent="OPENING THE RECORD…";
    try{
      await audio.play();
      if(serial===request){state.textContent="NOW PLAYING · "+tracks[index].tag;render();}
    }catch(error){
      if(serial===request&&!hasError){
        if(error&&error.name==="NotAllowedError"){
          armGestureFallback();
        }else{
          removeGestureFallback();
          player.classList.add("has-error");state.textContent="AUDIO UNAVAILABLE · REFRESH THE PAGE";
        }
        render();
      }
    }
  }
  btn.addEventListener("click",()=>{if(audio.paused)play();else{++request;audio.pause();state.textContent="PAUSED · THE NIGHT CAN WAIT";render();}});
  find("km-previous").addEventListener("click",()=>{if(audio.currentTime>3){audio.currentTime=0;render();}else select(index-1,!audio.paused);});
  find("km-next").addEventListener("click",()=>select(index+1,!audio.paused));
  volume.addEventListener("input",()=>{audio.volume=Number(volume.value)/100;try{localStorage.setItem("kurotsuki.music.volume",volume.value);}catch(e){}});
  seek.addEventListener("input",()=>{const max=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:0;if(max>0){audio.currentTime=max*Number(seek.value)/1000;render();}});
  function setOpen(open){panel.hidden=!open;playlistBtn.setAttribute("aria-expanded",String(open));playlistBtn.setAttribute("aria-label",open?"Hide playlist":"Show playlist");player.classList.toggle("playlist-open",open);}
  playlistBtn.addEventListener("click",()=>setOpen(panel.hidden));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)setOpen(false)});
  audio.addEventListener("timeupdate",render);
  audio.addEventListener("durationchange",render);
  audio.addEventListener("loadedmetadata",render);
  audio.addEventListener("playing",()=>{hasError=false;removeGestureFallback();player.classList.remove("has-error");state.textContent="NOW PLAYING · "+tracks[index].tag;render();});
  audio.addEventListener("pause",render);
  audio.addEventListener("ended",()=>select(index+1,true));
  audio.addEventListener("error",()=>{hasError=true;player.classList.add("has-error");state.textContent="AUDIO UNAVAILABLE · REFRESH THE PAGE";render();});
  select(0,false);
  play();
})();