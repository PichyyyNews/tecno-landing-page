"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SlArrowDown, SlCheck, SlMagnifier } from "react-icons/sl";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check immediately on mount in case page is refreshed while scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/65 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] supports-[backdrop-filter]:bg-background/55"
          : "bg-background/90 backdrop-blur-md border-b border-border/40"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled ? "h-14 sm:h-15" : "h-16"
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 shrink-0">
          <a href="/" className="flex items-center space-x-3 group">
            <div
              className={`relative flex items-center justify-center shrink-0 transition-all duration-300 ${
                isScrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-[46px] w-[46px]"
              }`}
            >
              <Image
                src="/logo.png"
                alt="Technology Computer Logo"
                width={46}
                height={46}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">
              Technology Computer
            </span>
          </a>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium text-muted-foreground">
          <a
            href="#products"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>Products</span>
            <SlArrowDown className="size-2 text-muted-foreground/70" />
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>Solutions</span>
            <SlArrowDown className="size-2 text-muted-foreground/70" />
          </a>
          <a
            href="#resources"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>Resources</span>
            <SlArrowDown className="size-2 text-muted-foreground/70" />
          </a>
          <a
            href="#pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* Action Tools & Right Nav */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <a
            href="/api/health"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
          >
            <SlCheck className="size-3 text-primary" />
            <span>System Live</span>
          </a>

          <div className="h-4 w-px bg-border/60 hidden sm:block" />

          <a
            href="#dashboard"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Dashboard
          </a>

          <a
            href="#contact"
            className="text-xs font-medium text-foreground hover:text-primary transition-colors hidden sm:block"
          >
            Contact sales
          </a>

          <button
            type="button"
            aria-label="Search"
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <SlMagnifier className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Thin Frosted Orange Glass Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-[#ff8442] to-[#ffe29a] transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(253,87,20,0.8)] opacity-90"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
