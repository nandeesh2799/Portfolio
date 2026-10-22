import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Terminal, 
  ArrowUpRight, 
  FileDown, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { ChatMessage } from '../types';
import { projectsData } from '../data/projectsData';

interface AiAssistantProps {
  onOpenResumeModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  onOpenResumeModal,
  onNavigateToSection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am Nandeesh's Portfolio Assistant. I can answer questions regarding his full-stack projects, AI agents, technical skills, or resume credentials. What would you like to know?",
      timestamp: 'Just now'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Knowledge retrieval engine
  const generateResponse = async (userQuery: string): Promise<{ text: string; action?: ChatMessage['suggestedAction'] }> => {
    const q = userQuery.toLowerCase();

    // Check if an external Gemini API key is configured
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI portfolio assistant for Nandeesh Narayan Kurubar.
Strict Truth Guidelines:
- Nandeesh is a BCA graduate (2026) from Christ Academy Institute for Advanced Studies, Bengaluru.
- Key Projects: StockBridge (React 19, Node.js, Express, MongoDB, Groq LLaMA 3.3 POS), Aria (Electron, React, Vite, Ollama, Whisper STT, Piper TTS, SQLite vector memory), Chargeback & Dispute Copilot (FastAPI, Scikit-learn explainable ML, React), ResumeRank AI (FastAPI, all-MiniLM-L6-v2, SSE streaming), UPS Service Manager (Flutter, Dart, Firebase), OCR Payment Extraction Pipeline (Python, PyMuPDF, Tesseract).
- Art: Physical artist working in oil/watercolour paint, graphite sketches, lime plaster wall murals, and pigment on fabric.
- Contact: nandeeshnk506@gmail.com, +91 78927 26438, github.com/nandeesh2799.
- NEVER invent employers, fake years of experience, or unverified claims. Answer concisely and professionally.

User question: ${userQuery}`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await response.json();
        const geminiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          return { text: geminiText };
        }
      } catch {
        // Fall back to rule-based engine
      }
    }

    // Deterministic Knowledge Base
    if (q.includes('stockbridge') || (q.includes('pos') && q.includes('inventory'))) {
      return {
        text: "StockBridge is Nandeesh's flagship full-stack SaaS POS & inventory management system. Built with React 19, Node.js, Express, and MongoDB, it features 15+ REST endpoints, JWT authentication, dynamic UPI QR code payments, and an AI business assistant powered by Groq LLaMA 3.3 70B with live shop context.",
        action: { label: 'Explore StockBridge Demo', actionType: 'navigate', target: 'laboratory' }
      };
    }

    if (q.includes('aria') || q.includes('companion') || q.includes('desktop')) {
      return {
        text: "Aria is a transparent desktop AI companion built in Electron and React. It operates 100% offline using local Ollama models (LLaMA 3.1), Whisper.cpp for speech-to-text, Piper for speech synthesis, and SQLite for persistent vector memory via cosine similarity lookups.",
        action: { label: 'Inspect Aria in Lab', actionType: 'navigate', target: 'laboratory' }
      };
    }

    if (q.includes('ai') || q.includes('llm') || q.includes('agent')) {
      return {
        text: "Nandeesh has built several verified AI & GenAI systems:\n1. StockBridge: Live Groq LLaMA 3.3 70B retail assistant with shop schema injection.\n2. Aria: Multi-model router (Claude, Gemini, Groq, Ollama) with SQLite vector memory.\n3. Chargeback Copilot: Explainable Scikit-learn ML scoring & 10-step dispute investigation agent.\n4. ResumeRank AI: Dense MiniLM embedding semantic ranking & SSE streaming.\n5. OCR Pipeline: Automated UPI screenshot extraction using Tesseract and PyMuPDF.",
        action: { label: 'View AI Projects', actionType: 'navigate', target: 'projects' }
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: "You can download Nandeesh's verified 2026 resumes directly. There is an ATS-optimized AI & Software Engineering resume as well as a Full-Stack & Mobile Developer resume.",
        action: { label: 'Open Resume Downloader', actionType: 'modal', target: 'resume' }
      };
    }

    if (q.includes('education') || q.includes('college') || q.includes('bca') || q.includes('degree')) {
      return {
        text: "Nandeesh is completing his Bachelor of Computer Applications (BCA) at Christ Academy Institute for Advanced Studies in Bengaluru (2023–2026, graduating June 2026). He also completed Pre-University education in Science/Computer Science at Krupanidhi PU College (2021–2023).",
        action: { label: 'View Academic Timeline', actionType: 'navigate', target: 'skills' }
      };
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack')) {
      return {
        text: "Core Languages: Python, JavaScript, Java (Android), Dart, SQL, HTML/CSS.\nFrameworks: React 19/18, Node.js, Express, Flutter, Streamlit, Tailwind CSS.\nAI & Models: Claude API, Gemini Flash, Groq, Ollama, Whisper STT, Piper TTS, SQLite Vector Memory.\nDatabases: MongoDB, SQLite, Firebase Firestore.",
        action: { label: 'View Detailed Skills', actionType: 'navigate', target: 'skills' }
      };
    }

    if (q.includes('art') || q.includes('painting') || q.includes('sketch') || q.includes('creative')) {
      return {
        text: "Nandeesh is also an accomplished visual artist working across four distinct physical mediums: oil and watercolour painting, graphite/pencil sketches, lime plaster wall murals, and dye on fabric. You can view 8 of his original artworks in the Art Studio section.",
        action: { label: 'Visit Art Studio', actionType: 'navigate', target: 'art-studio' }
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) {
      return {
        text: "You can reach Nandeesh directly at:\n• Email: nandeeshnk506@gmail.com\n• Phone/WhatsApp: +91 78927 26438\n• Location: Bengaluru, Karnataka, India\n• GitHub: github.com/nandeesh2799\nHe is available for full-time roles starting July 2026.",
        action: { label: 'Go to Contact Form', actionType: 'navigate', target: 'contact' }
      };
    }

    if (q.includes('hackathon') || q.includes('award') || q.includes('achievement')) {
      return {
        text: "Key achievements include:\n• 1st Place — College Hackathon (2024) for building an AgriTech farming assistance platform.\n• Finalist — Departmental Coding Contest (2024).\n• Technical Volunteer — Christ Academy IT Fest (2024).\n• Event Volunteer — Utkarsh Cultural Fest (2023).",
        action: { label: 'View Achievements', actionType: 'navigate', target: 'skills' }
      };
    }

    // Default response
    return {
      text: "I can assist you with Nandeesh's software projects (StockBridge, Aria, Chargeback Copilot, UPS Technician), technical skills (MERN, Python, Flutter, GenAI), physical art practice, or resume download. Try clicking one of the suggested prompts below!",
      action: { label: 'Explore Interactive Lab', actionType: 'navigate', target: 'laboratory' }
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(query);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestedAction: response.action
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 400);
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.actionType === 'modal') {
      onOpenResumeModal();
    } else if (action.actionType === 'navigate') {
      onNavigateToSection(action.target);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-dark-900 border border-cyan-500/50 hover:border-cyan-400 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all"
          aria-label="Open AI Portfolio Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-mono font-medium hidden sm:inline text-cyan-300">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-[340px] sm:w-[400px] h-[520px] max-h-[82vh] rounded-2xl bg-dark-900 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-3.5 bg-dark-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Portfolio Copilot
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] font-mono text-slate-400">
                  Grounded strictly in verified dossier
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close assistant"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-dark-950 font-medium rounded-tr-none'
                      : 'bg-dark-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}

                  {m.suggestedAction && (
                    <div className="mt-2.5 pt-2 border-t border-slate-850">
                      <button
                        onClick={() => handleActionClick(m.suggestedAction)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 text-cyan-300 text-[11px] font-mono transition-colors"
                      >
                        <span>{m.suggestedAction.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 text-cyan-400 font-mono text-[11px]">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Scanning portfolio data...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-dark-950/80 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 scrollbar-none text-[10px] font-mono">
            <button
              onClick={() => handleSend("What are your top AI projects?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 whitespace-nowrap"
            >
              Top AI projects?
            </button>
            <button
              onClick={() => handleSend("How does StockBridge use LLaMA 3.3?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 whitespace-nowrap"
            >
              StockBridge architecture?
            </button>
            <button
              onClick={() => handleSend("Tell me about your physical art")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 whitespace-nowrap"
            >
              Art studio?
            </button>
            <button
              onClick={() => handleSend("How can I download your resume?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 whitespace-nowrap"
            >
              Download Resume
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-dark-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask a question about Nandeesh's work..."
              className="flex-1 bg-dark-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
