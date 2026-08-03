import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SolitaireGame from '../src/components/solitaire/SolitaireGame';
import * as solitaire from '../src/lib/solitaire';

// Mock de sonidos con funciones verificables
const mockPlayPlaceSound = vi.fn();
const mockPlayFlipSound = vi.fn();
const mockPlayDealSound = vi.fn();
const mockPlayWinSound = vi.fn();
const mockToggleMute = vi.fn();

vi.mock('../src/hooks/useSoundEffects', () => ({
  useSoundEffects: () => ({
    isMuted: false,
    toggleMute: mockToggleMute,
    playFlipSound: mockPlayFlipSound,
    playPlaceSound: mockPlayPlaceSound,
    playDealSound: mockPlayDealSound,
    playWinSound: mockPlayWinSound,
    playClickSound: vi.fn(),
  }),
}));

// ============================================================
// Helpers para estado determinista (no dependen del azar de deal())
// ============================================================
const c = (id, suit, rank, faceUp = true) => ({ id, suit, rank, faceUp });

const emptyGame = () => ({
  tableau: [[], [], [], [], [], [], []],
  stock: [],
  waste: [],
  foundations: [[], [], [], []],
});

const clickCard = (id) => {
  const el = document.querySelector(`[data-card-id="${id}"] .solitaire-card`);
  if (!el) throw new Error(`Carta ${id} no encontrada en el DOM`);
  fireEvent.click(el);
};

const movesValue = () => document.querySelector('.tabular-nums')?.textContent;

const foundationHasCard = (fIndex) =>
  document.querySelector(`[data-foundation-slot="${fIndex}"] .solitaire-card:not(.solitaire-card-back)`) !== null;

describe('Auto-move - comportamiento real (estado determinista)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('la última carta que puede ir a foundation se auto-mueve (prioridad 1)', () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'hearts', 1, true)]; // As ♥
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    clickCard('c1');

    expect(movesValue()).toBe('1');
    expect(mockPlayPlaceSound).toHaveBeenCalledTimes(1);
    // Salió del tableau
    expect(document.querySelector('[data-card-id="c1"]')).toBeNull();
    // Foundation 0 tiene una carta boca arriba
    expect(foundationHasCard(0)).toBe(true);
  });

  it('si puede ir a foundation Y a tableau, prioriza foundation', () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'hearts', 1, true)]; // As ♥
    game.tableau[1] = [c('c2', 'spades', 2, true)]; // 2 ♠ (destino tableau válido)
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    clickCard('c1');

    expect(movesValue()).toBe('1');
    // NO se movió al tableau: la col 1 conserva c2
    expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c2"]')).toBeTruthy();
    // SÍ fue a foundation
    expect(foundationHasCard(0)).toBe(true);
  });

  it('si hay varios destinos tableau, elige la columna con MÁS cartas', () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'clubs', 12, true)]; // Q ♣
    game.tableau[1] = [c('c2', 'diamonds', 13, true), c('c3', 'hearts', 12, true), c('c4', 'spades', 11, true)]; // 3 cartas
    game.tableau[2] = [c('c5', 'spades', 13, true)]; // 1 carta
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    clickCard('c1');

    expect(movesValue()).toBe('1');
    expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeTruthy();
    expect(document.querySelector('[data-tableau-slot="2"] [data-card-id="c1"]')).toBeNull();
  });

  it('en caso de empate entre destinos, elige la columna más a la derecha', () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'clubs', 12, true)]; // Q ♣
    game.tableau[1] = [c('c2', 'diamonds', 13, true)]; // 1 carta
    game.tableau[2] = [c('c3', 'spades', 13, true)]; // 1 carta (empate)
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    clickCard('c1');

    expect(movesValue()).toBe('1');
    expect(document.querySelector('[data-tableau-slot="2"] [data-card-id="c1"]')).toBeTruthy();
    expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeNull();
  });

  it('un clic en la última carta boca abajo la voltea (no la mueve)', () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'hearts', 5, false)];
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);

    // Inicialmente boca abajo
    expect(document.querySelector('[data-card-id="c1"] .solitaire-card-back')).toBeTruthy();

    clickCard('c1');

    // Tras el clic quedó boca arriba
    expect(document.querySelector('[data-card-id="c1"] .solitaire-card-back')).toBeNull();
    expect(document.querySelector('[data-card-id="c1"] .solitaire-card:not(.solitaire-card-back)')).toBeTruthy();
    expect(movesValue()).toBe('0');
    expect(mockPlayFlipSound).toHaveBeenCalled();
  });

  it('al hacer clic en el stock vacío, el waste se reinvierte al stock', () => {
    const game = emptyGame();
    game.stock = [];
    game.waste = [c('c1', 'hearts', 5, true)];
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);

    // El stock está vacío → muestra el símbolo de reinicio ↻
    const resetBtn = screen.getByText('↻').closest('div');
    expect(resetBtn).toBeTruthy();
    fireEvent.click(resetBtn);

    // El stock ahora tiene una carta boca abajo
    expect(document.querySelector('.grid-cols-7 .solitaire-card-back')).toBeTruthy();
    // El waste quedó vacío (sin carta boca arriba)
    const topRow = document.querySelectorAll('.grid-cols-7')[0];
    expect(topRow.children[1].querySelector('.solitaire-card:not(.solitaire-card-back)')).toBeNull();
  });
});

