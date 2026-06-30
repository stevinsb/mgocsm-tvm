"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Flame,
  Tent,
  Gift,
  Send,
  Users,
  Globe,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const activitiesList = [
  {
    icon: BookOpen,
    title: "Bible Study",
    description: "Weekly interactive scripture reading sessions aimed at understanding historical context, orthodox patristic interpretations, and personal applications.",
  },
  {
    icon: Flame,
    title: "Prayer Meetings",
    description: "Parish unit and diocesan level liturgical prayers, chanting canonical hours (Shehimo), and intercession prayers to strengthen personal communion with God.",
  },
  {
    icon: Sparkles,
    title: "Spiritual Retreats",
    description: "One-day quiet retreats during lenten seasons featuring holy confession, liturgical meditation, silent contemplation, and counselling.",
  },
  {
    icon: Tent,
    title: "Leadership Camps",
    description: "Annual leadership summits to train student coordinators in unit management, group dynamics, public speaking, and project planning.",
  },
  {
    icon: Gift,
    title: "Charity Work",
    description: "Regular food distribution, educational sponsorships, house building assist projects, and medical support schemes for low-income families.",
  },
  {
    icon: Send,
    title: "Mission Activities",
    description: "Visiting mission fields in neighboring villages, building basic infrastructure, teaching liturgical chants, and offering community support.",
  },
  {
    icon: Users,
    title: "Youth Conferences",
    description: "Large assemblies hosting academic debates, panel discussions on contemporary challenges, theological workshops, and cultural fests.",
  },
  {
    icon: Globe,
    title: "Social Outreach",
    description: "Awareness rallies against substance abuse, environment cleanup drives, blood donation camps, and local community cleanups.",
  },
  {
    icon: GraduationCap,
    title: "Educational Programs",
    description: "Career counselling seminars, IAS/IPS mentoring circles, professional coding camps, and academic support scholarships for needy students.",
  }
];

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM Trivandrum Activities"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            What We Do
          </span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">
            Activities & Ministries
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white leading-snug">
          Vibrant Youth Pillars in Worship, Study, and Service
        </h2>
        <p className="font-inter text-slate-500 text-sm leading-relaxed mt-4">
          Through our diverse activities, we ensure that students discover their God-given talents, deepen their theological knowledge, and engage in charity.
        </p>
      </section>

      {/* Activities Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesList.map((act, index) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group glass p-8 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-300" />
                
                <div className="flex flex-col gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-navy/5 dark:bg-white/5 border border-slate-200/20 flex items-center justify-center text-navy dark:text-gold group-hover:bg-navy dark:group-hover:bg-gold dark:group-hover:text-navy transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-poppins font-bold text-xl text-navy dark:text-white group-hover:text-gold transition-colors">
                    {act.title}
                  </h3>
                  <p className="font-inter text-slate-650 dark:text-slate-350 text-sm leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/20 mt-6 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-gold transition-colors">
                  <span>Weekly/Monthly Sessions</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mini CTA for Volunteering */}
      <section className="py-16 bg-light-gray dark:bg-navy-dark/15 border-t border-slate-100 dark:border-slate-800/40 text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col gap-4 items-center">
          <Heart className="w-8 h-8 text-gold" />
          <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white">
            Want to lead an activity?
          </h2>
          <p className="font-inter text-slate-500 text-sm leading-relaxed">
            We are always looking for passionate youth leaders, Bible circle mentors, and volunteer coordinators for our social programs.
          </p>
          {/* <Link
            href="/contact?volunteer=true"
            className="bg-navy hover:bg-navy-light text-white dark:bg-gold dark:text-navy-dark px-6 py-2.5 rounded-full font-inter font-bold text-xs tracking-wider uppercase mt-2 shadow-md"
          >
            Volunteer Signup
          </Link> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
