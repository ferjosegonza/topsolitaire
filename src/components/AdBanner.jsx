import React, { useEffect, useRef } from 'react';

/**
 * Componente para mostrar anuncios de Google AdSense
 * @param {string} slot - El data-ad-slot de la unidad de anuncio
 * @param {string} format - Formato: 'auto', 'horizontal', 'vertical'
 * @param {object} style - Estilos adicionales para el contenedor
 * @param {string} className - Clases CSS adicionales
 */
const AdBanner = ({ slot, format = 'auto', style = {}, className = '' }) => {
  const adRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Evitar cargar múltiples veces
    if (isLoaded.current) return;
    isLoaded.current = true;

    // Pequeño retraso para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.warn('AdSense error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2204003132702383"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;