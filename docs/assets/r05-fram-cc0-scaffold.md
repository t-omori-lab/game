# R05 F.R.A.M. voxel avatar scaffold provenance

## Runtime boundary

- The game does **not** ship, load, or render the source mesh.
- The visible F.R.A.M. F-01 actor is rebuilt as 7,734 deterministic voxel cells in `R05VoxelAvatarData.generated.ts`.
- The external model is used only offline to obtain plausible anatomy, joint pivots, and a feminine hair silhouette before voxel resampling.
- Coat, archive pack, coral textile, face pixels, material roles, articulation, weapon socket, and animation behavior are project-authored.

## Source

- Asset: **Universal Base Characters — Standard**
- Creator: Quaternius
- Official page: <https://quaternius.com/packs/universalbasecharacters.html>
- Distribution page: <https://quaternius.itch.io/universal-base-characters>
- Source elements used by the offline compiler:
  - `Superhero_Female_FullBody.gltf`
  - `Hair_Buns.gltf`
- Declared license: Creative Commons Zero v1.0 Universal (CC0-1.0)
- Commercial-use status stated by creator: free for personal, educational, and commercial projects.

## Rebuild command

After downloading and extracting the free Standard package, run:

```sh
node tools/generate-r05-voxel-avatar.mjs \
  /path/to/Superhero_Female_FullBody.gltf \
  /path/to/Hair_Buns.gltf \
  src/prototypeB/render/hero/R05VoxelAvatarData.generated.ts
```

The generator reads the source only at build-authoring time, samples the anatomy and hair volumes onto a 0.0195-unit grid, applies project-authored proportion and clothing rules, and emits a compact quantized voxel surface. Keep the downloaded archive outside the repository.
