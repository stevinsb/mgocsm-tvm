"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, Phone, Clock, ExternalLink, ShieldCheck, User, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function DiocesePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM Trivandrum Diocese gathering"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            Trivandrum Diocese
          </span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">
            Our Diocese
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-navy dark:text-white leading-snug">
          The Southern Gate of Malankara Orthodox Syrian Church
        </h2>
        <p className="font-inter text-slate-600 dark:text-slate-350 text-base md:text-lg leading-relaxed mt-6">
          The Diocese of Trivandrum was established in 1986, separating from the Thumpamon diocese, under the guidance of our founding Metropolitan, His Grace Geevarghese Mar Dioscorus. Today, it stands as a vibrant region, comprising over 50 parish units and churches, dedicated to preserving Orthodox liturgical traditions and running multiple healthcare, charity, and educational centers.
        </p>
      </section>

      {/* Metropolitan & Spiritual Leadership */}
      <section className="py-20 bg-light-gray dark:bg-navy-dark/10 border-y border-slate-100 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs uppercase">
              Apostolic Shepherd
            </span>
            <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
              Spiritual Guardians
            </h2>
            <p className="font-inter text-slate-500 text-sm mt-2">
              Our spiritual guidance is led by the Diocesan Metropolitan and dedicated clergy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Metropolitan Card (Larger) */}
            <div className="lg:col-span-2 glass rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row border border-slate-200/40">
              <div className="w-full md:w-2/5 h-80 md:h-auto relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
                  alt="His Grace Dr. Gabriel Mar Gregorios"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-gold font-bold uppercase tracking-wider text-xs">
                    Diocesan Metropolitan & President
                  </span>
                  <h3 className="font-poppins font-bold text-2xl text-navy dark:text-white mt-1">
                    His Grace Dr. Gabriel Mar Gregorios
                  </h3>
                </div>
                <p className="font-inter text-slate-650 dark:text-slate-350 text-sm md:text-base leading-relaxed italic">
                  &ldquo;My dear youth, you are not just the future of the Church; you are the present. Let your studies be crowned with prayer, and let your achievements be dedicated to the service of God and our fellow human beings.&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-200/40 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold" /> metropolitan@tvmdiocese.org
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold" /> +91 471 244 8254
                  </span>
                </div>
              </div>
            </div>

            {/* Spiritual Fathers / Clergy details */}
            <div className="flex flex-col gap-6">
              <div className="glass p-6 rounded-3xl flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-navy dark:text-gold" />
                </span>
                <div className="flex flex-col">
                  <h4 className="font-poppins font-bold text-base text-navy dark:text-white">
                    Rev. Fr. Philip Mathew
                  </h4>
                  <span className="font-inter text-xs text-gold font-semibold uppercase tracking-wider">
                    MGOCSM Vice President
                  </span>
                  <p className="font-inter text-slate-500 text-xs mt-2 leading-relaxed">
                    Oversees the spiritual directives, youth retreats, and liturgical educational camps across the diocese.
                  </p>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-navy dark:text-gold" />
                </span>
                <div className="flex flex-col">
                  <h4 className="font-poppins font-bold text-base text-navy dark:text-white">
                    Rev. Dn. Basil Thomas
                  </h4>
                  <span className="font-inter text-xs text-gold font-semibold uppercase tracking-wider">
                    Diocesan Warden
                  </span>
                  <p className="font-inter text-slate-500 text-xs mt-2 leading-relaxed">
                    Provides day-to-day administrative coordination, pastoral care, and resources support to student units.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Location Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Office Coordinates */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-gold font-bold tracking-widest text-xs uppercase">
                  Central Secretariat
                </span>
                <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
                  Diocesan Office
                </h2>
                <div className="w-12 h-1 bg-gold mt-3 rounded-full" />
              </div>

              <ul className="space-y-4 font-inter text-slate-700 dark:text-slate-300">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-navy dark:text-white">
                      Physical Address
                    </h4>
                    <p className="text-sm mt-1 text-slate-500">
                      MGOCSM Office, St. Mary's Orthodox Cathedral Compound, Kowdiar Post, Trivandrum, Kerala, 695003
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-navy dark:text-white">
                      Working Hours
                    </h4>
                    <p className="text-sm mt-1 text-slate-500">
                      Monday &ndash; Saturday: 09:30 AM &ndash; 05:00 PM<br />
                      Sunday: Closed (liturgical service at Cathedral)
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-navy dark:text-white">
                      Administrative Liaison
                    </h4>
                    <p className="text-sm mt-1 text-slate-500">
                      Office Secretary: +91 471 244 8254 | secretary@tvmdiocese.org
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Interactive Mock Map Card */}
            <div className="glass p-4 rounded-3xl border border-slate-200/40">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900 border border-slate-200/30 flex items-center justify-center text-center">
                {/* Visual Representation of Map */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#0F2D5C_2px,transparent_2px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 flex flex-col items-center p-6 max-w-sm gap-4">
                  <MapPin className="w-10 h-10 text-gold animate-bounce" />
                  <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">
                    St. Mary's Cathedral compound, Kowdiar
                  </h3>
                  <p className="font-inter text-slate-500 text-xs leading-relaxed">
                    Located centrally near Kowdiar Square, easily accessible by public transit and local student buses.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-navy text-white dark:bg-gold dark:text-navy-dark hover:scale-105 duration-200 font-inter font-bold text-xs tracking-wider px-6 py-2.5 rounded-full shadow-md"
                  >
                    Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
