# แผนและคู่มือโครงสร้างระบบ: Technology Computer Platform

เอกสารนี้จัดทำขึ้นเพื่อให้ทีมพัฒนาและผู้ตรวจเข้าใจสถาปัตยกรรม เทคโนโลยีที่ใช้งาน งานที่เสร็จแล้ว และใช้เป็นเช็กลิสต์ในการพัฒนาต่อได้ทันที

---

## 1. เป้าหมายและโครงสร้างระบบ

### เป้าหมาย
พัฒนาแพลตฟอร์มและ Landing Page สำหรับ **Technology Computer** โดยถอดแบบสไตล์ Modern High-Performance Infrastructure ของ Cloudflare (Obsidian Dark Theme, Blueprint Guidelines, 3D WebGL Globe, Inward Vignette ASCII Hero) พร้อมระบบหลังบ้านและฐานข้อมูลที่รองรับงานประมวลผลประสิทธิภาพสูง

### แผนผังการทำงาน (System Architecture Flow)
```text
ผู้ใช้ (Browser)
   │
   ▼ :80 / :443
┌──────────────────────────────────────────────────────────┐
│ Caddy Reverse Proxy Gateway (Container: tech_caddy_proxy)│
└──────────────┬────────────────────────────┬──────────────┘
               │ /api/*, /health            │ /* (Default)
               ▼                            ▼
┌──────────────────────────────┐ ┌─────────────────────────┐
│ Go REST API Service (:8080)  │ │ Next.js 16 Frontend     │
│ (Container: tech_backend)    │ │ (:3000 Standalone / Dev)│
│ Go 1.23 + pq driver          │ │ App Router + Turbopack  │
└──────────────┬───────────────┘ └─────────────────────────┘
               │ :5432
               ▼
┌──────────────────────────────┐
│ PostgreSQL 16 (Port :5432)   │
│ (Container: tech_postgres)   │
└──────────────────────────────┘
```

---

## 2. เทคโนโลยีและเครื่องมือที่ใช้ (Tech Stack & Tools)

| หมวดหมู่ | เทคโนโลยี / ไลบรารี | วัตถุประสงค์และการนำไปใช้ |
|---|---|---|
| **Reverse Proxy** | Caddy v2 Alpine | ทำหน้าที่เป็น Single Entry Point พอร์ต `80`, จัดการ Reverse Proxy ไปยัง Frontend (`:3000`) และ Backend (`:8080`) อัตโนมัติ |
| **Frontend Framework** | Next.js 16.4.6 (React 19.3.0, TypeScript 5) | App Router รองรับ Incremental Static Regeneration (ISR `revalidate = 60`), Standalone output สำหรับ Docker |
| **CSS & Styling** | Tailwind CSS v4.3.3 | คอมไพล์ผ่าน `@tailwindcss/turbopack`, ใช้อะนาโตมีแคปซูล และ Obsidian Dark Tokens |
| **3D Visualization** | Cobe (`cobe` 2.0.1) | เรนเดอร์ลูกโลก 3 มิติ WebGL พร้อมจุดเชื่อมต่อข้อมูล Arcs ข้ามทวีป, CSS Anchor Positioning, หมุนสมูทความเร็ว `0.0012` |
| **Hero Animation** | React Bits (`GradientASCII`) | สร้างแคนวาส ASCII ศิลปะแบบ Cloudflare พร้อมชุดสีส้ม Sunrise (`#fd5714`, `#ffe8a6`, `#d8c58d`, `#ffb873`) |
| **Icon Standard** | Simple Line Icons (`react-icons/sl`) | **ใช้ชุดนี้ชุดเดียวทั้งโปรเจกต์** ห้ามผสม Lucide หรืออีโมจิ เพื่อความเรียบหรู คมชัด และสม่ำเสมอ |
| **Backend Engine** | Go 1.23 (Golang) | บริการ REST API พร้อมระบบ Auto-retry ตรวจการเชื่อมต่อฐานข้อมูล 15 ครั้ง (`lib/pq`) |
| **Database** | PostgreSQL 16 Alpine | จัดเก็บข้อมูล Catalog สินค้า, เวิร์กสเตชัน และ Log ระบบ พร้อม Healthcheck ตรวจจับสถานะ |
| **Dev Environment** | Docker Compose (`docker-compose.dev.yml`) | ติดตั้ง Hot-reload ผ่าน Host Volume Mount สำหรับ Next.js และ `air` สำหรับ Go โดยไม่ต้อง build image ใหม่ |

---

## 3. งานที่ทำเสร็จแล้ว (Completed Milestones)

- [x] **โครงสร้างพื้นฐานและ Docker Environment**:
  - สร้างไฟล์ `docker-compose.yml` (Production Standalone) และ `docker-compose.dev.yml` (Dev Hot-Reload)
  - ติดตั้ง Caddy Reverse Proxy จัดเส้นทาง `/api/*` และ `/health` เข้า Go Backend และเส้นทางหลักเข้า Next.js
  - เชื่อมต่อ Go Backend เข้ากับ PostgreSQL พร้อมฟังก์ชันจำลองข้อมูลเริ่มต้น (Seeding)
