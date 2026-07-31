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
