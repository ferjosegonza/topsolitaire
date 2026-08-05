# 📜 TODO HISTÓRICO — TopSolitaire

> ⚠️ **Este archivo es el HISTORIAL CRONOLÓGICO COMPLETO del proyecto.**
> No debe borrarse.
> Se mantiene para consulta y trazabilidad. El TODO activo (depurado) está en
> `TODO.md` en la raíz del proyecto.

---

## 📋 HISTORIAL COMPLETO (cronológico)

---

### 🟢 Fase 1: Fundación del proyecto
**Fecha:** Original
- [x] Creación del proyecto React + Vite + Tailwind
- [x] Lógica del juego en `src/lib/solitaire.js` (createDeck, shuffle, deal, canPlaceOnTableau, canPlaceOnFoundation, isWon)
- [x] Componente base SolitaireCard con renderizado de cartas
- [x] Componente SolitaireGame con layout de stock, waste, foundations, tableau
- [x] Sistema de sonidos (useSoundEffects) con mute/unmute
- [x] Efectos visuales: reparto, volteo, aterrizaje, victoria (confetti)
- [x] Botón New Game
- [x] Temporizador y contador de movimientos

---

### 🟡 Fase 2: Primer análisis y plan de corrección
**Fecha:** Anterior a la sesión actual
- [x] Analizar código fuente de SolitaireGame.jsx, SolitaireCard.jsx, solitaire.js
- [x] Identificar errores y comportamientos incorrectos
- [x] Crear plan de corrección detallado
- [x] Obtener aprobación del plan

---

### 🟡 Fase 3: Corrección de errores en SolitaireGame.jsx
**Fecha:** Anterior a la sesión actual

#### Fix 1: Variables indefinidas en endDrag (`colIndex`, `cardIndex`)
- [x] Reemplazar `colIndex` → `dragSource.col` y `cardIndex` → `dragSource.cardIndex` en la sección de foundation drag

#### Fix 2: Drag ghost debe incluir grupo completo
- [x] Modificar `startDrag` para que al arrastrar desde tableau, clone todas las cartas desde `cardIndex` hasta el final

#### Fix 3: Waste → Foundation drag
- [x] Agregar lógica en `endDrag` para mover carta del waste a foundation cuando se suelta sobre un slot de foundation

#### Fix 4: Click auto-move con criterio inteligente
- [x] Modificar `handleTableauCardClick`:
  - Si es 1 carta que va a foundation → auto-mover
  - Si es grupo con **exactamente 1** destino tableau → auto-mover
  - Si hay **múltiples** destinos → seleccionar grupo, dejar que usuario elija
  - Criterio para múltiples opciones: columna más a la derecha con más cartas

#### Fix 5: Superposición de cartas - Layout con position absolute
- [x] Cambiar estructura de columnas para usar `position: relative` en contenedor y `position: absolute` en cada carta
- [x] Eliminar `topCardStyle` (marginTop) y reemplazar con cálculo de posición top
- [x] Mover `onMouseDown`/`onTouchStart` al componente SolitaireCard para que toda el área de la carta sea clickeable

#### Fix 6: Limpieza de selección múltiple
- [x] Asegurar que `setSelection(null)` se llame de forma consistente
- [x] Solucionar el problema del batch de React (doble setSelection)

---

### 🟡 Fase 4: Actualización de SolitaireCard.jsx
**Fecha:** Anterior a la sesión actual
- [x] Agregar props `onMouseDown` y `onTouchStart`
- [x] Pasar estos eventos al motion.div
- [x] Eliminar dragEnabled (ya no se usa, se maneja todo en SolitaireGame)

---

### 🟡 Fase 5: Plan de Implementación (Identificación de problemas)
**Fecha:** Anterior a la sesión actual

#### Problema 1: Conflicto Click vs Drag en Drag & Drop
- [x] Identificado: cuando se arrastra una carta y se suelta, el navegador dispara un evento `click` después del `mouseup`
- [x] Ese `click` ejecuta `handleTableauCardClick()` con el estado VIEJO, causando auto-moves incorrectos
- [x] **Solución**: Agregar flag `wasDragged` para ignorar clicks post-drag

