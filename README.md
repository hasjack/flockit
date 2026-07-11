# flockit

Public home for **FlockIt** — the Unreal Engine 5.8 flocking plugin, demo project, and documentation site.

- **Site:** [flockit.xyz](https://flockit.xyz) (GitHub Pages)
- **Plugin source:** [github.com/hasjack/Flocker](https://github.com/hasjack/Flocker) (`Plugins/FlockIt/`)

## Repository layout

```text
FlockIt/
  client/     Vite + TypeScript site (deployed to GitHub Pages)
  unreal/     UE 5.8 demo project (gitignored for now)
```

## Local development

```bash
cd client
npm install
npm run dev
```

Build for production:

```bash
cd client
npm run build
```

## GitHub Pages

Pushes to `main` build `client/` and deploy via GitHub Actions.

1. In the GitHub repo **Settings → Pages**, set source to **GitHub Actions**.
2. Add a DNS record for `flockit.xyz` pointing at GitHub Pages (see GitHub’s custom-domain docs).
3. The `client/public/CNAME` file sets the custom domain.

## Unreal demo project

The demo lives in `unreal/` locally. Open `unreal/FlockIt.uproject` in UE 5.8. This folder is excluded from git until demo content is ready to publish.