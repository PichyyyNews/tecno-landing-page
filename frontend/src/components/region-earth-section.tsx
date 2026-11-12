"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SlGlobe, SlLocationPin, SlSizeFullscreen } from "react-icons/sl";

const GlobeCdn = dynamic(
  () => import("@/components/ui/cobe-globe-cdn").then((mod) => mod.GlobeCdn),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[700px] mx-auto rounded-full bg-zinc-900/40 animate-pulse border border-border/20" />
    ),
  }
);

export function RegionEarthSection() {
  return (
    <section className="w-full pt-8 pb-4 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Region: Earth
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          One smart network for workloads + security — close to users, close to data.
        </p>
      </div>

      {/* Massive 3D Globe Container (dipping behind bottom pillars) */}
      <div className="relative w-full max-w-[780px] md:max-w-[860px] mx-auto flex items-center justify-center -mb-28 sm:-mb-36 md:-mb-44 z-10">
        {/* Soft radial back-glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Left Architectural Callout Box (Cloudflare Style with corner brackets) */}
        <div className="absolute left-2 sm:left-4 md:left-8 top-[38%] -translate-y-1/2 z-30 hidden sm:block max-w-[210px] md:max-w-[230px]">
          <div className="relative p-3 sm:p-3.5 bg-background/85 backdrop-blur-md rounded-lg border border-primary/30 shadow-lg shadow-black/40">
            {/* 4 Corner Tech Brackets */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

            <p className="text-[11px] sm:text-xs text-foreground/90 font-medium leading-relaxed">
              Compute close to users reduces network latency.
            </p>
          </div>
          {/* Connector dashed pointer line towards globe */}
          <div className="w-10 md:w-16 border-t border-dashed border-primary/60 ml-auto mr-[-24px] mt-2 hidden md:block" />
        </div>

        {/* Right Architectural Callout Box (Cloudflare Style with corner brackets) */}
        <div className="absolute right-2 sm:right-4 md:right-8 top-[46%] -translate-y-1/2 z-30 hidden sm:block max-w-[220px] md:max-w-[250px]">
          <div className="relative p-3 sm:p-3.5 bg-background/85 backdrop-blur-md rounded-lg border border-primary/30 shadow-lg shadow-black/40">
            {/* 4 Corner Tech Brackets */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

            <p className="text-[11px] sm:text-xs text-foreground/90 font-medium leading-relaxed">
              Smart Placement moves your compute closer to your data for optimized end-to-end throughput.
            </p>
          </div>
          {/* Connector dashed pointer line towards globe */}
          <div className="w-10 md:w-16 border-t border-dashed border-primary/60 mr-auto ml-[-24px] mt-2 hidden md:block" />
        </div>

        {/* Globe Canvas Container */}
        <div className="w-full aspect-square relative z-10 cursor-grab active:cursor-grabbing">
          <GlobeCdn speed={0.0012} />
        </div>
      </div>

      {/* 3 Value Pillars - Overlapping bottom of Globe sphere */}
      <div className="relative z-20 border-t border-border/60 bg-background/90 backdrop-blur-md pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
          {/* Pillar 1 */}
          <div className="p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center text-primary">
              <SlGlobe className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Run everywhere
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Security, connectivity, and code run in 335+ cities around the world, within 50ms of 95% of the world&apos;s population.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center text-primary">
              <SlLocationPin className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Run anywhere
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our network is close to your users, applications, and sites. It optimizes all your traffic from source to destination for low latency.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center text-primary">
              <SlSizeFullscreen className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Run at massive scale
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No more capacity planning. Ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
