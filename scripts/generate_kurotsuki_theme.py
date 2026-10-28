#!/usr/bin/env python3
"""AUTUMN FESTIVAL AT KUROTSUKI
An original, joyful Japanese-matsuri-inspired background composition.

Koto, shamisen, shinobue and taiko are synthesized approximations, not
recordings. Festival ambience (visitors, footsteps, autumn leaves, wooden
stalls) is procedurally created and contains no actual voices or samples.
No bells, copyrighted melodies, samples or third-party recordings.
"""
from pathlib import Path
import math
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets" / "audio"
DEST.mkdir(parents=True, exist_ok=True)
TITLE = "Autumn Festival at Kurotsuki"
MP3 = DEST / "autumn-festival-at-kurotsuki.mp3"
SR = 24000
BPM = 126
BEAT = 60.0 / BPM
BEATS = 192
N = int((BEATS * BEAT + 1.6) * SR)
PI = np.pi
RNG = np.random.default_rng(20261028)
MIX = np.zeros((N, 2), dtype=np.float32)


def hz(m: int) -> float:
    return 440.0 * 2.0 ** ((m - 69) / 12.0)


def add(waveform, beat: float, gain=.1, pan=0.0):
    offset = round(beat * BEAT * SR)
    if offset < 0 or offset >= N:
        return
    wave_data = np.asarray(waveform, dtype=np.float32)
    length = min(len(wave_data), N - offset)
    if length <= 0:
        return
    l = math.cos((pan + 1) * PI / 4)
    r = math.sin((pan + 1) * PI / 4)
    MIX[offset:offset+length, 0] += wave_data[:length] * gain * l
    MIX[offset:offset+length, 1] += wave_data[:length] * gain * r


def koto(midi: int, length=.82):
    t = np.arange(max(1,int(length*SR)),dtype=np.float64)/SR
    f=hz(midi)
    # Koto-like soft attack, sparkling upper partials, slightly bending string.
    phase=2*PI*f*(t + .00028*np.exp(-t*17))
    body=(.86*np.sin(phase)+.28*np.sin(2.01*phase+.3)*np.exp(-t*1.8)
          +.17*np.sin(3.01*phase+.45)*np.exp(-t*2.9)
          +.09*np.sin(5.0*phase+.35)*np.exp(-t*5.2))
    scratch=RNG.normal(0,1,len(t))*.018*np.exp(-38*t)
    env=(1-np.exp(-150*t))*np.exp(-2.30*t)*np.minimum(1,(length-t)/.10)
    return ((body+scratch)*env).astype(np.float32)


def shamisen(midi: int,length=.52):
    t=np.arange(max(1,int(length*SR)),dtype=np.float64)/SR
    f=hz(midi)
    phase=2*PI*f*(t+.00023*np.exp(-t*18))
    string=(.69*np.sin(phase)+.41*np.sin(2.01*phase+.12)
            +.20*np.sin(3.015*phase+.35)+.11*np.sin(4.01*phase))
    saw_buzz=.04*np.sign(np.sin(phase*2))*np.exp(-t*12)
    pick=RNG.normal(0,1,len(t))*.075*np.exp(-64*t)
    env=(1-np.exp(-240*t))*np.exp(-5.3*t)*np.minimum(1,(length-t)/.08)
    return ((string+saw_buzz)*env+pick).astype(np.float32)


def shinobue(midi: int, beats: float):
    duration=beats*BEAT
    t=np.arange(max(1,int(duration*SR)),dtype=np.float64)/SR
    f=hz(midi)
    onset=np.clip(t/.09,0,1)
    release=np.clip((duration-t)/.13,0,1)
    vib=.00035*np.sin(2*PI*5.6*t)*np.clip(t/.28,0,1)
    phase=2*PI*f*(t+vib)
    sound=(.91*np.sin(phase)+.17*np.sin(2*phase+.18)+.055*np.sin(3*phase+.4))
    air=RNG.normal(0,1,len(t))*.020
    trem=.95+.045*np.sin(2*PI*4.9*t)
    return ((sound+air)*onset*release*trem).astype(np.float32)


def taiko(high=False):
    length=.66
    t=np.arange(int(length*SR),dtype=np.float64)/SR
    low=83 if high else 70
    freq=low+86*np.exp(-t*27)
    phase=2*PI*np.cumsum(freq)/SR
    tone=(np.sin(phase)+.13*np.sin(phase*2.01))*np.exp(-9.0*t)
    felt=RNG.normal(0,1,len(t))*.18*np.exp(-61*t)
    return (tone+felt).astype(np.float32)


def shime():
    t=np.arange(int(.22*SR))/SR
    click=RNG.normal(0,1,len(t))
    return ((.30*np.sin(2*PI*320*t)+.13*np.sin(2*PI*492*t))*
            np.exp(-37*t)+.09*click*np.exp(-71*t)).astype(np.float32)


