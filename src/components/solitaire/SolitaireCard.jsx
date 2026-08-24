import React from 'react';
import { motion } from 'framer-motion';
import { RANK_LABELS, SUIT_SYMBOLS, isRed } from '@/lib/solitaire';

export default function SolitaireCard({
  card,
  faceDown,
  selected,
  onClick,
  onDoubleClick,
  onMouseDown,
  onTouchStart,
  style,
  index,
  columnIndex,
  isDealing = false,
  isLanding = false,
  dealDelay = 0,
  isFlipping = false,
}) {
  // Si la carta está volteándose, mostrar animación
  if (isFlipping) {
    return (
      <motion.div
        style={style}
        className="solitaire-card solitaire-card-back relative cursor-pointer rounded-[var(--card-radius)]"
        initial={{ rotateY: 0, scale: 1 }}
        animate={{ rotateY: 180, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    );
  }

  if (faceDown) {
    return (
      <motion.div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={style}
        className="solitaire-card solitaire-card-back relative cursor-pointer card-shine rounded-[var(--card-radius)]"
        aria-hidden="true"
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ duration: 0.15 }}
        initial={isDealing ? { opacity: 0, y: -30, rotate: 5 } : {}}
        animate={isDealing ? {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { delay: dealDelay, duration: 0.4, ease: 'easeOut' }
        } : {}}
      />
    );
  }

  const red = isRed(card.suit);
  const rankLabel = RANK_LABELS[card.rank];
  const symbol = SUIT_SYMBOLS[card.suit];

  return (
    <motion.div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={style}
      className={`solitaire-card relative bg-white rounded-[var(--card-radius)] shadow-md cursor-pointer select-none ${
        selected ? 'ring-2 ring-sky-300 ring-offset-1 ring-offset-emerald-900' : ''
      } ${red ? 'text-rose-600' : 'text-slate-900'}`}
      role="button"
      tabIndex={0}
      layout
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      initial={isDealing ? { opacity: 0, y: -40, rotate: 8, scale: 0.9 } : {}}
      animate={isDealing ? {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { delay: dealDelay, duration: 0.45, ease: 'easeOut' }
      } : {}}
    >
      {isLanding && (
        <div className="absolute inset-0 rounded-[var(--card-radius)] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[card-shine_0.8s_ease-in-out]" />
        </div>
      )}

      {/* Número en esquina superior izquierda */}
      <div className="absolute top-0.5 left-0.5 leading-none font-bold" style={{ fontSize: 'var(--card-font)' }}>
        <div>{rankLabel}</div>
      </div>

      {/* Símbolo en esquina superior derecha */}
      <div className="absolute top-0.5 right-0.5 leading-none font-bold" style={{ fontSize: 'calc(var(--card-font) * 1)' }}>
        <div>{symbol}</div>
      </div>

      {/* Símbolo central - ahora centrado en el espacio restante */}
      <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center" style={{ 
        fontSize: 'var(--card-font-lg)',
        top: 'calc(var(--card-font) * 1 )'
      }}>
        {symbol}
      </div>

    </motion.div>
  );
}

