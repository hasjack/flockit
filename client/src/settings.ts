export type SettingField = {
  name: string
  type: string
  default?: string
  description: string
}

export type SettingGroup = {
  id: string
  title: string
  intro?: string
  fields: SettingField[]
}

export const simulationSettingGroups: SettingGroup[] = [
  {
    id: 'cohesion',
    title: 'Cohesion',
    intro: 'How organisms are pulled toward neighbours. Lives under Simulation Settings (FSimConfig / Env).',
    fields: [
      {
        name: 'Cohesion Model',
        type: 'ECohesionModel',
        default: 'Kappa Framework',
        description: 'Falloff curve for group attraction. Kappa Framework is the default exponential model; Traditional Boids is constant inside the radius.',
      },
      {
        name: 'Kappa K0',
        type: 'float',
        default: '1.0',
        description: 'Curvature strength for the κ-framework model. Only applies when Cohesion Model is Kappa Framework.',
      },
      {
        name: 'Kappa Radial Scale',
        type: 'float',
        default: '0.018',
        description: 'κ-framework radial scale (paper default). Blueprint/programmatic only — not shown in Details. Tune K0 in the editor for most cohesion tweaks.',
      },
    ],
  },
  {
    id: 'alignment',
    title: 'Alignment',
    fields: [
      {
        name: 'Align Global Scale',
        type: 'float',
        default: '1.0',
        description: 'Global alignment multiplier. Each species Alignment Strength in Species multiplies this value.',
      },
      {
        name: 'Align Saturation',
        type: 'float',
        default: '6.0',
        description: 'Caps extra alignment from dense neighbour counts. Reduces overly tight swarms.',
      },
      {
        name: 'Align Noise',
        type: 'float',
        default: '0.0',
        description: 'Random angular jitter on velocity each step. Adds organic variation.',
      },
    ],
  },
  {
    id: 'motion',
    title: 'Motion & integration',
    fields: [
      {
        name: 'Min Cruise Speed',
        type: 'float',
        default: '0.0',
        description: 'Speed floor so organisms never fully stop (0 = off). Try ~30–40% of species Max Speed when idle hover looks wrong.',
      },
      {
        name: 'Acceleration Scale',
        type: 'float',
        default: '1.0',
        description: 'Master scale on accumulated forces before integration. Lower = softer, less snappy motion.',
      },
      {
        name: 'Drag',
        type: 'float',
        default: '0.98',
        description: 'Per-step velocity retention. Closer to 1 = more glide and drift.',
      },
      {
        name: 'Simulation Rate',
        type: 'float',
        default: '60.0',
        description: 'Tuning values use 60 Hz simulation units. Step scaling compares this rate to real delta time.',
      },
    ],
  },
  {
    id: 'walls',
    title: 'Soft walls (organisms)',
    intro:
      'Soft forces that keep organisms inside Simulation Bounds. These do not move the player — use Walls Block Player under Manager config for pawn constraints.',
    fields: [
      {
        name: 'Wall Margin',
        type: 'float',
        default: '40.0',
        description: 'Inset from Simulation Bounds where organism wall repulsion begins. Smaller margin = swim closer to edges.',
      },
      {
        name: 'Wall Strength',
        type: 'float',
        default: '0.0006',
        description: 'Strength of quadratic wall repulsion inside Wall Margin.',
      },
    ],
  },
]

