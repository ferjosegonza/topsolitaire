import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <p>© {year} Play Solitaire Online Free. All rights reserved.</p>
        <nav className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-slate-900 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}