"use client";

import { useCallback, useRef } from "react";

export function useSynthClick() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (typeof window === "undefined") return null;
    
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }
    
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    
    return audioContextRef.current;
  };

  const playClick = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // 1. ARCHITECTURE: Simple is elegant. 
    // Single Oscillator (Source) -> Gain (Volume) -> Filter (Muffle) -> Output
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);

    // 2. THE SOUND (Deep Sine Wave)
    osc.type = "sine"; // "Sine" is the smoothest, deepest waveform (no buzz)

    // 3. THE "BMMMMM" (Pitch Drop)
    // Start at 120Hz (Audible Low) -> Drop to 40Hz (Sub-bass feel)
    // This creates that "heavy object settling" feeling
    osc.frequency.setValueAtTime(120, t); 
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);

    // 4. THE FILTER (Warmth)
    // We cut off high frequencies so it doesn't sound like a computer "beep"
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(250, t); // Very low cutoff for that "muffled" luxury sound
    filter.Q.value = 0; // No resonance, just pure dampening

    // 5. THE ENVELOPE (Soft Attack)
    // No click at the start, just a swell of bass
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.6, t + 0.02); // 20ms fade in (removes the "click")
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25); // Long, smooth release

    // 6. PLAY
    osc.start(t);
    osc.stop(t + 0.3); // Stop after the tail finishes
  }, []);

  return { playClick };
}