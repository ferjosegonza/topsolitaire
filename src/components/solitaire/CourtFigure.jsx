import React from 'react';

/**
 * P17 — Figuras de corte (J/Q/K) dibujadas como SVG inline.
 *
 * POLÍTICA DE LICENCIAS:
 * Estas ilustraciones son 100% propias (creadas internamente), por lo que no
 * requieren licencia externa ni implican riesgo de derechos de autor.
 * Si en el futuro se reemplazan por assets externos, deben ser SIEMPRE de
 * acceso y uso gratuito (CC0 / Dominio Público — p. ej. Wikimedia Commons o
 * museos) o creadas internamente; registrar autor + licencia + URL de origen.
 * Las licencias libres no caducan ni se renuevan, pero conviene re-verificar
 * la fuente en cada lanzamiento.
 */

const RED = '#e11d48'; // rose-600, consistente con text-rose-600
const BLACK = '#0f172a'; // slate-900, consistente con text-slate-900

function JackFigure({ color }) {
  return (
    <g fill={color}>
      {/* Gorra con inclinación clásica */}
      <path d="M34 46 Q50 32 66 46 L64 50 Q50 38 36 50 Z" />
      {/* Pluma */}
      <path d="M60 36 q8 -10 18 -4 q-4 2 -10 1 q-2 6 -4 4 Z" />
      {/* Cabeza */}
      <circle cx="50" cy="56" r="8" />
      {/* Cuello */}
      <rect x="47" y="62" width="6" height="4" />
      {/* Torso */}
      <path d="M40 90 Q50 70 60 90 L56 106 L44 106 Z" />
      {/* Cinturón */}
      <rect x="40" y="92" width="20" height="4" />
      {/* Espada */}
      <rect x="27" y="64" width="2.5" height="42" />
      <rect x="22.5" y="62" width="11.5" height="3.5" />
      <circle cx="28" cy="82" r="2.5" />
    </g>
  );
}

function QueenFigure({ color }) {
  return (
    <g fill={color}>
      {/* Corona con tres puntas rematadas en bolas */}
      <path d="M34 48 L40 30 L46 46 L50 28 L54 46 L60 30 L66 48 Z" />
      <rect x="34" y="48" width="32" height="5" />
      <circle cx="40" cy="28" r="2.5" />
      <circle cx="50" cy="26" r="2.5" />
      <circle cx="60" cy="28" r="2.5" />
      {/* Cabeza */}
      <circle cx="50" cy="62" r="9" />
      {/* Pelo recogido */}
      <path d="M41 62 Q41 52 50 52 Q59 52 59 62 L59 66 Q50 68 41 66 Z" />
      {/* Vestido con collar */}
      <path d="M36 90 Q50 70 64 90 Q64 112 55 112 L45 112 Q36 112 36 90 Z" />
      <rect x="43" y="90" width="14" height="5" opacity="0.35" fill={color} />
    </g>
  );
}

function KingFigure({ color }) {
  return (
    <g fill={color}>
      {/* Corona alta con cruz */}
      <path d="M32 46 L40 24 L48 40 L50 22 L52 40 L60 24 L68 46 Z" />
      <rect x="32" y="46" width="36" height="6" />
      <rect x="49" y="14" width="2" height="8" />
      <rect x="45" y="13" width="10" height="2.5" />
      {/* Cabeza */}
      <circle cx="50" cy="62" r="10" />
      {/* Barba */}
      <path d="M41 62 Q41 78 50 78 Q59 78 59 62 Q59 70 50 72 Q41 70 41 62 Z" />
      {/* Manto */}
      <path d="M36 92 Q50 72 64 92 L58 110 L42 110 Z" />
      <rect x="43" y="90" width="14" height="5" opacity="0.35" fill={color} />
    </g>
  );
}

/**
 * Figura central de una carta de corte (J/Q/K).
 * @param {{ rank: number, red: boolean }} props
 */
export default function CourtFigure({ rank, red }) {
  const color = red ? RED : BLACK;
  return (
    <svg
      viewBox="0 0 100 140"
      className="court-figure"
      aria-hidden="true"
      focusable="false"
      style={{ width: 'calc(var(--card-w) * 0.88)' }}
    >
      {rank === 11 && <JackFigure color={color} />}
      {rank === 12 && <QueenFigure color={color} />}
      {rank === 13 && <KingFigure color={color} />}
    </svg>
  );
}