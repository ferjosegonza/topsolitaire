# ✅ O7 — Publicidad responsive (corrección de críticos)

> Rama de trabajo: `feature/O7-publicidad-responsive`
> Enfoque aplicado: **mantener los anuncios estáticos de `index.html`** (que Google ya está evaluando)
> y **eliminar los `AdBanner` duplicados de React** en `App.jsx` y `Home.jsx`.

## Checklist

- [x] **O7-C1**: Eliminados anuncios duplicados del mismo slot (`2778338000`, `1348751976`) en `App.jsx` y `Home.jsx`.
  - `src/App.jsx`: se quitaron los 3 `AdBanner` (top, bottom, side).
  - `src/pages/Home.jsx`: se quitaron el `AdBanner` `ad-top` y el `aside` lateral duplicado.
- [x] **O7-C2**: Rediseñado `ad-side` → se quitó `#root { margin-right:180px }` que desplazaba el tablero en ≥1200px. El lateral queda fijo sin empujar el contenido.
- [x] **O7-C3**: Contenedores de anuncios ahora **colapsan elegantemente** cuando el `<ins>` está vacío (AdSense en evaluación) vía `.ad-container:has(ins.adsbygoogle:empty)` en `index.html`.
- [x] **O7-C4**: Verificado build (`npm run build`) → compila sin errores (2020 modules, gzip CSS 12.45 kB, JS 126.95 kB).
- [x] **O7-V**: Verificado que los tests de `app-routing` y `ui` pasan (23/23). Corregí además un fallo preexistente del test `app-routing` (buscaba `/no registration or login/` pero el texto real es "without registration or login").

## Archivos modificados en esta rama
- `src/App.jsx` (eliminados AdBanner)
- `src/pages/Home.jsx` (eliminados AdBanner)
- `src/index.css` (eliminadas reglas de anuncios duplicadas)
- `index.html` (quitado `#root` margin-right, contenedores colapsables en `:has`)
- `__tests__/app-routing.test.jsx` (corregido matcher del texto de Privacy)
- `TODO.md` (Fase 12)

## Notas
- El anuncio lateral sigue en `index.html` (estático), solo se eliminó el duplicado que React renderizaba.
- Los contenedores colapsan cuando AdSense aún no llena el espacio (evita huecos y CLS).
- **No se tocó `SolitaireGame.jsx`, `SolitaireCard.jsx` ni `solitaire.js`** → la lógica del juego queda intacta.
- Los tests de `drag-drop` y `auto-move` que fallan son **preexistentes** (documentados como "⚠️ Parcial" en Fase 7 del TODO) y NO están relacionados con O7.
