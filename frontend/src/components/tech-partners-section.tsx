"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  SiNvidia,
  SiAmd,
  SiIntel,
  SiLinux,
  SiUbuntu,
  SiRedhat,
  SiDocker,
  SiKubernetes,
  SiPytorch,
  SiTensorflow,
  SiGo,
  SiPostgresql,
} from "react-icons/si";

// Dynamically import LogoLoop to prevent SSR hydration issues with window/DOM measurements
const LogoLoop = dynamic(() => import("@/components/ui/LogoLoop"), {
  ssr: false,
});

const TECH_PARTNERS = [
  {
    node: <SiNvidia className="size-6" />,
    title: "NVIDIA",
    href: "https://www.nvidia.com",
    hoverColor: "#76B900",
  },
  {
    node: <SiAmd className="size-6" />,
    title: "AMD",
    href: "https://www.amd.com",
    hoverColor: "#ED1C24",
  },
  {
    node: <SiIntel className="size-6" />,
    title: "Intel",
    href: "https://www.intel.com",
    hoverColor: "#0071C5",
  },
  {
    node: <SiLinux className="size-6" />,
    title: "Linux",
    href: "https://kernel.org",
    hoverColor: "#FCC624",
  },
  {
    node: <SiUbuntu className="size-6" />,
    title: "Ubuntu LTS",
    href: "https://ubuntu.com",
    hoverColor: "#E95420",
  },
  {
    node: <SiRedhat className="size-6" />,
    title: "Red Hat Enterprise",
    href: "https://www.redhat.com",
    hoverColor: "#EE0000",
  },
  {
    node: <SiDocker className="size-6" />,
    title: "Docker",
    href: "https://www.docker.com",
    hoverColor: "#2496ED",
  },
  {
    node: <SiKubernetes className="size-6" />,
    title: "Kubernetes",
    href: "https://kubernetes.io",
    hoverColor: "#326CE5",
  },
  {
    node: <SiPytorch className="size-6" />,
    title: "PyTorch",
    href: "https://pytorch.org",
    hoverColor: "#EE4C2C",
  },
  {
    node: <SiTensorflow className="size-6" />,
    title: "TensorFlow",
    href: "https://www.tensorflow.org",
    hoverColor: "#FF6F00",
  },
  {
    node: <SiGo className="size-6" />,
    title: "Go",
    href: "https://go.dev",
    hoverColor: "#00ADD8",
  },
  {
    node: <SiPostgresql className="size-6" />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
    hoverColor: "#4169E1",
  },
];

export function TechPartnersSection() {
  return (
    <section className="w-full relative z-10 py-10 sm:py-14">
      {/* Blueprint Minimal Label */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <p className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-muted-foreground/80">
          Engineered & validated for industry-standard silicon architectures
        </p>
      </div>

      {/* Infinite Logo Loop */}
      <div className="w-full relative">
        <LogoLoop
          logos={TECH_PARTNERS}
          speed={45}
          direction="left"
          logoHeight={24}
          gap={48}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutWidth={0.16}
          muted={0.35}
          labels="inline"
          ariaLabel="Technology Partners and Ecosystem"
        />
      </div>
    </section>
  );
}
