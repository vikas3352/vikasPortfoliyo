# PLAN.md: Genuine 3D Human Model Pipeline & Integration Architecture

## 1. Current Implementation Analysis

The repository currently contains:
- **`src/components/Hero3D.js`**: An implementation attempting to simulate 3D rotation using WebGL. It loaded a procedurally generated elliptical cylinder (`vikas_3d_body.json` / `vikas_3d_body.obj`) and blended 4 orthogonal photograph textures (`front.png`, `back.png`, `left.png`, `right.png`) via a custom GLSL shader with directional normal weighting.
- **`scripts/build_3d_volumetric_mesh.py`**: A Python script that created a stacked superellipse ring hull from silhouette bounds of the front and left photos.
- **`src/components/Hero.js`**: Contains the hero layout, typography, CTAs, and background glow layers.
- **`src/styles/main.css`**: Defines fixed full-viewport canvas container `.hero-portrait-stage` and layout positioning.
- **Available Photograph Assets**:
  - `public/assets/WhatsApp Image 2026-09-22 at 3.17.19 PM.jpeg` (Front, 0°)
  - `public/assets/WhatsApp Image 2026-09-22 at 3.17.19 PM (1).jpeg` (Back, 180°)
  - `public/assets/WhatsApp Image 2026-09-22 at 3.17.19 PM (2).jpeg` (Left Profile, -90°)
  - `public/assets/WhatsApp Image 2026-09-22 at 3.17.19 PM (3).jpeg` (Right Profile, +90°)
  - Transparent segmented PNG cutouts in `public/assets/studio_3d/`: `front.png`, `left.png`, `right.png`, `back.png` (1024×1536).
  - Depth maps in `public/assets/studio_3d/`: `front_depth.png`, `left_depth.png`, etc.

---

## 2. Why the Existing Approaches Produce Distortion

### A. The 2.5D Depth-Displacement Limitation
A 2.5D heightfield (depth-displacement on a plane or billboard) is fundamentally a 2D surface with 1D elevation. It cannot represent:
- **Undercuts & Occlusions**: The space between arms and the ribcage, behind ears, under the chin, or between thighs.
- **Side Profile Geometry**: When viewed at 90°, a displaced plane is viewed edge-on. Pixels on the boundaries get stretched into elongated ribbons ("smearing" or "sheet" artifact), completely destroying realism.

### B. The Parametric Elliptical Cylinder Limitation
The script `build_3d_volumetric_mesh.py` generated single elliptical rings around the body from head to toe:
- **Topology Mismatch**: The human body is multi-branched (torso branches into two independent arms and two independent legs). A single perimeter ring bridges across the empty space between arms and torso, and between the two legs.
- **Multi-Arm & Duplicate Silhouette Glitch**: Because the mesh geometry at the arm height is a single wide tube, projecting orthogonal photos onto this tube causes textures from the front and side views to project onto the same geometric faces, resulting in duplicated arms, distorted hands, and ghostly multi-layered silhouettes.

---

## 3. What is Required to Generate a Genuine 3D Model

A genuine, photorealistic 3D human model requires:
1. **True 3D Manifold Polygonal Topology**:
   - Distinct, continuous 3D mesh components: sculpted head, facial contours (nose bridge, eye sockets, jawline, ears), neck, separate shoulders, fully articulated arms, hands, torso, and split legs/shoes.
   - Closed, non-self-intersecting geometry with consistent face normals pointing outward.
2. **Proper UV Coordinates & Texture Atlas**:
   - Fully unwrapped UVs without overlapping front-to-back coordinates.
   - Seamless PBR texture maps:
     - **BaseColor / Albedo**: High-resolution diffuse texture without baked directional shadows.
     - **Normal Map (Tangent Space)**: High-frequency anatomical details (fabric folds, facial features, hair definition).
     - **Roughness / Metallic**: Physically accurate skin and cloth response to Three.js lighting.
3. **Believable 360° Surface**:
   - Believable geometry from every viewing angle (0°, 45°, 90°, 135°, 180°) without missing backfaces or photographic smearing.

---

## 4. Recommended Reconstruction Workflow

Because classical photogrammetry (Structure-from-Motion) requires continuous 60–80% visual overlap between adjacent cameras (30–60+ images), generating a true 3D mesh from **only 4 orthogonal photographs** requires modern multi-view neural reconstruction or high-end 3D character reconstruction:

