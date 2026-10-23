import React from 'react';
import { Cpu, HardDrive, Wifi, Activity, Terminal, ShieldCheck, MapPin, Award } from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

export const SystemMonitorWidget: React.FC = () => {
  return (
    <div className="hypr-window rounded-xl overflow-hidden flex flex-col font-mono text-xs w-full h-full min-h-[380px]">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-bg-secondary border-b border-bg-tertiary select-none">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-terminal-cyan" />
          <span className="text-[11px] text-slate-200 font-semibold">sysmon // live_telemetry</span>
        </div>
        <span className="text-[10px] text-terminal-green font-bold">STATUS: OPTIMAL</span>
      </div>

      {/* Widget Body */}
      <div className="p-4 space-y-4 bg-bg-card/90 overflow-y-auto">
        {/* Profile Card Summary */}
        <div className="p-3 rounded-lg bg-bg-secondary/70 border border-bg-tertiary space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-terminal-green font-bold text-sm">{developerProfile.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-bg-tertiary text-terminal-cyan">BCA '26</span>
          </div>
          <p className="text-muted text-[11px]">{developerProfile.role}</p>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
            <MapPin className="w-3 h-3 text-terminal-pink" />
            <span>{developerProfile.location}</span>
          </div>
        </div>

        {/* Live System Resource Meters */}
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted flex items-center gap-1">
                <Cpu className="w-3 h-3 text-terminal-cyan" />
                <span>CPU Load (Ryzen 7 7840HS)</span>
              </span>
              <span className="text-terminal-cyan font-bold">18%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
              <div className="h-full bg-terminal-cyan rounded-full transition-all duration-500" style={{ width: '18%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-terminal-purple" />
                <span>Memory Allocation (ZRAM)</span>
              </span>
              <span className="text-terminal-purple font-bold">4.18 / 32.0 GB</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
              <div className="h-full bg-terminal-purple rounded-full transition-all duration-500" style={{ width: '13%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted flex items-center gap-1">
                <Wifi className="w-3 h-3 text-terminal-green" />
                <span>Network Integrity</span>
              </span>
              <span className="text-terminal-green font-bold">0ms Loss // 100% Up</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
              <div className="h-full bg-terminal-green rounded-full transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Focus Areas Badges */}
        <div>
          <span className="text-muted text-[10px] uppercase tracking-wider block mb-2">Technical Core Interests:</span>
          <div className="flex flex-wrap gap-1.5">
            {developerProfile.interests.map((interest) => (
              <span 
                key={interest}
                className="px-2 py-0.5 rounded text-[10px] bg-bg-secondary text-slate-300 border border-bg-tertiary"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Badge */}
        <div className="p-2.5 rounded-lg bg-terminal-green/5 border border-terminal-green/20 flex items-center gap-2">
          <Award className="w-4 h-4 text-terminal-green shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="text-terminal-green font-bold block">1st Place — College Hackathon</span>
            <span className="text-muted text-[10px]">AgriTech Precision Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
