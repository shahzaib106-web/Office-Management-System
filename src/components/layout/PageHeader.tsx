import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  breadcrumb?: string[];
  quote?: string;
  tagline?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  subtitle,
  breadcrumb = ['CH Admin Portal', 'Office Management'],
  quote = '“Compliance Today, Growth Tomorrow”',
  children
}) => {
  return (
    <div className="mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5 font-medium select-none">
        {breadcrumb.map((crumb, idx) => (
          <React.Fragment key={crumb}>
            {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
            <span className={idx === breadcrumb.length - 1 ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-[#1473E6] transition-colors cursor-pointer'}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs relative overflow-hidden">
        {/* Subtle decorative courthouse architectural skyline watermark in background */}
        <div className="absolute right-40 top-0 bottom-0 pointer-events-none opacity-[0.04] flex items-center">
          <svg className="w-96 h-28 text-slate-900" viewBox="0 0 300 80" fill="currentColor">
            <path d="M10,70 L290,70 L290,65 L270,65 L270,40 L280,40 L280,35 L260,35 L260,20 L240,20 L240,35 L230,35 L230,40 L240,40 L240,65 L210,65 L210,40 L220,40 L220,35 L200,35 L200,10 L190,5 L180,10 L180,35 L160,35 L160,40 L170,40 L170,65 L130,65 L130,40 L140,40 L140,35 L120,35 L120,5 L110,0 L100,5 L100,35 L80,35 L80,40 L90,40 L90,65 L60,65 L60,40 L70,40 L70,35 L50,35 L50,20 L30,20 L30,35 L20,35 L20,40 L30,40 L30,65 L10,65 Z" />
          </svg>
        </div>

        {/* Left: Icon & Title */}
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1B2C] to-[#1473E6] text-white flex items-center justify-center shadow-sm shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-[12px] text-slate-500 font-medium leading-none mt-1">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right side: Quote, courthouse photo banner badge and Location */}
        <div className="flex items-center gap-3 shrink-0 z-10 self-end md:self-auto">
          {children}

          <div className="hidden lg:flex flex-col items-end pr-3 border-r border-slate-200">
            <span className="font-serif italic text-[13px] text-[#1473E6] font-semibold leading-tight">
              {quote}
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
              CH Chamber Services
            </span>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-800 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1473E6] flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="leading-tight text-left">
              <div className="font-bold text-[11px] text-slate-900">Chamber No. 121</div>
              <div className="text-[10px] text-slate-500 font-medium">Kachahri Sahiwal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
