import React, { useState, forwardRef } from 'react';
import {
  Terminal,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileDown,
  ArrowUpRight,
  Phone,
  MessageSquare,
  Sparkles,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface SectionProps {
  className?: string;
  onOpenResume?: () => void;
}

interface MailProviderInfo {
  providerName: string;
  composeUrl: string;
  isWebmail: boolean;
}

// Helper to route to specific webmail providers or default mail client
const getMailProviderInfo = (
  toEmail: string,
  fromEmail: string,
  senderName: string,
  rawSubject: string,
  message: string
): MailProviderInfo => {
  const domain = fromEmail.trim().split('@')[1]?.toLowerCase() || '';

  const subject = rawSubject.trim()
    ? `[Portfolio Contact] ${rawSubject.trim()}`
    : `[Portfolio Inquiry] from ${senderName.trim() || 'Collaborator'}`;

  const body = `Hi Nandeesh,

Name: ${senderName.trim()}
Email: ${fromEmail.trim()}

Subject: ${rawSubject.trim() || 'General Inquiry'}

Message:
${message.trim()}

---
Dispatched via NandeeshOS Portfolio Terminal`;

  const encTo = encodeURIComponent(toEmail);
  const encSub = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);

  // Google / Gmail
  if (domain === 'gmail.com' || domain === 'googlemail.com' || domain.endsWith('.google.com')) {
    return {
      providerName: 'Gmail',
      composeUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encTo}&su=${encSub}&body=${encBody}`,
      isWebmail: true
    };
  }

  // Microsoft Outlook / Hotmail / Live
  if (
    domain === 'outlook.com' ||
    domain === 'hotmail.com' ||
    domain === 'live.com' ||
    domain === 'msn.com' ||
    domain.endsWith('.outlook.com')
  ) {
    return {
      providerName: 'Outlook / Hotmail',
      composeUrl: `https://outlook.live.com/mail/0/deeplink/compose?to=${encTo}&subject=${encSub}&body=${encBody}`,
      isWebmail: true
    };
  }

  // Yahoo Mail
  if (domain.includes('yahoo.') || domain === 'ymail.com' || domain === 'myyahoo.com') {
    return {
      providerName: 'Yahoo Mail',
      composeUrl: `https://compose.mail.yahoo.com/?to=${encTo}&subj=${encSub}&body=${encBody}`,
      isWebmail: true
    };
  }

  // ProtonMail
  if (domain === 'proton.me' || domain === 'protonmail.com' || domain === 'pm.me') {
    return {
      providerName: 'ProtonMail',
      composeUrl: `https://mail.proton.me/compose?to=${encTo}&subject=${encSub}&body=${encBody}`,
      isWebmail: true
    };
  }

  // Zoho Mail
  if (domain.includes('zoho.')) {
    return {
      providerName: 'Zoho Mail',
      composeUrl: `https://mail.zoho.com/zm/#compose?to=${encTo}&subject=${encSub}&body=${encBody}`,
      isWebmail: true
    };
  }

  // Default Fallback -> System / App Mail Client
  return {
    providerName: 'Default Mail Client',
    composeUrl: `mailto:${encTo}?subject=${encSub}&body=${encBody}`,
    isWebmail: false
  };
};

