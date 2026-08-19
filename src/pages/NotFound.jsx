import React from 'react';
import { Link, useInRouterContext, useLocation } from 'react-router-dom';
import { normalizeLang } from '@/i18n';

function NotFoundView({ pathname }) {
  const segments = (pathname || '').split('/').filter(Boolean);
  const langPrefix = segments.length > 0 && normalizeLang(segments[0])
    ? `/${segments[0].toLowerCase()}`
    : '';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-6xl mb-4" aria-hidden="true">🃏</div>
        <h1 className="text-5xl font-extrabold text-emerald-800 tracking-tight">404</h1>
        <h2 className="mt-3 text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="mt-2 text-sm text-slate-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to={langPrefix || '/'}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-sm"
          >
            ← Back to Solitaire
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundInRouter(props) {
  const location = useLocation();
  return <NotFoundView {...props} pathname={location.pathname} />;
}

export default function NotFound(props) {
  const inRouter = useInRouterContext();
  if (inRouter) {
    return <NotFoundInRouter {...props} />;
  }
  return <NotFoundView {...props} pathname={typeof window !== 'undefined' ? window.location.pathname : '/'} />;
}
