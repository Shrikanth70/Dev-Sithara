"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Navbar({ lang, setLang, activeSection }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: lang === "en" ? "Our Story" : "మా ప్రయాణం", href: "#our-story" },
    { label: lang === "en" ? "Gallery" : "మధుర స్మృతులు", href: "#gallery" },
    { label: lang === "en" ? "Events" : "వేడుకలు", href: "#events" },
    { label: lang === "en" ? "Family" : "కుటుంబాలు", href: "#family" },
    { label: lang === "en" ? "Venue" : "వేదిక", href: "#venue" },
  ];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "te" : "en"));
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#230c13]/90 backdrop-blur-md border-b border-champagne-gold/20 h-20" 
          : "bg-transparent h-24"
      }`}
    >
      <div className="flex justify-between items-center h-full px-6 md:px-12 w-full max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <a href="#" className="font-script text-4xl md:text-5xl text-gold select-none font-normal tracking-normal pr-4 py-2 leading-[1.6] h-auto flex items-center overflow-visible">
          D & S
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-cinzel text-[11px] tracking-[0.25em] font-bold">
          {navLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.href}
              className={`hover:text-rose-gold transition-colors duration-300 uppercase ${
                activeSection === link.href.substring(1) 
                  ? "text-champagne-gold border-b border-champagne-gold pb-1" 
                  : "text-ivory-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions: Language and Hamburger */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-champagne-gold hover:text-rose-gold transition-colors uppercase tracking-[0.15em] bg-champagne-gold/10 px-4 py-2 rounded-full border border-champagne-gold/20 hover:border-champagne-gold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === "en" ? "Telugu" : "English"}</span>
            <span className="sm:hidden">{lang === "en" ? "TE" : "EN"}</span>
          </button>

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-champagne-gold hover:text-rose-gold p-1 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-[80px] md:top-[96px] inset-x-0 bg-[#230c13]/95 border-b border-champagne-gold/20 backdrop-blur-lg z-45 py-8 px-6 font-cinzel text-xs tracking-[0.25em] font-bold">
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-ivory-white/80 hover:text-champagne-gold transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
