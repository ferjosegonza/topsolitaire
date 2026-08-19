import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLang } from '@/i18n';
import NotFound from '@/pages/NotFound';

export default function LocaleLayout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const validLang = normalizeLang(lang);

  useEffect(() => {
    if (validLang && i18n.language !== validLang) {
      i18n.changeLanguage(validLang);
    }
  }, [validLang, i18n]);

  if (!validLang) {
    return <NotFound />;
  }

  return <Outlet />;
}
