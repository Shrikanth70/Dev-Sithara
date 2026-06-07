"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, Volume2, VolumeX } from "lucide-react";
import { translations } from "@/utils/translations";

export default function MemoryReel({ lang, isPlaying, setIsPlaying }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [focusedVideo, setFocusedVideo] = useState(null); // video object or null
  const [wasMusicPlaying, setWasMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef(null);

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

  const openFocus = useCallback((video) => {
    setWasMusicPlaying(isPlaying);
    if (isPlaying && setIsPlaying) setIsPlaying(false);
    setIsMuted(false);
    setFocusedVideo(video);
  }, [isPlaying, setIsPlaying]);

  const closeFocus = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setFocusedVideo(null);
    // Resume music if it was playing before
    if (wasMusicPlaying && setIsPlaying) {
      setIsPlaying(true);
    }
  }, [wasMusicPlaying, setIsPlaying]);

  // Play modal video once it's ready
  useEffect(() => {
    if (focusedVideo && modalVideoRef.current) {
      modalVideoRef.current.load();
      modalVideoRef.current.play().catch(() => {});
    }
  }, [focusedVideo]);

  // Keyboard ESC to close
  useEffect(() => {
    if (!focusedVideo) return;
    const onKey = (e) => { if (e.key === "Escape") closeFocus(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedVideo, closeFocus]);

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted((m) => !m);
    }
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
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden group cursor-pointer aspect-video bg-black shadow-2xl border border-champagne-gold/15 transition-all duration-500 hover:border-champagne-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              onClick={() => openFocus(video)}
            >
              {/* Muted autoplay background video */}
              <video
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

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border-2 border-champagne-gold/70 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-champagne-gold ml-1" fill="currentColor" />
                </div>
              </div>

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
              </div>

              {/* Gold glow border on hover */}
              <div className="absolute inset-0 border border-champagne-gold/0 group-hover:border-champagne-gold/20 rounded-lg transition-all duration-500 z-30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Focused Video Lightbox Modal */}
      <AnimatePresence>
        {focusedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeFocus}
          >
            {/* Subtle radial glow backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.4)_0%,transparent_70%)] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={closeFocus}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-black/60 border border-champagne-gold/30 text-champagne-gold flex items-center justify-center z-50 hover:bg-champagne-gold hover:text-background-dark transition-all duration-300 focus:outline-none"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mute toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="absolute top-5 left-5 w-11 h-11 rounded-full bg-black/60 border border-champagne-gold/30 text-champagne-gold flex items-center justify-center z-50 hover:bg-champagne-gold hover:text-background-dark transition-all duration-300 focus:outline-none"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold border frame */}
              <div className="p-[2px] rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#FFF5E1]/40 to-[#B8860B] shadow-[0_0_60px_rgba(212,175,55,0.3)]">
                <div className="rounded-xl overflow-hidden bg-black">
                  <video
                    ref={modalVideoRef}
                    src={focusedVideo.url}
                    poster={focusedVideo.poster}
                    className="w-full aspect-video object-cover"
                    controls
                    playsInline
                    autoPlay
                    muted={isMuted}
                    loop
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Film className="w-3.5 h-3.5 text-champagne-gold" />
                  <span className="font-montserrat text-[10px] text-rose-gold uppercase tracking-[0.3em]">
                    {focusedVideo.location}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-ivory-white tracking-wide">
                  {focusedVideo.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
