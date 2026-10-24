import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X, RefreshCw, CornerDownLeft, FileText, Phone, Award } from 'lucide-react';
import { developerProfile, projectsData, skillGroups, educationData, certificationsData, achievementsData } from '../data/portfolioData';

interface TerminalComponentProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenResume?: () => void;
  isStandalone?: boolean;
  onClose?: () => void;
}

interface CommandEntry {
  command: string;
  output: React.ReactNode;
}

export const TerminalComponent: React.FC<TerminalComponentProps> = ({
  onNavigateSection,
  onOpenResume,
  isStandalone = false,
  onClose
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [entries, setEntries] = useState<CommandEntry[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  const availableCommands = [
    'help', 'whoami', 'neofetch', 'ls', 'ls projects/', 'cat about.txt',
    'cat skills.txt', 'cat resume.pdf', 'resume', 'phone', 'hackathon',
    'education', 'certs', 'pwd', 'cd projects', 'cd skills', 'cd about',
    'cd contact', './art.sh', 'sudo hire-me', 'clear', 'date', 'history'
  ];

  // Initial welcome message
  useEffect(() => {
    setEntries([
      {
        command: 'system-init',
        output: (
          <div className="text-slate-300 space-y-1">
            <p className="text-terminal-green font-bold">Welcome to NandeeshOS Shell (foot/zsh 5.9)</p>
            <p className="text-xs text-muted">Type <span className="text-terminal-cyan font-bold">help</span> to view available system commands, or <span className="text-terminal-green font-bold">neofetch</span> for profile details.</p>
          </div>
        )
      }
    ]);

    // Mark initial load as complete after a brief delay to allow layout to stabilize
    setTimeout(() => {
      isInitialLoadRef.current = false;
    }, 100);
  }, []);

  // Scroll to bottom on new entry (skip initial load)
  useEffect(() => {
    // Skip scrolling on initial load to prevent page scroll
    if (isInitialLoadRef.current) return;

    // Use direct scrollTop on the scroll container for more reliable internal scrolling
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [entries]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Update history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    let outputNode: React.ReactNode = null;

    switch (cmd.toLowerCase()) {
      case 'clear':
        setEntries([]);
        setInputVal('');
        return;

      case 'help':
        outputNode = (
          <div className="space-y-2 py-1">
            <p className="text-terminal-cyan font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div><span className="text-terminal-green font-semibold">whoami</span> - Developer summary &amp; identity</div>
              <div><span className="text-terminal-green font-semibold">neofetch</span> - System specs &amp; ASCII profile</div>
              <div><span className="text-terminal-green font-semibold">ls</span> - List files in current directory</div>
              <div><span className="text-terminal-green font-semibold">cat resume.pdf</span> - Launch or inspect resume</div>
              <div><span className="text-terminal-green font-semibold">ls projects/</span> - List all featured projects</div>
              <div><span className="text-terminal-green font-semibold">cat about.txt</span> - Print full biography</div>
              <div><span className="text-terminal-green font-semibold">cat skills.txt</span> - Print technical stack</div>
              <div><span className="text-terminal-green font-semibold">hackathon</span> - 1st Place AgriTech winner details</div>
              <div><span className="text-terminal-green font-semibold">education</span> - Academic background log</div>
              <div><span className="text-terminal-green font-semibold">certs</span> - Verified industry credentials</div>
              <div><span className="text-terminal-green font-semibold">phone</span> - Direct reach-out coordinates</div>
              <div><span className="text-terminal-green font-semibold">cd [about|skills|projects|contact]</span> - Jump to section</div>
              <div><span className="text-terminal-green font-semibold">./art.sh</span> - Launch generative art playground</div>
              <div><span className="text-terminal-green font-semibold">sudo hire-me</span> - Initiate hiring protocol</div>
              <div><span className="text-terminal-green font-semibold">clear</span> - Clear terminal scrollback</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-slate-200 space-y-1">
            <p><span className="text-terminal-green font-bold">{developerProfile.name}</span> — {developerProfile.role}</p>
            <p className="text-muted">{developerProfile.heroBio}</p>
            <p className="text-terminal-cyan text-xs">Location: {developerProfile.location} • Status: Available for Full-Time Roles</p>
          </div>
        );
        break;

      case 'neofetch':
        outputNode = (
          <div className="flex flex-col sm:flex-row gap-4 py-2 font-mono text-xs">
            {/* ASCII Arch Art */}
            <pre className="text-terminal-cyan font-bold leading-tight select-none">
{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}
            </pre>
            {/* System Info Fields */}
            <div className="space-y-1 text-slate-300">
              <p className="text-terminal-green font-bold text-sm">nand@nandeesh-workstation</p>
              <div className="h-px bg-bg-tertiary w-full my-1" />
              <p><span className="text-terminal-cyan font-semibold">OS:</span> NandeeshOS (Triple Boot: Zorin OS + Kali Linux + Windows)</p>
              <p><span className="text-terminal-cyan font-semibold">Host:</span> Developer Workstation</p>
              <p><span className="text-terminal-cyan font-semibold">Kernel:</span> 6.8.0-zen1-1-zen (x86_64)</p>
              <p><span className="text-terminal-cyan font-semibold">Uptime:</span> 42 days, 13 hours, 37 mins</p>
              <p><span className="text-terminal-cyan font-semibold">Shell:</span> zsh 5.9 (x86_64-pc-linux-gnu)</p>
              <p><span className="text-terminal-cyan font-semibold">WM:</span> Hyprland (Wayland)</p>
              <p><span className="text-terminal-cyan font-semibold">Theme:</span> Cyberpunk Obsidian [GTK3]</p>
              <p><span className="text-terminal-cyan font-semibold">Terminal:</span> foot-terminal</p>
              <p><span className="text-terminal-cyan font-semibold">CPU:</span> AMD Ryzen 7 7840HS (16) @ 5.100GHz</p>
              <p><span className="text-terminal-cyan font-semibold">Memory:</span> 4182MiB / 32180MiB (13%)</p>
              <p><span className="text-terminal-cyan font-semibold">Interests:</span> {developerProfile.interests.join(', ')}</p>
              {/* Color Blocks */}
              <div className="flex gap-1.5 pt-2">
                <span className="w-3 h-3 rounded-sm bg-black" />
                <span className="w-3 h-3 rounded-sm bg-terminal-green" />
                <span className="w-3 h-3 rounded-sm bg-terminal-cyan" />
                <span className="w-3 h-3 rounded-sm bg-terminal-purple" />
                <span className="w-3 h-3 rounded-sm bg-terminal-pink" />
                <span className="w-3 h-3 rounded-sm bg-terminal-amber" />
                <span className="w-3 h-3 rounded-sm bg-white" />
              </div>
            </div>
          </div>
        );
        break;

      case 'ls':
        outputNode = (
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="text-terminal-cyan font-bold">projects/</span>
            <span className="text-slate-300">about.txt</span>
            <span className="text-slate-300">skills.txt</span>
            <span className="text-terminal-green font-bold">art.sh*</span>
            <span className="text-terminal-purple">resume.pdf</span>
          </div>
        );
        break;

      case 'ls projects/':
      case 'ls projects':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-muted">total 4 directory nodes</p>
            {projectsData.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-terminal-cyan font-bold w-32">{p.id}/</span>
                <span className="text-slate-200">{p.title}</span>
                <span className="text-[10px] text-muted font-mono">[{p.category}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat about.txt':
        outputNode = (
          <div className="text-slate-300 space-y-2 py-1 text-xs leading-relaxed max-w-2xl">
            <p className="text-terminal-cyan font-semibold">=== ABOUT NANDESH NARAYAN KURUBAR ===</p>
            <p>{developerProfile.aboutBio}</p>
            <p className="text-muted">Education: {developerProfile.education}</p>
            <p className="text-terminal-green">Location: {developerProfile.location}</p>
          </div>
        );
        break;

      case 'cat skills.txt':
        outputNode = (
          <div className="space-y-3 py-1 text-xs">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <span className="text-terminal-cyan font-bold uppercase tracking-wider">{group.category}:</span>
                <p className="text-slate-300 mt-0.5">{group.skills.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat resume.pdf':
      case 'cat resume':
      case 'resume':
      case './resume':
        outputNode = (
          <div className="space-y-2 py-1 text-xs">
            <div className="flex items-center justify-between border-b border-bg-tertiary pb-1.5">
              <span className="text-terminal-green font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-terminal-cyan" />
                <span>NANDEESH NARAYAN KURUBAR — RESUME BRIEF</span>
              </span>
              <span className="text-terminal-cyan">[BCA 2026]</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Full-Stack Developer &amp; AI Engineer with hands-on experience building MERN applications and LLM-integrated products (StockBridge, Aria local-first agent, OCR pipeline, UPS Service).
            </p>
            <div className="text-slate-400 space-y-0.5">
              <p><span className="text-terminal-cyan font-semibold">Coordinates:</span> {developerProfile.email} • {developerProfile.phoneFormatted} • Bengaluru</p>
              <p><span className="text-terminal-cyan font-semibold">Target Roles:</span> {developerProfile.targetRoles.join(' • ')}</p>
            </div>
            {onOpenResume && (
              <p className="text-terminal-green pt-1">
                [ OK ] Launching zathura graphical document viewer modal...
              </p>
            )}
          </div>
        );
        if (onOpenResume) {
          setTimeout(() => onOpenResume(), 400);
        }
        break;

      case 'phone':
      case 'contact':
      case 'whatsapp':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-terminal-cyan font-bold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-terminal-green" />
              <span>Direct Coordinates:</span>
            </p>
            <p className="text-slate-200">Phone: <span className="text-white font-bold">{developerProfile.phoneFormatted}</span></p>
            <p className="text-slate-200">Email: <span className="text-white font-bold">{developerProfile.email}</span></p>
            <p className="text-slate-200">WhatsApp: <a href={developerProfile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-terminal-green underline">{developerProfile.phoneFormatted} (Open Chat)</a></p>
            <p className="text-muted">Location: {developerProfile.location}</p>
          </div>
        );
        break;

      case 'hackathon':
      case 'agritech':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-terminal-amber font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>1st Place Winner — Inter-College Hackathon (2024)</span>
            </p>
            <p className="text-slate-200 font-sans leading-relaxed">
              Architected an AgriTech farming-assistance web platform with market price telemetry, automated crop disease identification, and farmer price advisories.
            </p>
            <p className="text-terminal-green">Result: Ranked #1 among all competing college developer teams.</p>
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="space-y-2 py-1 text-xs">
            <p className="text-terminal-cyan font-bold">Academic Dossier:</p>
            {educationData.map((edu, i) => (
              <div key={i} className="border-l-2 border-terminal-cyan/40 pl-2.5 space-y-0.5">
                <p className="text-white font-bold">{edu.degree} <span className="text-terminal-green text-[10px]">({edu.period})</span></p>
                <p className="text-muted text-[11px]">{edu.institution}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-terminal-purple font-bold">Verified Industry Certifications:</p>
            {certificationsData.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-0.5 border-b border-bg-tertiary/40">
                <span className="text-slate-200">{c.title} — <span className="text-muted">{c.issuer}</span></span>
                <span className="text-terminal-green text-[10px] font-bold">[{c.status}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'pwd':
        outputNode = <p className="text-terminal-green font-mono">/home/nand</p>;
        break;

      case 'cd projects':
      case 'cd /projects':
        outputNode = <p className="text-terminal-cyan">Navigating to /projects workspace...</p>;
        if (onNavigateSection) onNavigateSection('projects');
        break;

      case 'cd skills':
      case 'cd /skills':
        outputNode = <p className="text-terminal-cyan">Navigating to /skills workspace...</p>;
        if (onNavigateSection) onNavigateSection('skills');
        break;

      case 'cd about':
      case 'cd /about':
        outputNode = <p className="text-terminal-cyan">Navigating to /about workspace...</p>;
        if (onNavigateSection) onNavigateSection('about');
        break;

      case 'cd contact':
      case 'cd /contact':
        outputNode = <p className="text-terminal-cyan">Navigating to /contact workspace...</p>;
        if (onNavigateSection) onNavigateSection('contact');
        break;

      case 'cd':
      case 'cd ~':
      case 'cd ..':
        outputNode = <p className="text-muted">Returned to root /home/nand</p>;
        break;

      case './art.sh':
      case 'sh art.sh':
      case 'bash art.sh':
        outputNode = (
          <div className="text-terminal-purple space-y-1">
            <p className="font-bold">[ OK ] Initializing HTML5 generative art engine &amp; canvas playground...</p>
            <p className="text-slate-300 text-xs">Switching to creative art workspace.</p>
          </div>
        );
        if (onNavigateSection) onNavigateSection('art');
        break;

      case 'sudo hire-me':
      case 'hire-me':
        outputNode = (
          <div className="text-slate-200 space-y-1.5 py-1">
            <p className="text-terminal-green font-bold">[sudo] password for visitor: **********</p>
            <p className="text-terminal-cyan font-semibold">Permission granted! Candidate status: EXCELLENT_MATCH.</p>
            <p className="text-xs text-muted">BCA 2026 • Full-Stack &amp; Applied AI • Immediate Impact • High Agency</p>
            <p className="text-xs text-terminal-purple">Redirecting to contact terminal...</p>
          </div>
        );
        if (onNavigateSection) {
          setTimeout(() => onNavigateSection('contact'), 600);
        }
        break;

      case 'date':
        outputNode = <p className="text-slate-300">{new Date().toString()}</p>;
        break;

      case 'history':
        outputNode = (
          <div className="space-y-0.5 text-xs text-slate-400">
            {history.map((h, i) => (
              <div key={i}><span className="text-muted w-6 inline-block">{i + 1}</span> {h}</div>
            ))}
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-terminal-red text-xs">
            <p>zsh: command not found: {cmd}</p>
            <p className="text-muted mt-0.5">Type <span className="text-terminal-cyan font-bold">help</span> to view available commands.</p>
          </div>
        );
        break;
    }

    setEntries((prev) => [...prev, { command: rawCmd, output: outputNode }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputVal.trim().toLowerCase();
      if (!val) return;
      const match = availableCommands.find((c) => c.startsWith(val));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div 
      className={`hypr-window rounded-xl overflow-hidden flex flex-col font-mono text-xs ${
        isMaximized 
          ? 'fixed inset-4 z-50 shadow-2xl' 
          : isStandalone 
            ? 'w-full h-[520px]' 
            : 'w-full h-full min-h-[380px]'
      }`}
      onClick={handleFocus}
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-bg-secondary border-b border-bg-tertiary select-none">
        <div className="flex items-center gap-2">
          {/* Mac / Linux traffic dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-red/80 hover:opacity-100 transition-opacity cursor-pointer" onClick={onClose} />
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-amber/80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-green/80 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
          <span className="text-[11px] text-muted ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-terminal-green" />
            <span>nand@portfolio:~ (zsh)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted">
          <button 
            onClick={() => setEntries([])}
            className="p-1 hover:text-terminal-cyan transition-colors"
            title="Clear Terminal Output"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-terminal-green transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1 hover:text-terminal-red transition-colors"
              title="Close Window"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Scrollback Body */}
      <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#080B10]/95 terminal-select">
        {entries.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-terminal-cyan font-bold">
              <span>nand@portfolio:~$</span>
              <span className="text-slate-100 font-normal">{entry.command}</span>
            </div>
            <div className="pl-2 border-l border-bg-tertiary">
              {entry.output}
            </div>
          </div>
        ))}

        {/* Active Command Prompt Line */}
        <div className="flex items-center gap-2 pt-1 text-terminal-green">
          <span className="text-terminal-cyan font-bold whitespace-nowrap">nand@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-slate-100 focus:outline-none font-mono text-xs placeholder:text-muted/40"
            placeholder="Type 'help', 'neofetch', or 'cat about.txt'..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command prompt"
          />
          <span className="w-2 h-4 bg-terminal-green animate-blink shrink-0" aria-hidden="true" />
          <CornerDownLeft className="w-3 h-3 text-slate-600 shrink-0" />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer Bar */}
      <div className="px-3 py-1 bg-bg-secondary/70 border-t border-bg-tertiary flex items-center justify-between text-[10px] text-muted">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
          <span>UTF-8 // [Tab] Autocomplete // [↑↓] History</span>
        </span>
        <span className="text-terminal-cyan">NandeeshOS v2026</span>
      </div>
    </div>
  );
};
