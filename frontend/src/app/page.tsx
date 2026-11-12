import React from "react";
import Image from "next/image";
import { HeroASCIIBanner } from "@/components/hero-ascii-banner";
import { RegionEarthSection } from "@/components/region-earth-section";
import {
  SlMagnifier,
  SlArrowDown,
  SlArrowRight,
  SlCheck,
} from "react-icons/sl";

// Incremental Static Regeneration (ISR)
export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col relative overflow-x-hidden">
      {/* Top Navbar: Cloudflare inspired */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="h-[46px] w-[46px] relative flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Technology Computer Logo"
                  width={46}
                  height={46}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-sm tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">
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

            <div className="h-4 w-px bg-border hidden sm:block" />

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
      </header>

      {/* 1. Horizontal dashed line between navbar and hero */}
      <div className="w-full border-b border-dashed border-foreground/15 dark:border-white/10" />

      {/* Container wrapper with Left & Right vertical dashed guidelines */}
      <div className="flex-1 w-full relative">
        <div className="max-w-7xl mx-auto pointer-events-none absolute inset-0 border-x border-dashed border-foreground/15 dark:border-white/10" />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 w-full pt-2.5 sm:pt-3 pb-16 space-y-8 relative z-10">
          {/* Central Hero Box with React Bits GradientASCII - tight Cloudflare-style margins */}
          <section className="w-full">
            <HeroASCIIBanner
              title="Everything we learned from engineering high-performance compute — yours by default"
              subtitle="One platform for your workstations, neural models, and enterprise workloads. Build, compute, and scale without managing infrastructure bottlenecks."
              ctaText="Start building for free"
              ctaHref="#explore"
            />
          </section>

          {/* 2. Horizontal dashed line below hero - tight margin */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-dashed border-foreground/15 dark:border-white/10 -mt-2 sm:-mt-1" />

          {/* Region: Earth 3D Globe Section (Interactive Cobe Globe) */}
          <RegionEarthSection />
        </main>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Image
              src="/logo.png"
              alt="Technology Computer"
              width={26}
              height={26}
              className="object-contain opacity-85"
            />
            <span>© 2026 Technology Computer Systems. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-muted-foreground text-[11px]">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/api/health" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              <span>Status</span>
              <SlArrowRight className="size-2" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
