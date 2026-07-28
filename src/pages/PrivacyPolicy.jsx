import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Solitaire
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Privacy Policy</h1>
        <div className="mt-4 prose prose-sm text-slate-600 space-y-3">
          <p>
            This privacy policy explains how this website handles information when you visit.
          </p>
          <p>
            We do not require you to create an account or provide personal information to play
            Solitaire. The game runs entirely in your browser.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on your prior
            visits to this and other websites. Google's use of advertising cookies enables it and
            its partners to serve ads based on your visit to this site and/or other sites on the
            Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting
            <a href="https://www.google.com/settings/ads" className="text-slate-900 underline" target="_blank" rel="noopener noreferrer"> Google Ads Settings</a>.
          </p>
          <p>
            This is a placeholder policy. Replace it with your full privacy policy before applying
            for Google AdSense.
          </p>
        </div>
      </div>
    </div>
  );
}