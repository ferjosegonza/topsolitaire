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
- [x] Drag & Drop de cartas
  - Arrastrar cartas con el mouse ✅
  - Feedback visual durante el arrastre ✅
  - Soltar en destino válido ✅
- [x] Sistema de efectos visuales
  - [x] Efecto de voltear carta visual (3D flip)
  - [x] Efecto de aterrizaje visual (bounce)
  - [x] Efecto de reparto visual (cartas volando)