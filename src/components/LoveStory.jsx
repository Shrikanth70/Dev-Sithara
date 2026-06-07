"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Stars, MapPin, Sparkles } from "lucide-react";
import { translations } from "@/utils/translations";

export default function LoveStory({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});


  const storyItems = [
    {
      year: "2015",
      title: t.storyChildhood,
      desc: t.storyChildhoodDesc,
      icon: Stars,
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2024",
      title: t.storyMeeting,
      desc: t.storyMeetingDesc,
      icon: Heart,
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2028",
      title: t.storyProposal,
      desc: t.storyProposalDesc,
      icon: Sparkles,
      img: "https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2030",
      title: t.storyWedding,
      desc: t.storyWeddingDesc,
      icon: Heart,
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="our-story" className="py-24 bg-background-dark px-4 relative overflow-hidden">
      {/* Background stardust texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {t.storySubtitle}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.story}
          </h2>
          <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto"></div>
        </div>

        {/* Timeline Center Line */}
        <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[1px] bg-gradient-to-b from-champagne-gold/40 via-champagne-gold/20 to-transparent transform -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-20 md:space-y-32 relative">
          {storyItems.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? "md:flex-row-reverse" : ""
                } pl-8 md:pl-0`}
              >
                {/* Center Timeline Node */}
                <div className="absolute left-[-8px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background-dark border-2 border-champagne-gold z-15 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold"></div>
                </div>

                {/* Left/Right Media Panel */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <div className="rounded-sm overflow-hidden shadow-2xl relative group aspect-[4/3] border border-champagne-gold/15 hover:border-champagne-gold/30 transition-colors duration-500">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform scale-102 group-hover:scale-108 transition-transform duration-1000 ease-out" 
                      loading="lazy"
                    />
                    {item.year === "2030" && (
                      <div className="absolute bottom-4 left-4 glass-card px-4 py-2 border border-champagne-gold/20 z-20 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-champagne-gold" />
                        <span className="font-montserrat text-[10px] text-ivory-white tracking-widest uppercase">Falaknuma Palace</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Left/Right Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className={`w-full md:w-1/2 flex flex-col justify-center ${
                    isEven ? "md:text-left md:pl-8" : "md:text-right md:pr-8"
                  }`}
                >
                  <div className={`flex items-center gap-3 mb-3 ${isEven ? "justify-start" : "justify-start md:justify-end"}`}>
                    <Icon className="w-4 h-4 text-champagne-gold animate-pulse" />
                    <span className="font-cinzel text-xl text-gold font-bold tracking-wider">{item.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory-white mb-4 italic">
                    {item.title}
                  </h3>
                  <p className="text-ivory-white/70 leading-relaxed text-sm md:text-base font-sans font-light">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
