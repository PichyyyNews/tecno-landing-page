# แผนและคู่มือโครงสร้างระบบ: Technology Computer Platform

เอกสารนี้จัดทำขึ้นเพื่อให้ทีมพัฒนาและผู้ตรวจเข้าใจสถาปัตยกรรม เทคโนโลยีที่ใช้งาน ตรวจสอบงานที่เสร็จแล้ว และใช้เป็นเช็กลิสต์ในการพัฒนาต่อได้ทันที

---

## 1. เป้าหมายและโครงสร้างระบบ

### เป้าหมาย
พัฒนาแพลตฟอร์มและ Landing Page สำหรับ **Technology Computer** โดยถอดแบบสไตล์ Modern High-Performance Infrastructure ของ Cloudflare (Obsidian Dark Theme, Blueprint Guidelines, 3D WebGL Globe, Inward Vignette ASCII Hero, Interactive Bento Grid) พร้อมระบบหลังบ้าน Go REST API และฐานข้อมูล PostgreSQL ที่รองรับงานประมวลผลประสิทธิภาพสูง

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
| **Interactive Edge Glow** | React Bits (`BorderGlow`) | แสงเรืองรองวิ่งตามเคอร์เซอร์เมาส์ (Directional Mesh Gradient Glow) ใช้ใน 3 เสาคุณค่า และ 4 การ์ด Bento Grid |
| **Interactive Accordion** | React Bits + GSAP 3.14.2 | แกลเลอรีฮาร์ดแวร์เวิร์กสเตชันและเซิร์ฟเวอร์แบบคลี่ขยายแนวนอนเมื่อ Hover |
| **Infinite Partner Carousel** | React Bits (`LogoLoop`) | ลูปโลโก้พันธมิตรระดับองค์กรแบบไร้รอยต่อ พร้อมแรงเฉื่อยฟิสิกส์ (Physics Drag) และสเกลสีเมื่อชี้ |
| **Icon Standard** | Simple Line Icons (`react-icons/sl`) | **ใช้ชุดนี้ชุดเดียวทั้งโปรเจกต์** ห้ามผสม Lucide หรืออีโมจิ เพื่อความเรียบหรู คมชัด และสม่ำเสมอ |
| **Backend Engine** | Go 1.23 (Golang) | บริการ REST API พร้อมระบบ Auto-retry ตรวจการเชื่อมต่อฐานข้อมูล 15 ครั้ง (`lib/pq`) |
| **Database** | PostgreSQL 16 Alpine | จัดเก็บข้อมูล Catalog สินค้า, เวิร์กสเตชัน และ Log ระบบ พร้อม Healthcheck ตรวจจับสถานะ |
| **Dev Environment** | Docker Compose (`docker-compose.dev.yml`) | ติดตั้ง Hot-reload ผ่าน Host Volume Mount สำหรับ Next.js และ `air` สำหรับ Go โดยไม่ต้อง build image ใหม่ |

---

## 3. โครงสร้างไฟล์และคอมโพเนนต์หลัก (Component Structure)

```text
frontend/src/
├── app/
│   ├── layout.tsx                     # Global layout, Pure Dark mode lock, Metadata
│   ├── page.tsx                       # หน้าหลัก เรียงตามลำดับ Blueprint Sections (ISR 60s)
│   └── globals.css                    # Tailwind v4, Obsidian tokens, Custom Orange Glass Scrollbar
├── components/
│   ├── navbar.tsx                     # Sticky frosted glass navbar พร้อม scroll detection
│   ├── hero-ascii-banner.tsx          # แบนเนอร์ ASCII Inward Vignette Cloudflare-style
│   ├── region-earth-section.tsx       # ลูกโลก 3D Cobe WebGL + 3 เสาคุณค่า (BorderGlow)
│   ├── workstations-gallery-section.tsx # ส่วนแกลเลอรีภาพฮาร์ดแวร์ Data Center
│   ├── tech-partners-section.tsx      # ส่วน Silicon & Framework Ecosystem Logo Loop
│   ├── unified-platform-bento-section.tsx # Bento Grid 4 การ์ด (BorderGlow ทุกการ์ด)
│   └── ui/
│       ├── BorderGlow.tsx             # คอมโพเนนต์คำนวณ Edge Proximity & Cursor Angle
│       ├── BorderGlow.css             # Conic & Radial Gradient Masks สำหรับขอบเรืองแสง
│       ├── AccordionGallery.tsx       # GSAP horizontal accordion gallery
│       ├── AccordionGallery.css       # Accordion transitions & media query rules
│       ├── LogoLoop.tsx               # Infinite looping carousel with physics drag
│       └── LogoLoop.css               # Logo loop styling, grayscale to color transition
```

