#!/usr/bin/env python3
"""Compose a playful, traditionally Japanese-inspired theme for Kurotsuki Academy.

"Lanterns at Kurotsuki" — an original repeatable instrumental.
Synthesis only: no copyrighted compositions, external audio files or samples.
Run: python scripts/generate_kurotsuki_theme.py
Requires: numpy; ffmpeg for final MP3 encoding.
"""
from __future__ import annotations

import math
from pathlib import Path
import subprocess
import wave

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
AUDIO_DIR = ROOT / "assets" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)
MP3 = AUDIO_DIR / "veil-beneath-the-torii.mp3"
SR = 24000
BPM = 102
BEAT = 60 / BPM
TOTAL_BEATS = 128
TAIL = 1.75
N = int((TOTAL_BEATS * BEAT + TAIL) * SR)
OUT = np.zeros((N, 2), np.float32)
RNG = np.random.default_rng(280926)
PI = np.pi


def hz(midi: int) -> float:
    return 440 * 2 ** ((midi - 69) / 12)


def place(sound: np.ndarray, start: float, volume: float = 1, pan: float = 0) -> None:
    begin = max(0, round(start * SR))
    if begin >= N:
        return
    take = min(N - begin, len(sound))
    if take <= 0:
        return
    # Constant-power panning; left/right are slightly different.
    left = math.cos((pan + 1) * PI / 4)
    right = math.sin((pan + 1) * PI / 4)
    OUT[begin:begin+take, 0] += sound[:take] * volume * left
    OUT[begin:begin+take, 1] += sound[:take] * volume * right


def synth_pad(midi: int, duration: float, pan: float) -> np.ndarray:
    count = max(1, int(duration * SR))
    t = np.arange(count, dtype=np.float64) / SR
    freq = hz(midi)
    vibrato = .004 * np.sin(2 * PI * .13 * t + pan)
    angle = 2 * PI * freq * t + vibrato
    tone = (.73*np.sin(angle) + .19*np.sin(2*angle+.3)
            + .08*np.sin(3*angle+.7))
    tone += .28 * np.sin(2*PI*freq*1.0029*t + .2)
    attack = np.minimum(1, t / 2.3)
    release = np.minimum(1, np.maximum(0, duration-t)/2.7)
    slow = .88 + .12*np.sin(2*PI*.072*t+.8+pan)
    return (tone * np.sin(attack*PI/2) * np.sin(release*PI/2)
            * slow).astype(np.float32)


def synth_pluck(midi: int, duration: float, pan: float) -> np.ndarray:
    n = max(1, int(duration*SR))
    t = np.arange(n, dtype=np.float64)/SR
    f = hz(midi)
    initial = (1 - np.exp(-95*t)) * np.exp(-2.7*t)
    tone = (.86*np.sin(2*PI*f*t)
            + .26*np.sin(2*PI*f*2.02*t+.2)*np.exp(-2.4*t)
            + .11*np.sin(2*PI*f*3.97*t+.9)*np.exp(-7*t))
    rattle = RNG.normal(0, 1, n) * np.exp(-54*t) * .022
    return ((tone + rattle) * initial * np.minimum(1,(duration-t)/.17)).astype(np.float32)


def synth_flute(midi: int, duration: float) -> np.ndarray:
    n = max(1, int(duration*SR))
    t = np.arange(n, dtype=np.float64)/SR
    f = hz(midi)
    vibrato = .0021*np.sin(2*PI*4.5*t) * np.minimum(1,t/.9)
    phase = 2*PI*f*(t + vibrato/(2*PI*4.5))
    tone = np.sin(phase) + .12*np.sin(phase*2+.25) + .045*np.sin(phase*3)
    entry = np.minimum(1,t/.24)
    exit = np.minimum(1,(duration-t)/.58)
    soft = np.sin(np.maximum(0,entry)*PI/2) * np.sin(np.maximum(0,exit)*PI/2)
    breath = RNG.normal(0,.008,n)
    return ((tone+breath)*soft*(.89 + .1*np.sin(2*PI*.2*t))).astype(np.float32)


def synth_drum() -> np.ndarray:
    duration = 1.5
    n=int(duration*SR)
    t=np.arange(n,dtype=np.float64)/SR
    instantaneous = 50 + 62*np.exp(-t*13)
    phase=2*PI*np.cumsum(instantaneous)/SR
    body=(np.sin(phase) + .22*np.sin(phase*1.99)) * np.exp(-5.9*t)
    rustle=RNG.normal(0,1,n)
    # Very short, woody taiko strike; no bells.
    tap=.17*rustle*np.exp(-26*t)
    return (body+tap).astype(np.float32)


