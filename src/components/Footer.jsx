import React from 'react';
import { Link, useInRouterContext, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLang } from '@/i18n';

function FooterView({ pathname }) {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const segments = (pathname || '').split('/').filter(Boolean);
  const currentLangPrefix = segments.length > 0 && normalizeLang(segments[0])
    ? `/${segments[0].toLowerCase()}`
    : '';

  return (
    <footer style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--bg-surface-2)' }} className="border-t">
      <div className="mx-auto max-w-[1100px] px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <p>© {year} {t('footer.rights')}</p>
        <nav className="flex gap-5">
          <Link to={`${currentLangPrefix}/privacy-policy`} className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {t('footer.privacy')}
          </Link>
          <Link to={`${currentLangPrefix}/contact`} className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {t('footer.contact')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

function FooterInRouter(props) {
  const location = useLocation();
  return <FooterView {...props} pathname={location.pathname} />;
}

export default function Footer(props) {
  const inRouter = useInRouterContext();
  if (inRouter) {
    return <FooterInRouter {...props} />;
  }
  return <FooterView {...props} pathname={typeof window !== 'undefined' ? window.location.pathname : '/'} />;
}
