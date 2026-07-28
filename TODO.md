# TODO - Mejoras del Solitario

## ✅ COMPLETADO
- [x] Sistema de sonidos (useSound)
  - Hook `useSoundEffects.js` creado
  - Sonidos: card-flip, card-place, deal, win, click
  - Botón Mute/Unmute integrado en el juego
  - Sonidos reproducidos en acciones: repartir, voltear, colocar, ganar
- [x] Botón Mute/Unmute
  - Implementado en el header del juego
  - Iconos 🔊/🔇 con toggle funcional
- [x] Efecto de voltear carta + sonido
  - Sonido `card-flip.mp3` al sacar carta del stock
  - Sonido `card-flip.mp3` al reiniciar el stock
- [x] Efecto de aterrizaje + sonido
  - Sonido `card-place.mp3` al mover a tableau
  - Sonido `card-place.mp3` al mover a foundation
- [x] Efecto de reparto al inicio
  - Sonido `deal.mp3` al hacer clic en "New Game"
- [x] Efecto de victoria
  - Sonido `win.mp3` al completar el juego
  - Detectado automáticamente por `isWon(game)`

## 🔄 EN PROGRESO
- [ ] Sistema de efectos visuales
  - Animaciones con framer-motion (instalado)
  - Efecto de voltear carta visual
  - Efecto de aterrizaje visual
  - Efecto de reparto visual
  - Efecto de victoria visual (confeti, etc.)
- [ ] Drag & Drop de cartas
  - Arrastrar cartas con el mouse
  - Feedback visual durante el arrastre
  - Soltar en destino válido

## 📝 PENDIENTE
- [ ] Auto-move al hacer clic (doble clic ya funciona)
- [ ] 3 niveles de dificultad
  - Fácil: más tiempo, sugerencias
  - Normal: estándar
  - Difícil: menos tiempo, penalizaciones
- [ ] Verificar funcionamiento en móvil
  - Touch events para drag & drop
  - Responsive adjustments
- [ ] Verificar rendimiento
  - Carga de sonidos
  - Animaciones fluidas
  - Memoria y renders

## 🧪 TESTS
- [x] Configuración de tests (vitest + jsdom)
- [x] Tests de lógica del juego (14 tests)
  - createDeck, shuffle, deal
  - canPlaceOnTableau, canPlaceOnFoundation
  - isWon, isRed, constantes
- [x] Tests de sonidos (useSoundEffects)
  - Mute/Unmute toggle
  - Estado inicial
- [ ] Tests de Drag & Drop
- [ ] Tests de efectos visuales
- [ ] Tests de niveles de dificultad

## 🐛 BUGS CONOCIDOS
- [ ] Ninguno reportado

## 📝 NOTAS
- ✅ `use-sound` instalado y configurado
- ✅ `framer-motion` ya está instalado en el proyecto
- ✅ Archivos de sonido en `public/sounds/`:
  - `card-flip.mp3` - Voltear carta
  - `card-place.mp3` - Colocar carta
  - `deal.mp3` - Repartir
  - `win.mp3` - Victoria
  - `click.mp3` - Clic (opcional)
- Los sonidos deben ser cortos (< 1s para acciones, < 2s para victoria)
- Formato de sonidos: MP3 o WAV

## 📂 ARCHIVOS CREADOS/MODIFICADOS
- `src/hooks/useSoundEffects.js` - Hook de sonidos (CREADO)
- `src/components/solitaire/SolitaireGame.jsx` - Integración de sonidos (MODIFICADO)
- `public/sounds/*.mp3` - Archivos de audio (AGREGADOS)
- `vitest.config.js` - Configuración de tests (CREADO)
- `vitest.setup.js` - Setup de tests (CREADO)
- `__tests__/setup.test.js` - Tests de entorno (CREADO)
- `__tests__/solitaire.test.jsx` - Tests de lógica (CREADO)
- `__tests__/sound.test.jsx` - Tests de sonidos (CREADO)
- `README.md` - Documentación actualizada (MODIFICADO)