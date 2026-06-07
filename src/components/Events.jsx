"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from "lucide-react";
import { translations } from "@/utils/translations";

export default function Events({ lang }) {
  const t = (translations && lang && translations[lang]) ? translations[lang] : (translations ? translations.en : {});


  const eventList = [
    {
      name: lang === "en" ? "Mehendi & Sangeet" : "మెహందీ & సంగీత్",
      date: lang === "en" ? "30 December 2029" : "30 డిసెంబర్ 2029",
      time: lang === "en" ? "4:00 PM Onwards" : "సాయంత్రం 4:00 గంటల నుండి",
      venue: lang === "en" ? "Royal Gardens, Falaknuma Palace" : "రాయల్ గార్డెన్స్, ఫలక్‌నుమా ప్యాలెస్",
      desc: lang === "en" 
        ? "An evening of vibrant colors, joyous music, and endless dancing to kick off the celebrations."
        : "రంగురంగుల వేడుకలు, అద్భుతమైన నృత్యాలు మరియు సంగీతంతో కూడిన ఒక అందమైన సాయంత్రం.",
      maps: "https://maps.google.com/?q=Falaknuma+Palace+Hyderabad",
      ics: {
        title: "Dev & Sithara - Mehendi & Sangeet",
        start: "20291230T160000",
        end: "20291230T220000",
        location: "Royal Gardens, Falaknuma Palace, Hyderabad",
        desc: "Celebrate Mehendi & Sangeet with Dev & Sithara"
      }
    },
    {
      name: lang === "en" ? "The Wedding Muhurtham" : "వివాహ శుభ ముహూర్తం",
      date: lang === "en" ? "1 January 2030" : "1 జనవరి 2030",
      time: lang === "en" ? "9:30 AM" : "ఉదయం 9:30 గంటలకు",
      venue: lang === "en" ? "The Grand Ballroom, Taj Krishna" : "ది గ్రాండ్ బాల్‌రూమ్, తాజ్ కృష్ణ",
      desc: lang === "en"
        ? "The sacred union and exchange of vows in a traditional ceremony, followed by a grand wedding feast."
        : "వేద మంత్రాల సాక్షిగా, సాంప్రదాయ పద్ధతిలో జరిగే వివాహ బంధం మరియు విందు భోజనం.",
      maps: "https://maps.google.com/?q=Taj+Krishna+Hyderabad",
      ics: {
        title: "Dev & Sithara - Wedding Muhurtham",
        start: "20300101T093000",
        end: "20300101T143000",
        location: "The Grand Ballroom, Taj Krishna, Hyderabad",
        desc: "Join Dev & Sithara for their Wedding Muhurtham"
      }
    },
    {
      name: lang === "en" ? "Reception Gala" : "మహా విందు (రిసెప్షన్)",
      date: lang === "en" ? "1 January 2030" : "1 జనవరి 2030",
      time: lang === "en" ? "7:30 PM" : "సాయంత్రం 7:30 గంటలకు",
      venue: lang === "en" ? "Starlight Terrace, ITC Kohinoor" : "స్టార్‌లైట్ టెర్రస్, ఐటీసీ కోహినూర్",
      desc: lang === "en"
        ? "Dine, drink, and dance the night away as we celebrate our new beginning under the stars."
        : "నక్షత్రాల వెలుగులో మా కొత్త ప్రయాణాన్ని విందు, వినోదాలతో వేడుకగా జరుపుకుందాం.",
      maps: "https://maps.google.com/?q=ITC+Kohinoor+Hyderabad",
      ics: {
        title: "Dev & Sithara - Wedding Reception",
        start: "20300101T193000",
        end: "20300101T233000",
        location: "Starlight Terrace, ITC Kohinoor, Hyderabad",
        desc: "Celebrate Dev & Sithara's Wedding Reception"
      }
    }
  ];

  const handleDownloadCalendar = (e, icsData) => {
    e.preventDefault();
    const calendarContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${icsData.title}`,
      `DTSTART:${icsData.start}`,
      `DTEND:${icsData.end}`,
      `LOCATION:${icsData.location}`,
      `DESCRIPTION:${icsData.desc}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${icsData.title.replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-24 bg-background-dark px-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,27,0.4)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-montserrat text-xs tracking-[0.4em] text-rose-gold uppercase mb-4 block">
            {lang === "en" ? "Schedule of Celebrations" : "శుభ ముహూర్తాల పట్టిక"}
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-champagne-gold tracking-[0.2em] uppercase">
            {t.events}
          </h2>
          <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto"></div>
        </div>

        {/* Card grid - horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {eventList.map((ev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="bg-royal-wine/25 backdrop-blur-md p-8 rounded-lg border border-champagne-gold/15 flex flex-col justify-between group relative overflow-hidden shadow-2xl hover:-translate-y-2 hover:border-champagne-gold/30 transition-all duration-300 shrink-0 w-[80vw] snap-start md:w-auto"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div>
                <h3 className="font-serif text-2xl text-gold mb-6 group-hover:text-rose-gold transition-colors duration-300">
                  {ev.name}
                </h3>
                
                <div className="space-y-4 text-ivory-white/80 font-sans text-sm md:text-base font-light">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
                    <span>{ev.date}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
                    <span>{ev.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
                    <span className="leading-snug">{ev.venue}</span>
                  </div>
                </div>

                <p className="mt-6 text-ivory-white/60 italic text-xs md:text-sm border-l border-champagne-gold/30 pl-4 font-sans leading-relaxed">
                  {ev.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-champagne-gold/10 flex items-center justify-between gap-4">
                <button
                  onClick={(e) => handleDownloadCalendar(e, ev.ics)}
                  className="flex items-center gap-2 text-xs font-montserrat text-champagne-gold hover:text-rose-gold transition-colors font-semibold uppercase tracking-widest"
                >
                  <CalendarPlus className="w-4 h-4" />
                  {t.addToCalendar}
                </button>

                <a
                  href={ev.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-montserrat text-champagne-gold hover:text-rose-gold transition-colors font-semibold uppercase tracking-widest"
                >
                  {t.directions}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