# Japanese-inspired min'yo/yo pentatonic colour (D-E-G-A-B), no borrowed melody.
# The music is brighter and more active than the original solemn underscore.
# The timbres are synthesized approximations of koto, shamisen, shinobue,
# and Japanese hand-drum/woodblock rhythms; no commercial samples are used.

def synth_shamisen(midi: int, duration: float) -> np.ndarray:
    """Dry three-string-style pluck with sharp attack and sympathetic buzz."""
    n=max(1,int(duration*SR))
    t=np.arange(n,dtype=np.float64)/SR
    f=hz(midi)
    phi=2*PI*f*t + .13*np.exp(-t*24)
    wire=(.72*np.sin(phi)+.39*np.sin(2*phi+.11)+
          .22*np.sin(3*phi+.19)+.12*np.sin(4*phi+.43))
    attack=(1-np.exp(-170*t))
    envelope=np.exp(-4.1*t)*attack
    snap=RNG.normal(0,1,n)*np.exp(-55*t)*.09
    sympathetic=.12*np.sin(PI*2*f*.997*t)*np.exp(-2.9*t)
    release=np.minimum(1,np.maximum(0,duration-t)/.10)
    return ((wire+sympathetic)*envelope+snap).astype(np.float32)*release


def synth_shime() -> np.ndarray:
    """Small, dry hand-drum/wood-stick accent rather than a metal bell."""
    t=np.arange(int(.22*SR),dtype=np.float64)/SR
    noise=RNG.normal(0,1,len(t))
    # Noise highpass via subtracting a short moving average.
    smooth=np.convolve(noise,np.ones(24)/24,mode="same")
    click=(noise-smooth)*np.exp(-51*t)*.19
    wood=(.57*np.sin(2*PI*255*t)+.24*np.sin(2*PI*373*t))*np.exp(-37*t)
    return (click+wood).astype(np.float32)


def synth_hyoshigi() -> np.ndarray:
    """Two hardwood clappers: dry, pitched, non-metallic."""
    t=np.arange(int(.15*SR),dtype=np.float64)/SR
    ch=.52*np.sin(2*PI*762*t)+.26*np.sin(2*PI*1164*t)
    ch+=.10*RNG.normal(0,1,len(t))
    return (ch*np.exp(-48*t)).astype(np.float32)


# A little evening air persists, but the old low drones and mournful
# cinematic chord wash are removed entirely.
t=np.arange(N,dtype=np.float64)/SR
fade_start=np.minimum(1,t/1.1)
fade_end=np.minimum(1,np.maximum(0,N/SR-t)/1.8)
wind_slow=RNG.normal(0,.2,int(N/2800)+2)
wind=np.interp(np.arange(N),np.arange(len(wind_slow))*2800,wind_slow)
wind_high=RNG.normal(0,1,N)*.012
place(((wind*.5+wind_high)*fade_start*fade_end).astype(np.float32),0,.013,.32)

