# Inkwell — Supernotes replacement (Build Games)

Local-first **notecard** desk: small linked cards, tags & collections, instant search, backlinks, Markdown zip export. No accounts, billing, or telemetry.

**Live demo:** https://buildgames-supernotes.vercel.app

**Aesthetic:** Index Drawer — warm paper desk, Literata card titles, Source Sans UI, coral actions, olive/brass collection dots; AI auto-tag / summarize / link suggest.

## Stack

React 19 + TypeScript + Vite + IndexedDB (`idb`) + JSZip. Static deploy on Vercel — no native SQLite.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173
npm run test:unit
npm run build
npm run preview
npm run test:e2e
```

## Data & backup

- Browser **IndexedDB** database `inkwell-supernotes`.
- **Export .md** downloads a zip folder of one `.md` file per card (YAML frontmatter).
- **Restore desk** reloads the real demo notecards (AZ field / wiki trails).

## Limits vs Supernotes

Deliberately excluded (paid / platform advantages): real-time collaboration, cloud sync, graph 2D/3D view, sharing links, mobile/desktop native apps, math/LaTeX rendering, image embeds, commenting.

## Architecture

- `src/store/notesStore.ts` — Zustand + persist
- `src/lib/db.ts` — IndexedDB
- `src/lib/links.ts` — `[[wiki]]` + backlinks
- `src/styles/transitions.css` — transitions.dev free recipes in real UX

## License

Personal Build Games candidate for Brandon Theriot.


## AI assist

Editor actions: **Auto-tag**, **Summarize**, **Suggest links**.

- With `BUILD_GAMES_LLM_API_KEY` / `XAI_API_KEY` / `OPENAI_API_KEY` on the server → real LLM via `/api/ai`.
- Without keys → honest local craft (TF-style tags, extractive summary, cosine link suggest). Never canned lorem.
See `.env.example`.