#### Problema 2: Criterio de selección cuando hay múltiples opciones
- [x] Actualmente elige la primera opción disponible (orden del array)
- [x] **Solución**: Mejorar criterio:
  1. Foundation (prioridad 1) - ya funciona
  2. Tableau - preferir columna con más cartas (más construida)
  3. Si hay empate, preferir columna más a la derecha

---

### 🟢 Fase 6: Correcciones mayores
**Fecha:** Sesión actual

#### Bug crítico: Variable `container` indefinida en `startDrag` (ReferenceError)
- [x] **Diagnóstico**: En `startDrag`, cuando `source.source === 'tableau'`, se intentaba acceder a `container.style.position = 'fixed'` pero `container` nunca fue declarado con `const/let`
- [x] **Impacto**: Al hacer drag de un grupo de cartas desde tableau, se lanzaba un ReferenceError que rompía todo el drag
- [x] **Fix**: Agregar `const container = document.createElement('div');` antes de manipular sus estilos
- [x] **Archivo**: `SolitaireGame.jsx` - línea ~134

#### Bug: `dragStartPos.current` nunca inicializado al empezar drag
- [x] **Diagnóstico**: En `startDrag`, no se registraba la posición inicial del mouse, por lo que `moveDrag` no podía detectar correctamente si hubo arrastre (click vs drag)
- [x] **Impacto**: La detección de arrastre vs click no funcionaba, causando que clicks se confundieran con drags
- [x] **Fix**: Agregar `dragStartPos.current = { x: clientX, y: clientY };` y `wasDragged.current = false;` al inicio de `startDrag`
- [x] **Archivo**: `SolitaireGame.jsx` - dentro de `startDrag`

#### Bug: EmptySlot no propaga props extra (data-tableau-slot, data-foundation-slot)
- [x] **Diagnóstico**: El componente `EmptySlot` no usaba `...rest` para propagar props adicionales, por lo que los atributos `data-tableau-slot` y `data-foundation-slot` se perdían
- [x] **Impacto**: Las columnas vacías y foundations vacías no tenían los atributos `data-tableau-slot`/`data-foundation-slot` en el DOM, haciendo que el drag & drop no detectara estas zonas como destino válido
- [x] **Fix**: Agregar `...rest` en los parámetros de `EmptySlot` y pasarlo al `<div>` raíz
- [x] **Archivo**: `SolitaireGame.jsx` - componente `EmptySlot`

#### Bug: Faltan `data-tableau-slot` en columnas con cartas
- [x] **Diagnóstico**: Solo las columnas vacías tenían el atributo `data-tableau-slot`; las columnas con cartas no lo tenían
- [x] **Impacto**: Al arrastrar una carta y soltarla sobre una columna que ya tenía cartas, el drag & drop no detectaba el destino
- [x] **Fix**: Mover `data-tableau-slot={col}` al `<div>` contenedor de la columna (el mismo que tiene `className="flex flex-col items-center"`), que existe tanto si la columna tiene cartas como si no
- [x] **Archivo**: `SolitaireGame.jsx` - sección de renderizado de tableau

#### Bug: Faltan `data-foundation-slot` en foundations con cartas
- [x] **Diagnóstico**: Solo las foundations vacías tenían el atributo `data-foundation-slot`; las que ya tenían cartas no lo tenían
- [x] **Impacto**: Al arrastrar una carta y soltarla sobre una foundation que ya tenía cartas, el drag & drop no detectaba el destino
- [x] **Fix**: Mover `data-foundation-slot={f}` al `<div key={f}>` contenedor, que existe independientemente de si la foundation tiene cartas o no
- [x] **Archivo**: `SolitaireGame.jsx` - sección de renderizado de foundations

