import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
<footer style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--bg-surface-2)' }} className="border-t">
      <div className="mx-auto max-w-[1100px] px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <p>© {year} Play Solitaire Online Free. All rights reserved.</p>
        <nav className="flex gap-5">
          <Link to="/privacy-policy" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Privacy Policy
          </Link>
          <Link to="/contact" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}