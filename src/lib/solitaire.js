// Klondike Solitaire — pure game logic, no frameworks.

export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
export const SUIT_SYMBOLS = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' };
export const RANK_LABELS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function isRed(suit) {
  return suit === 'hearts' || suit === 'diamonds';
}

export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) {
      deck.push({ suit, rank, faceUp: false, id: `${suit}-${rank}` });
    }
  }
  return deck;
}

export function shuffle(deck) {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

// Returns a fresh, randomized Klondike deal.
export function deal() {
  const deck = shuffle(createDeck());
  const tableau = [[], [], [], [], [], [], []];
  let idx = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      tableau[col].push({ ...deck[idx++], faceUp: row === col });
    }
  }
  const stock = deck.slice(idx).map((c) => ({ ...c, faceUp: false }));
  return { tableau, stock, waste: [], foundations: [[], [], [], []] };
}

// Can the given card start a valid sequence on top of this tableau column?
export function canPlaceOnTableau(card, column) {
  if (column.length === 0) return card.rank === 13; // only Kings to empty columns
  const top = column[column.length - 1];
  if (!top.faceUp) return false;
  return isRed(card.suit) !== isRed(top.suit) && card.rank === top.rank - 1;
}

// Can the given single card be placed on this foundation pile?
export function canPlaceOnFoundation(card, foundation) {
  if (foundation.length === 0) return card.rank === 1; // Ace starts a foundation
  const top = foundation[foundation.length - 1];
  return card.suit === top.suit && card.rank === top.rank + 1;
}

export function isWon(game) {
  return game.foundations.every((f) => f.length === 13);
}

function cloneValue(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

export function cloneGameState(game) {
  return cloneValue(game);
}

export function createGameSnapshot(game, moves = 0, seconds = 0, won = false, selection = null) {
  return {
    game: cloneGameState(game),
    moves,
    seconds,
    won,
    selection: selection ? { ...selection } : null,
  };
}

export function restoreGameSnapshot(state, snapshot) {
  return {
    game: snapshot?.game ? cloneGameState(snapshot.game) : cloneGameState(state.game),
    moves: snapshot?.moves ?? state.moves,
    seconds: snapshot?.seconds ?? state.seconds,
    won: snapshot?.won ?? state.won,
    selection: null,
  };
}