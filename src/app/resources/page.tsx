"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, NewsletterItem } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";
import { Download, BookOpen, ChevronDown, ChevronUp, Mail, ExternalLink, Loader2 } from "lucide-react";

function NewsletterCard({ nl, index }: { nl: NewsletterItem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-3xl border border-slate-200/40 dark:border-slate-800/40 overflow-hidden shadow-sm"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2 shrink-0 h-2 md:h-auto" style={{ backgroundColor: nl.coverColor }} />
        <div className="hidden md:flex w-28 shrink-0 flex-col items-center justify-center gap-2 px-4 py-8 text-white" style={{ backgroundColor: nl.coverColor }}>
          <BookOpen className="w-6 h-6 opacity-70" />
          <span className="font-poppins font-black text-xs tracking-widest uppercase text-center leading-tight opacity-90">{nl.issue}</span>
          <span className="text-[10px] font-inter opacity-60 tracking-wider text-center">{nl.month}</span>
        </div>
        <div className="flex flex-col flex-grow p-6 gap-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 md:hidden">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider" style={{ backgroundColor: nl.coverColor }}>{nl.issue}</span>
              </div>
              <h3 className="font-poppins font-extrabold text-lg text-navy dark:text-white leading-tight">
                {nl.title}<span className="text-gold ml-2 font-normal text-base">— {nl.month}</span>
              </h3>
              <p className="font-inter text-slate-500 text-sm leading-relaxed max-w-xl">{nl.description}</p>
            </div>
            {nl.isFeatured && (
              <span className="shrink-0 bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Latest Issue</span>
            )}
          </div>

          {nl.highlights && nl.highlights.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800/40 pt-4">
              <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-xs font-bold text-navy dark:text-gold uppercase tracking-wider hover:opacity-70 transition-opacity">
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {expanded ? "Hide Contents" : "What's Inside"}
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 flex flex-col gap-2 overflow-hidden">
                    {nl.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-inter">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />{item}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap pt-1">
            {nl.downloadUrl && nl.downloadUrl !== "#" && (
              <a href={nl.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-navy hover:bg-navy-light text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 duration-200">
                <Download className="w-3.5 h-3.5" />
                Download PDF
                {nl.size && <span className="opacity-60 font-normal">({nl.size})</span>}
              </a>
            )}
            {nl.previewUrl && nl.previewUrl !== "#" && (
              <a href={nl.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-navy/20 dark:border-gold/30 text-navy dark:text-gold text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-navy/5 dark:hover:bg-gold/5 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />View Online
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getNewsletters().then(data => {
      setNewsletters(data);
      setLoading(false);
    });
  }, []);

  const featured = newsletters.find(n => n.isFeatured);
  const archive = newsletters.filter(n => !n.isFeatured);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mgocsm-group.jpg" alt="Newsletter" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center flex flex-col items-center gap-4">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">Stay Informed</span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl tracking-tight">Newsletter</h1>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="font-inter text-slate-300 text-sm max-w-xl leading-relaxed mt-2">
            The official publication of MGOCSM Trivandrum Diocese — spiritual reflections, event coverage, and community updates every quarter.
          </p>
        </div>
      </section>

      {/* <section className="bg-gold/10 dark:bg-gold/5 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gold shrink-0" />
            <p className="font-inter text-sm text-navy dark:text-white font-medium">Get the latest issue delivered to your inbox — contact us to subscribe.</p>
          </div>
          <a href="/contact" className="shrink-0 bg-navy dark:bg-gold dark:text-navy text-white text-xs font-bold px-6 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-200 shadow-sm">Subscribe</a>
        </div>
      </section> */}

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      ) : newsletters.length === 0 ? (
        <div className="flex-grow flex items-center justify-center py-32">
          <p className="text-slate-400 font-inter text-sm">No newsletters published yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {featured && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 w-full">
              <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white mb-8 border-l-4 border-gold pl-4">Latest Issue</h2>
              <NewsletterCard nl={featured} index={0} />
            </section>
          )}
          {archive.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
              <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white mb-8 border-l-4 border-gold pl-4">Past Issues</h2>
              <div className="flex flex-col gap-6">
                {archive.map((nl, i) => <NewsletterCard key={nl.id} nl={nl} index={i + 1} />)}
              </div>
            </section>
          )}
        </>
      )}

      <div className="pb-16" />
      <Footer />
    </div>
  );
}