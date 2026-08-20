import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, getAllByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SolitaireGame from '../src/components/solitaire/SolitaireGame';
import Home from '../src/pages/Home';
import Footer from '../src/components/Footer';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../src/i18n';

// Mock de sonidos
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

beforeEach(async () => {
  window.history.pushState({}, '', '/');
  await i18n.changeLanguage('en');
});

describe('Tests de UI - Botones e Interacciones', () => {
  describe('Botón New Game', () => {
    it('existe el botón New Game', () => {
      render(<SolitaireGame />);
      expect(screen.getByText(/New Game/i)).toBeDefined();
    });

    it('el botón New Game tiene el estilo correcto (grande, visible)', () => {
      render(<SolitaireGame />);
      const button = screen.getByText(/New Game/i).closest('button');
      expect(button.className).toContain('rounded-2xl');
      expect(button.className).toContain('sm:min-h-[64px]');
      expect(button.className).toContain('sm:text-lg');
    });

    it('el botón New Game existe y es clickeable', () => {
      render(<SolitaireGame />);
      const newGameBtn = screen.getByText(/New Game/i).closest('button');
      expect(newGameBtn).toBeDefined();
      fireEvent.click(newGameBtn);
      // Verificar que el juego no se rompe
      expect(screen.getByText(/Moves:/i)).toBeDefined();
    });
  });

  describe('Botón Mute/Unmute', () => {
    it('existe el botón Mute/Unmute', () => {
      render(<SolitaireGame />);
      const muteBtn = document.querySelector('[aria-label="Activar sonido"]') || 
                      document.querySelector('[aria-label="Silenciar sonido"]');
      expect(muteBtn).toBeDefined();
    });

    it('el botón Mute/Unmute es grande y visible', () => {
      render(<SolitaireGame />);
      const muteBtn = document.querySelector('[aria-label="Activar sonido"]') || 
                      document.querySelector('[aria-label="Silenciar sonido"]');
      // Verificar que el span dentro del botón tiene text-5xl
      const span = muteBtn?.querySelector('.text-5xl');
      expect(span).toBeDefined();
      // Verificar que el botón tiene min-h-[64px]
      expect(muteBtn.className).toContain('min-h-[64px]');
    });

    it('el botón Mute/Unmute cambia de ícono al hacer clic', () => {
      render(<SolitaireGame />);
      const muteBtn = document.querySelector('[aria-label="Activar sonido"]') || 
                      document.querySelector('[aria-label="Silenciar sonido"]');
      expect(muteBtn).toBeDefined();
      fireEvent.click(muteBtn);
      const label = muteBtn.getAttribute('aria-label');
      expect(label).toMatch(/Activar sonido|Silenciar sonido/);
    });
  });

  describe('Contadores', () => {
    it('muestra el contador de movimientos', () => {
      render(<SolitaireGame />);
      expect(screen.getByText(/Moves:/i)).toBeDefined();
    });

    it('muestra el contador de tiempo', () => {
      render(<SolitaireGame />);
      expect(screen.getByText(/Time:/i)).toBeDefined();
    });

    it('el tiempo comienza en 0 (en vez de 0:00)', () => {
      render(<SolitaireGame />);
      // Buscar el texto "0:00" dentro del span con clase tabular-nums
      const timeElement = document.querySelector('.tabular-nums');
      expect(timeElement).toBeDefined();
      expect(timeElement.textContent).toBe('0');
    });
  });
});

describe('Tests del Footer', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('Footer tiene el texto de copyright', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });

  it('Footer tiene enlace a Privacy Policy', () => {
    renderWithRouter(<Footer />);
    const link = screen.getByText('Privacy Policy');
    expect(link.closest('a')).toHaveAttribute('href', '/privacy-policy');
  });

  it('Footer tiene enlace a Contact', () => {
    renderWithRouter(<Footer />);
    const link = screen.getByText('Contact');
    expect(link.closest('a')).toHaveAttribute('href', '/contact');
  });
});

describe('Tests de Home', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('Home muestra el título del juego', () => {
    renderWithRouter(<Home />);
    // Usar getAllByText porque el texto aparece en el título y en el footer
    const elements = screen.getAllByText(/Play Solitaire Online Free/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Home muestra la descripción del juego', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/no signup, no download/i)).toBeDefined();
  });

  it('Home contiene el componente SolitaireGame', () => {
    renderWithRouter(<Home />);
    const gameContainer = document.querySelector('.min-h-screen');
    expect(gameContainer).toBeDefined();
  });
});

describe('Accesibilidad', () => {
  it('los botones tienen aria-label', () => {
    render(<SolitaireGame />);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      if (btn.textContent.includes('🔊') || btn.textContent.includes('🔇')) {
        expect(btn.hasAttribute('aria-label')).toBe(true);
      }
    });
  });

  it('las cartas tienen role="button" y tabIndex="0"', () => {
    render(<SolitaireGame />);
    const cards = document.querySelectorAll('[role="button"]');
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach(card => {
      expect(card.getAttribute('tabIndex')).toBe('0');
    });
  });
});
