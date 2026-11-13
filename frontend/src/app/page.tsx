import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { HeroASCIIBanner } from "@/components/hero-ascii-banner";
import { RegionEarthSection } from "@/components/region-earth-section";
import { WorkstationsGallerySection } from "@/components/workstations-gallery-section";
import { TechPartnersSection } from "@/components/tech-partners-section";
import { UnifiedPlatformBentoSection } from "@/components/unified-platform-bento-section";
import { LocationLopburiSection } from "@/components/location-lopburi-section";
import { SlArrowRight } from "react-icons/sl";

// Incremental Static Regeneration (ISR)
export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col relative overflow-x-clip">
      {/* Top Sticky Frosted Glass Navbar */}
      <Navbar />

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

          {/* 3. Horizontal dashed line between Region Earth and Hardware Gallery */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-dashed border-foreground/15 dark:border-white/10" />

          {/* Hardware Showcase Accordion Gallery (React Bits) */}
          <WorkstationsGallerySection />

          {/* 4. Horizontal dashed line between Hardware Gallery and Partners Loop */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-dashed border-foreground/15 dark:border-white/10" />

          {/* Silicon & Ecosystem Partners Logo Loop (React Bits) */}
          <TechPartnersSection />

          {/* 5. Horizontal dashed line between Partners Loop and Unified Bento Grid */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-dashed border-foreground/15 dark:border-white/10" />

          {/* Cloudflare-Style Unified Platform Bento Grid */}
          <UnifiedPlatformBentoSection />

          {/* 6. Horizontal dashed line between Bento Grid and Location Section */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-dashed border-foreground/15 dark:border-white/10" />

          {/* Thailand Lopburi Core Compute Location Section */}
          <LocationLopburiSection />
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
