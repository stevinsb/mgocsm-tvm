"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, GalleryItem } from "@/lib/db";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Film, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Camp", "Retreat", "Conference", "Sports", "Charity", "Prayer", "Event"];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getGallery().then(data => {
      setGalleryItems(data);
      setFilteredItems(data);
      setLoading(false);
    });
  }, []);

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setFilteredItems(cat === "All" ? galleryItems : galleryItems.filter(i => i.category === cat));
  };

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex(i => i.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const prevSlide = (e?: React.MouseEvent) => { e?.stopPropagation(); setLightboxIndex(i => i === null ? null : i === 0 ? filteredItems.length - 1 : i - 1); };
  const nextSlide = (e?: React.MouseEvent) => { e?.stopPropagation(); setLightboxIndex(i => i === null ? null : i === filteredItems.length - 1 ? 0 : i + 1); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mgocsm-group.jpg" alt="Gallery" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">Visual Memories</span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">Photo & Video Gallery</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)}
              className={`px-5 py-2 rounded-full font-inter text-xs font-bold tracking-wider uppercase transition-all duration-200 border ${activeCategory === cat ? "bg-navy text-white border-navy dark:bg-gold dark:text-navy-dark dark:border-gold shadow-md" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:border-navy dark:hover:border-gold"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map(item => (
              <div key={item.id} onClick={() => openLightbox(item)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-slate-100 dark:border-slate-900/50 bg-slate-50 dark:bg-dark-card">
                <div className="relative overflow-hidden w-full h-auto">
                  <img src={item.url} alt={item.title} className="w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                    <span className="self-end bg-navy/85 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                      {item.type === "video" ? <><Film className="w-3 h-3" /> Video</> : <><ImageIcon className="w-3 h-3" /> Image</>}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gold font-bold uppercase tracking-wider">{item.category}</span>
                      <h3 className="font-poppins font-bold text-sm leading-snug">{item.title}</h3>
                    </div>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                      <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-slate-500">No gallery items found under this category.</div>
        )}
      </section>

      <AnimatePresence>
        {activeMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center">
            <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-50 transition-colors"><X className="w-6 h-6" /></button>
            <button onClick={prevSlide} className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-50 transition-colors hidden sm:block"><ChevronLeft className="w-6 h-6" /></button>
            <button onClick={nextSlide} className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-50 transition-colors hidden sm:block"><ChevronRight className="w-6 h-6" /></button>
            <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full px-4 flex flex-col items-center gap-4">
              <div className="relative rounded-2xl overflow-hidden max-h-[75vh] w-full flex items-center justify-center bg-black/40 border border-white/5">
                <img src={activeMedia.url} alt={activeMedia.title} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
                {activeMedia.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 duration-200">
                      <Play className="w-6 h-6 text-navy fill-navy ml-0.5" />
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center text-white flex flex-col gap-1 max-w-lg mt-2">
                <span className="text-xs text-gold font-bold uppercase tracking-widest">{activeMedia.category} &bull; {activeMedia.type}</span>
                <h3 className="font-poppins font-bold text-lg md:text-xl">{activeMedia.title}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}