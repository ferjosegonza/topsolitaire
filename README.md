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

This project uses **Vitest** for testing. Tests cover game logic, sound system, component rendering, and theme switching.

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
├── setup.test.js            # Environment configuration tests
├── solitaire.test.jsx       # Game logic tests (createDeck, shuffle, deal, etc.)
├── sound.test.jsx           # Sound system tests
├── theme.test.jsx           # Theme toggle (rainy / dark / light) cycle & persistence
├── app-routing.test.jsx     # App routing (Home, Privacy, Contact, fallback)
├── ui.test.jsx              # UI button and counter tests
├── visual-effects.test.jsx  # Visual effects, sounds and animations
├── auto-move.test.jsx       # Auto-move criteria on click
└── drag-drop.test.jsx       # Drag and drop cards
```

### What is tested

| Test file | What it tests |
|-----------|---------------|
| `setup.test.js` | Vitest environment, jsdom, matchMedia, adsbygoogle mock |
| `solitaire.test.jsx` | Deck creation, shuffling, dealing, card placement rules, win detection |
| `sound.test.jsx` | Sound effects hook, mute/unmute functionality |
| `theme.test.jsx` | Theme toggle cycles rainy→dark→light→rainy, persists in localStorage |
| `app-routing.test.jsx` | App routing (Home, Privacy, Contact, fallback, no auth) |
| `ui.test.jsx` | Buttons, counters, footer, home, accessibility |
| `visual-effects.test.jsx` | Visual effects, sounds and animations |
| `auto-move.test.jsx` | Auto-move criteria on click |
| `drag-drop.test.jsx` | Drag and drop cards |

### Adding new tests

1. Create a new file in `__tests__/` with `.test.jsx` or `.test.js` extension
2. Import the necessary modules
3. Write your tests using `describe` and `it` blocks
4. Run `npm run test` to verify

## Project Notes

The app is intentionally designed as a public solitaire experience with no login, registration, or user persistence flow.

## Features

- **Sound System**: Card flip, place, deal, and win sounds with mute/unmute toggle
- **Visual Effects**: Smooth animations for card movements (flip, land, deal, victory confetti)
- **3 Visual Themes**: Toggle between **Rainy Mode** (default, calm blues and mist), **Dark Mode** (emerald/forest), and **Light Mode** (clean, bright). Persisted in localStorage.
- **Responsive**: Works on desktop, tablet, and mobile devices
- **No Installation Required**: Play directly in your browser

## Support

If you enjoy the game, you can support my work (donation) here:

- **Cafecito (Argentina):** [![Invitame un café en cafecito.app](https://cdn.cafecito.app/imgs/buttons/button_4.svg)](https://cafecito.app/ferjuegos)
- **Ko-fi (International):** [![Support me on Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png)](https://ko-fi.com/Y8Y6XTKCE)

## Tech Stack

- **React** - UI Framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **use-sound** - Audio playback
- **Framer Motion** - Animations
- **lucide-react** - Icons
- **canvas-confetti** - Victory effect

