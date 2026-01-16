"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SpaceAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // We track the oscillators so we can stop them cleanly
  const nodesRef = useRef<{
    osc1: OscillatorNode | null;
    osc2: OscillatorNode | null;
    gain: GainNode | null;
  }>({ osc1: null, osc2: null, gain: null });

  // 1. Initialize Audio Context
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }
    return audioContextRef.current;
  };

  // 2. The TRON Drone Generator
  const startDrone = (ctx: AudioContext) => {
    // If already running, don't double up
    if (nodesRef.current.osc1) return;

    const t = ctx.currentTime;

    // --- NODES ---
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const compressor = ctx.createDynamicsCompressor(); // Smooths out volume peaks

    // --- CONNECTIONS ---
    // Osc -> Gain -> Filter -> Compressor -> Output
    osc1.connect(masterGain);
    osc2.connect(masterGain);
    masterGain.connect(filter);
    filter.connect(compressor);
    compressor.connect(ctx.destination);

    // --- OSCILLATOR 1: The Foundation (Sub-Bass) ---
    osc1.type = "sine"; 
    osc1.frequency.value = 55; // 55Hz (A1) - Deep, warm bass

    // --- OSCILLATOR 2: The "Electric Phase" ---
    osc2.type = "sine";
    // Detuning it slightly creates a "Binaural Beat" effect.
    // 55Hz vs 55.25Hz = A slow 0.25Hz pulse (One throb every 4 seconds)
    osc2.frequency.value = 55.25; 

    // --- FILTER: The "Muffle" ---
    // We cut everything above 120Hz so it doesn't sound digital/piercing
    filter.type = "lowpass";
    filter.frequency.value = 120;
    filter.Q.value = 0; // Flat resonance

    // --- VOLUME FADE IN (Elegant Entry) ---
    masterGain.gain.setValueAtTime(0, t);
    // Ramp up to 0.15 (Subtle background volume) over 2 seconds
    masterGain.gain.linearRampToValueAtTime(0.15, t + 2);

    // --- START ---
    osc1.start(t);
    osc2.start(t);

    // Store refs for cleanup
    nodesRef.current = { osc1, osc2, gain: masterGain };
  };

  const stopDrone = (ctx: AudioContext) => {
    const { osc1, osc2, gain } = nodesRef.current;
    if (!osc1 || !osc2 || !gain) return;

    const t = ctx.currentTime;
    
    // Elegant Fade Out
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1); // 1 second fade out

    // Stop oscillators after fade
    osc1.stop(t + 1);
    osc2.stop(t + 1);

    // Clear refs
    nodesRef.current = { osc1: null, osc2: null, gain: null };
  };

  const toggleAudio = async () => {
    const ctx = initAudio();
    if (!ctx) return;

    // Browser Policy Fix: Always resume first
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (isMuted) {
      startDrone(ctx);
      setIsMuted(false);
    } else {
      stopDrone(ctx);
      setIsMuted(true);
    }
  };

  // 3. "Wake Up" Listener (The Auto-Unlock Fix)
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = initAudio();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      // Once unlocked, we don't need listeners anymore
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    document.addEventListener("touchstart", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      
      // Cleanup audio on unmount
      if (nodesRef.current.osc1) {
        try {
          nodesRef.current.osc1.stop();
          nodesRef.current.osc2?.stop();
        } catch (e) {}
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed z-[100] p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-white/40 transition-all duration-500 group cursor-pointer bottom-12 left-6 md:bottom-8 md:right-8 md:left-auto"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
      ) : (
        <div className="relative">
          {/* Subtle Pulse Animation matches the sound */}
          <Volume2 className="w-5 h-5 text-white/80 animate-pulse duration-[4000ms]" />
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full animate-pulse duration-[4000ms]" />
        </div>
      )}
    </button>
  );
}