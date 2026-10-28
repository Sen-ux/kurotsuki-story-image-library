#!/usr/bin/env python3
"""Compose an original dark-fantasy ambient soundtrack for Kurotsuki Academy.

"Veil Beneath the Torii" — an original 85-second, repeatable instrumental.
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
BPM = 68
BEAT = 60 / BPM
TOTAL_BEATS = 96
TAIL = 2.5
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


# A near-continuous low drone in D and A: soft, slightly wavering string resonance.
t=np.arange(N,dtype=np.float64)/SR
drone = (.29*np.sin(2*PI*hz(38)*t)
         + .15*np.sin(2*PI*hz(45)*t+.4)
         + .06*np.sin(2*PI*hz(50)*t+.8))
drone *= .72 + .22*np.sin(2*PI*.038*t)**2
fade_start = np.minimum(1,t/4.0)
fade_end = np.minimum(1,np.maximum(0,(N/SR-t))/3.0)
drone = (drone * fade_start * fade_end).astype(np.float32)
place(drone, 0, .19, -.1)

# Restrained moving mountain wind, with no recordings or samples.
gust_positions = np.arange(0,N,2300)
gust_knots = RNG.normal(0,1,len(gust_positions)+1)
wind_low = np.interp(np.arange(N),gust_positions,
                     gust_knots[:-1])
wind_hiss = RNG.normal(0,1,N).astype(np.float32)
wind_smoothed = np.cumsum(np.pad(wind_hiss,(1,0)).astype(np.float64))
smooth_size = 45
smoothed = np.zeros(N,dtype=np.float64)
smoothed[smooth_size:] = (wind_smoothed[smooth_size+1:]-wind_smoothed[1:-smooth_size])/smooth_size
wind = (.8*wind_low+.8*smoothed)*fade_start*fade_end
place(wind.astype(np.float32),0,.0085,.18)

# Four-chord modal progression slowly returns to its home beneath the torii.
harmony = [
    (50,57,62,65),  # Dm
    (46,53,58,62),  # Bb
    (43,50,55,58),  # Gm
    (50,57,62,65),  # Dm
    (43,50,55,58),  # Gm
    (50,57,62,65),  # Dm
]
for section,chord in enumerate(harmony):
    start=section*16*BEAT
    for i,note in enumerate(chord):
        place(synth_pad(note,16*BEAT+1.1,(-.65,-.2,.2,.65)[i]),
              start,.024 if i<2 else .017,(-.65,-.2,.2,.65)[i])

# An original six-phrase koto-like arpeggio: delicate but slightly dissonant.
pluck_patterns = [
    [62,69,65,72,69,65,62,60],
    [58,65,62,70,65,62,58,57],
    [55,62,58,67,62,58,55,53],
    [62,69,65,74,69,65,62,60],
    [55,62,58,69,67,62,58,55],
    [62,69,65,72,69,65,62,62],
]
positions = (0,2.5,4.5,6,8.5,10.5,12.5,14)
for section,pattern in enumerate(pluck_patterns):
    for j,(position,note) in enumerate(zip(positions,pattern)):
        gain = .078 if j in (0,3,5) else .052
        place(synth_pluck(note,1.8,(-.55,.55)[j%2]),
              (section*16+position)*BEAT,gain,(-.55,.55)[j%2])

# Breath-driven flute melody: intentionally sparse and entirely newly composed.
flute_notes = [
    (2,69,2.5),(6.5,65,2.1),(11,67,1.5),(13.2,62,2.3),
    (18,70,2.2),(22,69,3.2),(27,65,2.1),(30,62,1.2),
    (34,67,2.4),(39,65,2.0),(43,62,2.9),
    (51,69,2.8),(55,72,1.9),(60,69,3.0),
    (67,67,2.1),(71,65,2.9),(77,62,2.0),
    (82,69,2.5),(86,65,2.2),(91,62,3.2),
]
for idx,(beat,note,duration) in enumerate(flute_notes):
    place(synth_flute(note,duration*BEAT),beat*BEAT,
          .077 if idx%5 else .062,(-.21,.17)[idx%2])

for i,beat in enumerate((0,8,16,32,40,48,64,80,88)):
    place(synth_drum(),beat*BEAT,.092 if i%3 else .11,(-.08,.08)[i%2])

# Dry/wet wooden-room echo creates long misty tails rather than sharp repeats.
dry=OUT.copy()
taps=[(.103,.13),(.167,.11),(.283,.095),(.431,.082),
      (.619,.07),(.887,.052),(1.18,.036),(1.56,.025)]
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
        "-metadata","title=Veil Beneath the Torii",
        "-metadata","artist=Kurotsuki Academy - Original Soundtrack",
        str(MP3)],check=True)
finally:
    wav.unlink(missing_ok=True)
print("Ready for website:",MP3,MP3.stat().st_size,"bytes")
