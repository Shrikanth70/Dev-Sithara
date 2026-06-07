"use client";

import React, { useState, useEffect } from "react";
import { translations } from "@/utils/translations";

export default function Countdown({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date("January 1, 2030 00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  const timeBlocks = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 bg-background-dark text-center px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.45)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
          {t.countdownTitle}
        </span>
        <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] mb-16 uppercase">
          {t.dateFull}
        </h2>

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 max-w-4xl mx-auto px-2">
          {timeBlocks.map((block, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center bg-[#1A0309]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-10 w-[74px] sm:w-24 md:w-36 border border-champagne-gold/25 shadow-[0_15px_35px_rgba(0,0,0,0.4)] relative group transition-all duration-300 hover:border-champagne-gold/60"
            >
              {/* Gold accent line inside */}
              <div className="absolute inset-x-0 top-0 h-[2px] sm:h-[3px] bg-gold-gradient rounded-t-lg sm:rounded-t-xl"></div>
              
              {/* Timer Number */}
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl text-gold drop-shadow-md mb-1 sm:mb-2 font-bold tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              
              {/* Divider line in middle of card (flip card style look) */}
              <div className="w-full h-[1px] bg-champagne-gold/10 my-1 sm:my-2"></div>
              
              {/* Unit label */}
              <span className="text-[8px] sm:text-[10px] md:text-xs font-montserrat uppercase tracking-[0.1em] sm:tracking-[0.2em] text-ivory-white/50 group-hover:text-champagne-gold transition-colors duration-300 truncate max-w-full text-center">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
