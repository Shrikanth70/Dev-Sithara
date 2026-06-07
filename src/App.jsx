import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { translations } from "@/utils/translations";

import Envelope from "@/components/Envelope";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import LoveStory from "@/components/LoveStory";
import MemoryReel from "@/components/MemoryReel";
import Gallery from "@/components/Gallery";
import Family from "@/components/Family";
import Events from "@/components/Events";
import Venue from "@/components/Venue";
import Guestbook from "@/components/Guestbook";
import GiftRegistry from "@/components/GiftRegistry";

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [lang, setLang] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

  useEffect(() => {
    // Restore language preference only. Always show the envelope on page load.
    const savedLang = localStorage.getItem("wedding_lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem("wedding_lang", newLang);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    localStorage.setItem("invitation_opened", "true");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Initialize Lenis smooth scroll and scroll reveal animations
  useEffect(() => {
    if (!isOpened) return;

    // Smooth Scroll initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Add scroll spy for active navbar section
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = ["our-story", "gallery", "events", "family", "venue"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObserver.observe(el);
    });

    const revealElements = document.querySelectorAll(".fade-in-section");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      lenis.destroy();
      observer.disconnect();
      spyObserver.disconnect();
    };
  }, [isOpened]);

  return (
    <div className="min-h-screen text-ivory-white/90 antialiased selection:bg-champagne-gold selection:text-background-dark bg-background-dark overflow-x-hidden">
      {!isOpened ? (
        <Envelope onOpen={handleOpenInvitation} lang={lang} setLang={handleLangChange} />
      ) : (
        <>
          {/* Main website header & nav */}
          <Navbar lang={lang} setLang={handleLangChange} activeSection={activeSection} />
          
          {/* Audio background controller */}
          <MusicPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} lang={lang} />

          {/* Fullscreen Hero */}
          <Hero lang={lang} />

          {/* Luxury Count Down */}
          <div className="fade-in-section">
            <Countdown lang={lang} />
          </div>

          {/* Love Story Timeline */}
          <div className="fade-in-section">
            <LoveStory lang={lang} />
          </div>

          {/* Video Memory Reel */}
          <div className="fade-in-section">
            <MemoryReel lang={lang} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </div>

          {/* Photo Masonry Gallery */}
          <div className="fade-in-section">
            <Gallery lang={lang} />
          </div>

          {/* Circular Portraits Family Grid */}
          <div className="fade-in-section">
            <Family lang={lang} />
          </div>

          {/* Event Schedules & Map directions */}
          <div className="fade-in-section">
            <Events lang={lang} />
          </div>

          {/* Falaknuma Palace Details */}
          <div className="fade-in-section">
            <Venue lang={lang} />
          </div>

          {/* Blessings Gifts Registry */}
          <div className="fade-in-section">
            <GiftRegistry lang={lang} />
          </div>

          {/* Persistent guest comments */}
          <div className="fade-in-section">
            <Guestbook lang={lang} />
          </div>

          {/* Footer details */}
          <footer className="w-full py-20 px-6 md:px-12 bg-gradient-to-t from-royal-wine to-surface-dark border-t border-champagne-gold/15 text-center relative select-none">
            <div className="font-script text-4xl text-rose-gold font-normal mb-6">
              Dev & Sithara
            </div>
            
            <div className="flex justify-center gap-8 text-xs font-montserrat tracking-[0.2em] font-semibold text-ivory-white/60 mb-8 uppercase">
              <a href="#our-story" className="hover:text-champagne-gold transition-colors">Our Story</a>
              <a href="#gallery" className="hover:text-champagne-gold transition-colors">Gallery</a>
            <a href="#events" className="hover:text-champagne-gold transition-colors">Events</a>
            </div>

            <p className="text-xs text-ivory-white/40 font-montserrat uppercase tracking-widest leading-relaxed mb-4">
              Designed with love for Dev & Sithara
            </p>
            <p className="text-[10px] text-ivory-white/20 font-montserrat uppercase tracking-[0.2em]">
              © 2030 All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
