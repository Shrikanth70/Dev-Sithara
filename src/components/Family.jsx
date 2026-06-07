"use client";

import React from "react";
import { motion } from "framer-motion";
import { translations } from "@/utils/translations";

export default function Family({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});


  const families = {
    groom: {
      title: t.groomFamily,
      parentsRole: t.parentsOfGroom,
      members: [
        {
          name: "Mr. Ramesh K.",
          role: lang === "en" ? "Father" : "తండ్రి",
          img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        {
          name: "Mrs. Sunitha R.",
          role: lang === "en" ? "Mother" : "తల్లి",
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
      ],
    },
    bride: {
      title: t.brideFamily,
      parentsRole: t.parentsOfBride,
      members: [
        {
          name: "Mr. Krishna M.",
          role: lang === "en" ? "Father" : "తండ్రి",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        {
          name: "Mrs. Lakshmi K.",
          role: lang === "en" ? "Mother" : "తల్లి",
          img: "https://images.unsplash.com/photo-1531123897727-8f129e1b88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
      ],
    },
  };

  return (
    <section id="family" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.3)_0%,transparent_80%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {lang === "en" ? "Blessed by Generations" : "పెద్దల ఆశీస్సులు"}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.family}
          </h2>
          <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Groom's Family Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="font-serif text-3xl text-gold mb-4 italic">
              {families.groom.title}
            </h3>
            <span className="font-montserrat text-xs text-rose-gold/60 uppercase tracking-widest mb-10">
              {families.groom.parentsRole}
            </span>

            <div className="flex flex-row justify-center gap-8 md:gap-12 flex-wrap">
              {families.groom.members.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-champagne-gold/25 p-1 mb-4 shadow-xl group-hover:border-champagne-gold transition-colors duration-500">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-[1s]" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full border border-champagne-gold/10 pointer-events-none scale-95"></div>
                  </div>
                  <h4 className="font-serif text-lg text-ivory-white">
                    {member.name}
                  </h4>
                  <span className="text-xs font-montserrat text-ivory-white/40 uppercase tracking-wider mt-1">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bride's Family Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="font-serif text-3xl text-gold mb-4 italic">
              {families.bride.title}
            </h3>
            <span className="font-montserrat text-xs text-rose-gold/60 uppercase tracking-widest mb-10">
              {families.bride.parentsRole}
            </span>

            <div className="flex flex-row justify-center gap-8 md:gap-12 flex-wrap">
              {families.bride.members.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-champagne-gold/25 p-1 mb-4 shadow-xl group-hover:border-champagne-gold transition-colors duration-500">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-[1s]" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full border border-champagne-gold/10 pointer-events-none scale-95"></div>
                  </div>
                  <h4 className="font-serif text-lg text-ivory-white">
                    {member.name}
                  </h4>
                  <span className="text-xs font-montserrat text-ivory-white/40 uppercase tracking-wider mt-1">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