def clappers():
    t=np.arange(int(.12*SR))/SR
    taps=(.38*np.sin(2*PI*720*t)+.25*np.sin(2*PI*1102*t)
          +.09*RNG.normal(0,1,len(t)))
    return (taps*np.exp(-59*t)).astype(np.float32)


def leaves():
    """A papery flutter/cascading rustle, not wind howling."""
    dur=.85
    t=np.arange(int(dur*SR))/SR
    noise=RNG.normal(0,1,len(t))
    # Bright, dry leaf shuffling rather than a low drone.
    smooth=np.convolve(noise,np.ones(26)/26,mode="same")
    crisp=noise-smooth
    pulses=np.clip(.48+.32*np.sin(2*PI*8.3*t)+.18*np.sin(2*PI*14.7*t),0,1)
    envelope=np.sin(PI*np.clip(t/dur,0,1))**1.2
    return (crisp*pulses*envelope*.35).astype(np.float32)


def sandals():
    t=np.arange(int(.25*SR))/SR
    grit=RNG.normal(0,1,len(t))
    scruff=np.convolve(grit,np.ones(14)/14,mode="same")
    pat=.27*np.sin(2*PI*168*t)*np.exp(-45*t)
    return (pat+.25*scruff*np.exp(-24*t)).astype(np.float32)


def stall_clatter():
    t=np.arange(int(.35*SR))/SR
    tapping=(.27*np.sin(2*PI*580*t)+.09*np.sin(2*PI*1147*t))*np.exp(-30*t)
    after=(.18*np.sin(2*PI*755*np.maximum(0,t-.13)))*np.exp(-60*np.maximum(0,t-.13))*(t>.13)
    return (tapping+after).astype(np.float32)


def crowd_murmur(duration: float, seed_shift: float):
    """Small anonymous bustle; synthetic vowel-like tones, no spoken words."""
    n=int(duration*SR)
    t=np.arange(n,dtype=np.float64)/SR
    mix=np.zeros(n,dtype=np.float64)
    for i in range(9):
        f=150+RNG.uniform(-35,85)
        phase=RNG.uniform(0,2*PI)
        st=RNG.uniform(0,duration*.66)
        ln=RNG.uniform(.24,.8)
        env=np.maximum(0,1-np.abs(t-(st+ln*.52))/(ln*.52))
        env=env**1.5
        vowels=(np.sin(2*PI*f*t+phase)
                 +.23*np.sin(2*PI*f*2*t+phase*.7)
                 +.12*np.sin(2*PI*f*3*t+phase*.9))
        mix+=vowels*env
    hazy=RNG.normal(0,1,n)
    # Filter noise with moving average to remove harsh hiss.
    noise=np.convolve(hazy,np.ones(35)/35,mode="same")
    whole=np.sin(PI*np.arange(n)/n)**1.8
    return ((mix*.078+noise*.20)*whole).astype(np.float32)


