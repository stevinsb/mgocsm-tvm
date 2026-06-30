"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Instagram, CheckCircle, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_rjnlu5m";
const EMAILJS_TEMPLATE_ID = "template_1qh9nzf";
const EMAILJS_PUBLIC_KEY = "g45irzpMvQx7YSYCA";

function ContactFormContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, subject, message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        }, 2500);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setIsSubmitting(false);
        setHasError(true);
      });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start flex-grow">
      {/* Left Side: Contact Information */}
      <div className="flex flex-col gap-10">
        <div>
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            Trivandrum Diocese
          </span>
          <h2 className="font-poppins font-bold text-3xl text-navy dark:text-white mt-1">
            Contact Channels
          </h2>
          <p className="font-inter text-slate-500 text-sm mt-3">
            Reach out directly to the diocesan office. We welcome all student questions, prayer requests, and feedback.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass p-5 rounded-3xl flex gap-4 items-center border border-slate-200/30">
            <span className="w-10 h-10 rounded-2xl bg-navy/5 dark:bg-gold/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-navy dark:text-gold" />
            </span>
            <div className="flex flex-col font-inter">
              <span className="font-poppins font-bold text-sm text-navy dark:text-white">Email Address</span>
              <a href="mailto:mgocsm.tvmdiocese@gmail.com" className="text-slate-550 dark:text-slate-400 text-xs hover:underline">mgocsm.tvmdiocese@gmail.com</a>
            </div>
          </div>

          <div className="glass p-5 rounded-3xl flex gap-4 items-center border border-slate-200/30">
            <span className="w-10 h-10 rounded-2xl bg-navy/5 dark:bg-gold/10 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5 text-navy dark:text-gold" />
            </span>
            <div className="flex flex-col font-inter">
              <span className="font-poppins font-bold text-sm text-navy dark:text-white">Follow Us</span>
              <a href="https://www.instagram.com/mgocsmtrivandrum" target="_blank" rel="noopener noreferrer" className="text-slate-550 dark:text-slate-400 text-xs hover:underline">@mgocsmtrivandrum</a>
            </div>
          </div>
        </div>


      </div>

      {/* Right Side: Enquiry Form */}
      <div className="glass p-8 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-16 text-center gap-4"
            >
              <CheckCircle className="w-16 h-16 text-emerald-500" />
              <h3 className="font-poppins font-bold text-xl text-navy dark:text-white">
                Message Sent!
              </h3>
              <p className="font-inter text-slate-500 text-xs leading-relaxed max-w-xs">
                Thank you for writing. We will review your message and reply via email.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onSubmit={handleSubmit}
              className="space-y-4 font-inter text-sm"
            >
              <div>
                <h3 className="font-poppins font-bold text-lg text-navy dark:text-white">
                  Send a Message
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  Send general questions, prayer requests, or study resource suggestions.
                </p>
              </div>

              {hasError && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs rounded-xl p-3 border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong sending your message. Please try again or email us directly.
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-650 dark:text-slate-350 text-xs font-semibold">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-gold dark:text-white text-slate-800"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-650 dark:text-slate-350 text-xs font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-gold dark:text-white text-slate-800"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-650 dark:text-slate-350 text-xs font-semibold">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-gold dark:text-white text-slate-800"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-650 dark:text-slate-350 text-xs font-semibold">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-gold dark:text-white text-slate-800 resize-none"
                  placeholder="Write details..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy text-white hover:bg-navy-light dark:bg-gold dark:text-navy-dark dark:hover:bg-gold-light py-3 rounded-xl font-bold tracking-wide mt-2 shadow-md transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 bg-navy text-white overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/mgocsm-group.jpg"
            alt="MGOCSM Trivandrum group gathering"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest text-xs uppercase">
            Get In Touch
          </span>
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mt-2 tracking-tight">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <ContactFormContent />

      <Footer />
    </div>
  );
}