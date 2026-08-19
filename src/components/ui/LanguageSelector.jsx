import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInRouterContext, useLocation, useNavigate } from 'react-router-dom';
import { LANG_META, SUPPORTED_LANGS, normalizeLang } from '@/i18n';

function LanguageSelectorView({ currentPath, onNavigate }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLang = i18n.language === 'zh-TW' ? 'zh-TW' : i18n.language;
  const currentMeta = LANG_META[currentLang] || LANG_META.en;

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);

    if (onNavigate) {
      const pathname = currentPath || '/';
      const segments = pathname.split('/').filter(Boolean);
      let targetSubpath = '';

      if (segments.length > 0 && normalizeLang(segments[0])) {
        const rest = segments.slice(1).join('/');
        targetSubpath = rest ? `/${rest}` : '';
      } else {
        targetSubpath = pathname === '/' ? '' : pathname;
      }

      const langCode = lng.toLowerCase();
      const nextPath = `/${langCode}${targetSubpath}`;
      onNavigate(nextPath);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t('lang.select')}
        title={t('lang.select')}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center justify-center rounded-2xl w-[52px] h-[52px] sm:w-auto sm:min-h-[64px] sm:px-4 text-white font-bold transition-all duration-200 shadow-xl hover:scale-[1.02] border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderColor: 'rgba(148, 163, 184, 0.5)',
        }}
      >
        <Globe className="w-7 h-7 sm:hidden" aria-hidden="true" />
        <span className="hidden sm:inline-flex items-center gap-2">
          <span aria-hidden="true">{currentMeta.flag}</span>
          <span>{currentMeta.label}</span>
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-2xl border shadow-2xl p-1.5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--bg-surface-2)',
            color: 'var(--text-primary)',
          }}
        >
          {SUPPORTED_LANGS.map((lng) => {
            const meta = LANG_META[lng];
            const isActive = (i18n.language === lng) || (i18n.language === 'zh' && lng === 'zh') || (i18n.language === 'zh-TW' && lng === 'zh-TW');
            return (
              <button
                key={lng}
                role="option"
                aria-selected={isActive}
                onClick={() => selectLang(lng)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'var(--accent-muted)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-surface-2)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span aria-hidden="true">{meta.flag}</span>
                <span className="flex-1">{meta.label}</span>
                {isActive && <Check className="w-4 h-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LanguageSelectorInRouter(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return <LanguageSelectorView {...props} currentPath={location.pathname} onNavigate={navigate} />;
}

function LanguageSelectorStandalone(props) {
  return (
    <LanguageSelectorView
      {...props}
      currentPath={typeof window !== 'undefined' ? window.location.pathname : '/'}
      onNavigate={(path) => {
        if (typeof window !== 'undefined' && window.history?.pushState) {
          window.history.pushState({}, '', path);
        }
      }}
    />
  );
}

export default function LanguageSelector(props) {
  const inRouter = useInRouterContext();
  if (inRouter) {
    return <LanguageSelectorInRouter {...props} />;
  }
  return <LanguageSelectorStandalone {...props} />;
}
