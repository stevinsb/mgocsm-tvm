"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, GraduationCap, Heart, HelpCircle, Compass, Target, Star, History } from "lucide-react";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "1908",
    title: "The Inception",
    description: "Founded as the 'Syrian Student Conference' by a group of visionary student leaders in Madras (Chennai) to nurture Christian fellowship among collegiate students.",
  },
  {
    year: "1910",
    title: "First General Conference",
    description: "The first annual conference was held at Tiruvalla, presided over by Metropolitan His Grace Pulikkottil Joseph Mar Dionysius II, setting the tone for theological discussions and student leadership.",
  },
  {
    year: "1960",
    title: "Adopting the Name",
    description: "Renamed as the 'Mar Gregorios Orthodox Christian Student Movement' (MGOCSM) in honor of Saint Gregorios of Parumala, our patron saint who championed the education of students.",
  },
  {
    year: "1985",
    title: "Platinum Jubilee",
    description: "Celebrated 75 years of student empowerment, cementing MGOCSM's status as the oldest Christian student movement in India with active units across multiple states.",
  },
  {
    year: "2008",
    title: "The Centenary Year",
    description: "Marked 100 years of glorious service. Commemorated with national initiatives, educational grants, and expanded spiritual missions for the student community.",
  },
  {
    year: "Present",
    title: "Trivandrum Diocese Legacy",
    description: "Continuing to guide over 50 units and 1000+ students in the Trivandrum Diocese under the apostolic presidency of the Diocesan Metropolitan.",
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM gathering background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            Who We Are
          </span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">
            About MGOCSM
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Intro Block */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-navy dark:text-white leading-snug">
          Empowering the students of the Malankara Orthodox Syrian Church since 1908
        </h2>
        <p className="font-inter text-slate-600 dark:text-slate-355 text-base md:text-lg leading-relaxed mt-6">
          MGOCSM is the oldest Christian student organization in India. For over a century, we have provided a nurturing environment for high school, college, and university students to deepen their spiritual roots, excel in academic studies, and engage in charitable social action.
        </p>
      </section>

      {/* Pillars Section (Motto) */}
      <section className="py-20 bg-light-gray dark:bg-navy-dark/10 border-y border-slate-100 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs uppercase">
              Our Foundations
            </span>
            <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
              The Three Pillars
            </h2>
            <p className="font-inter text-slate-500 text-sm mt-2">
              Our motto reflects our core identity and daily commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Worship */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center">
                <Compass className="w-6 h-6 text-navy dark:text-gold" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                Worship
              </h3>
              <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                Nurturing a vibrant prayer life, participating in the Holy Qurbana (Eucharist), canonical hours, and understanding the rich liturgical traditions of the Orthodox faith.
              </p>
            </motion.div>

            {/* Pillar 2: Study */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-navy dark:text-gold" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                Study
              </h3>
              <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                Engaging in deep Bible studies, exploring early Church history, understanding Orthodox theology, and pursuing academic excellence with integrity.
              </p>
            </motion.div>

            {/* Pillar 3: Service */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-navy dark:text-gold" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                Service
              </h3>
              <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                Reaching out to society through relief drives, free medical camps, visiting the sick, teaching underprivileged children, and showing Christ's love in action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-gold-dark dark:text-gold" />
                </span>
                <div>
                  <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                    Our Vision
                  </h3>
                  <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed mt-2">
                    To raise a generation of Orthodox Christian students who are spiritually anchored, intellectually equipped, and socially responsible, actively participating in the life and mission of the Holy Church.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-gold-dark dark:text-gold" />
                </span>
                <div>
                  <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                    Our Mission
                  </h3>
                  <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed mt-2">
                    To facilitate weekly prayer units, study groups, regional retreats, social outreach, and leadership development activities. We aim to help students navigate challenges on campus while expressing Christian love and charity.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-lg h-96">
              <img
                src="/mgocsm-group.jpg"
                alt="MGOCSM students gathered at Orthodox church"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="py-20 bg-light-gray dark:bg-navy-dark/15 border-t border-slate-100 dark:border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-1.5">
              <History className="w-4 h-4" />
              Chronology of Faith
            </span>
            <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
              Historical Milestones
            </h2>
            <p className="font-inter text-slate-500 text-sm mt-2">
              Our journey from a small collegiate gathering in 1908 to a nationwide movement.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-slate-300 dark:border-slate-800 ml-4 md:ml-32 pl-6 space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Timeline node */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-navy dark:bg-gold border-4 border-light-gray dark:border-dark-bg" />

                {/* Left Year Label (desktop only) */}
                <div className="hidden md:block absolute -left-[140px] top-0 text-right w-24">
                  <span className="font-poppins font-black text-2xl text-navy dark:text-gold">
                    {event.year}
                  </span>
                </div>

                {/* Mobile Year Badge */}
                <span className="inline-block md:hidden font-poppins font-bold text-sm bg-navy text-white dark:bg-gold dark:text-navy-dark px-3 py-1 rounded-full mb-2">
                  {event.year}
                </span>

                <div className="glass p-6 rounded-3xl">
                  <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">
                    {event.title}
                  </h3>
                  <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed mt-2">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
