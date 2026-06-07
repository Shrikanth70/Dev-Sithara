"use client";

import React from "react";
import { Gift, Heart, QrCode } from "lucide-react";
import { translations } from "@/utils/translations";

export default function GiftRegistry({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});


  return (
    <section id="registry" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.35)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center bg-royal-wine/25 backdrop-blur-md p-8 md:p-16 rounded-lg border border-champagne-gold/15 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        <Gift className="w-12 h-12 text-champagne-gold mb-6 animate-bounce" />
        
        <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-3 block">
          {lang === "en" ? "Registry & Blessings" : "కానుకలు మరియు ఆశీస్సులు"}
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-gold tracking-[0.2em] mb-6 uppercase">
          {t.gift}
        </h2>
        
        <p className="text-ivory-white/70 max-w-md mx-auto leading-relaxed font-sans font-light text-sm md:text-base mb-10">
          {t.blessingsDesc}
        </p>

        {/* QR Code Container and bank details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-2xl">
          {/* QR Code Box */}
          <div className="bg-white p-5 rounded-lg shadow-2xl flex flex-col items-center justify-center border border-champagne-gold/20">
            <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center flex-col gap-2 relative bg-gray-50">
              <QrCode className="w-20 h-20 text-gray-500" />
              <span className="text-[10px] text-gray-400 uppercase font-montserrat font-bold tracking-widest">
                UPI Scan
              </span>
            </div>
            <p className="mt-4 text-xs font-montserrat text-gray-600 font-bold tracking-widest uppercase">
              {t.upiRegistry}
            </p>
          </div>

          {/* Account Details Box */}
          <div className="text-left space-y-4 max-w-xs w-full bg-surface-dark/40 p-6 rounded-lg border border-champagne-gold/10 font-sans">
            <h4 className="font-serif text-lg text-gold mb-4 border-b border-champagne-gold/20 pb-2">
              {lang === "en" ? "Bank Details" : "బ్యాంక్ వివరాలు"}
            </h4>
            
            <div className="text-xs space-y-3 font-light text-ivory-white/80">
              <div>
                <span className="text-[10px] text-rose-gold/60 uppercase block font-montserrat">Account Name</span>
                <span className="text-sm font-medium text-ivory-white">Dev & Sithara Union</span>
              </div>
              
              <div>
                <span className="text-[10px] text-rose-gold/60 uppercase block font-montserrat">Bank Name</span>
                <span className="text-sm font-medium text-ivory-white">HDFC Bank, Hyderabad</span>
              </div>

              <div>
                <span className="text-[10px] text-rose-gold/60 uppercase block font-montserrat">Account Number</span>
                <span className="text-sm font-medium text-ivory-white tracking-widest">50100234567890</span>
              </div>

              <div>
                <span className="text-[10px] text-rose-gold/60 uppercase block font-montserrat">IFSC Code</span>
                <span className="text-sm font-medium text-ivory-white tracking-widest">HDFC0000123</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-champagne-gold fill-champagne-gold/20" />
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-montserrat font-semibold">
            {t.scanToGift}
          </p>
        </div>
      </div>
    </section>
  );
}
