import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

// Mock de Analytics de Vercel (evita dependencia de red)
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

// Mock de sonidos (evita dependencia de use-sound / audio)
vi.mock('../src/hooks/useSoundEffects', () => ({
  useSoundEffects: () => ({
    isMuted: false,
    toggleMute: vi.fn(),
    playFlipSound: vi.fn(),
    playPlaceSound: vi.fn(),
    playDealSound: vi.fn(),
    playWinSound: vi.fn(),
    playClickSound: vi.fn(),
  }),
}));

import App from '../src/App';

const navigateTo = (path) => {
  window.history.pushState({}, '', path);
};

describe('App - rutas y navegación del sitio (BrowserRouter)', () => {
  afterEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  it('renderiza el Home con el juego en la ruta raíz', () => {
    navigateTo('/');
    render(<App />);
    expect(screen.getAllByText(/Play Solitaire Online Free/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/New Game/i)).toBeDefined();
    expect(screen.getByText(/Moves:/i)).toBeDefined();
    expect(screen.getByText(/Time:/i)).toBeDefined();
  });

  it('renderiza la página de Privacy Policy en /privacy-policy', () => {
    navigateTo('/privacy-policy');
    render(<App />);
    expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes('without registration or login')).length).toBeGreaterThan(0);
  });

  it('renderiza la página de Contact en /contact', () => {
    navigateTo('/contact');
    render(<App />);
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
  });

  it('una ruta desconocida renderiza la página 404 (NotFound) con enlace de retorno', () => {
    navigateTo('/ruta-que-no-existe');
    render(<App />);
    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(screen.getByText(/Back to Solitaire/i)).toBeDefined();
  });

  it('el footer contiene enlaces a Privacy Policy y Contact con rutas limpias', () => {
    navigateTo('/');
    render(<App />);
    const privacyLink = screen.getByText('Privacy Policy').closest('a');
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('el sitio no depende de autenticación: no hay ruta de login', () => {
    navigateTo('/');
    render(<App />);
    // La app no expone ningún enlace/ruta de login/registro en el footer ni en la página principal
    expect(screen.queryByText(/Log in/i)).toBeNull();
    expect(screen.queryByText(/Create your account/i)).toBeNull();
  });

  it('actualiza canonical y robots correctamente en páginas indexables y 404', () => {
    navigateTo('/privacy-policy');
    render(<App />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://topsolitaire.online/privacy-policy');
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('index, follow');
  });

  it('asigna noindex en rutas 404', () => {
    navigateTo('/pagina-inexistente-xyz');
    render(<App />);
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('renderiza rutas localizadas por idioma (ej: /es) y genera tags hreflang', () => {
    navigateTo('/es');
    render(<App />);
    expect(document.documentElement.lang).toBe('es');
    expect(document.documentElement.getAttribute('data-lang')).toBe('es');
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://topsolitaire.online/es');
    
    // Verificar hreflang tags
    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    expect(hreflangs.length).toBeGreaterThanOrEqual(9); // 8 idiomas + x-default
    const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    expect(xDefault?.getAttribute('href')).toBe('https://topsolitaire.online/');
  });

  it('renderiza subpáginas localizadas (ej: /fr/privacy-policy) y actualiza enlace de retorno', () => {
    navigateTo('/fr/privacy-policy');
    render(<App />);
    const backLink = screen.getByText('← Back to Solitaire').closest('a');
    expect(backLink).toHaveAttribute('href', '/fr');
  });

  it('en la home localizada (ej: /fr) el footer contiene enlaces en el idioma activo', () => {
    navigateTo('/fr');
    render(<App />);
    const privacyLink = screen.getByText('Politique de confidentialité').closest('a');
    expect(privacyLink).toHaveAttribute('href', '/fr/privacy-policy');
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/fr/contact');
  });

  it('un prefijo de idioma inválido (ej: /invalido-lang/privacy-policy) cae en 404', () => {
    navigateTo('/invalido-lang/privacy-policy');
    render(<App />);
    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
  });
});



