import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import SolitaireGame from '../src/components/solitaire/SolitaireGame';
import * as solitaire from '../src/lib/solitaire';

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

// ============================================================
// Helpers para estado determinista
// ============================================================
const c = (id, suit, rank, faceUp = true) => ({ id, suit, rank, faceUp });

const emptyGame = () => ({
  tableau: [[], [], [], [], [], [], []],
  stock: [],
  waste: [],
  foundations: [[], [], [], []],
});

const movesValue = () => document.querySelector('.tabular-nums')?.textContent;

// Mock de getBoundingClientRect para poder detectar destinos en jsdom
function mockRects() {
  document.querySelectorAll('[data-tableau-slot]').forEach((slot, i) => {
    slot.getBoundingClientRect = () => ({
      left: i * 80,
      right: i * 80 + 70,
      top: 0,
      bottom: 500,
      width: 70,
      height: 500,
      x: i * 80,
      y: 0,
      toJSON: () => ({}),
    });
  });
  document.querySelectorAll('[data-foundation-slot]').forEach((slot, i) => {
    slot.getBoundingClientRect = () => ({
      left: 300 + i * 80,
      right: 300 + i * 80 + 70,
      top: 0,
      bottom: 100,
      width: 70,
      height: 100,
      x: 300 + i * 80,
      y: 0,
      toJSON: () => ({}),
    });
  });
  document.querySelectorAll('[data-card-id]').forEach((el) => {
    el.getBoundingClientRect = () => ({
      left: 10,
      right: 80,
      top: 10,
      bottom: 118,
      width: 70,
      height: 108,
      x: 10,
      y: 10,
      toJSON: () => ({}),
    });
  });
}

// Simula un arrastre completo: mousedown → mousemove → mouseup
const dragFromTo = async (cardId, fromX, fromY, toX, toY) => {
  const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
  if (!cardEl) throw new Error(`Carta ${cardId} no encontrada en el DOM`);

  await act(async () => {
    fireEvent.mouseDown(cardEl, { button: 0, clientX: fromX, clientY: fromY });
  });
  await act(async () => {
    fireEvent.mouseMove(document, { clientX: toX, clientY: toY });
  });
  await act(async () => {
    fireEvent.mouseUp(document, { clientX: toX, clientY: toY });
  });
};

describe('Drag & Drop - comportamiento real (estado determinista)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('existen 7 slots de tableau y 4 de foundation (también en columnas con cartas)', async () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'hearts', 1, true)];
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);

    expect(document.querySelectorAll('[data-tableau-slot]')).toHaveLength(7);
    expect(document.querySelectorAll('[data-foundation-slot]')).toHaveLength(4);

    // Una columna CON cartas también tiene el atributo data-tableau-slot
    const col0 = document.querySelector('[data-tableau-slot="0"]');
    expect(col0.querySelector('[data-card-id="c1"]')).toBeTruthy();
  });

  it('arrastrar una carta de tableau a otra columna la mueve', async () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'clubs', 12, true)]; // Q ♣
    game.tableau[1] = [c('c2', 'diamonds', 13, true)]; // K ♦ (destino válido)
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    mockRects();

    // Suelta sobre la col 1 (left 80–150)
    await dragFromTo('c1', 30, 30, 120, 250);

    expect(movesValue()).toBe('1');
    expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeTruthy();
    expect(document.querySelector('[data-tableau-slot="0"] [data-card-id]')).toBeNull();
  });

  it('arrastrar la última carta del tableau a foundation la mueve', async () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'hearts', 1, true)]; // As ♥
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    mockRects();

    // Suelta sobre la foundation 0 (left 300–370)
    await dragFromTo('c1', 30, 30, 320, 50);

    expect(movesValue()).toBe('1');
    expect(document.querySelector('[data-foundation-slot="0"] .solitaire-card:not(.solitaire-card-back)')).toBeTruthy();
    expect(document.querySelector('[data-card-id="c1"]')).toBeNull();
  });

  it('un arrastre corto (menos del umbral de 5px) NO mueve la carta', async () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'clubs', 8, true)];
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    mockRects();

    // Solo 3px de desplazamiento
    await dragFromTo('c1', 30, 30, 33, 33);

    expect(movesValue()).toBe('0');
    expect(document.querySelector('[data-card-id="c1"]')).toBeTruthy();
  });

  it('un grupo de cartas se arrastra y se mueve COMPLETO', async () => {
    const game = emptyGame();
    game.tableau[0] = [
      c('c1', 'clubs', 12, true),
      c('c2', 'diamonds', 11, true),
      c('c3', 'spades', 10, true),
    ]; // Grupo válido (Q♣ J♦ 10♠)
    game.tableau[1] = [c('c4', 'hearts', 13, true)]; // K ♥ (destino)
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    mockRects();

    await dragFromTo('c1', 30, 30, 120, 250);

    expect(movesValue()).toBe('1');
    const col1 = document.querySelector('[data-tableau-slot="1"]');
    expect(col1.querySelector('[data-card-id="c1"]')).toBeTruthy();
    expect(col1.querySelector('[data-card-id="c2"]')).toBeTruthy();
    expect(col1.querySelector('[data-card-id="c3"]')).toBeTruthy();
    // La columna de origen quedó vacía
    expect(document.querySelector('[data-tableau-slot="0"] [data-card-id]')).toBeNull();
  });

  it('no se puede arrastrar una carta boca abajo', async () => {
    const game = emptyGame();
    game.tableau[0] = [c('c1', 'clubs', 8, false)];
    vi.spyOn(solitaire, 'deal').mockReturnValue(game);
    vi.spyOn(solitaire, 'isWon').mockReturnValue(false);

    render(<SolitaireGame />);
    mockRects();

    await dragFromTo('c1', 30, 30, 120, 250);

    expect(movesValue()).toBe('0');
    expect(document.querySelector('[data-card-id="c1"]')).toBeTruthy();
  });
});

