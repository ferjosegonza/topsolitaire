# QA Checklist — TopSolitaire

Lista de verificación para probar el sitio como **usuario típico** (jugador y visitante). Marca cada ítem cuando lo verifiques.

> **Nota:** Los tests automatizados viven en `__tests__/`. Este checklist es la verificación **manual / de aceptación** de usuario.

---

## 🎮 Jugando el juego

- [ ] Al cargar, se reparten **28 cartas** en 7 columnas y **24 cartas** quedan en el mazo.
- [ ] Clic/tap en el **mazo** (arriba a la izquierda) saca una carta a la pila de descarte.
- [ ] Se pueden **mover cartas** entre columnas (arrastrar o clic + clic).
- [ ] Las cartas se apilan en las columnas en **orden descendente alternando rojo/negro**.
- [ ] Solo se puede colocar un **Rey** en una columna vacía.
- [ ] Las **fundaciones** se construyen de **As a Rey por palo**.
- [ ] **Doble tap** envía una carta directamente a la fundación correspondiente.
- [ ] El **auto-movimiento** funciona al tocar una carta movible.
- [ ] Los contadores **Moves** y **Time** se actualizan en tiempo real.
- [ ] Al completar las 4 fundaciones aparece **"You Won!"** con confeti.
- [ ] El botón **New Game** reinicia la partida.
- [ ] El botón **Play Again** (tras ganar) inicia una partida nueva.

## 🔊 Sonido

- [ ] Suenan los efectos: **voltear, colocar, repartir y ganar**.
- [ ] El botón **mute/unmute** silencia y reactiva el sonido.
- [ ] La preferencia de sonido **se recuerda** al recargar la página.

## 🎨 Temas visuales

- [ ] El botón de tema cicla **Lluvioso → Oscuro → Claro → Lluvioso**.
- [ ] El tema **se persiste** al recargar la página.
- [ ] El fondo de lluvia solo aparece en **modo Lluvioso**.

## 🌐 Idiomas

- [ ] El **selector de idioma** aparece en la barra de controles.
- [ ] Al abrirlo muestra las **8 opciones**: EN, ES, FR, IT, PL, DE, ZH (简体), ZH-TW (繁體).
- [ ] Al elegir un idioma, **todos los textos del juego** cambian al instante.
- [ ] El idioma elegido **se persiste** en `localStorage` al recargar.
- [ ] Con el navegador en español, carga en **español**.
- [ ] Con un idioma no soportado o sin detectar, carga en **inglés** (fallback).
- [ ] En **móvil** el selector es un botón compacto (ícono 🌐); en **escritorio** muestra bandera + nombre.
- [ ] El `<title>` y las meta description se actualizan según el idioma.

## 📱 Responsive / Móvil

- [ ] El tablero se ve y se juega bien en **móvil, tablet y escritorio**.
- [ ] No hay **desbordes** horizontales en pantallas pequeñas.
- [ ] El anuncio **lateral** solo aparece en pantallas grandes (≥1200px).
- [ ] Los anuncios **no** se superponen con el tablero ni bloquean el juego.

## 🔗 Navegación / Páginas

- [ ] El enlace **Privacy Policy** funciona.
- [ ] El enlace **Contact** funciona.
- [ ] Una **URL desconocida** redirige a Home (no muestra error en blanco).
- [ ] El **Footer** se muestra correctamente al final de la página.

## 🔍 SEO / Head

- [ ] El `<title>` es correcto y descriptivo.
- [ ] Favicons e íconos de Apple cargan correctamente.
- [ ] `manifest.json` (PWA) funciona.
- [ ] Las metas **Open Graph** y **Twitter Card** están presentes.

## 📊 Publicidad

- [ ] Los anuncios **superior, lateral e inferior** se cargan.
- [ ] La página **no se ralentiza** notablemente por los anuncios.
- [ ] Los espacios de anuncio vacíos **colapsan** y no dejan huecos feos.

## ♿ Accesibilidad

- [ ] Los botones tienen `aria-label` descriptivo.
- [ ] Las cartas son **navegables con teclado** (`role="button"`, `tabIndex=0`).
- [ ] El selector de idioma y el de tema son operables con teclado.
- [ ] El contraste de texto es legible en los 3 temas.

---

## ✅ Resultado

- Ítems verificados: **___ / total**
- Errores encontrados: **___**
- Comentarios / capturas:
