"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SlGlobe, SlLocationPin, SlSizeFullscreen } from "react-icons/sl";

const GlobeCdn = dynamic(
  () => import("@/components/ui/cobe-globe-cdn").then((mod) => mod.GlobeCdn),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[480px] mx-auto rounded-full bg-zinc-900/40 animate-pulse border border-border/30" />
    ),
  }
);

export function RegionEarthSection() {
  return (
    <section className="w-full py-8 space-y-12 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Region: Earth
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          One smart network for workloads + security — close to users, close to data.
        </p>
      </div>

      {/* 3D Cobe Globe Container */}
      <div className="relative w-full max-w-xl mx-auto flex items-center justify-center">
        {/* Soft radial back-glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[480px] aspect-square relative z-10">
          <GlobeCdn speed={0.0025} />
        </div>
      </div>

      {/* 3 Value Pillars (Cloudflare Style with dividers) */}
      <div className="border-t border-border/60 pt-8">
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
