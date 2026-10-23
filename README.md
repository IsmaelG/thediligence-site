# thediligence-site

The Next.js source for **[thediligence.app](https://thediligence.app)** — the public marketing site for TheDiligence, a diligence stack for investor-operators.

This repo is **private** — it is implementation only. The skills themselves (the actual IP) live in the public repo:

**[github.com/IsmaelG/diligence-stack-skills](https://github.com/IsmaelG/diligence-stack-skills)** — single source of truth for `/skills` and `/packs`.

## URL map

| URL | Role |
|---|---|
| `thediligence.app` | Public marketing site — this repo |
| `www.thediligence.app` | www alias → same site |
| `app.thediligence.app` | SaaS product (`IsmaelG/diligence-platform`) |

## How the build works

`/skills` and `/packs` are **not** committed here (see `.gitignore`). At build/dev time, `scripts/fetch-skills.mjs` shallow-clones the public skills repo and copies its `/skills` and `/packs` into this working tree; `scripts/build-zips.mjs` then packages every skill and pack into `public/downloads/*.zip` for the site to serve. Both run automatically via the `prebuild` and `dev` npm scripts.

```
app/       Next.js landing page
lib/       site content/copy (pack + skill descriptions, links)
scripts/   fetch-skills.mjs (pulls skill source), build-zips.mjs (packages it)
public/    static assets, incl. the generated download zips
```

## Develop

```
npm install
npm run dev
```

## Deploy

Connected to Vercel (`ismaelgs-projects` / `thediligence-app`), auto-deploys on push to `main`.

## License

[CC BY-NC 4.0](./LICENSE).

<!-- deploy test by Mazen, 2026-10-23; reverted next commit -->
