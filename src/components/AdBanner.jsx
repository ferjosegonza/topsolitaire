import React, { useMemo, useRef } from 'react';

const AdBanner = ({
  scriptSrc = '',
  className = '',
  style = {},
  slotId = '',
  children,
}) => {
  const hostRef = useRef(null);

  const iframeSrcDoc = useMemo(() => {
    if (!scriptSrc) return '';

    return `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html, body {
              margin: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              overflow: hidden;
              font-family: sans-serif;
            }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript" src="${scriptSrc}" defer data-hilltop-src="${scriptSrc}" data-hilltop-slot="${slotId}"></script>
        </body>
      </html>`;
  }, [scriptSrc, slotId]);

  return (
    <div ref={hostRef} className={`hilltop-banner-slot ${className}`.trim()} style={style}>
      {scriptSrc ? (
        <iframe
          title="Publicidad"
          referrerPolicy="no-referrer-when-downgrade"
          srcDoc={iframeSrcDoc}
          className="hilltop-banner-iframe"
        />
      ) : null}
      {children}
    </div>
  );
};

export default AdBanner;