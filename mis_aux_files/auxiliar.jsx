Te paso el contenido del archivo "C:\xampp\htdocs\topsolitaire\TODO.md" y lo nuevo, quiero que incluyas lo nuevo al contenido actual de "TODO.md":

A continuación te paso el contenido actual del archivo "C:\xampp\htdocs\topsolitaire\TODO.md":
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

### Donaciones (O6) — ✅ COMPLETADO
- **Cafecito** (Argentina): botón con imagen oficial, intacto, en la fila de botones
- **Ko-fi** (Internacional): botón con imagen oficial SVG, altura coherente (`h-[44px]`), en la fila de botones
- Ambos enlazan a pestaña nueva, sin tapa el tablero ni los controles del juego
- **Responsive**: fila de botones con `flex-wrap`; tamaños compactos en móvil (`min-h-[52px]`, imagen `h-[34px]`) y normales en `sm+` (`min-h-[64px]`, imagen `h-[44px]`)

### Header (Home.jsx) — ✅ COMPLETADO
- Pill "Play · Relax · Rainy Day" ahora usa colores legibles en modos rainy y dark (`var(--accent)` sobre `var(--accent-muted)`) en lugar de variables inexistentes (`--accent-strong`, `--bg-chip`, `--border-soft`)

### Tests
- **10 archivos de test**: solitaire (lógica), sound, drag-drop, auto-move, ui, visual-effects, app-routing, theme (nuevo)
- Tests de routing (`app-routing`) confirman que el sitio funciona sin auth
- Tests de tema que verifican ciclo 3 modos y persistencia

### Sonidos
- `card-flip.mp3`, `card-place.mp3`, `deal.mp3`, `win.mp3`, `click.mp3`

---

## 🔵 PENDIENTE (activo)

> *(nada en progreso activo; los objetivos pendientes están abajo)*

---

## 🔵 PENDIENTE

### P1-A: Eliminar archivos de auth no utilizados
- [ ] Eliminar páginas: `Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`
- [ ] Eliminar componentes: `AuthLayout.jsx`, `ProtectedRoute.jsx`, `UserNotRegisteredError.jsx`, `GoogleIcon.jsx`
- [ ] Eliminar lib: `AuthContext.jsx`, `app-params.js`, `PageNotFound.jsx`
- [ ] Eliminar api: `topsolitaireClient.js`
- [ ] Eliminar config: `User.jsonc`
- [ ] Verificar: tests de `app-routing` pasan sin auth (ya probado)

### O5: Rediseño visual (finalizar)
- [ ] **O5-C1**: Pulido final del tablero (bordes, sombras suaves, border-radius) — clases `game-board`/`game-slot` ya aplicadas
- [ ] **O5-C3**: Jerarquía del header en `Home.jsx` (pill de marca con ícono SVG Spade + identidad "Klondike", título/subtítulo) — hoy AÚN usa emoji ☕
- [ ] **O5-V**: Verificación final (tests + `npm run build`)

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

### 📱 Auditoría Responsive — Estado por elemento

> Identifica qué ya tiene comportamiento responsive adecuado y qué falta mejorar.

| Elemento | Estado | Detalle |
|----------|--------|---------|
| Cartas (ancho) | ✅ | `--card-w: clamp(36px, 11vw, 78px)` se adapta en todas las resoluciones |
| Alto de columnas | ✅ | `getColumnHeight` dinámico, no escapa del recuadro |
| Tablero | ✅ | `game-board` con `p-2 sm:p-4`, grid `gap-1 sm:gap-2` |
| Grid 7 columnas | ✅ | `grid-cols-7` fijo; las cartas se encogen vía `clamp` |
| Layout Home | ✅ | `flex-col lg:flex-row`, `px-3 py-5 sm:py-7`, `max-w-[1100px]` |
| Header pill/título | ✅ | `text-center sm:text-left`, títulos `text-2xl sm:text-3xl` |
| Botones donación (Ko-fi/Cafecito) | ✅ | `flex-wrap` en la fila; compactos en móvil (`min-h-[52px]`, img `h-[34px]`), normales en `sm+` |
| Fila de botones | ✅ | `flex-wrap items-center justify-end gap-2` |
| Botón sonido | ✅ | `min-h-[52px] sm:min-h-[64px]`, `px-3 sm:px-4` |
| Botón New Game | ✅ | `text-base sm:text-lg`, `px-4 sm:px-6`, sin `min-w` rígido |
| Overlay de victoria | ✅ | `px-4`, texto responsivo |
| Details "How to play" | ✅ | `text-sm`, lista fluida |
| Anuncios (top/bottom/side) | ✅ | `ad-container` responsive, lateral solo ≥1200px, colapso con `:has()` |
| Footer y páginas (Privacy/Contact) | ⚠️ | No verificados en detalle a 360px; revisar como parte de O10-C1 |
| Ultrawide (>1920px) | ⚠️ | El tablero queda centrado con `max-w-[1100px]`; validar que no se vea "perdido" ni se dispare el lateral |

**Pendiente de mejora responsive (para O10):**
- [ ] Revisar footer y páginas administrativas (Privacy/Contact) en 360px–390px
- [ ] Validar composición en ultrawide (1920px+): el tablero centrado a 1100px puede sentirse pequeño; evaluar `max-w` mayor o fondo decorativo
- [ ] Confirmar que el anuncio lateral fijo (160px) no genere solapamiento con el contenido en 1200–1400px
- [ ] Verificación visual de la fila de botones en 360px (que no queden 2 botones partidos de forma fea)

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

A continuación lo nuevo (que ya está hecho) que quiero que integres el contenido actual del archivo "C:\xampp\htdocs\topsolitaire\TODO.md":
# TODO — Soporte Multilingüe (i18n) en TopSolitaire

## Pasos del plan

- [ ] 1. Instalar dependencias `i18next` + `react-i18next`
- [ ] 2. Crear `src/i18n.js` (config + 7 idiomas + detección navigator.language + localStorage + fallback en)
- [ ] 3. Crear `src/components/ui/LanguageSelector.jsx` (desplegable bandera+nombre; mobile solo globo)
- [ ] 4. Crear hook `src/lib/useDocumentMeta.js` (actualiza <title> y metas dinámicamente)
- [ ] 5. Modificar `src/main.jsx` (envolver con I18nextProvider)
- [ ] 6. Modificar `src/App.jsx` (montar LanguageSelector + hook de meta)
- [ ] 7. Modificar `src/pages/Home.jsx` (textos con t())
- [ ] 8. Modificar `src/components/Footer.jsx` (textos con t())
- [ ] 9. Modificar `src/components/solitaire/SolitaireGame.jsx` (textos con t() + LanguageSelector en barra)
- [ ] 10. Modificar `src/index.css` (fuente CJK Noto Sans SC para zh)
- [ ] 11. Modificar `index.html` (preconnect + fuente Noto Sans SC)
- [ ] 12. Añadir test básico de i18n
- [ ] 13. Ejecutar tests y build de verificación
