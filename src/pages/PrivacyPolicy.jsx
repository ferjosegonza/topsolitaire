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
          <p className="text-sm text-slate-500">Last updated: July 22, 2026</p>

          <p>At Play Solitaire Online Free, we respect your privacy. This Privacy Policy explains how we handle your information when you use our website.</p>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">1. Information We Collect</h2>
          <p>We do not collect any personal information such as names, email addresses, or payment details. Our game is completely free to play without registration or login.</p>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">2. Cookies and Tracking</h2>
          <p>We use cookies to enhance your experience and serve relevant advertisements. Specifically:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google AdSense:</strong> Uses cookies to serve ads based on your previous visits to our site or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" className="text-slate-900 underline">Google Ad Settings</a>.</li>
            <li><strong>Essential Cookies:</strong> Required for the game to function properly.</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">3. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google AdSense:</strong> For displaying advertisements. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">4. Data Security</h2>
          <p>We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information.</p>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">5. Children's Privacy</h2>
          <p>Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children.</p>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">6. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. You should visit the website from time to time for any changes in the new Privacy Policy on this page.</p>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@topsolitaire.online" className="text-slate-900 underline">support@topsolitaire.online</a></p>
        </div>
      </div>
    </div>
  );
}