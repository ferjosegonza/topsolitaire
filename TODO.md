# TODO — TopSolitaire

> 📜 **Historial cronológico completo** → `__mis_aux_files/TODO_HISTORICO.md`

---

## 🟢 COMPLETADO (resumen)

### Juego funcional
- Klondike Solitaire completo en React + Vite + Tailwind
- Componentes: `SolitaireGame`, `SolitaireCard`, lógica en `solitaire.js`
- Drag & drop con ghost visual, click auto-move con criterio inteligente
- Sonidos (use-sound) con mute/unmute
- Efectos visuales: reparto, volteo, aterrizaje, confeti de victoria
- Temporizador y contador de movimientos
- Botón Cafecito (donación) integrado en la fila de botones

### Publicidad (O7) — ✅ COMPLETADO
- Anuncios AdSense estáticos en `index.html` (top, side, bottom)
- Eliminados `AdBanner` duplicados de React en `App.jsx` y `Home.jsx`
- Contenedores colapsables con `:has()` para evitar CLS
- Lateral fijo sin desplazar el tablero
- Build verificado sin errores

### Temas 3 modos (O1 + O2) — ✅ COMPLETADO
- `ThemeContext.jsx` con 3 modos: **rainy** (default), dark, light
- `ThemeToggle.jsx` que cicla rainy → dark → light → rainy
- Persistencia en `localStorage` (`topsolitaire-theme`)
- Variables CSS en `index.css` para cada tema (`[data-theme="rainy"]`, `[data-theme="dark"]`, `[data-theme="light"]`)
- Transición suave de colores (0.5s), respeta `prefers-reduced-motion`
- Tests de tema (`theme.test.jsx`) que verifican ciclo, persistencia y `aria-checked`

### Tests
- **10 archivos de test**: solitaire (lógica), sound, drag-drop, auto-move, ui, visual-effects, app-routing, theme (nuevo)
- Tests de routing (`app-routing`) confirman que el sitio funciona sin auth
- Tests de tema que verifican ciclo 3 modos y persistencia

### Sonidos
- `card-flip.mp3`, `card-place.mp3`, `deal.mp3`, `win.mp3`, `click.mp3`

---

## 🔵 EN PROGRESO

> *(vacío — todos los objetivos activos están en Pendiente)*

---

## 🔵 PENDIENTE

### P1-A: Eliminar archivos de auth no utilizados
- [ ] Eliminar páginas: `Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`
- [ ] Eliminar componentes: `AuthLayout.jsx`, `ProtectedRoute.jsx`, `UserNotRegisteredError.jsx`, `GoogleIcon.jsx`
- [ ] Eliminar lib: `AuthContext.jsx`, `app-params.js`, `PageNotFound.jsx`
- [ ] Eliminar api: `topsolitaireClient.js`
- [ ] Eliminar config: `User.jsonc`
- [ ] Verificar: tests de `app-routing` pasan sin auth (ya probado)

### Fase 12: Rediseño UX/UI + Modo Lluvioso

| Obj | Prioridad | Descripción | Estado |
|-----|-----------|-------------|--------|
| O3 | Alta | Fondo animado del Modo Lluvioso (CSS puro, ligero) | 🟢 Completado |
| O4 | Alta | Tipografías Nunito (preconnect + variables) | 🔵 Pendiente |
| O5 | Alta | Rediseño visual (tablero, cartas, botones, íconos SVG) | 🔵 Pendiente |
| O6 | Alta | Botón Cafecito responsive (FAB en móvil, inline desktop) | 🔵 Pendiente |
| O8 | Media | Accesibilidad (teclado, contraste, aria, reduced-motion) | 🔵 Pendiente |
| O9 | Baja | Sonido ambiental de lluvia (ligero, ligado al Modo Lluvioso) | 🔵 Pendiente |
| O10 | Alta | Responsive final + Core Web Vitals + build | 🔵 Pendiente |

### O3: Fondo animado (lluvia, niebla, nubes) — CSS puro, ligero
- [x] **O3-C1**: Crear `src/components/RainyBackground.jsx` con animaciones CSS:
  - Lluvia: rayas (`span`) animadas con `@keyframes rainy-fall`
  - Niebla: radial-gradient animado con `@keyframes rainy-fog-drift`
  - Nubes: CSS shapes (`::before/::after`) con `@keyframes rainy-cloud-drift`
- [x] **O3-C2**: Integrar en `App.jsx` (capa `position: fixed`, `pointer-events: none`, `z-index: 30`, `aria-hidden`)
- [x] **O3-C3**: Solo visible en modo rainy (oculto en dark/light — `theme !== 'rainy' → null`)
- [x] **O3-C4**: Respetar `prefers-reduced-motion` (`display:none` en el media query)
- [x] **O3-V**: Verificado: tests `rainy-background.test.jsx` (3) + `theme.test.jsx` (7) = 10/10 PASS; build `vite build` exitoso (2023 modules)

