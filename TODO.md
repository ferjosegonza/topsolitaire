# TODO — TopSolitaire

> 📜 **Historial cronológico completo** → `__mis_aux_files/TODO_HISTORICO(...).md`

> 🎯 **Objetivo general**: TopSolitaire es un juego de Solitaire online enfocado en aumentar discoverability, tráfico orgánico, experiencia internacional y retención de usuarios.

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

### Soporte Multilingüe (i18n) — ✅ COMPLETADO EN SU MAYORÍA
- Dependencias `i18next` y `react-i18next` ya están instaladas.
- `src/i18n.js` existe con configuración, 7 idiomas soportados + `zh-TW`, detección de `navigator.language`, persistencia en `localStorage` y fallback a `en`.
- `src/components/ui/LanguageSelector.jsx` implementa selector de idioma con bandera + nombre en desktop y solo globo en móvil.
- `src/lib/useDocumentMeta.js` actualiza dinámicamente `<title>` y metas `description`, `og:` y `twitter:` según el idioma.
- `src/main.jsx` envuelve `App` con `I18nextProvider`.
- `src/App.jsx` usa `useDocumentMeta()` para sincronizar metas al cambiar idioma.
- `src/pages/Home.jsx`, `src/components/Footer.jsx` y `src/components/solitaire/SolitaireGame.jsx` usan `t()` para traducciones.
- `src/components/solitaire/SolitaireGame.jsx` incluye el `LanguageSelector` en la barra de juego.
- `__tests__/i18n.test.jsx` cubre claves de traducción, cambios de idioma, persistencia y el selector.

### Recursos de idioma CJK — ✅ COMPLETADO
- `index.html` ahora incluye la importación de `Noto Sans SC` desde Google Fonts.
- `src/index.css` aplica `Noto Sans SC` mediante variables CSS cuando `html[data-lang="zh"]` o `html[data-lang="zh-TW"]` están activos.

### P1: Limpieza de código — Eliminar archivos auth no utilizados ✅ COMPLETADO
- [x] Eliminar páginas: `Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`
- [x] Eliminar componentes: `AuthLayout.jsx`, `ProtectedRoute.jsx`, `UserNotRegisteredError.jsx`, `GoogleIcon.jsx`
- [x] Eliminar lib: `AuthContext.jsx`, `app-params.js`, `PageNotFound.jsx`
- [x] Eliminar api: `topsolitaireClient.js`
- [x] Eliminar config: `User.jsonc`
- [x] Verificar: `App.jsx` y `main.jsx` sin dependencias a archivos removidos

**Rama git**: `cleanup/remove-auth-files` | **Commit**: `f5dd7b5`

### P2: Migración de Router — HashRouter → URLs reales ✅ COMPLETADO
**Objetivo**: Cambiar de `https://topsolitaire.online/#/privacy-policy` a `https://topsolitaire.online/privacy-policy`

- [x] Auditar `App.jsx`: verificar que utiliza `HashRouter`
- [x] Reemplazar `HashRouter` por `BrowserRouter`
- [x] Verificar impacto en `useDocumentMeta()` y actualización de metas
- [x] Revisar canonical URLs
- [x] Ajustar `base` en `vite.config.js` si es necesario
- [x] Verificar que no se rompan rutas existentes
- [x] Verificar: routing, canonical, hreflang, sitemap, URLs, metadata.
- [x] Tests de routing actualizados
- [x] Configuración SPA rewrites (`vercel.json`)
- [x] Verificar en build: `npm run build`

**Rama git**: `migration/hashrouter-to-browserrouter`

### P3: SEO Técnico — Arquitectura de URLs y verificaciones ✅ COMPLETADO
- [x] Auditar `sitemap.xml`: verificar que existe, es válido y contiene URLs correctas
- [x] Auditar `robots.txt`: verificar que apunta al sitemap y directivas correctas
- [x] Auditar canonical URLs: verificar que están presentes y son correctas en todas las páginas
- [x] Revisar soft 404: evitar que rutas inexistentes rendericen Home (`<Route path="*" element={<Home />} />`)
- [x] Implementar verdadera página 404 con respuesta HTTP 404 / componente NotFound con noindex
- [x] Auditar redirects: verificar no hay cadenas de redirects
- [x] Revisar trailing slash: verificar consistencia
- [x] Auditar URLs duplicadas: `www` vs no-www, protocolo HTTP vs HTTPS, etc.
- [x] Verificar enlaces internos: navío correcto entre páginas

**Rama git**: `seo/technical-url-architecture-p3`

### P4: SEO Multiidioma — URLs diferenciadas por idioma ✅ COMPLETADO
**Objetivo**: Crear URLs separadas como `/de/`, `/pl/`, `/fr/`, `/es/`, etc. en lugar de usar solo `navigator.language` en la misma URL.

