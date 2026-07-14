# AGENTS.md

## Project Context

This is a TopSolitaire app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup and build workflow.

## Key Files

- `src/`: frontend application source.
- `src/api/topsolitaireClient.js`: compatibility shim for the public static build.
- `vite.config.js`: Vite config for the TopSolitaire frontend.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `npm run dev` for the local frontend workflow.
- Build the production version with `npx.cmd vite build` when preparing static deployment.
- Keep the app focused on the solitaire experience and avoid reintroducing login or user persistence flows unless explicitly requested.
- Run the relevant checks from `package.json` before finishing code changes.