export const ContactSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', onOpenResume }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [routedInfo, setRoutedInfo] = useState<{
    providerName: string;
    url: string;
    isWebmail: boolean;
  } | null>(null);

  const detectedProvider = formData.email.includes('@') && formData.email.split('@')[1]
    ? getMailProviderInfo(developerProfile.email, formData.email, formData.name, formData.subject, formData.message)
    : null;

  const copyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(developerProfile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    const providerInfo = getMailProviderInfo(
      developerProfile.email,
      formData.email,
      formData.name,
      formData.subject,
      formData.message
    );

    setRoutedInfo({
      providerName: providerInfo.providerName,
      url: providerInfo.composeUrl,
      isWebmail: providerInfo.isWebmail
    });

    setIsSubmitting(true);
    setSubmitStatus('success');

    // Open immediately in a NEW tab directly within the user click gesture.
    // Calling window.open synchronously here guarantees modern browsers treat it as a trusted user action.
    const newTab = window.open(providerInfo.composeUrl, '_blank', 'noopener,noreferrer');
    if (!newTab) {
      // Fallback anchor click with target="_blank" if window.open was restricted
      const anchor = document.createElement('a');
      anchor.href = providerInfo.composeUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`py-12 sm:py-16 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-green">
            <Terminal className="w-3.5 h-3.5" />
            <span>07 // TRANSMISSION // REACH_OUT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Initiate Contact &amp; Collaboration
          </h2>
          <p className="text-muted text-sm sm:text-base font-mono">
            Open for full-time software engineering roles, AI product development, and creative technology collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Credentials & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Target Roles Card */}
            <div className="hypr-window rounded-2xl p-4 bg-bg-card/70 border border-bg-tertiary space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-terminal-cyan font-bold">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>TARGET_ROLES // AVAILABILITY</span>
                </span>
                <span className="text-[10px] text-terminal-green bg-terminal-green/10 border border-terminal-green/30 px-2 py-0.5 rounded-full">
                  OPEN
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Seeking <strong className="text-white">Software Engineer</strong> or <strong className="text-white">AI/GenAI Engineer</strong> roles. BCA (2026) graduate with production full-stack MERN &amp; local-first agent engineering experience.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {developerProfile.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="px-2 py-0.5 rounded bg-bg-secondary text-terminal-green text-[10px] border border-bg-tertiary font-semibold"
                  >
                    + {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal Contact Window */}
            <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs">
              <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between">
                <span className="text-terminal-cyan font-bold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>echo $NANDEESH_COORDINATES</span>
                </span>
                <span className="text-[10px] text-terminal-green">[ONLINE]</span>
              </div>

              <div className="p-6 bg-bg-card/80 space-y-4">
                {/* Email Item */}
                <div className="space-y-1">
                  <span className="text-muted text-[10px] uppercase">Email Transmission:</span>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary border border-bg-tertiary">
                    <span className="text-slate-100 font-semibold text-xs truncate mr-2">
                      {developerProfile.email}
                    </span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-terminal-cyan transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-terminal-green" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Direct Phone / Call & WhatsApp */}
                <div className="space-y-1">
                  <span className="text-muted text-[10px] uppercase">Phone &amp; WhatsApp:</span>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary border border-bg-tertiary">
                    <div className="flex items-center gap-2 text-slate-100 font-semibold text-xs">
                      <Phone className="w-3.5 h-3.5 text-terminal-green" />
                      <span>{developerProfile.phoneFormatted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={copyPhone}
                        className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-terminal-cyan transition-colors"
                        title="Copy phone number"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-terminal-green" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                      </button>
                      <a
                        href={developerProfile.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-terminal-green text-[#080B10] font-bold text-[11px] hover:shadow-glow-green transition-all flex items-center gap-1"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <span className="text-muted text-[10px] uppercase">Geographic Node:</span>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-bg-secondary border border-bg-tertiary text-slate-200">
                    <MapPin className="w-4 h-4 text-terminal-pink shrink-0" />
                    <span>{developerProfile.location}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-1 pt-2">
                  <span className="text-muted text-[10px] uppercase">Verified Profiles:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={developerProfile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary hover:border-terminal-green/50 text-slate-200 hover:text-terminal-green transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span className="font-semibold text-xs">GitHub</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                    </a>

                    <a
                      href={developerProfile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary hover:border-terminal-cyan/50 text-slate-200 hover:text-terminal-cyan transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        <span className="font-semibold text-xs">LinkedIn</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                    </a>
                  </div>
                </div>

                {/* Resume Actions CTA */}
                <div className="pt-2">
                  <a
                    href="./resumes/Nandeesh_NK_Resume_AI.pdf"
                    download="Nandeesh_NK_Resume_AI.pdf"
                    className="w-full py-2.5 px-3 rounded-xl bg-terminal-green/10 hover:bg-terminal-green/20 border border-terminal-green/40 text-terminal-green font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Terminal Form (7 cols) */}
          <div className="lg:col-span-7 hypr-window rounded-2xl overflow-hidden font-mono text-xs">
            <div className="px-5 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
                <span className="font-bold text-white font-sans text-sm">Send Dispatch Message</span>
              </div>
              <span className="text-muted text-[11px]">POST /api/contact</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 bg-bg-card/90">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 block text-xs">Sender Name:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary border border-bg-tertiary focus:border-terminal-green focus:outline-none text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 block text-xs">Your Email Address:</label>
                    {detectedProvider && (
                      <span className="text-[10px] text-terminal-cyan bg-terminal-cyan/10 border border-terminal-cyan/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-terminal-cyan animate-pulse" />
                        <span>Route: {detectedProvider.providerName}</span>
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@gmail.com, name@outlook.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary border border-bg-tertiary focus:border-terminal-green focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 block text-xs">Subject / Role Opportunity:</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software Engineer or GenAI Project Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary border border-bg-tertiary focus:border-terminal-green focus:outline-none text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 block text-xs">Message Payload:</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your transmission or project inquiry here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary border border-bg-tertiary focus:border-terminal-green focus:outline-none text-white text-xs resize-none"
                />
              </div>

              {submitStatus === 'success' && routedInfo && (
                <div className="p-4 rounded-xl bg-terminal-green/10 border border-terminal-green/40 text-terminal-green space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Transmission Initialized! Redirected to {routedInfo.providerName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    A compose draft with your name, subject, and message has been prepared for <strong className="text-white">{developerProfile.email}</strong>.
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={routedInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terminal-green text-[#080B10] font-bold hover:shadow-glow-green transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open {routedInfo.providerName} in New Tab</span>
                    </a>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 rounded-xl bg-terminal-red/10 border border-terminal-red/40 text-terminal-red flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Validation Error: Please fill in your name, email, and message.</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-muted font-mono hidden sm:block">
                  {detectedProvider ? (
                    <span>Auto-routes to: <strong className="text-terminal-cyan">{detectedProvider.providerName}</strong></span>
                  ) : (
                    <span>Enter your email to route to Gmail, Outlook, Yahoo, etc.</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-terminal-green text-[#080B10] font-bold hover:shadow-glow-green transition-all flex items-center gap-2 disabled:opacity-50 text-xs focus-visible-ring focus-visible-ring-green ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? 'Redirecting...'
                      : detectedProvider
                      ? `Send via ${detectedProvider.providerName}`
                      : 'Send Message'}
                  </span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
