# Agent Instructions & Guidelines (AGENT.md)

This file contains mandatory instructions for AI coding agents working on this repository.

---

## 1. Development vs Production Workflow (ไม่ต้อง Build Docker ใหม่ตลอดเวลา)

เวลา Dev ไม่จำเป็นต้องรัน `docker compose up --build` ใหม่ทุกครั้ง เพราะจะทำให้เสียเวลา compile image! เรามี 2 โหมดให้เลือกใช้งาน:

### 🟢 1.1 Development Mode (Hot Reloading - ไม่ต้อง Build ใหม่)
ใช้ไฟล์ `docker-compose.dev.yml` ซึ่งทำ Volume Mount โค้ดจากเครื่อง Host เข้าสู่คอนเทนเนอร์:
- **Next.js Frontend**: รัน `npm run dev` เมื่อแก้ไขไฟล์ `.tsx` / `.css` หน้าเว็บจะรีเฟรชทันทีผ่าน Turbopack Fast Refresh (HMR)
- **Go Backend**: รันผ่าน `air` (Go live-reloader) เมื่อแก้ไขไฟล์ `.go` ระบบจะ recompile binary ใหม่ภายใน 1 วินาทีอัตโนมัติ

**คำสั่งรัน Dev Mode:**
```bash
docker compose -f docker-compose.dev.yml up -d
```
> **หมายเหตุ:** ในโหมดนี้คุณสามารถแก้โค้ดได้ต่อเนื่องโดยไม่ต้องสั่ง rebuild ใดๆ!

### 🔵 1.2 Production Mode (Standalone Build)
ใช้เมื่อต้องการทดสอบ Production Build จริง (Next.js Standalone + Go Compiled Binary):
```bash
docker compose up -d --build
```

---

## 2. Mandatory Git Commit Protocol (กฎการ Commit ตลอดเวลา)

Agent **ต้องทำ Git Commit อย่างสม่ำเสมอ** ห้ามดองโค้ดไว้โดยไม่ commit:

1. **Commit Timing**:
   - เมื่อทำแต่ละ Task / ฟีเจอร์ย่อยเสร็จ และผ่านการทดสอบแล้ว **ต้อง commit ทันที**
   - เมื่อแก้ไขบั๊ก หรือปรับแก้สไตล์ CSS แล้ว **ต้อง commit ทันที**
   - ก่อนจะเริ่มงานชิ้นใหม่ ต้องตรวจดูว่างานก่อนหน้าได้ commit ไปแล้ว
2. **Commit Message Format (Conventional Commits)**:
   - `feat: <description>` — เพิ่มฟีเจอร์ใหม่
   - `fix: <description>` — แก้ไขข้อผิดพลาดหรือบั๊ก
   - `style: <description>` — ปรับแต่ง CSS, Tokens, UI โดยไม่กระทบ Logic
   - `refactor: <description>` — ปรับโครงสร้างโค้ด
   - `chore: <description>` — อัปเดต config, docker, เอกสาร
3. **Commit Rule**:
   - ข้อความเป็นภาษาอังกฤษ สั้นกระชับ ตรงประเด็น
   - สั่งคำสั่ง: `git add . && git commit -m "feat/fix/style: ..."`
   - ห้าม force push และไม่ต้อง push ขึ้น remote เว้นแต่ผู้ใช้จะสั่ง

---

## 3. Frontend Design Directives (Strict Enforcement)

Every agent modifying or creating frontend files MUST follow `DESIGN.md`, `clean-ui-design`, and `shadcn-ui-builder`:

1. **Semantic Color Tokens Only**:
   - Use `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`.
   - Never inject arbitrary hex colors (e.g. `#090d16`, `#1e293b`) directly into components.
2. **Anti-Card-Nesting Architecture**:
   - Never place a `<Card>` inside another `<Card>`.
   - To group sub-items inside a container, use Level 2 Inset Boxes: `bg-muted rounded-xl p-3 border border-border`.
3. **Capsule / Pill Button Anatomy**:
   - Interactive buttons must use pill shapes (`rounded-full`).
   - Limit to exactly **ONE** primary action (`bg-primary text-primary-foreground`) per screen section.
4. **Strict Non-Breaking Units ("ไม่เอาหน่วยแตก")**:
   - Badges, currencies, and technical measurements (e.g. `16 GB`, `2 TB`, `$2,499 USD`, `120 Hz`, `60s`) must never wrap across lines.
   - Always enforce `whitespace-nowrap tabular-nums font-mono shrink-0` and non-breaking space `&nbsp;`.
5. **Anti-AI-Slop Rules**:
   - No purple/rainbow gradients on buttons or backgrounds.
   - No gradient text (`bg-clip-text`).
   - No neon glowing shadows (`shadow-cyan-500`, etc.).
   - No emoji icons. Use clean SVG icons or concise labels.
   - No empty marketing badges (e.g. "Web UI Ready", "AI Supercharged").
6. **Tailwind v4 Turbopack Compatibility**:
   - `next.config.ts` must maintain `@tailwindcss/turbopack` loader rules for `*.css` alongside `output: 'standalone'`.

---

## 4. Verification Checklist Before Every Commit

- [ ] โค้ดคอมไพล์ผ่าน ไม่เกิด runtime error
- [ ] UI เป็นไปตาม `DESIGN.md` และไม่มี AI slop
- [ ] รัน git status และตรวจไฟล์ก่อน commit
- [ ] รัน `git commit` ด้วย Conventional Commit message
