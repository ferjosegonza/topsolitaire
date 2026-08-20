import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, normalizeLang } from '@/i18n';

/** Mapa de código de idioma → og:locale de Open Graph */
const OG_LOCALE_MAP = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  pl: 'pl_PL',
  de: 'de_DE',
  zh: 'zh_CN',
  'zh-tw': 'zh_TW',
};

const OG_IMAGE = 'https://topsolitaire.online/images/og-image.jpg';
const SITE_NAME = 'Top Solitaire';

/**
 * Actualiza dinámicamente el <title>, canonical URL, hreflangs, robots,
 * atributo html lang y metas SEO (description, og, twitter) según el idioma y la ruta actual.
 */
export default function useDocumentMeta() {
  const { t, i18n } = useTranslation();
  let pathname = '/';
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch {
    pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  }

  useEffect(() => {
    const currentLang = i18n.language || 'en';

    // Sincronizar atributo lang y data-lang en <html>
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);

    // Analizar la ruta para determinar tipo de página y subruta base
    const segments = pathname.split('/').filter(Boolean);
    let pageType = 'home';
    let subpath = '';

    if (segments.length === 0) {
      pageType = 'home';
      subpath = '';
    } else if (segments.length === 1) {
      if (normalizeLang(segments[0])) {
        pageType = 'home';
        subpath = '';
      } else if (segments[0] === 'privacy-policy') {
        pageType = 'privacy';
        subpath = '/privacy-policy';
      } else if (segments[0] === 'contact') {
        pageType = 'contact';
        subpath = '/contact';
      } else {
        pageType = '404';
      }
    } else if (segments.length === 2 && normalizeLang(segments[0])) {
      if (segments[1] === 'privacy-policy') {
        pageType = 'privacy';
        subpath = '/privacy-policy';
      } else if (segments[1] === 'contact') {
        pageType = 'contact';
        subpath = '/contact';
      } else {
        pageType = '404';
      }
    } else {
      pageType = '404';
    }

    let title = t('meta.title');
    let description = t('meta.description');
    let noindex = false;

    if (pageType === 'privacy') {
      title = `${t('footer.privacy')} - ${SITE_NAME}`;
      description = `${t('footer.privacy')} — ${t('meta.description')}`;
    } else if (pageType === 'contact') {
      title = `${t('footer.contact')} - ${SITE_NAME}`;
      description = `${t('footer.contact')} — ${t('meta.description')}`;
    } else if (pageType === '404') {
      title = `404 - Page Not Found | ${SITE_NAME}`;
      description = 'The page you requested could not be found.';
      noindex = true;
    }

    document.title = title;

    // Helper: get or create a meta element
    const getOrCreateMeta = (selector, attrKey, attrValue) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrValue);
        document.head.appendChild(el);
      }
      return el;
    };

    // robots meta
    const metaRobots = getOrCreateMeta('meta[name="robots"]', 'name', 'robots');
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');

    // canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const canonicalUrl = `https://topsolitaire.online${cleanPath === '' ? '/' : cleanPath}`;
    canonicalLink.setAttribute('href', canonicalUrl);

    // Hreflang alternates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (!noindex) {
      SUPPORTED_LANGS.forEach((lng) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lng === 'zh-TW' ? 'zh-TW' : lng);
        link.setAttribute('href', `https://topsolitaire.online/${lng.toLowerCase()}${subpath}`);
        document.head.appendChild(link);
      });

      const xDefaultLink = document.createElement('link');
      xDefaultLink.setAttribute('rel', 'alternate');
      xDefaultLink.setAttribute('hreflang', 'x-default');
      xDefaultLink.setAttribute('href', `https://topsolitaire.online${subpath || '/'}`);
      document.head.appendChild(xDefaultLink);
    }

    // meta description
    const metaDesc = getOrCreateMeta('meta[name="description"]', 'name', 'description');
    metaDesc.setAttribute('content', description);

    // === Open Graph ===

    // og:title
    const ogTitle = getOrCreateMeta('meta[property="og:title"]', 'property', 'og:title');
    ogTitle.setAttribute('content', title);

    // og:description
    const ogDesc = getOrCreateMeta('meta[property="og:description"]', 'property', 'og:description');
    ogDesc.setAttribute('content', description);

    // og:url
    const ogUrl = getOrCreateMeta('meta[property="og:url"]', 'property', 'og:url');
    ogUrl.setAttribute('content', canonicalUrl);

    // og:site_name
    const ogSiteName = getOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name');
    ogSiteName.setAttribute('content', SITE_NAME);

    // og:image
    const ogImage = getOrCreateMeta('meta[property="og:image"]', 'property', 'og:image');
    ogImage.setAttribute('content', OG_IMAGE);

    // og:locale — dinámico según idioma activo
    const ogLocale = getOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale');
    const langKey = currentLang.toLowerCase();
    ogLocale.setAttribute('content', OG_LOCALE_MAP[langKey] || 'en_US');

    // === Twitter Card ===

    // twitter:card
    const twCard = getOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card');
    twCard.setAttribute('content', 'summary_large_image');

    // twitter:title
    const twTitle = getOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title');
    twTitle.setAttribute('content', title);

    // twitter:description
    const twDesc = getOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description');
    twDesc.setAttribute('content', description);

    // twitter:image
    const twImage = getOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image');
    twImage.setAttribute('content', OG_IMAGE);

    // === Schema.org JSON-LD — inyectado dinámicamente ===
    // Removemos el script anterior para evitar duplicados en re-renders
    document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach((s) => s.remove());

    const ldScript = document.createElement('script');
    ldScript.setAttribute('type', 'application/ld+json');
    ldScript.setAttribute('data-dynamic', 'true');
    ldScript.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: 'https://topsolitaire.online',
        description: 'Play classic Klondike Solitaire online for free. No download, no signup.',
        inLanguage: currentLang,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: SITE_NAME,
        url: 'https://topsolitaire.online',
        description:
          'Play classic Klondike Solitaire card game online for free — no signup, no download. Enjoy the full Klondike experience instantly in your browser on mobile, tablet or desktop.',
        applicationCategory: 'GameApplication',
        genre: 'Card Game',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Organization', name: SITE_NAME, url: 'https://topsolitaire.online' },
        inLanguage: ['en', 'es', 'fr', 'it', 'pl', 'de', 'zh', 'zh-TW'],
      },
    ]);
    document.head.appendChild(ldScript);
  }, [t, i18n.language, pathname]);
}