---

## 4. งานที่ทำเสร็จแล้ว (Completed Milestones Checklist)

- [x] **โครงสร้างพื้นฐานและ Docker Environment**:
  - สร้างไฟล์ `docker-compose.yml` (Production Standalone) และ `docker-compose.dev.yml` (Dev Hot-Reload)
  - ติดตั้ง Caddy Reverse Proxy จัดเส้นทาง `/api/*` และ `/health` เข้า Go Backend และเส้นทางหลักเข้า Next.js
  - เชื่อมต่อ Go Backend เข้ากับ PostgreSQL พร้อมฟังก์ชันจำลองข้อมูลเริ่มต้น (Seeding)
- [x] **การนำทางและ Header Navbar (Sticky Frosted Glass)**:
  - ติดตั้งโลโก้แบรนด์ `public/logo.png` (ปรับขนาดเพิ่ม 10% เป็น 46px ไม่มีพื้นหลังสีขาวกวนตา)
  - รองรับ Scroll Detection: เมื่อเลื่อนหน้าจอลง (`scrollY > 15px`) แถบ Navbar จะตามลงมาด้วยสไตล์ Frosted Glass มัวลึก (`backdrop-blur-xl bg-background/65 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]`) พร้อมปรับขนาดความสูงให้นุ่มนวล
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
  - ขยายลูกโลกให้ใหญ่ขึ้นตามตัวอย่าง และปรับระยะให้ขอบล่างของลูกโลกซ้อนเหลื่อมอยู่หลัง 3 เสาคุณค่า
  - ปรับลดความเร็วการหมุนลงให้ดูนิ่ง สบายตา (`speed={0.0012}`)
  - **อัปเกรด 3 เสาคุณค่าด้วย `<BorderGlow />` จาก React Bits**: เปลี่ยนการ์ด "Run everywhere", "Run anywhere", "Run at massive scale" ให้มี Mesh Gradient Border พร้อม Directional Cone Glow เคลื่อนตามตำแหน่งเคอร์เซอร์เมาส์ในโทนสีส้ม Sunrise (`#fd5714`, `#ff8442`, `#ffe29a`) บนพื้นหลัง Obsidian (`#09090b`)
- [x] **ระบบ Pure Dark Mode ถาวร**:
  - ปรับค่า `:root` ใน `globals.css` เป็นโทนสีดำมืดสนิท Obsidian (`hsl(0, 0%, 3.5%)`) เป็นค่าตั้งต้น
  - ใส่ `style={{ colorScheme: "dark" }}` ในแท็ก `<html>` เพื่อล็อก native scrollbar และ UI ให้มืดสนิท
  - ถอดปุ่ม `<ThemeToggle />` และโค้ด Light Theme ออก เพื่อคุมโทนให้ตรงตามสเปก 100%
- [x] **Hardware Showcase Accordion Gallery (React Bits + GSAP)**:
  - ติดตั้งไลบรารีแอนิเมชัน `gsap` และสร้างคอมโพเนนต์ `AccordionGallery.tsx` พร้อม `AccordionGallery.css`
  - คุมโทนสี Dark Mode (`accentColor="#fd5714"`, `overlayColor="#09090b"`)
  - นำเข้าภาพ Unsplash จำลองฮาร์ดแวร์ระดับ Data Center / Workstation (Dual Xeon/EPYC, 8-Way Tensor Clusters, Sub-Zero Liquid Cooling, 4U Chassis, 400Gbps Fabric)
