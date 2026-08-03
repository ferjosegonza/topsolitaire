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

const setHash = (hash) => {
  window.location.hash = hash;
};

describe('App - rutas y navegación del sitio', () => {
  afterEach(() => {
    cleanup();
    window.location.hash = '#/';
  });

  it('renderiza el Home con el juego en la ruta raíz', () => {
    setHash('#/');
    render(<App />);
    expect(screen.getAllByText(/Play Solitaire Online Free/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/New Game/i)).toBeDefined();
    expect(screen.getByText(/Moves:/i)).toBeDefined();
    expect(screen.getByText(/Time:/i)).toBeDefined();
  });

  it('renderiza la página de Privacy Policy en /privacy-policy', () => {
    setHash('#/privacy-policy');
    render(<App />);
    expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/no registration or login/i).length).toBeGreaterThan(0);
  });

  it('renderiza la página de Contact en /contact', () => {
    setHash('#/contact');
    render(<App />);
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
  });

  it('una ruta desconocida cae en el Home (juego)', () => {
    setHash('#/ruta-que-no-existe');
    render(<App />);
    expect(screen.getAllByText(/Play Solitaire Online Free/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/New Game/i)).toBeDefined();
  });

  it('el footer contiene enlaces a Privacy Policy y Contact', () => {
    setHash('#/');
    render(<App />);
    const privacyLink = screen.getByText('Privacy Policy').closest('a');
    expect(privacyLink).toHaveAttribute('href', '#/privacy-policy');
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '#/contact');
  });

  it('el sitio no depende de autenticación: no hay ruta de login', () => {
    setHash('#/');
    render(<App />);
    // La app no expone ningún enlace/ruta de login/registro en el footer ni en la página principal
    expect(screen.queryByText(/Log in/i)).toBeNull();
    expect(screen.queryByText(/Create your account/i)).toBeNull();
  });
});

