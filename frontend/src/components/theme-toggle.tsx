"use client";

import React, { useEffect, useState } from "react";
import { SlBulb } from "react-icons/sl";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="h-8 w-20 rounded-full bg-muted border border-border animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <SlBulb className={`size-3.5 ${theme === "dark" ? "text-primary" : "text-foreground"}`} />
      <span className="text-[11px] font-mono capitalize">{theme}</span>
    </button>
  );
}
