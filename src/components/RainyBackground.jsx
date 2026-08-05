import React, { useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const RAIN_DROPS = 30;

/**
 * Fondo animado del Modo Lluvioso (CSS puro).
 * - Solo se monta cuando el tema es "rainy" (oculto en dark/light).
 * - Capa fija con `pointer-events: none` y `aria-hidden` → no interfiere
 *   con el juego ni con la publicidad, no genera CLS ni LCP extra.
 * - Las animaciones se desactivan vía CSS con `prefers-reduced-motion`.
 */
export default function RainyBackground() {
  const { theme } = useTheme();

  // Valores deterministas (sin Math.random) para estabilidad entre renders.
  const drops = useMemo(
    () =>
      Array.from({ length: RAIN_DROPS }, (_, i) => ({
        left: `${(i * 3.3 + 1) % 100}%`,
        height: `${42 + (i % 4) * 12}px`,
        opacity: 0.18 + (i % 3) * 0.07,
        animationDuration: `${1.4 + (i % 6) * 0.25}s`,
        animationDelay: `${-((i * 0.53) % 2)}s`,
      })),
    []
  );

  const clouds = useMemo(
    () => [
      { top: '6%', scale: 1.1, duration: '70s', delay: '-10s' },
      { top: '16%', scale: 0.7, duration: '95s', delay: '-40s' },
      { top: '2%', scale: 0.55, duration: '120s', delay: '-70s' },
    ],
    []
  );

  if (theme !== 'rainy') return null;

  return (
    <div className="rainy-layer" aria-hidden="true">
      {/* Lluvia */}
      {drops.map((d, i) => (
        <span
          key={`drop-${i}`}
          className="rainy-drop"
          style={{
            left: d.left,
            height: d.height,
            opacity: d.opacity,
            animationDuration: d.animationDuration,
            animationDelay: d.animationDelay,
          }}
        />
      ))}

      {/* Nubes */}
      {clouds.map((c, i) => (
        <span
          key={`cloud-${i}`}
          className="rainy-cloud"
          style={{
            top: c.top,
            transform: `scale(${c.scale})`,
            animationDuration: c.duration,
            animationDelay: c.delay,
            opacity: 0.18,
          }}
        />
      ))}

      {/* Niebla */}
      <span className="rainy-fog rainy-fog--bottom" />
      <span className="rainy-fog rainy-fog--top" />
    </div>
  );
}