- [x] **Silicon & Framework Ecosystem Logo Loop (React Bits)**:
  - ติดตั้งคอมโพเนนต์ `LogoLoop.tsx` และ `LogoLoop.css` รองรับ Physics Drag, Edge Fade, Hover Scale, Muted Greyscale
  - รวบรวมแบรนด์ฮาร์ดแวร์และเฟรมเวิร์กระดับองค์กร: NVIDIA, AMD, Intel, Linux, Ubuntu, Red Hat, Docker, Kubernetes, PyTorch, TensorFlow, Go, PostgreSQL
  - ผูกสี Brand Accent ประจำแต่ละค่ายเมื่อนำเมาส์ไปชี้ (Hover Color) พร้อมเอฟเฟกต์ Pause on hover ที่ลื่นไหล
- [x] **Custom Thin Orange Glass Scroller**:
  - ออกแบบ Scrollbar ทั้งหน้าเว็บให้บางกระชับ (`width: 6px`) สไตล์กระจก Frosted Glass ขอบมน Pill shape สีส้ม Sunrise (`rgba(253, 87, 20, 0.4)` พร้อม hover glow `#fd5714`) บนพื้นหลังโปร่งแสง สะอาดตา
- [x] **Typography แบบ Clean, Sharp & Solid (ไม่ใช้อนิเมชันข้อความ)**:
  - ยกเลิกและถอดอนิเมชันข้อความ (`ScrollFloat`) ออกทั้งหมดตามทิศทางงานดีไซน์ เพื่อรักษาความเรียบหรู คมชัด สไตล์วิศวกรรมระบบระดับพรีเมียม (Enterprise High-Performance Architecture) แบบ Cloudflare
  - ใช้ Semantic Elements (`<h1>`, `<h2>`, `<p>`) คมชัด นิ่ง น่านับถือ อ่านง่ายทันทีทุกหน้าจอ ไม่ต้องรอเลื่อนหรือรออนิเมชันลอยตัว
- [x] **Unified Platform Bento Grid Section (Cloudflare Architecture Style)**:
  - สร้างคอมโพเนนต์ `frontend/src/components/unified-platform-bento-section.tsx` เชื่อมต่อต่อจากเซกชัน Logo Loop
  - **อัปเกรดขอบเรืองแสงด้วย `<BorderGlow />` จาก React Bits ครบทั้ง 4 การ์ด**: ผสาน Directional Cursor Edge Glow ตอบสนองต่อการเลื่อนเมาส์รอบขอบการ์ดในโทนสีส้ม Sunrise (`#fd5714`, `#ff8442`, `#ffe29a`) และขอบโค้งมน `borderRadius={20}` ให้เข้าคู่กับ 3 เสาคุณค่าใน Region: Earth อย่างสมบูรณ์แบบ
  - ปรับแก้ `.border-glow-inner` ให้เป็น `overflow: visible; height: 100%; width: 100%;` เพื่อให้คอนเทนต์ด้านในการ์ดขยายเต็มความสูงโดยไม่มีแถบ scrollbar แฝง
  - วางผัง 4 การ์ดสมดุลแบบ 8+4 (แถวบน) และ 4+8 (แถวล่าง):
    - **การ์ด 1 (บนซ้าย - 8 คอลัมน์)**: *Fits into your existing workflows* พร้อมไอคอนคลาวด์สีส้ม และตารางประวัติเวอร์ชันสถานะการ Deploy (`v57013 Building` หมุนสด, `v57012 Deployed`, `v57011 Deployed`)
    - **การ์ด 2 (บนขวา - 4 คอลัมน์)**: *One network for users, apps, and data* พื้นหลังสีส้มสด Cloudflare Orange (`#fd5714`) โดดเด่น พร้อมไอคอนเน็ตเวิร์กสีขาว และเอฟเฟกต์แสงขอบขาวทองอร่าม (`#ffffff`, `#ffe29a`, `#ffedd5`)
    - **การ์ด 3 (ล่างซ้าย - 4 คอลัมน์)**: *Secure by default* พร้อมไอคอนโล่ป้องกันระบบความปลอดภัยระดับ Zero Trust
    - **การ์ด 4 (ล่างขวา - 8 คอลัมน์)**: *Fast path to AI adoption* พร้อมวิดเจ็ต Terminal จำลองการรัน Background AI Agents แบบ Interactive (`deploy-agent`, `lint-agent`, `test-agent`) และช่องพิมพ์คำสั่งพร้อมปุ่ม `Enter ↵` สีส้ม
