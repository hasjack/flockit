# FlockIt

Demo project for the [FlockIt](https://flockit.xyz/) Unreal Engine flocking plugin.

**Docs:** [https://flockit.xyz/](https://flockit.xyz/)  
**Fab:** [Flock It](https://www.fab.com/listings/7c5fcbfb-ff80-4b4a-9b77-688af87f2f12)

The documentation site source lives on the [`client`](https://github.com/hasjack/flockit/tree/client) branch (not in this tree).

## Requirements

- **Unreal Engine 5.8**
- The **FlockIt** plugin ([Fab](https://www.fab.com/listings/7c5fcbfb-ff80-4b4a-9b77-688af87f2f12) or installed under this project’s `Plugins/` folder)

## Getting started

1. Open `FlockIt.uproject` in Unreal Engine 5.8.
2. Enable the FlockIt plugin if prompted, then restart the editor.
3. Open a map under `Content/` (or `Content/Maps/`).
4. Press **Play**.

## What’s in the project

The demo is Blueprint-driven around **Flock Manager** (`AFlockManager`):

- Place or open a manager Blueprint (for example `BP_FlockIt`).
- Choose a **Spawn Preset** (or **Custom** and edit **Species**).
- Leave **Spawn On Begin Play** on, or spawn from the Event Graph.
- Drive organism meshes with **Populate Instanced Organism Mesh** on an Instanced Static Mesh component each tick.

For full API, settings, and step-by-step tutorials, see [flockit.xyz](https://flockit.xyz/).

## Support

[github.com/hasjack/flockit/issues](https://github.com/hasjack/flockit/issues)