### O4: Tipografías Nunito
- [ ] **O4-C1**: Agregar preconnect + Google Fonts Nunito en `index.html`
- [ ] **O4-C2**: Actualizar `--font-heading` y `--font-body` en `src/index.css`
- [ ] **O4-C3**: Actualizar `fontFamily` en `tailwind.config.js`

### O5: Rediseño visual
- [ ] **O5-C1**: Rediseñar tablero (bordes, sombras suaves, border-radius)
- [ ] **O5-C2**: Dorso de carta con textura cálida (rainy) y textura original (dark/light)
- [ ] **O5-C3**: Jerarquía visual del header (título + subtítulo)
- [ ] **O5-C4**: Reemplazar emojis (`🔊`, `🔇`, `🔄`, `🎉`, `↻`, `☕`) por íconos SVG de `lucide-react`
- [ ] **O5-C5**: Estilos consistentes del `details` "How to play"
- [ ] **O5-V**: Tests no se rompen, build exitoso

### O6: Botón Cafecito responsive
- [ ] **O6-C1**: FAB flotante en móviles (<768px) — estilo botón redondo, posición bottom-right
- [ ] **O6-C2**: Inline en desktop (≥768px) — mismo estilo actual
- [ ] **O6-C3**: Nunca tapa el tablero ni botones de juego
- [ ] **O6-V**: Verificar en viewports 360px, 390px, 768px, 1200px, 1920px

### O8: Accesibilidad
- [ ] **O8-C1**: `onKeyDown` (Enter/Espacio) en cartas para navegación por teclado
- [ ] **O8-C2**: Corregir contraste de texto (`text-slate-500` → WCAG AA), verificar slots vacíos
- [ ] **O8-C3**: `aria-label` en cartas/botones faltantes
- [ ] **O8-C4**: `prefers-reduced-motion` global (ya implementado parcialmente en index.css)

### O9: Sonido ambiental de lluvia (ligero)
- [ ] **O9-C1**: Hook `useRainSound` (Howler/useSound) con loop, activo solo en modo rainy
- [ ] **O9-C2**: Bajo volumen, sin romper `useSoundEffects` existente
- [ ] **O9-C3**: Sonido gratuito corto (loopable) tipo "lluvia suave"

### O10: Responsive final + Core Web Vitals + limpieza
- [ ] **O10-C1**: Revisión integral de todas las resoluciones (360px → ultrawide)
- [ ] **O10-C2**: Verificar LCP, CLS, INP (evitar animaciones costosas)
- [ ] **O10-C3**: Correr batería completa de tests
- [ ] **O10-C4**: Build final (`npm run build`) y verificar compilación

---

## 📊 LEYENDA

| Símbolo | Significado |
|---------|-------------|
| 🟢 Completado | Tarea terminada y verificada |
| 🟡 En progreso | Tarea comenzada pero no terminada |
| 🔵 Pendiente | Tarea identificada pero no comenzada |
| 🟣 Sugerido | Mejora futura, no planificada |
| ✅ Completado | Checklist item completado |
| ⬜ Pendiente | Checklist item pendiente |
| ❌ Descartado | Descartado por decisión del usuario |

---

## 🔍 CRITERIO DE AUTO-MOVE (documentado)

Cuando el usuario hace clic en una carta boca arriba en el tableau:

1. **Prioridad 1 — Foundation**: Si es última carta y puede ir a alguna foundation → auto-mover
2. **Prioridad 2 — Tableau (mejor columna)**: Elegir columna con más cartas; empate → más a la derecha
3. **Prioridad 3 — Múltiples opciones**: Seleccionar y dejar que usuario elija con segundo clic

---

## 🐛 BUGS CONOCIDOS (resueltos)

| # | Bug | Estado |
|---|-----|--------|
| 1 | `container` indefinida en `startDrag` → ReferenceError | ✅ |
| 2 | `dragStartPos.current` no inicializado → click vs drag mal detectado | ✅ |
| 3 | EmptySlot no propaga `...rest` → slots perdidos | ✅ |
| 4 | Falta `data-tableau-slot` en columnas con cartas | ✅ |
| 5 | Falta `data-foundation-slot` en foundations con cartas | ✅ |
| 6 | Auto-move no chequeaba foundation primero | ✅ |
| 7 | Código muerto en auto-move (duplicado) | ✅ |
| 8 | Reparto interrumpido en New Game (ms mezclados con segundos) | ✅ |
| 9 | Offsets de cartas no acumulativos → cartas solapadas | ✅ |
| 10 | Alto de columna fijo → escapes de recuadro verde | ✅ |
| 11 | Test flaky visual-effects (isWon restaurado tarde) | ✅ |
| 12 | Test app-routing buscaba texto incorrecto | ✅ |

