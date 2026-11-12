import React from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroASCIIBanner } from "@/components/hero-ascii-banner";
import {
  SlMagnifier,
  SlArrowDown,
  SlArrowRight,
  SlCheck,
  SlLayers,
  SlScreenDesktop,
  SlChart
} from "react-icons/sl";

// Incremental Static Regeneration (ISR)
export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      {/* Top Navbar: Cloudflare inspired */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="h-7 w-7 relative flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Technology Computer Logo"
                  width={28}
                  height={28}
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

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-16 space-y-16">
        {/* Central Hero Box with React Bits GradientASCII */}
        <section className="w-full">
          <HeroASCIIBanner
            title="Everything we learned from engineering high-performance compute — yours by default"
            subtitle="One platform for your workstations, neural models, and enterprise workloads. Build, compute, and scale without managing infrastructure bottlenecks."
            ctaText="Start building for free"
            ctaHref="#explore"
          />
        </section>

        {/* Subheader Section below Hero (Cloudflare Style) */}
        <section className="text-center max-w-2xl mx-auto space-y-3 py-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Region: Earth
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            One smart platform for high-throughput compute, security, and neural workloads — close to users, close to silicon.
          </p>
        </section>

        {/* Core Pillars / Value Propositions (Minimal Clean UI) */}
        <section id="solutions" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
              <SlScreenDesktop className="size-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">High-Throughput Workstations</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Custom-built desktop and rackmount rigs optimized for LLM fine-tuning, complex 3D rendering, and multi-core compilation.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
              <SlLayers className="size-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Next-Gen Software Stack</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native SSG/ISR caching with Next.js 16, concurrent Go API microservices, and automated Caddy edge proxy routing.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
              <SlChart className="size-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Sub-Millisecond Edge Gateway</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enterprise security, automatic SSL/TLS termination, and database health observability directly out of the box.
            </p>
          </div>
        </section>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Technology Computer"
              width={16}
              height={16}
              className="object-contain opacity-75"
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
