"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Envelope({ onOpen, lang, setLang }) {
  const [isOpening, setIsOpening] = useState(false);
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // Trigger transition after curtain slides
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background-dark">
      {/* Background stardust texture */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      ></div>

      {/* Floating Language Switcher in top right */}
      {!isOpening && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-6 right-6 z-50"
        >
          <button 
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-champagne-gold hover:text-rose-gold transition-all duration-300 uppercase tracking-[0.15em] bg-champagne-gold/10 px-4 py-2 rounded-full border border-champagne-gold/20 hover:border-champagne-gold backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-95"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Telugu" : "English"}</span>
          </button>
        </motion.div>
      )}

      {/* Left Curtain */}
      <motion.div 
        initial={{ x: 0 }}
        animate={isOpening ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#2A050E] flex justify-end items-center border-r border-champagne-gold/30 shadow-[5px_0_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-full h-full absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] mix-blend-overlay"></div>
      </motion.div>

      {/* Right Curtain */}
      <motion.div 
        initial={{ x: 0 }}
        animate={isOpening ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#2A050E] flex justify-start items-center border-l border-champagne-gold/30 shadow-[-5px_0_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-full h-full absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] mix-blend-overlay"></div>
      </motion.div>

      {/* Center Wax Seal and Monogram Panel */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-50 flex flex-col items-center justify-center px-4"
          >
            {/* The Envelope Box Visual (Stitch styling) */}
            <div className="w-[320px] h-[280px] md:w-[420px] md:h-[360px] bg-gradient-to-br from-[#3D0A14] to-[#1F040A] rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border-2 border-champagne-gold/30 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
              {/* Subtle gold floral ornament or vector pattern */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/gold-cobwebs.png')] pointer-events-none"></div>
              
              {/* Inner card border */}
              <div className="absolute inset-3 border border-champagne-gold/20 rounded-md flex flex-col items-center justify-between py-6 px-4 z-10 bg-[#2A050E]/85 shadow-inner">
                {/* Royal Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-champagne-gold/40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-champagne-gold/40"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-champagne-gold/40"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-champagne-gold/40"></div>

                {/* Couple Names Inside the Box */}
                <div className="text-center">
                  <h2 className="font-serif text-lg md:text-2xl text-ivory-white tracking-[0.2em] uppercase">
                    Dev <span className="text-champagne-gold">&</span> Sithara
                  </h2>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent mx-auto mt-2"></div>
                </div>

                {/* Couple Portrait Wax Seal */}
                <div 
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FFF5E1] to-[#B8860B] p-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transform hover:scale-105 transition-transform duration-500 z-20 group"
                  onClick={handleOpen}
                >
                  <div className="w-full h-full rounded-full border-4 border-royal-wine overflow-hidden bg-royal-wine/10 backdrop-blur-xs flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Dev & Sithara Couple Portrait"
                      className="w-full h-full object-cover scale-102 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Elegant small subtitle below the seal */}
                <div className="text-center">
                  <p className="font-cinzel text-[9px] md:text-[11px] text-champagne-gold tracking-[0.3em] uppercase select-none font-bold opacity-80">
                    A Royal Union
                  </p>
                </div>
              </div>
            </div>

            {/* Invite Action - Moved Up */}
            <div className="text-center mt-8 z-10 flex flex-col items-center">
              <button
                onClick={handleOpen}
                className="group relative px-10 py-4 bg-champagne-gold/15 overflow-hidden rounded-full border border-champagne-gold/60 transition-all hover:bg-champagne-gold/25 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 w-0 bg-champagne-gold transition-all duration-[500ms] ease-out group-hover:w-full opacity-15"></div>
                <span className="relative flex items-center gap-3 font-montserrat text-xs md:text-sm tracking-[0.25em] font-semibold text-ivory-white uppercase">
                  {t.breakSeal} <ArrowRight className="w-4 h-4 animate-pulse text-champagne-gold" />
                </span>
              </button>
              <p className="mt-3 font-sans text-xs text-ivory-white/40 italic tracking-wider">
                {t.clickToReveal}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
