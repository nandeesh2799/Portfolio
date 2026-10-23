import { Project, SkillGroup, EducationItem, CertificationItem, AchievementItem } from '../types';

export const developerProfile = {
  name: 'Nandeesh Narayan Kurubar',
  role: 'Full-Stack Developer & AI Engineer',
  tagline: 'A Linux-powered creative developer workspace — where code becomes art and ideas become real products.',
  heroBio: "I build web and mobile applications, integrate AI/LLMs, and turn ideas into real products. I love coding, solving problems, exploring Linux (maintaining a customized triple-boot setup with Zorin OS, Kali Linux, and Windows), and creating things that combine technology with imagination.",
  aboutBio: "I'm a BCA graduate (2026) with hands-on experience in MERN-stack development and LLM-integrated products. I've built a SaaS-style POS and inventory platform with an AI business assistant, and a local-first, multi-model desktop AI agent. As a dedicated Linux enthusiast, I run and maintain a triple-boot workstation with Zorin OS and Kali Linux, exploring system architecture, security workflows, and creative computing.",
  location: 'Bengaluru, Karnataka, India',
  education: 'BCA, 2026 (Christ Academy Institute for Advanced Studies)',
  email: 'nandeeshnk506@gmail.com',
  phone: '+91 78927 26438',
  phoneFormatted: '+91 78927 26438',
  whatsappUrl: 'https://wa.me/917892726438?text=Hi%20Nandeesh,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect!',
  github: 'https://github.com/nandeesh2799',
  linkedin: 'https://linkedin.com/in/nandeesh-n-k-729773270',
  portfolioUrl: 'https://nandeesh2799-portfolio.vercel.app',
  resumePdf: './resumes/Nandeesh_Resume.pdf',
  targetRoles: ['Software Engineer', 'AI / GenAI Engineer', 'Full-Stack Developer'],
  interests: ['Linux (Zorin OS & Kali Linux Triple Boot)', 'AI Engineering', 'Full-Stack Development', 'Automation', 'Creative Coding', 'Digital Art'],
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Kannada', level: 'Native' },
    { name: 'Hindi', level: 'Conversational' }
  ]
};

