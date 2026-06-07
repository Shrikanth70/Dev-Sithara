"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, Heart, User, Mail, Phone, Users, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { translations } from "@/utils/translations";

export default function RSVP({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      guests: "1 Guest",
      attendance: t.rsvpYes || "Joyfully Accepts",
      message: "",
    }
  });


  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Trigger canvas confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFF5E1", "#4A0E1B", "#E0B0FF"]
    });
    
    setIsSubmitted(true);
    setIsLoading(false);

    // Save RSVP state locally to demonstrate production readiness
    localStorage.setItem("rsvp_submitted", "true");
    localStorage.setItem("rsvp_details", JSON.stringify(data));
  };

  const guestOptions = [
    { label: lang === "en" ? "1 Guest" : "1 అతిథి", value: "1 Guest" },
    { label: lang === "en" ? "2 Guests" : "2 అతిథులు", value: "2 Guests" },
    { label: lang === "en" ? "3 Guests" : "3 అతిథులు", value: "3 Guests" },
    { label: lang === "en" ? "4 Guests" : "4 అతిథులు", value: "4 Guests" },
    { label: lang === "en" ? "5+ Guests" : "5+ అతిథులు", value: "5+ Guests" },
  ];

  return (
    <section id="rsvp" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      {/* Background stardust */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-4xl mx-auto relative z-10 bg-royal-wine/25 backdrop-blur-md rounded-lg p-8 md:p-16 border border-champagne-gold/15 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        
        {/* Soft layout decoration */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-ivory-white/5 to-transparent rotate-12 pointer-events-none"></div>

        <div className="text-center mb-12 relative">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {lang === "en" ? "KINDLY RESPOND" : "మీ రాకను నిర్ధారించండి"}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.rsvp}
          </h2>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-6"></div>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-20 h-20 text-champagne-gold mx-auto mb-6 animate-[pulse_1.5s_infinite] fill-champagne-gold/20" />
            <h3 className="font-serif text-3xl text-gold mb-4">
              {t.rsvpSuccess}
            </h3>
            <p className="text-ivory-white/80 text-lg font-sans font-light max-w-md mx-auto leading-relaxed">
              {t.rsvpSuccessSub}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="relative group">
                <input 
                  type="text" 
                  id="fullname"
                  className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent text-sm md:text-base font-sans"
                  placeholder="Full Name"
                  {...register("fullname", { required: true })}
                />
                <label 
                  htmlFor="fullname"
                  className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest"
                >
                  {t.rsvpName}
                </label>
                {errors.fullname && (
                  <span className="text-xs text-rose-500 font-sans mt-1 block">Full name is required</span>
                )}
              </div>

              {/* Email */}
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent text-sm md:text-base font-sans"
                  placeholder="Email"
                  {...register("email", { 
                    required: true, 
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
                  })}
                />
                <label 
                  htmlFor="email"
                  className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest"
                >
                  {t.rsvpEmail}
                </label>
                {errors.email && (
                  <span className="text-xs text-rose-500 font-sans mt-1 block">Valid email is required</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone */}
              <div className="relative group">
                <input 
                  type="tel" 
                  id="phone"
                  className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent text-sm md:text-base font-sans"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
                <label 
                  htmlFor="phone"
                  className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest"
                >
                  {t.rsvpPhone}
                </label>
                {errors.phone && (
                  <span className="text-xs text-rose-500 font-sans mt-1 block">Phone number is required</span>
                )}
              </div>

              {/* Number of Guests */}
              <div className="relative group">
                <select 
                  id="guests"
                  className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors text-sm md:text-base font-sans cursor-pointer"
                  {...register("guests")}
                >
                  {guestOptions.map((opt, i) => (
                    <option key={i} value={opt.value} className="bg-surface-dark text-ivory-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <label 
                  htmlFor="guests"
                  className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest pointer-events-none"
                >
                  {t.rsvpGuests}
                </label>
              </div>
            </div>

            {/* Attendance Choice */}
            <div className="space-y-4">
              <span className="font-montserrat text-xs text-champagne-gold/60 uppercase tracking-widest block">
                {t.rsvpAttending}
              </span>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value={t.rsvpYes}
                    className="peer hidden"
                    {...register("attendance")}
                  />
                  <div className="w-5 h-5 rounded-full border border-champagne-gold/30 group-hover:border-champagne-gold flex items-center justify-center peer-checked:border-champagne-gold peer-checked:bg-champagne-gold/15 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-sm text-ivory-white/80 group-hover:text-ivory-white transition-colors">
                    {t.rsvpYes}
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value={t.rsvpNo}
                    className="peer hidden"
                    {...register("attendance")}
                  />
                  <div className="w-5 h-5 rounded-full border border-champagne-gold/30 group-hover:border-champagne-gold flex items-center justify-center peer-checked:border-champagne-gold peer-checked:bg-champagne-gold/15 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-sm text-ivory-white/80 group-hover:text-ivory-white transition-colors">
                    {t.rsvpNo}
                  </span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="relative group">
              <textarea 
                id="message"
                rows={2}
                className="peer w-full bg-transparent border-0 border-b border-champagne-gold/30 py-3 text-ivory-white focus:outline-none focus:ring-0 focus:border-champagne-gold transition-colors placeholder-transparent resize-none overflow-hidden text-sm md:text-base font-sans"
                placeholder="Message"
                {...register("message")}
              ></textarea>
              <label 
                htmlFor="message"
                className="absolute left-0 -top-4 text-xs font-montserrat text-champagne-gold/60 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-ivory-white/40 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne-gold uppercase tracking-widest"
              >
                {t.rsvpMessage}
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full shimmer-btn text-background-dark font-montserrat py-5 tracking-[0.3em] font-bold uppercase rounded-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg hover:shadow-champagne-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    {t.rsvpSubmit}
                    <Send className="w-4 h-4 fill-background-dark" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
