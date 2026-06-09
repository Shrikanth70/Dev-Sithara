"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Camera, ZoomIn } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Gallery({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [activeIdx, setActiveIdx] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (activeIdx !== null || isHovered) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        // If we are near the end, scroll back to 0
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by one card width (approx 350px/420px depending on screen width) + gap
          const scrollAmount = clientWidth > 768 ? 420 + 24 : 280 + 24; 
          sliderRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: "smooth"
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIdx, isHovered]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "Royal Attire" : "రాజరిక శైలి",
      category: lang === "en" ? "Traditional" : "సంప్రదాయం",
    },
    {
      src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "The Promised Sunset" : "మాయా సూర్యాస్తమయం",
      category: lang === "en" ? "Cinematic" : "సినీమాటిక్",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "Celebration Details" : "వేడుక అలంకరణ",
      category: lang === "en" ? "Moments" : "మధుర క్షణాలు",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "Bridal Henna" : "మెహందీ సంబరాలు",
      category: lang === "en" ? "Pre-Wedding" : "ప్రీ-వెడ్డింగ్",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "Reception Decor" : "విందు వేదిక",
      category: lang === "en" ? "Luxury Decor" : "డెకరేషన్",
    },
    {
      src: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: lang === "en" ? "Finery & Jewels" : "సాంప్రదాయ ఆభరణాలు",
      category: lang === "en" ? "Heritage" : "ఆభరణాలు",
    },
  ];

  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section id="gallery" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {t.gallerySubtitle}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.gallery}
          </h2>
          <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto"></div>
        </div>

        {/* Netflix-style Horizontal Slider */}
        <div className="relative group/slider max-w-7xl mx-auto">
          {/* Left Navigation Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-champagne-gold/30 text-champagne-gold flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-30 hover:bg-champagne-gold hover:text-background-dark hover:border-champagne-gold"
            title="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-champagne-gold/30 text-champagne-gold flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-30 hover:bg-champagne-gold hover:text-background-dark hover:border-champagne-gold"
            title="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrolling Row */}
          <div 
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex overflow-x-auto gap-6 pb-8 pt-4 scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="w-[280px] sm:w-[350px] md:w-[420px] aspect-[3/2] shrink-0 snap-start relative overflow-hidden border border-champagne-gold/15 rounded-sm cursor-pointer group shadow-xl hover:border-champagne-gold/30 transition-all duration-500"
                onClick={() => setActiveIdx(idx)}
              >
                {/* Image with hover Ken Burns zoom */}
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transform scale-101 group-hover:scale-106 transition-transform duration-[1.2s] ease-out"
                  loading="lazy"
                />

                {/* Glass overlay details */}
                <div className="absolute inset-0 bg-royal-wine/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <span className="font-montserrat text-[10px] text-rose-gold tracking-[0.25em] uppercase mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-lg text-ivory-white tracking-wide">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Elegant Image Viewer */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveIdx(null)}
          >
            {/* Compact image card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold accent frame */}
              <div className="p-[1px] rounded-sm bg-gradient-to-br from-[#D4AF37]/60 via-[#FFF5E1]/20 to-[#B8860B]/60 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)]">
                <div className="relative rounded-sm overflow-hidden bg-black">
                  <img
                    src={images[activeIdx].src}
                    alt={images[activeIdx].title}
                    className="w-full max-h-[55vh] object-contain block"
                  />

                  {/* Caption bar */}
                  <div className="px-5 py-3 bg-black/80 border-t border-champagne-gold/15 flex items-center justify-between">
                    <div>
                      <span className="font-montserrat text-[9px] text-rose-gold tracking-[0.25em] uppercase block">
                        {images[activeIdx].category}
                      </span>
                      <h3 className="font-serif text-sm text-ivory-white tracking-wide">
                        {images[activeIdx].title}
                      </h3>
                    </div>
                    {/* Inline nav arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-8 h-8 rounded-full bg-white/5 border border-champagne-gold/20 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-background-dark transition-all duration-200 focus:outline-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-8 h-8 rounded-full bg-white/5 border border-champagne-gold/20 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-background-dark transition-all duration-200 focus:outline-none"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button — top-right corner of card */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background-dark border border-champagne-gold/30 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-background-dark transition-all duration-200 z-20 focus:outline-none shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