- [x] **Location Section: Thailand Pixel Map เน้นเจาะจง Lopburi Core Hub (Clean UI Design Refactor)**:
  - สร้างคอมโพเนนต์ `frontend/src/components/location-lopburi-section.tsx` วางต่อจากส่วน Bento Grid
  - ปรับปรุงตามมาตรฐาน `/clean-ui-design` และฟีดแบ็กการใช้งานอย่างสมบูรณ์:
    - **ขอบมนและเงาเฟดละมุนลึก (Deep Cinematic Vignette Fade)**: ติดตั้ง radial gradient mask และ multi-linear gradient overlays (บน ล่าง ซ้าย ขวา) ทำให้เม็ดพิกเซลค่อยๆ ละลายกลืนลงสู่พื้นหลังสีดำ Obsidian (`#09090b`) อย่างนุ่มนวลเป็นธรรมชาติ ไม่มีรอยตัดขอบแข็ง
    - **รองรับการใช้เมาส์ลากเลื่อนแผนที่ได้อย่างอิสระ (Interactive Mouse Drag & Pan)**: เปิดใช้งาน `panX: "translateX"` และ `panY: "translateY"` พร้อม Drag Physics เพื่อให้ผู้ใช้สามารถคลิกเมาส์ลากเลื่อนและหมุนลูกกลิ้งซูมสำรวจแผนที่ประเทศไทยในทุกมุมได้อย่างลื่นไหล
    - **ซูมเจาะจงศูนย์กลางลพบุรี (Focused 2.35x Zoom on Lopburi TH-16)**: ปรับตำแหน่งศูนย์กลางที่ละติจูด `14.85` ลองจิจูด `100.65` ซูมลึกระดับ `2.35x` พร้อมวงคลื่นเรดาร์กระพริบสีส้ม Sunrise (`#fd5714`) รอบตัวจังหวัดลพบุรี
    - **กระชับระยะห่างอย่างลงตัว (Ultra-Compact Padding & Margins)**: ปรับลดระยะ Padding และ Margin ของเซกชันลง (`py-1 sm:py-2 -mt-1 sm:-mt-2` และช่องว่าง `gap-6 lg:gap-8`) ไม่ให้เหลือพื้นที่ว่างเปล่าด้านบนและล่างมากเกินไป เชื่อมต่อจาก Bento Grid ได้อย่างกระชับ
    - **จัดระเบียบฝั่งซ้ายให้สะอาด คม สไตล์วิศวกรรม (De-cluttered Left Side)**:
      - ป้ายกำกับเรียบหรู `REGIONAL NODE • TH-16` (ไม่ใช้ไฟกระพริบนีออนรบกวนสายตา)
      - พาดหัวสีขาวคมชัด `Primary Infrastructure Hub: Lopburi` (ไม่ใช้ Gradient text)
      - ตารางสเปกมินิมอล `divide-y divide-white/10` 4 รายการ (BKK Transit Latency `< 1.2 ms`, Backbone Capacity `400 Gbps`, Power Architecture `2N+1 Modular Grid`, Coordinates `14.7995° N, 100.6534° E`)
      - ลิงก์คำสั่งเรียบหรู `View technical specifications >` (ไม่มีปุ่มซ้ำซ้อน)

---

## 5. จุดที่ต้องให้ผู้เชี่ยวชาญเช็กเป็นพิเศษ (Special Expert Checkpoints)

1. **WebGL Canvas Hydration & Memory Leak (เซกชัน Region: Earth)**:
   - ตรวจสอบฟังก์ชันทำลายออบเจกต์ `globe.destroy()` เมื่อถอดคอมโพเนนต์ เพื่อไม่ให้หน่วยความจำ GPU ค้าง
   - ยืนยันว่าการใช้ `dynamic(() => import(...), { ssr: false })` ยังทำงานถูกต้องเมื่อมีการ Revalidate
2. **ประสิทธิภาพของ Pointer Tracking ใน `<BorderGlow />`**:
   - คอมโพเนนต์ใช้ `requestAnimationFrame` และคำนวณพิกัด Trigonometric (`Math.atan2`) เพื่อปรับ CSS Custom Variables
   - ตรวจสอบว่าในอุปกรณ์หน้าจอสัมผัส (Mobile / Tablet) การเรนเดอร์ไม่กระตุกหรือทำงานหนักเกินความจำเป็น
