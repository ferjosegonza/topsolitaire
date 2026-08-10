import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, RotateCcw, Trophy, RefreshCw, Heart, Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  deal,
  canPlaceOnTableau,
  canPlaceOnFoundation,
  isWon,
  SUIT_SYMBOLS,
  createGameSnapshot,
  restoreGameSnapshot,
} from '@/lib/solitaire';
import SolitaireCard from './SolitaireCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const CARD_VARS = {
  '--card-w': 'clamp(36px, 11vw, 78px)',
  '--card-height': 'calc(var(--card-w) * 1.4)',
  '--card-font': 'calc(var(--card-w) * 0.24)',
  '--card-font-lg': 'calc(var(--card-w) * 0.5)',
};

// Offset vertical entre cartas boca arriba en tableau
const FACE_UP_OFFSET = 30; // en pixels, aproximadamente 30px
const FACE_DOWN_OFFSET = 20; // en pixels, cartas boca abajo se superponen menos

/**
 * Posición top acumulativa: cada carta se apila sobre la anterior usando
 * el offset de la carta que está DEBAJO. Así la separación entre la última
 * carta boca abajo y la boca arriba es SIEMPRE constante (30px),
 * sin importar cuántas cartas tenga la columna.
 */
function getCardTop(column, index) {
  let top = 0;
  for (let k = 0; k < index; k++) {
    top += column[k].faceUp ? FACE_UP_OFFSET : FACE_DOWN_OFFSET;
  }
  return top;
}

/**
 * Alto dinámico de la columna: la posición top de la última carta
 * más el alto de la carta (var(--card-height)). De esta forma el
 * recuadro verde crece y contiene SIEMPRE todas las cartas.
 */
function getColumnHeight(column) {
  if (column.length === 0) return '90px';
  const lastTop = getCardTop(column, column.length - 1);
  return `calc(${lastTop}px + var(--card-height))`;
}

