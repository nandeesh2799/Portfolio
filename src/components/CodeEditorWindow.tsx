import React, { useState } from 'react';
import { Code2, FileCode, Copy, Check, Terminal, Play } from 'lucide-react';

interface CodeSnippet {
  fileName: string;
  language: string;
  project: string;
  lines: string[];
}

export const CodeEditorWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const snippets: CodeSnippet[] = [
    {
      fileName: 'StockBridge_sync.ts',
      language: 'typescript',
      project: 'StockBridge POS',
      lines: [
        '// StockBridge Offline-First Batch Reconciler',
        'import { db } from "./indexedDb";',
        'import { verifyToken, signUpiQr } from "./security";',
        '',
        'export async function reconcileOfflineQueue(terminalId: string) {',
        '  const pendingSales = await db.salesQueue.where({ synced: false }).toArray();',
        '  if (pendingSales.length === 0) return { status: "IDLE", syncedCount: 0 };',
        '',
        '  console.log(`[SYNC] Processing ${pendingSales.length} offline receipts...`);',
        '  const results = await fetch("/api/v1/sales/batch-reconcile", {',
        '    method: "POST",',
        '    headers: { "Content-Type": "application/json", ...authHeader },',
        '    body: JSON.stringify({ terminalId, batch: pendingSales })',
        '  });',
        '',
        '  // Idempotent commit: Mark sales as reconciled',
        '  await db.salesQueue.bulkUpdate(pendingSales.map(s => ({ key: s.id, changes: { synced: true } })));',
        '  return { status: "COMPLETED", syncedCount: pendingSales.length };',
        '}'
      ]
    },
    {
      fileName: 'Aria_vector_memory.py',
      language: 'python',
      project: 'Aria Desktop AI',
      lines: [
        '# Aria Persistent Vector Memory Retrieval via SQLite',
        'import sqlite3',
        'import numpy as np',
        '',
        'def cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:',
        '    dot = np.dot(v1, v2)',
        '    return float(dot / (np.linalg.norm(v1) * np.linalg.norm(v2)))',
        '',
        'def retrieve_context(query_embedding: list[float], top_k: int = 3):',
        '    conn = sqlite3.connect("aria_memory.db")',
        '    cursor = conn.cursor()',
        '    cursor.execute("SELECT id, text, embedding FROM memories")',
        '    rows = cursor.fetchall()',
        '',
        '    scored = [',
        '        (row[0], row[1], cosine_similarity(query_embedding, np.frombuffer(row[2])))',
        '        for row in rows',
        '    ]',
        '    scored.sort(key=lambda x: x[2], reverse=True)',
        '    return scored[:top_k]'
      ]
    }
  ];

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="hypr-window rounded-xl overflow-hidden flex flex-col font-mono text-xs w-full h-full min-h-[380px]">
      {/* Titlebar & Tabs */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-bg-secondary border-b border-bg-tertiary select-none">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {snippets.map((s, idx) => (
            <button
              key={s.fileName}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === idx
                  ? 'bg-bg-tertiary text-terminal-cyan border-b-2 border-terminal-cyan font-semibold'
                  : 'text-muted hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3 h-3 text-terminal-green" />
              <span>{s.fileName}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 hover:text-terminal-cyan text-muted transition-colors flex items-center gap-1"
            title="Copy code snippet"
          >
            {copied ? <Check className="w-3 h-3 text-terminal-green" /> : <Copy className="w-3 h-3" />}
            <span className="text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 p-3.5 overflow-x-auto overflow-y-auto bg-[#0A0E17] text-slate-200 leading-relaxed font-mono select-text">
        <table className="w-full border-collapse">
          <tbody>
            {currentSnippet.lines.map((line, idx) => {
              // Lightweight syntax highlighting tokens
              let formattedLine = <span className="text-slate-300">{line}</span>;
              if (line.startsWith('//') || line.startsWith('#')) {
                formattedLine = <span className="text-muted/70 italic">{line}</span>;
              } else if (line.includes('import ') || line.includes('export ') || line.includes('def ') || line.includes('async function')) {
                formattedLine = (
                  <span>
                    <span className="text-terminal-purple font-semibold">{line.split(' ')[0]} </span>
                    <span className="text-slate-200">{line.slice(line.indexOf(' ') + 1)}</span>
                  </span>
                );
              } else if (line.includes('return ')) {
                formattedLine = (
                  <span>
                    <span className="text-terminal-pink font-semibold">return </span>
                    <span className="text-slate-200">{line.replace('return ', '')}</span>
                  </span>
                );
              }

              return (
                <tr key={idx} className="hover:bg-bg-secondary/40">
                  <td className="w-8 pr-4 text-right text-muted/40 select-none text-[10px]">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre">
                    {formattedLine}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Editor Status Bar */}
      <div className="px-3 py-1 bg-bg-secondary/90 border-t border-bg-tertiary flex items-center justify-between text-[10px] text-muted font-mono">
        <div className="flex items-center gap-3">
          <span className="text-terminal-green font-semibold">NORMAL</span>
          <span>{currentSnippet.language.toUpperCase()}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{currentSnippet.project}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-cyan" />
        </div>
      </div>
    </div>
  );
};