# The main figure repeats with natural variations, like quiet night-time
# festival music drifting from the Hollow Lantern courtyard.
section_roots=(50,55,57,50,55,57,50,50)
koto_patterns=[
    (62,69,71,74,69,67,64,62, 64,67,69,74,71,69,67,64),
    (67,71,74,76,74,71,69,67, 64,67,71,74,76,74,71,69),
    (69,74,76,79,76,74,71,69, 67,69,71,76,74,71,69,64),
    (62,64,67,69,74,71,69,67, 64,67,69,71,74,69,67,62),
    (67,69,71,74,76,74,71,69, 67,71,74,79,76,74,71,67),
    (69,71,74,76,79,76,74,71, 69,71,74,76,74,71,69,64),
    (62,69,71,74,76,74,71,69, 67,69,71,74,69,67,64,62),
    (62,64,67,69,74,71,69,67, 64,67,69,74,71,69,64,62),
]
shamisen_patterns=[
    (50,57,62,57, 50,57,62,57),
    (55,62,67,62, 55,62,67,62),
    (57,64,69,64, 57,64,69,64),
    (50,57,62,57, 50,57,62,57),
    (55,62,67,62, 55,62,67,62),
    (57,64,69,64, 57,64,69,64),
    (50,57,62,57, 50,57,62,57),
    (50,57,62,57, 50,57,62,57),
]
# Original flute responses; short skips and sustained ends rather than dirges.
flute_phrases=[
    ((2,74,1.4),(4,76,.65),(5,74,.8),(7,71,1.2),(9,69,.9),(11,71,.9),(13,74,1.8)),
    ((1,76,1.0),(3,74,.75),(4,71,1.6),(7,69,.9),(9,71,.9),(11,74,1.0),(13,76,1.5)),
    ((2,79,1.0),(4,76,1.1),(6,74,.8),(8,71,1.0),(10,74,.8),(12,76,1.1),(14,79,1.0)),
    ((1,76,.8),(3,74,.9),(5,71,1.2),(8,69,1.0),(10,67,1.0),(12,69,1.0),(14,74,1.0)),
    ((2,74,1.0),(4,76,.9),(6,79,1.3),(9,76,.8),(11,74,.9),(13,71,1.7)),
    ((1,74,.9),(3,76,.9),(5,79,.9),(7,81,1.1),(10,79,.7),(12,76,1.0),(14,74,1.0)),
    ((1,74,1.4),(4,71,.8),(6,69,.9),(8,71,1.1),(11,74,.9),(13,76,1.5)),
    ((1,76,.9),(3,74,.9),(5,71,.8),(7,69,1.2),(10,67,1.0),(12,69,.9),(14,74,1.0)),
]
for sec in range(8):
    offset=16*sec
    root=section_roots[sec]
    # Subtle tonic pluck on every measure; no heavy held chord beds.
    for b in (0,4,8,12):
        place(synth_pluck(root,1.8,-.05), (offset+b)*BEAT, .065,-.32)
        place(synth_pluck(root+12,1.4,.1),(offset+b+.03)*BEAT,.040,.24)
    # Koto is the centrepiece: brighter scale and rippling eighth notes.
    for i,pitch in enumerate(koto_patterns[sec]):
        vel=.102 if i in (0,3,8,12) else .078
        place(synth_pluck(pitch,1.22,.22),(offset+i)*BEAT,vel,(-.48,.40)[i%2])
        if i in (3,11):
            place(synth_pluck(pitch+12,.85,.33),(offset+i+.53)*BEAT,.034,.55)
    # Dry shamisen call-and-response in a slightly off-beat dance rhythm.
    for i,note in enumerate(shamisen_patterns[sec]):
        b=i*2+.50
        place(synth_shamisen(note,.65), (offset+b)*BEAT,
              .064 if i%2 else .077,(-.40,.42)[i%2])
    # Flute has clear, singable melodic movement and little grace notes.
    for i,(beat,note,dur) in enumerate(flute_phrases[sec]):
        if i in (1,4) and note>65:
            place(synth_flute(note-2,.25*BEAT),(offset+beat-.28)*BEAT,.019,.03)
        place(synth_flute(note,dur*BEAT),(offset+beat)*BEAT,
              .079 if sec in (2,5) else .069,(-.10,.18)[sec%2])
    # Moderate, understated matsuri-like percussion—not martial or gloomy.
    for b in (0,4,8,12):
        place(synth_drum(),(offset+b)*BEAT,.070 if b in (0,8) else .049,-.12)
    for b in (2,6,10,14):
        place(synth_shime(),(offset+b)*BEAT,.11,.31)
    for b in (3.5,7.5,11.5,15.5):
        place(synth_shime(),(offset+b)*BEAT,.063,-.24)
    if sec in (1,3,5,7):
        for b in (0,8):
            place(synth_hyoshigi(),(offset+b+.05)*BEAT,.085,.5)

# Dry/wet wooden-room echo creates long misty tails rather than sharp repeats.
dry=OUT.copy()
taps=[(.083,.072),(.157,.055),(.274,.042),(.441,.031),(.723,.018)]
for i,(delay,gain) in enumerate(taps):
    shift=round(delay*SR)
    OUT[shift:,i%2] += dry[:-shift,i%2]*gain
    OUT[shift:,1-i%2] += dry[:-shift,i%2]*gain*.38

# Avoid clipping, preserve dynamics, and write reproducible PCM.
peak=float(np.max(np.abs(OUT)))
if peak>0:
    OUT *= min(1.4,.86/peak)
OUT = np.tanh(OUT*1.13).astype(np.float32)
OUT[:int(1.0*SR)] *= np.linspace(0,1,int(1.0*SR),dtype=np.float32)[:,None]
OUT[-int(1.8*SR):] *= np.linspace(1,0,int(1.8*SR),dtype=np.float32)[:,None]
wav = AUDIO_DIR / "veil-beneath-the-torii.wav"
with wave.open(str(wav),"wb") as handle:
    handle.setnchannels(2)
    handle.setsampwidth(2)
    handle.setframerate(SR)
    handle.writeframes((OUT*32767).astype("<i2").tobytes())
print("Wrote original music:",wav,"duration",round(N/SR,1),"seconds")
try:
    subprocess.run([
        "ffmpeg","-hide_banner","-loglevel","error","-y",
        "-i",str(wav),"-codec:a","libmp3lame","-b:a","128k",
        "-metadata","title=Lanterns at Kurotsuki",
        "-metadata","artist=Kurotsuki Academy - Original Soundtrack",
        str(MP3)],check=True)
finally:
    wav.unlink(missing_ok=True)
print("Ready for website:",MP3,MP3.stat().st_size,"bytes")
