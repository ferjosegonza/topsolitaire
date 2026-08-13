import React, { useEffect, useRef } from 'react';

const AdBanner = ({
  scriptSrc = '',
  className = '',
  style = {},
  slotId = '',
  children,
}) => {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!scriptSrc || !hostRef.current) return;

    const existing = hostRef.current.querySelector(
      `script[data-hilltop-src="${scriptSrc}"]`
    );

    if (existing) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = scriptSrc;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.dataset.hilltopSrc = scriptSrc;
    script.dataset.hilltopSlot = slotId;

    hostRef.current.appendChild(script);
  }, [scriptSrc, slotId]);

  return (
    <div ref={hostRef} className={`hilltop-banner-slot ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

export default AdBanner;