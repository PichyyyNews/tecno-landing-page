"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SlArrowRight } from "react-icons/sl";

const GradientASCII = dynamic(() => import("@/components/GradientASCII"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#160c07] animate-pulse" />
  ),
});

interface HeroASCIIBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeroASCIIBanner({
  title = "Everything we learned from engineering high-performance compute — yours by default",
  subtitle = "One platform for your apps, neural models, and workstations. Build, compute, and scale without infrastructure bottlenecks.",
  ctaText = "Start building for free",
  ctaHref = "#explore",
}: HeroASCIIBannerProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-black">
      {/* ASCII Animation Container */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <GradientASCII
          colors={["#fd5714", "#ffe8a6", "#d8c58d", "#ffb873"]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          glyphOpacity={0.85}
          glow={0.2}
          depthOfField={0}
          flicker={0.2}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={1}
          gradientOpacity={0.9}
          grain={0.08}
          variation={0}
          mouseInteraction
          scrambleRadius={0.1}
          clickEffect="wave"
          intro
          lightMode={false}
        />

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none select-none">
          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
              {title}
            </h1>

            <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-100/90 leading-relaxed drop-shadow">
              {subtitle}
            </p>

            <div className="pt-3 pointer-events-auto">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-100 transition-colors shadow-lg active:scale-95"
              >
                <span>{ctaText}</span>
                <SlArrowRight className="size-2.5 text-zinc-950" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
