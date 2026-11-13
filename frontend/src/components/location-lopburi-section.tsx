"use client";

import React from "react";
import BorderGlow from "@/components/ui/BorderGlow";
import {
  SlLocationPin,
  SlSpeedometer,
  SlEnergy,
  SlShield,
  SlCheck,
  SlCompass,
  SlArrowRight,
} from "react-icons/sl";

export function LocationLopburiSection() {
  return (
    <section className="w-full relative z-10 py-12 sm:py-16">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* ========================================================= */}
        {/* Left Column: Location Narrative & Technical Specs (5/12)   */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fd5714]" />
            </span>
            <SlLocationPin className="size-3 text-[#fd5714]" />
            <span className="text-zinc-200 font-semibold tracking-wide uppercase">
              TH-CENTRAL-01
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-amber-400 font-medium">Lopburi Core Node</span>
          </div>

          {/* Section Headline & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Primary Compute Node: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd5714] via-[#ff8442] to-[#ffe29a]">
                Lopburi, Thailand
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Strategically engineered at the geographic nexus of Central Thailand.
              Designed for high-density neural clusters, workstation testbeds,
              and low-latency direct dark fiber connectivity to Bangkok and regional internet exchanges.
            </p>
          </div>

          {/* 4 Technical Spec Cards (Anti-Card-Nesting, Non-Breaking Units) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Spec 1: Latency */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <SlSpeedometer className="size-3.5 text-[#fd5714]" />
                <span>BKK Metro Latency</span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white whitespace-nowrap">
                &lt;&nbsp;1.2&nbsp;ms
              </div>
              <div className="text-[11px] text-zinc-500">
                Direct DWDM fiber ring
              </div>
            </div>

            {/* Spec 2: Backbone Uplink */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <SlEnergy className="size-3.5 text-[#fd5714]" />
                <span>Core Uplink</span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white whitespace-nowrap">
                400&nbsp;Gbps
              </div>
              <div className="text-[11px] text-zinc-500">
                Dual redundant fabric
              </div>
            </div>

            {/* Spec 3: Power Redundancy */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <SlShield className="size-3.5 text-[#fd5714]" />
                <span>Power Grid</span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white whitespace-nowrap">
                2N+1&nbsp;Tier-III
              </div>
              <div className="text-[11px] text-zinc-500">
                Dedicated substation feed
              </div>
            </div>

            {/* Spec 4: Availability */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <SlCompass className="size-3.5 text-[#fd5714]" />
                <span>Network Uptime</span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white whitespace-nowrap">
                99.999%
              </div>
              <div className="text-[11px] text-zinc-500">
                Carrier-neutral peering
              </div>
            </div>
          </div>

          {/* Architectural Feature Bullets */}
          <div className="space-y-2 pt-1 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="size-4 rounded-full bg-orange-500/20 text-[#fd5714] flex items-center justify-center shrink-0">
                <SlCheck className="size-2.5 stroke-[3]" />
              </span>
              <span>Direct peering with CAT, TOT, AIS & True IX</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-4 rounded-full bg-orange-500/20 text-[#fd5714] flex items-center justify-center shrink-0">
                <SlCheck className="size-2.5 stroke-[3]" />
              </span>
              <span>Sub-zero liquid-cooled workstation validation testbed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-4 rounded-full bg-orange-500/20 text-[#fd5714] flex items-center justify-center shrink-0">
                <SlCheck className="size-2.5 stroke-[3]" />
              </span>
              <span>Isolated bare-metal AI model training & inference suites</span>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fd5714] hover:bg-[#ea580c] text-white text-xs font-semibold transition-colors shadow-lg shadow-orange-950/40"
            >
              <span>Explore facility specs</span>
              <SlArrowRight className="size-2.5" />
            </a>
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 font-mono text-[11px]">
              <span className="text-zinc-500">GPS:</span>
              <span className="text-zinc-300">14.7995° N, 100.6534° E</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right Column: Thailand Pixel Map with Lopburi Glow (7/12) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 w-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="16.9 100 65"
            backgroundColor="#0c0b10"
            borderRadius={24}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={25}
            colors={["#fd5714", "#ff8442", "#ffe29a"]}
            className="w-full shadow-2xl shadow-black/60 relative overflow-hidden group"
          >
            <div className="p-3 sm:p-4 flex flex-col justify-between h-full relative">
              {/* Subtle ambient warm backlight */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />

              {/* Map Header Status Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-2 font-mono text-[11px] text-zinc-400 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#fd5714] animate-pulse" />
                  <span className="text-zinc-200 font-medium">LIVE TELEMETRY</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400">THAILAND PIXEL GRID</span>
                </div>
                <div className="text-amber-400 font-mono text-[10px] hidden sm:block">
                  CENTRAL HUB: TH-16 LOPBURI
                </div>
              </div>

              {/* Thailand Pixel Map Iframe Viewer */}
              <div className="w-full h-[480px] sm:h-[540px] md:h-[580px] relative rounded-xl overflow-hidden bg-black/40 border border-white/[0.06]">
                <iframe
                  src="/maps/thailand-pixel-map.html"
                  title="Thailand Lopburi Core Pixel Map"
                  className="w-full h-full border-0 relative z-10"
                  loading="lazy"
                />
              </div>

              {/* Map Footer Spec Strip */}
              <div className="flex items-center justify-between px-3 pt-3 text-[11px] font-mono text-zinc-500 relative z-10 border-t border-white/[0.06] mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Network Transit:</span>
                  <span className="text-amber-400">Active (0.00% drop)</span>
                </div>
                <div className="text-zinc-400">
                  Carrier-Neutral Node • Tier-III ISO/IEC 27001
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

export default LocationLopburiSection;