3. **การส่งผ่าน Header ของ Caddy Reverse Proxy**:
   - ตรวจสอบค่า `X-Forwarded-For`, `X-Forwarded-Proto` และการรองรับ WebSocket (`Connection: Upgrade`) หากมีการเปิดใช้งานระบบ Real-time Terminal

---

## 6. ความเสี่ยงและจุดที่ต้องระวัง

- **Turbopack & Tailwind v4 Configuration**: ในไฟล์ `next.config.ts` ต้องคงคอนฟิก `@tailwindcss/turbopack` คู่กับ `output: "standalone"` เสมอ เพื่อไม่ให้ Utility Class หายเวลา Build ลง Docker Image
- **PowerShell Command Syntax บน Windows**: ในคำสั่ง PowerShell ห้ามเชื่อมคำสั่งด้วย `&&` ให้ใช้เครื่องหมายเซมิโคลอน `;` แทนเสมอ เพื่อป้องกันไวยากรณ์พัง
- **Container Name Conflict ใน Docker Compose**: หากมีการ Recreate คอนเทนเนอร์แล้วเกิดชื่อซ้ำ ให้ใช้ `docker rm -f <container_name>` เคลียร์คอนเทนเนอร์เดิมออกก่อน

---

## 7. กฎเหล็กที่ต้องรักษาในการเขียนโค้ด (Strict Coding Standards)

1. **การใช้ไอคอน**:
   - **ต้องใช้ Simple Line Icons จาก `react-icons/sl` เท่านั้น**
   ```tsx
   import { SlArrowRight, SlCheck, SlLayers, SlUser, SlCloudUpload, SlShield, SlGlobe } from "react-icons/sl";
   ```
   - *ห้ามใช้ Lucide, FontAwesome, Phosphor หรือ Emoji ในโค้ดโดยเด็ดขาด*
2. **การจัดวางหน่วยตัวเลข (Non-Breaking Units)**:
   - ตัวเลขทางเทคนิค หน่วยวัด สเปกเครื่อง และราคา ต้องไม่หลุดบรรทัด:
   ```tsx
   <span className="whitespace-nowrap tabular-nums font-mono">128&nbsp;GB ECC</span>
   ```
3. **การออกแบบและโทนสี**:
   - อิงสีจาก Tailwind Semantic Tokens (`bg-background`, `text-foreground`, `border-border`, `bg-primary`)
   - ปุ่มกดใช้ทรงแคปซูลมนกลม (`rounded-full`) และมีปุ่มเด่น (Primary) เพียง 1 ปุ่มต่อ Section
4. **โหมดการพัฒนาที่รวดเร็ว**:
   - สำหรับการแก้ไขโค้ด Frontend ทั่วไป สามารถใช้ Dev mode แบบไม่ต้อง build image ใหม่ได้ด้วย:
   ```powershell
   docker compose -f docker-compose.dev.yml up -d
   ```
5. **การทำ Git Commit**:
   - Commit ทุกครั้งที่จบแต่ละฟีเจอร์ย่อยด้วย Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`)

---

## 8. แผนการพัฒนาขั้นตอนถัดไป (Development Roadmap & Checklist)

เรียงตามลำดับที่ควรเริ่มลงมือทำทีละส่วน:

### เฟส A: แคตตาล็อกเครื่องและเวิร์กสเตชัน (Workstation & Server Catalog)
- [ ] สร้างคอมโพเนนต์ `frontend/src/components/products-catalog-section.tsx`
- [ ] เชื่อมต่อดึงข้อมูลสินค้าจาก Go API `GET /api/products` ผ่าน Server Component (ISR)
- [ ] จัดเลย์เอาต์การ์ดแสดงสินค้าแบบ **Anti-Card-Nesting** (ใช้ Surface Luminosity / Inset Box ห้ามนำ `<Card>` ซ้อน `<Card>`)
- [ ] แสดงค่าสเปกฮาร์ดแวร์ (CPU, GPU, RAM, Storage, Throughput) โดยใช้กฎ **Non-breaking units ("ไม่เอาหน่วยแตก")** เช่น `64&nbsp;GB`, `2&nbsp;TB&nbsp;NVMe`, `4.8&nbsp;GHz`
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