export const projectsData: Project[] = [
  {
    id: 'stockbridge',
    title: 'StockBridge',
    category: 'Full-Stack POS & Inventory System',
    badge: 'MERN + Groq AI',
    iconName: 'ShoppingCart',
    tech: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'JWT', 'Groq LLaMA 3.3', 'i18next'],
    description: 'A full-stack point-of-sale and inventory system featuring authentication, role-based access, offline-first billing, inventory management, and an AI business assistant with multilingual support.',
    keyFeatures: [
      '15+ REST API endpoints with JWT authentication and role-based access control across Owner, Manager, and Cashier roles',
      'AI business assistant powered by Groq LLaMA 3.3 70B with multi-turn memory & sales telemetry',
      'Multilingual UI supporting English, Hindi, and Kannada with runtime locale switching',
      'Offline-first cashier billing with automatic IndexedDB queue & cloud sync upon reconnection',
      'Dynamic UPI QR code generation and instant WhatsApp digital invoice sharing',
      'Barcode scanning, batch tracking, expiry date alerts, and purchase vs selling margin calculations',
      'Khata customer credit ledger with balance history and scheduled WhatsApp reminders'
    ],
    architectureWorkflow: {
      label: 'Offline-First & AI Sync Pipeline',
      steps: ['IndexedDB Local Queue', 'Auto Cloud Sync', 'MongoDB Atlas', 'Groq LLaMA 3.3 70B', 'WhatsApp / PDF Invoicing']
    },
    architectureHighlights: [
      '3-Tier RBAC: Granular permissions for Owner, Manager, and Cashier roles',
      '15+ REST APIs with rate limiting & JWT authentication',
      'Automated Khata customer credit ledger with scheduled WhatsApp reminders'
    ],
    repoUrl: 'https://github.com/nandeesh2799/StockBridge',
    metrics: { label: 'REST APIs', value: '15+ Endpoints' }
  },
  {
    id: 'aria',
    title: 'Aria',
    category: 'Local-First Desktop AI Companion & Automation Agent',
    badge: 'Electron + Multi-LLM',
    iconName: 'Bot',
    tech: ['Electron', 'React', 'Vite', 'Ollama', 'Whisper STT', 'Piper TTS', 'SQLite', 'Claude API', 'Gemini API'],
    description: 'A local-first desktop AI companion that combines voice interaction, persistent memory, model orchestration, and automation within an animated desktop interface.',
    keyFeatures: [
      'Transparent, always-on-top frameless Electron overlay with animated expressions on Linux',
      'Multi-model LLM abstraction router supporting Gemini, Claude, Groq, and 100% offline Ollama',
      'Persistent SQLite vector memory retrieving past conversation history via cosine distance',
      'Local speech processing pipeline with Whisper.cpp (STT) and Piper (zero-cloud TTS)',
      'Vision mode capturing active desktop display buffers for automated assistance',
      'Automatic cloud fallback when operating outside local high-compute environments'
    ],
    architectureWorkflow: {
      label: '5-Stage Autonomous Agent Pipeline',
      steps: ['Input Capture (Voice/Vision/Text)', 'Model Routing Router', 'SQLite Cosine Vector Memory', 'LLM Response Generation', 'Piper Zero-Cloud TTS']
    },
    architectureHighlights: [
      '4-Tier Model Fallback: Ollama local → Groq → Claude → Gemini',
      'Local STT/TTS: Whisper.cpp voice recognition and Piper neural speech',
      'Real-time screen vision inspection buffer for proactive assistance'
    ],
    repoUrl: 'https://github.com/nandeesh2799/AI-Companion',
    metrics: { label: 'Model Fallback', value: '4 Tiers' }
  },
  {
    id: 'ocr-pipeline',
    title: 'OCR Payment Extraction Pipeline',
    category: 'Python Automation & Data Processing',
    badge: 'Computer Vision & ETL',
    iconName: 'FileSpreadsheet',
    tech: ['Python', 'PyMuPDF', 'Tesseract', 'pandas', 'openpyxl'],
    description: 'An automated pipeline that extracts UPI transaction information from bulk payment-screenshot PDFs and produces structured Excel reports, eliminating manual data entry.',
    keyFeatures: [
      'Automated batch PDF rasterization and bounding-box OCR text scanning',
      'Regex-driven extraction for transaction UTR, amount, timestamp, and payee details',
      'Structured tabular data cleaning and transformation with pandas',
      'Automated Excel formatting, audit logging, and duplicate entry detection',
      'High verification accuracy reducing manual accounts reconciliation time'
    ],
    architectureWorkflow: {
      label: 'End-to-End Extraction Flow',
      steps: ['Bulk PDF Screenshots', 'PyMuPDF Rasterization', 'Tesseract OCR Parsing', 'Regex UTR Extraction', 'Excel Audit Reports']
    },
    architectureHighlights: [
      'Eliminated 100% of manual data entry from bulk payment-screenshot PDFs',
      'Full pipeline methodology: identify bottleneck → automate → verify output',
      'High-precision reconciliation with structured tabular Excel logging'
    ],
    metrics: { label: 'Automation', value: '100% Python' }
  },
  {
    id: 'ups-service',
    title: 'UPS Service Manager',
    category: 'Flutter Mobile Application',
    badge: 'Mobile App',
    iconName: 'Smartphone',
    tech: ['Flutter', 'Dart', 'Firebase Authentication', 'Firestore', 'Provider', 'Material 3'],
    description: 'A mobile application for UPS repair technicians that supports customer management, service orders, warranty alerts, and WhatsApp integration.',
    keyFeatures: [
      'Technician job management workflow tracking status from Intake to Testing and Delivery',
      'Real-time Firestore synchronization for repair logs and parts inventory consumption',
      'Battery voltage telemetry diagnostic logger and inverter load fault indicators',
      'Customer database with automated warranty expiry notifications and WhatsApp alerts',
      'Material 3 reactive UI optimized for field technicians on Android devices'
    ],
    architectureWorkflow: {
      label: 'Field Technician Workflow',
      steps: ['Customer Intake', 'Diagnostics & Telemetry', 'Firestore Sync', 'Warranty Expiry Tracking', 'WhatsApp Alerts']
    },
    architectureHighlights: [
      'Clean architecture: models / providers / services / screens pattern',
      'Real-time cloud database synchronization for repair logs & parts',
      'Material 3 dynamic dark/light theming with field-optimized typography'
    ],
    repoUrl: 'https://github.com/nandeesh2799/UPS_Technician',
    metrics: { label: 'Platform', value: 'Flutter / Dart' }
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    icon: 'Code2',
    skills: ['Python', 'JavaScript', 'Java (Android)', 'Dart', 'SQL', 'HTML/CSS']
  },
  {
    category: 'Frameworks',
    icon: 'Layers',
    skills: ['React', 'Node.js', 'Express.js', 'Flutter', 'Streamlit']
  },
  {
    category: 'Databases',
    icon: 'Database',
    skills: ['MongoDB', 'SQLite', 'Firebase Firestore']
  },
  {
    category: 'AI & LLMs',
    icon: 'Cpu',
    skills: [
      'Claude API',
      'Gemini',
      'Groq',
      'Ollama',
      'OpenAI/GPT',
      'Whisper STT',
      'Piper TTS',
      'RAG / Vector Memory',
      'Agent Architecture',
      'Prompt Engineering'
    ]
  },
  {
    category: 'Tools & Systems',
    icon: 'Wrench',
    skills: [
      'Linux (Zorin OS & Kali Linux)',
      'Bash',
      'Triple Boot Management',
      'Git',
      'GitHub',
      'VS Code',
      'Android Studio',
      'Jupyter Notebook',
      'REST APIs'
    ]
  }
];

