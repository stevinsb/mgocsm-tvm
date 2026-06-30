"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/db";
import { BlogPost } from "@/lib/seedData";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Reflections", "News", "Faith Stories"];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const allPosts = db.getBlogPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setRecentPosts(allPosts.slice(0, 3));
  }, []);

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    applyFilters(searchQuery, cat);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, activeCategory);
  };

  const applyFilters = (query: string, cat: string) => {
    let result = posts;

    // Search query filter
    if (query.trim() !== "") {
      const q = query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (cat !== "All") {
      result = result.filter(p => p.category === cat);
    }

    setFilteredPosts(result);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM Trivandrum community"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            Faith & Reflections
          </span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">
            The Gregorian Blog
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 flex-grow">
        {/* Left Side: Blog feed */}
        <div className="lg:w-2/3 flex flex-col gap-10">
          {/* Search & Categories block */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-dark-card border border-slate-200/40 dark:border-slate-800/40 p-4 rounded-3xl shrink-0">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search reflections, news..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-gold dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all ${
                    activeCategory === cat
                      ? "bg-navy text-white dark:bg-gold dark:text-navy-dark"
                      : "bg-white dark:bg-slate-900 text-slate-500 hover:text-navy dark:hover:text-gold border border-slate-200/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid/List */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-dark-card border border-slate-150 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm dark:shadow-none flex flex-col group"
                >
                  <div className="h-48 w-full shrink-0 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <span className="absolute top-4 left-4 bg-navy/85 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-slate-400 font-inter flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" /> {post.date} &bull; {post.readTime}
                      </span>
                      <h3 className="font-poppins font-bold text-lg text-navy dark:text-white leading-snug group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-inter text-slate-500 text-xs leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-xs text-navy dark:text-gold font-bold hover:underline self-start mt-2 group/btn"
                    >
                      Read Full Article{" "}
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 duration-200" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 font-inter">
              No matching reflections or articles found.
            </div>
          )}
        </div>

        {/* Right Side: Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          {/* Recent reflections */}
          <div className="glass p-6 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 flex flex-col gap-4">
            <h3 className="font-poppins font-bold text-base text-navy dark:text-white border-b border-slate-100 dark:border-slate-850 pb-2 uppercase tracking-wide">
              Recent reflections
            </h3>

            <div className="flex flex-col gap-4">
              {recentPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex gap-3 group items-start border-b border-slate-100 dark:border-slate-800/10 last:border-0 pb-3 last:pb-0"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[9px] text-gold font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h4 className="font-poppins font-bold text-xs text-navy dark:text-white leading-tight group-hover:text-gold transition-colors truncate">
                      {post.title}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-inter">
                      {post.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Spiritual Verse reminder widget */}
          <div className="bg-navy dark:bg-dark-card border border-gold/25 p-6 rounded-3xl text-white text-center flex flex-col items-center gap-4">
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest">
              Daily Remembrances
            </span>
            <p className="font-inter italic text-sm text-slate-200 leading-relaxed">
              &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
            </p>
            <span className="font-poppins text-xs font-semibold text-gold">
              Psalm 119:105
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
