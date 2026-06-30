import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Compass } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-[#070D1A] dark:text-slate-400 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-navy flex items-center justify-center border border-gold font-poppins font-bold text-gold text-base">
                M
              </span>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-white tracking-wider leading-none text-sm">
                  MGOCSM
                </span>
                <span className="font-inter text-gold font-semibold tracking-widest text-[8px] uppercase">
                  Trivandrum Diocese
                </span>
              </div>
            </Link>
            <p className="font-inter text-sm text-slate-400 mt-2 leading-relaxed">
              Mar Gregorios Orthodox Christian Student Movement (MGOCSM) is the oldest Christian student organization in India, empowering students to grow in faith, education, and service.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-3">
              
              <a
                href="https://www.instagram.com/mgocsmtrivandrum"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-[#E1306C] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@MGOCSMTrivandrumDiocese"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-[#FF0000] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 font-inter text-sm">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About & History
                </Link>
              </li>
            
              <li>
                <Link href="/activities" className="hover:text-gold transition-colors">
                  Activities & Ministries
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Admin */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Resources & Info
            </h3>
            <ul className="space-y-2 font-inter text-sm">
              
              <li>
                <Link href="/admin" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-gold" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 font-inter text-sm text-slate-400">
             
              
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:mgocsm.tvmdiocese@gmail.com" className="hover:text-white transition-colors">
                mgocsm.tvmdiocese@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-slate-800 bg-slate-950 dark:bg-[#040810] py-6 font-inter text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <p>&copy; {currentYear} MGOCSM Trivandrum. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-slate-700">|</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Use
            </Link>
          </div>
          <div>
            <p className="flex items-center gap-1">
              Designed with ❤️ for <span className="text-gold font-semibold">MGOCSM Trivandrum</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
