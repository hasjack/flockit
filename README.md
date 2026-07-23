# FlockIt docs site

Source for [flockit.xyz](https://flockit.xyz/) — documentation for the [FlockIt](https://www.fab.com/listings/7c5fcbfb-ff80-4b4a-9b77-688af87f2f12) Unreal Engine plugin.

The Unreal **demo project** lives on the [`main`](https://github.com/hasjack/flockit/tree/main) branch of this repo.

## Layout

| Path | Description |
|------|-------------|
| `client/` | Vite multipage site (TypeScript) |
| `docker-compose.yml` | Production nginx container for the static build |

## Development

```bash
cd client
npm install
npm run dev
```

## Production (Docker)

From this branch root:

```bash
docker compose up --build -d
```

Default: [http://localhost:8088](http://localhost:8088). Override with `FLOCKIT_PORT`.

## Links

- Live docs: [https://flockit.xyz/](https://flockit.xyz/)
- Fab: [Flock It](https://www.fab.com/listings/7c5fcbfb-ff80-4b4a-9b77-688af87f2f12)
- Demo project: [main branch](https://github.com/hasjack/flockit/tree/main)
- Issues: [github.com/hasjack/flockit/issues](https://github.com/hasjack/flockit/issues)
