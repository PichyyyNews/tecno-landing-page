"use client";

import React from "react";
import dynamic from "next/dynamic";
import ScrollFloat from "@/components/ui/ScrollFloat";

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
    <section className="w-full relative z-10 pt-10 sm:pt-14 pb-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
        <ScrollFloat
          as="h2"
          splitBy="words"
          containerClassName="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
        >
          Silicon-optimized compute systems — built for extreme sustained loads
        </ScrollFloat>
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
    </section>
  );
}
