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
  ArrowUpRight
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface SectionProps {
  className?: string;
}

export const ContactSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    // Form submission simulation + mailto fallback client trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Pre-format and open mailto link
      const mailtoUrl = `mailto:${developerProfile.email}?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject || 'Inquiry from ' + formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`py-24 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-green">
            <Terminal className="w-3.5 h-3.5" />
            <span>07 // TRANSMISSION // REACH_OUT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Initiate Contact &amp; Collaboration
          </h2>
          <p className="text-muted text-sm sm:text-base font-mono">
            Open for full-time engineering roles, AI product development, and creative technology collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Credentials & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
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
                      onClick={copyEmail}
                      className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-terminal-cyan transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-terminal-green" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
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

                {/* Resume Download CTA */}
                <div className="pt-2">
                  <a
                    href="./resumes/Nandeesh_NK_Resume_AI.pdf"
                    download="Nandeesh_NK_Resume_AI.pdf"
                    className="w-full py-3 rounded-xl bg-terminal-green/10 hover:bg-terminal-green/20 border border-terminal-green/40 text-terminal-green font-bold transition-all flex items-center justify-center gap-2 focus-visible-ring focus-visible-ring-green"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download ATS Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Terminal Form (7 cols) */}
          <div className="lg:col-span-7 hypr-window rounded-2xl overflow-hidden font-mono text-xs">
            <div className="px-5 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between">
              <span className="text-terminal-green font-bold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Send Message</span>
              </span>
              <span className="text-muted text-[11px]">Interactive Form</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-bg-card/70 space-y-4">
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-terminal-green/10 border border-terminal-green/30 text-terminal-green flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Transmission Ready &amp; Mail Client Activated!</p>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans">
                      Your default mail client has opened with your message. You can also email directly at <strong className="text-terminal-green">{developerProfile.email}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 rounded-xl bg-terminal-red/10 border border-terminal-red/30 text-terminal-red flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please fill out your name, email, and message before sending.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full bg-bg-secondary border border-bg-tertiary rounded-xl px-3.5 py-2.5 text-slate-100 placeholder:text-muted/40 focus:outline-none focus:border-terminal-green transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 block">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-bg-secondary border border-bg-tertiary rounded-xl px-3.5 py-2.5 text-slate-100 placeholder:text-muted/40 focus:outline-none focus:border-terminal-green transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 block">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Role Opportunity / Project Discussion"
                  className="w-full bg-bg-secondary border border-bg-tertiary rounded-xl px-3.5 py-2.5 text-slate-100 placeholder:text-muted/40 focus:outline-none focus:border-terminal-green transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 block">Transmission Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Nandeesh, let's connect regarding an engineering role..."
                  className="w-full bg-bg-secondary border border-bg-tertiary rounded-xl p-3.5 text-slate-100 placeholder:text-muted/40 focus:outline-none focus:border-terminal-green transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="magnetic-btn w-full py-3.5 rounded-full font-bold bg-terminal-green text-[#080B10] hover:shadow-glow-green hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible-ring focus-visible-ring-green active:scale-[0.98]"
              >
                <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Message Transmission'}</span>
                <span className="magnetic-icon inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
                  <Send className="w-4 h-4" />
                </span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