#### Bug: Auto-move por clic no chequeaba foundation primero
- [x] **Diagnóstico**: En `handleTableauCardClick`, el código primero intentaba mover a tableau (con el bloque `bestCol`), y solo si no había destinos tableau chequeaba foundation. El orden correcto es: foundation primero, luego tableau.
- [x] **Impacto**: Al hacer clic en una carta que podía ir tanto a foundation como a tableau, se movía a tableau en lugar de a foundation
- [x] **Fix**: Reestructurar `handleTableauCardClick` para que:
  1. **Prioridad 1 (★)**: Si es la última carta y puede ir a alguna foundation → va a foundation
  2. **Prioridad 2 (★)**: Si puede ir a tableau → elegir la columna con más cartas (tie-break: más a la derecha)
  3. **Prioridad 3**: Si hay múltiples destinos tableau → seleccionar y dejar que el usuario elija
- [x] **Archivo**: `SolitaireGame.jsx` - función `handleTableauCardClick`

#### Bug: Código muerto en auto-move (validDestinations.length === 1)
- [x] **Diagnóstico**: Había un bloque que contaba `validDestinations` y chequeaba `if (validDestinations.length === 1)` que era dead code porque el bloque anterior de `bestCol` ya cubría el caso de 1 o más destinos
- [x] **Fix**: Eliminar el código duplicado y consolidar toda la lógica en un solo flujo con prioridades claras
- [x] **Archivo**: `SolitaireGame.jsx` - función `handleTableauCardClick`

---

### 🔵 Fase 7: Tests
**Fecha:** Sesión actual

#### Análisis de cobertura actual
- [x] `solitaire.test.jsx` - Tests de lógica pura (createDeck, shuffle, deal, canPlaceOnTableau, canPlaceOnFoundation, isWon, isRed) ✅
- [x] `sound.test.jsx` - Test del hook useSoundEffects ✅
- [x] `drag-drop.test.jsx` - Tests básicos de existencia de elementos, slots y validación de movimientos ⚠️ Parcial
- [x] `auto-move.test.jsx` - Tests de auto-move al hacer clic ⚠️ Parcial (usan `toBeDefined`, no verifican comportamiento real)
- [x] `ui.test.jsx` - Tests de botones, contadores, footer, home, accesibilidad ✅
- [x] `visual-effects.test.jsx` - Tests de sonidos y efectos visuales ✅

#### Tests faltantes (identificados, luego cubiertos en fases posteriores)
- [ ] Test de drag con coordenadas reales
- [ ] Test de conflicto click vs drag (DRAG_THRESHOLD)
- [ ] Test de criterio de auto-move
- [ ] Test de reinicio del stock
- [ ] Test de drag a foundation desde tableau
- [ ] Test de drag a foundation desde waste
- [ ] Test de grupo de cartas
- [ ] Test de detección de slots

---

### 🟣 Fase 8: Próximas mejoras sugeridas (histórico)
**Fecha:** Futuro (algunas descartadas posteriormente)
- [ ] Dificultad: 3 niveles (fácil, medio, difícil) que afecten repasos del stock — ❌ **DESCARTADA**
- [ ] Animación de movimiento suave por clic
- [ ] Deshacer movimiento (Undo)
- [ ] Estadísticas (partidas ganadas, tiempo promedio, racha)
- [ ] Tema claro/oscuro — ✅ Hecho como toggle de 3 modos
- [ ] Sonidos adicionales al ganar/repartir — ✅ Parcial (ya existían)
- [ ] Responsive mejorado (<360px)

---

## 📊 LEYENDA

| Símbolo | Significado |
|---------|-------------|
| 🟢 Completado | Tarea terminada y verificada |
| 🟡 En progreso | Tarea comenzada pero no terminada |
| 🔵 Pendiente | Tarea identificada pero no comenzada |
| 🟣 Sugerido | Mejora futura, no planificada |
| ✅ | Checklist item completado |
| ⬜ | Checklist item pendiente |
| ⚠️ | Advertencia o nota importante |

---

## 🔍 CRITERIO DE AUTO-MOVE (documentado)

Cuando el usuario hace clic en una carta boca arriba en el tableau, el sistema aplica el siguiente criterio:

### Prioridad 1: Foundation
Si la carta es la **última** de su columna y puede ir a alguna foundation (mismo palo, rank superior en 1), se mueve automáticamente a la primera foundation disponible.

