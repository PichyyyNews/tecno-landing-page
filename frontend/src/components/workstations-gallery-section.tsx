"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SlArrowRight, SlEnergy, SlLayers, SlSpeedometer } from "react-icons/sl";

// Dynamically import AccordionGallery with SSR disabled for optimal GSAP canvas/DOM measurement
const AccordionGallery = dynamic(
  () => import("@/components/ui/AccordionGallery"),
  { ssr: false }
);

const HARDWARE_SHOWCASE_ITEMS = [
  {
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
    label: "Dual-Socket Neural Workstations",
    link: "#workstations",
    alt: "Dual AMD EPYC / Threadripper Pro Workstations with high-speed PCIe gen 5 bus",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    label: "8-Way Tensor AI Superclusters",
    link: "#servers",
    alt: "Enterprise rackmount AI servers featuring interconnected NVLink GPU backplanes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    label: "Sub-Zero Direct Liquid Cooling",
    link: "#cooling",
    alt: "Custom direct-to-die microchannel liquid cooling blocks and copper radiators",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    label: "4U High-Density Rack Rigs",
    link: "#rackmount",
    alt: "4U compute chassis with titanium hot-swap power delivery",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    label: "400Gbps Low-Latency Network Fabric",
    link: "#network",
    alt: "Ultra-low latency RoCEv2 optical fiber cluster interconnects",
  },
];

export function WorkstationsGallerySection() {
  return (
    <section className="w-full relative z-10 pt-10 sm:pt-14 pb-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono tracking-wider uppercase mb-3">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Hardware Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Silicon-optimized compute systems — built for extreme sustained loads
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          From silent desk-side neural workstations to multi-rack liquid-cooled
          clusters. Precision-engineered to eliminate memory bottlenecks and
          sustain 100% compute duty cycles.
        </p>
      </div>

      {/* Accordion Gallery Component */}
      <div className="w-full">
        <AccordionGallery
          items={HARDWARE_SHOWCASE_ITEMS}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#fd5714"
          overlayColor="#09090b"
          textColor="#ffffff"
          height={480}
          gap={12}
          radius={16}
          tilt={6}
          parallax={0.4}
        />
      </div>

      {/* 3 Technical Feature Callouts with Strict Non-breaking units */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-dashed border-foreground/15 dark:border-white/10">
        <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <SlSpeedometer className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Zero Thermal Throttling
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Industrial liquid manifolds sustain{" "}
              <span className="font-mono text-foreground font-medium whitespace-nowrap">
                100%&nbsp;duty&nbsp;cycles
              </span>{" "}
              without throttling during 72-hour LLM fine-tuning passes.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <SlLayers className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              High-Bandwidth Fabric
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Multi-node topology with{" "}
              <span className="font-mono text-foreground font-medium whitespace-nowrap">
                400&nbsp;Gbps&nbsp;RoCEv2
              </span>{" "}
              optical interconnects for seamless distributed tensor parallelism.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <SlEnergy className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Titanium Power Density
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Redundant{" "}
              <span className="font-mono text-foreground font-medium whitespace-nowrap">
                3,200W&nbsp;Titanium
              </span>{" "}
              supplies achieving 96% conversion efficiency at maximum silicon load.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Footer Row */}
      <div className="mt-8 flex items-center justify-center">
        <a
          href="#configurator"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-95 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
        >
          <span>Configure your custom workstation</span>
          <SlArrowRight className="size-3" />
        </a>
      </div>
    </section>
  );
}
