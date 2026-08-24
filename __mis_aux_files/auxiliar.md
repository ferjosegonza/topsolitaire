

Plan de Implementación

Branch 1: feature/O1-theme-context
Crear src/lib/ThemeContext.jsx con React Context
Temas: 'original' y 'rainy'
Estado persistido en localStorage
Default: 'rainy'
Crear src/components/ui/ThemeToggle.jsx (toggle elegante con iconos SVG)
Envolver app en ThemeProvider (main.jsx y App.jsx)
Aplicar data-theme en <body> (para variables CSS)
Test: verificar que toggle cambia estado y persiste en localStorage

Branch 2: feature/O2-palette-css-vars
Definir variables CSS en src/index.css para ambos temas:
Original: fondos slate/emerald existentes
Rainy: fondos grises azulados, acentos azul pizarra, texturas madera
Aplicar data-theme selectors en CSS
Transición suave transition: background-color 0.5s

Branch 3: feature/O3-rainy-background
Crear src/components/RainyBackground.jsx
Lluvia: rayas SVG animadas con keyframes CSS
Niebla: radial-gradient animado
Nubes: pseudo-elementos con blur
Integrar en App.jsx (fijo, pointer-events: none)
Respetar prefers-reduced-motion

Branch 4: feature/O4-typography-nunito
Cargar Nunito en index.html (preconnect + Google Fonts, display=swap)
Actualizar --font-heading y --font-body en index.css y tailwind.config.js

Branch 5: feature/O5-visual-redesign
Rediseñar tablero (bordes, sombras, border-radius)
Dorso de carta con textura cálida (rainy) vs elegante (original)
Header con identidad (título + subtítulo)
Reemplazar emojis por iconos SVG de lucide-react (ya instalado)
Estilos consistentes del details "How to play"
Esto afectará tests de ui.test.jsx y visual-effects.test.jsx (cambian emojis por SVG)

Branch 6: feature/O6-cafecito-responsive
Convertir botón Cafecito en FAB flotante en móvil (abajo a la derecha, sin tapar juego)
Inline en desktop (como está ahora)
Ajustar tamaño según viewport

Branch 7: feature/O8-accessibility
onKeyDown (Enter/Espacio) en cartas para navegación por teclado
Corregir contraste de texto (text-slate-500 en fondos claros)
aria-label faltantes en cartas, botones, stock
prefers-reduced-motion global
Afecta tests de accesibilidad existentes

Branch 8: feature/O9-rain-sound
Hook useRainSound.js usando use-sound (ya instalado)
Loop de lluvia suave, volumen bajo
Ligado al Modo Lluvioso (se activa/desactiva con el tema)
No rompe useSoundEffects actual

Branch 9: feature/O10-responsive-final
Revisión integral responsive (360px → ultrawide)
Verificar LCP/CLS/INP
Correr TODA la batería de tests
Build final
Actualizar README.md