"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SpaceAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const beepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Audio Context
  const initAudio = () => {
    if (!audioContextRef.current) {
      // Cross-browser support
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      
      // MASTER VOLUME (Boosted)
      const ctx = audioContextRef.current;
      const gain = ctx.createGain();
      gain.gain.value = 0.1; // Increased from 0.4 to 0.8
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;
    }
  };

  const createBrownNoise = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate Brown Noise
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // FILTER (Crucial Fix)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    
    // CHANGED: 120Hz -> 600Hz 
    // This allows the "hiss" of air to be heard on laptop speakers
    filter.frequency.value = 600; 

    noise.connect(filter);
    
    if (gainNodeRef.current) {
        filter.connect(gainNodeRef.current);
    }
    
    return noise;
  };

  const playBeep = () => {
    const ctx = audioContextRef.current;
    if (!ctx || !gainNodeRef.current || ctx.state === "suspended") return;

    const osc = ctx.createOscillator();
    const beepGain = ctx.createGain();

    osc.type = "sine";
    // Slightly lower pitch range to be more audible
    osc.frequency.setValueAtTime(600 + Math.random() * 500, ctx.currentTime);

    // Louder beep volume
    beepGain.gain.setValueAtTime(0.1, ctx.currentTime); 
    beepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(beepGain);
    beepGain.connect(gainNodeRef.current);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  };

  const toggleAudio = async () => {
    // 1. Initialize if missing
    if (!audioContextRef.current) {
      initAudio();
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    // 2. FORCE RESUME (Browser Policy Fix)
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (isMuted) {
      // --- PLAY ---
      
      // Start Drone if it's not running
      if (!droneNodeRef.current) {
        droneNodeRef.current = createBrownNoise(ctx);
        droneNodeRef.current.start();
      }

      // Start Telemetry Beeps
      if (!beepIntervalRef.current) {
        // Immediate beep to prove it works
        playBeep(); 
        
        beepIntervalRef.current = setInterval(() => {
            if (Math.random() > 0.5) { 
                playBeep();
            }
        }, 1500); // More frequent for testing
      }
      
      setIsMuted(false);
    } else {
      // --- MUTE ---
      
      // Don't close context, just stop the nodes or suspend
      // Suspending retains the hardware link
      await ctx.suspend();
      
      setIsMuted(true);
      
      // Clear interval
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
        beepIntervalRef.current = null;
      }
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (droneNodeRef.current) {
        try { droneNodeRef.current.stop(); } catch(e) {}
      }
      if (beepIntervalRef.current) clearInterval(beepIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
      ) : (
        <div className="relative">
          <Volume2 className="w-5 h-5 text-blue-400 animate-pulse" />
          <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse" />
        </div>
      )}
    </button>
  );
}