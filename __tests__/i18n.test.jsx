import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import i18n, { resolveLanguage, SUPPORTED_LANGS, LANG_META } from '../src/i18n';
import LanguageSelector from '../src/components/ui/LanguageSelector';

// Keys de UI que deben existir en TODOS los idiomas (namespace "translation")
const REQUIRED_KEYS = [
  'meta.title',
  'meta.description',
  'game.badge',
  'game.title',
  'game.subtitle',
  'game.moves',
  'game.time',
  'game.newGame',
  'game.youWon',
  'game.solvedIn',
  'game.timeLabel',
  'game.playAgain',
  'game.howToPlay',
  'game.rule1',
  'game.rule2',
  'game.rule3',
  'game.rule4',
  'game.rule5',
  'game.ariaNewGame',
  'lang.select',
  'footer.rights',
  'footer.privacy',
  'footer.contact',
];

// Función auxiliar para obtener un valor anidado por dotted-path
function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

describe('i18n resolveLanguage()', () => {
  it('mapea español → es', () => {
    expect(resolveLanguage('es-AR')).toBe('es');
    expect(resolveLanguage('es-ES')).toBe('es');
    expect(resolveLanguage('es')).toBe('es');
  });

  it('mapea francés, italiano, polaco y alemán', () => {
    expect(resolveLanguage('fr-FR')).toBe('fr');
    expect(resolveLanguage('it-IT')).toBe('it');
    expect(resolveLanguage('pl-PL')).toBe('pl');
    expect(resolveLanguage('de-DE')).toBe('de');
  });

  it('mapea chino simplificado → zh', () => {
    expect(resolveLanguage('zh-CN')).toBe('zh');
    expect(resolveLanguage('zh-SG')).toBe('zh');
    expect(resolveLanguage('zh')).toBe('zh');
  });

  it('mapea chino tradicional → zh-TW', () => {
    expect(resolveLanguage('zh-TW')).toBe('zh-TW');
    expect(resolveLanguage('zh-HK')).toBe('zh-TW');
    expect(resolveLanguage('zh-MO')).toBe('zh-TW');
  });

  it('mapea inglés → en', () => {
    expect(resolveLanguage('en-US')).toBe('en');
    expect(resolveLanguage('en-GB')).toBe('en');
    expect(resolveLanguage('en')).toBe('en');
  });

  it('usa fallback a inglés para idiomas no soportados', () => {
    expect(resolveLanguage('ja-JP')).toBe('en');
    expect(resolveLanguage('ko-KR')).toBe('en');
    expect(resolveLanguage('xx-XX')).toBe('en');
  });

  it('usa fallback a inglés cuando no hay idioma', () => {
    expect(resolveLanguage(null)).toBe('en');
    expect(resolveLanguage(undefined)).toBe('en');
    expect(resolveLanguage('')).toBe('en');
  });

  it('es insensible a mayúsculas', () => {
    expect(resolveLanguage('ES-AR')).toBe('es');
    expect(resolveLanguage('ZH-TW')).toBe('zh-TW');
  });
});

describe('i18n SUPPORTED_LANGS y LANG_META', () => {
  it('incluye todos los idiomas requeridos', () => {
    for (const lng of ['en', 'es', 'fr', 'it', 'pl', 'de', 'zh', 'zh-TW']) {
      expect(SUPPORTED_LANGS).toContain(lng);
    }
  });

  it('cada idioma soportado tiene metadatos (bandera + nombre nativo)', () => {
    for (const lng of SUPPORTED_LANGS) {
      const meta = LANG_META[lng];
      expect(meta).toBeDefined();
      expect(meta.flag).toBeTruthy();
      expect(meta.label).toBeTruthy();
    }
  });
});

describe('i18n recursos de traducción (completitud)', () => {
  describe.each(SUPPORTED_LANGS)('%s', (lng) => {
    it('contiene todas las claves de UI requeridas con texto no vacío', () => {
      const bundle = i18n.getResourceBundle(lng, 'translation');
      expect(bundle).toBeDefined();
      for (const key of REQUIRED_KEYS) {
        const value = getByPath(bundle, key);
        expect(value, `Falta clave "${key}" en idioma "${lng}"`).toBeTruthy();
        expect(String(value).trim().length).toBeGreaterThan(0);
      }
    });

    it('no deja la key sin traducir (no renderiza el path literal)', () => {
      const bundle = i18n.getResourceBundle(lng, 'translation');
      for (const key of REQUIRED_KEYS) {
        const value = String(getByPath(bundle, key));
        // Si el valor es igual al path, significa que falta la traducción
        expect(value).not.toBe(key);
      }
    });

    it('soporta interpolación de {{moves}} y {{time}}', () => {
      const bundle = i18n.getResourceBundle(lng, 'translation');
      expect(getByPath(bundle, 'game.solvedIn')).toContain('{{moves}}');
      expect(getByPath(bundle, 'game.timeLabel')).toContain('{{time}}');
    });
  });
});

describe('i18n cambio de idioma en vivo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('cambia el idioma y persiste en localStorage', () => {
    i18n.changeLanguage('es');
    expect(localStorage.getItem('topsolitaire-lang')).toBe('es');
    expect(i18n.t('game.newGame')).toBe('Nuevo Juego');

    i18n.changeLanguage('zh');
    expect(localStorage.getItem('topsolitaire-lang')).toBe('zh');
    expect(i18n.t('game.newGame')).toBe('新游戏');

    i18n.changeLanguage('en');
    expect(localStorage.getItem('topsolitaire-lang')).toBe('en');
    expect(i18n.t('game.newGame')).toBe('New Game');
  });

  it('aplica el atributo data-lang en <html>', () => {
    i18n.changeLanguage('fr');
    expect(document.documentElement.getAttribute('data-lang')).toBe('fr');
  });

  it('traduce claves con interpolación correctamente', () => {
    i18n.changeLanguage('en');
    expect(i18n.t('game.solvedIn', { moves: 42 })).toBe('Solved in 42 moves');
    expect(i18n.t('game.timeLabel', { time: '3:05' })).toBe('Time: 3:05');
  });
});

describe('LanguageSelector (componente)', () => {
  // Usamos el i18n REAL ya configurado en src/i18n.js (no mockeamos react-i18next)
  // para evitar romper el import de @/i18n que depende de initReactI18next.
  beforeEach(() => {
    // Forzar idioma inglés para que el aria-label sea estable
    i18n.changeLanguage('en');
  });

  it('muestra el botón con aria-label de "Choose language"', () => {
    render(<LanguageSelector />);
    const btn = screen.getByRole('button', { name: 'Choose language' });
    expect(btn).toBeDefined();
  });

it('abre el menú con todas las opciones al hacer clic', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole('button', { name: 'Choose language' }));
    // Cada opción del menú debe tener role="option"
    for (const lng of SUPPORTED_LANGS) {
      const option = screen.getByRole('option', { name: new RegExp(LANG_META[lng].label) });
      expect(option).toBeDefined();
    }
  });

  it('cambia el idioma real al seleccionar una opción', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole('button', { name: 'Choose language' }));
    fireEvent.click(screen.getByText('Español'));
    expect(i18n.language).toBe('es');
    // El texto traducido debe cambiar
    expect(i18n.t('game.newGame')).toBe('Nuevo Juego');
  });

it('marca la opción activa con aria-selected', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole('button', { name: 'Choose language' }));
    // En inglés, la opción activa es "English"
    const englishOption = screen.getByRole('option', { name: /English/ });
    expect(englishOption.getAttribute('aria-selected')).toBe('true');
  });
});