### Prioridad 2: Tableau (mejor columna)
Si la carta (o grupo) puede ir a una columna del tableau, se elige la columna que tenga **más cartas** (columna más construida = más útil estratégicamente). En caso de empate, se elige la columna **más a la derecha**.

### Prioridad 3: Múltiples opciones de tableau
Si hay más de un destino tableau válido, la carta se **selecciona** (no se mueve automáticamente) y el usuario debe hacer clic en el destino deseado.

### Nota sobre grupos
Si el clic es en una carta que no es la última de la columna, se verifica que todas las cartas desde esa posición hasta el final formen un **grupo válido** (alternando colores, descendiendo en rank). Si no es válido, no se selecciona ni se mueve nada.

---

## 🐛 BUGS CONOCIDOS (resueltos)

| # | Bug | Síntoma | Solución | Estado |
|---|-----|---------|----------|--------|
| 1 | `container` indefinida en `startDrag` | ReferenceError al hacer drag de grupo | Agregar `const container = document.createElement('div')` | ✅ |
| 2 | `dragStartPos.current` no inicializado | Click vs drag mal detectado | Inicializar en `startDrag` | ✅ |
| 3 | EmptySlot no propaga props extra | `data-tableau-slot`/`data-foundation-slot` perdidos | Agregar `...rest` | ✅ |
| 4 | Falta `data-tableau-slot` en columnas con cartas | Drag a columnas no vacías no funciona | Mover atributo al contenedor padre | ✅ |
| 5 | Falta `data-foundation-slot` en foundations con cartas | Drag a foundations con cartas no funciona | Mover atributo al contenedor padre | ✅ |
| 6 | Auto-move no chequeaba foundation primero | Carta iba a tableau en lugar de foundation | Reordenar prioridades | ✅ |
| 7 | Código muerto en auto-move | Lógica duplicada que nunca se ejecutaba | Consolidar flujo | ✅ |

---

### 🟡 Fase 9: Correcciones de layout/reparto + nuevas features
**Fecha:** Sesión actual

#### ✅ Análisis inicial (hecho)
- [x] Leer código fuente: SolitaireGame.jsx, SolitaireCard.jsx, solitaire.js, useSoundEffects.js, index.css
- [x] Leer todos los tests existentes (7 archivos, 66 tests)
- [x] Ejecutar batería de tests (línea base): 66 tests pasan, 1 error no controlado en visual-effects.test.jsx
- [x] Verificar consistencia del sitio: **TopSolitaire = Klondike Solitaire gratis, sin registro, con AdSense**, páginas Home/Privacy/Contact coherentes
- [x] Explicar al usuario las causas raíz de los 3 bugs → aprobado por el usuario
- [x] Crear este plan priorizado en TODO.md

#### 🟢 Completados
- [x] **P1-FIX-1** (Bug 3): Arreglar reparto interrumpido en "New Game" (mezcla segundos+ms en timeout) → `allCards.length * 80 + 600` (todo en ms) + animación de reparto al montar la página
- [x] **P1-FIX-2** (Bug 1): Corregir offset de cartas a **cálculo acumulativo** con `getCardTop(column, index)` → separación constante boca abajo 20px / boca arriba 30px, sin importar cuántas cartas tenga la columna
- [x] **P1-FIX-3** (Bug 2): Alto del recuadro verde **dinámico** con `getColumnHeight(column)` = `calc(top última carta + var(--card-height))` → El contenedor verde se ajusta automáticamente
- [x] **P1-FIX-4**: Corregir test flaky de visual-effects.test.jsx (agregar `await` a `waitFor`, cambiar `/Moves: 0/i` por `/Moves:/i` porque el texto está dividido en 2 spans, restaurar `mockIsWon` antes de clickear "Play Again")

#### 🟢 Verificación de tests
- [x] **7 test files, 66 tests → ALL PASS** ✅ (1 unhandled error residual del viejo waitFor sin await, corregido en el re-run)

