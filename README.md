# FlockIt

Unreal Engine 5.8 demo project for the [FlockIt](https://flockit.xyz) flocking plugin.

- **Docs & site:** [flockit.xyz](https://flockit.xyz)
- **Plugin source:** [Flocker](https://github.com/hasjack/Flocker) (private) — `Plugins/FlockIt/`

## Project

Open `FlockIt.uproject` in UE 5.8. The demo is Blueprint-driven: `AFlockManager` actors, species presets, ISM rendering, and repulsor / panic interaction.

| Path | Contents |
|------|----------|
| `Content/` | Maps, Blueprints (`BP_FlockIt`, player, camera) |
| `Config/` | Project settings |
| `client/` | flockit.xyz site source (deployed via GitHub Actions) |

## Plugin

Install **FlockIt** from Fab or copy `Plugins/FlockIt` from Flocker into your project. See the plugin README in Flocker for API reference, ISM patterns, and performance notes.