```
[4 Studio Photos: Front, Left, Right, Back]
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  AI Multi-View / Neural Photogrammetric Reconstruction    │
│  (e.g., Rodin Gen-2, Trellis, Meshy, Tripo3D, CSM)      │
│  OR Anatomical Base Mesh Fitting (SMPL-X / Rigged Human) │
└──────────────────────────────────────────────────────────┘
                     │
                     ▼
           [Raw 3D High-Poly Mesh]
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  Remeshing & Retopology (Quad/Tri reduction to ~30k)     │
│  Bake Albedo & Normal Map to Standard UV Atlas           │
└──────────────────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  Web Optimization (Draco/Meshopt compression via gltf)   │
│  Export: vikas_model.glb (< 4 MB)                        │
└──────────────────────────────────────────────────────────┘
                     │
                     ▼
        [Three.js GLTFLoader + GSAP]
```

### Available Reconstruction Options:
- **Option 1 (Fastest & Highest Quality with 4 Photos)**:
  Feed the 4 clean studio images (`front.png`, `left.png`, `right.png`, `back.png`) into a multi-view neural 3D generator (such as Rodin / Trellis / Tripo3D / Meshy). These tools specialize in generating full watertight manifold meshes with baked PBR textures directly from orthogonal human photos.
- **Option 2 (360° Photogrammetry)**:
  If the user captures a complete 360° photo set (see Section 5 below), standard photogrammetry software (RealityCapture, Polycam, Meshroom) can reconstruct a scan of the person with sub-millimeter geometric fidelity.

---

## 5. Input Photographs Assessment & Recommendations

### Assessment of Current Photographs
- **Available**: 4 photos at 90° intervals (Front, Back, Left Profile, Right Profile) in studio lighting.
- **Quality**: High resolution, clean background, accurate postures.
- **Limitation for Classical Photogrammetry**: 4 photos alone do NOT have the dense feature overlap required by classical SfM photogrammetry software (e.g., COLMAP). However, they are sufficient for multi-view AI 3D human reconstruction pipelines.

### Recommended Photo-Capture Setup (If Capturing Additional Images for Classical Photogrammetry)
If the user chooses to capture a full 360° photogrammetry set:
1. **Pose**: Standard A-pose (arms slightly away from body, fingers open, feet shoulder-width apart).
2. **Lighting**: Flat, diffuse, even lighting (no harsh directional spotlights or deep shadows).
3. **Capture Count**: 36 to 48 photos total:
   - 12 photos in a full 360° circle at eye level (every 30°).
   - 12 photos in a full 360° circle at chest/waist level.
   - 12 photos in a full 360° circle at knee/foot level looking slightly upward.
4. **Camera Settings**: Fixed focus, fixed exposure, locked white balance, no camera rotation between portrait/landscape.

---

## 6. Required Output Format

- **Format**: Binary glTF (`.glb`).
- **Target Polygon Count**: 25,000 to 45,000 triangles (optimal balance of anatomical detail and 60fps web rendering).
- **Scale**: Centered at origin $(0, 0, 0)$ with real-world unit height normalized to $\approx 2.1$ Three.js units.
- **Material**: `MeshStandardMaterial` or `MeshPhysicalMaterial`.
- **Textures**:
  - `baseColorTexture`: 2048×2048 PNG/JPEG or WebP.
  - `normalTexture`: 2048×2048 Tangent-space normal map.
  - `roughnessMetallicTexture`: 1024×1024 packed map.

---

## 7. How the GLB Will Be Optimized for the Web

1. **Geometry Compression**:
   - Compress the GLB using Draco or Meshopt via `@gltf-transform/cli`:
     ```bash
     gltf-transform optimize input.glb output.glb --draco --texture-compress webp
     ```
2. **Target File Size**:
   - Total GLB file size $\le 4.0\text{ MB}$.
3. **VRAM Optimization**:
   - Max texture dimension capped at 2048×2048.
   - Mipmaps enabled with anisotropic filtering capped at 4x.
4. **Bounding Box & Normalization**:
   - Ensure origin is centered at the pelvic center of gravity so rotation around Y is natural and doesn't cause eccentric wobbling.

---

## 8. Three.js Integration Architecture

Create a dedicated module: `src/components/VikasModel3D.js`

### Responsibilities:
1. **Asset Loading**:
   - Use `GLTFLoader` with `DRACOLoader` (`draco/` decoder path configured).
   - Show static hero portrait fallback until GLB `onLoad` completes.
2. **Auto-Framing & Centering**:
   ```javascript
   const box = new THREE.Box3().setFromObject(gltf.scene);
   const center = box.getCenter(new THREE.Vector3());
   const size = box.getSize(new THREE.Vector3());
   gltf.scene.position.sub(center); // Centers model at (0, 0, 0)
   const targetHeight = 2.1;
   const scaleFactor = targetHeight / size.y;
   gltf.scene.scale.setScalar(scaleFactor);
   ```
