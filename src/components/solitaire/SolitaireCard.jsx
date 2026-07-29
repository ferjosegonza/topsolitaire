import React from 'react';
import { motion } from 'framer-motion';
import { RANK_LABELS, SUIT_SYMBOLS, isRed } from '@/lib/solitaire';

export default function SolitaireCard({ 
  card, 
  faceDown, 
  selected, 
  onClick, 
  onDoubleClick, 
  style,
  dragEnabled = false,
  onDragStart,
  onDragEnd,
  onDrag,
  index,
  columnIndex,
}) {
  if (faceDown) {
    return (
      <motion.div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={style}
        className="solitaire-card solitaire-card-back relative cursor-pointer"
        aria-hidden="true"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
      />
    );
  }

  const red = isRed(card.suit);
  const rankLabel = RANK_LABELS[card.rank];
  const symbol = SUIT_SYMBOLS[card.suit];

  // Configurar drag
  const dragProps = dragEnabled ? {
    drag: true,
    dragMomentum: false,
    dragElastic: 0.1,
    onDragStart: (e, info) => onDragStart?.(e, info, card, index, columnIndex),
    onDragEnd: (e, info) => onDragEnd?.(e, info, card, index, columnIndex),
    onDrag: onDrag,
    whileDrag: {
      scale: 1.05,
      zIndex: 100,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    },
    dragTransition: {
      power: 0.1,
    },
  } : {};

  return (
    <motion.div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={style}
      className={`solitaire-card relative bg-white rounded-md shadow-md cursor-pointer select-none ${
        selected ? 'ring-2 ring-sky-300 ring-offset-1 ring-offset-emerald-900' : ''
      } ${red ? 'text-rose-600' : 'text-slate-900'}`}
      role="button"
      tabIndex={0}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...dragProps}
    >
      <div className="absolute top-0.5 left-1 leading-none font-bold" style={{ fontSize: 'var(--card-font)' }}>
        <div>{rankLabel}</div>
        <div style={{ fontSize: 'calc(var(--card-font) * 0.9)' }}>{symbol}</div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: 'var(--card-font-lg)' }}>
        {symbol}
      </div>
    </motion.div>
  );
}