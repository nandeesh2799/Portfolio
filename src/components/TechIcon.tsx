import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'Python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M11.91 2C6.83 2 7.15 4.2 7.15 4.2l.01 2.29h4.86v.69H5.16S2 6.8 2 11.93c0 5.12 2.76 4.93 2.76 4.93h1.65v-2.31s-.09-2.76 2.71-2.76h4.69s2.61.04 2.61-2.52V4.57S16.99 2 11.91 2zm-2.6 1.45a.96.96 0 110 1.91.96.96 0 010-1.91z"
            fill="#387EB8"
          />
          <path
            d="M12.09 22c5.08 0 4.76-2.2 4.76-2.2l-.01-2.29h-4.86v-.69h6.86S22 17.2 22 12.07c0-5.12-2.76-4.93-2.76-4.93h-1.65v2.31s.09 2.76-2.71 2.76h-4.69s-2.61-.04-2.61 2.52v4.7S7.01 22 12.09 22zm2.6-1.45a.96.96 0 110-1.91.96.96 0 010-1.91z"
            fill="#FFE052"
          />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path
            d="M6.5 18.2l2.3-1.4c.5.8 1 1.4 1.9 1.4.9 0 1.5-.4 1.5-1.5v-7.1h2.8v7.2c0 2.6-1.5 3.8-3.9 3.8-2.1 0-3.4-1.1-4.6-2.4zm8.6-.2l2.2-1.3c.6.9 1.4 1.6 2.6 1.6 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.3-2-1.9l-.7-.3c-2-.9-3.3-2-3.3-4.3 0-2.1 1.6-3.8 4.2-3.8 1.8 0 3.2.7 4.1 2.4l-2.1 1.4c-.5-.9-1.1-1.3-2-1.3-.9 0-1.5.5-1.5 1.2 0 .8.6 1.2 1.8 1.7l.7.3c2.4 1 3.6 2.1 3.6 4.5 0 2.6-2 4-4.5 4-2.6.1-4.2-1.2-4.9-2.7z"
            fill="#000000"
          />
        </svg>
      );

    case 'Java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M8.8 17.5s-1.8.4-.7 1.4c1.3 1.1 3.4 1.1 5.5.6 2.1-.5 4.8-.3 4.8-.3s-.8-.7-2.3-.7c-2-.1-5.1-.3-7.3-1zm-1.2-2.8s-2.1.6-.7 1.7c1.7 1.3 4.8 1.1 7.2.7 2.4-.4 5.3 0 5.3 0s-.9-1-2.9-1c-2.4 0-6-.4-8.9-1.4zm5.8-4.6c.7 1-.4 2.2-.4 2.2s2.6-1.3 1.4-2.9c-1.1-1.5-2.2-2.2-4.4-3.4-1.2-.7-1.1-1.6-1.1-1.6s-.5.8.5 1.6c1.6 1.2 2.6 2.5 4 4.1zm5.2 6.5c-.7 0-3.3.4-6.4.7-3.6.3-8.1-.1-8.1-.1s1.3.8 3.5 1.1c3.5.5 8.1.3 10.4-.6 2.2-.9.6-1.1.6-1.1zm-4.3-14.8c.8 1-.5 2.2-.5 2.2s2.6-1.3 1.4-2.9C14 2.4 12.8 1.7 10.7.5c-1.2-.6-1.1-1.5-1.1-1.5s-.6.8.5 1.6c1.5 1.1 2.6 2.5 4.2 4.1zM5 20.8s1.6.8 4.6.9c3.8.2 9.2-.1 11.2-1.2 0 0-.6.5-1.9.8-2.5.5-6.6.6-9.6.3-2.6-.2-4.3-.8-4.3-.8z"
            fill="#E76F00"
          />
          <path d="M14.5 11.5s2.4-.7 1.3-2.3c-1-1.5-2-2.2-4.1-3.4-1.1-.6-1-1.5-1-1.5s-.5.8.5 1.6c1.5 1.1 2.5 2.5 3.3 5.6z" fill="#5382A1" />
        </svg>
      );

    case 'Dart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4.1 4.1L12 12l5.7-9.4L6.6 2 4.1 4.1z" fill="#0081C6" />
          <path d="M12 12l7.9 7.9 2.1-2.5V6.3L12 12z" fill="#00B4AB" />
          <path d="M4.1 4.1v11.1l5.4 5.4 4.6-2.6L12 12 4.1 4.1z" fill="#01579B" />
          <path d="M9.5 20.6l2.5 2.1 7.9-7.9-2-2-8.4 7.8z" fill="#29B6F6" />
        </svg>
      );

    case 'SQL':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00F5FF" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="#00F5FF" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#00F5FF" />
        </svg>
      );

    case 'HTML/CSS':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#E44D26" />
          <path d="M12 3.8v17.3l5.8-2.2L19.2 3.8H12z" fill="#F16529" />
          <path d="M12 7.7H7.7l.2 2.3h4.1V7.7zm0 4.6H7.9l.3 3.1 3.8 1.1v-2.3l-2-.6-.1-1.3h2.1V12.3zm0-4.6h4.3l-.4 4.6h-3.9v2.2l2.1-.6.1-1.2h2.2l-.3 3.1-4.1 1.1V7.7z" fill="#FFFFFF" />
        </svg>
      );

    case 'React':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case 'Node.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#68A063">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          <circle cx="12" cy="12" r="3" fill="#68A063" />
        </svg>
      );

    case 'Express.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 17l6-10M10 7l6 10M14 13h6M17 10v6" stroke="#FFFFFF" />
        </svg>
      );

    case 'Flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M13.8 2.5L3.5 12.8l3.2 3.2L20.2 2.5H13.8z" fill="#42A5F5" />
          <path d="M13.8 13.5l-4.5 4.5 4.5 4.5h6.4l-7.7-7.7 1.3-1.3z" fill="#0D47A1" />
          <path d="M9.3 18l3.2 3.2 1.3-1.3-3.2-3.2-1.3 1.3z" fill="#42A5F5" />
        </svg>
      );

    case 'Streamlit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#FF4B4B">
          <path d="M14.5 3L8 14.5h6L9.5 21 21 9.5h-6.5L18 3h-3.5z" />
        </svg>
      );

    case 'MongoDB':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 6 8.5 6 14.2c0 3.7 2.7 6.8 6 7.8 3.3-1 6-4.1 6-7.8C18 8.5 12 2 12 2z"
            fill="#47A248"
          />
          <path d="M12 2v20c-.2 0-.4 0-.6-.1V2.3c.2-.1.4-.2.6-.3z" fill="#FFFFFF" opacity="0.3" />
        </svg>
      );

    case 'SQLite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="20" height="20" x="2" y="2" rx="4" fill="#003B57" />
          <path d="M6 16c0-4 3-7 7-7 2.5 0 4.5 1.2 5.5 3l-2 1.2c-.7-1.3-2-2-3.5-2-2.8 0-4.8 2.1-4.8 4.8s2 4.8 4.8 4.8c1.5 0 2.8-.7 3.5-2l2 1.2c-1 1.8-3 3-5.5 3-4 0-7-3-7-7z" fill="#00F5FF" />
        </svg>
      );

    case 'Firebase Firestore':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4.5 18.5L6.8 4.3l4.5 8.2-6.8 6z" fill="#FFA000" />
          <path d="M13.8 8.8l-2.5-4.7L4.5 18.5l9.3-9.7z" fill="#F57C00" />
          <path d="M19.5 18.5L12 22l-7.5-3.5L12 2l7.5 16.5z" fill="#FFCA28" />
        </svg>
      );

    case 'Claude API':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#D97757">
          <circle cx="12" cy="12" r="9" fill="#D97757" opacity="0.2" stroke="#D97757" strokeWidth="1.5" />
          <path d="M9 14.5l3-6 3 6M10.2 12.5h3.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'Gemini':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 7.52 7.52 12 2 12c5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z"
            fill="url(#gemini_grad)"
          />
          <defs>
            <linearGradient id="gemini_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3" />
              <stop offset="0.5" stopColor="#5B7FE8" />
              <stop offset="1" stopColor="#9B66E9" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'Groq':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#F55036" strokeWidth="2" />
          <path d="M12 7v5l4 2" stroke="#F55036" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'Ollama':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8">
          <rect x="4" y="6" width="16" height="13" rx="3" />
          <circle cx="9" cy="11" r="1.5" fill="#FFFFFF" />
          <circle cx="15" cy="11" r="1.5" fill="#FFFFFF" />
          <path d="M10 15h4" strokeLinecap="round" />
          <path d="M12 3v3" strokeLinecap="round" />
        </svg>
      );

    case 'OpenAI/GPT':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#10A37F">
          <path d="M20.5 10.2c-.2-.9-.7-1.7-1.4-2.3.1-.7 0-1.4-.4-2-.5-.8-1.4-1.3-2.3-1.4-.6-.6-1.5-.9-2.4-.8-.4-.7-1.1-1.3-1.9-1.6-1.1-.4-2.3-.2-3.2.5-.7-.4-1.6-.5-2.4-.2-.8.3-1.5.9-1.8 1.7-.8.2-1.5.7-2 1.4-.5.8-.6 1.7-.3 2.6-.7.5-1.1 1.3-1.2 2.1-.2 1 .1 2 .8 2.7-.2.9 0 1.8.4 2.6.5.8 1.4 1.4 2.3 1.5.6.6 1.4.9 2.3.9.4.7 1.1 1.3 1.9 1.6 1.1.4 2.3.3 3.3-.4.7.4 1.6.5 2.4.2.8-.3 1.5-.9 1.8-1.7.8-.2 1.5-.7 2-1.4.5-.8.6-1.7.3-2.6.7-.5 1.1-1.3 1.2-2.1.2-1-.1-2-.7-2.8z" />
        </svg>
      );

    case 'Whisper STT':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      );

    case 'Piper TTS':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A970FF" strokeWidth="2" strokeLinecap="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );

    case 'RAG / Vector Memory':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#39FF88" strokeWidth="1.8">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5l7 7M15.5 7.5l-7 7" strokeDasharray="2 2" />
        </svg>
      );

    case 'Agent Architecture':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FF4FD8" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M6.5 10v2a2 2 0 002 2h7a2 2 0 002-2v-2M12 14v-2" strokeLinecap="round" />
        </svg>
      );

    case 'Prompt Engineering':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      );

    case 'Linux (Zorin OS & Kali Linux)':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#1793D1" opacity="0.2" stroke="#1793D1" strokeWidth="1.5" />
          <path d="M12 5.5l5 12H7l5-12z" stroke="#00F5FF" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
          <circle cx="12" cy="13" r="1.5" fill="#39FF88" />
        </svg>
      );

    case 'Triple Boot Management':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#39FF88" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <line x1="8" y1="20" x2="16" y2="20" />
          <line x1="12" y1="16" x2="12" y2="20" />
          <circle cx="7" cy="10" r="1" fill="#39FF88" />
          <circle cx="12" cy="10" r="1" fill="#00F5FF" />
          <circle cx="17" cy="10" r="1" fill="#A970FF" />
        </svg>
      );

    case 'Git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F05032">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9 4.4l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.5-.3-2.2L12.9 10v5.3c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V9.7c-.2-.1-.4-.3-.6-.5-.6-.6-.7-1.5-.3-2.2L7.9 4.4 2.4 9.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.5.6-1.4 0-2z" />
        </svg>
      );

    case 'GitHub':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#FFFFFF">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'VS Code':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M17.5 2.5l-9.3 8.7L4 8l-2 1.3 4 3.7-4 3.7 2 1.3 4.2-3.2 9.3 8.7 4.5-2.2V4.7L17.5 2.5z" fill="#007ACC" />
          <path d="M17.5 2.5l-9.3 8.7 9.3 8.8V2.5z" fill="#0065A9" opacity="0.6" />
        </svg>
      );

    case 'Android Studio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#3DDC84">
          <path d="M7 8.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm10 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM6 14h12v4c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-4z" />
          <path d="M15.5 4.5l1.8-2.3c.2-.3.1-.6-.2-.8-.3-.2-.6-.1-.8.2l-1.9 2.5c-.7-.3-1.6-.4-2.4-.4-.8 0-1.7.1-2.4.4L7.7 1.6c-.2-.3-.5-.4-.8-.2-.3.2-.4.5-.2.8L8.5 4.5C5.8 5.8 4 8.7 4 12h16c0-3.3-1.8-6.2-4.5-7.5z" />
        </svg>
      );

    case 'Jupyter Notebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 4c-4.4 0-8 1.8-8 4s3.6 4 8 4 8-1.8 8-4-3.6-4-8-4z" fill="#F37626" opacity="0.8" />
          <path d="M12 12c-4.4 0-8 1.8-8 4s3.6 4 8 4 8-1.8 8-4-3.6-4-8-4z" fill="#545454" opacity="0.8" />
          <circle cx="5" cy="5" r="1.5" fill="#F37626" />
          <circle cx="19" cy="19" r="1.5" fill="#545454" />
        </svg>
      );

    case 'REST APIs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#39FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h.01M10 12h.01M14 12h4" />
        </svg>
      );

    default:
      return <span className="w-1.5 h-1.5 rounded-full bg-terminal-green shrink-0" />;
  }
};