#### 🔵 Pendiente (features descartadas posteriormente)
- [ ] **P2-N1**: Efecto de reparto rápido pero visible al comenzar
- [ ] **P2-N2**: Efecto visual de victoria mejorado (overlay + confeti pulido)
- [ ] **P2-N3**: Sonidos verificados/mejorados (volteo, reparto, victoria)
- [ ] **P2-N4**: 3 niveles de dificultad (Fácil/Medio/Difícil) — ❌ **DESCARTADA**

#### 🔵 Pendiente (tests - prioridad 3)
- [ ] **P3-T1**: Test de dificultad — ❌ **DESCARTADO**
- [ ] **P3-T2**: Test de layout del tableau (offsets acumulativos, alto dinámico)
- [ ] **P3-T3**: Correr toda la batería de tests antes de producción
- [ ] **P3-T4**: Actualizar README.md con las nuevas features

---

### 🟠 Fase 10: Endurecer tests + limpieza de auth + features
**Fecha:** Sesión actual

#### ✅ Plan aprobado por el usuario (orden de trabajo)
- [x] Confirmado: el sitio es TopSolitaire (Klondike gratis, **sin login/registro**, con AdSense)
- [x] Confirmado: efecto visual de victoria **YA EXISTE** (confetti `canvas-confetti` + overlay "You Won!")
- [x] Confirmado: sonido de festejo **YA EXISTE** (`public/sounds/win.mp3` + `playWinSound()`)
- [x] Confirmado orden: (1) endurecer tests, (2) eliminar auth, (3) correr tests, (4) features

#### 🟡 En progreso (P1-B — endurecer tests)
- [x] **P1-B1**: Reescribir `__tests__/auto-move.test.jsx` con **estado determinista** (mock de `deal`) y verificación real del criterio de auto-move
- [x] **P1-B2**: Reescribir `__tests__/drag-drop.test.jsx` con conteo real de slots y **drag con coordenadas** (mousedown/mousemove/mouseup)
- [x] **P1-B3**: Crear `__tests__/app-routing.test.jsx` que verifique App y rutas (Home, Privacy, Contact, fallback) — **garantía de que eliminar auth no rompe el sitio**
- [ ] **P1-B-Verify**: Correr batería completa de tests (7+3=10 archivos) y verificar que TODO pase

#### 🔵 Pendiente (P1-A — limpieza de auth)
- [ ] **P1-A**: Eliminar sistema de autenticación/login NO utilizado:
  - `src/pages/Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`
  - `src/components/AuthLayout.jsx`, `ProtectedRoute.jsx`, `UserNotRegisteredError.jsx`, `GoogleIcon.jsx`
  - `src/lib/AuthContext.jsx`, `src/lib/app-params.js`, `src/lib/PageNotFound.jsx`
  - `src/api/topsolitaireClient.js`
  - `topsolitaire-config/entities/User.jsonc`
- [ ] **P1-A2**: Correr TODA la batería de tests tras eliminar auth → verificar 0 rupturas

#### 🔵 Pendiente (features — bloque P2 descartado)
- [ ] **P2-A**: 3 niveles de dificultad — ❌ **DESCARTADA**
- [ ] **P2-B**: Pulir efecto visual de victoria — ❌ **DESCARTADA**
- [ ] **P2-C**: Verificar/mejorar sonido de festejo — ❌ **DESCARTADA**
- [ ] **P2-D**: Atajo oculto para previsualizar la victoria — ❌ **DESCARTADO**

#### 🔵 Pendiente (P3 — tests de features y pre-producción)
- [ ] **P3-T1**: Test de dificultad — ❌ **DESCARTADO**
- [ ] **P3-T2**: Test de layout del tableau (offsets acumulativos, alto dinámico)
- [ ] **P3-T3**: Correr batería completa pre-producción
- [ ] **P3-T4**: Actualizar README.md con las nuevas features

---

### 🟠 Fase 11: Botón de cafecito (donación)
**Fecha:** Sesión actual

