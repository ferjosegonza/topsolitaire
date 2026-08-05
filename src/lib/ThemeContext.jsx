import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'topsolitaire-theme';

const THEME_CYCLE = ['rainy', 'dark', 'light'];

function getValidTheme(theme) {
  return THEME_CYCLE.includes(theme) ? theme : 'rainy';
}

function getNextTheme(current) {
  const idx = THEME_CYCLE.indexOf(current);
  const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
  return next;
}

// Valor por defecto: permite usar useTheme/ThemeToggle sin provider
// (necesario para los tests que renderizan componentes de forma aislada).
const defaultContext = {
  theme: 'rainy',
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return getValidTheme(stored);
    } catch {
      // localStorage no disponible (SSR, privado, etc.)
    }
    return 'rainy'; // 🎯 Modo Lluvioso por defecto
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignorar errores de localStorage
    }
    // Aplicar el data-theme en el html y el body
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => getNextTheme(prev));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
}

export default ThemeContext;

