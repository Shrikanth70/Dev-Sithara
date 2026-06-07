"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, Send } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Guestbook({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Initial dummy premium wishes
    const defaultWishes = [
      {
        name: "Priya & Rahul",
        message: lang === "en" 
          ? "Wishing you both a lifetime of eternal joy and romance. The way you look at each other is pure magic."
          : "మీకు జీవితాంతం సంతోషం, ఆనందం కలగాలని కోరుకుంటున్నాము. మీ జంట చాలా అద్భుతంగా ఉంది.",
      },
      {
        name: "The Sharma Family",
        message: lang === "en"
          ? "Congratulations to the most beautiful couple! We cannot wait to celebrate your big day with you in Hyderabad."
          : "అందమైన జంటకు శుభాకాంక్షలు! హైదరాబాద్‌లో జరిగే మీ వివాహ వేడుకలో పాల్గొనడానికి మేము ఎంతగానో ఎదురుచూస్తున్నాము.",
      },
      {
        name: "Amit Malhotra",
        message: lang === "en"
          ? "May your love grow stronger with each passing year. Falaknuma Palace is the perfect venue for a royal couple like you."
          : "సంవత్సరాలు గడుస్తున్నా మీ ప్రేమ మరింత బలపడాలని ఆశిస్తున్నాను. మీ రాజరిక వివాహానికి ఫలక్‌నుమా ప్యాలెస్ సరైన వేదిక.",
      }
    ];

    const stored = localStorage.getItem("wedding_wishes");
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch (e) {
        setWishes(defaultWishes);
      }
    } else {
      setWishes(defaultWishes);
      localStorage.setItem("wedding_wishes", JSON.stringify(defaultWishes));
    }
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = { name, message };
    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));
    
    setName("");
    setMessage("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="guestbook" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.3)_0%,transparent_80%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Submit Wish Form */}
        <div className="bg-royal-wine/25 backdrop-blur-md p-8 md:p-12 rounded-lg border border-champagne-gold/15 shadow-2xl">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-3 block">
            {lang === "en" ? "Leave Your Blessings" : "మీ శుభాకాంక్షలు"}
          </span>
          <h2 className="font-cinzel text-2xl md:text-3xl text-champagne-gold tracking-[0.15em] mb-6 uppercase">
            {t.wishes}
          </h2>
          <p className="text-sm text-ivory-white/60 mb-10 leading-relaxed font-sans font-light">
            {t.guestbookSubtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent text-sm font-sans"
                placeholder="Name"
                required
              />
              <label className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest">
                {t.rsvpName}
              </label>
            </div>

            <div className="relative group">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent resize-none overflow-hidden text-sm font-sans"
                placeholder="Wishes"
                required
              ></textarea>
              <label className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest">
                {t.guestbookPlaceholder}
              </label>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-3 border border-champagne-gold text-champagne-gold py-4 rounded-sm font-montserrat font-bold tracking-widest uppercase hover:bg-champagne-gold hover:text-background-dark transition-all duration-500 shadow-md focus:outline-none"
            >
              {t.leaveWish}
              <Send className="w-4 h-4" />
            </button>

            {isSuccess && (
              <p className="text-xs text-rose-gold text-center font-sans animate-pulse">
                {t.guestbookSuccess}
              </p>
            )}
          </form>
        </div>

        {/* Right Side: Wishes Feed Carousel list */}
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 relative scrollbar-thin">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-champagne-gold animate-pulse" />
            <span className="font-montserrat text-xs text-rose-gold uppercase tracking-widest font-semibold">
              {lang === "en" ? "Recent Blessings" : "ఇటీవలి శుభాకాంక్షలు"}
            </span>
          </div>

          <div className="space-y-6">
            {wishes.map((w, idx) => (
              <div 
                key={idx}
                className="bg-royal-wine/15 border border-champagne-gold/10 p-6 rounded-lg backdrop-blur-sm relative group hover:border-champagne-gold/25 transition-colors duration-300"
              >
                <Quote className="text-champagne-gold/25 w-8 h-8 absolute top-4 right-4 pointer-events-none group-hover:text-champagne-gold/40 transition-colors duration-500" />
                <p className="text-ivory-white/90 italic font-serif text-base mb-4 leading-relaxed pr-8">
                  "{w.message}"
                </p>
                <p className="text-champagne-gold font-montserrat font-bold text-xs uppercase tracking-wider">
                  — {w.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
