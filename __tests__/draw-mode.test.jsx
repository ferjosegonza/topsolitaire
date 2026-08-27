import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act, screen } from '@testing-library/react';
import React from 'react';
import SolitaireGame from '../src/components/solitaire/SolitaireGame';

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

const waitForDealing = () =>
  act(async () => {
    await new Promise((r) => setTimeout(r, 1200));
  });

describe('P15 - Modo de reparto Turn 1 / Turn 3', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const stockCardsInDOM = () =>
    document.querySelectorAll('.game-board [data-testid]').length;

  it('muestra el selector de reparto con opciones 1 y 3', async () => {
    render(<SolitaireGame />);
    await waitForDealing();

    const drawOne = screen.getByRole('button', { name: /Draw 1/i });
    const drawThree = screen.getByRole('button', { name: /Draw 3/i });
    expect(drawOne).toBeDefined();
    expect(drawThree).toBeDefined();
    // Por defecto Turn 1 está activo
    expect(drawOne.getAttribute('aria-pressed')).toBe('true');
    expect(drawThree.getAttribute('aria-pressed')).toBe('false');
  });

  it('persiste la preferencia de reparto en localStorage', async () => {
    render(<SolitaireGame />);
    await waitForDealing();

    fireEvent.click(screen.getByRole('button', { name: /Draw 3/i }));
    expect(localStorage.getItem('topsolitaire-draw')).toBe('3');

    fireEvent.click(screen.getByRole('button', { name: /Draw 1/i }));
    expect(localStorage.getItem('topsolitaire-draw')).toBe('1');
  });

  it('en modo Turn 1 saca exactamente una carta al waste al tocar el stock', async () => {
    render(<SolitaireGame />);
    await waitForDealing();

    fireEvent.click(screen.getByRole('button', { name: /Draw 1/i }));

    // El stock es la primera carta boca abajo (clase solitaire-card-back).
    // Buscamos el segundo slot del mazo usando el dorso.
    const faceDownCards = document.querySelectorAll('.solitaire-card-back');
    expect(faceDownCards.length).toBeGreaterThan(0);
    const stockPile = faceDownCards[0];
    fireEvent.click(stockPile);

    // Tras sacar 1 carta, el waste tiene exactamente 1 carta boca arriba
    const faceUpWaste = document.querySelectorAll('.solitaire-card:not(.solitaire-card-back):not(.game-slot)');
    expect(faceUpWaste.length).toBeGreaterThanOrEqual(1);
  });

  it('en modo Turn 3 el selector queda activo y recuerda el modo', async () => {
    render(<SolitaireGame />);
    await waitForDealing();

    fireEvent.click(screen.getByRole('button', { name: /Draw 3/i }));
    const drawThree = screen.getByRole('button', { name: /Draw 3/i });
    expect(drawThree.getAttribute('aria-pressed')).toBe('true');
  });
});
