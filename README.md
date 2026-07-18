# FlockIt

Unreal Engine 5.8 demo project for the FlockIt flocking plugin.

## Project

Open `FlockIt.uproject` in UE 5.8. The demo is Blueprint-driven: `AFlockManager` actors, species presets, ISM rendering, and repulsor / panic interaction.

| Path | Contents |
|------|----------|
| `Content/` | Maps, Blueprints (`BP_FlockIt`, player, camera) |
| `Config/` | Project settings |
| `client/` | Docs site (Vite + TypeScript) |
| `docker-compose.yml` | Production container for the docs site |

## Plugin

Install **FlockIt** from Fab.

## Docs site (Docker)

Static multi-page Vite site, served by nginx. Layout leaves room for a future login API on the same compose network.

### Local

```bash
# from repo root
docker compose up --build -d
# open http://localhost:8088
```

Port override (default **8088** — avoid **8080**, used by `has-client` on the VPS):

```bash
FLOCKIT_PORT=8090 docker compose up --build -d
```

Dev without Docker (hot reload):

```bash
cd client && npm install && npm run dev
```

### Production sketch

1. Build and run the `web` service on your host (or pull a prebuilt image).
2. Terminate TLS on a reverse proxy (Caddy / nginx / Traefik) and proxy to `localhost:8088` (or the published port).
3. When login lands: add `./api`, uncomment the `api` service in `docker-compose.yml`, and uncomment the `/api/` block in `client/nginx.conf`.

```bash
docker compose pull   # if using a registry image
docker compose up -d --build
```