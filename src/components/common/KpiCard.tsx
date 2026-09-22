import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBgColor?: string;
  viewDetailsText?: string;
  onViewDetails?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subValue,
  change,
  changeType = 'positive',
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  viewDetailsText,
  onViewDetails,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between shadow-2xs hover:border-[#1473E6]/40 hover:shadow-xs transition-all ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${iconBgColor}`}>
            {icon}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1.5">{label}</div>
            <div className="text-[22px] font-bold text-slate-900 tracking-tight leading-none font-mono">{value}</div>
          </div>
        </div>
        {viewDetailsText && (
          <button
            onClick={onViewDetails}
            className="text-[11px] font-semibold text-[#1473E6] hover:text-[#0F62C4] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            {viewDetailsText}
            <span className="text-xs">&rarr;</span>
          </button>
        )}
      </div>

      {(change || subValue) && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          {change && (
            <div className="flex items-center gap-1">
              {changeType === 'positive' ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {change}
                </span>
              ) : changeType === 'negative' ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold text-[10px]">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  {change}
                </span>
              ) : (
                <span className="text-slate-500">{change}</span>
              )}
            </div>
          )}
          {subValue && <span className="text-slate-400 font-normal ml-auto text-[11px]">{subValue}</span>}
        </div>
      )}
    </div>
  );
};