- [x] **การนำทางและ Header Navbar**:
  - ติดตั้งโลโก้แบรนด์ `public/logo.png` (ปรับขนาดเพิ่ม 10% เป็น 46px ไม่มีพื้นหลังสีขาวกวนตา)
  - เมนูนำทางแบบมินิมอล: Products, Solutions, Resources, Pricing
  - ตัวแสดงสถานะแบบเรียลไทม์ `System Live` พร้อมไอคอน `SlCheck` เชื่อมกับ `/api/health`
  - ปุ่ม Action: Dashboard, Contact sales, และ Search `SlMagnifier`
- [x] **เส้นกรอบสถาปัตยกรรม (Architectural Blueprint Lines)**:
  - วางเส้นประแนวนอน (`border-dashed border-white/10`) คั่นระหว่าง Navbar กับ Hero
  - วางเส้นประแนวนอนคั่นใต้ส่วน Hero
  - วางเส้นประแนวตั้งประกบขอบซ้ายและขวาของ Container กว้างสุด `max-w-7xl`
- [x] **Hero Banner (React Bits GradientASCII)**:
  - เอาขอบแข็งรอบนอกออก ใส่ Inward Edge Vignette Fade เพื่อให้กลมกลืนกับพื้นหลัง ไม่ลอย
  - ใส่แสงฟุ้งกระจายด้านล่าง (Ambient Sunrise Glow)
  - จัดระยะ Margin ให้ชิด Navbar ในระดับเดียวกับหน้า Landing Page ของ Cloudflare
  - จัดขนาด Typography พาดหัว 2 บรรทัดขนาดกระชับสมดุล
  - ปุ่ม CTA ทรงแคปซูลเด่นชัด (`Start building for free >`)
- [x] **Region: Earth 3D Interactive Globe Section**:
  - ดึงคอมโพเนนต์ Cobe WebGL Globe มาปรับโทนสีดำ Obsidian สำหรับ Dark Mode
  - ทำจุดมาร์กเกอร์สีส้มทรงกลม แสดงไอคอนผู้ใช้งาน `SlUser` และแหล่งข้อมูล `SlLayers`
  - เชื่อมสายส่งข้อมูล (Traffic Arcs) ข้ามทวีป พร้อมตัวเลข throughput สุ่มขยับแบบเรียลไทม์
  - เพิ่มกล่อง Technical Callout มุม Bracket สองฝั่งซ้าย-ขวา
  - ขยายลูกโลกให้ใหญ่ขึ้นตามตัวอย่าง และปรับระยะให้ขอบล่างของลูกโลกซ้อนเหลื่อมอยู่หลัง 3 เสาคุณค่า (Value Pillars: Run everywhere, Run anywhere, Run at massive scale)
  - ปรับลดความเร็วการหมุนลงให้ดูนิ่ง สบายตา (`speed={0.0012}`)
- [x] **ระบบ Pure Dark Mode ถาวร**:
  - ปรับค่า `:root` ใน `globals.css` เป็นโทนสีดำมืดสนิท Obsidian (`hsl(0, 0%, 3.5%)`) เป็นค่าตั้งต้น
  - ใส่ `style={{ colorScheme: "dark" }}` ในแท็ก `<html>` เพื่อล็อก native scrollbar และ UI ให้มืดสนิท
  - ถอดปุ่ม `<ThemeToggle />` และโค้ด Light Theme ออก เพื่อคุมโทนให้ตรงตามสเปก 100%
- [x] **Hardware Showcase Accordion Gallery (React Bits + GSAP)**:
  - ติดตั้งไลบรารีแอนิเมชัน `gsap` และสร้างคอมโพเนนต์ `AccordionGallery.tsx` พร้อม `AccordionGallery.css`
  - คุมโทนสี Dark Mode (`accentColor="#fd5714"`, `overlayColor="#09090b"`)
  - นำเข้าภาพ Unsplash จำลองฮาร์ดแวร์ระดับ Data Center / Workstation (Dual Xeon/EPYC, 8-Way Tensor Clusters, Sub-Zero Liquid Cooling, 4U Chassis, 400Gbps Fabric)
  - ใส่กล่องชี้วัดสเปกระดับวิศวกรรม 3 ช่องด้านล่าง พร้อมบังคับใช้กฎ Non-breaking units และไอคอน `react-icons/sl` (`SlSpeedometer`, `SlLayers`, `SlEnergy`)

---

## 4. แผนการพัฒนาขั้นตอนถัดไป (Development Roadmap & Checklist)

เรียงตามลำดับที่ควรเริ่มลงมือทำทีละส่วน:

