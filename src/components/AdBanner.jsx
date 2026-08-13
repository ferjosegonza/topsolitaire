import React, { useEffect, useRef } from 'react';

const AdBanner = ({
  html = '',
  scriptSrc = '',
  scriptId = '',
  style = {},
  className = '',
  children,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!scriptSrc) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    script.id = scriptId || `hilltopads-script-${Math.random().toString(36).slice(2)}`;

    containerRef.current?.appendChild(script);

    return () => {
      script.remove();
    };
  }, [scriptId, scriptSrc]);

  return (
    <div className={`ad-container ${className}`} style={style} ref={containerRef}>
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children || null}
    </div>
  );
};

export default AdBanner;