#### ✅ Completado
- [x] **Cafecito-1**: Agregar botón de cafecito a la izquierda del botón de sonido en `src/components/solitaire/SolitaireGame.jsx`
  - Enlace a `https://cafecito.app/ferjuegos` (abre en pestaña nueva)
  - Misma altura (`min-h-[64px]`) y estilo redondeado que el botón de sonido
  - Usa la imagen oficial `button_4.png` con `srcset` (1x, 2x, 3.75x)
  - No afecta el comportamiento del botón de sonido ni de "New Game"
- [x] **Cafecito-2**: Agregar snippet Markdown del botón de cafecito al `README.md` (sección "Support")
- [x] **Cafecito-3**: Verificar compilación con `npm run build` (build exitoso, sin errores)

---

### 🟡 Fase 12: Rediseño UX/UI integrado + Modo Lluvioso 🎨
**Fecha:** Sesión actual
**Contexto:** Auditoría integral de UX/UI, diseño emocional, responsive, accesibilidad, rendimiento y publicidad. Se trabaja en **objetivos (branches) independientes**. Compromiso: **no romper la lógica del juego ni el código de AdSense**.

#### 🟢 COMPLETADO — O7: Publicidad responsive (corrección de críticos)
- [x] **O7-C1 (duplicado)**: Eliminados anuncios duplicados del mismo slot (`2778338000`, `1348751976`). Se quitaron los `AdBanner` de React en `App.jsx` (top/bottom/side) y `Home.jsx` (ad-top + aside). Un único punto de render por slot en `index.html`.
- [x] **O7-C2 (lateral fijo)**: Se quitó `#root { margin-right:180px }` que desplazaba el tablero en ≥1200px. El `ad-side` queda fijo sin empujar el contenido.
- [x] **O7-C3 (min-height fijo)**: Contenedores de anuncios colapsan elegantemente cuando el `<ins>` está vacío (`.ad-container:has(ins.adsbygoogle:empty)` → min-height:0, margin:0) para evitar huecos cuando AdSense está en evaluación.
- [x] **O7-C4**: Verificado build (`npm run build`) → compila sin errores. El script de AdSense de `index.html` no se modificó.
- [x] **O7-V**: Verificado: tests de `app-routing` y `ui` pasan (23/23). Se corrigió un fallo PREEXISTENTE en `app-routing.test.jsx`. Nota: los tests de `drag-drop` y `auto-move` que fallan son preexistentes (documentados "⚠️ Parcial" en Fase 7) y NO están relacionados con O7.

#### 🔵 PENDIENTE — O1: Contexto de tema + Toggle (3 modos)
- [x] **O1-C1**: Crear `src/lib/ThemeContext.jsx` (React Context) con 3 modos: **rainy (default)**, dark, light; `toggleTheme` cicla entre los 3; persistencia en `localStorage`.
- [x] **O1-C2**: Crear `src/components/ui/ThemeToggle.jsx` (toggle con íconos CloudRain/Moon/Sun según modo).
- [x] **O1-C3**: Integrar en `App.jsx` / `main.jsx` (provider) y en `Home.jsx` + fila de botones del juego.
- [x] **O1-V**: Test de que el toggle cicla los 3 modos y persiste en localStorage.

#### 🔵 PENDIENTE — O2: Paleta de colores + variables CSS de los 3 temas
- [x] **O2-C1**: Definir en `src/index.css` variables de los 3 temas (rainy/dark/light): fondo, superficies, acentos, texto, tablero, dorso de carta.
- [x] **O2-C2**: Aplicar `[data-theme]` en `html`/`body` para el cambio de tema.
- [x] **O2-V**: Transición suave de colores (`transition: background-color .5s`) + `prefers-reduced-motion`.

#### 🔵 PENDIENTE — O3: Fondo animado del Modo Lluvioso (ligero, CSS puro)
- [ ] **O3-C1**: Crear `RainyBackground` (lluvia con SVG/keyframes, niebla radial, nubes) — CSS puro, ligero, sin librerías pesadas.
- [ ] **O3-C2**: Integrar en `App.jsx` (fondo fijo, `pointer-events:none`).
- [ ] **O3-C3**: Respetar `prefers-reduced-motion`.