### เฟส A: แคตตาล็อกเครื่องและเวิร์กสเตชัน (Workstation & Server Catalog)
- [ ] สร้างคอมโพเนนต์ `frontend/src/components/products-catalog-section.tsx`
- [ ] เชื่อมต่อดึงข้อมูลสินค้าจาก Go API `GET /api/products` ผ่าน Server Component (ISR)
- [ ] จัดเลย์เอาต์การ์ดแสดงสินค้าแบบ **Anti-Card-Nesting** (ใช้ Surface Luminosity / Inset Box ห้ามนำ `<Card>` ซ้อน `<Card>`)
- [ ] แสดงค่าสเปกฮาร์ดแวร์ (CPU, GPU, RAM, Storage, Throughput) โดยใช้กฎ **Non-breaking units ("ไม่เอาหน่วยแตก")** อย่างเคร่งครัด เช่น `64&nbsp;GB`, `2&nbsp;TB&nbsp;NVMe`, `4.8&nbsp;GHz`
- [ ] เพิ่มปุ่มสั่งจองหรือสอบถามสเปกเฉพาะทาง (Custom Config CTA)

### เฟส B: ตารางเปรียบเทียบสเปกระดับวิศวกรรม (Engineering Benchmark & Specs Table)
- [ ] สร้างคอมโพเนนต์ `frontend/src/components/specs-comparison-table.tsx`
- [ ] ออกแบบตารางสเปกแบบมินิมอล เส้นขอบบาง `border-border/60` พร้อมแท็กสถานะทรงแคปซูล
- [ ] ระบุตัวเลข Benchmark การประมวลผล LLM / 3D Rendering / Compilation Speed
- [ ] ใส่ตัวกรองหมวดหมู่ (Workstation, Rackmount Server, AI Inference Rig)

### เฟส C: กล่องข้อความสั่งซื้อและปรับแต่งระบบ (Interactive Quotation / Contact Sales Dialog)
- [ ] สร้างโมดอลหรือฟอร์มติดต่อทีมวิศวกร `frontend/src/components/contact-sales-modal.tsx`
- [ ] เขียน Go API Endpoint รองรับการรับข้อมูล Lead หรือคำขอใบเสนอราคา `POST /api/inquiries`
- [ ] เชื่อมต่อการบันทึกลงฐานข้อมูล PostgreSQL พร้อม Validations

### เฟส D: ส่วนท้ายหน้าเว็บและข้อมูลลิขสิทธิ์ (Cloudflare-Style Footer)
- [ ] สร้างคอมโพเนนต์ `frontend/src/components/footer.tsx`
- [ ] ใส่ลิงก์หมวดหมู่ ระบบเอกสาร API Docs, Compliance, Security, System Status
- [ ] แสดงสัญลักษณ์ Technology Computer Systems และข้อความลิขสิทธิ์

---

## 5. กฎเหล็กที่ต้องรักษาในการเขียนโค้ด (Strict Coding Standards)

1. **การใช้ไอคอน**:
   - **ต้องใช้ Simple Line Icons จาก `react-icons/sl` เท่านั้น**
   ```tsx
   import { SlArrowRight, SlCheck, SlLayers, SlUser } from "react-icons/sl";
   ```
   - *ห้ามใช้ Lucide, FontAwesome, Phosphor หรือ Emoji ในโค้ดโดยเด็ดขาด*
2. **การจัดวางหน่วยตัวเลข (Non-Breaking Units)**:
   - ตัวเลขทางเทคนิค หน่วยวัด สเปกเครื่อง และราคา ต้องไม่หลุดบรรทัด:
   ```tsx
   <span className="whitespace-nowrap tabular-nums font-mono">128&nbsp;GB ECC</span>
   ```
3. **การออกแบบและโทนสี**:
   - อิงสีจาก Tailwind Semantic Tokens (`bg-background`, `text-foreground`, `border-border`, `bg-primary`)
   - ห้ามแปะสี Hex code แปลกปลอมลงในคลาสตรงๆ
   - ปุ่มกดใช้ทรงแคปซูลมนกลม (`rounded-full`) และมีปุ่มเด่น (Primary) เพียง 1 ปุ่มต่อ Section
4. **โหมดการพัฒนาที่รวดเร็ว**:
   - ไม่ต้องเสียเวลาสั่ง `docker compose build` ทุกครั้งที่แก้โค้ดหน้าบ้าน ให้ใช้:
   ```powershell
   docker compose -f docker-compose.dev.yml up -d
   ```
5. **การทำ Git Commit**:
   - Commit ทุกครั้งที่จบแต่ละฟีเจอร์ย่อยด้วย Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`)

---

## 6. ความเสี่ยงและจุดที่ต้องระวัง

- **WebGL Canvas Hydration บน Next.js**: คอมโพเนนต์ที่ใช้ `<canvas>` หรือเข้าถึง `window` (เช่น `cobe`) ต้องโหลดผ่าน `dynamic(..., { ssr: false })` เสมอ เพื่อป้องกัน Hydration Mismatch
- **Turbopack & Tailwind v4 Rule**: ใน `next.config.ts` ต้องคงคอนฟิก `@tailwindcss/turbopack` คู่กับ `output: "standalone"` เสมอ เพื่อไม่ให้ Utility Class หายเวลา Build
- **Shell Compatibility บน Windows**: ใน PowerShell ห้ามเชื่อมคำสั่งด้วย `&&` ให้ใช้เครื่องหมายเซมิโคลอน `;` แทนเสมอ
