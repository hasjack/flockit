export type ApiKind = 'function' | 'property' | 'delegate' | 'enum' | 'struct'

export type ApiEntry = {
  name: string
  kind: ApiKind
  signature?: string
  description: string
  note?: string
}

export type ApiSection = {
  id: string
  title: string
  entries: ApiEntry[]
}

export const apiSections: ApiSection[] = [
  {
    id: 'properties',
    title: 'AFlockManager — Properties',
    entries: [
      { name: 'Env', kind: 'property', signature: 'FSimConfig', description: 'Global flock physics. Per-species radii, speeds and strengths live under Species.' },
      { name: 'Dimension Mode', kind: 'property', signature: 'ESimDimensionMode', description: 'Which axes organisms move on. Most tanks and exhibits use 2D (XY plane).' },
      { name: 'Simulation Bounds (Half-Extents)', kind: 'property', signature: 'FVector', description: 'Half-size of the flocking volume in sim-local units. For 2D modes leave Z at 0.' },
      { name: 'Force Update Stride', kind: 'property', signature: 'int32', description: 'Recompute separation, cohesion and alignment every N frames per organism. Walls and repulsor still run every frame.' },
      { name: 'Spawn Layout', kind: 'property', signature: 'ESpawnLayout', description: 'Spread, Burst, or Flock cluster. Changing during Play respawns organisms.' },
      { name: 'Flock Spawn Radius', kind: 'property', signature: 'float', description: 'Tightness of the spawn cluster when Spawn Layout is Flock.' },
      { name: 'Selected Spawn Preset', kind: 'property', signature: 'EFlockItSpawnPreset', description: 'Census and env preset. Changing in the editor updates Species and Simulation Settings. Custom keeps manual edits.' },
      { name: 'Species', kind: 'property', signature: 'TArray<FSpeciesSpawnConfig>', description: 'Species definitions and population counts. Presets fill this list when chosen in the editor.' },
      { name: 'Spawn On Begin Play', kind: 'property', signature: 'bool', description: 'On Play, spawn organisms from Species. Turn off when driving spawn from the Event Graph.' },
      { name: 'Draw Debug Organisms', kind: 'property', signature: 'bool', description: 'Debug spheres each tick. Turn off when driving ISMs.' },
      { name: 'Debug Organism Scale', kind: 'property', signature: 'float', description: 'Radius multiplier for debug organism spheres (not mesh scale).' },
      { name: 'Debug Organism Color', kind: 'property', signature: 'FColor', description: 'Fallback debug tint when a species Debug Color alpha is 0.' },
      { name: 'Draw Debug Bounds', kind: 'property', signature: 'bool', description: 'Draw simulation bounds wireframe.' },
      { name: 'Draw Debug Repulsor', kind: 'property', signature: 'bool', description: 'Draw repulsor debug sphere when active.' },
      { name: 'Repulsor Effect', kind: 'property', signature: 'ERepulsorEffectMode', description: 'Repulsion (tank-style push), Panic (fear push + BellToy scatter + speed burst), or Off (track only).' },
      { name: 'Repulsor Radius', kind: 'property', signature: 'float', description: 'Sim-space threat zone radius. Also sizes the repulsor debug sphere.' },
      { name: 'Repulsor Strength', kind: 'property', signature: 'float', description: 'Repulsion: push strength inside the radius. Panic: fear-push strength. Scaled per species by Repulsor Sensitivity.' },
      { name: 'Panic Speed Boost', kind: 'property', signature: 'float', description: 'Panic mode: added to Max Speed at full repulsor pressure. Scaled per species by Panic Reaction and Repulsor Sensitivity.' },
      { name: 'Panic Spook Duration', kind: 'property', signature: 'float', description: 'Panic mode: seconds scatter effects linger after leaving the repulsor zone (BellToy feedback, speed burst, flock damping). Default 4.' },
      { name: 'Track Player Pawn As Repulsor', kind: 'property', signature: 'bool', description: 'Treat the first local player pawn as repulsor when within Repulsor Radius of simulation bounds.' },
      { name: 'Repulsor Source', kind: 'property', signature: 'AActor*', description: 'Optional actor to track as repulsor when Track Player Pawn is off.' },
      { name: 'Walls Block Player', kind: 'property', signature: 'EPlayerBoundsMode', description: "Off = no constraint. Keep Inside = once the pawn is inside Simulation Bounds it cannot leave. Keep Outside = pawn cannot enter bounds. Uses this manager's transform, Dimension Mode, and bounds." },
      { name: 'Player Wall Margin', kind: 'property', signature: 'float', description: 'Inset from Simulation Bounds when constraining the player. Keeps the pawn capsule away from the glass. Not the same as Env Wall Margin (organism soft walls).' },
      { name: 'Player Bounds Pawn', kind: 'property', signature: 'APawn*', description: 'Optional pawn to constrain. Empty = first local player pawn (same resolution as Track Player Pawn As Repulsor).' },
      { name: 'On Census Changed', kind: 'delegate', signature: 'FOnCensusChanged', description: 'Broadcast when species population counts change.' },
    ],
  },
  {
    id: 'simulation',
    title: 'Simulation',
    entries: [
      { name: 'Spawn Species', kind: 'function', signature: '(Species: FOrgType, Count: int32) → void', description: 'Spawn organisms of one species.' },
      { name: 'Spawn Species Population', kind: 'function', signature: '() → void', description: 'Spawn all entries in Species.' },
      { name: 'Respawn Species Population', kind: 'function', signature: '() → void', description: 'Clear all organisms and spawn again from Species using the current Spawn Layout.' },
      { name: 'Load Selected Spawn Preset', kind: 'function', signature: '() → void', description: 'Apply Selected Spawn Preset at runtime. In the editor, changing the dropdown updates Species and Simulation Settings.' },
      { name: 'Load Spawn Preset', kind: 'function', signature: '(Preset: EFlockItSpawnPreset) → void', description: 'Apply a specific spawn preset at runtime.' },
      { name: 'Edit Species', kind: 'function', signature: '(Original: FOrgType, Updated: FOrgType) → void', description: 'Update a live species definition and matching organisms.' },
      { name: 'Delete Species', kind: 'function', signature: '(Species: FOrgType) → void', description: 'Remove a species and its organisms.' },
      { name: 'Set Species Population', kind: 'function', signature: '(Species: FOrgType, TargetCount: int32) → void', description: 'Grow or shrink a species to a target count.' },
      { name: 'Clear All', kind: 'function', signature: '() → void', description: 'Remove every organism.' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    entries: [
      { name: 'Get Organism Positions', kind: 'function', signature: '(OutPositions: TArray<FVector>) → void', description: 'Sim-local positions for all organisms.' },
      { name: 'Get Organism World Positions', kind: 'function', signature: '(OutPositions: TArray<FVector>) → void', description: 'World-space positions for all organisms.' },
      { name: 'Get Organism Velocities', kind: 'function', signature: '(OutVelocities: TArray<FVector>) → void', description: 'Sim-local velocities.' },
      { name: 'Get Organism World Velocities', kind: 'function', signature: '(OutVelocities: TArray<FVector>) → void', description: 'World-space velocities.' },
      { name: 'Get Organism Count', kind: 'function', signature: '() → int32', description: 'Total organism count on this manager.' },
      { name: 'Get Organism Rotations', kind: 'function', signature: '(OutRotations: TArray<FRotator>) → void', description: 'Sim-local rotations oriented to velocity.' },
      { name: 'Get Organism World Rotations', kind: 'function', signature: '(OutRotations: TArray<FRotator>) → void', description: 'World-space rotations oriented to velocity.' },
      { name: 'Get Organism Debug Appearance', kind: 'function', signature: '(OutAppearance: TArray<FOrganismDebugAppearance>) → void', description: 'Per-organism debug colour and emissive for materials.' },
      { name: 'Get Organism Pressures', kind: 'function', signature: '(OutPressures: TArray<float>) → void', description: 'Repulsor pressure per organism (0–1). Drives panic visuals and gameplay.' },
      { name: 'Get Organism Transforms', kind: 'function', signature: '(OutTransforms, InstanceScale, bOrientToVelocity, ForwardAxis) → void', description: 'Sim-local transforms for ISM batching.' },
      { name: 'Get Organism World Transforms', kind: 'function', signature: '(OutTransforms, InstanceScale, bOrientToVelocity, ForwardAxis) → void', description: 'World transforms for all organisms on this manager (flat array — slice per species for multi-ISM setups).' },
      { name: 'Get Species Debug Appearance', kind: 'function', signature: '(SpeciesName: FName, OutAppearance: FSpeciesDebugAppearance) → bool', description: 'Lookup debug appearance for one species.' },
      { name: 'Get All Species Debug Appearances', kind: 'function', signature: '(OutAppearances: TArray<FSpeciesDebugAppearance>) → void', description: 'Debug appearance for every species in Species.' },
    ],
  },
  {
    id: 'rendering',
    title: 'Rendering',
    entries: [
      { name: 'Populate Instanced Organism Mesh', kind: 'function', signature: '(InstanceMesh, InstanceScale, bWorldSpace, bOrientToVelocity, ForwardAxis) → void', description: 'Write all organism transforms to an ISM in one call. Use each tick, or pair BeginPlay Add Instance with Batch Update — do not mix both patterns.' },
    ],
  },
  {
    id: 'repulsor',
    title: 'Repulsor',
    entries: [
      { name: 'Set Repulsor At World Pos', kind: 'function', signature: '(WorldPos, bExpireAfterIdle, ExpireAfterIdleSeconds, IdleMoveThreshold) → void', description: 'Place a repulsor at a world position. Expires after idle unless tracking an actor.' },
      { name: 'Set Repulsor Source', kind: 'function', signature: '(InRepulsorSource: AActor*) → void', description: 'Track an actor as the repulsor.' },
      { name: 'Clear Repulsor', kind: 'function', signature: '() → void', description: 'Deactivate the repulsor.' },
      { name: 'Get Repulsor Influence Radius', kind: 'function', signature: '() → float', description: 'Returns Repulsor Radius.' },
      { name: 'Get Repulsor World Location', kind: 'function', signature: '() → FVector', description: 'Current repulsor position in world space.' },
      { name: 'Is Repulsor Active', kind: 'function', signature: '() → bool', description: 'Whether a repulsor is currently influencing the flock.' },
      { name: 'Is World Position In Repulsor Range', kind: 'function', signature: '(WorldPosition: FVector) → bool', description: 'True when a world position is within Repulsor Radius of the tank bounds (3D distance to closest point on bounds).' },
    ],
  },
  {
    id: 'bounds',
    title: 'Bounds',
    entries: [
      { name: 'Is World Location Inside Simulation Bounds', kind: 'function', signature: '(WorldLocation: FVector) → bool', description: 'Query whether a world position lies inside Simulation Bounds (sim-local, respects Dimension Mode). Does not move actors.' },
    ],
  },
  {
    id: 'player',
    title: 'Player',
    entries: [
      { name: 'Constrain Player Pawn', kind: 'function', signature: '(Pawn: APawn* = null) → bool', description: 'Apply Walls Block Player once to the given pawn (or the first local player pawn when null). Runs automatically each tick during play when Walls Block Player is enabled.' },
    ],
  },
  {
    id: 'enums',
    title: 'Enums',
    entries: [
      { name: 'ECohesionModel', kind: 'enum', signature: 'KappaFramework · TraditionalBoids · Newtonian · InverseSquare', description: 'Cohesion attraction falloff model.' },
      { name: 'ESimDimensionMode', kind: 'enum', signature: 'OneD_X · TwoD_XY · ThreeD_XYZ', description: 'Simulation dimensionality.' },
      { name: 'ERepulsorEffectMode', kind: 'enum', signature: 'Off · Repulsion · Panic', description: 'Repulsor threat response mode.' },
      { name: 'EPlayerBoundsMode', kind: 'enum', signature: 'Off · Keep Inside · Keep Outside', description: 'How Walls Block Player constrains the player pawn relative to Simulation Bounds.' },
      { name: 'ESpawnLayout', kind: 'enum', signature: 'Spread · Burst · Flock', description: 'Initial organism placement pattern.' },
      { name: 'EFlockMeshForwardAxis', kind: 'enum', signature: '+X · +Y · +Z · −X · −Y · −Z', description: 'Mesh forward axis for velocity orientation.' },
      { name: 'EFlockItSpawnPreset', kind: 'enum', signature: 'Empty · Solo School · Twin Mix · Quiet Drift · Quick Tank · Busy Tank · Species Mix · Repulsor Playground · Panic Showcase · Custom', description: 'Built-in census and simulation presets. Panic Showcase also enables Walls Block Player (Keep Inside) and panic repulsor settings.' },
      { name: 'EBellToyOrientation', kind: 'enum', signature: 'Positive · Negative', description: 'BellToy progress-state orientation sign.' },
    ],
  },
  {
    id: 'structs',
    title: 'Structs',
    entries: [
      { name: 'FOrgType', kind: 'struct', signature: 'SpeciesName, SpeciesId, Size, Mass, force radii/strengths, MaxSpeed, RepulsorSensitivity, PanicReaction, DebugColor, DebugEmissive', description: 'Per-species definition used in Species and Spawn Species.' },
      { name: 'FSpeciesSpawnConfig', kind: 'struct', signature: 'Species: FOrgType, Count: int32', description: 'Species plus population count for spawning.' },
      { name: 'FSimConfig', kind: 'struct', signature: 'CohesionModel, K0, Align, AlignSaturation, AlignNoise, MinCruiseSpeed, WallMargin, WallStrength, AccelScale, Drag, SimulationRate', description: 'Global simulation settings on AFlockManager.Env.' },
      { name: 'FOrganismDebugAppearance', kind: 'struct', signature: 'Color: FLinearColor, Emissive: float', description: 'Per-organism material tint data.' },
      { name: 'FSpeciesDebugAppearance', kind: 'struct', signature: 'SpeciesName, Color, Emissive', description: 'Per-species material tint data.' },
      { name: 'FBellToyState', kind: 'struct', signature: 'Orientation, Progress [0–1), FlipCount', description: 'Bounded progress-state channel. GetSign() returns ±1.' },
      { name: 'FBellToyChannelConfig', kind: 'struct', signature: 'Name, CrowdWeight, ContagionWeight, SpeedWeight, CustomWeight', description: 'Weighted pressure channels for BellToy stepping.' },
      { name: 'FBellToyPressureSample', kind: 'struct', signature: 'CrowdPressure, ContagionPressure, SpeedPressure, CustomPressure', description: 'Pressure inputs for ApplyBellToyPressure.' },
      { name: 'FBellToyStepResult', kind: 'struct', signature: 'State, AppliedDelta, Crossings, bFlipped', description: 'Result of a BellToy step. bFlipped when orientation toggles.' },
    ],
  },
  {
    id: 'belltoy',
    title: 'BellToy',
    entries: [
      { name: 'UBellToyFunctionLibrary::Get Bell Toy Sign', kind: 'function', signature: '(State: FBellToyState) → int32', description: 'Returns +1 or −1 from orientation.' },
      { name: 'UBellToyFunctionLibrary::Make Bell Toy Delta', kind: 'function', signature: '(Pressure, ChannelConfig) → float', description: 'Convert a pressure sample to a delta via channel weights.' },
      { name: 'UBellToyFunctionLibrary::Apply Bell Toy Delta', kind: 'function', signature: '(State, Delta) → FBellToyStepResult', description: 'Advance progress-state by a direct delta.' },
      { name: 'UBellToyFunctionLibrary::Apply Bell Toy Pressure', kind: 'function', signature: '(State, Pressure, ChannelConfig) → FBellToyStepResult', description: 'Advance progress-state from weighted pressure.' },
      { name: 'UBellToyFunctionLibrary::Reset Bell Toy State', kind: 'function', signature: '(State) → void', description: 'Reset progress, orientation and flip count.' },
      { name: 'UBellToyComponent::Apply Delta', kind: 'function', signature: '(Delta: float) → FBellToyStepResult', description: 'Component-owned BellToy step by delta.' },
      { name: 'UBellToyComponent::Apply Pressure', kind: 'function', signature: '(Pressure: FBellToyPressureSample) → FBellToyStepResult', description: 'Component-owned BellToy step by pressure.' },
      { name: 'UBellToyComponent::Reset Bell Toy', kind: 'function', signature: '() → void', description: 'Reset component state.' },
      { name: 'UBellToyComponent::Get Bell Toy State', kind: 'function', signature: '() → FBellToyState', description: 'Current state.' },
      { name: 'UBellToyComponent::Get Bell Toy Sign', kind: 'function', signature: '() → int32', description: 'Current orientation sign.' },
      { name: 'UBellToyComponent::On Stepped', kind: 'delegate', signature: 'FOnBellToyStepped', description: 'Fired every step.' },
      { name: 'UBellToyComponent::On Flipped', kind: 'delegate', signature: 'FOnBellToyFlipped', description: 'Fired when orientation flips.' },
      { name: 'bAutoAdvance', kind: 'property', signature: 'bool', description: 'Auto-step BellToy each tick (BellToyComponent).' },
      { name: 'Auto Delta Per Second', kind: 'property', signature: 'float', description: 'Auto-advance rate (BellToyComponent).' },
    ],
  },
]