"use client";

import React, { useState } from "react";
import BorderGlow from "@/components/ui/BorderGlow";
import {
  SlCloudUpload,
  SlCheck,
  SlShield,
  SlGlobe,
} from "react-icons/sl";

export function UnifiedPlatformBentoSection() {
  const [commandInput, setCommandInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "↳ deploy-agent → live globally • 18k tokens",
    "↳ lint-agent → all clean • 4k tokens",
    "↳ test-agent → running checks • 8k tokens",
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    setTerminalLogs((prev) => [
      ...prev,
      `↳ exec-agent → ${commandInput.trim()} • 2k tokens`,
    ]);
    setCommandInput("");
  };

  return (
    <section className="w-full relative z-10 py-10 sm:py-14">
      {/* 4-Card Balanced Bento Grid (8+4 top, 4+8 bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
        {/* ========================================================= */}
        {/* Card 1: Top-Left (Workflows & Deployments - 8 Cols)       */}
        {/* ========================================================= */}
        <div className="md:col-span-7 lg:col-span-8 h-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="16.9 100 65"
            backgroundColor="#0c0b10"
            borderRadius={20}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={25}
            colors={["#fd5714", "#ff8442", "#ffe29a"]}
            className="h-full w-full shadow-xl shadow-black/40"
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              {/* Subtle Ambient Warm Glow behind the table */}
              <div className="absolute top-0 left-1/4 w-80 h-44 bg-gradient-to-b from-orange-500/15 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />

              {/* Top Half: App Icon + Deployment Status Table */}
              <div className="relative z-10 space-y-5">
                {/* Cloud Icon Badge with bottom-right floating mark */}
                <div className="relative inline-block">
                  <div className="size-11 sm:size-12 rounded-xl bg-gradient-to-br from-[#fd5714] to-[#ea580c] flex items-center justify-center text-white shadow-lg shadow-orange-950/40">
                    <SlCloudUpload className="size-6 text-white" />
                  </div>
                  {/* Secondary white badge at bottom right */}
                  <div className="absolute -bottom-1.5 -right-1.5 size-5 rounded-md bg-white text-zinc-950 shadow-md flex items-center justify-center">
                    <svg
                      className="size-3 text-zinc-900"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                    </svg>
                  </div>
                </div>

                {/* Deployment Table List */}
                <div className="w-full relative">
                  <div className="space-y-2.5 font-mono text-xs">
                    {/* Row 1: Active Building */}
                    <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.06] text-zinc-300">
                      <span className="text-amber-500 font-medium">v57013</span>
                      <span className="text-zinc-500 text-[11px] hidden sm:inline">
                        Updated 11.14.26, 00:09
                      </span>
                      <div className="flex items-center gap-2 text-amber-400">
                        <span className="text-[11px]">Building</span>
                        <span className="inline-block size-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </div>

                    {/* Row 2: Deployed */}
                    <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.06] text-zinc-400">
                      <span className="text-amber-500/80 font-medium">v57012</span>
                      <span className="text-zinc-500 text-[11px] hidden sm:inline">
                        Updated 11.14.26, 00:09
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-500/90">
                        <span className="text-[11px]">Deployed</span>
                        <span className="size-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <SlCheck className="size-2.5 stroke-[3]" />
                        </span>
                      </div>
                    </div>

                    {/* Row 3: Deployed */}
                    <div className="flex items-center justify-between py-1.5 px-1 text-zinc-500">
                      <span className="text-amber-500/60 font-medium">v57011</span>
                      <span className="text-zinc-600 text-[11px] hidden sm:inline">
                        Updated 11.14.26, 00:09
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-500/70">
                        <span className="text-[11px]">Deployed</span>
                        <span className="size-4 rounded-full bg-amber-500/15 text-amber-400/80 flex items-center justify-center">
                          <SlCheck className="size-2.5 stroke-[3]" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom gradient fade-out */}
                  <div className="w-full h-8 bg-gradient-to-t from-[#0c0b10] to-transparent pointer-events-none -mt-4" />
                </div>
              </div>

              {/* Bottom Half: Copy Title & Description */}
              <div className="pt-6 sm:pt-8 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Fits into your existing workflows
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                  Git, GitHub Actions, VS Code, and any framework. No proprietary tools or vendor lock-in.
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* ========================================================= */}
        {/* Card 2: Top-Right (Solid Cloudflare Orange - 4 Cols)     */}
        {/* ========================================================= */}
        <div className="md:col-span-5 lg:col-span-4 h-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 100 80"
            backgroundColor="#fd5714"
            borderRadius={20}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={25}
            colors={["#ffffff", "#ffe29a", "#ffedd5"]}
            className="h-full w-full shadow-xl shadow-orange-950/30"
          >
            <div className="p-6 sm:p-8 flex flex-col justify-start h-full relative text-white overflow-hidden">
              {/* Subtle geometric background motif */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              {/* Outline interconnected nodes icon */}
              <div className="mb-8 relative z-10">
                <div className="size-9 rounded-lg bg-white/15 flex items-center justify-center text-white backdrop-blur-sm">
                  <SlGlobe className="size-5 text-white" />
                </div>
              </div>

              {/* Copy Title & Description */}
              <div className="space-y-3 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  One network for users, apps, and data
                </h3>
                <p className="text-xs sm:text-[13px] text-white/90 font-normal leading-relaxed">
                  Whether you&apos;re shipping code, securing employees, or connecting branches, it all runs on the same global network — managed from one dashboard, billed as one platform.
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* ========================================================= */}
        {/* Card 3: Bottom-Left (Secure by default - 4 Cols)          */}
        {/* ========================================================= */}
        <div className="md:col-span-5 lg:col-span-4 h-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="16.9 100 65"
            backgroundColor="#0c0b10"
            borderRadius={20}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={25}
            colors={["#fd5714", "#ff8442", "#ffe29a"]}
            className="h-full w-full shadow-xl shadow-black/40 min-h-[240px]"
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Shield Icon in circle */}
              <div className="mb-6 relative z-10">
                <div className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:border-orange-500/40 group-hover:text-orange-400 transition-colors">
                  <SlShield className="size-4" />
                </div>
              </div>

              {/* Copy Title & Description */}
              <div className="mt-auto relative z-10">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2">
                  Secure by default
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                  DDoS protection, WAF, bot management, and Zero Trust controls are built into the network and run on every request from day one.
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* ========================================================= */}
        {/* Card 4: Bottom-Right (Fast path to AI adoption - 8 Cols)  */}
        {/* ========================================================= */}
        <div className="md:col-span-7 lg:col-span-8 h-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="16.9 100 65"
            backgroundColor="#0c0b10"
            borderRadius={20}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={25}
            colors={["#fd5714", "#ff8442", "#ffe29a"]}
            className="h-full w-full shadow-xl shadow-black/40"
          >
            <div className="p-6 sm:p-8 flex flex-col justify-center h-full relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                {/* Left side: Copy */}
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Fast path to AI adoption
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    Build, deploy, and govern AI agents on the same network. Secure MCP portals, identity-aware access, and built-in inference make production AI a one-step deploy.
                  </p>
                </div>

                {/* Right side: High-Tech Agent Runner Terminal */}
                <div className="lg:col-span-7">
                  <div className="w-full bg-black/60 rounded-xl border border-white/10 p-4 font-mono text-xs shadow-2xl space-y-2.5 relative">
                    {/* Header status line */}
                    <div className="text-zinc-500 text-[11px]">
                      Launching agents to analyze repository...
                    </div>

                    {/* Agent launch notification */}
                    <div className="flex items-center gap-1.5 text-amber-500 font-medium text-xs">
                      <span className="size-2 rounded-full bg-amber-500 inline-block animate-ping opacity-75" />
                      <span>3 background agents launched</span>
                    </div>

                    {/* Sub-agent branch lines */}
                    <div className="space-y-1 text-zinc-400 text-[11px] pl-2 border-l border-white/10">
                      {terminalLogs.map((log, index) => (
                        <div key={index} className="leading-snug">
                          {log}
                        </div>
                      ))}
                    </div>

                    {/* Loading status with braille dots */}
                    <div className="flex items-center gap-2 text-amber-500/90 text-[11px] pt-1">
                      <span className="font-bold">⠶</span>
                      <span className="animate-pulse">Agents frontend analysis loading...</span>
                    </div>

                    {/* Interactive command input prompt */}
                    <form
                      onSubmit={handleCommandSubmit}
                      className="flex items-center justify-between pt-2 border-t border-white/[0.08] mt-2 gap-2"
                    >
                      <div className="flex items-center gap-2 text-zinc-500 text-xs flex-1">
                        <span className="text-zinc-400 font-bold">&gt;</span>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          placeholder="query cluster status..."
                          className="bg-transparent text-zinc-200 placeholder-zinc-600 outline-none text-xs w-full font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#fd5714] text-white text-[10px] font-semibold flex items-center gap-1 hover:bg-[#ea580c] transition-colors shadow-sm cursor-pointer"
                      >
                        <span>Enter</span>
                        <span>↵</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

export default UnifiedPlatformBentoSection;
