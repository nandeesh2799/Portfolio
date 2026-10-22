# Nandeesh Narayan Kurubar — Production Developer, AI & Creative Portfolio

> **"Building intelligent systems. Creating experiences."**  
> A production-ready, highly interactive personal portfolio website for **Nandeesh Narayan Kurubar**, a final-year BCA graduate (Christ Academy, Bengaluru), full-stack engineer, AI automation builder, and multidisciplinary artist.

---

## 🌟 Executive Highlights

- **Cinematic 3D Digital Studio:** Interactive Three.js WebGL centerpiece with pointer parallax, smooth damping, responsive aspect ratio, and automatic render-loop pause via `IntersectionObserver` when off-screen.
- **Audience Perspective Filters:** Tailored lenses for **Full-Stack Engineering** (`?view=fullstack`), **AI & Automation** (`?view=ai`), and **Creative & Art** (`?view=creative`), syncing seamlessly to URL query parameters.
- **Interactive Project Laboratory:** Four live, in-browser simulations reflecting real repository logic:
  1. **StockBridge POS & Groq AI Assistant:** Real retail checkout with dynamic UPI QR code generator and LLaMA 3.3 70B store intelligence.
  2. **Aria Desktop AI Companion:** Multi-model routing (Claude/Gemini/Groq/Ollama), expressive emotion switcher, and SQLite vector memory cosine distance retrieval.
  3. **OCR Payment Extraction Pipeline:** UPI screenshot rasterizer, bounding box scanner, extracted telemetry (UTR, amount, payee), and audit CSV export.
  4. **Chargeback Dispute Copilot:** Merchant evidence vault triage, explainable Scikit-learn win-probability model (+28 pts POD, +24 pts OTP), and automated Razorpay rebuttal generator.
