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

## Project Notes

The app is intentionally designed as a public solitaire experience with no login, registration, or user persistence flow.
