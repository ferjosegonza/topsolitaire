import React from 'react';
import { CloudRain, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

const THEME_META = {
  rainy: {
    label: 'Modo Lluvioso',
    nextLabel: 'Modo Oscuro',
    aria: 'Activar modo oscuro',
    Icon: CloudRain,
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderColor: 'rgba(56, 189, 248, 0.5)',
  },
  dark: {
    label: 'Modo Oscuro',
    nextLabel: 'Modo Claro',
    aria: 'Activar modo claro',
    Icon: Moon,
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderColor: 'rgba(148, 163, 184, 0.5)',
  },
  light: {
    label: 'Modo Claro',
    nextLabel: 'Modo Lluvioso',
    aria: 'Activar modo lluvioso',
    Icon: Sun,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    borderColor: 'rgba(251, 191, 36, 0.6)',
  },
};

/**
 * Toggle de tema con 3 modos: rainy → dark → light → rainy.
 * - Muestra un ícono según el modo: CloudRain (lluvioso), Moon (oscuro), Sun (claro).
 * - Persistencia: guardada por ThemeContext en localStorage.
 * - Mismo tamaño que el botón de sonido (min-h-[64px]).
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const meta = THEME_META[theme] || THEME_META.rainy;
  const { Icon, gradient, borderColor, aria } = meta;

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-2xl min-h-[64px] px-4 text-white font-bold transition-all duration-200 shadow-xl hover:scale-[1.02] border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
      style={{
        background: gradient,
        borderColor,
      }}
      aria-label={aria}
      title={meta.label}
      role="switch"
      aria-checked={theme === 'rainy'}
    >
      <Icon className="w-7 h-7" aria-hidden="true" />
      <span className="sr-only">{meta.label}</span>
    </button>
  );
}
