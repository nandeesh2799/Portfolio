import React, { useState } from 'react';
import { 
  Terminal, 
  ShoppingCart, 
  Bot, 
  FileText, 
  ShieldAlert, 
  Plus, 
  Minus, 
  Trash2, 
  QrCode, 
  Send, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Cpu, 
  Database, 
  Eye, 
  Volume2, 
  Mic, 
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveLabProps {
  initialDemo?: string;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ initialDemo = 'stockbridge' }) => {
  const [activeTab, setActiveTab] = useState<'stockbridge' | 'aria' | 'ocr' | 'dispute'>(
    initialDemo === 'aria-companion' ? 'aria' : 
    initialDemo === 'chargeback-copilot' ? 'dispute' : 
    initialDemo === 'ocr-pipeline' ? 'ocr' : 'stockbridge'
  );

  // -------------------------------------------------------------
  // DEMO 1: StockBridge POS State
  // -------------------------------------------------------------
  const [cart, setCart] = useState<Array<{ id: number; name: string; nameKn: string; price: number; qty: number; stock: number }>>([
    { id: 1, name: 'Mysore Sandal Soap (Pack of 3)', nameKn: 'ಮೈಸೂರು ಸ್ಯಾಂಡಲ್ ಸೋಪ್', price: 185, qty: 2, stock: 45 },
    { id: 2, name: 'Cold-Pressed Mustard Oil 1L', nameKn: 'ಸಾಸಿವೆ ಎಣ್ಣೆ 1 ಲೀಟರ್', price: 210, qty: 1, stock: 18 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'khata'>('upi');
  const [showUpiModal, setShowUpiModal] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [aiAssistantQuery, setAiAssistantQuery] = useState<string>('');
  const [aiAssistantReply, setAiAssistantReply] = useState<string>('StockBridge AI Ready. Ask any question about shop revenue, low stock items, or margin analytics.');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const inventoryItems = [
    { id: 1, name: 'Mysore Sandal Soap (Pack of 3)', nameKn: 'ಮೈಸೂರು ಸ್ಯಾಂಡಲ್ ಸೋಪ್', price: 185, stock: 45 },
    { id: 2, name: 'Cold-Pressed Mustard Oil 1L', nameKn: 'ಸಾಸಿವೆ ಎಣ್ಣೆ 1 ಲೀಟರ್', price: 210, stock: 18 },
    { id: 3, name: 'Organic Royal Basmati Rice 5kg', nameKn: 'ಬಾಸ್ಮತಿ ಅಕ್ಕಿ 5 ಕೆಜಿ', price: 540, stock: 8 },
    { id: 4, name: 'Cardamom Tea Bags (100s)', nameKn: 'ಏಲಕ್ಕಿ ಚಹಾ ಬ್ಯಾಗ್', price: 195, stock: 24 },
    { id: 5, name: 'Pure Organic Jaggery Powder 1kg', nameKn: 'ಬೆಲ್ಲದ ಪುಡಿ 1 ಕೆಜಿ', price: 85, stock: 4 },
  ];

  const addToCart = (item: typeof inventoryItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as typeof cart
    );
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'upi') {
      setShowUpiModal(true);
      setTimeout(() => {
        setPaymentSuccess(true);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
        setTimeout(() => {
          setShowUpiModal(false);
          setPaymentSuccess(false);
          setCart([]);
        }, 1800);
      }, 1500);
    } else {
      setPaymentSuccess(true);
      confetti({ particleCount: 50, spread: 40 });
      setTimeout(() => {
        setPaymentSuccess(false);
        setCart([]);
      }, 1200);
    }
  };

  const handleAiAsk = (query: string) => {
    setIsAiThinking(true);
    setAiAssistantQuery(query);
    setTimeout(() => {
      setIsAiThinking(false);
      if (query.includes('revenue') || query.includes('profit')) {
        setAiAssistantReply(
          `📊 [Groq LLaMA 3.3 70B Context Analysis]\nToday's Gross Sales: ₹18,450 across 42 orders.\nNet estimated profit margin: ₹4,120 (~22.3%). Top earning SKU: Royal Basmati Rice 5kg (₹6,480 total).`
        );
      } else if (query.includes('low') || query.includes('stock')) {
        setAiAssistantReply(
          `⚠️ [Inventory Warning Flag]\n2 items breached minimum buffer limit:\n1. Pure Organic Jaggery Powder (4 units remaining — threshold: 10)\n2. Royal Basmati Rice 5kg (8 units remaining — threshold: 12)\nAuto-generated WhatsApp supplier PO draft is ready.`
        );
      } else if (query.includes('Kannada') || query.includes('language')) {
        setAiAssistantReply(
          `🌐 [Multilingual i18next Response]\nರಶೀದಿ ಸಾರಾಂಶ:\nಒಟ್ಟು ಮೊತ್ತ: ₹${grandTotal} (ಜಿಎಸ್‌ಟಿ ಸೇರಿ).\nಪಾವತಿ ವಿಧಾನ: ${paymentMethod === 'upi' ? 'ಯುಪಿಐ (UPI)' : 'ನಗದು (Cash)'}.\nಸ್ಟಾಕ್‌ಬ್ರಿಡ್ಜ್‌ ವ್ಯವಸ್ಥೆ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ.`
        );
      } else {
        setAiAssistantReply(
          `🤖 [StockBridge Live Analytics]\nBased on the last 7 days of retail sales, peak billing hours occur between 6:30 PM and 9:00 PM. Recommend prep-batching grocery bundles for faster cashier throughput.`
        );
      }
    }, 450);
  };

  // -------------------------------------------------------------
  // DEMO 2: Aria Desktop AI Companion State
  // -------------------------------------------------------------
  const [ariaModel, setAriaModel] = useState<'groq' | 'gemini' | 'claude' | 'ollama'>('gemini');
  const [ariaEmotion, setAriaEmotion] = useState<'idle' | 'happy' | 'thinking' | 'smug'>('idle');
  const [vectorQuery, setVectorQuery] = useState<string>('Nandeesh preferred engineering stack');
  const [vectorResult, setVectorResult] = useState<{ text: string; score: number; docId: string } | null>({
    text: 'Nandeesh specializes in the MERN stack (React 19, Node.js, Express, MongoDB) coupled with Python for GenAI integrations and Flutter for mobile.',
    score: 0.942,
    docId: 'memory_core_01'
  });

  const handleVectorSearch = (query: string) => {
    setVectorQuery(query);
    setAriaEmotion('thinking');
    setTimeout(() => {
      setAriaEmotion('smug');
      if (query.toLowerCase().includes('offline') || query.toLowerCase().includes('ollama')) {
        setVectorResult({
          text: 'Aria runs 100% offline via local Ollama models (Llama 3.1 8B), Whisper.cpp STT binary, and local Piper speech synthesis with zero remote cloud egress.',
          score: 0.968,
          docId: 'sys_offline_arch'
        });
      } else if (query.toLowerCase().includes('vision') || query.toLowerCase().includes('screen')) {
        setVectorResult({
          text: 'Vision mode captures screen buffer frames via Electron desktopCapturer API, downscales via canvas, and injects visual context into Gemini Flash.',
          score: 0.915,
          docId: 'screen_context_v2'
        });
      } else {
        setVectorResult({
          text: 'Vector embeddings generated via local sentence-transformers stored in SQLite. Cosine similarity threshold >= 0.82 triggers memory injection.',
          score: 0.887,
          docId: 'sqlite_vec_cfg'
        });
      }
    }, 350);
  };

  // -------------------------------------------------------------
  // DEMO 3: OCR Payment Extraction Pipeline State
  // -------------------------------------------------------------
  const [ocrPreset, setOcrPreset] = useState<number>(0);
  const [isOcrScanning, setIsOcrScanning] = useState<boolean>(false);
  const [ocrScanComplete, setOcrScanComplete] = useState<boolean>(true);

  const ocrPresets = [
    {
      app: 'Google Pay',
      amount: '₹ 1,450.00',
      utr: '419208492019',
      recipient: 'Metro Cash & Carry Wholesale',
      vpa: 'metroretail@icici',
      date: '2026-03-14 14:28:11',
      status: 'SUCCESS',
      confidence: '99.8%'
    },
    {
      app: 'PhonePe',
      amount: '₹ 820.00',
      utr: '629104817290',
      recipient: 'Chai Point Koramangala',
      vpa: 'chaipoint@ybl',
      date: '2026-03-14 17:05:42',
      status: 'SUCCESS',
      confidence: '99.4%'
    },
    {
      app: 'Paytm UPI',
      amount: '₹ 3,200.00',
      utr: '918274019283',
      recipient: 'Apex Electronics & Hardware',
      vpa: 'apexelectro@paytm',
      date: '2026-03-14 11:12:05',
      status: 'SUCCESS',
      confidence: '98.9%'
    }
  ];

  const runOcrScan = (idx: number) => {
    setOcrPreset(idx);
    setIsOcrScanning(true);
    setOcrScanComplete(false);
    setTimeout(() => {
      setIsOcrScanning(false);
      setOcrScanComplete(true);
    }, 700);
  };

  // -------------------------------------------------------------
  // DEMO 4: Chargeback Dispute Copilot State
  // -------------------------------------------------------------
  const [hasPodProof, setHasPodProof] = useState<boolean>(true);
  const [hasOtpProof, setHasOtpProof] = useState<boolean>(true);
  const [hasGpsTelemetry, setHasGpsTelemetry] = useState<boolean>(true);
  const [hasKotSlip, setHasKotSlip] = useState<boolean>(false);

  // Compute explainable win probability
  const baseScore = 25;
  const podScore = hasPodProof ? 28 : 0;
  const otpScore = hasOtpProof ? 24 : 0;
  const gpsScore = hasGpsTelemetry ? 15 : 0;
  const kotScore = hasKotSlip ? 8 : 0;
  const winProbability = Math.min(baseScore + podScore + otpScore + gpsScore + kotScore, 98);

  return (
    <section id="laboratory" className="py-20 relative bg-dark-950/60 border-t border-b border-slate-800/80">
      {/* Background ambient subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#152238_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Lab Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM LABORATORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hands-On Interactive Demonstrations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Experience the real business logic, ML inference engines, and autonomous pipelines built in my repositories — live in your browser with zero setup.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-2xl bg-dark-900 border border-slate-800 max-w-fit mx-auto">
            <button
              onClick={() => setActiveTab('stockbridge')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'stockbridge'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>StockBridge POS &amp; AI</span>
            </button>

            <button
              onClick={() => setActiveTab('aria')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'aria'
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Aria Desktop Companion</span>
            </button>

            <button
              onClick={() => setActiveTab('ocr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'ocr'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>OCR Payment Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('dispute')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dispute'
                  ? 'bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Dispute Copilot ML</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAB CONTAINER 1: StockBridge POS & LLaMA 3.3 Assistant */}
        {/* ============================================================== */}
        {activeTab === 'stockbridge' && (
          <div className="rounded-2xl bg-dark-900 border border-slate-800 p-6 lg:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  MERN + Groq LLaMA 3.3 70B • Multilingual Indian Retail POS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  StockBridge Live Terminal &amp; Store Intelligence
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulated Offline Sync Cache: Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              {/* Left Column: POS Item Catalog & Cart (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
                    Fast Retail Catalog (Click to Add):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {inventoryItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addToCart(item)}
                        className="flex items-center justify-between p-3 rounded-xl bg-dark-950/80 hover:bg-dark-850 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {item.nameKn}
                          </p>
                          <p className="text-[10px] text-emerald-400 mt-0.5 font-mono">
                            ₹{item.price} • Stock: {item.stock}
                          </p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-800/60 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-300">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Cart */}
                <div className="p-4 rounded-xl bg-dark-950/90 border border-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-xs font-mono">
                    <span className="text-slate-300 font-bold uppercase">Active Checkout Register</span>
                    <span className="text-cyan-400">{cart.length} distinct item(s)</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs font-mono">
                      Cart is empty. Click any item above to simulate instant barcode add.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-850 text-xs">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-medium text-slate-200 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-5 text-center text-white">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-cyan-300 w-14 text-right">
                              ₹{item.price * item.qty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary & Checkout Action */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (5% SGST + CGST):</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-slate-800">
                      <span>Grand Total:</span>
                      <span className="text-emerald-400 font-mono">₹{grandTotal}</span>
                    </div>

                    {/* Payment Mode Selector */}
                    <div className="pt-3 flex gap-2">
                      <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          paymentMethod === 'upi' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Dynamic UPI QR
                      </button>
                      <button
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          paymentMethod === 'cash' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Cash Counter
                      </button>
                      <button
                        onClick={() => setPaymentMethod('khata')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          paymentMethod === 'khata' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Khata (Credit)
                      </button>
                    </div>

                    <button
                      disabled={cart.length === 0}
                      onClick={handleCheckout}
                      className="w-full mt-3 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-dark-950 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all disabled:opacity-40"
                    >
                      {paymentSuccess ? '✓ Transaction Settled & Logged' : `Process Payment (₹${grandTotal})`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Groq LLaMA 3.3 AI Business Assistant (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">StockBridge AI Assistant</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Groq LLaMA 3.3 70B • Context-Aware</p>
                    </div>
                  </div>

                  {/* AI Output Terminal View */}
                  <div className="mt-4 p-3.5 rounded-xl bg-dark-900 border border-slate-800 font-mono text-xs text-slate-300 min-h-[160px] whitespace-pre-line leading-relaxed">
                    {isAiThinking ? (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Aggregating real-time ledger metrics...</span>
                      </div>
                    ) : (
                      aiAssistantReply
                    )}
                  </div>

                  {/* Quick Preset Query Chips */}
                  <div className="mt-4">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Suggested Real-World Prompts:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handleAiAsk("What was today's gross profit and revenue?")}
                        className="text-left text-xs p-2 rounded-lg bg-dark-900/80 hover:bg-slate-800/80 border border-slate-800 text-cyan-300 transition-colors"
                      >
                        → "What was today's gross profit and revenue?"
                      </button>
                      <button
                        onClick={() => handleAiAsk("Which products breached low-stock thresholds?")}
                        className="text-left text-xs p-2 rounded-lg bg-dark-900/80 hover:bg-slate-800/80 border border-slate-800 text-emerald-300 transition-colors"
                      >
                        → "Which products breached low-stock thresholds?"
                      </button>
                      <button
                        onClick={() => handleAiAsk("Translate current bill summary to Kannada")}
                        className="text-left text-xs p-2 rounded-lg bg-dark-900/80 hover:bg-slate-800/80 border border-slate-800 text-amber-300 transition-colors"
                      >
                        → "Translate current bill summary to Kannada"
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  Runs with multi-turn memory &amp; live shop schema injection.
                </div>
              </div>
            </div>

            {/* UPI QR Simulation Modal */}
            {showUpiModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-in fade-in">
                <div className="w-full max-w-sm rounded-2xl bg-dark-900 border border-slate-700 p-6 text-center space-y-4 shadow-2xl">
                  <div className="inline-flex p-3 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">Dynamic UPI QR Code</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Scan with PhonePe, Google Pay, or Paytm
                  </p>
                  <div className="p-4 bg-white rounded-xl max-w-fit mx-auto shadow-inner">
                    <div className="w-36 h-36 border-4 border-slate-900 border-dashed rounded-lg flex items-center justify-center text-dark-950 font-mono font-bold text-xs">
                      UPI: ₹{grandTotal}
                    </div>
                  </div>
                  <p className="text-xs font-mono text-emerald-400 animate-pulse">
                    Waiting for customer app confirmation...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* LAB CONTAINER 2: Aria Desktop AI Companion */}
        {/* ============================================================== */}
        {activeTab === 'aria' && (
          <div className="rounded-2xl bg-dark-900 border border-slate-800 p-6 lg:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
                  Electron • React • SQLite Vector Store • Whisper STT • Piper TTS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Aria: Transparent Desktop AI Agent Pipeline
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Multi-Model Auto-Fallback Engine</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              
              {/* Left Column: Avatar Overlay & Model Router (5 cols) */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-dark-950 border border-slate-800 flex flex-col items-center justify-between space-y-4">
                
                {/* Character Preview Canvas Simulation */}
                <div className="relative w-full aspect-square max-w-[280px] rounded-2xl bg-gradient-to-b from-purple-950/20 via-dark-900 to-dark-950 border border-purple-500/30 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Floating Aria Avatar Image */}
                  <img
                    src={`/images/aria/${ariaEmotion === 'idle' ? 'idle.png' : ariaEmotion === 'happy' ? 'emotion_happy.png' : ariaEmotion === 'thinking' ? 'emotion_thinking.png' : 'emotion_smug.png'}`}
                    alt="Aria Desktop AI Companion Avatar"
                    className="w-48 h-48 object-contain transition-transform duration-300 filter drop-shadow-[0_10px_20px_rgba(139,92,246,0.3)] animate-float"
                  />

                  {/* Status Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 py-1 px-2.5 rounded-lg bg-dark-950/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-purple-300 flex items-center justify-between">
                    <span>State: {ariaEmotion.toUpperCase()}</span>
                    <span className="text-emerald-400">FPS: 60.0</span>
                  </div>
                </div>

                {/* Emotion Switcher */}
                <div className="w-full">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 text-center">
                    Simulate Character Expression State:
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['idle', 'happy', 'thinking', 'smug'] as const).map((em) => (
                      <button
                        key={em}
                        onClick={() => setAriaEmotion(em)}
                        className={`py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
                          ariaEmotion === em
                            ? 'bg-purple-500/20 border border-purple-400 text-purple-300 shadow-sm'
                            : 'bg-dark-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Router Selector */}
                <div className="w-full pt-3 border-t border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Active Orchestration Routing:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setAriaModel('gemini')}
                      className={`p-2 rounded-lg border text-left ${
                        ariaModel === 'gemini' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Gemini Flash (Vision)
                    </button>
                    <button
                      onClick={() => setAriaModel('groq')}
                      className={`p-2 rounded-lg border text-left ${
                        ariaModel === 'groq' ? 'bg-orange-500/20 border-orange-400 text-orange-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Groq LLaMA 3.1 (Fast)
                    </button>
                    <button
                      onClick={() => setAriaModel('claude')}
                      className={`p-2 rounded-lg border text-left ${
                        ariaModel === 'claude' ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Claude 3.5 (Logic)
                    </button>
                    <button
                      onClick={() => setAriaModel('ollama')}
                      className={`p-2 rounded-lg border text-left ${
                        ariaModel === 'ollama' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-dark-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Ollama 100% Offline
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: SQLite Vector Memory Search & Pipeline Trace (7 cols) */}
              <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs font-bold text-white font-mono">
                        SQLite Vector Memory Retrieval (Cosine Distance)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">better-sqlite3</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3">
                    Aria continuously embeds conversations into SQLite. When the user speaks, local embeddings perform semantic retrieval to reconstruct conversation memory before sending to the model.
                  </p>

                  {/* Search query simulator */}
                  <div className="mt-4 space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">
                      Test Vector Query:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vectorQuery}
                        onChange={(e) => setVectorQuery(e.target.value)}
                        placeholder="Search Aria's persistent memories..."
                        className="flex-1 bg-dark-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-400"
                      />
                      <button
                        onClick={() => handleVectorSearch(vectorQuery)}
                        className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                      >
                        Search
                      </button>
                    </div>

                    {/* Pre-canned prompts */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => handleVectorSearch("How does Aria operate 100% offline?")}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-dark-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                      >
                        Offline architecture?
                      </button>
                      <button
                        onClick={() => handleVectorSearch("How does vision mode inspect the screen?")}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-dark-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                      >
                        Vision mode details?
                      </button>
                      <button
                        onClick={() => handleVectorSearch("Nandeesh preferred engineering stack")}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-dark-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                      >
                        Preferred tech stack?
                      </button>
                    </div>
                  </div>

                  {/* Vector Match Result Box */}
                  {vectorResult && (
                    <div className="mt-4 p-4 rounded-xl bg-dark-950 border border-purple-500/30 font-mono text-xs space-y-2 shadow-inner">
                      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-800">
                        <span className="text-purple-300 font-bold">Top Cosine Match: {vectorResult.docId}</span>
                        <span className="text-emerald-400">Score: {(vectorResult.score * 100).toFixed(1)}% Match</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed text-xs">
                        "{vectorResult.text}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Pipeline Flow Telemetry */}
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>AUDIO STT (Whisper.cpp)</span>
                    <span className="text-emerald-400">Latency: 120ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[88%]" />
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1">
                    Complete Pipeline: Mic In → Whisper STT → Vector DB Recall → Model Inference → Piper TTS
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LAB CONTAINER 3: OCR Payment Extraction Pipeline */}
        {/* ============================================================== */}
        {activeTab === 'ocr' && (
          <div className="rounded-2xl bg-dark-900 border border-slate-800 p-6 lg:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  Python • PyMuPDF • Tesseract OCR • pandas • openpyxl
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  OCR Payment Extraction Pipeline &amp; Excel Automation
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Manual Entry • 100% Success Rate</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              
              {/* Left Column: Preset Receipts Selector & Simulation (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Select Bulk Receipt Sample:
                </p>
                <div className="space-y-2">
                  {ocrPresets.map((preset, idx) => (
                    <button
                      key={preset.utr}
                      onClick={() => runOcrScan(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        ocrPreset === idx
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-md'
                          : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-200">{preset.app}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400">
                            {preset.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-1">{preset.amount} • {preset.recipient}</p>
                        <p className="text-[10px] text-slate-500 font-mono">UTR: {preset.utr}</p>
                      </div>
                      <Eye className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>

                {/* Simulated Document Scanner Frame */}
                <div className="relative p-4 rounded-xl bg-dark-950 border border-slate-800 text-center overflow-hidden">
                  <div className="text-xs font-mono text-slate-400 mb-2">Simulated Receipt Screenshot Buffer</div>
                  <div className="relative w-48 h-32 mx-auto rounded-lg bg-slate-900 border border-slate-700/80 p-2 text-left font-mono text-[9px] text-slate-400 flex flex-col justify-between overflow-hidden shadow-inner">
                    {/* Laser Scanner Bar Animation */}
                    {isOcrScanning && (
                      <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_#00f2fe] animate-pulse transition-all top-1/2 -translate-y-1/2" />
                    )}
                    <div>
                      <p className="text-emerald-400 font-bold">{ocrPresets[ocrPreset].app} Receipt</p>
                      <p className="text-white text-xs font-bold mt-1">{ocrPresets[ocrPreset].amount}</p>
                      <p className="text-slate-300 truncate">Paid to: {ocrPresets[ocrPreset].recipient}</p>
                    </div>
                    <div className="text-[8px] text-slate-500">
                      Ref: {ocrPresets[ocrPreset].utr}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Structured Extraction Ledger Output (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      <span>Extracted Tabular Audit Record (pandas Schema)</span>
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400">
                      OCR Confidence: {ocrPresets[ocrPreset].confidence}
                    </span>
                  </div>

                  {/* Schema Key-Values */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Bank UTR / Ref Number:</p>
                      <p className="text-cyan-300 font-bold text-sm mt-0.5">{ocrPresets[ocrPreset].utr}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Settled Transaction Amount:</p>
                      <p className="text-emerald-300 font-bold text-sm mt-0.5">{ocrPresets[ocrPreset].amount}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Beneficiary Merchant / Payee:</p>
                      <p className="text-white font-medium truncate mt-0.5">{ocrPresets[ocrPreset].recipient}</p>
                      <p className="text-[10px] text-slate-400">{ocrPresets[ocrPreset].vpa}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Timestamp (ISO 8601):</p>
                      <p className="text-white font-medium mt-0.5">{ocrPresets[ocrPreset].date}</p>
                    </div>
                  </div>

                  {/* Regex Heuristic Parser Verification */}
                  <div className="mt-4 p-3.5 rounded-xl bg-dark-950/70 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Deterministic Validation Passed</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      • UTR 12-digit format verified against NPCI checksum algorithm.<br />
                      • Amount regex matched with currency symbol boundary normalization.<br />
                      • Zero manual intervention required; appended to audit workbook.
                    </p>
                  </div>
                </div>

                {/* Download Simulated CSV / Excel Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Export target: audit_report_2026.xlsx</span>
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        "App,UTR,Amount,Recipient,VPA,Date,Status\n" +
                        `${ocrPresets[ocrPreset].app},${ocrPresets[ocrPreset].utr},${ocrPresets[ocrPreset].amount},${ocrPresets[ocrPreset].recipient},${ocrPresets[ocrPreset].vpa},${ocrPresets[ocrPreset].date},SUCCESS`;
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `transaction_${ocrPresets[ocrPreset].utr}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Audit CSV</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LAB CONTAINER 4: Chargeback Dispute Copilot */}
        {/* ============================================================== */}
        {activeTab === 'dispute' && (
          <div className="rounded-2xl bg-dark-900 border border-slate-800 p-6 lg:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  FastAPI • Scikit-learn Win-Score Model • 10-Step AI Rebuttal Agent
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Chargeback &amp; Dispute Copilot: Evidence Intelligence
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Specialized for Cloud Kitchens (RJ Kitchen)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              
              {/* Left Column: Case Facts & Evidence Toggle Switches (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-amber-400 font-bold">DISPUTE: #DISP-94812</span>
                    <span className="text-red-400 font-bold">Issuer Deadline: 48h Remaining</span>
                  </div>
                  <div className="mt-2 space-y-1 text-slate-300">
                    <p><span className="text-slate-500">Order ID:</span> RJ-2026-8492 (Butter Chicken Biryani + Kulcha)</p>
                    <p><span className="text-slate-500">Claim Amount:</span> ₹1,640.00 (UPI Payment)</p>
                    <p><span className="text-slate-500">Dispute Reason:</span> Cardholder claims "Order Never Delivered"</p>
                  </div>
                </div>

                {/* Evidence Vault Switches */}
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Evidence Intelligence Vault (Toggle to Re-Score):
                  </p>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={hasPodProof}
                          onChange={(e) => setHasPodProof(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-500 bg-dark-900 border-slate-700 focus:ring-0"
                        />
                        <div>
                          <p className="font-semibold text-white">Courier Proof of Delivery (POD Photo)</p>
                          <p className="text-[10px] text-slate-400 font-mono">Timestamped doorstep photo with geo-tag</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-cyan-400">+28 pts</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={hasOtpProof}
                          onChange={(e) => setHasOtpProof(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-500 bg-dark-900 border-slate-700 focus:ring-0"
                        />
                        <div>
                          <p className="font-semibold text-white">Customer Delivery OTP Verification</p>
                          <p className="text-[10px] text-slate-400 font-mono">SMS OTP entered at recipient door</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-emerald-400">+24 pts</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={hasGpsTelemetry}
                          onChange={(e) => setHasGpsTelemetry(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-500 bg-dark-900 border-slate-700 focus:ring-0"
                        />
                        <div>
                          <p className="font-semibold text-white">Delivery Partner GPS Proximity Match</p>
                          <p className="text-[10px] text-slate-400 font-mono">Rider within 18m of delivery coordinates</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-purple-400">+15 pts</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={hasKotSlip}
                          onChange={(e) => setHasKotSlip(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-500 bg-dark-900 border-slate-700 focus:ring-0"
                        />
                        <div>
                          <p className="font-semibold text-white">Itemized KOT &amp; Kitchen Prep Log</p>
                          <p className="text-[10px] text-slate-400 font-mono">Chef timestamped packaging record</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-amber-400">+8 pts</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Explainable ML Win-Probability & Rebuttal Preview (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Explainable ML Win-Score Model
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800">
                      Scikit-learn LogisticRegression
                    </span>
                  </div>

                  {/* Big Gauge Indicator */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400">Predicted Case Win Probability:</p>
                      <h4 className={`text-4xl font-extrabold font-mono mt-1 ${
                        winProbability >= 70 ? 'text-emerald-400' : winProbability >= 45 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {winProbability}%
                      </h4>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        winProbability >= 70 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {winProbability >= 70 ? 'High Likelihood of Reversal' : 'Contest with Caution'}
                      </span>
                    </div>
                  </div>

                  {/* Probability Meter Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        winProbability >= 70 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-gradient-to-r from-red-500 to-amber-400'
                      }`}
                      style={{ width: `${winProbability}%` }}
                    />
                  </div>

                  {/* 10-Step AI Rebuttal Summary */}
                  <div className="p-3.5 rounded-lg bg-dark-900 border border-slate-850 text-xs font-mono text-slate-300 space-y-1 leading-relaxed">
                    <p className="text-cyan-400 font-bold mb-1">Generated Razorpay Contest Summary (≤1,000 chars):</p>
                    <p className="text-[11px] text-slate-300">
                      "Merchant RJ Kitchen refutes customer dispute #DISP-94812. Order #RJ-2026-8492 was successfully fulfilled. {hasOtpProof ? 'Recipient verified delivery with 4-digit SMS OTP #4912.' : ''} {hasGpsTelemetry ? 'Delivery rider GPS telematics confirms arrival within 18m geofence.' : ''} {hasPodProof ? 'Timestamped doorstep photograph uploaded in Evidence Vault.' : ''} Requesting immediate dispute reversal in merchant favor."
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-500 text-center">
                  Live evidence compilation • Tested with mock payment gateway webhooks.
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
