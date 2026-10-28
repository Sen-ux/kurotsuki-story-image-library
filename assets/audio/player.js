/* Lanterns at Kurotsuki — original Kurotsuki Academy ambient soundtrack.
   No autoplay. The pause button preserves the current position. */
(() => {
  "use strict";
  if(document.getElementById("kurotsuki-player")) return;
  const player=document.createElement("aside");
  player.id="kurotsuki-player";
  player.className="kurotsuki-player";
  player.setAttribute("aria-label","Original Kurotsuki Academy soundtrack");
  player.innerHTML=
    '<div class="kurotsuki-player-label">'+
      '<span class="kurotsuki-player-crest" aria-hidden="true">黒月</span>'+
      '<div class="kurotsuki-player-text">'+
        '<span class="kurotsuki-player-overline">Kurotsuki Academy · Original Soundtrack</span>'+
        '<span class="kurotsuki-player-title">Lanterns at Kurotsuki</span>'+
      '</div>'+
    '</div>'+
    '<div class="kurotsuki-player-row">'+
      '<button type="button" id="kurotsuki-audio-toggle" aria-label="Play background music" aria-pressed="false">▶ Play music</button>'+
      '<label for="kurotsuki-audio-volume" class="kurotsuki-volume-label">Volume</label>'+
      '<input id="kurotsuki-audio-volume" type="range" min="0" max="100" step="1" value="38" aria-label="Background music volume">'+
      '<span class="kurotsuki-playing-state" id="kurotsuki-audio-status" role="status" aria-live="polite">Paused</span>'+
    '</div>';
  const audio=document.createElement("audio");
  audio.id="kurotsuki-audio";
  audio.preload="none";
  audio.loop=true;
  audio.src="assets/audio/veil-beneath-the-torii.mp3?v=traditional-v2";
  audio.volume=.38;
  audio.setAttribute("aria-label","Lanterns at Kurotsuki, original ambient soundtrack");
  player.append(audio);
  document.body.append(player);
  const button=player.querySelector("#kurotsuki-audio-toggle");
  const volume=player.querySelector("#kurotsuki-audio-volume");
  const status=player.querySelector("#kurotsuki-audio-status");
  let failed=false;
  function update(){
    const playing=!audio.paused;
    player.classList.toggle("is-playing",playing);
    button.textContent=playing?"❚❚ Pause music":"▶ Play music";
    button.setAttribute("aria-label",playing?"Pause background music":"Play background music");
    button.setAttribute("aria-pressed",String(playing));
    if(!failed)status.textContent=playing?"Playing":"Paused";
  }
  button.addEventListener("click",async()=>{
    if(failed)return;
    if(!audio.paused){audio.pause();return}
    button.disabled=true;
    status.textContent="Loading";
    try{await audio.play()}
    catch(err){
      status.textContent="Unavailable";
      console.error("Kurotsuki soundtrack playback failed:",err);
      // Temporary media errors can be retried by pressing Play.
    }finally{
      button.disabled=false;
      if(!failed && !audio.paused)update();
      else if(status.textContent==="Loading")status.textContent="Paused";
    }
  });
  volume.addEventListener("input",()=>{audio.volume=Number(volume.value)/100});
  audio.addEventListener("playing",update);
  audio.addEventListener("pause",update);
  audio.addEventListener("ended",update);
  audio.addEventListener("error",()=>{
    failed=true;audio.pause();button.disabled=true;
    button.textContent="Audio unavailable";
    status.textContent="Track missing";
    player.classList.remove("is-playing");
    console.error("Kurotsuki soundtrack file not found or cannot be decoded.");
  });
  update();
})();
