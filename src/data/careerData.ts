import { EducationEntry, CertificationEntry, AchievementEntry } from '../types';

export const educationData: EducationEntry[] = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Christ Academy Institute for Advanced Studies',
    period: '2023 – 2026 (Expected June 2026)',
    location: 'Bengaluru, Karnataka, India',
    details: 'Rigorous coursework spanning Software Engineering, Data Structures & Algorithms, Object-Oriented Programming (Java, C++), Database Management Systems (SQL), Web Technologies, and Cloud Computing. Actively applied academic foundations to ship production applications.',
    statusBadge: 'Final Year Student'
  },
  {
    title: 'Pre-University (Science / Computer Science)',
    institution: 'Krupanidhi PU College',
    period: '2021 – 2023',
    location: 'Bengaluru, Karnataka, India',
    details: 'Foundation in Mathematics, Physics, Chemistry, and Computer Science fundamentals, cultivating analytical problem solving and early software programming practices.',
    statusBadge: 'Completed'
  }
];

export const certificationsData: CertificationEntry[] = [
  {
    title: 'Prompt Engineering — Certified Practitioner',
    issuer: 'Professional Certification',
    year: '2025',
    description: 'Advanced prompt architecture, zero/few-shot chain-of-thought orchestration, structured JSON output enforcement, and LLM guardrails for production applications.'
  },
  {
    title: 'Software Engineering',
    issuer: 'Infosys Springboard',
    year: '2024',
    description: 'Comprehensive software engineering life cycle (SDLC), architectural patterns, modular design, automated testing philosophies, and enterprise deployment hygiene.'
  },
  {
    title: 'Networking & Web Technologies',
    issuer: 'Infosys Springboard',
    year: '2024',
    description: 'TCP/IP protocol suites, HTTP/HTTPS handshake mechanics, RESTful contract principles, DNS routing, and modern web application security practices.'
  }
];

export const achievementsData: AchievementEntry[] = [
  {
    title: '1st Place — College Hackathon',
    event: 'Inter-College Hackathon, Bengaluru',
    year: '2024',
    rankBadge: '🏆 Winner (1st Place)',
    category: 'hackathon',
    description: 'Spearheaded frontend design and rapid responsive implementation for an AgriTech farming assistance platform. Ranked first among all competing college teams for pragmatic utility and execution speed.'
  },
  {
    title: 'Finalist — Departmental Coding Contest',
    event: 'Department of Computer Science Coding Challenge',
    year: '2024',
    rankBadge: 'Top Tier Finalist',
    category: 'contest',
    description: 'Secured top positions among 50+ competing participants in timed algorithmic problem solving, edge-case optimization, and clean code evaluations.'
  },
  {
    title: 'Technical Operations Volunteer — IT Fest',
    event: 'Christ Academy Annual IT Fest',
    year: '2024 (Jul)',
    rankBadge: 'Technical Lead',
    category: 'volunteering',
    description: 'Orchestrated end-to-end technical infrastructure, network routing, AV systems, and hardware setups across lecture halls for hundreds of visiting delegates.'
  },
  {
    title: 'Event Volunteer — Utkarsh Cultural Fest',
    event: 'Utkarsh Cultural & Academic Fest, Christ Academy',
    year: '2023 (Sep)',
    rankBadge: 'Core Volunteer',
    category: 'volunteering',
    description: 'Coordinated campus logistics, staging logistics, and participant flow for the annual inter-college collegiate festival.'
  }
];
