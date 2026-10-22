import React from 'react';
import { educationData, certificationsData, achievementsData } from '../data/careerData';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Trophy, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users,
  Terminal
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION &amp; VERIFIED RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education, Certifications &amp; Achievements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Preserving verified academic records, competitive hackathon awards, and institutional leadership roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education & Certifications (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Education Block */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Formal Education</span>
              </h3>

              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div
                    key={edu.title}
                    className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{edu.title}</h4>
                        <p className="text-xs text-cyan-300 font-mono mt-0.5">{edu.institution}</p>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                        {edu.statusBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Block */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Professional Certifications</span>
              </h3>

              <div className="space-y-3">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-start gap-3.5 shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{cert.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400">{cert.year}</span>
                      </div>
                      <p className="text-[11px] text-emerald-300 font-mono">{cert.issuer}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Achievements & Volunteering (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Competitive Achievements &amp; Leadership</span>
              </h3>

              <div className="space-y-4">
                {achievementsData.map((ach) => (
                  <div
                    key={ach.title}
                    className={`p-5 rounded-2xl border space-y-2.5 transition-all shadow-sm ${
                      ach.category === 'hackathon'
                        ? 'bg-gradient-to-br from-amber-950/20 via-dark-900 to-dark-900 border-amber-500/40'
                        : 'bg-dark-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{ach.event}</p>
                      </div>

                      <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                        ach.category === 'hackathon'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}>
                        {ach.rankBadge}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500">
                      Year: {ach.year}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