3. **Lighting Setup**:
   - **Key Light**: Warm DirectionalLight (`#fff8f0`, intensity 2.2) from $(-2.0, 2.0, 3.0)$.
   - **Fill Light**: Cool DirectionalLight (`#edf2ff`, intensity 1.2) from $(2.0, 1.0, 2.5)$.
   - **Rim Light**: Vivid orange DirectionalLight (`#ff5518`, intensity 4.5) from $(2.5, 1.8, -2.2)$ to preserve the portfolio's neon aesthetic.
   - **Ambient Light**: Subtle dark warmth (`#241a18`, intensity 0.8).
4. **Lifecycle & Memory**:
   - Full cleanup method `dispose()` that traverses the scene and disposes all geometries, materials, and textures when navigating away or unmounting.

---

## 9. GSAP Scroll Animation Architecture

Implement using GSAP `ScrollTrigger`:

```
   [Scroll = 0]
       │
       ▼
 ┌─────────────────────────────────────────────────────────┐
 │ PHASE 1: HERO (Pinned)                                   │
 │ - Model centered (x: 0, y: -0.05)                       │
 │ - Initial Pose: Left Profile (rotation.y = -Math.PI / 2)│
 │ - Scroll: 0 -> 800px                                    │
 │ - Model physically rotates in Y: -90° -> 0° (Front)     │
 │ - Hero section remains 100% frozen in viewport          │
 └─────────────────────────────────────────────────────────┘
       │
       ▼  (Pin releases after 800px)
 ┌─────────────────────────────────────────────────────────┐
 │ PHASE 2: TRANSITION (Moving to #projects)                │
 │ - Page scrolls down                                     │
 │ - Model glides along X: 0.0 -> -1.25                    │
 │ - Model continues rotating in Y: 0° -> +90°             │
 │ - Camera slightly pulls back to accommodate layout      │
 └─────────────────────────────────────────────────────────┘
       │
       ▼
 ┌─────────────────────────────────────────────────────────┐
 │ PHASE 3: PROJECTS SECTION (#projects)                   │
 │ - Model docked on left (x: -1.25)                       │
 │ - Faces right (+90°), looking toward project cards      │
 │ - Interactive mouse parallax adds subtle 3D tilt        │
 │ - Smoothly fades out as #projects exits viewport        │
 └─────────────────────────────────────────────────────────┘
```

---

## 10. Mobile Fallback Strategy

1. **Screen Width < 768px**:
   - Adjust target camera FOV and model X-docking position (`-0.65` instead of `-1.25`) to prevent obstructing project cards on narrower screens.
   - If WebGL 2.0 is unavailable or device memory is under 4GB, gracefully switch to the high-resolution static studio portrait with smooth opacity fade.
   - Disable heavy shadows and limit pixel ratio to 1.5.

---

## 11. Performance Strategy

1. **Non-Blocking Loading**:
   - The initial page renders immediately with the static portrait fallback.
   - GLB loads asynchronously in the background. Once ready, it fades in over 0.5s while hiding the fallback image.
2. **Animation Loop Optimization**:
   - `requestAnimationFrame` loop uses passive scroll delta checking.
   - When the user scrolls past `#projects` (where the model is no longer visible), rendering is paused to save CPU/GPU cycles.
3. **Draco / Meshopt Decompression**:
   - Offloads decompression to WebAssembly web workers.

---

## 12. Rollback Strategy

1. All current code in `src/components/Hero3D.js` and `scripts/` remains safely tracked in git history.
2. A single toggle variable in `src/main.js` allows instant rollback to the original static hero portrait:
   ```javascript
   const USE_3D_MODEL = false; // Instantly reverts to static portrait
   ```
3. No database, server, or backend dependencies are altered.

---

## 13. Current Status & Next Action

> [!IMPORTANT]
> **Status**: Production code has **NOT** been modified.
> The fake 2.5D depth-displacement / cylinder extrusion implementation has been halted per instructions.
> 
> **Decision Point**:
> To generate the authentic watertight 3D model:
> 1. **Option A**: We can process the 4 studio photos (`front.png`, `left.png`, `right.png`, `back.png`) using an AI multi-view 3D reconstruction tool (such as Rodin, Trellis, Tripo3D, or Meshy) to produce `vikas_model.glb`.
> 2. **Option B**: If you already have a 3D model (`.glb` / `.gltf` / `.obj`) of yourself or would like to generate it with your preferred 3D software/service, you can place it into `public/assets/vikas_model.glb`.
> 
> Once the genuine 3D model `.glb` is in place, we will immediately implement `src/components/VikasModel3D.js` and connect the GSAP ScrollTrigger timeline as outlined above.
