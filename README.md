# NandeeshOS — Arch Linux & Cyberpunk Creative Portfolio

> **"A Linux-powered creative developer's workspace — where code becomes art and ideas become real products."**

A complete, high-performance personal portfolio website for **Nandeesh Narayan Kurubar**, Full-Stack Developer & AI Engineer. Designed as an immersive digital workstation combining **Arch Linux / Hyprland tiling window aesthetics**, **cyberpunk terminal styling**, and a **generative digital art studio**.

---

## ⚡ Core Features

- **Initial Linux Boot Sequence**: Realistic 1–2 second kernel log (`[ OK ] Starting AI modules...`, scanlines, blinking prompt, skippable with `ESC`).
- **Hyprland Waybar**: Persistent top panel with workspace pills (`1:term`, `2:about`, `3:skills`, `4:proj`, `5:art`, `6:mail`), real-time clock, live CPU/RAM monitors, theme switcher, and instant resume download.
- **Interactive Terminal**:
  - Prompt: `nand@portfolio:~$`
  - Commands: `help`, `whoami`, `neofetch`, `ls`, `ls projects/`, `cat about.txt`, `cat skills.txt`, `pwd`, `cd [section]`, `./art.sh`, `sudo hire-me`, `date`, `history`, `clear`.
  - Supports command history (`↑` / `↓`), tab autocomplete, and keyboard auto-focus.
- **Tiling Workstation Matrix (Hero)**:
  - Tabbed & tiled windows: Terminal shell, Code Editor (`StockBridge_sync.ts` & `Aria_vector_memory.py`), System Telemetry (`sysmon`), and Live Generative Canvas.
- **Artistic About Split-Screen**:
  - Original generative neural flow canvas visual.
  - Authentic developer biography & `/etc/nandeesh.conf` Linux system info card.
- **Technical Skills Matrix**:
  - 5 categories: Languages, Frameworks, Databases, AI & LLMs, Tools.
  - Switcher between Visual Grid and raw `/etc/developer/skills.conf` terminal view.
- **Featured Software Projects**:
  1. **StockBridge** (Full-Stack POS & Inventory System)
  2. **Aria** (Local-First Desktop AI Companion & Automation Agent)
  3. **OCR Payment Extraction Pipeline** (Python Automation & Data Processing)
  4. **UPS Service Manager** (Flutter Mobile Application)
  - Interactive "Inspect Architecture Window" with system specifications.
- **Interactive Generative Art Studio**:
  - HTML5 Canvas flow-field mathematics with pointer interaction.
  - Controls: 4 color palettes (Cyberpunk, Matrix, Aurora, Solar), density slider, speed slider, pause/resume, and PNG snapshot export.
- **System Audit Dossier**:
  - Education, verified certifications (Infosys Springboard & Prompt Engineering), hackathon honors (1st place 2024), and spoken languages.
- **Terminal Transmission Form**:
  - Direct email, location, GitHub, LinkedIn, validated contact form, and ATS resume download.

---

## 🛠️ Technology Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties (Theme Engine)
- **Icons**: Lucide React
- **Graphics**: Native HTML5 Canvas 2D (zero heavy WebGL overhead, ultra-fast 60 FPS)
- **Palette**: Obsidian (`#080B10`), Terminal Green (`#39FF88`), Neon Cyan (`#00F5FF`), Electric Purple (`#A970FF`), Hot Pink (`#FF4FD8`).

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build & typecheck
npm run build

# 4. Preview production build
npm run preview
```
