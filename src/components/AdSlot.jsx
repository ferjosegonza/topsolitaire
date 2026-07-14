import React from 'react';

// Placeholder ad slot. Replace the inner content with your Google AdSense code later.
export default function AdSlot({ id, className = '', minHeight = '90px' }) {
  return (
    <div
      id={id}
      className={`ad-slot flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-300 bg-slate-50 rounded-md ${className}`}
      style={{ minHeight }}
    >
      <span>Advertisement</span>
    </div>
  );
}