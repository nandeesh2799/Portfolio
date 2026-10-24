import { Artwork } from '../types';

export const artworksData: Artwork[] = [
  // ── Paintings ──────────────────────────────────────────
  {
    id: 'shiva-parvati',
    src: '/images/artworks/shiva-parvati.jpg',
    title: 'Shiva & Parvati',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'Stylized contemporary acrylic composition depicting Lord Shiva and Goddess Parvati in divine harmony.',
    palette: ['#00F5FF', '#FF4FD8', '#1D263B', '#E0E6ED']
  },
  {
    id: 'yellamma-devi',
    src: '/images/artworks/yellamma-devi.jpg',
    title: 'Yellamma Devi',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A richly detailed devotional painting of Goddess Renuka Yellamma, adorned with traditional ornaments and a radiant halo.',
    palette: ['#E63946', '#FFB703', '#2B1055', '#F8F9FA']
  },
  {
    id: 'raghavendra-swamy',
    src: '/images/artworks/raghavendra-swamy.jpg',
    title: 'Sri Raghavendra Swamy',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A serene portrait of Saint Sri Raghavendra Swamy of Mantralayam seated in contemplation, holding a sacred idol and staff.',
    palette: ['#FB8500', '#FFB703', '#3D1E0B', '#E9ECEF']
  },
  {
    id: 'ram-lalla',
    src: '/images/artworks/ram-lalla.jpg',
    title: 'Ram Lalla',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A luminous portrayal of Ram Lalla — the child form of Lord Ram — adorned in gold ornaments against a warm saffron glow.',
    palette: ['#FFB703', '#023047', '#FB8500', '#121824']
  },
  {
    id: 'nagavalli',
    src: '/images/artworks/nagavalli.jpg',
    title: 'Nagavalli',
    category: 'Paintings',
    medium: 'Acrylic on Black Canvas',
    description: 'Expressive classical dancer in striking costume and mudra pose against an intense black backdrop.',
    palette: ['#E63946', '#FFB703', '#080B10', '#48CAE4']
  },
  {
    id: 'shiva-cosmic-blue',
    src: '/images/artworks/shiva-cosmic-blue.jpg',
    title: 'Shiva — Cosmic Meditation',
    category: 'Paintings',
    medium: 'Watercolour on Paper',
    description: 'Lord Shiva in deep cosmic meditation, painted with galaxy-blue watercolour washes, celestial starfields, and a crescent moon.',
    palette: ['#0077B6', '#00F5FF', '#03045E', '#CAF0F8']
  },

  // ── Fabric Art ─────────────────────────────────────────
  {
    id: 'agni-shiva-fabric',
    src: '/images/artworks/agni-shiva-fabric.jpg',
    title: 'Agni Shiva',
    category: 'Fabric Art',
    medium: 'Fabric Painting on T-Shirt',
    description: 'Lord Shiva wielding the trishul, surrounded by roaring fire — hand-painted with fabric pigments directly onto a white t-shirt.',
    palette: ['#FF4800', '#FFB703', '#2B2D42', '#FFFFFF']
  },

  // ── Tattoo Art ─────────────────────────────────────────
  {
    id: 'shiva-kali-tattoo',
    src: '/images/artworks/shiva-kali-tattoo.jpg',
    title: 'Shiva & Kali',
    category: 'Tattoo Art',
    medium: 'Tattoo Ink on Synthetic Skin',
    description: 'Detailed tattoo needlework depicting serene Shiva and fierce Kali, practiced with precision needle shading on synthetic skin.',
    palette: ['#0F172A', '#475569', '#E2E8F0', '#CBD5E1']
  },

  // ── Sketches ───────────────────────────────────────────
  {
    id: 'krishna-watercolour',
    src: '/images/artworks/krishna-watercolour.jpg',
    title: 'Krishna',
    category: 'Sketches',
    medium: 'Watercolour & Ink on Sketchbook',
    description: 'Young Krishna adorned with peacock feathers and gold jewellery, rendered in delicate watercolour washes with clean ink outlines.',
    palette: ['#00B4D8', '#FFB703', '#38B000', '#F8F9FA']
  },
  {
    id: 'portrait-watercolour',
    src: '/images/artworks/portrait-watercolour.jpg',
    title: 'Portrait Study',
    category: 'Sketches',
    medium: 'Watercolour on Paper',
    description: 'Expressive portrait capturing a joyful smile with subtle shading and fine hair detailing.',
    palette: ['#E07A5F', '#3D405B', '#F4F1DE', '#81B29A']
  },
  {
    id: 'aghor-shiva-pen',
    src: '/images/artworks/aghor-shiva-pen.jpg',
    title: 'Aghor Shiva',
    category: 'Sketches',
    medium: 'Ink Pen on Notebook Paper',
    description: 'A dynamic pen sketch of Aghor Shiva dancing in the Tandava — wild hair, multiple arms, and fierce energy captured in fine linework.',
    palette: ['#0F172A', '#334155', '#F8FAFC', '#94A3B8']
  },

  // ── Wall Art ───────────────────────────────────────────
  {
    id: 'hanuman-wall-mural',
    src: '/images/artworks/hanuman-wall-mural.jpg',
    title: 'Hanuman Wall Mural & Flag',
    category: 'Wall Art',
    medium: 'Wall Mural & Acrylic on Fabric',
    description: 'A bold monochrome Hanuman mural painted directly on a wall, accompanied by a hand-painted Rama-Hanuman flag with Kannada script.',
    palette: ['#FF5400', '#080B10', '#FEE440', '#E0E6ED']
  }
];

export const artworkCategories = ['All', 'Paintings', 'Fabric Art', 'Tattoo Art', 'Sketches', 'Wall Art'] as const;
