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
