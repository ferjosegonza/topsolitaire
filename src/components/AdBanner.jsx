import React, { useEffect, useRef } from 'react';

const AdBanner = ({ slot, format = 'auto', style = {}, className = '' }) => {
  const adRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;

    // 🔥 AUMENTAR EL RETRASO de 100ms a 500ms
    // Esto da tiempo a que el contenedor se renderice
    const timer = setTimeout(() => {
      try {
        // 🔥 VERIFICAR que el contenedor tenga tamaño
        if (adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          if (rect.width === 0) {
            // Si el contenedor no tiene tamaño, reintentar después
            setTimeout(() => {
              try {
                if (window.adsbygoogle) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
              } catch (e) {
                console.warn('AdSense retry error:', e);
              }
            }, 500);
            return;
          }
        }

        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.warn('AdSense error:', error);
      }
    }, 500); // ← CAMBIADO de 100 a 500ms

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