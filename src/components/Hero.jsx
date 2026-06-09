"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { translations } from "@/utils/translations";

export default function Hero({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Generate gold dust particles
    const generated = Array.from({ length: 45 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 5 + 1.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * -10,
    }));
    setParticles(generated);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-between pt-6 pb-4 md:pt-8 md:pb-14 overflow-hidden bg-black select-none">
      {/* Background Image with parallax */}
      <div 
        className="absolute inset-0 z-0 transition-transform will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.4}px) scale(${1.05 + scrollY * 0.0003})`,
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1590050752117-238cb061295a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Dev & Sithara Royal Wedding Background"
          className="w-full h-full object-cover opacity-65"
        />
        {/* Soft cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#230c13]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.3)_0%,transparent_70%)]"></div>
      </div>

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: "radial-gradient(circle, #D4AF37 0%, transparent 80%)",
              animation: `floatUp ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Top spacer to balance the navbar height */}
      <div className="h-8 md:h-12 w-full shrink-0"></div>

      {/* Hero Content Panel */}
      <div className="relative z-20 text-center px-6 max-w-4xl flex-1 flex flex-col items-center justify-center md:pb-10">
        {/* Circular Couple Portrait with Royal Border */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 0.95, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FFF5E1] to-[#B8860B] p-[6px] shadow-[0_0_35px_rgba(212,175,55,0.4)] mb-4 md:mb-6 group select-none relative overflow-hidden shrink-0"
        >
          <div className="w-full h-full rounded-full border-4 border-royal-wine/40 overflow-hidden bg-royal-wine/5">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Dev & Sithara Couple"
              className="w-full h-full object-cover scale-102 group-hover:scale-108 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Invitation lead */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-montserrat text-xs md:text-sm tracking-[0.4em] text-rose-gold uppercase mb-2 md:mb-3 shrink-0"
        >
          {t.together}
        </motion.p>

        {/* Large Script names */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="font-script text-4xl sm:text-6xl md:text-[130px] text-gold leading-[1.6] py-2 md:py-4 tracking-normal drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] pr-2 select-text overflow-visible shrink-0 whitespace-nowrap"
        >
          Dev <span className="font-serif text-2xl sm:text-3xl md:text-5xl text-ivory-white/40 italic mx-2 md:mx-4">&</span> Sithara
        </motion.h1>

        {/* Date and Location */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="flex flex-col md:flex-row items-center gap-3 md:gap-8 mt-4 md:mt-6 border-t border-b border-champagne-gold/20 py-4 px-8 shrink-0"
        >
          <span className="font-cinzel text-sm md:text-base text-champagne-gold tracking-[0.3em] uppercase">
            {t.dateFull}
          </span>
          <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-champagne-gold/40"></span>
          <span className="font-cinzel text-sm md:text-base text-champagne-gold tracking-[0.3em] uppercase">
            {t.locationFull}
          </span>
        </motion.div>
      </div>

      {/* Scroll Explore Indicator - flex child, always below content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="flex flex-col items-center gap-1 md:gap-2 z-30 shrink-0"
      >
        <span className="font-montserrat text-[10px] text-champagne-gold tracking-[0.4em] uppercase opacity-75">
          {t.scrollExplore}
        </span>
        <div className="scroll-line h-6 md:h-8"></div>
      </motion.div>
    </section>
  );
}
