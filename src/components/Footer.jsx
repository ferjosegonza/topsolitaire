import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--bg-surface-2)' }} className="border-t">
      <div className="mx-auto max-w-[1100px] px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <p>© {year} {t('footer.rights')}</p>
        <nav className="flex gap-5">
          <Link to="/privacy-policy" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {t('footer.privacy')}
          </Link>
          <Link to="/contact" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {t('footer.contact')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
