"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Shield, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  //{ name: "Our Diocese", href: "/diocese" },
  { name: "Activities", href: "/activities" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Leadership", href: "/leadership" },
  { name: "Newsletters", href: "/resources" },
  //{ name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-10 h-10 rounded-full bg-navy flex items-center justify-center border-2 border-gold font-poppins font-bold text-gold text-lg transition-transform duration-300 group-hover:scale-105">
                M
              </span>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-navy dark:text-white tracking-wider leading-none text-base">
                  MGOCSM
                </span>
                <span className="font-inter text-gold font-semibold tracking-widest text-[9px] uppercase">
                  Trivandrum Diocese
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg font-inter text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-gold bg-navy/5 dark:bg-white/5"
                        : "text-slate-700 hover:text-navy dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Buttons Section */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Admin Button */}
              <Link
                href="/admin"
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  pathname === "/admin"
                    ? "text-gold"
                    : "text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-white"
                }`}
                title="Admin Panel"
              >
                <Shield className="w-5 h-5" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:text-navy dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gold-light" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Action Button */}
              {/* <Link
                href="/contact?volunteer=true"
                className="bg-navy hover:bg-navy-light text-white dark:bg-gold dark:hover:bg-gold-light dark:text-navy-dark px-4 py-2 rounded-full font-inter text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
              >
                Join Us
              </Link> */}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:text-navy dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gold-light" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-navy dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden glass shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 border-t border-slate-200/20 dark:border-slate-800/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl font-poppins text-base font-medium transition-all ${
                      isActive
                        ? "text-gold bg-navy/10 dark:bg-white/5 font-bold"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-200/25 dark:border-slate-800/25 flex flex-col gap-3 px-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-navy dark:hover:text-white font-medium"
                >
                  <Shield className="w-5 h-5 text-gold" />
                  <span>Admin Dashboard</span>
                </Link>
                {/* <Link
                  href="/contact?volunteer=true"
                  className="bg-navy text-white dark:bg-gold dark:text-navy-dark text-center py-3 rounded-xl font-inter font-bold shadow-md"
                >
                  Join Us
                </Link> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
