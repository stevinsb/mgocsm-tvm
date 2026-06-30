"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, Announcement, EventItem } from "@/lib/db";
import { BookOpen, Calendar, Users, Award, ShieldAlert, ChevronRight, ArrowUpRight, MessageSquare, Quote, HeartHandshake, Bell } from "lucide-react";
import { motion } from "framer-motion";

// Helper for counting up animation
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  const [bibleVerse, setBibleVerse] = useState({ text: "", reference: "" });
  const [dailyPrayer, setDailyPrayer] = useState({ title: "", text: "" });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setBibleVerse(db.getRandomBibleVerse());
    setDailyPrayer(db.getRandomDailyPrayer());
    db.getAnnouncements().then(data => setAnnouncements(data.filter(a => a.isActive).slice(0, 3)));
    db.getEvents().then(data => setFeaturedEvents(data.filter(e => e.isFeatured && !e.isPast).slice(0, 2)));
  }, []);

  const testimonials = [
    {
      quote: "MGOCSM has played a vital role in my walk with Christ. It has helped me grow spiritually, deepen my understanding of God's Word, and become part of a loving community that continually encourages me to live for Him.",
      author: "Stevin Santhosh Baby",
      role: "Engineering Student, MBCET",
    },
    {
      quote: "MGOCSM has taught me that true leadership begins with serving others. It has helped me grow in confidence, responsibility, and faith while inspiring me to lead with Christ at the center of my life.",
      author: "Ann Mary Mathew",
      role: "Holy Trinity Chapel MGOCSM, Trivandrum",
    },
    {
      quote: "Amidst academic stress and competition, our weekly unit prayers serve as an oasis of peace. I highly encourage every student in Trivandrum to join this movement.",
      author: "Iwan Luka Prince",
      role: "Cheruvakkal MGOCSM",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Feast/Announcement Banner */}
      {/* {announcements.length > 0 && announcements[0].isFeast && (
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy border-b border-gold/30 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 relative z-10">
          <Bell className="w-4 h-4 text-gold animate-bounce" />
          <span>
            <strong>Feast Alert:</strong> {announcements[0].title} - {announcements[0].content}
          </span>
          <Link href="/events" className="underline hover:text-gold ml-2 flex items-center inline-flex">
            View Events <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )} */}

      {/* Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image with Zoom and Blur overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM Trivandrum Diocese group gathering at Orthodox Church"
            className="w-full h-full object-cover opacity-35 hero-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/50 dark:from-dark-bg" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="bg-gold/10 text-gold border border-gold/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
            Mar Gregorios Orthodox Christian Student Movement
            </span>
            <h1 className="font-poppins font-extrabold text-5xl md:text-7xl text-navy dark:text-white tracking-tight leading-tight max-w-4xl">
              MGOCSM <span className="gold-gradient-text">Trivandrum</span>
            </h1>
            <p className="font-poppins font-bold text-lg md:text-2xl text-slate-800 dark:text-gold-light tracking-wide uppercase mt-1">
              Worship &bull; Study &bull; Service
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-inter text-slate-500 dark:text-slate-100 text-base md:text-lg max-w-2xl leading-relaxed mt-2"          >
            Empowering students to grow spiritually, serve society, and strengthen their Orthodox faith in a modern world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mt-4"
          >
            {/* <Link
              href="/contact?volunteer=true"
              className="bg-navy hover:bg-navy-light text-white dark:bg-gold dark:text-navy-dark dark:hover:bg-gold-light px-8 py-3 rounded-full font-inter font-bold text-sm tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Join Us
            </Link> */}
            <Link
              href="/events"
              className="bg-white/20 hover:bg-white/30 text-navy-dark dark:text-white border border-slate-300 dark:border-white/20 backdrop-blur-md px-8 py-3 rounded-full font-inter font-bold text-sm tracking-wider transition-colors"
            >
              Upcoming Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 py-12 bg-white dark:bg-dark-bg border-y border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div className="p-4 flex flex-col gap-1 border-r border-slate-100 dark:border-slate-800/40 last:border-0 md:border-r">
              <span className="text-3xl md:text-5xl font-poppins font-black text-navy dark:text-gold">
                <Counter value={1908} />
              </span>
              <span className="font-inter text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Founded
              </span>
            </div>
            <div className="p-4 flex flex-col gap-1 md:border-r border-slate-100 dark:border-slate-800/40">
              <span className="text-3xl md:text-5xl font-poppins font-black text-navy dark:text-gold">
                <Counter value={1000} />+
              </span>
              <span className="font-inter text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Students Enrolled
              </span>
            </div>
            <div className="p-4 flex flex-col gap-1 border-r border-slate-100 dark:border-slate-800/40">
              <span className="text-3xl md:text-5xl font-poppins font-black text-navy dark:text-gold">
                <Counter value={50} />+
              </span>
              <span className="font-inter text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Parish Units
              </span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-3xl md:text-5xl font-poppins font-black text-navy dark:text-gold">
                <Counter value={100} />+
              </span>
              <span className="font-inter text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Annual Activities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Spiritual Anchor Section */}
      <section className="py-20 bg-light-gray dark:bg-navy-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white">
              Spiritual Anchors
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bible Verse */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col gap-6"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen className="w-32 h-32 text-navy dark:text-gold" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-navy dark:text-gold" />
                </span>
                <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">
                  Bible Verse of the Day
                </h3>
              </div>
              <p className="font-inter italic text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                &ldquo;{bibleVerse.text}&rdquo;
              </p>
              <span className="font-poppins font-semibold text-sm text-gold-dark dark:text-gold self-end">
                &mdash; {bibleVerse.reference}
              </span>
            </motion.div>

            {/* Daily Prayer */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col gap-6"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <HeartHandshake className="w-32 h-32 text-navy dark:text-gold" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-navy/10 dark:bg-gold/10 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4 text-navy dark:text-gold" />
                </span>
                <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">
                  Prayer of the Day: {dailyPrayer.title}
                </h3>
              </div>
              <p className="font-inter text-slate-700 dark:text-slate-350 leading-relaxed text-sm md:text-base">
                {dailyPrayer.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold font-bold tracking-widest text-xs uppercase">
                Mark Your Calendar
              </span>
              <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
                Featured Upcoming Events
              </h2>
            </div>
            <Link
              href="/events"
              className="group flex items-center gap-1 text-navy dark:text-gold font-poppins font-semibold text-sm hover:underline"
            >
              See All Events
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-3xl overflow-hidden shadow-md dark:shadow-none bg-slate-50 dark:bg-dark-card border border-slate-150 dark:border-slate-800/40 flex flex-col"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-navy text-white dark:bg-gold dark:text-navy-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <span className="text-xs text-gold font-bold uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className="font-poppins font-bold text-xl text-navy dark:text-white group-hover:text-gold transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-inter text-slate-600 dark:text-slate-350 text-sm leading-relaxed flex-grow">
                      {event.description}
                    </p>
                    <div className="pt-4 border-t border-slate-200/40 flex items-center justify-between text-xs text-slate-500">
                      <span>{event.time}</span>
                      <span>{event.location}</span>
                    </div>
                    <Link
                      href="/events"
                      className="mt-4 bg-navy hover:bg-navy-light text-white text-center py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-500">
                No featured upcoming events. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials (Framer style) */}
      <section className="py-20 bg-light-gray dark:bg-navy-dark/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
          The MGOCSM Journey
          </span>
          <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1 mb-12">
            What Our Members Say
          </h2>

          <div className="relative glass p-8 md:p-12 rounded-3xl shadow-sm min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-4 left-6 text-gold/20">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative z-10 flex-grow flex items-center justify-center">
              <p className="font-inter text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-1.5">
              <span className="font-poppins font-bold text-base text-navy dark:text-white">
                {testimonials[activeTestimonial].author}
              </span>
              <span className="font-inter text-xs text-slate-500 font-semibold tracking-wider uppercase">
                {testimonials[activeTestimonial].role}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial ? "bg-navy dark:bg-gold w-6" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-navy text-white dark:bg-[#07132B] relative overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="font-poppins font-extrabold text-3xl md:text-5xl tracking-tight text-white">
            Be a Part of the <span className="text-gold">Movement</span>
          </h2>
          <p className="font-inter text-slate-300 max-w-2xl leading-relaxed text-sm md:text-base">
            Join thousands of Orthodox youth across the Trivandrum Diocese. Grow in liturgical worship, deep theological study, and active charity service.
          </p>
          {/* <div className="flex flex-wrap gap-4 justify-center mt-3">
            <Link
              href="/contact?volunteer=true"
              className="bg-gold hover:bg-gold-light text-navy-dark px-8 py-3.5 rounded-full font-inter font-bold text-sm tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/contact?join=true"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-full font-inter font-bold text-sm tracking-wider transition-colors"
            >
              Register as Member
            </Link>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}