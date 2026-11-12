"use client";

import React from "react";

export function BlueprintGridPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* SVG Definitions for Dot Matrix and Dashed Lines */}
      <svg
        className="absolute inset-0 h-full w-full stroke-foreground/[0.08] dark:stroke-white/[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle dot matrix pattern: 18px x 18px grid */}
          <pattern
            id="blueprint-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              className="fill-foreground/[0.12] dark:fill-white/[0.14]"
            />
          </pattern>

          {/* Full grid cell pattern with dashed borders and dots inside */}
          <pattern
            id="blueprint-cell"
            width="160"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Dot fill */}
            <rect width="160" height="64" fill="url(#blueprint-dots)" />
            {/* Dashed border cell */}
            <path
              d="M 160 0 L 0 0 0 64"
              fill="none"
              strokeDasharray="6 6"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Global Horizontal Dashed Guidelines running across the viewport */}
        <g strokeDasharray="8 8" strokeWidth="1">
          {/* Below header */}
          <line x1="0" y1="64" x2="100%" y2="64" />
          {/* Above hero */}
          <line x1="0" y1="96" x2="100%" y2="96" />
          {/* Hero midpoint */}
          <line x1="0" y1="400" x2="100%" y2="400" />
          {/* Hero bottom baseline */}
          <line x1="0" y1="700" x2="100%" y2="700" />
          {/* Section break lines */}
          <line x1="0" y1="840" x2="100%" y2="840" />
          <line x1="0" y1="980" x2="100%" y2="980" />
          <line x1="0" y1="1240" x2="100%" y2="1240" />
        </g>
      </svg>

      {/* Structured Container Grid Columns (aligned with max-w-7xl) */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 relative">
        {/* Left vertical architectural strip with dot matrix & dashed borders */}
        <div className="absolute left-6 top-16 bottom-0 w-36 sm:w-44 border-x border-dashed border-foreground/[0.08] dark:border-white/[0.07] hidden md:block">
          <div
            className="w-full h-full"
            style={{ backgroundImage: "url(#blueprint-cell)" }}
          >
            <svg className="w-full h-full">
              <rect width="100%" height="100%" fill="url(#blueprint-cell)" />
            </svg>
          </div>
        </div>

        {/* Right vertical architectural strip with dot matrix & dashed borders */}
        <div className="absolute right-6 top-16 bottom-0 w-36 sm:w-44 border-x border-dashed border-foreground/[0.08] dark:border-white/[0.07] hidden lg:block">
          <div className="w-full h-full">
            <svg className="w-full h-full">
              <rect width="100%" height="100%" fill="url(#blueprint-cell)" />
            </svg>
          </div>
        </div>

        {/* Center column dashed lines behind "Region: Earth" */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[680px] w-64 sm:w-80 h-[500px] border-x border-dashed border-foreground/[0.06] dark:border-white/[0.05] pointer-events-none">
          <svg className="w-full h-full">
            <rect width="100%" height="100%" fill="url(#blueprint-dots)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
