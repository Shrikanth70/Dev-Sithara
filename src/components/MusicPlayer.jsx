"use client";

import React, { useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";

export default function MusicPlayer({ isPlaying, onToggle, lang }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Royalty-free soft premium cinematic wedding background flute instrumental
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback failed due to user interaction policies:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onToggle}
        className="relative group w-14 h-14 rounded-full bg-surface-dark/90 backdrop-blur-md border border-champagne-gold/40 text-champagne-gold flex items-center justify-center shadow-2xl hover:scale-110 hover:border-champagne-gold transition-all duration-300 focus:outline-none"
        title={isPlaying ? (lang === "en" ? "Mute Music" : "మ్యూట్") : (lang === "en" ? "Play Music" : "సంగీతం")}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Animated Waveform Lines */}
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[2px] bg-champagne-gold rounded-full animate-[bounce_1s_infinite_100ms] h-3"></span>
              <span className="w-[2px] bg-champagne-gold rounded-full animate-[bounce_1s_infinite_300ms] h-4"></span>
              <span className="w-[2px] bg-champagne-gold rounded-full animate-[bounce_1s_infinite_500ms] h-2"></span>
              <span className="w-[2px] bg-champagne-gold rounded-full animate-[bounce_1s_infinite_200ms] h-3.5"></span>
            </div>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        {/* Glow border ring */}
        <span className="absolute -inset-[1px] rounded-full border border-champagne-gold/20 group-hover:border-champagne-gold/60 transition-all duration-500 scale-105 group-hover:scale-110"></span>
      </button>
    </div>
  );
}