# Happy G major pentatonic: G A B D E. No minor-key strings or mournful drone.
# Each 16-beat phrase has actual melody, not just atmospheric texture.
flute_phrases=[
 [(0,74,.43),(.75,76,.42),(1.5,79,.88),(2.75,76,.43),(3.5,74,.43),(4.25,71,.9),(5.5,74,.43),(6.25,76,.43),(7,74,.55),(8,71,.50),(9,69,.43),(9.75,71,.43),(10.5,74,.65),(11.75,76,.48),(12.5,79,.90),(14,74,1.0)],
 [(0,76,.52),(.75,79,.5),(1.5,81,.56),(2.5,79,.45),(3.25,76,.62),(4.25,74,.53),(5,71,.75),(6.5,74,.45),(7.25,76,.4),(8,79,.72),(9.25,76,.40),(10,74,.45),(10.75,71,.45),(11.5,69,.61),(12.75,71,.47),(13.5,74,1.3)],
 [(0,79,.7),(1,81,.43),(1.75,79,.44),(2.5,76,.43),(3.25,74,.64),(4.5,71,.73),(5.5,74,.44),(6.25,76,.42),(7,79,.42),(8,81,.65),(9,79,.43),(9.75,76,.46),(10.5,74,.74),(12,71,.45),(12.75,74,.4),(13.5,76,1.2)],
 [(0,74,.52),(.75,71,.42),(1.5,69,.50),(2.25,71,.42),(3,74,.72),(4.25,76,.42),(5,79,.50),(5.75,76,.44),(6.5,74,.78),(8,71,.48),(8.75,74,.38),(9.5,76,.45),(10.25,79,.46),(11,81,.76),(12.75,79,.43),(13.5,74,1.15)]
]
# Koto ostinato is a bright dancing figure with light swing-like skips.
koto_patterns=[
 [67,71,74,79,76,74,71,69,67,71,74,76,79,76,74,71],
 [69,74,76,81,79,76,74,71,69,74,76,79,81,79,76,74],
 [67,71,74,76,79,76,74,71,69,71,74,79,76,74,71,69],
 [67,69,71,74,76,74,71,69,67,71,74,79,76,74,71,67],
]
roots=[55,62,60,55,55,64,60,62,55,62,60,55]
# Tiny, cheeky moment of mystery in one phrase only, then back to dancing.
for sec in range(12):
    start=sec*16
    phrase_index=sec%4
    accent=1.15 if sec in (2,3,6,7,10,11) else 1.0
    if sec in (4,8):
        accent=.88
    for beat,midi,dur in flute_phrases[phrase_index]:
        adjusted=midi
        if sec==8 and beat==11:
            adjusted=midi-1  # a mischievous passing tone, not a dark theme
        if sec in (0,4) and beat in (0,.75):
            continue  # start by hearing the bustling festival and koto
        add(shinobue(adjusted,dur),start+beat,.090*accent,.12 if sec%2 else -.10)
        if beat in (1.5,10.5) and sec%3==2:
            add(shinobue(adjusted+2,.22),start+beat-.26,.025,-.14)
    pattern=koto_patterns[phrase_index]
    for i,note in enumerate(pattern):
        beat=i*.99
        volume=.095 if i%4==0 else .070
        add(koto(note,.9),start+beat,volume*accent,(-.53,.52)[i%2])
        if i in (3,7,11,15) and sec%3==1:
            add(koto(note+12,.37),start+beat+.40,.032,.53)
    # Shamisen bounce on the upbeat: a real melody counterpoint.
    for i in range(16):
        # Repeating traditional-style tonic-dominant syncopated riff.
        b=start+i+.48
        root=roots[sec]
        offsets=(0,7,12,7,0,4,7,12)
        n=root+offsets[i%8]
        vol=.105 if i%4==3 else .077
        add(shamisen(n,.54),b,vol*accent,(-.38,.41)[i%2])
    # Koto little flourish at end of each four-bar section.
    for j,pitch in enumerate((76,79,81,79)):
        add(koto(pitch,.34),start+14.0+j*.34,.043,.5)
    # Taiko dance groove, not marching drums, with light rim accents.
    for b in (0,4,8,12):
        add(taiko(False),start+b,.120 if b in (0,8) else .084,-.12)
    for b in (2,6,10,14):
        add(taiko(True),start+b,.054,.15)
    for b in (1.5,3.5,5.5,7.5,9.5,11.5,13.5,15.5):
        add(shime(),start+b,.125,(-.31,.35)[int(b)%2])
    for b in (3.75,7.75,11.75,15.75):
        add(clappers(),start+b,.082,.41)
    # Hints of joyous human activity, but no distracting intelligible speech.
    if sec in (0,2,4,6,9,11):
        add(crowd_murmur(2.7,sec),start+.7,.068,(-.62,.62)[sec%2])
    if sec in (1,5,8):
        add(stall_clatter(),start+3.5,.17,.7)
        add(stall_clatter(),start+9,.13,-.58)
    for k in (1,3,5):
        if sec%3!=2:
            add(sandals(),start+k*2.25,.055,(-.35,.42)[k%2])
    if sec%2==0:
        add(leaves(),start+4.5,.035,-.8)
        add(leaves(),start+12.7,.031,.65)

# The festival always has a sense of distant autumn bustle.
for position in (7,25,42,59,73,89,116,139,160,181):
    add(leaves(),position,.027,(-.75,.62)[int(position)%2])
# The air fades in softly rather than opening on a minor drone.
source=MIX.copy()
for delay,wet in ((.087,.082),(.161,.052),(.287,.031)):
    offset=round(delay*SR)
    MIX[offset:,0]+=source[:-offset,1]*wet
    MIX[offset:,1]+=source[:-offset,0]*wet
# Ensure good dynamics and an unobtrusive loop.
peak=float(np.max(np.abs(MIX)))
if peak>0:
    MIX*=min(1.3,.86/peak)
MIX=np.tanh(MIX*1.02).astype(np.float32)
IN=min(int(.35*SR),N)
END=min(int(.75*SR),N)
MIX[:IN]*=np.linspace(0,1,IN,dtype=np.float32)[:,None]
MIX[-END:]*=np.linspace(1,0,END,dtype=np.float32)[:,None]
wav=DEST/"autumn-festival-at-kurotsuki.wav"
with wave.open(str(wav),"wb") as stream:
    stream.setnchannels(2)
    stream.setsampwidth(2)
    stream.setframerate(SR)
    stream.writeframes((MIX*32767).astype("<i2").tobytes())
try:
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",
                    "-i",str(wav),"-codec:a","libmp3lame","-b:a","160k",
                    "-metadata",f"title={TITLE}",
                    "-metadata","artist=Kurotsuki Academy · Original Soundtrack",
                    str(MP3)],check=True)
finally:
    wav.unlink(missing_ok=True)
print("Rendered",TITLE,"duration",round(N/SR,2),"seconds",MP3.stat().st_size,"bytes")
