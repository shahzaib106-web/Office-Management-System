import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const norm = status.toLowerCase().trim();

  let styles = 'bg-blue-50 text-blue-700 border-blue-200';

  if (
    norm === 'paid' ||
    norm === 'active' ||
    norm === 'completed' ||
    norm === 'ok' ||
    norm === 'success' ||
    norm === 'online' ||
    norm === 'delivered'
  ) {
    styles = 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
  } else if (
    norm === 'overdue' ||
    norm === 'cancelled' ||
    norm === 'critical' ||
    norm === 'failed' ||
    norm === 'high' ||
    norm === 'urgent'
  ) {
    styles = 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]';
  } else if (
    norm === 'low'
  ) {
    styles = 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]';
  } else if (
    norm === 'partial' ||
    norm === 'pending' ||
    norm === 'due soon' ||
    norm === 'documents required' ||
    norm === 'waiting client' ||
    norm === 'medium' ||
    norm === 'outstanding' ||
    norm === 'unpaid'
  ) {
    styles = 'bg-[#FFF7ED] text-[#D97706] border-[#FED7AA]';
  } else if (
    norm === 'in progress' ||
    norm === 'ready to file' ||
    norm === 'submitted' ||
    norm === 'staff' ||
    norm === 'filer' ||
    norm === 'tax consultant'
  ) {
    styles = 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]';
  } else if (
    norm === 'admin' ||
    norm === 'stamp vendor' ||
    norm === 'accountant'
  ) {
    styles = 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]';
  } else if (norm === 'non-filer' || norm === 'offline' || norm === 'inactive') {
    styles = 'bg-gray-100 text-gray-600 border-gray-200';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px] font-bold tracking-wider' : 'px-2.5 py-1 text-xs font-semibold tracking-wide';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border leading-none uppercase whitespace-nowrap select-none ${sizeClasses} ${styles} ${className}`}
    >
      {status}
    </span>
  );
};
