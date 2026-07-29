import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import {
  deal,
  canPlaceOnTableau,
  canPlaceOnFoundation,
  isWon,
  SUIT_SYMBOLS,
} from '@/lib/solitaire';
import SolitaireCard from './SolitaireCard';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const CARD_VARS = {
  '--card-w': 'clamp(36px, 11vw, 78px)',
  '--card-height': 'calc(var(--card-w) * 1.4)',
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

  // Efectos visuales
  const [dealingCards, setDealingCards] = useState([]);
  const [landingCard, setLandingCard] = useState(null);
  const [flippingCard, setFlippingCard] = useState(null);

  const {
    isMuted,
    toggleMute,
    playFlipSound,
    playPlaceSound,
    playDealSound,
    playWinSound,
    playClickSound,
  } = useSoundEffects();

  // Drag & Drop
  const [draggingCard, setDraggingCard] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);

  // Efecto de victoria con confeti
  const triggerVictoryConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#065f46', '#10b981', '#34d399', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Explosión final
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4, x: 0.3 },
        colors: colors,
      });
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4, x: 0.7 },
        colors: colors,
      });
    }, 500);

    // Confeti en forma de corazones
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f43f5e', '#ec4899', '#f472b6'],
        shapes: ['circle'],
      });
    }, 800);
  }, []);

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
    if (isWon(game)) {
      setWon(true);
      playWinSound();
      triggerVictoryConfetti();
    }
  }, [game, playWinSound, triggerVictoryConfetti]);

  const newGame = useCallback(() => {
    const newGameState = deal();
    setGame(newGameState);
    setSelection(null);
    setMoves(0);
    setSeconds(0);
    setWon(false);
    playDealSound();

    // Efecto de reparto: marcar cartas que se están repartiendo
    const allCards = [];
    newGameState.tableau.forEach((col, colIndex) => {
      col.forEach((card, rowIndex) => {
        allCards.push({
          card,
          colIndex,
          rowIndex,
          delay: (colIndex + rowIndex) * 0.08,
        });
      });
    });
    setDealingCards(allCards);

    // Limpiar estado de reparto después de la animación
    setTimeout(() => {
      setDealingCards([]);
    }, allCards.length * 0.08 + 600);
  }, [playDealSound]);

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
        // Marcar que se está reiniciando el stock
        setFlippingCard('stock-reset');
        setTimeout(() => setFlippingCard(null), 400);
        const newStock = [...g.waste].reverse().map((c) => ({ ...c, faceUp: false }));
        playFlipSound();
        return { ...g, stock: newStock, waste: [] };
      }
      const newStock = [...g.stock];
      const card = newStock.pop();
      setFlippingCard(card.id);
      setTimeout(() => setFlippingCard(null), 400);
      playFlipSound();
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
      let movedCardId = null;
      if (selection.source === 'tableau') {
        moving = tableau[selection.col].splice(selection.cardIndex);
        movedCardId = moving[0]?.id;
        const col = tableau[selection.col];
        if (col.length && !col[col.length - 1].faceUp) {
          col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
        }
      } else if (selection.source === 'waste') {
        moving = [waste.pop()];
        movedCardId = moving[0]?.id;
      } else if (selection.source === 'foundation') {
        moving = [foundations[selection.fIndex].pop()];
        movedCardId = moving[0]?.id;
      }
      tableau[destCol].push(...moving);
      
      // Marcar carta que aterrizó para efecto visual
      if (movedCardId) {
        setTimeout(() => setLandingCard(movedCardId), 50);
        setTimeout(() => setLandingCard(null), 500);
      }
      
      return { ...g, tableau, waste, foundations };
    });
    setSelection(null);
    setMoves((m) => m + 1);
    playPlaceSound();
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
      let movedCardId = null;
      if (selection.source === 'tableau') {
        moving = [tableau[selection.col].pop()];
        movedCardId = moving[0]?.id;
        const col = tableau[selection.col];
        if (col.length && !col[col.length - 1].faceUp) {
          col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
        }
      } else if (selection.source === 'waste') {
        moving = [waste.pop()];
        movedCardId = moving[0]?.id;
      } else {
        return g;
      }
      foundations[destF].push(...moving);
      
      if (movedCardId) {
        setTimeout(() => setLandingCard(movedCardId), 50);
        setTimeout(() => setLandingCard(null), 500);
      }
      
      return { ...g, tableau, waste, foundations };
    });
    setSelection(null);
    setMoves((m) => m + 1);
    playPlaceSound();
  }

  // Auto-send a card to a foundation (double-click / double-tap).
  function autoMoveToFoundation(source) {
    if (won) return;
    const g = game;
    let card;
    let cardId = null;
    if (source.type === 'waste') {
      if (!g.waste.length) return;
      card = g.waste[g.waste.length - 1];
      cardId = card.id;
    } else {
      const col = g.tableau[source.col];
      if (!col.length) return;
      card = col[col.length - 1];
      cardId = card.id;
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
        playPlaceSound();
        
        if (cardId) {
          setTimeout(() => setLandingCard(cardId), 50);
          setTimeout(() => setLandingCard(null), 500);
        }
        return;
      }
    }
  }

  // Drag & Drop handlers
  const handleDragStart = useCallback((e, info, card, cardIndex, colIndex) => {
    if (won) return;
    if (!card.faceUp) return;
    
    const column = game.tableau[colIndex];
    const lastFaceUpIndex = column.map((c, i) => c.faceUp ? i : -1).filter(i => i >= 0).pop() ?? -1;
    
    if (cardIndex !== lastFaceUpIndex && cardIndex < column.length - 1) {
      const isLastFaceUp = column.slice(cardIndex).every(c => c.faceUp);
      if (!isLastFaceUp) return;
    }
    
    setDraggingCard({ card, cardIndex, colIndex, source: 'tableau' });
    setDragStartPos({ x: e.clientX, y: e.clientY });
  }, [game.tableau, won]);

  const handleDragEnd = useCallback((e, info, card, cardIndex, colIndex) => {
    if (!draggingCard) return;
    
    let targetCol = -1;
    let targetFoundation = -1;
    
    // Verificar si se soltó sobre una columna del tableau
    const tableauSlots = document.querySelectorAll('[data-tableau-slot]');
    tableauSlots.forEach((slot, i) => {
      const rect = slot.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        targetCol = i;
      }
    });
    
    // Verificar si se soltó sobre una foundation
    const foundationSlots = document.querySelectorAll('[data-foundation-slot]');
    foundationSlots.forEach((slot, i) => {
      const rect = slot.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        targetFoundation = i;
      }
    });
    
    // Si se soltó sobre una columna válida
    if (targetCol >= 0 && targetCol !== colIndex) {
      // Intentar mover a tableau
      const cards = getSelectedCards(
        { source: 'tableau', col: colIndex, cardIndex },
        game
      );
      if (cards.length > 0 && canPlaceOnTableau(cards[0], game.tableau[targetCol])) {
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          const moving = tableau[colIndex].splice(cardIndex);
          const col = tableau[colIndex];
          if (col.length && !col[col.length - 1].faceUp) {
            col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
          }
          tableau[targetCol].push(...moving);
          
          // Efecto de aterrizaje
          const movedCardId = moving[0]?.id;
          if (movedCardId) {
            setTimeout(() => setLandingCard(movedCardId), 50);
            setTimeout(() => setLandingCard(null), 500);
          }
          
          return { ...g, tableau };
        });
        setMoves((m) => m + 1);
        playPlaceSound();
      }
    }
    
    // Si se soltó sobre una foundation
    if (targetFoundation >= 0) {
      const cards = getSelectedCards(
        { source: 'tableau', col: colIndex, cardIndex },
        game
      );
      if (cards.length === 1 && canPlaceOnFoundation(cards[0], game.foundations[targetFoundation])) {
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          const foundations = g.foundations.map((f) => [...f]);
          const moving = tableau[colIndex].pop();
          const col = tableau[colIndex];
          if (col.length && !col[col.length - 1].faceUp) {
            col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
          }
          foundations[targetFoundation].push(moving);
          
          if (moving) {
            setTimeout(() => setLandingCard(moving.id), 50);
            setTimeout(() => setLandingCard(null), 500);
          }
          
          return { ...g, tableau, foundations };
        });
        setMoves((m) => m + 1);
        playPlaceSound();
      }
    }
    
    setDraggingCard(null);
    setDragStartPos(null);
  }, [draggingCard, game, getSelectedCards, playPlaceSound]);

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
        // Efecto de volteo
        setFlippingCard(card.id);
        setTimeout(() => setFlippingCard(null), 400);
        playFlipSound();
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
    marginTop: i === 0 ? 0 : prevFaceUp ? 'calc(var(--card-w) * -1.0)' : 'calc(var(--card-w) * -1.2)',
  });

  // Verificar si una carta está en estado de reparto
  const isDealingCard = (colIndex, rowIndex) => {
    return dealingCards.some(
      d => d.colIndex === colIndex && d.rowIndex === rowIndex
    );
  };

  const getDealDelay = (colIndex, rowIndex) => {
    const found = dealingCards.find(
      d => d.colIndex === colIndex && d.rowIndex === rowIndex
    );
    return found ? found.delay : 0;
  };

  return (
    <div style={CARD_VARS} className="w-full">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3 text-emerald-50/90 text-sm">
        <div className="flex gap-4">
          <span className="font-medium">Moves: <span className="tabular-nums">{moves}</span></span>
          <span className="font-medium">Time: <span className="tabular-nums">{formatTime(seconds)}</span></span>
        </div>
        <div className="flex gap-2">
          {/* Botón Mute/Unmute */}
          <button
            onClick={toggleMute}
            className={`rounded-2xl text-white font-bold transition-all duration-200 flex items-center gap-4 min-h-[64px] text-xl shadow-xl ${
              isMuted 
                ? 'bg-red-600/60 hover:bg-red-600/80 border-2 border-red-400/60' 
                : 'bg-emerald-600/60 hover:bg-emerald-600/80 border-2 border-emerald-400/60'
            }`}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
          >
            <span className="text-5xl">{isMuted ? '🔇' : '🔊'}</span>
          </button>

          {/* Botón New Game */}
          <button
            onClick={newGame}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-lg transition-all duration-200 flex items-center gap-2 min-h-[56px] min-w-[140px] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <span className="text-2xl">🔄</span>
            New Game
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="relative rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-900 p-2 sm:p-4 shadow-xl">
        {/* Top row: stock, waste, foundations */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
          {/* Stock */}
          <div>
            {game.stock.length > 0 ? (
              <SolitaireCard 
                faceDown 
                onClick={handleStockClick}
                isDealing={false}
              />
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
                isLanding={landingCard === game.waste[game.waste.length - 1]?.id}
                isDealing={false}
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
            const topCard = pile[pile.length - 1];
            return (
              <div key={f}>
                {pile.length > 0 ? (
                  <SolitaireCard
                    card={topCard}
                    selected={sel}
                    onClick={() => handleFoundationClick(f)}
                    isLanding={landingCard === topCard?.id}
                    isDealing={false}
                  />
                ) : (
                  <EmptySlot 
                    onClick={() => handleFoundationClick(f)} 
                    data-foundation-slot={f}
                  >
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
                <EmptySlot 
                  onClick={() => handleTableauColumnClick(col)} 
                  className="data-tableau-slot"
                  data-tableau-slot={col}
                />
              ) : (
                column.map((card, i) => {
                  const isDealing = isDealingCard(col, i);
                  const delay = getDealDelay(col, i);
                  return (
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
                    dragEnabled={card.faceUp && i === column.length - 1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    index={i}
                    columnIndex={col}
                      isDealing={isDealing}
                      isLanding={landingCard === card.id && !isDealing}
                      dealDelay={delay}
                  />
                  );
                })
              )}
            </div>
          ))}
        </div>

        {/* Win overlay */}
        <AnimatePresence>
        {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute inset-0 rounded-2xl bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4 z-10"
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                🎉 You Won!
              </motion.h2>
            <p className="text-emerald-100 mb-1">Solved in {moves} moves</p>
            <p className="text-emerald-100 mb-4">Time: {formatTime(seconds)}</p>
            <button
              onClick={newGame}
              className="px-5 py-2.5 rounded-lg bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors"
            >
              Play Again
            </button>
            </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* How to play */}
      <details className="mt-4 text-sm text-slate-600">
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