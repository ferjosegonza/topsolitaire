import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, normalizeLang } from '@/i18n';

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
      title = `${t('footer.privacy')} - TopSolitaire`;
      description = 'Privacy Policy for TopSolitaire - Play Solitaire Online Free without signup or download.';
    } else if (pageType === 'contact') {
      title = `${t('footer.contact')} - TopSolitaire`;
      description = 'Contact TopSolitaire support and feedback.';
    } else if (pageType === '404') {
      title = '404 - Page Not Found | TopSolitaire';
      description = 'The page you requested could not be found.';
      noindex = true;
    }

    document.title = title;

    // robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
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
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // twitter:title
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', title);

    // twitter:description
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', description);
  }, [t, i18n.language, pathname]);
}