export const educationData: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Christ Academy Institute for Advanced Studies, Bengaluru',
    period: '2023 – July 2026',
    details: 'Focus on full-stack software development, database systems, AI engineering, and computer networking.'
  },
  {
    degree: 'Pre-University (Commerce / Computer Science)',
    institution: 'Krupanidhi PU College, Bengaluru',
    period: '2021 – 2023',
    details: 'Computer Science, Economics, Business Studies, and Accountancy.'
  }
];

export const certificationsData: CertificationItem[] = [
  {
    title: 'Prompt Engineering',
    issuer: 'Certified Practitioner',
    status: 'Verified'
  },
  {
    title: 'Software Engineering',
    issuer: 'Infosys Springboard',
    status: 'Verified'
  },
  {
    title: 'Networking & Web Technologies',
    issuer: 'Infosys Springboard',
    status: 'Verified'
  }
];

export const achievementsData: AchievementItem[] = [
  {
    title: 'First Place — College Hackathon',
    year: '2024',
    event: 'Inter-College Technical Challenge',
    badge: '1st Place Winner',
    spotlight: true,
    description: 'Built an AgriTech farming-assistance website; ranked first among all competing teams across colleges.',
    highlights: [
      'Engineered an AgriTech farming-assistance web platform with market price telemetry',
      'Ranked #1 among all competing college developer teams',
      'Integrated real-time crop disease diagnosis guidance and regional crop pricing'
    ]
  },
  {
    title: 'Finalist — Departmental Coding Contest',
    year: '2024',
    event: 'Department of Computer Science',
    badge: 'Top 50 Finalist',
    description: 'Ranked in top positions among 50+ participants in rapid algorithmic problem solving and clean code implementation.',
    highlights: [
      'Top positions among 50+ competitive developers',
      'Rapid algorithmic problem solving, clean data structure design, and edge case handling'
    ]
  },
  {
    title: 'Technical Volunteer',
    year: 'July 2024',
    event: 'Christ Academy IT Fest',
    badge: 'Operations Lead',
    description: 'Managed all technical operations, coordinated technical workshops, audio-visual infrastructure, and developer hackathon tracks.',
    highlights: [
      'Single point of contact for technical infrastructure and hardware setups',
      'Orchestrated multi-track developer hackathons and presentation stages'
    ]
  },
  {
    title: 'Event Volunteer',
    year: 'September 2023',
    event: 'Utkarsh Cultural & Academic Fest',
    badge: 'Event Operations',
    description: 'Managed event logistics, guest speaker coordination, and large-scale stage operations at Christ Academy.',
    highlights: [
      'Managed stage operations and multi-team schedule coordination',
      'Ensured seamless audio-visual and delegate coordination throughout the festival'
    ]
  }
];
