"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, LeadershipMember } from "@/lib/db";
import { Linkedin, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadershipPage() {
  const [committee, setCommittee] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getLeadership().then(data => {
      setCommittee(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mgocsm-group.jpg" alt="MGOCSM Trivandrum leadership" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">Executive Committee</span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">Our Leadership</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Description */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white leading-snug">
          Guiding the Diocesan Student Movement with Vision and Devotion
        </h2>
        <p className="font-inter text-slate-500 text-sm leading-relaxed mt-4">
          The Executive Committee oversees the planning, spiritual camps, parish unit relations, charity distribution, and events within the Trivandrum Diocese.
        </p>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : committee.length === 0 ? (
          <div className="text-center py-24 text-slate-400 font-inter text-sm">No leadership members added yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {committee.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl overflow-hidden shadow-sm dark:shadow-none border border-slate-200/40 dark:border-slate-800/40 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative h-80 w-full overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=0F2D5C&color=D4AF37`; }}
                    />
                  ) : (
                    <User className="w-20 h-20 text-slate-300" />
                  )}

                  {/* Hover overlay */}
                  {member.linkedin && (
                    <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white/10 hover:bg-gold text-white hover:text-navy transition-all duration-200"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-2">
                  <span className="text-xs text-gold font-bold uppercase tracking-wider">{member.position}</span>
                  <h3 className="font-poppins font-bold text-lg text-navy dark:text-white leading-snug group-hover:text-gold transition-colors">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}