"use client";

import React from "react";
import { SlArrowRight } from "react-icons/sl";

export function LocationLopburiSection() {
  return (
    <section className="w-full relative z-10 py-12 sm:py-16">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ========================================================= */}
        {/* Left Column: Clean Infrastructure Specs (5/12)           */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Eyebrow Label */}
          <div className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
            Regional Node • TH-16
          </div>

          {/* Clean Solid Heading & Narrative */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
              Primary Infrastructure Hub: Lopburi
            </h2>
            <p className="text-sm text-zinc-400 font-normal leading-relaxed">
              Operating at the geographic nexus of Central Thailand. Engineered for direct low-latency dark fiber connectivity to Bangkok and carrier-neutral regional internet exchanges.
            </p>
          </div>

          {/* Minimal Specification Table (No Nested Cards, Non-Breaking Units) */}
          <div className="divide-y divide-white/10 border-y border-white/10 font-mono text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-zinc-500">BKK Transit Latency</span>
              <span className="text-zinc-200 tabular-nums">&lt;&nbsp;1.2&nbsp;ms</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-zinc-500">Backbone Capacity</span>
              <span className="text-zinc-200 tabular-nums">400&nbsp;Gbps Uplink</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-zinc-500">Power Architecture</span>
              <span className="text-zinc-200">2N+1 Modular Grid</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-zinc-500">Coordinates</span>
              <span className="text-orange-400">14.7995° N, 100.6534° E</span>
            </div>
          </div>

          {/* Single Clean Action Link */}
          <div className="pt-1">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span>View technical specifications</span>
              <SlArrowRight className="size-2.5" />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right Column: Thailand Pixel Map (Borderless & Clean) (7/12) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 w-full flex items-center justify-center">
          <div className="w-full h-[460px] sm:h-[520px] md:h-[560px] relative bg-[#09090b]">
            <iframe
              src="/maps/thailand-pixel-map.html"
              title="Thailand Lopburi Core Pixel Map"
              className="w-full h-full border-0 bg-[#09090b]"
              style={{ backgroundColor: "#09090b" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationLopburiSection;