- [x] Definir arquitectura de URLs por idioma: `/de/`, `/pl/`, `/fr/`, `/es/`, `/it/`, `/en/`, `/zh/`, `/zh-tw/`
- [x] Investigar cómo implementar rutas dinámicas con prefijo de idioma sin migrar a Next.js
- [x] Modificar router para aceptar rutas con prefijo de idioma: `/:lang` y subpáginas con `LocaleLayout`
- [x] Actualizar `useDocumentMeta()` para generar metas únicas por idioma
- [x] Configurar hreflang correctamente: reciprocidad, URLs válidas, x-default
- [x] Verificar que cada URL localizada tenga:
  - [x] Title propio
  - [x] Meta description propia
  - [x] H1 en idioma correcto
  - [x] Contenido completamente localizado
  - [x] Canonical correcto
  - [x] hreflang al sitio completo
  - [x] Open Graph localizado
  - [x] Atributo `lang` y `data-lang` en `<html>` correcto
  - [x] Enlaces internos apunten a versión del mismo idioma
- [x] Actualizar `sitemap.xml` para incluir todas las variantes de idioma y anotaciones `xhtml:link`
- [x] Actualizar `robots.txt`

**Rama git**: `seo/multilingual-urls-hreflang-p4`

### P5: Meta Tags and Document Head - Audit and improvement ✅ COMPLETED
- [x] Dynamic title and meta description verified per route and language.
- [x] Canonical, indexability robots tag, hreflang, Open Graph, and Twitter Card verified.
- [x] HTML language attributes, favicon, manifest, theme color, and viewport verified.
- [x] JavaScript update reviewed: the static SPA shell keeps English fallback metadata; React updates localized routes after load. Add prerendering only if localized social previews become a priority.

**Git branch**: `seo/meta-tags-head-audit-p5`

### P6: H1 y estructura de headings — Auditoría ✅ COMPLETADO
- [x] Inspeccionar DOM real en Home: existe exactamente un H1 en las rutas principal y localizada.
- [x] Verificar que el H1 es semánticamente correcto y relacionado con contenido: conserva la intención SEO de jugar Solitaire online gratis en inglés y español.
- [x] Revisar estructura H2/H3 en todas las páginas: Privacy Policy usa H2 solo para sus siete subsecciones; Home y Contact no requieren subsecciones; 404 no salta de H1 a H2.
- [x] NO duplicar H1 innecesariamente.
- [x] Corregir 404: “Page Not Found” es el H1 y “404” queda como texto decorativo.
- [x] Tests de estructura de headings actualizados para Home, rutas legales, 404 y Home localizada.

**Rama git**: `seo/heading-structure-audit-p6`

---

## 🔵 PENDIENTE (Fase SEO, Arquitectura & Internacionalización)

### P7: Text-to-HTML Ratio — Investigación
- [ ] Analizar si realmente es problema SEO en este proyecto (es una SPA + juego, no solo blog)
- [ ] Revisar cantidad de contenido semántico vs JavaScript/CSS
- [ ] NO aumentar artificialmente texto si no es necesario
- [ ] Si se requiere más contenido, hacerlo de forma natural

### P8: Homepage SEO — Auditoría y mejora
- [ ] Auditar `Home.jsx` completamente
- [ ] Verificar H1 claro y único
- [ ] Verificar propuesta de valor visible
- [ ] Verificar juego visible inmediatamente sin scroll excesivo
- [ ] Agregar contenido útil: How to Play, Solitaire Rules, información relevante
- [ ] Agregar FAQ si tiene sentido
- [ ] Verificar enlaces internos a páginas de contenido
- [ ] Optimizar para usuarios y buscadores (NO keyword stuffing)

### P9: Páginas de contenido SEO — Crear nuevas páginas
**Objetivo**: Crear páginas temáticas alrededor de Solitaire con intención de búsqueda clara.

**Candidatas iniciales (prioridad):**
- [ ] `/how-to-play-solitaire` — How to Play Solitaire (guía completa)
- [ ] `/solitaire-rules` — Solitaire Rules (reglas oficiales de Klondike)
- [ ] `/solitaire-strategy` — Solitaire Strategy (estrategias y tips)
- [ ] `/solitaire-scoring` — Solitaire Scoring (sistema de puntuación)

**Para cada página:**
- [ ] Title único y atractivo
- [ ] Meta description única
- [ ] Canonical correcto
- [ ] H1 único
- [ ] Estructura H2/H3 clara
- [ ] Contenido útil y bien escrito (NO relleno)
- [ ] Enlaces internos a otras páginas relevantes
- [ ] Enlace hacia el juego
- [ ] Open Graph
- [ ] Idioma correcto
- [ ] Schema si es apropiado (ej: HowTo)
- [ ] Traductor a todos los idiomas soportados (si existe contenido real en ese idioma)