- **Authentic Fine Art Studio:** High-resolution exhibition lightbox displaying 8 original physical artworks across 4 mediums (oil/watercolour painting, graphite sketches, lime plaster wall murals, and fabric pigment) + studio portrait.
- **Strictly Grounded Facts:** Zero fabricated experience, fake clients, or exaggerated claims. Directly tied to verified GitHub repositories at [`github.com/nandeesh2799`](https://github.com/nandeesh2799).
- **Direct Resume Downloads:** Dual verified 2026 resumes included in `/public/resumes/` (AI & Software Engineering ATS PDF and Full-Stack & Mobile PDF).
- **Intelligent AI Portfolio Copilot:** Non-intrusive floating assistant grounded in verified facts, with optional Google Gemini Flash API integration.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18 / 19, TypeScript 5.4, Vite 5.2 |
| **Styling & Tokens** | Tailwind CSS 3.4, Custom Obsidian/Cyan theme, Glassmorphism |
| **3D Rendering** | Three.js WebGL (ACES Filmic Tone Mapping, procedural geometry, lighting) |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **Data Architecture** | Single source-of-truth TypeScript models (`projectsData.ts`, `artworksData.ts`, `skillsData.ts`, `careerData.ts`) |
| **Performance** | Manual chunk splitting (`vendor-react`, `vendor-three`, `vendor-icons`), lazy loading, reduced-motion compliance |

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Node.js `v18+` (Tested on Node `v22.23.3`)
- npm `v9+` (Tested on npm `v10.9.9`)

### 1. Installation
```bash
cd /home/nanu/portfolio
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build & Type Check
```bash
npm run build
```
This runs `tsc` and outputs an optimized bundle to `dist/`:
- `vendor-three`: ~467 kB (~117 kB gzip)
- `vendor-react`: ~134 kB (~43 kB gzip)
- `index.js`: ~170 kB (~46 kB gzip)
- `index.css`: ~51 kB (~8.6 kB gzip)

### 4. Local Production Preview
```bash
npm run preview
```
Serves the production build on `http://localhost:4173`.

---

## 📁 Repository & File Structure

```text
/home/nanu/portfolio/
├── index.html                 # HTML shell, SEO OpenGraph, Geist Mono & Plus Jakarta fonts
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript compiler configuration (bundler resolution)
├── vite.config.ts             # Vite build settings & manual Rollup chunk configuration
├── tailwind.config.js         # Custom palette (dark-950 obsidian, cyan-glow, emerald, amber)
├── postcss.config.js          # PostCSS Tailwind and Autoprefixer
├── .env.example               # Optional environment variables template
├── public/
│   ├── robots.txt             # Search engine crawling directives
│   ├── sitemap.xml            # XML sitemap with audience view alternates
│   ├── resumes/
│   │   ├── Nandeesh_NK_Resume_AI.pdf     # Verified 2026 AI / Software Engineering PDF
│   │   └── Nandeesh_NK_Resume.pdf        # Verified 2026 Full-Stack & Mobile PDF
│   └── images/
│       ├── portrait.jpg                  # Authentic studio portrait of Nandeesh
│       ├── aria/                         # Aria desktop companion avatar assets
│       └── artworks/                     # 8 authentic physical artwork photographs
└── src/
    ├── main.tsx               # React application entry point
    ├── App.tsx                # Central coordinator and view router
    ├── index.css              # Global directives, scrollbar rules, glassmorphism
    ├── types/                 # TypeScript interfaces for Projects, Artworks, Skills, Career
    ├── data/
    │   ├── projectsData.ts    # Single source-of-truth for all 12 verified software projects
    │   ├── artworksData.ts    # Single source-of-truth for 8 fine art pieces
    │   ├── skillsData.ts      # Categorized competencies with application contexts
    │   └── careerData.ts      # Education (BCA), Certifications, Hackathons & Volunteering
    └── components/
        ├── Navbar.tsx         # Sticky navigation with role switchers and resume dropdown
        ├── Hero.tsx           # Dark studio hero, headline, verification badges
        ├── ThreeScene.tsx     # Custom Three.js interactive 3D centerpiece
        ├── ProjectsGallery.tsx# Filterable case study cards with search and audience lenses
        ├── ProjectModal.tsx   # Detailed architecture and engineering case study modal
        ├── InteractiveLab.tsx # 4 functional simulations (StockBridge, Aria, OCR, Dispute)
        ├── ArtStudio.tsx      # Curated fine art gallery with full-screen lightbox
        ├── AboutSection.tsx   # Authentic BCA background, builder story, and portrait
        ├── SkillsSection.tsx  # Practical competency cards (no fake progress bars)
        ├── EducationSection.tsx # BCA degree, certifications, and hackathon win
        ├── ContactSection.tsx # Contact form with validation and mailto/webhook options
        ├── ResumeModal.tsx    # Dedicated modal with dual resume previews and downloads
        ├── AiAssistant.tsx    # Grounded conversational assistant with optional Gemini API
        └── Footer.tsx         # Colophon, direct links, and copyright
```

---

## 🌐 Verified Project Inventory

All projects featured on this website correspond to authentic repositories on GitHub:

1. **StockBridge** ([github.com/nandeesh2799/StockBridge](https://github.com/nandeesh2799/StockBridge)): Full-Stack SaaS POS & Inventory system with 15+ REST endpoints, JWT auth, and Groq LLaMA 3.3 70B AI business assistant.
2. **Aria (AI-Companion)** ([github.com/nandeesh2799/AI-Companion](https://github.com/nandeesh2799/AI-Companion)): Desktop transparent AI companion running 100% offline via Ollama, Whisper.cpp STT, Piper TTS, and SQLite vector memory.
3. **Chargeback & Dispute Copilot** ([github.com/nandeesh2799/Chargeback-Dispute-Copilot](https://github.com/nandeesh2799/Chargeback-Dispute-Copilot)): AI payment dispute platform with Scikit-learn explainable ML win-probability model and 10-step investigation agent.
4. **ResumeRank AI** ([github.com/nandeesh2799/resume-screening-agent](https://github.com/nandeesh2799/resume-screening-agent)): Autonomous resume ranking agent with MiniLM dense embeddings and FastAPI SSE streaming.
5. **UPS Service Manager** ([github.com/nandeesh2799/UPS_Technician](https://github.com/nandeesh2799/UPS_Technician)): Flutter mobile app for hardware repair technicians with Hive offline cache, Firebase Firestore sync, and PDF invoicing.
6. **OCR Payment Extraction Pipeline**: Automated UPI screenshot data extraction using PyMuPDF, Tesseract OCR, and pandas into structured Excel audit reports.
7. **Expense Tracker Android** ([github.com/nandeesh2799/ExpenseTrackerAndroid](https://github.com/nandeesh2799/ExpenseTrackerAndroid)): Native Android app with custom SQLite DAO layer and Material gradient UI.
8. **Online Payment Fraud Detection** ([github.com/nandeesh2799/OnlinePaymentFraudDetection](https://github.com/nandeesh2799/OnlinePaymentFraudDetection)): Scikit-learn RandomForest pipeline with SMOTE for imbalanced transaction data.
9. **Intelligent Driver Monitoring System** ([github.com/nandeesh2799/Drowzy-detector](https://github.com/nandeesh2799/Drowzy-detector)): Real-time computer vision drowsiness detection using MediaPipe FaceMesh (Eye Aspect Ratio).
10. **Artwork Medium Classifier** ([github.com/nandeesh2799/ArtworkClassifier1](https://github.com/nandeesh2799/ArtworkClassifier1)): Transfer learning image classifier fine-tuned on EfficientNetB0 / ResNet50.
11. **Weather Prediction System** ([github.com/nandeesh2799/WeatherPrediction0](https://github.com/nandeesh2799/WeatherPrediction0)): Multi-city Indian weather forecasting with Open-Meteo API.
12. **AgriTech Farming Assistance Website**: 1st Place Winner at College Hackathon 2024.

---

## 🎨 Fine Art Exhibition Mediums

Nandeesh's creative studio work includes 8 verified physical works:
- **Oil on Canvas:** *Silent Echoes* (120 × 90 cm, 2023)
- **Watercolour on Paper:** *Rain Memory* (56 × 76 cm, 2024)
- **Graphite on Paper:** *Figure at Rest* (42 × 59 cm, 2024)
- **Pencil on Cotton Paper:** *Botanica Study* (50 × 35 cm, 2023)
- **Mineral Pigment on Plaster:** *Convergence* (4.5 × 2.8 m site-specific mural, 2022)
- **Buon Fresco on Lime Plaster:** *The Keeper* (1.8 × 2.4 m site-specific fresco, 2021)
- **Natural Dye & Pigment on Linen:** *Garden Cipher* (90 × 90 cm, 2024)
- **Silk Dye on Habotai Silk:** *Undercurrent* (140 × 140 cm, 2023)

---

## 🚢 Deployment Guide

This project builds to a completely static folder (`dist/`) that can be deployed to any static hosting provider in under two minutes:

### Vercel
```bash
npm i -g vercel
vercel
```
Or connect your GitHub repository to Vercel with:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
Configure GitHub Actions to deploy the `dist/` directory on push to `main`.

---

## 🔒 Security & Privacy

- No private API keys or personal credentials are hardcoded.
- All contact interactions offer zero-leak mailto client fallback.
- The 3D scene uses standard procedural WebGL buffers and disposes all geometries/materials on unmount.
- Subresource integrity and semantic HTML headers prevent clickjacking and layout shifts.
