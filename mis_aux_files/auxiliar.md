## 📝 README.md actualizado con tests

Aquí tienes el README completo con la sección de tests agregada:

---

```markdown
# TopSolitaire

This repository contains a static web version of the TopSolitaire solitaire experience built with React and Vite.

## Prerequisites

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Build the production assets: `npx.cmd vite build`.

## Run Locally

Start the local development server:

```bash
npm run dev
```

Open the local URL printed by Vite.

## Build for Apache or Static Hosting

Generate the production files:

```bash
npx.cmd vite build
```

The build output will be created in the `dist` folder and can be served directly by Apache or any static host.

## Running Tests

This project uses **Vitest** for testing. Tests cover game logic, sound system, and component rendering.

### Run all tests

```bash
npm run test
```

### Run tests in watch mode (auto-run on changes)

```bash
npm run test:watch
```

### Run tests with UI

```bash
npm run test:ui
```

### Run tests with coverage report

```bash
npm run test:coverage
```

### Run a specific test file

```bash
npm run test __tests__/solitaire.test.jsx
```

### Run tests with verbose output

```bash
npm run test -- --reporter=verbose
```

### Test files structure

```
__tests__/
├── setup.test.js          # Environment configuration tests
├── solitaire.test.jsx     # Game logic tests (createDeck, shuffle, deal, etc.)
└── sound.test.jsx         # Sound system tests
```

### What is tested

| Test file | What it tests |
|-----------|---------------|
| `setup.test.js` | Vitest environment, jsdom, matchMedia, adsbygoogle mock |
| `solitaire.test.jsx` | Deck creation, shuffling, dealing, card placement rules, win detection |
| `sound.test.jsx` | Sound effects hook, mute/unmute functionality |

### Adding new tests

1. Create a new file in `__tests__/` with `.test.jsx` or `.test.js` extension
2. Import the necessary modules
3. Write your tests using `describe` and `it` blocks
4. Run `npm run test` to verify

## Project Notes

The app is intentionally designed as a public solitaire experience with no login, registration, or user persistence flow.

## Features

- **Sound System**: Card flip, place, deal, and win sounds with mute/unmute toggle
- **Visual Effects**: Smooth animations for card movements
- **Responsive**: Works on desktop, tablet, and mobile devices
- **No Installation Required**: Play directly in your browser

## Tech Stack

- **React** - UI Framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **use-sound** - Audio playback
- **Framer Motion** - Animations
```

---

## 📋 Cambios realizados

| Sección | Lo que agregué |
|---------|----------------|
| **Running Tests** | Nueva sección completa con todos los comandos de test |
| **Test files structure** | Estructura de archivos de tests |
| **What is tested** | Tabla explicando qué prueba cada archivo |
| **Adding new tests** | Guía rápida para agregar nuevos tests |
| **Features** | Resumen de características del juego |
| **Tech Stack** | Lista de tecnologías usadas |

---

**Ahora el README documenta completamente cómo ejecutar los tests después de cada cambio nuevo.** 🚀