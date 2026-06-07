"use client";

import React from "react";
import { MapPin, Navigation, Hotel, Car } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Venue({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});


  const nearbyHotels = [
    {
      name: "Taj Krishna",
      dist: "12 km / 25 mins",
      star: "5 Star Luxury"
    },
    {
      name: "ITC Kohinoor",
      dist: "18 km / 35 mins",
      star: "5 Star Luxury"
    },
    {
      name: "Taj Falaknuma Palace",
      dist: "Venue / On-site",
      star: "Heritage Luxury Palace"
    }
  ];

  return (
    <section id="venue" className="py-24 bg-surface-dark px-4 relative overflow-hidden select-none border-t border-b border-champagne-gold/15">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.35)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {lang === "en" ? "Celebrate With Us" : "వేడుక జరిగే స్థలం"}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.locationFull.split(",")[0]}
          </h2>
          <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Details & Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-montserrat text-[10px] text-rose-gold/60 uppercase tracking-widest block mb-2">
                {lang === "en" ? "The Heritage Venue" : "చారిత్రాత్మక వివాహ వేదిక"}
              </span>
              <h3 className="font-serif text-3xl text-gold mb-4">
                Taj Falaknuma Palace
              </h3>
              <p className="text-ivory-white/70 leading-relaxed font-sans font-light text-sm md:text-base">
                {t.venueDesc}
              </p>
            </div>

            {/* Address Row */}
            <div className="flex gap-4 p-5 rounded-lg bg-royal-wine/15 border border-champagne-gold/10">
              <MapPin className="w-6 h-6 text-champagne-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-montserrat text-xs text-rose-gold uppercase tracking-wider mb-1">
                  {lang === "en" ? "Address" : "చిరునామా"}
                </h4>
                <p className="text-sm text-ivory-white/80 font-sans font-light">
                  Engine Bowli, Falaknuma, Hyderabad, Telangana 500053
                </p>
              </div>
            </div>

            {/* Hotel listing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="w-4 h-4 text-champagne-gold" />
                <h4 className="font-montserrat text-xs text-rose-gold uppercase tracking-widest font-semibold">
                  {t.hotelInfo}
                </h4>
              </div>

              <div className="space-y-3">
                {nearbyHotels.map((h, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-champagne-gold/10">
                    <div>
                      <span className="font-serif text-sm text-ivory-white block">{h.name}</span>
                      <span className="text-[10px] text-rose-gold/60 uppercase font-montserrat">{h.star}</span>
                    </div>
                    <span className="text-xs text-ivory-white/50 font-sans font-light flex items-center gap-1">
                      <Car className="w-3.5 h-3.5" />
                      {h.dist}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Embed Column */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-champagne-gold/20 shadow-2xl">
              {/* Google Maps Iframe */}
              <iframe
                title="Falaknuma Palace Google Maps Embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.974974793641!2d78.4650502153574!3d17.330691508709564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977177777777%3A0x892a01490209c7df!2sTaj%20Falaknuma%20Palace!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale invert contrast-110 opacity-80"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 border border-champagne-gold/20 pointer-events-none rounded-lg"></div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <a
                href="https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs font-montserrat text-champagne-gold hover:text-rose-gold transition-colors font-semibold uppercase tracking-widest bg-champagne-gold/10 px-5 py-3 rounded-full border border-champagne-gold/30 hover:border-champagne-gold"
              >
                <Navigation className="w-4 h-4 text-champagne-gold group-hover:animate-pulse" />
                {lang === "en" ? "Navigate with Google Maps" : "గూగుల్ మ్యాప్స్ దారి"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
