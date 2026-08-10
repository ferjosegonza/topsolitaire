import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Actualiza dinámicamente el <title> y las metas SEO (description, og, twitter)
 * según el idioma actual. Se usa dentro del componente App para que se
 * sincronice con cada cambio de idioma.
 */
export default function useDocumentMeta() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t('meta.title');
    const description = t('meta.description');

    document.title = title;

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
  }, [t, i18n.language]);
}
