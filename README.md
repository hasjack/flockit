# FlockIt

Demo project and documentation for the [FlockIt](https://flockit.xyz/) Unreal Engine flocking plugin.

**Live docs:** [https://flockit.xyz/](https://flockit.xyz/)

## Repository layout

| Path | Description |
|------|-------------|
| `Content/` | Demo maps and Blueprints |
| `Config/` | Unreal project settings |
| `client/` | Documentation site (Vite + TypeScript) |
| `docker-compose.yml` | Container setup for the docs site |

## Unreal project

Requires **Unreal Engine 5.8** and the **FlockIt** plugin (from [Fab](https://www.fab.com/) or your project’s `Plugins/` folder).

1. Open `FlockIt.uproject` in the editor.
2. Enable the FlockIt plugin if prompted, then restart.
3. Open a map under `Content/` and press Play.

The demo is Blueprint-driven: place or open a Flock Manager, choose a spawn preset, and drive meshes with **Populate Instanced Organism Mesh** (see the docs site tutorials).

## Documentation site

Source lives in `client/`. The site is a static multipage build served by nginx in production.

### Development

```bash
cd client
npm install
npm run dev
```

### Production (Docker)

From the repository root:

```bash
docker compose up --build -d
```

The site is available at [http://localhost:8088](http://localhost:8088) by default. Override the host port if needed:

```bash
FLOCKIT_PORT=8090 docker compose up --build -d
```

## Support

- Docs: [https://flockit.xyz/](https://flockit.xyz/)
- Issues: [github.com/hasjack/flockit/issues](https://github.com/hasjack/flockit/issues)
