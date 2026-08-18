import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Solitaire
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Contact</h1>
        <div className="mt-4 prose prose-sm text-slate-600 space-y-3">
          <p>
            If you have questions, feedback, or need support regarding this Solitaire game, please
            reach out using the email below.
          </p>
          <p>
            Email: <a href="mailto:fer.jose.gonza@gmail.com" className="text-slate-900 underline">fer.jose.gonza@gmail.com</a>
          </p>

        </div>
      </div>
    </div>
  );
}