**Consideraciones de contenido:**
- [ ] NO crear 100 artículos automáticos
- [ ] Cada página debe tener razón real para existir
- [ ] Contenido compatible con el juego real (no mentir sobre funcionalidades)
- [ ] Calidad sobre cantidad
- [ ] Enfoque temático: Solitaire/Klondike (no expandir a Sudoku, Chess, etc.)

### P10: Marca y consistencia — Auditoría
- [ ] Verificar consistencia de "Top Solitaire" en: title, og:site_name, schema, navbar, footer, manifest, favicon, textos
- [ ] Estandarizar variaciones: "Top Solitaire", "Play Solitaire Online", "top solitaire", "topsolitaire.online"
- [ ] Revisar textos de páginas legales (Privacy, Contact, etc.)

### P11: Revisión de producción — Auditoría y limpieza
- [ ] Buscar y eliminar TODO el contenido que NO debería estar en producción:
  - [ ] Placeholder text
  - [ ] Comentarios de debug
  - [ ] Código muerto
  - [ ] Archivos temporales
  - [ ] Variables de desarrollo
  - [ ] Console.log innecesarios
  - [ ] Credenciales o tokens (verificar .env)
  - [ ] URLs de localhost o desarrollo
  - [ ] Archivos de testing intermedio
  - [ ] Rutas de API de desarrollo
- [ ] Revisar archivos `__mis_aux_files/` — evaluar si deben seguir en producción
- [ ] Verificar que `package.json` contiene solo dependencias necesarias

### P12: UX y visual — Mejoras finales
- [ ] **Rediseño visual (O5)**: Pulido del tablero, jerarquía del header con ícono SVG
- [ ] **Accesibilidad (O8)**:
  - [ ] Navegación por teclado: `onKeyDown` (Enter/Espacio) en cartas
  - [ ] Contraste de texto WCAG AA
  - [ ] `aria-label` en cartas/botones
  - [ ] `prefers-reduced-motion` global
- [ ] **Sonido ambiental (O9)**: Hook `useRainSound` con loop en modo rainy
- [ ] **Undo jugadas**: Evaluar si agregar botón "Undo" en el tablero

### P13: Responsive y Core Web Vitals — Auditoría integral
- [ ] **O10-C1**: Revisar integral todas las resoluciones (360px → ultrawide 1920px+)
  - [ ] Footer y páginas legales en 360px–390px
  - [ ] Ultrawide: evaluar si `max-w-[1100px]` es apropiado
  - [ ] Anuncio lateral fijo (160px) en 1200–1400px
  - [ ] Fila de botones en 360px
- [ ] **O10-C2**: Verificar Core Web Vitals
  - [ ] LCP (Largest Contentful Paint)
  - [ ] CLS (Cumulative Layout Shift) — evitar animaciones costosas
  - [ ] INP (Interaction to Next Paint)
- [ ] **O10-C3**: Batería completa de tests
  - [ ] `npm test`
  - [ ] Verificar cobertura
- [ ] **O10-C4**: Build final y verificación
  - [ ] `npm run build`
  - [ ] Verificar salida sin errores
  - [ ] Verificar build size

### 📱 Auditoría Responsive — Estado por elemento

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
| Footer y páginas (Privacy/Contact) | ⚠️ | No verificados en detalle a 360px; revisar como parte de P13 |
| Ultrawide (>1920px) | ⚠️ | El tablero queda centrado con `max-w-[1100px]`; validar como parte de P13 |



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

---

## 📌 NOTAS IMPORTANTES

### Consideraciones para implementación de SEO
- **NO migrar a Next.js** salvo que sea absolutamente necesario. Evaluar SSG/prerendering con Vite si es viable.
- **Verificar antes de asumir**: No suponer que algo está mal; inspeccionar el código real primero.
- **Mantener funcionalidad existente**: No romper el juego al hacer cambios arquitectónicos.
- **Evitar contenido artificial**: No aumentar artificialmente texto o crear páginas innecesarias solo para métricas.
- **Priorizar calidad**: Enfocarse en contenido útil de verdad, especialmente en idiomas alemán, polaco y francés.

### Dependencias de tareas
- P2 (Migración de Router) puede afectar P3, P4 y P5 (URLs, canonical, hreflang)
- P4 (URLs multiidioma) requiere completar P2
- P8 (Homepage) y P9 (Páginas de contenido) son independientes pero deben considerar P4
- P13 (Responsive + Core Web Vitals) debería ser la fase final, después de completar el resto
