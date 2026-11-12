import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SlEnergy,
  SlScreenDesktop,
  SlLayers,
  SlChart,
  SlCheck,
  SlArrowRight,
  SlClock
} from "react-icons/sl";

// Incremental Static Regeneration (ISR)
export const revalidate = 60;

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  specs: string;
  description: string;
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "QuantumBook Pro 16",
    category: "Workstation",
    price: 2499,
    specs: "M4 Max · 64 GB RAM · 2 TB SSD · 16\" XDR 120 Hz",
    description: "High-throughput mobile workstation for ML training and compiler benchmarks."
  },
  {
    id: 2,
    name: "AeroBlade Ultra 14",
    category: "Ultrabook",
    price: 1399,
    specs: "Core Ultra 7 · 32 GB RAM · 1 TB SSD · 2.8K 120 Hz",
    description: "Lightweight carbon chassis with integrated NPU and 18-hour battery longevity."
  },
  {
    id: 3,
    name: "Titan Apex Neural Rig",
    category: "Desktop Rig",
    price: 4899,
    specs: "Ryzen 9 9950X · RTX 5090 · 128 GB ECC · Liquid Loop",
    description: "Heavy-duty local inference workstation for photorealistic rendering and models."
  },
  {
    id: 4,
    name: "CyberDeck Edge Mini",
    category: "Edge Node",
    price: 899,
    specs: "Ryzen 7 8845HS · 32 GB DDR5 · Dual 2.5 GbE · USB4",
    description: "Compact form-factor computing node for micro-servers and container clusters."
  }
];

async function getProducts(): Promise<{ products: Product[]; source: string }> {
  const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:8080";
  try {
    const res = await fetch(`${backendUrl}/api/products`, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("API unreachable");
    const data = await res.json();
    return { products: data, source: "PostgreSQL Database" };
  } catch {
    return { products: fallbackProducts, source: "Static Cache (Fallback)" };
  }
}

export default async function HomePage() {
  const { products, source } = await getProducts();
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <SlEnergy className="size-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Nexus Systems
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs text-muted-foreground">
            <a href="#hardware" className="hover:text-foreground transition-colors">Hardware</a>
            <a href="#architecture" className="hover:text-foreground transition-colors">Stack</a>
            <a href="#diagnostics" className="hover:text-foreground transition-colors">Diagnostics</a>
            <a href="/api/health" target="_blank" className="hover:text-foreground transition-colors">Health API</a>
          </nav>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-border bg-muted text-muted-foreground whitespace-nowrap shrink-0">
              <SlCheck className="size-3 text-emerald-500" />
              Caddy 2 :80
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Intro Zone */}
        <section className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-secondary text-secondary-foreground border border-border whitespace-nowrap">
            <SlLayers className="size-3" />
            SSG + ISR Architecture · Next.js 16
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
            High-Performance Hardware Systems
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Engineered computing infrastructure for developer workstations and local deep learning. Rendered via Incremental Static Regeneration with Go, PostgreSQL, and Caddy reverse proxy.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="#hardware"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Browse Catalog
              <SlArrowRight className="size-2.5" />
            </a>
            <a
              href="#architecture"
              className="px-5 py-2 rounded-full border border-border bg-card text-foreground text-xs font-medium hover:bg-muted transition-colors"
            >
              System Specs
            </a>
          </div>
        </section>

        {/* Hardware Catalog Section */}
        <section id="hardware" className="space-y-6">
          <div className="flex items-end justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <SlScreenDesktop className="size-4 text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">Computer Systems</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Source: <span className="font-mono text-foreground">{source}</span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-muted border border-border whitespace-nowrap shrink-0">
              <SlClock className="size-2.5" />
              Cache: 60s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {p.category}
                    </span>
                    <span className="text-sm font-semibold font-mono tabular-nums text-foreground whitespace-nowrap shrink-0">
                      ${p.price.toLocaleString()}&nbsp;USD
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Inset Box Level 2 (Anti-card-nesting) */}
                  <div className="rounded-xl bg-muted p-3 text-[11px] font-mono space-y-1">
                    <div className="text-muted-foreground uppercase text-[10px]">Specifications</div>
                    <div className="text-foreground leading-normal">{p.specs}</div>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors"
                  >
                    Configure
                    <SlArrowRight className="size-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack Architecture Section */}
        <section id="architecture" className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <SlLayers className="size-4 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Stack Hierarchy</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Multi-tier containerized production topology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <span className="text-[11px] font-mono text-muted-foreground">01 · Frontend</span>
              <div className="text-sm font-semibold text-foreground">Next.js 16 Standalone</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                App Router with SSG and Incremental Static Regeneration.
              </p>
              <div className="text-[11px] font-mono text-muted-foreground pt-1">Port 3000</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <span className="text-[11px] font-mono text-muted-foreground">02 · Service</span>
              <div className="text-sm font-semibold text-foreground">Go REST API</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compiled static binary with database connection pooling and auto-seed.
              </p>
              <div className="text-[11px] font-mono text-muted-foreground pt-1">Port 8080</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <span className="text-[11px] font-mono text-muted-foreground">03 · Storage</span>
              <div className="text-sm font-semibold text-foreground">PostgreSQL 16</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Relational schema with healthcheck verification and persistent volumes.
              </p>
              <div className="text-[11px] font-mono text-muted-foreground pt-1">Port 5432</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <span className="text-[11px] font-mono text-muted-foreground">04 · Gateway</span>
              <div className="text-sm font-semibold text-foreground">Caddy 2 Proxy</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unified reverse proxy routing `/api/*` to Go and page routes to Next.js.
              </p>
              <div className="text-[11px] font-mono text-muted-foreground pt-1">Port 80</div>
            </div>
          </div>
        </section>

        {/* Diagnostics & Ledger Section */}
        <section id="diagnostics" className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <SlChart className="size-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">System Diagnostics</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border whitespace-nowrap">
              revalidate = 60s
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-muted border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Render Timestamp</span>
              <span className="text-foreground font-semibold tabular-nums whitespace-nowrap">{buildTime}</span>
            </div>
            <div className="p-3 rounded-xl bg-muted border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Health Endpoint</span>
              <a href="/api/health" className="inline-flex items-center gap-1 text-foreground hover:underline">
                /api/health
                <SlArrowRight className="size-2.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-border mt-16 py-6 text-center text-xs text-muted-foreground">
        Nexus Systems · Next.js · Go · PostgreSQL · Caddy
      </footer>
    </div>
  );
}