function EmptySlot({ onClick, children, className = '', ...rest }) {
  return (
    <div
      onClick={onClick}
      className={`solitaire-card game-slot flex items-center justify-center ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default function SolitaireGame() {
  const { t } = useTranslation();
  const [game, setGame] = useState(() => deal());
  const [selection, setSelection] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState([]);
  const timerRef = useRef(null);

  const [dealingCards, setDealingCards] = useState([]);
  const [landingCard, setLandingCard] = useState(null);
  const [flippingCard, setFlippingCard] = useState(null);
  const hasMounted = useRef(false);

  const {
    isMuted,
    toggleMute,
    playFlipSound,
    playPlaceSound,
    playDealSound,
    playWinSound,
    playClickSound,
  } = useSoundEffects();

  const pushHistorySnapshot = useCallback(() => {
    setHistory((prev) => [...prev, createGameSnapshot(game, moves, seconds, won, selection)]);
  }, [game, moves, seconds, won, selection]);

  const handleUndo = useCallback(() => {
    if (!history.length) return;

    const snapshot = history[history.length - 1];
    const restored = restoreGameSnapshot({ game, moves, seconds, won, selection }, snapshot);

    setHistory((prev) => prev.slice(0, -1));
    setGame(restored.game);
    setSelection(null);
    setMoves(restored.moves);
    setSeconds(restored.seconds);
    setWon(restored.won);
    setFlippingCard(null);
    setLandingCard(null);
    setDealingCards([]);
  }, [game, history, moves, seconds, selection, won]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo]);

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

  useEffect(() => {
    if (won) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [won]);

  useEffect(() => {
    if (isWon(game)) {
      setWon(true);
      playWinSound();
      triggerVictoryConfetti();
    }
  }, [game, playWinSound, triggerVictoryConfetti]);

  const newGame = useCallback(() => {
    const newGameState = deal();
    setHistory([]);
    setGame(newGameState);
    setSelection(null);
    setMoves(0);
    setSeconds(0);
    setWon(false);
    playDealSound();

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

    // ⚠️ FIX: antes se mezclaban SEGUNDOS (allCards.length * 0.08 = 2.24)
    // con MILISEGUNDOS (+ 600). El timeout disparaba a ~602ms y cortaba el
    // reparto de las columnas 4+ cuyos delays eran >0.4s.
    // Ahora todo en ms: (28 cartas * 80ms) + 600ms de margen = ~2.84s.
    setTimeout(() => {
      setDealingCards([]);
    }, allCards.length * 80 + 600);
  }, [playDealSound]);

  // Repartir también al montar el componente (primera carga de la página)
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const initialCards = [];
    game.tableau.forEach((col, colIndex) => {
      col.forEach((card, rowIndex) => {
        initialCards.push({
          card,
          colIndex,
          rowIndex,
          delay: (colIndex + rowIndex) * 0.08,
        });
      });
    });
    setDealingCards(initialCards);

    setTimeout(() => {
      setDealingCards([]);
    }, initialCards.length * 80 + 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    pushHistorySnapshot();
    setSelection(null);
    setGame((g) => {
      if (g.stock.length === 0) {
        if (g.waste.length === 0) return g;
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

  // ============================================================
  // FUNCIONES DE MOVIMIENTO
  // ============================================================

  function tryMoveToTableau(destCol) {
    const cards = getSelectedCards(selection, game);
    if (cards.length === 0 || !canPlaceOnTableau(cards[0], game.tableau[destCol])) {
      setSelection(null);
      return;
    }
    pushHistorySnapshot();
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
          playFlipSound();
        }
      } else if (selection.source === 'waste') {
        moving = [waste.pop()];
        movedCardId = moving[0]?.id;
      } else if (selection.source === 'foundation') {
        moving = [foundations[selection.fIndex].pop()];
        movedCardId = moving[0]?.id;
      }
      tableau[destCol].push(...moving);

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
    pushHistorySnapshot();
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

  /**
   * Auto-mueve una carta desde una fuente (waste o tableau última carta)
   * con criterio inteligente:
   * 1. Prioridad 1: Foundation (si la carta puede ir)
   * 2. Prioridad 2: Tableau - elige la columna que tenga más cartas
   *    (heurística: columnas más llenas = más útiles)
   */
  function autoMoveCard(source) {
    if (won) return false;
    const g = game;
    let card;
    let cardId = null;
    let sourceCol = -1;

    if (source.type === 'waste') {
      if (!g.waste.length) return false;
      card = g.waste[g.waste.length - 1];
      cardId = card.id;
    } else {
      const col = g.tableau[source.col];
      if (!col.length) return false;
      card = col[col.length - 1];
      cardId = card.id;
      if (!card.faceUp) return false;
      sourceCol = source.col;
    }

    // Prioridad 1: Ir a foundation
    for (let f = 0; f < 4; f++) {
      if (canPlaceOnFoundation(card, g.foundations[f])) {
        pushHistorySnapshot();
        setGame((prev) => {
          const tableau = prev.tableau.map((c) => [...c]);
          const foundations = prev.foundations.map((ff) => [...ff]);
          const waste = [...prev.waste];
          if (source.type === 'waste') {
            waste.pop();
          } else {
            const col2 = tableau[source.col];
            col2.pop();
            if (col2.length && !col2[col2.length - 1].faceUp) {
              col2[col2.length - 1] = { ...col2[col2.length - 1], faceUp: true };
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
        return true;
      }
    }

    // Prioridad 2: Tableau - elegir la mejor columna (la que tenga más cartas)
    let bestCol = -1;
    let bestColSize = -1;
    for (let destCol = 0; destCol < 7; destCol++) {
      if (destCol !== sourceCol && canPlaceOnTableau(card, g.tableau[destCol])) {
        // Criterio: elegir la columna con más cartas
        // (columnas más llenas = más útiles para construir)
        const colSize = g.tableau[destCol].length;
        if (colSize > bestColSize) {
          bestColSize = colSize;
          bestCol = destCol;
        }
      }
    }

    if (bestCol >= 0) {
      const destCol = bestCol;
      pushHistorySnapshot();
      setGame((prev) => {
        const tableau = prev.tableau.map((c) => [...c]);
        const waste = [...prev.waste];
        if (source.type === 'waste') {
          waste.pop();
        } else {
          const col2 = tableau[source.col];
          col2.pop();
          if (col2.length && !col2[col2.length - 1].faceUp) {
            col2[col2.length - 1] = { ...col2[col2.length - 1], faceUp: true };
          }
        }
        tableau[destCol].push(card);
        return { ...prev, tableau, waste };
      });
      setMoves((m) => m + 1);
      setSelection(null);
      playPlaceSound();

      if (cardId) {
        setTimeout(() => setLandingCard(cardId), 50);
        setTimeout(() => setLandingCard(null), 500);
      }
      return true;
    }

    return false; // No se pudo mover
  }

  // ============================================================
  // MANEJO DE ARRASTRE
  // ============================================================

const [isDragging, setIsDragging] = useState(false);
  const [dragCard, setDragCard] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragSource, setDragSource] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);

  // Refs para evitar el conflicto click vs drag
  const dragStartPos = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  const DRAG_THRESHOLD = 5; // px mínimos para considerar que hubo arrastre

  const getCardElement = (cardId) => {
    return document.querySelector(`[data-card-id="${cardId}"]`);
  };

const startDrag = (e, card, source) => {
    if (won || !card.faceUp) return;
    if (e.button !== 0) return;

    e.preventDefault();

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    // Registrar posición inicial para detectar arrastre vs click
    dragStartPos.current = { x: clientX, y: clientY };
    wasDragged.current = false;

    // === GHOST: mostrar grupo completo si es tableau ===
    let ghost;
    if (source.source === 'tableau') {
      // Crear ghost que incluye TODAS las cartas desde cardIndex hasta el final
      const col = game.tableau[source.col];
      const cardsToMove = col.slice(source.cardIndex);

      // Usar la primera carta para posición base
      const firstCardEl = getCardElement(cardsToMove[0].id);
      if (!firstCardEl) return;
      const firstRect = firstCardEl.getBoundingClientRect();

      // Crear contenedor ghost correctamente
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '9999';
      container.style.width = firstRect.width + 'px';
      container.style.borderRadius = '8px';
      container.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
      container.style.transform = 'scale(1.05) rotate(2deg)';
      container.style.transition = 'none';
      container.style.left = (clientX - firstRect.width / 2) + 'px';
      container.style.top = (clientY - FACE_UP_OFFSET) + 'px'; // offset parcial

      // Clonar cada carta del grupo y posicionarla
      cardsToMove.forEach((c, idx) => {
        const cardEl = getCardElement(c.id);
        if (!cardEl) return;
        const clone = cardEl.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.width = '100%';
        clone.style.left = '0px';
        clone.style.top = (idx * FACE_UP_OFFSET) + 'px'; // apilar ghost con el mismo offset
        clone.style.borderRadius = '8px';
        clone.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        container.appendChild(clone);
      });

      document.body.appendChild(container);
      ghost = container;
    } else {
      // Para waste/foundation: ghost de una sola carta
      const cardElement = getCardElement(card.id);
      if (!cardElement) return;
      const rect = cardElement.getBoundingClientRect();

      ghost = cardElement.cloneNode(true);
      ghost.style.position = 'fixed';
      ghost.style.pointerEvents = 'none';
      ghost.style.zIndex = '9999';
      ghost.style.width = rect.width + 'px';
      ghost.style.height = rect.height + 'px';
      ghost.style.borderRadius = '8px';
      ghost.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
      ghost.style.transform = 'scale(1.05) rotate(2deg)';
      ghost.style.transition = 'none';
      ghost.style.left = (clientX - rect.width / 2) + 'px';
      ghost.style.top = (clientY - rect.height / 2) + 'px';

      document.body.appendChild(ghost);
    }

    setDragGhost(ghost);
    setDragCard(card);
    setDragSource(source);
    setDragOffset({ x: FACE_UP_OFFSET, y: 0 }); // offset fijo para el ghost
    setIsDragging(true);

    // Opacar la carta original
    const originalEl = getCardElement(card.id);
    if (originalEl) {
      originalEl.style.opacity = '0.3';
      originalEl.style.transform = 'scale(0.95)';
    }
  };

  const moveDrag = (e) => {
    if (!isDragging || !dragGhost) return;

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    // Detectar si el mouse se movió lo suficiente como para considerar un arrastre real
    const dx = clientX - dragStartPos.current.x;
    const dy = clientY - dragStartPos.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      wasDragged.current = true;
    }

    dragGhost.style.left = (clientX - dragOffset.x) + 'px';
    dragGhost.style.top = (clientY - dragOffset.y) + 'px';

    const tableauSlots = document.querySelectorAll('[data-tableau-slot]');
    tableauSlots.forEach((slot) => {
      const rect = slot.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        slot.style.borderColor = '#34d399';
        slot.style.borderWidth = '3px';
        slot.style.backgroundColor = 'rgba(52, 211, 153, 0.15)';
      } else {
        slot.style.borderColor = '';
        slot.style.borderWidth = '';
        slot.style.backgroundColor = '';
      }
    });

    const foundationSlots = document.querySelectorAll('[data-foundation-slot]');
    foundationSlots.forEach((slot) => {
      const rect = slot.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        slot.style.borderColor = '#34d399';
        slot.style.borderWidth = '3px';
        slot.style.backgroundColor = 'rgba(52, 211, 153, 0.15)';
      } else {
        slot.style.borderColor = '';
        slot.style.borderWidth = '';
        slot.style.backgroundColor = '';
      }
    });
  };

  const endDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.changedTouches?.[0]?.clientY || 0;

    document.querySelectorAll('[data-tableau-slot], [data-foundation-slot]').forEach((slot) => {
      slot.style.borderColor = '';
      slot.style.borderWidth = '';
      slot.style.backgroundColor = '';
    });

    let targetCol = -1;
    let targetFoundation = -1;

    document.querySelectorAll('[data-tableau-slot]').forEach((slot) => {
      const rect = slot.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        targetCol = parseInt(slot.getAttribute('data-tableau-slot'), 10);
      }
    });

    document.querySelectorAll('[data-foundation-slot]').forEach((slot) => {
      const rect = slot.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        targetFoundation = parseInt(slot.getAttribute('data-foundation-slot'), 10);
      }
    });

    let moved = false;

    if (targetFoundation >= 0) {
      // ===== MOVER A FOUNDATION =====
      let cardToMove = null;

      if (dragSource && dragSource.source === 'tableau') {
        const col = game.tableau[dragSource.col];
        if (col.length > 0) {
          const lastCard = col[col.length - 1];
          // Solo la última carta (superior) puede ir a foundation
          if (dragSource.cardIndex === col.length - 1 && canPlaceOnFoundation(lastCard, game.foundations[targetFoundation])) {
            cardToMove = lastCard;
          }
        }
      } else if (dragSource && dragSource.source === 'waste') {
        if (game.waste.length > 0) {
          const wasteCard = game.waste[game.waste.length - 1];
          if (canPlaceOnFoundation(wasteCard, game.foundations[targetFoundation])) {
            cardToMove = wasteCard;
          }
        }
      }

      if (cardToMove) {
        pushHistorySnapshot();
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          const foundations = g.foundations.map((f) => [...f]);
          const waste = [...g.waste];

          if (dragSource.source === 'tableau') {
            const moved = tableau[dragSource.col].pop();
            const col2 = tableau[dragSource.col];
            if (col2.length && !col2[col2.length - 1].faceUp) {
              col2[col2.length - 1] = { ...col2[col2.length - 1], faceUp: true };
            }
            foundations[targetFoundation].push(moved);
            if (moved) {
              setTimeout(() => setLandingCard(moved.id), 50);
              setTimeout(() => setLandingCard(null), 500);
            }
          } else {
            const moved = waste.pop();
            foundations[targetFoundation].push(moved);
            if (moved) {
              setTimeout(() => setLandingCard(moved.id), 50);
              setTimeout(() => setLandingCard(null), 500);
            }
          }

          return { ...g, tableau, waste, foundations };
        });
        setMoves((m) => m + 1);
        playPlaceSound();
        moved = true;
      }
    } else if (targetCol >= 0) {
      // ===== MOVER A TABLEAU =====
      let cardToMove = null;
      let sourceCol = -1;

      if (dragSource && dragSource.source === 'tableau') {
        const col = game.tableau[dragSource.col];
        if (dragSource.cardIndex < col.length) {
          const cardsToMove = col.slice(dragSource.cardIndex);
          if (cardsToMove.length > 0 && canPlaceOnTableau(cardsToMove[0], game.tableau[targetCol])) {
            cardToMove = cardsToMove;
            sourceCol = dragSource.col;
          }
        }
      } else if (dragSource && dragSource.source === 'waste') {
        if (game.waste.length > 0) {
          const wasteCard = game.waste[game.waste.length - 1];
          if (canPlaceOnTableau(wasteCard, game.tableau[targetCol])) {
            cardToMove = [wasteCard];
            sourceCol = -1;
          }
        }
      }

      if (cardToMove) {
        pushHistorySnapshot();
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          const waste = [...g.waste];

          if (sourceCol >= 0) {
            const moving = tableau[sourceCol].splice(dragSource.cardIndex);
            const col = tableau[sourceCol];
            if (col.length && !col[col.length - 1].faceUp) {
              col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
            }
            tableau[targetCol].push(...moving);
            const movedCardId = moving[0]?.id;
            if (movedCardId) {
              setTimeout(() => setLandingCard(movedCardId), 50);
              setTimeout(() => setLandingCard(null), 500);
            }
          } else {
            const moved = waste.pop();
            tableau[targetCol].push(moved);
            if (moved) {
              setTimeout(() => setLandingCard(moved.id), 50);
              setTimeout(() => setLandingCard(null), 500);
            }
          }

          return { ...g, tableau, waste };
        });
        setMoves((m) => m + 1);
        playPlaceSound();
        moved = true;
      }
    }

    // Restaurar estilo original de la carta
    const cardElement = getCardElement(dragCard?.id);
    if (cardElement) {
      cardElement.style.opacity = '';
      cardElement.style.transform = '';
    }

    if (dragGhost) {
      document.body.removeChild(dragGhost);
    }

    setIsDragging(false);
    setDragCard(null);
    setDragGhost(null);
    setDragSource(null);

    if (!moved && selection) {
      setSelection(null);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', moveDrag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', moveDrag, { passive: false });
      document.addEventListener('touchend', endDrag);
      return () => {
        document.removeEventListener('mousemove', moveDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', moveDrag);
        document.removeEventListener('touchend', endDrag);
      };
    }
  }, [isDragging, dragSource, dragCard, game]);

  // ============================================================
  // HANDLERS DE CLICK
  // ============================================================

  function handleTableauCardClick(col, cardIndex) {
    if (won) return;

    // Si hubo arrastre, ignorar el click para evitar conflicto click vs drag
    if (wasDragged.current) {
      wasDragged.current = false;
      return;
    }

    const card = game.tableau[col][cardIndex];
    
    // Si la carta está boca abajo y es la última, voltearla
    if (!card.faceUp) {
      if (cardIndex === game.tableau[col].length - 1) {
        pushHistorySnapshot();
        setGame((g) => {
          const tableau = g.tableau.map((c) => [...c]);
          tableau[col][cardIndex] = { ...tableau[col][cardIndex], faceUp: true };
          return { ...g, tableau };
        });
        setFlippingCard(card.id);
        setTimeout(() => setFlippingCard(null), 400);
        playFlipSound();
      }
      return;
    }

    // Si hay una selección de otra columna, mover
    if (selection) {
      if (selection.source === 'tableau' && selection.col !== col) {
        tryMoveToTableau(col);
        return;
      }
      if (selection.source === 'waste' || selection.source === 'foundation') {
        tryMoveToTableau(col);
        return;
      }
      // Si es la misma columna y misma carta, deseleccionar
      if (selection.col === col && selection.cardIndex === cardIndex) {
        setSelection(null);
        return;
      }
      // Si es la misma columna diferente carta, cambiar selección
      if (selection.col === col) {
        setSelection({ source: 'tableau', col, cardIndex });
        return;
      }
    }

    // Verificar si la carta y las de abajo forman un grupo válido
    let isValidGroup = true;
    for (let i = cardIndex; i < game.tableau[col].length - 1; i++) {
      const current = game.tableau[col][i];
      const next = game.tableau[col][i + 1];
      if (!next.faceUp || 
          isRed(current.suit) === isRed(next.suit) || 
          current.rank !== next.rank + 1) {
        isValidGroup = false;
        break;
      }
    }

if (!isValidGroup) {
      setSelection(null);
      return;
    }

    // ============================================================
    // CRITERIO DE AUTO-MOVE (documentado)
    // ============================================================
    // Prioridad 1: Si es la ÚLTIMA carta de la columna y puede ir a
    //   alguna foundation → va a foundation automáticamente.
    // Prioridad 2: Si el grupo (o carta individual) puede ir a
    //   tableau → elegir la columna con más cartas (más construida).
    //   En caso de empate, elegir la columna más a la derecha.
    // Prioridad 3: Si hay múltiples destinos tableau → seleccionar
    //   el grupo y dejar que el usuario elija con un segundo clic.
    // ============================================================

    const isLastCard = cardIndex === game.tableau[col].length - 1;

    // ★ PRIORIDAD 1: Foundation (solo la última carta)
    if (isLastCard) {
      for (let f = 0; f < 4; f++) {
        if (canPlaceOnFoundation(card, game.foundations[f])) {
          pushHistorySnapshot();
          setGame((g) => {
            const tableau = g.tableau.map((c) => [...c]);
            const foundations = g.foundations.map((ff) => [...ff]);
            tableau[col].pop();
            if (tableau[col].length && !tableau[col][tableau[col].length - 1].faceUp) {
              tableau[col][tableau[col].length - 1] = { ...tableau[col][tableau[col].length - 1], faceUp: true };
            }
            foundations[f].push(card);
            return { ...g, tableau, foundations };
          });
          setMoves((m) => m + 1);
          setSelection(null);
          playPlaceSound();
          setTimeout(() => setLandingCard(card.id), 50);
          setTimeout(() => setLandingCard(null), 500);
          return;
        }
      }
    }

    // ★ PRIORIDAD 2: Tableau — elegir la mejor columna
    let bestCol = -1;
    let bestColSize = -1;
    for (let destCol = 0; destCol < 7; destCol++) {
      if (destCol !== col && canPlaceOnTableau(card, game.tableau[destCol])) {
        const colSize = game.tableau[destCol].length;
        // Preferir columna con más cartas; en empate, la más a la derecha
        if (colSize > bestColSize || (colSize === bestColSize && destCol > bestCol)) {
          bestColSize = colSize;
          bestCol = destCol;
        }
      }
    }
    if (bestCol >= 0) {
      pushHistorySnapshot();
      setGame((g) => {
        const tableau = g.tableau.map((c) => [...c]);
        const moving = tableau[col].splice(cardIndex);
        if (tableau[col].length && !tableau[col][tableau[col].length - 1].faceUp) {
          tableau[col][tableau[col].length - 1] = { ...tableau[col][tableau[col].length - 1], faceUp: true };
        }
        tableau[bestCol].push(...moving);
        return { ...g, tableau };
      });
      setMoves((m) => m + 1);
      setSelection(null);
      playPlaceSound();
      setTimeout(() => setLandingCard(card.id), 50);
      setTimeout(() => setLandingCard(null), 500);
      return;
    }

    // ★ PRIORIDAD 3: Múltiples destinos → seleccionar y dejar elegir al usuario
    const validDestinations = [];
    for (let destCol = 0; destCol < 7; destCol++) {
      if (destCol !== col && canPlaceOnTableau(card, game.tableau[destCol])) {
        validDestinations.push(destCol);
      }
    }
    if (validDestinations.length > 1) {
      setSelection({ source: 'tableau', col, cardIndex });
      return;
    }

    // Sin destinos → solo seleccionar (o deseleccionar si ya estaba)
    if (selection && selection.col === col && selection.cardIndex === cardIndex) {
      setSelection(null);
    } else {
      setSelection({ source: 'tableau', col, cardIndex });
    }
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

    // Si hubo arrastre, ignorar el click para evitar conflicto click vs drag
    if (wasDragged.current) {
      wasDragged.current = false;
      return;
    }

    if (selection && selection.source === 'waste') {
      setSelection(null);
      return;
    }
    if (selection) {
      setSelection(null);
      return;
    }
    // Intentar auto-move del waste
    if (game.waste.length > 0) {
      const moved = autoMoveCard({ type: 'waste' });
      if (!moved) {
        setSelection({ source: 'waste' });
      }
    }
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

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

  const isRed = (suit) => {
    return suit === 'hearts' || suit === 'diamonds';
  };

  return (
    <div style={CARD_VARS} className="w-full">
{/* ============================================================ */}
      {/* BARRA DE CONTROLES                                            */}
      {/* - Desktop: Moves/Time a la izquierda, botones a la derecha.   */}
      {/* - Móvil: los botones quedan arriba y Moves/Time se desplazan  */}
      {/*   a una línea debajo (por encima del tablero).                */}
      {/* - Todos los botones tienen dimensiones consistentes (cuadrados */}
      {/*   iguales en móvil, altura uniforme en desktop).              */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>
        {/* Contador de movimientos y tiempo: desktop izquierda / móvil debajo */}
<div className="flex gap-4 order-2 sm:order-1">
          <span className="font-medium">{t('game.moves')}: <span className="tabular-nums">{moves}</span></span>
          <span className="font-medium">{t('game.time')}: <span className="tabular-nums">{formatTime(seconds)}</span></span>
        </div>

        {/* Fila de botones: desktop derecha / móvil arriba */}
        <div className="flex flex-wrap items-center justify-end gap-2 order-1 sm:order-2">

          {/* ============================================================ */}
          {/* ☕ KO-FI - Donación internacional (EE.UU. / Europa / resto)   */}
          {/* Desktop: logo oficial + "🌍 Internacional" DEBAJO del logo.  */}
          {/* Móvil: ícono Heart (lucide) + banderita 🌍 en la esquina.    */}
          {/* ============================================================ */}
          <a
            href="https://ko-fi.com/Y8Y6XTKCE"
            target="_blank"
            rel="noopener"
className="relative inline-flex flex-col items-center justify-center rounded-2xl w-[52px] h-[52px] gap-0.5 sm:w-auto sm:min-h-[64px] sm:px-2 sm:py-1 shadow-xl hover:scale-[1.02] border-2 border-[#72a4f2] bg-[#72a4f2] text-white transition-all duration-200"
            aria-label="Support me on Ko-fi (International)"
            title="Support me on Ko-fi"
          >
            {/* Móvil: ícono Heart de lucide-react (reemplaza la imagen) */}
            <Heart className="w-7 h-7 sm:hidden" fill="currentColor" aria-hidden="true" />
            {/* Desktop: logo oficial Ko-fi */}
            <img
              src="https://storage.ko-fi.com/cdn/kofi5.png"
              alt="Ko-fi"
              className="hidden sm:block h-11 w-auto"
            />
            {/* Banderita del mundo en la esquina (móvil y desktop) */}
            <span className="absolute top-0.5 right-0.5 text-[10px] sm:text-sm leading-none" aria-hidden="true">🌍</span>
          </a>

          {/* ============================================================ */}
          {/* ☕ CAFECITO - Donación Argentina (evita impuestos al dólar)   */}
          {/* Desktop: logo oficial + "🇦🇷 Argentina" DEBAJO del logo.    */}
          {/* Móvil: ícono Coffee (lucide) + banderita 🇦🇷 en la esquina. */}
          {/* ============================================================ */}
          <a
            href="https://cafecito.app/ferjuegos"
            target="_blank"
            rel="noopener"
className="relative inline-flex flex-col items-center justify-center rounded-2xl w-[52px] h-[52px] gap-0.5 sm:w-auto sm:min-h-[64px] sm:px-2 sm:py-1 shadow-xl hover:scale-[1.02] border-2 border-[#80A9BA] bg-[#80A9BA] text-white transition-all duration-200"
            aria-label="Invitame un cafecito (Argentina)"
            title="Invitame un Cafecito"
          >
            {/* Móvil: ícono Coffee de lucide-react (reemplaza la imagen) */}
            <Coffee className="w-7 h-7 sm:hidden" fill="currentColor" aria-hidden="true" />
            {/* Desktop: logo oficial Cafecito */}
            <img
              src="https://cdn.cafecito.app/imgs/buttons/button_4.png"
              srcSet="https://cdn.cafecito.app/imgs/buttons/button_4.png 1x, https://cdn.cafecito.app/imgs/buttons/button_4_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_4_3.75x.png 3.75x"
              alt="Cafecito"
              className="hidden sm:block h-10 w-auto"
            />
            {/* Banderita de Argentina en la esquina (móvil y desktop) */}
            <span className="absolute top-0.5 right-0.5 text-[10px] sm:text-sm leading-none" aria-hidden="true">🇦🇷</span>
          </a>

<ThemeToggle />

          <LanguageSelector />

          <button
            onClick={toggleMute}
            className={`inline-flex items-center justify-center rounded-2xl w-[52px] h-[52px] sm:w-auto sm:min-h-[64px] sm:px-4 text-white font-bold text-xl transition-all duration-200 shadow-xl hover:scale-[1.02] border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 ${
              isMuted
                ? 'bg-red-600/60 hover:bg-red-600/80 border-red-400/60'
                : 'bg-emerald-600/60 hover:bg-emerald-600/80 border-emerald-400/60'
            }`}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
          >
            {isMuted ? <VolumeX className="w-7 h-7" aria-hidden="true" /> : <Volume2 className="w-7 h-7" aria-hidden="true" />}
          </button>

          <button
            onClick={handleUndo}
            disabled={!history.length}
            aria-label={t('game.undo', 'Undo')}
            title={t('game.undo', 'Undo')}
            className="inline-flex items-center justify-center rounded-2xl w-[52px] h-[52px] sm:w-auto sm:min-h-[64px] sm:px-4 gap-2 bg-slate-600/70 hover:bg-slate-500/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <RotateCcw className="w-6 h-6 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('game.undo', 'Undo')}</span>
          </button>

          <button
            onClick={newGame}
            aria-label={t('game.ariaNewGame')}
            title={t('game.newGame')}
            className="inline-flex items-center justify-center rounded-2xl w-[52px] h-[52px] sm:w-auto sm:min-h-[64px] sm:px-6 gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <RefreshCw className="w-6 h-6 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('game.newGame')}</span>
          </button>
        </div>
      </div>

      <div
        className="game-board p-2 sm:p-4"
        style={{
          background: 'linear-gradient(135deg, var(--bg-board-2) 0%, var(--bg-board) 100%)',
        }}
      >
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
          <div>
            {game.stock.length > 0 ? (
              <SolitaireCard
                faceDown
                onClick={handleStockClick}
                isDealing={false}
                card={{ id: 'stock' }}
              />
            ) : (
              <EmptySlot onClick={handleStockClick}>
                <RotateCcw
                  className="opacity-70"
                  style={{ width: 'calc(var(--card-font) * 1.8)', height: 'calc(var(--card-font) * 1.8)' }}
                  aria-hidden="true"
                />
              </EmptySlot>
            )}
          </div>
          <div
            onMouseDown={(e) => {
              if (game.waste.length > 0) {
                const card = game.waste[game.waste.length - 1];
                startDrag(e, card, { source: 'waste' });
              }
            }}
            onTouchStart={(e) => {
              if (game.waste.length > 0) {
                const card = game.waste[game.waste.length - 1];
                startDrag(e, card, { source: 'waste' });
              }
            }}
          >
            {game.waste.length > 0 ? (
              <div data-card-id={game.waste[game.waste.length - 1].id}>
                <SolitaireCard
                  card={game.waste[game.waste.length - 1]}
                  selected={!!selection && selection.source === 'waste'}
                  onClick={handleWasteClick}
                  onDoubleClick={() => autoMoveCard({ type: 'waste' })}
                  isLanding={landingCard === game.waste[game.waste.length - 1]?.id}
                  isDealing={false}
                />
              </div>
            ) : (
              <EmptySlot />
            )}
          </div>
          <div />
          {[0, 1, 2, 3].map((f) => {
            const pile = game.foundations[f];
            const sel = !!selection && selection.source === 'foundation' && selection.fIndex === f;
            const topCard = pile[pile.length - 1];
            return (
              <div key={f} data-foundation-slot={f}>
                {pile.length > 0 ? (
                  <SolitaireCard
                    card={topCard}
                    selected={sel}
                    onClick={() => handleFoundationClick(f)}
                    isLanding={landingCard === topCard?.id}
                    isDealing={false}
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

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {game.tableau.map((column, col) => (
            <div key={col} className="flex flex-col items-center" style={{ width: 'var(--card-w)' }} data-tableau-slot={col}>
              {column.length === 0 ? (
                <EmptySlot
                  onClick={() => handleTableauColumnClick(col)}
                />
              ) : (
<div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: getColumnHeight(column),
                  }}
                >
                  {column.map((card, i) => {
                    const isDealing = isDealingCard(col, i);
                    const delay = getDealDelay(col, i);
                    const cardTop = getCardTop(column, i);
                    
                    return (
                      <div
                        key={card.id}
                        data-card-id={card.id}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          left: 0,
                          top: `${cardTop}px`,
                          zIndex: i + 1,
                          cursor: card.faceUp ? 'grab' : 'default',
                        }}
                        onMouseDown={(e) => {
                          if (card.faceUp && !isDealing) {
                            startDrag(e, card, { source: 'tableau', col, cardIndex: i });
                          }
                        }}
                        onTouchStart={(e) => {
                          if (card.faceUp && !isDealing) {
                            startDrag(e, card, { source: 'tableau', col, cardIndex: i });
                          }
                        }}
                      >
                        <SolitaireCard
                          card={card}
                          faceDown={!card.faceUp}
                          isFlipping={flippingCard === card.id}
                          selected={isSelected(col, i)}
                          onClick={() => handleTableauCardClick(col, i)}
                          onDoubleClick={() => {
                            if (i === column.length - 1 && card.faceUp) {
                              const cardToMove = card;
                              // Foundation primero
                              for (let f = 0; f < 4; f++) {
                                if (canPlaceOnFoundation(cardToMove, game.foundations[f])) {
                                  pushHistorySnapshot();
                                  setGame((g) => {
                                    const tableau = g.tableau.map((c) => [...c]);
                                    const foundations = g.foundations.map((ff) => [...ff]);
                                    const removed = tableau[col].pop();
                                    if (tableau[col].length && !tableau[col][tableau[col].length - 1].faceUp) {
                                      tableau[col][tableau[col].length - 1] = { ...tableau[col][tableau[col].length - 1], faceUp: true };
                                    }
                                    foundations[f].push(removed);
                                    return { ...g, tableau, foundations };
                                  });
                                  setMoves((m) => m + 1);
                                  setSelection(null);
                                  playPlaceSound();
                                  setTimeout(() => setLandingCard(cardToMove.id), 50);
                                  setTimeout(() => setLandingCard(null), 500);
                                  return;
                                }
                              }
                              // Luego tableau - elegir la mejor columna
                              let bestCol = -1;
                              let bestColSize = -1;
                              for (let destCol = 0; destCol < 7; destCol++) {
                                if (destCol !== col && canPlaceOnTableau(cardToMove, game.tableau[destCol])) {
                                  const colSize = game.tableau[destCol].length;
                                  if (colSize > bestColSize) {
                                    bestColSize = colSize;
                                    bestCol = destCol;
                                  }
                                }
                              }
                              if (bestCol >= 0) {
                                pushHistorySnapshot();
                                setGame((g) => {
                                  const tableau = g.tableau.map((c) => [...c]);
                                  const removed = tableau[col].pop();
                                  if (tableau[col].length && !tableau[col][tableau[col].length - 1].faceUp) {
                                    tableau[col][tableau[col].length - 1] = { ...tableau[col][tableau[col].length - 1], faceUp: true };
                                  }
                                  tableau[bestCol].push(removed);
                                  return { ...g, tableau };
                                });
                                setMoves((m) => m + 1);
                                setSelection(null);
                                playPlaceSound();
                                setTimeout(() => setLandingCard(cardToMove.id), 50);
                                setTimeout(() => setLandingCard(null), 500);
                              }
                            }
                          }}
                          index={i}
                          columnIndex={col}
                          isDealing={isDealing}
                          isLanding={landingCard === card.id && !isDealing}
                          dealDelay={delay}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute inset-0 rounded-[1.25rem] bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4 z-10"
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
<Trophy className="w-8 h-8 text-amber-300" aria-hidden="true" />
                {t('game.youWon')}
              </motion.h2>
              <p className="text-emerald-100 mb-1">{t('game.solvedIn', { moves })}</p>
              <p className="text-emerald-100 mb-4">{t('game.timeLabel', { time: formatTime(seconds) })}</p>
              <button
                onClick={newGame}
                className="px-5 py-2.5 rounded-lg bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors"
              >
                {t('game.playAgain')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

<details className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
<summary className="cursor-pointer font-medium" style={{ color: 'var(--text-primary)' }}>{t('game.howToPlay')}</summary>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>{t('game.rule1')}</li>
          <li>{t('game.rule2')}</li>
          <li>{t('game.rule3')}</li>
          <li>{t('game.rule4')}</li>
          <li>{t('game.rule5')}</li>
        </ul>
      </details>
    </div>
  );
}

