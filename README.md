# The Diligence Stack — site

The Next.js source for the [thediligencestack](https://the-diligence-stack.vercel.app) landing page. Claude skills for investors, operators and product people — company diligence, product diligence, people mapping, outreach, cohort analysis, and value-creation planning.

This repo is **private** — it's implementation, not the public download destination. The skills themselves (the actual IP) live in the public repo:

**[github.com/IsmaelG/diligence-stack-skills](https://github.com/IsmaelG/diligence-stack-skills)** — the single source of truth for `/skills` and `/packs`.

## How the build works

`/skills` and `/packs` are **not** committed here (see `.gitignore`). At build/dev time, `scripts/fetch-skills.mjs` shallow-clones the public skills repo and copies its `/skills` and `/packs` into this working tree; `scripts/build-zips.mjs` then packages every skill and pack into `public/downloads/*.zip` for the site to serve. Both run automatically via the `prebuild` and `dev` npm scripts.

```
app/       the Next.js landing page
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

Connected to Vercel (`ismaelg's projects` / `the-diligence-stack`), auto-deploys on push to `main`.

## License

[CC BY-NC 4.0](./LICENSE).
