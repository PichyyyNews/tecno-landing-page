# Design System Specification (DESIGN.md)

This document establishes the official Design System guidelines, token definitions, and engineering standards for the project, strictly adhering to **clean-ui-design** and **shadcn-ui-builder** principles.

---

## 1. Core Principles

1. **System First**: Tokens are defined once in `globals.css` and reused. Never hardcode arbitrary hex colors, inline px values, or ad-hoc border radii.
2. **Anti-Card-Nesting**: Never nest a `<Card>` inside another `<Card>`. Use surface luminosity shifts (Inset Boxes) instead.
3. **Capsule / Pill Anatomy**: Buttons and interactive toggles use pill shapes (`rounded-full`). Exactly **ONE** primary action per view.
4. **Strict Non-Breaking Units ("ไม่เอาหน่วยแตก")**: Physical metrics, currencies, and engineering values (e.g. `16 GB`, `2 TB`, `$2,499 USD`, `120 Hz`) must never break across lines (`whitespace-nowrap`, `tabular-nums`, `font-mono`).
5. **Strict Icon Standard (`react-icons/sl` Only)**:
   - ใช้เฉพาะชุดไอคอนจาก **Simple Line Icons (`react-icons/sl`)** เท่านั้น:
     ```tsx
     import { IconName } from "react-icons/sl";
     ```
   - ห้ามใช้ icon library อื่น (เช่น Lucide, FontAwesome, Material, Phosphor) และห้ามใช้อีโมจิตกแต่งเป็นอันขาด
6. **Anti-AI-Slop**: Zero rainbow/purple gradients, zero text gradients, zero neon glows, zero glassmorphism, zero emoji icons, zero decorative status badges.
7. **Concise Copywriting**: Short, punchy labels without redundant explanations or parenthetical language translations.

---

## 2. Design Tokens (Light & Dark Theme)

All colors are defined as HSL channel tokens inside `@layer base` in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 14.9%;
  --card: 0 0% 97.3%;
  --card-foreground: 0 0% 14.9%;
  --popover: 0 0% 97.3%;
  --popover-foreground: 0 0% 14.9%;
  --primary: 16.9 100% 56.1%;
  --primary-foreground: 0 0% 3.9%;
  --secondary: 18 100% 94.1%;
  --secondary-foreground: 0 0% 3.9%;
  --muted: 0 0% 95.3%;
  --muted-foreground: 0 0% 45.9%;
  --accent: 16.9 100% 61%;
  --accent-foreground: 0 0% 3.9%;
  --destructive: 0 72.2% 50.6%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 88.6%;
  --input: 0 0% 88.6%;
  --ring: 16.9 100% 61%;
  --sidebar: 0 0% 96.1%;
  --sidebar-foreground: 0 0% 14.9%;
  --sidebar-primary: 16.9 100% 56.1%;
  --sidebar-primary-foreground: 0 0% 3.9%;
  --sidebar-accent: 16.9 100% 61%;
  --sidebar-accent-foreground: 0 0% 3.9%;
  --sidebar-border: 0 0% 88.6%;
  --sidebar-ring: 16.9 100% 61%;
  --chart-1: 16.9 100% 61%;
  --chart-2: 16.9 100% 56.1%;
  --chart-3: 18 100% 94.1%;
  --chart-4: 0 0% 94.1%;
  --chart-5: 15 63.4% 32.2%;
  --radius: 0.5rem;
}

.dark {
  --background: 60 4.5% 8.6%;
  --foreground: 60 4.8% 95.9%;
  --card: 60 2.9% 13.3%;
  --card-foreground: 60 4.8% 95.9%;
  --popover: 60 2.9% 13.3%;
  --popover-foreground: 60 4.8% 95.9%;
  --primary: 15.1 100% 72%;
  --primary-foreground: 0 0% 3.9%;
  --secondary: 20 26.8% 22%;
  --secondary-foreground: 0 0% 100%;
  --muted: 60 2.5% 15.7%;
  --muted-foreground: 60 0.5% 57.5%;
  --accent: 16.4 100% 72%;
  --accent-foreground: 0 0% 3.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 3.9%;
  --border: 60 1.7% 23.1%;
  --input: 60 1.7% 23.1%;
  --ring: 16.4 100% 72%;
  --sidebar: 60 3.2% 12.2%;
  --sidebar-foreground: 60 4.8% 95.9%;
  --sidebar-primary: 15.1 100% 72%;
  --sidebar-primary-foreground: 0 0% 3.9%;
  --sidebar-accent: 16.4 100% 72%;
  --sidebar-accent-foreground: 0 0% 3.9%;
  --sidebar-border: 60 1.7% 23.1%;
  --sidebar-ring: 16.4 100% 72%;
  --chart-1: 16.4 100% 72%;
  --chart-2: 15.1 100% 72%;
  --chart-3: 20 26.8% 22%;
  --chart-4: 16.9 100% 56.1%;
  --chart-5: 0 0% 94.1%;
}
```

---

## 3. Surface Depth Hierarchy

| Level | Role | Classes / Tokens | Notes |
|---|---|---|---|
| **Level 0** | Canvas Base | `bg-background` | Viewport backdrop |
| **Level 1** | Card / Shell | `bg-card border border-border rounded-2xl` | Main content container |
| **Level 2** | Inset Box / Ledger | `bg-muted rounded-xl p-3` | Sub-grouping without card nesting |
| **Level 3** | Hover / Active | `hover:bg-muted` or `bg-secondary` | Interactive response |

---

## 4. Button & Badge Standards

### Buttons
- **Primary**: `rounded-full bg-primary text-primary-foreground hover:opacity-90` (Limit: 1 per view)
- **Secondary**: `rounded-full border border-border bg-card text-foreground hover:bg-muted`
- **Ghost/Outline**: `rounded-full text-muted-foreground hover:text-foreground hover:bg-muted`

### Badges & Metrics ("ไม่เอาหน่วยแตก")
- Use `whitespace-nowrap tabular-nums font-mono shrink-0`
- Values and units are bonded: e.g. `64&nbsp;GB RAM`, `$2,499&nbsp;USD`
- Height is uniform (`h-5` or `px-2.5 py-0.5 rounded-full`)

---

## 5. Typography Scale

- `h1`: 32–36px, `font-semibold tracking-tight text-foreground`
- `h2`: 18–20px, `font-semibold text-foreground`
- `h3`: 14–16px, `font-semibold text-foreground`
- `body`: 13–14px, `text-muted-foreground leading-relaxed`
- `mono / metrics`: 11–13px, `font-mono tabular-nums`
