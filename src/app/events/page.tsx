"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, EventItem } from "@/lib/db";
import { Calendar as CalendarIcon, MapPin, Clock, X, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [nextMajorEvent, setNextMajorEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Registration Form States
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parish, setParish] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    db.getEvents().then(allEvents => {
      const upcoming = allEvents.filter(e => !e.isPast);
      const past = allEvents.filter(e => e.isPast);
      setUpcomingEvents(upcoming);
      setPastEvents(past);
      const nextEvent = upcoming.find(e => e.isFeatured) || upcoming[0] || null;
      setNextMajorEvent(nextEvent);
      setLoading(false);
    });
  }, []);

  // Timer Effect
  useEffect(() => {
    if (!nextMajorEvent || !nextMajorEvent.countdownTarget) return;
    const targetDate = new Date(nextMajorEvent.countdownTarget).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextMajorEvent]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    // Registration saved — you can connect this to Supabase later
    setFormSubmitted(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setFormSubmitted(false);
      setName(""); setEmail(""); setPhone(""); setParish("");
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mgocsm-group.jpg" alt="MGOCSM events" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">Stay Connected</span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">Events & Calendar</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      ) : (
        <>
          {/* Countdown Timer Hero */}
          {nextMajorEvent && (
            <section className="py-16 bg-light-gray dark:bg-navy-dark/15 border-b border-slate-100 dark:border-slate-800/40">
              <div className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6">
                <span className="bg-gold/10 text-gold border border-gold/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Next Major Gathering
                </span>
                <h2 className="font-poppins font-extrabold text-2xl md:text-3xl text-navy dark:text-white max-w-3xl leading-snug">
                  {nextMajorEvent.title}
                </h2>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarIcon className="w-4 h-4 text-gold" />
                    {new Date(nextMajorEvent.date).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>

                {/* Countdown Board */}
                <div className="flex gap-4 md:gap-8 mt-4">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Minutes" },
                    { value: timeLeft.seconds, label: "Seconds" },
                  ].map(({ value, label }) => (
                    <div key={label} className="glass px-4 py-3 md:px-6 md:py-4 rounded-2xl flex flex-col gap-1 min-w-[70px] md:min-w-[90px]">
                      <span className="text-2xl md:text-4xl font-poppins font-black text-navy dark:text-gold">{value}</span>
                      <span className="font-inter text-[10px] md:text-xs font-semibold tracking-wider text-slate-400 uppercase">{label}</span>
                    </div>
                  ))}
                </div>

                {nextMajorEvent.registrationOpen && (
                  <button
                    onClick={() => {
                      if (nextMajorEvent.registrationUrl) {
                        window.open(nextMajorEvent.registrationUrl, "_blank");
                      } else {
                        setSelectedEvent(nextMajorEvent);
                      }
                    }}
                    className="mt-4 bg-navy hover:bg-navy-light text-white dark:bg-gold dark:text-navy-dark dark:hover:bg-gold-light px-8 py-3 rounded-full font-inter font-bold text-sm tracking-wider shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Upcoming Events */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white mb-10 border-l-4 border-gold pl-4">
              Upcoming Schedule
            </h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-slate-400 font-inter text-sm text-center py-16">No upcoming events at the moment. Check back soon!</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="glass p-6 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 flex flex-col md:flex-row gap-6 shadow-sm">
                    <div className="w-full md:w-2/5 h-44 rounded-2xl overflow-hidden shrink-0">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-grow gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-gold font-bold uppercase tracking-wider">
                          {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">{event.title}</h3>
                        <p className="font-inter text-slate-500 text-xs leading-relaxed line-clamp-2">{event.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/40 pt-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-450">
                          <Clock className="w-3.5 h-3.5 text-gold" /> {event.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-450">
                          <MapPin className="w-3.5 h-3.5 text-gold" /> {event.location}
                        </div>
                      </div>
                      {event.registrationOpen && (
                        <button
                          onClick={() => {
                            if (event.registrationUrl) {
                              window.open(event.registrationUrl, "_blank");
                            } else {
                              setSelectedEvent(event);
                            }
                          }}
                          className="w-full bg-navy hover:bg-navy-light text-white text-xs font-bold py-2 rounded-xl text-center transition-colors mt-2"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section className="py-20 bg-light-gray dark:bg-navy-dark/10 border-t border-slate-100 dark:border-slate-800/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white mb-10 border-l-4 border-gold pl-4">
                  Past Events & Retrospectives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pastEvents.map(event => (
                    <div key={event.id} className="bg-white dark:bg-dark-card border border-slate-200/40 dark:border-slate-800/40 rounded-3xl overflow-hidden flex flex-col">
                      <div className="h-44 w-full shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale opacity-75" />
                      </div>
                      <div className="p-5 flex flex-col gap-2 flex-grow">
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider self-start">Completed</span>
                        <h3 className="font-poppins font-bold text-base text-navy dark:text-white mt-1">{event.title}</h3>
                        <p className="font-inter text-slate-500 text-xs leading-relaxed flex-grow">{event.description}</p>
                        <span className="text-[10px] text-slate-400 mt-2 font-inter">
                          Held on {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass max-w-lg w-full rounded-3xl overflow-hidden relative border border-white/20 p-6 md:p-8"
            >
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                  <CheckCircle className="w-16 h-16 text-emerald-500" />
                  <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">Registration Successful!</h3>
                  <p className="font-inter text-slate-500 text-sm leading-relaxed max-w-xs">
                    Your seat is reserved. We will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 pr-8">
                    <span className="text-gold font-bold tracking-wider text-[10px] uppercase">Event Signup</span>
                    <h3 className="font-poppins font-bold text-lg text-navy dark:text-white leading-snug">{selectedEvent.title}</h3>
                  </div>
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 font-inter text-sm">
                    {[
                      { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "John Doe" },
                      { label: "Email Address", value: email, setter: setEmail, type: "email", placeholder: "john@example.com" },
                      { label: "Phone Number", value: phone, setter: setPhone, type: "tel", placeholder: "+91 98765 43210" },
                      { label: "Parish / Unit Name", value: parish, setter: setParish, type: "text", placeholder: "St. Mary's, Kowdiar" },
                    ].map(({ label, value, setter, type, placeholder }) => (
                      <div key={label} className="flex flex-col gap-1.5">
                        <label className="text-slate-600 dark:text-slate-300 font-medium text-xs">{label}</label>
                        <input
                          type={type} required value={value}
                          onChange={e => setter(e.target.value)}
                          placeholder={placeholder}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-gold dark:text-white text-slate-800 transition-colors"
                        />
                      </div>
                    ))}
                    <button type="submit" className="w-full bg-navy text-white hover:bg-navy-light dark:bg-gold dark:text-navy-dark py-3 rounded-xl font-bold tracking-wide mt-2 shadow-md transition-colors">
                      Confirm Registration
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}