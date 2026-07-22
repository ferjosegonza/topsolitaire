# Solitaire - Mejoras Planificadas

## 📋 Seguimiento de tareas

### ✅ Paso 1: Responsive móvil vertical
**Objetivo**: Adaptar el tablero para que se vea completo en móvil vertical SIN scroll horizontal ni vertical.
**Archivos**: `SolitaireGame.jsx`, `SolitaireCard.jsx`, `index.css`, `Home.jsx`
**Estado**: ✅ Completado
**Cambios realizados**:
- `--card-w`: fórmula `clamp(34px, calc((100vw - 48px) / 7), 78px)` para que encajen 7 columnas exactas
- Carta height ratio reducido a 1.35
- Overlap entre cartas más ajustado (`-0.92` en vez de `-1.0`, `-1.1` en vez de `-1.2`)
- Barra de estado más compacta en móvil (text-xs, gap-2, py reducido)
- Board padding reducido en móvil (`p-1` vs `p-4`)
- Gaps reducidos (`gap-0.5` vs `gap-2`)
- "How to play" oculto en móvil (`hidden sm:block`)
- Título más pequeño en móvil (`text-lg`)
- Descripción del juego oculta en móvil (`hidden sm:block`)
- Padding general del layout reducido en móvil

### ⬜ Paso 2: Fundaciones "A" más visibles
**Objetivo**: Mejorar contraste y tamaño de los slots vacíos de las fundaciones.
**Archivos**: `SolitaireGame.jsx` (EmptySlot)
**Estado**: ⬜ Pendiente

### ⬜ Paso 3: Mazo/cartas más visibles
**Objetivo**: Reverso de carta con colores más claros y contrastantes para personas con baja visión.
**Archivos**: `index.css` (`.solitaire-card-back`)
**Estado**: ⬜ Pendiente

### ⬜ Paso 4: Drag & Drop
**Objetivo**: Sistema completo de arrastre con mouse (mousedown/move/up) y táctil (touchstart/move/end).
**Archivos**: `SolitaireCard.jsx`, `SolitaireGame.jsx`
**Estado**: ⬜ Pendiente

---

## ✅ Completado
*(nada aún)*

