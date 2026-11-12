"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";
import { SlUser, SlLayers } from "react-icons/sl";

interface CdnMarker {
  id: string;
  location: [number, number];
  region: string;
  type?: "user" | "data";
}

interface CdnArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

interface GlobeCdnProps {
  markers?: CdnMarker[];
  arcs?: CdnArc[];
  className?: string;
  speed?: number;
}

const defaultMarkers: CdnMarker[] = [
  { id: "cdn-iad", location: [38.95, -77.45], region: "Data Origin", type: "data" },
  { id: "cdn-sfo", location: [37.62, -122.38], region: "Edge Compute", type: "user" },
  { id: "cdn-cdg", location: [49.01, 2.55], region: "Edge Compute", type: "user" },
  { id: "cdn-hnd", location: [35.55, 139.78], region: "Data Origin", type: "data" },
  { id: "cdn-syd", location: [-33.95, 151.18], region: "Edge Compute", type: "user" },
  { id: "cdn-gru", location: [-23.43, -46.47], region: "Edge Compute", type: "user" },
  { id: "cdn-sin", location: [1.36, 103.99], region: "Edge Compute", type: "user" },
  { id: "cdn-arn", location: [59.65, 17.93], region: "Data Origin", type: "data" },
  { id: "cdn-dub", location: [53.43, -6.25], region: "Edge Compute", type: "user" },
  { id: "cdn-bom", location: [19.09, 72.87], region: "Edge Compute", type: "user" },
];

const defaultArcs: CdnArc[] = [
  { id: "cdn-arc-1", from: [38.95, -77.45], to: [49.01, 2.55] },
  { id: "cdn-arc-2", from: [37.62, -122.38], to: [35.55, 139.78] },
  { id: "cdn-arc-3", from: [49.01, 2.55], to: [1.36, 103.99] },
  { id: "cdn-arc-4", from: [38.95, -77.45], to: [-23.43, -46.47] },
  { id: "cdn-arc-5", from: [35.55, 139.78], to: [-33.95, 151.18] },
  { id: "cdn-arc-6", from: [49.01, 2.55], to: [19.09, 72.87] },
];

export function GlobeCdn({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className = "",
  speed = 0.003,
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [traffic, setTraffic] = useState(() =>
    defaultArcs.map((a, i) => ({
      id: a.id,
      value: [420, 380, 290, 185, 156, 134][i] || 100,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((data) =>
        data.map((t) => ({
          ...t,
          value: Math.max(50, t.value + Math.floor(Math.random() * 21) - 10),
        }))
      );
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: isDark ? 1 : 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: isDark ? 4.5 : 10,
        baseColor: isDark ? [0.18, 0.18, 0.2] : [1, 1, 1],
        markerColor: isDark ? [0.99, 0.42, 0.12] : [0.99, 0.35, 0.08],
        glowColor: isDark ? [0.28, 0.14, 0.05] : [0.94, 0.93, 0.91],
        markerElevation: 0.02,
        markers: markers.map((m) => ({
          location: m.location,
          size: 0.012,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: isDark ? [0.99, 0.48, 0.16] : [0.99, 0.35, 0.08],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, arcs, speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 4,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
          } as React.CSSProperties}
        >
          {/* Cloudflare Style Circular Orange Badge */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-orange-500/40 ring-2 ring-primary/40">
            {m.type === "data" ? (
              <SlLayers className="size-3 text-white" />
            ) : (
              <SlUser className="size-3 text-white" />
            )}
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.5rem",
              color: "#fff",
              background: "rgba(0,0,0,0.75)",
              border: "1px solid rgba(253, 87, 20, 0.4)",
              backdropFilter: "blur(4px)",
              padding: "1px 5px",
              borderRadius: 4,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap" as const,
            }}
          >
            {m.region}
          </span>
        </div>
      ))}
      {traffic.map((t) => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-arc-${t.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            fontFamily: "monospace",
            fontSize: "0.5rem",
            color: "#fff",
            background: "rgba(24, 24, 27, 0.85)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(253, 87, 20, 0.4)",
            padding: "2px 6px",
            borderRadius: 4,
            whiteSpace: "nowrap" as const,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-arc-${t.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${t.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
          } as React.CSSProperties}
        >
          {t.value}k req/s
        </div>
      ))}
    </div>
  );
}
