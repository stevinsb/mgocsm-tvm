"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, BlogPost } from "@/lib/db";
import { Search, Calendar, Loader2, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getBlogPosts().then(data => {
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const q = query.toLowerCase();
      setFilteredPosts(posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(q))
      ));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mgocsm-group.jpg" alt="Blog" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">Faith & Reflections</span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">The Gregorian Blog</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 flex-grow">
        {/* Left: Blog feed */}
        <div className="lg:w-2/3 flex flex-col gap-10">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text" value={searchQuery} onChange={handleSearch}
              placeholder="Search articles..."
              className="w-full bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-gold dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-dark-card border border-slate-150 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm flex flex-col group">
                  <div className="h-48 w-full shrink-0 relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {post.tags && post.tags[0] && (
                      <span className="absolute top-4 left-4 bg-navy/85 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-slate-400 font-inter flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" /> {post.date} · {post.author}
                      </span>
                      <h3 className="font-poppins font-bold text-lg text-navy dark:text-white leading-snug group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-inter text-slate-500 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                    <Link href={`/blog/${post.id}`} className="flex items-center gap-1 text-xs text-navy dark:text-gold font-bold hover:underline self-start mt-2 group/btn">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 duration-200" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 font-inter">No articles found.</div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          {/* Recent Posts */}
          <div className="glass p-6 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 flex flex-col gap-4">
            <h3 className="font-poppins font-bold text-base text-navy dark:text-white border-b border-slate-100 dark:border-slate-850 pb-2 uppercase tracking-wide">
              Recent Reflections
            </h3>
            <div className="flex flex-col gap-4">
              {posts.slice(0, 3).map(post => (
                <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-3 group items-start border-b border-slate-100 dark:border-slate-800/10 last:border-0 pb-3 last:pb-0">
                  <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="font-poppins font-bold text-xs text-navy dark:text-white leading-tight group-hover:text-gold transition-colors truncate">{post.title}</h4>
                    <span className="text-[9px] text-slate-400 font-inter">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Verse Widget */}
          <div className="bg-navy dark:bg-dark-card border border-gold/25 p-6 rounded-3xl text-white text-center flex flex-col items-center gap-4">
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Daily Remembrance</span>
            <p className="font-inter italic text-sm text-slate-200 leading-relaxed">
              &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
            </p>
            <span className="font-poppins text-xs font-semibold text-gold">Psalm 119:105</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}