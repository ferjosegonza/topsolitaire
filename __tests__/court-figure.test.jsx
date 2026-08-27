import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import SolitaireCard from '../src/components/solitaire/SolitaireCard';
import { SUIT_SYMBOLS } from '../src/lib/solitaire';

function renderCard(rank, suit) {
  return render(
    <SolitaireCard
      card={{ suit, rank }}
      onClick={() => {}}
      onDoubleClick={() => {}}
      onMouseDown={() => {}}
      onTouchStart={() => {}}
      style={{}}
    />
  );
}

describe('P17 - Figuras de corte J/Q/K', () => {
  it('J, Q y K de corazones renderizan su figura SVG (aria-hidden)', () => {
    for (const rank of [11, 12, 13]) {
      const { container } = renderCard(rank, 'hearts');
      const svg = container.querySelector('svg.court-figure');
      expect(svg).not.toBeNull();
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      const color = svg.querySelector('g')?.getAttribute('fill');
      expect(color).toBe('#e11d48'); // rojo (rose-600)
    }
  });

  it('las figuras negras usan el color del palo negro', () => {
    const { container } = renderCard(11, 'spades');
    const svg = container.querySelector('svg.court-figure');
    expect(svg.querySelector('g')?.getAttribute('fill')).toBe('#0f172a');
  });

  it('una carta numérica (10) NO muestra la figura', () => {
    const { container } = renderCard(10, 'spades');
    expect(container.querySelector('svg.court-figure')).toBeNull();
  });

  it('mantiene el símbolo del palo debajo de la figura (fallback seguro)', () => {
    for (const rank of [11, 12, 13]) {
      const { container } = renderCard(rank, 'diamonds');
      const text = container.textContent;
      expect(text).toContain(SUIT_SYMBOLS.diamonds);
      expect(text).toMatch(/J|Q|K/);
    }
  });

  it('soporta los 4 palos en carta de corte', () => {
    const redSuits = ['hearts', 'diamonds'];
    const blackSuits = ['spades', 'clubs'];
    for (const suit of redSuits) {
      const { container } = renderCard(13, suit);
      expect(container.textContent).toContain(SUIT_SYMBOLS[suit]);
    }
    for (const suit of blackSuits) {
      const { container } = renderCard(11, suit);
      expect(container.textContent).toContain(SUIT_SYMBOLS[suit]);
    }
  });
});