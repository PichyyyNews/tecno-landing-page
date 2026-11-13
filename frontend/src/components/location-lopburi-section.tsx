"use client";

import React from "react";
import { SlArrowRight } from "react-icons/sl";

export function LocationLopburiSection() {
  return (
    <section className="w-full relative z-10 m-0 p-0 !mt-0 !pt-0 !mb-0 !pb-0">
      {/* 2-Column Responsive Layout - flush with dashed lines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* ========================================================= */}
        {/* Left Column: Clean Infrastructure Specs (5/12)           */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-4 py-4 sm:py-6">
          {/* Eyebrow Label */}
          <div className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
            Regional Node • TH-16
          </div>

          {/* Clean Solid Heading & Narrative */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
              Primary Infrastructure Hub: Lopburi
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              Operating at the geographic nexus of Central Thailand. Engineered for direct low-latency dark fiber connectivity to Bangkok and carrier-neutral regional internet exchanges.
            </p>
          </div>

          {/* Minimal Specification Table (No Nested Cards, Non-Breaking Units) */}
          <div className="divide-y divide-white/10 border-y border-white/10 font-mono text-xs">
            <div className="py-2 flex items-center justify-between">
              <span className="text-zinc-500">BKK Transit Latency</span>
              <span className="text-zinc-200 tabular-nums">&lt;&nbsp;1.2&nbsp;ms</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-zinc-500">Backbone Capacity</span>
              <span className="text-zinc-200 tabular-nums">400&nbsp;Gbps Uplink</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-zinc-500">Power Architecture</span>
              <span className="text-zinc-200">2N+1 Modular Grid</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-zinc-500">Coordinates</span>
              <span className="text-orange-400">14.7995° N, 100.6534° E</span>
            </div>
          </div>

          {/* Single Clean Action Link */}
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span>View technical specifications</span>
              <SlArrowRight className="size-2.5" />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right Column: Thailand Pixel Map - flush to right dash   */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 w-full flex items-center justify-center -mr-3 sm:-mr-4 md:-mr-5">
          <div className="w-full h-[380px] sm:h-[420px] md:h-[450px] relative bg-[#09090b] overflow-hidden">
            {/* The amCharts Map Iframe (Draggable & Pannable with Mouse, Shadow length reduced by 15%) */}
            <iframe
              src="/maps/thailand-pixel-map.html"
              title="Thailand Lopburi Core Pixel Map"
              className="w-full h-full border-0 bg-[#09090b] [mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_45%,rgba(0,0,0,0.6)_72%,transparent_100%)]"
              style={{ backgroundColor: "#09090b" }}
              loading="lazy"
            />
            {/* Inward Soft Edge Vignette Overlay (Reduced shadow length by 15%) */}
            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_85%_80%_at_50%_50%,transparent_45%,rgba(9,9,11,0.65)_72%,#09090b_100%)] z-10" />
            {/* Linear Top/Bottom and Left/Right Edge Fades */}
            <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_bottom,#09090b_0%,transparent_13.5%,transparent_86.5%,#09090b_100%)] z-10" />
            <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_right,#09090b_0%,transparent_12%,transparent_88%,#09090b_100%)] z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationLopburiSection;
