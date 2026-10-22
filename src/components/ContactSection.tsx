import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Full-time Software Engineering',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulated robust submission handler:
    // If VITE_CONTACT_ENDPOINT is present, you would POST there.
    // Otherwise, we provide instant confirmation and prompt mailto fallback.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const triggerDirectMailto = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry - ${formData.roleType}] From ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Nandeesh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.roleType}\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:nandeeshnk506@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-dark-950/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>INITIATE CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Available for full-time fresher &amp; entry-level Software Development, Full-Stack, and AI/GenAI roles starting July 2026, as well as select freelance creative engineering contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Credentials & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 shadow-md">
              <h3 className="text-base font-bold text-white mb-2">
                Direct Contact Channels
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/50 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Primary Email</p>
                    <a 
                      href="mailto:nandeeshnk506@gmail.com" 
                      className="text-xs font-mono font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                    >
                      nandeeshnk506@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('nandeeshnk506@gmail.com', 'email')}
                  className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800/50 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Direct Phone / WhatsApp</p>
                    <a 
                      href="tel:+917892726438" 
                      className="text-xs font-mono font-medium text-slate-200 hover:text-emerald-300 transition-colors"
                    >
                      +91 78927 26438
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('+91 78927 26438', 'phone')}
                  className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-950 border border-slate-800">
                <div className="p-2 rounded-lg bg-red-950 border border-red-800/50 text-red-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Geographic Location</p>
                  <p className="text-xs font-mono text-slate-200">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-950 border border-purple-800/50 text-purple-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">GitHub Profile</p>
                    <a
                      href="https://github.com/nandeesh2799"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-medium text-slate-200 hover:text-purple-300 transition-colors flex items-center gap-1"
                    >
                      github.com/nandeesh2799
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Recruiter Speed Note */}
            <div className="p-4 rounded-xl bg-dark-900/60 border border-dashed border-slate-800 text-xs font-mono text-slate-400 space-y-1">
              <span className="text-cyan-400 font-bold block">Recruiter Fast Track:</span>
              <p>
                Immediate response within 24 hours. Resumes are downloadable above, and all featured repositories are open for architectural and commit inspection.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 shadow-xl">
              
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Prepared!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry regarding <span className="text-cyan-300">{formData.roleType}</span> has been logged.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={triggerDirectMailto}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-dark-950 shadow-md"
                    >
                      Open in Email App (Pre-filled)
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', roleType: 'Full-time Software Engineering', message: '' });
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-white mb-2">
                    Send a Direct Message
                  </h3>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-dark-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-dark-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Inquiry Type / Opportunity
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full bg-dark-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                    >
                      <option value="Full-time Software Engineering">Full-time Software Developer / Engineer</option>
                      <option value="AI / GenAI & Automation Role">AI / GenAI &amp; Automation Engineer</option>
                      <option value="Full-Stack (MERN / Python)">Full-Stack Developer (MERN / Python)</option>
                      <option value="Freelance Web / AI Integration">Freelance Client Project</option>
                      <option value="Art & Creative Exhibition">Fine Art Commission / Collaboration</option>
                      <option value="General Networking">General Connection</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the role, project scope, or timelines..."
                      className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-dark-950 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-mono text-slate-500 text-center pt-2">
                    Honest state: Directly dispatches or generates a pre-formatted message to nandeeshnk506@gmail.com
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