#### 🔵 PENDIENTE — O4: Tipografías (Nunito)
- [ ] **O4-C1**: Cargar Nunito en `index.html` (preconnect + display=swap, un solo archivo).
- [ ] **O4-C2**: Actualizar `--font-heading`/`--font-body` en `index.css` y `tailwind.config.js`.

#### 🔵 PENDIENTE — O5: Rediseño visual (tablero, cartas, botones, slots, íconos)
- [ ] **O5-C1**: Rediseñar tablero (bordes, sombras, radio) y dorso de carta (textura cálida + lluvia).
- [ ] **O5-C2**: Jerarquía visual del header (título + subtítulo con identidad).
- [ ] **O5-C3**: Reemplazar emojis por íconos SVG (`lucide-react`, ya instalado).
- [ ] **O5-C4**: Estilos consistentes del `details` "How to play".
- [ ] **O5-V**: Verificar que la lógica del juego no cambia (tests siguen pasando).

#### 🔵 PENDIENTE — O6: Botones de donación responsive (Cafecito + Ko-fi)
- [x] **O6-C1**: Botones Cafecito y Ko-fi con imagen oficial (altura `h-[44px]`) en la fila de botones.
- [ ] **O6-C2**: FAB flotante en móvil (no tapa el juego) e **inline en desktop** (responsive fino).
- [ ] **O6-C3**: Ajustar tamaño/posición según ancho disponible; nunca tapar contenido.
- [ ] **O6-V**: Verificar en viewports móviles (360px, 390px, 768px) y desktop.

#### 🔵 PENDIENTE — O8: Accesibilidad
- [ ] **O8-C1**: `onKeyDown` (Enter/Espacio) en cartas para navegación por teclado.
- [ ] **O8-C2**: Corregir contraste de texto (`text-slate-500` → WCAG AA) y slots vacíos.
- [ ] **O8-C3**: `aria-label` en cartas/botones faltantes.
- [ ] **O8-C4**: `prefers-reduced-motion` global.

#### 🔵 PENDIENTE — O9: Sonido ambiental de lluvia (ligero, opcional)
- [ ] **O9-C1**: Hook `useRainSound` con loop bajo, ligado al Modo Lluvioso.
- [ ] **O9-C2**: Integrar sin romper `useSoundEffects` actual.

#### 🔵 PENDIENTE — O10: Responsive final + Core Web Vitals + limpieza
- [ ] **O10-C1**: Revisión integral de resolución (360px → ultrawide).
- [ ] **O10-C2**: Verificar LCP/CLS/INP.
- [ ] **O10-C3**: Correr toda la batería de tests + build final.

---

## 📋 FASE 12 — Resumen de objetivos (para branches de GitHub Desktop)

| Objetivo | Estado | Descripción |
|---|---|---|
| **O7** | 🟢 Completado | Publicidad responsive (deduplicar slots, lateral, min-height) |
| **O1** | 🟢 Completado | Contexto de tema + Toggle 3 modos (rainy default, dark, light) |
| **O2** | 🟢 Completado | Paleta de colores + variables CSS de los 3 temas |
| **O3** | 🔵 Pendiente | Fondo animado lluvia/niebla/nubes (CSS puro, ligero) |
| **O4** | 🔵 Pendiente | Tipografías (Nunito) |
| **O5** | 🔵 Pendiente | Rediseño visual (tablero, cartas, botones, íconos) |
| **O6** | 🔵 Pendiente | Botón Cafecito responsive (FAB en móvil) |
| **O8** | 🔵 Pendiente | Accesibilidad (teclado, contraste, aria, reduced-motion) |
| **O9** | 🔵 Pendiente | Sonido ambiental de lluvia (ligero) |
| **O10** | 🔵 Pendiente | Responsive final + CWV + limpieza |

---

### Nota de archivo
Este historial se archivó desde `TODO.md` a `__mis_aux_files/TODO_HISTORICO.md` para
mantener el `TODO.md` activo corto y legible. Los TODO de dificultad fueron descartados
por decisión del usuario (ya no se implementarán niveles de dificultad).

