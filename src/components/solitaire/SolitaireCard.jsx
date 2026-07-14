import React from 'react';
import { RANK_LABELS, SUIT_SYMBOLS, isRed } from '@/lib/solitaire';

// A single playing card. `faceDown` renders the card back.
export default function SolitaireCard({ card, faceDown, selected, onClick, onDoubleClick, style }) {
  if (faceDown) {
    return (
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={style}
        className="solitaire-card solitaire-card-back relative cursor-pointer"
        aria-hidden="true"
      />
    );
  }

  const red = isRed(card.suit);
  const rankLabel = RANK_LABELS[card.rank];
  const symbol = SUIT_SYMBOLS[card.suit];

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={style}
      className={`solitaire-card relative bg-white rounded-md shadow-md cursor-pointer select-none ${
        selected ? 'ring-2 ring-sky-300 ring-offset-1 ring-offset-emerald-900' : ''
      } ${red ? 'text-rose-600' : 'text-slate-900'}`}
      role="button"
      tabIndex={0}
    >
      <div className="absolute top-0.5 left-1 leading-none font-bold" style={{ fontSize: 'var(--card-font)' }}>
        <div>{rankLabel}</div>
        <div style={{ fontSize: 'calc(var(--card-font) * 0.9)' }}>{symbol}</div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: 'var(--card-font-lg)' }}>
        {symbol}
      </div>
    </div>
  );
}