export const managerConfigFields: SettingField[] = [
  {
    name: 'Dimension Mode',
    type: 'ESimDimensionMode',
    default: '2D (XY plane)',
    description: 'Which axes organisms move on. Most tanks and wall-mounted exhibits use 2D.',
  },
  {
    name: 'Simulation Bounds (Half-Extents)',
    type: 'FVector',
    default: '170, 170, 0',
    description: 'Half-size of the flocking volume in sim-local units. For 2D modes leave Z at 0.',
  },
  {
    name: 'Force Update Stride',
    type: 'int32',
    default: '1',
    description: 'Recompute separation, cohesion and alignment every N frames per organism. Walls and repulsor still run every frame.',
  },
  {
    name: 'Spawn Layout',
    type: 'ESpawnLayout',
    default: 'Spread',
    description: 'Spread across bounds, Burst cluster with chaotic velocities, or Flock cluster with matched heading.',
  },
  {
    name: 'Flock Spawn Radius',
    type: 'float',
    default: '28.0',
    description: 'Tightness of the spawn cluster when Spawn Layout is Flock.',
  },
  {
    name: 'Repulsor Effect',
    type: 'ERepulsorEffectMode',
    default: 'Repulsion',
    description: 'Repulsion (push), Panic (fear push + BellToy scatter + speed burst), or Off (track only).',
  },
  {
    name: 'Repulsor Radius',
    type: 'float',
    default: '100.0',
    description: 'Sim-space threat zone radius. Also sizes the repulsor debug sphere.',
  },
  {
    name: 'Repulsor Strength',
    type: 'float',
    default: '10.0',
    description: 'Repulsion: push strength. Panic: fear-push strength. Scaled per species by Repulsor Sensitivity.',
  },
  {
    name: 'Panic Speed Boost',
    type: 'float',
    default: '2.2',
    description: 'Panic mode only. Added to Max Speed at full pressure. Scaled by Panic Reaction.',
  },
  {
    name: 'Panic Spook Duration',
    type: 'float',
    default: '4.0',
    description: 'Panic mode only. Seconds scatter effects linger after leaving the repulsor zone.',
  },
  {
    name: 'Track Player Pawn As Repulsor',
    type: 'bool',
    default: 'false',
    description: 'Treat the first local player pawn as the repulsor when within Repulsor Radius of simulation bounds.',
  },
  {
    name: 'Walls Block Player',
    type: 'EPlayerBoundsMode',
    default: 'Off',
    description:
      'Hard constraint on the player pawn (not organism soft walls). Keep Inside latches once the pawn enters bounds; Keep Outside ejects to the nearest exterior face. Panic Showcase enables Keep Inside.',
  },
  {
    name: 'Player Wall Margin',
    type: 'float',
    default: '24.0',
    description: 'Inset from Simulation Bounds when Walls Block Player is on. Independent of Env Wall Margin.',
  },
  {
    name: 'Player Bounds Pawn',
    type: 'APawn*',
    default: 'null',
    description: 'Optional pawn to constrain. Empty uses the first local player pawn.',
  },
]

export const speciesFields: SettingField[] = [
  {
    name: 'Species Name',
    type: 'FName',
    description: 'Display and lookup name. Used when matching species in Blueprint calls.',
  },
  {
    name: 'Species Id',
    type: 'FGuid',
    description: 'Stable identity for Edit Species / Delete Species when multiple species share similar stats.',
  },
  {
    name: 'Size',
    type: 'float',
    default: '10.0',
    description: 'Organism size hint. Affects debug draw scale; mesh scale is set on the ISM separately.',
  },
  {
    name: 'Mass',
    type: 'float',
    default: '1.0',
    description: 'Inertia during force integration.',
  },
  {
    name: 'Separation Radius',
    type: 'float',
    default: '20.0',
    description: 'Distance within which organisms push apart.',
  },
  {
    name: 'Separation Strength',
    type: 'float',
    default: '1.0',
    description: 'How hard nearby organisms repel each other.',
  },
  {
    name: 'Cohesion Radius',
    type: 'float',
    default: '60.0',
    description: 'Neighbour search radius for group attraction.',
  },
  {
    name: 'Cohesion Strength',
    type: 'float',
    default: '1.0',
    description: 'Pull toward neighbour centroid inside Cohesion Radius.',
  },
  {
    name: 'Alignment Radius',
    type: 'float',
    default: '50.0',
    description: 'Neighbour search radius for velocity matching.',
  },
  {
    name: 'Alignment Strength',
    type: 'float',
    default: '1.0',
    description: 'Per-species weight on global Align. Multiplies Simulation Settings → Align Global Scale.',
  },
  {
    name: 'Max Speed',
    type: 'float',
    default: '4.0',
    description: 'Velocity cap for this species.',
  },
  {
    name: 'Repulsor Sensitivity',
    type: 'float',
    default: '1.0',
    description: 'Per-species scale on physical repulsion. Global Repulsor Strength sets the base push.',
  },
  {
    name: 'Panic Reaction',
    type: 'float',
    default: '1.0',
    description:
      '0 = calm under threat. 1 = full panic speed boost and pressure at the repulsor centre. Works with Panic mode (and still scales pressure-driven visuals when using Repulsion).',
  },
  {
    name: 'Debug Color',
    type: 'FLinearColor',
    default: 'alpha 0',
    description: 'Per-species debug and material tint. Alpha 0 uses the manager Debug Organism Color fallback.',
  },
  {
    name: 'Debug Emissive',
    type: 'float',
    default: '1.0',
    description: 'Brightness multiplier for debug draw and per-instance custom data.',
  },
]