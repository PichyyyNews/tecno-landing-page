"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import AccordionGallery with SSR disabled for optimal GSAP canvas/DOM measurement
const AccordionGallery = dynamic(
  () => import("@/components/ui/AccordionGallery"),
  { ssr: false }
);

const HARDWARE_SHOWCASE_ITEMS = [
  {
    image: "/department/Gemini_Generated_Image_u644ruu644ruu644.webp",
    label: "Technic Computer",
    link: "#technic-computer",
    alt: "Technic Computer Department - Hardware engineering, microelectronics and systems",
    objectPosition: "center 5%",
  },
  {
    image: "/department/Gemini_Generated_Image_dot74fdot74fdot7.webp",
    label: "Technology Computer",
    link: "#technology-computer",
    alt: "Technology Computer Department - Enterprise infrastructure, cloud computing and servers",
    objectPosition: "center 8%",
  },
  {
    image: "/department/Gemini_Generated_Image_7k57ux7k57ux7k57.webp",
    label: "Game and Animation",
    link: "#game-animation",
    alt: "Game and Animation Department - 3D interactive graphics, game development and visual media",
    objectPosition: "center 10%",
  },
  {
    image: "/department/Gemini_Generated_Image_rbi22vrbi22vrbi2.webp",
    label: "Network and Security",
    link: "#network-security",
    alt: "Network and Security Department - Cybersecurity, defense operations and network fabric",
    objectPosition: "center 6%",
  },
  {
    image: "/department/Gemini_Generated_Image_q4yb2dq4yb2dq4yb.webp",
    label: "Information Technology",
    link: "#information-technology",
    alt: "Information Technology Department - Modern software engineering, data and IT solutions",
    objectPosition: "center 5%",
  },
];

export function WorkstationsGallerySection() {
  return (
    <section className="w-full relative z-10 pt-10 sm:pt-14 pb-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
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
          defaultIndex={1}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#fd5714"
          overlayColor="#09090b"
          textColor="#ffffff"
          height={500}
          gap={12}
          radius={16}
          tilt={6}
          parallax={0.4}
        />
      </div>
    </section>
  );
}
