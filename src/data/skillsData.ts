import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    title: 'AI, LLM & Automation Systems',
    description: 'Autonomous agents, local & cloud LLMs, vector memory, and document extraction pipelines.',
    skills: [
      { name: 'Claude API & Claude Code', context: 'Multi-turn reasoning & desktop coding tools', highlight: true },
      { name: 'Gemini API & Flash Models', context: 'Multimodal vision & fast JSON schema outputs', highlight: true },
      { name: 'Groq (LLaMA 3.3 70B)', context: 'Sub-second POS business assistant inference', highlight: true },
      { name: 'Ollama (Local LLMs)', context: '100% offline private desktop agent pipelines', highlight: true },
      { name: 'Whisper STT & Piper TTS', context: 'Bidirectional streaming voice processing', highlight: true },
      { name: 'Vector Memory & RAG', context: 'SQLite cosine distance embeddings in Aria' },
      { name: 'Multi-Model Orchestration', context: 'Dynamic fallback & routing logic' },
      { name: 'Prompt Engineering', context: 'Certified Practitioner & structured output parsing' },
      { name: 'OCR & PyMuPDF / Tesseract', context: 'Bulk payment transaction automated extraction' },
    ]
  },
  {
    title: 'Full-Stack & Web Engineering',
    description: 'Production-ready MERN & REST architectures, reactive UIs, and state systems.',
    skills: [
      { name: 'React 19 & React 18', context: 'Custom hooks, concurrent rendering, modern SPAs', highlight: true },
      { name: 'Node.js & Express.js', context: '15+ REST endpoints, JWT auth, rate limiting', highlight: true },
      { name: 'TypeScript & JavaScript (ES6+)', context: 'Type-safe contracts and asynchronous pipelines', highlight: true },
      { name: 'Tailwind CSS', context: 'Design tokens, dark mode systems, and responsive grids' },
      { name: 'REST API Architecture', context: 'Role-based access (Owner, Manager, Cashier)' },
      { name: 'Vite & Bundling', context: 'Sub-second HMR and optimized production trees' },
      { name: 'Streamlit', context: 'Interactive data apps & ML deployment portals' },
      { name: 'HTML5 & Semantic Web', context: 'WCAG accessibility standards and SEO hierarchy' },
    ]
  },
  {
    title: 'Mobile & Desktop Applications',
    description: 'Cross-platform mobile apps with Flutter and desktop overlays with Electron.',
    skills: [
      { name: 'Flutter & Dart', context: 'Enterprise UPS Technician app with Hive offline cache', highlight: true },
      { name: 'Electron', context: 'Frameless transparent overlay in Aria desktop companion', highlight: true },
      { name: 'Java & Android SDK', context: 'Native Expense Tracker with custom SQLite DAO' },
      { name: 'Hive & Offline Sync', context: 'Queued operations with Firebase Firestore sync' },
      { name: 'Provider & State Mgmt', context: 'Predictable unidirectional Flutter UI state' },
      { name: 'Material 3 & Android UI', context: 'Modern dynamic theming and gradient interfaces' },
    ]
  },
  {
    title: 'Databases & Cloud Infrastructure',
    description: 'Relational, document, and embedded databases with secure query layers.',
    skills: [
      { name: 'MongoDB & Mongoose', context: 'Indexed collections, aggregation pipelines in StockBridge', highlight: true },
      { name: 'SQLite & better-sqlite3', context: 'High-throughput local vector stores and mobile DAOs', highlight: true },
      { name: 'Firebase Firestore', context: 'Real-time multi-device cloud synchronization' },
      { name: 'Firebase Authentication', context: 'Role-based identity and mobile security rules' },
      { name: 'Docker & Compose', context: 'Containerized microservices and reproducible builds' },
    ]
  },
  {
    title: 'Machine Learning & Computer Vision',
    description: 'Practical predictive pipelines, imbalance mitigation, and edge vision models.',
    skills: [
      { name: 'Scikit-learn', context: 'RandomForest, SMOTE for payment fraud, Logistic Regression' },
      { name: 'OpenCV & MediaPipe', context: '468-point FaceMesh, Eye Aspect Ratio (EAR) drowsiness' },
      { name: 'EfficientNetB0 / ResNet50', context: 'Transfer learning image classifier for art mediums' },
      { name: 'Pandas & NumPy', context: 'Data cleaning, feature engineering, and statistical analysis' },
    ]
  },
  {
    title: 'Tools, Workflows & Methodologies',
    description: 'Engineering standards, developer ergonomics, and testing environments.',
    skills: [
      { name: 'Git & GitHub', context: 'Branch workflows, pull requests, semantic commit tracking' },
      { name: 'Linux (Ubuntu / Zorin)', context: 'Daily driver development environment, bash scripting' },
      { name: 'VS Code & Android Studio', context: 'Native profiling, debugging, and terminal tooling' },
      { name: 'ReportLab & PDF Gen', context: 'Executive automated audit reports and tax invoices' },
    ]
  }
];
