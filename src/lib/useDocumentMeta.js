import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * Actualiza dinámicamente el <title>, canonical URL, robots y metas SEO (description, og, twitter)
 * según el idioma y la ruta actual.
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
    let title = t('meta.title');
    let description = t('meta.description');
    let noindex = false;

    if (pathname === '/privacy-policy') {
      title = `${t('footer.privacy')} - TopSolitaire`;
      description = 'Privacy Policy for TopSolitaire - Play Solitaire Online Free without signup or download.';
    } else if (pathname === '/contact') {
      title = `${t('footer.contact')} - TopSolitaire`;
      description = 'Contact TopSolitaire support and feedback.';
    } else if (pathname !== '/') {
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
    const canonicalUrl = `https://topsolitaire.online${cleanPath}`;
    canonicalLink.setAttribute('href', canonicalUrl);

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
