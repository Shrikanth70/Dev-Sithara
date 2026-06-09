"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Film, Volume2, VolumeX } from "lucide-react";
import { translations } from "@/utils/translations";

export default function MemoryReel({ lang, isPlaying, setIsPlaying }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  // activeId: which video has audio enabled (null = all muted)
  const [activeId, setActiveId] = useState(null);
  const videoRefs = useRef({});

  const videos = [
    {
      id: 1,
      title: lang === "en" ? "The Proposal Promise" : "ప్రేమ ప్రతిజ్ఞ",
      location: "Udaipur, Rajasthan",
      url: "https://assets.mixkit.co/videos/preview/mixkit-groom-putting-ring-on-brides-finger-40347-large.mp4",
      poster: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: lang === "en" ? "Glimpses of Forever" : "అనంతమైన బంధం",
      location: "Falaknuma Palace, Hyderabad",
      url: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-couple-in-traditional-indian-wedding-wear-40348-large.mp4",
      poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: lang === "en" ? "Sacred Celebrations" : "పవిత్ర వేడుకలు",
      location: "Charminar, Hyderabad",
      url: "https://assets.mixkit.co/videos/preview/mixkit-groom-putting-ring-on-brides-finger-40347-large.mp4",
      poster: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // When a card is clicked, enable audio on it and mute all others
  const handleVideoClick = useCallback((video) => {
    if (activeId === video.id) {
      // Second click: mute again
      const el = videoRefs.current[video.id];
      if (el) el.muted = true;
      setActiveId(null);
      if (setIsPlaying) setIsPlaying(true); // resume music
    } else {
      // Mute previously active
      if (activeId && videoRefs.current[activeId]) {
        videoRefs.current[activeId].muted = true;
      }
      // Pause background music
      if (isPlaying && setIsPlaying) setIsPlaying(false);
      const el = videoRefs.current[video.id];
      if (el) {
        el.muted = false;
        el.play().catch(() => {});
      }
      setActiveId(video.id);
    }
  }, [activeId, isPlaying, setIsPlaying]);

  const handleDownload = (e, video) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = video.url;
    a.download = `${video.title.replace(/\s+/g, "_")}.mp4`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-24 bg-surface-dark relative px-4 overflow-hidden border-t border-b border-champagne-gold/15 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.3)_0%,transparent_80%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
          {t.reelSubtitle}
        </span>
        <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] mb-16 uppercase">
          {t.reel}
        </h2>

        {/* Film strip grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video) => {
            const isActive = activeId === video.id;
            return (
              <div
                key={video.id}
                className="relative rounded-lg overflow-hidden group cursor-pointer aspect-video bg-black shadow-2xl border border-champagne-gold/15 transition-all duration-500 hover:border-champagne-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                onClick={() => handleVideoClick(video)}
              >
                {/* Muted autoplay background video */}
                <video
                  ref={(el) => { videoRefs.current[video.id] = el; }}
                  src={video.url}
                  poster={video.poster}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="metadata"
                />

                {/* Film Strip top */}
                <div className="absolute inset-x-0 top-0 h-4 bg-black/60 flex justify-around items-center px-4 pointer-events-none z-10">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-background-dark border border-champagne-gold/10"></div>
                  ))}
                </div>
                {/* Film Strip bottom */}
                <div className="absolute inset-x-0 bottom-0 h-4 bg-black/60 flex justify-around items-center px-4 pointer-events-none z-10">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-background-dark border border-champagne-gold/10"></div>
                  ))}
                </div>

                {/* Audio indicator / mute toggle shown when active */}
                {isActive && (
                  <div className="absolute top-6 right-6 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-champagne-gold/40 rounded-full px-3 py-1.5 pointer-events-none">
                    <Volume2 className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
                    <span className="font-montserrat text-[9px] text-champagne-gold uppercase tracking-widest">Audio On</span>
                  </div>
                )}

                {/* Download button — visible on hover */}
                <button
                  className="absolute top-6 left-6 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-champagne-gold/30 text-champagne-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-champagne-gold hover:text-background-dark"
                  title="Download video"
                  onClick={(e) => handleDownload(e, video)}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 pb-8 text-left z-20">
                  <div className="flex items-center gap-2 mb-1">
                    <Film className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
                    <span className="font-montserrat text-[10px] text-rose-gold uppercase tracking-[0.2em]">
                      {video.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-ivory-white tracking-wide">
                    {video.title}
                  </h3>
                  {/* Tap-to-audio hint */}
                  <p className="font-montserrat text-[9px] text-ivory-white/40 uppercase tracking-widest mt-1">
                    {isActive
                      ? (lang === "en" ? "Tap to mute" : "నొక్కండి మ్యూట్ చేయడానికి")
                      : (lang === "en" ? "Tap to hear audio" : "ఆడియో వినండి")}
                  </p>
                </div>

                {/* Gold glow border on hover */}
                <div className="absolute inset-0 border border-champagne-gold/0 group-hover:border-champagne-gold/20 rounded-lg transition-all duration-500 z-30 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
