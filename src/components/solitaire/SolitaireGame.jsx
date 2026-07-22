import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  deal,
  canPlaceOnTableau,
  canPlaceOnFoundation,
  isWon,
  SUIT_SYMBOLS,
} from '@/lib/solitaire';
import SolitaireCard from './SolitaireCard';

const CARD_VARS = {
  '--card-w': 'clamp(30px, calc((100vw - 24px) / 7), 82px)',
  '--card-height': 'calc(var(--card-w) * 1.25)',
  '--card-font': 'calc(var(--card-w) * 0.24)',
  '--card-font-lg': 'calc(var(--card-w) * 0.5)',
};

function EmptySlot({ onClick, children, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`solitaire-card rounded-md border border-dashed border-white/25 flex items-center justify-center text-white/30 ${className}`}
    >
      {children}
    </div>
  );
}

export default function SolitaireGame() {
  const [game, setGame] = useState(() => deal());
  const [selection, setSelection] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (won) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [won]);

  // Win detection
  useEffect(() => {
    if (isWon(game)) setWon(true);
  }, [game]);

  const newGame = useCallback(() => {
    setGame(deal());
    setSelection(null);
    setMoves(0);
    setSeconds(0);
    setWon(false);
  }, []);

  const getSelectedCards = useCallback((sel, g) => {
    if (!sel) return [];
    if (sel.source === 'waste') return g.waste.length ? [g.waste[g.waste.length - 1]] : [];
    if (sel.source === 'foundation')
      return g.foundations[sel.fIndex].length
        ? [g.foundations[sel.fIndex][g.foundations[sel.fIndex].length - 1]]
        : [];
    if (sel.source === 'tableau') return g.tableau[sel.col].slice(sel.cardIndex);
    return [];
  }, []);

  const isSelected = (col, cardIndex) =>
    !!selection &&
    selection.source === 'tableau' &&
    selection.col === col &&
    cardIndex >= selection.cardIndex;

  function handleStockClick() {
    if (won) return;
    setSelection(null);
    setGame((g) => {
      if (g.stock.length === 0) {
        if (g.waste.length === 0) return g;
        const newStock = [...g.waste].reverse().map((c) => ({ ...c, faceUp: false }));
        return { ...g, stock: newStock, waste: [] };
      }
      const newStock = [...g.stock];
      const card = newStock.pop();
      return { ...g, stock: newStock, waste: [...g.waste, { ...card, faceUp: true }] };
    });
  }

  function tryMoveToTableau(destCol) {
    const cards = getSelectedCards(selection, game);
    if (cards.length === 0 || !canPlaceOnTableau(cards[0], game.tableau[destCol])) {
      setSelection(null);
      return;
    }
    setGame((g) => {
      const tableau = g.tableau.map((c) => [...c]);
      const foundations = g.foundations.map((f) => [...f]);
      const waste = [...g.waste];
      let moving;
      if (selection.source === 'tableau') {
        moving = tableau[selection.col].splice(selection.cardIndex);
        const col = tableau[selection.col];
        if (col.length && !col[col.length - 1].faceUp) {
          col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
        }
      } else if (selection.source === 'waste') {
        moving = [waste.pop()];
      } else if (selection.source === 'foundation') {
        moving = [foundations[selection.fIndex].pop()];
      }
      tableau[destCol].push(...moving);
      return { ...g, tableau, waste, foundations };
    });
    setSelection(null);
    setMoves((m) => m + 1);
  }

  function tryMoveToFoundation(destF) {
    const cards = getSelectedCards(selection, game);
    if (cards.length !== 1 || !canPlaceOnFoundation(cards[0], game.foundations[destF])) {
      setSelection(null);
      return;
    }
    setGame((g) => {
      const tableau = g.tableau.map((c) => [...c]);
      const foundations = g.foundations.map((f) => [...f]);
      const waste = [...g.waste];
      let moving;
      if (selection.source === 'tableau') {
        moving = [tableau[selection.col].pop()];
        const col = tableau[selection.col];
        if (col.length && !col[col.length - 1].faceUp) {
          col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
        }
      } else if (selection.source === 'waste') {
        moving = [waste.pop()];
      } else {
        return g;
      }
      foundations[destF].push(...moving);
      return { ...g, tableau, waste, foundations };
    });
    setSelection(null);
    setMoves((m) => m + 1);
  }

  // Auto-send a card to a foundation (double-click / double-tap).
  function autoMoveToFoundation(source) {
    if (won) return;
    const g = game;
    let card;
    if (source.type === 'waste') {
      if (!g.waste.length) return;
      card = g.waste[g.waste.length - 1];
    } else {
      const col = g.tableau[source.col];
      if (!col.length) return;
      card = col[col.length - 1];
      if (!card.faceUp) return;
    }
    for (let f = 0; f < 4; f++) {
      if (canPlaceOnFoundation(card, g.foundations[f])) {
        setGame((prev) => {
          const tableau = prev.tableau.map((c) => [...c]);
          const foundations = prev.foundations.map((ff) => [...ff]);
          const waste = [...prev.waste];
          if (source.type === 'waste') {
            waste.pop();
          } else {
            const col = tableau[source.col];
            col.pop();
            if (col.length && !col[col.length - 1].faceUp) {
              col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
            }
          }
          foundations[f].push(card);
          return { ...prev, tableau, waste, foundations };
        });
        setMoves((m) => m + 1);
        setSelection(null);
        return;
      }
    }
  }

  function handleTableauCardClick(col, cardIndex) {
    if (won) return;
    const card = game.tableau[col][cardIndex];
    if (!card.faceUp) {
      // Flip the last face-down card of a column when tapped.
      if (cardIndex === game.tableau[col].length - 1) {
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          tableau[col][cardIndex] = { ...tableau[col][cardIndex], faceUp: true };
          return { ...g, tableau };
        });
      }
      return;
    }
    if (selection) {
      if (selection.source === 'tableau' && selection.col === col) {
        setSelection({ source: 'tableau', col, cardIndex });
        return;
      }
      tryMoveToTableau(col);
      return;
    }
    setSelection({ source: 'tableau', col, cardIndex });
  }

  function handleTableauColumnClick(col) {
    if (won) return;
    if (selection) tryMoveToTableau(col);
  }

  function handleFoundationClick(fIndex) {
    if (won) return;
    if (selection) {
      tryMoveToFoundation(fIndex);
      return;
    }
    if (game.foundations[fIndex].length) {
      setSelection({ source: 'foundation', fIndex });
    }
  }

  function handleWasteClick() {
    if (won) return;
    if (selection && selection.source === 'waste') {
      setSelection(null);
      return;
    }
    if (selection) {
      setSelection(null);
      return;
    }
    if (game.waste.length) setSelection({ source: 'waste' });
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  const topCardStyle = (prevFaceUp, i) => ({
    marginTop: i === 0 ? 0 : prevFaceUp ? 'calc(var(--card-w) * -0.86)' : 'calc(var(--card-w) * -1.0)',
  });

  return (
    <div style={CARD_VARS} className="w-full">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 text-emerald-50/90 text-xs sm:text-sm">
        <div className="flex gap-2 sm:gap-4">
          <span className="font-medium">Moves: <span className="tabular-nums">{moves}</span></span>
          <span className="font-medium">Time: <span className="tabular-nums">{formatTime(seconds)}</span></span>
        </div>
        <button
          onClick={newGame}
          className="px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-medium transition-colors"
        >
          New Game
        </button>
      </div>

      {/* Board */}
      <div className="relative rounded-lg sm:rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-900 p-0.5 sm:p-4 shadow-xl">
        {/* Top row: stock, waste, foundations */}
        <div className="grid grid-cols-7 gap-[1px] sm:gap-2 mb-[1px] sm:mb-3">
          {/* Stock */}
          <div>
            {game.stock.length > 0 ? (
              <SolitaireCard faceDown onClick={handleStockClick} />
            ) : (
              <EmptySlot onClick={handleStockClick}>
                <span style={{ fontSize: 'calc(var(--card-font-lg) * 0.7)' }}>↻</span>
              </EmptySlot>
            )}
          </div>
          {/* Waste */}
          <div>
            {game.waste.length > 0 ? (
              <SolitaireCard
                card={game.waste[game.waste.length - 1]}
                selected={!!selection && selection.source === 'waste'}
                onClick={handleWasteClick}
                onDoubleClick={() => autoMoveToFoundation({ type: 'waste' })}
              />
            ) : (
              <EmptySlot />
            )}
          </div>
          <div />
          {/* Foundations */}
          {[0, 1, 2, 3].map((f) => {
            const pile = game.foundations[f];
            const sel = !!selection && selection.source === 'foundation' && selection.fIndex === f;
            return (
              <div key={f}>
                {pile.length > 0 ? (
                  <SolitaireCard
                    card={pile[pile.length - 1]}
                    selected={sel}
                    onClick={() => handleFoundationClick(f)}
                  />
                ) : (
                  <EmptySlot onClick={() => handleFoundationClick(f)}>
                    <span style={{ fontSize: 'calc(var(--card-font-lg) * 0.6)' }}>A</span>
                  </EmptySlot>
                )}
              </div>
            );
          })}
        </div>

        {/* Tableau */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {game.tableau.map((column, col) => (
            <div key={col} className="flex flex-col items-center" style={{ width: 'var(--card-w)' }}>
              {column.length === 0 ? (
                <EmptySlot onClick={() => handleTableauColumnClick(col)} />
              ) : (
                column.map((card, i) => (
                  <SolitaireCard
                    key={card.id}
                    card={card}
                    faceDown={!card.faceUp}
                    selected={isSelected(col, i)}
                    onClick={() => handleTableauCardClick(col, i)}
                    onDoubleClick={() =>
                      i === column.length - 1 && card.faceUp && autoMoveToFoundation({ type: 'tableau', col })
                    }
                    style={topCardStyle(column[i - 1]?.faceUp, i)}
                  />
                ))
              )}
            </div>
          ))}
        </div>

        {/* Win overlay */}
        {won && (
          <div className="absolute inset-0 rounded-2xl bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎉 You Won!</h2>
            <p className="text-emerald-100 mb-1">Solved in {moves} moves</p>
            <p className="text-emerald-100 mb-4">Time: {formatTime(seconds)}</p>
            <button
              onClick={newGame}
              className="px-5 py-2.5 rounded-lg bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* How to play */}
      <details className="hidden sm:block mt-4 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-700">How to play</summary>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>Tap the stock pile (top-left) to draw a card.</li>
          <li>Build foundations up by suit, from Ace to King.</li>
          <li>Build tableau columns down with alternating colors.</li>
          <li>Tap a card to select it, then tap a destination to move. Double-tap to send a card to the foundations.</li>
          <li>Only Kings can be placed in empty tableau columns.</li>
        </ul>
      </details>
    </div>
  );
}