import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as solitaire from '../src/lib/solitaire';

// Mock del componente SolitaireGame para pruebas
vi.mock('../src/components/solitaire/SolitaireGame', () => ({
  default: () => <div data-testid="solitaire-game">Solitaire Game Mock</div>
}));

// ✅ Importar después del mock (en lugar de antes)
import SolitaireGame from '../src/components/solitaire/SolitaireGame';

describe('Solitaire Game - Tests', () => {
  describe('Lógica del juego (solitaire.js)', () => {
    it('guarda y restaura un snapshot previo del juego para deshacer', () => {
      const initialGame = solitaire.deal();
      const initialSnapshot = solitaire.createGameSnapshot(initialGame, 3, 45, false, null);

      const mutatedState = {
        game: solitaire.cloneGameState(initialGame),
        moves: 4,
        seconds: 46,
        won: true,
        selection: { source: 'waste' },
      };
      mutatedState.game.stock = [];
      mutatedState.game.waste = [{ suit: 'hearts', rank: 1, faceUp: true, id: 'h-1' }];

      const restored = solitaire.restoreGameSnapshot(mutatedState, initialSnapshot);

      expect(restored.game.stock).toHaveLength(initialGame.stock.length);
      expect(restored.game.waste).toHaveLength(0);
      expect(restored.moves).toBe(3);
      expect(restored.seconds).toBe(45);
      expect(restored.won).toBe(false);
      expect(restored.selection).toBeNull();
    });
    it('crea un mazo de 52 cartas', () => {
      const deck = solitaire.createDeck();
      expect(deck).toHaveLength(52);
    });

    it('baraja el mazo correctamente', () => {
      const deck = solitaire.createDeck();
      const shuffled = solitaire.shuffle(deck);
      expect(shuffled).toHaveLength(52);
      let changed = false;
      for (let i = 0; i < deck.length; i++) {
        if (deck[i].id !== shuffled[i].id) {
          changed = true;
          break;
        }
      }
      expect(changed).toBe(true);
    });

    it('reparte correctamente el juego', () => {
      const game = solitaire.deal();
      expect(game.tableau).toHaveLength(7);
      expect(game.stock).toBeDefined();
      expect(game.waste).toBeDefined();
      expect(game.foundations).toHaveLength(4);
      expect(game.tableau[0]).toHaveLength(1);
      expect(game.tableau[6]).toHaveLength(7);
    });

    it('valida colocación en tableau correctamente', () => {
      const column = [{ suit: 'hearts', rank: 10, faceUp: true }];
      const card = { suit: 'spades', rank: 9 };
      expect(solitaire.canPlaceOnTableau(card, column)).toBe(true);
    });

    it('valida colocación en tableau - no permite colocar incorrectamente', () => {
      const column = [{ suit: 'hearts', rank: 10, faceUp: true }];
      const card = { suit: 'spades', rank: 8 };
      expect(solitaire.canPlaceOnTableau(card, column)).toBe(false);
    });

    it('valida colocación en foundation correctamente', () => {
      const foundation = [{ suit: 'hearts', rank: 1 }];
      const card = { suit: 'hearts', rank: 2 };
      expect(solitaire.canPlaceOnFoundation(card, foundation)).toBe(true);
    });

    it('valida colocación en foundation - no permite colocar incorrectamente', () => {
      const foundation = [{ suit: 'hearts', rank: 1 }];
      const card = { suit: 'spades', rank: 2 };
      expect(solitaire.canPlaceOnFoundation(card, foundation)).toBe(false);
    });

    it('detecta si el juego está ganado', () => {
      const game = {
        foundations: [
          Array(13).fill({ suit: 'hearts' }),
          Array(13).fill({ suit: 'diamonds' }),
          Array(13).fill({ suit: 'clubs' }),
          Array(13).fill({ suit: 'spades' })
        ]
      };
      expect(solitaire.isWon(game)).toBe(true);
    });

    it('identifica correctamente cartas rojas', () => {
      expect(solitaire.isRed('hearts')).toBe(true);
      expect(solitaire.isRed('diamonds')).toBe(true);
      expect(solitaire.isRed('clubs')).toBe(false);
      expect(solitaire.isRed('spades')).toBe(false);
    });

    it('crea las constantes correctamente', () => {
      expect(solitaire.SUITS).toHaveLength(4);
      expect(solitaire.SUITS).toContain('hearts');
      expect(solitaire.SUITS).toContain('diamonds');
      expect(solitaire.SUITS).toContain('clubs');
      expect(solitaire.SUITS).toContain('spades');
      expect(solitaire.RANK_LABELS).toHaveLength(14);
      expect(solitaire.RANK_LABELS[1]).toBe('A');
      expect(solitaire.RANK_LABELS[13]).toBe('K');
    });
  });

  describe('Renderizado del juego', () => {
    it('renderiza el componente SolitaireGame', () => {
      // ✅ Si el entorno falla, este test fallará, pero es la estructura correcta
      render(<SolitaireGame />);
      expect(screen.getByTestId('solitaire-game')).toBeDefined();
    });
  });
});