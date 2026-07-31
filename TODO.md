# TODO - Correcciones de Solitaire

## Estado: Completado ✅

### Fase 1: Análisis y Planificación
- [x] Analizar código fuente de SolitaireGame.jsx, SolitaireCard.jsx, solitaire.js
- [x] Identificar errores y comportamientos incorrectos
- [x] Crear plan de corrección detallado
- [x] Obtener aprobación del plan

### Fase 2: Corrección de errores en SolitaireGame.jsx

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

### Fase 3: Actualización de SolitaireCard.jsx
- [x] Agregar props `onMouseDown` y `onTouchStart`
- [x] Pasar estos eventos al motion.div
- [x] Eliminar dragEnabled (ya no se usa, se maneja todo en SolitaireGame)

### Fase 4: Build verification
- [x] Build passes

### Fase 5: Tests
- [ ] Pendiente: Correr tests para verificar
# Plan de Implementación

## Problemas Identificados

### 1. Conflicto Click vs Drag en Drag & Drop
- Cuando se arrastra una carta y se suelta, el navegador dispara un evento `click` después del `mouseup`
- Ese `click` ejecuta `handleTableauCardClick()` con el estado VIEJO, causando auto-moves incorrectos
- **Solución**: Agregar flag `wasDragged` para ignorar clicks post-drag

### 2. Criterio de selección cuando hay múltiples opciones
- Actualmente elige la primera opción disponible (orden del array)
- **Solución**: Mejorar criterio:
  1. Foundation (prioridad 1) - ya funciona
  2. Tableau - preferir columna con más cartas (más construida)
  3. Si hay empate, preferir columna más a la derecha

### 3. Tests faltantes
- Agregar tests para:
  - Conflicto click vs drag
  - Auto-move con múltiples opciones de destino
  - Drag & Drop con simulación de coordenadas reales
  - Reinicio del stock (waste → stock)
  - Drag a foundation desde tableau

## Archivos a Modificar

### `src/components/solitaire/SolitaireGame.jsx`
- Agregar `dragStartPos` ref para tracking de distancia
- Agregar `wasDragged` ref para prevenir click post-drag
- Modificar `startDrag()` para registrar posición inicial
- Modificar `moveDrag()` para calcular distancia y setear flag
- Modificar `endDrag()` para limpiar flag
- Modificar `handleTableauCardClick()` para ignorar clicks post-drag
- Modificar `handleWasteClick()` para ignorar clicks post-drag
- Mejorar criterio de selección en auto-move (tableau: preferir columna con más cartas)

### `__tests__/drag-drop.test.jsx`
- Agregar tests de simulación de drag con coordenadas
- Agregar test de conflicto click vs drag

### `__tests__/auto-move.test.jsx`
- Agregar tests de criterio de selección con múltiples opciones
- Agregar test de auto-move con grupo de cartas

### `__tests__/solitaire.test.jsx`
- Agregar tests de lógica faltante (límite foundation, reinicio stock)
