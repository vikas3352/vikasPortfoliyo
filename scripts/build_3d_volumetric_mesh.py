import os
import json
import numpy as np
from PIL import Image

def build_3d_volumetric_mesh():
    base_dir = "public/assets/studio_3d"
    front_path = os.path.join(base_dir, "front.png")
    left_path = os.path.join(base_dir, "left.png")
    right_path = os.path.join(base_dir, "right.png")
    back_path = os.path.join(base_dir, "back.png")

    print("Loading 4 orthogonal studio photos...")
    front_img = Image.open(front_path)
    left_img = Image.open(left_path)
    right_img = Image.open(right_path)
    back_img = Image.open(back_path)

    W, H = front_img.size  # 1024, 1536
    f_alpha = np.array(front_img)[:, :, 3] > 20
    b_alpha = np.array(back_img)[:, :, 3] > 20
    l_alpha = np.array(left_img)[:, :, 3] > 20
    r_alpha = np.array(right_img)[:, :, 3] > 20

    # Find global vertical bounds
    f_rows = np.where(f_alpha.max(axis=1))[0]
    top_y = max(0, f_rows[0] - 5)
    bottom_y = min(H - 1, f_rows[-1] + 5)
    total_h = bottom_y - top_y

    print(f"Human height range: rows {top_y} to {bottom_y} ({total_h} pixels)")

    # 3D Mesh parameters
    NUM_SLICES = 128      # Vertical resolution
    NUM_RADIAL = 48       # Radial resolution around each slice
    MODEL_HEIGHT = 2.45   # Three.js world units
    SCALE = MODEL_HEIGHT / total_h

    vertices = []
    normals = []
    uvs = []
    indices = []

    # Center axis of body in front image (horizontal center)
    center_x_front = W / 2.0
    # Center axis of body in left image (depth center)
    center_x_left = W / 2.0

    # Build rings from head (top) to feet (bottom)
    for slice_idx in range(NUM_SLICES):
        v_norm = slice_idx / (NUM_SLICES - 1)  # 0 at top, 1 at bottom
        img_y = int(top_y + v_norm * total_h)
        img_y = min(H - 1, max(0, img_y))

        # Three.js Y coordinate (centered at y=0)
        world_y = (1.0 - v_norm - 0.5) * MODEL_HEIGHT

        # Front silhouette bounds
        f_cols = np.where(f_alpha[img_y, :])[0]
        if len(f_cols) > 0:
            f_min, f_max = f_cols[0], f_cols[-1]
            rx = max(0.015, (f_max - f_min) / 2.0 * SCALE)
            cx = ((f_min + f_max) / 2.0 - center_x_front) * SCALE
        else:
            rx = 0.015
            cx = 0.0

        # Left silhouette bounds (depth)
        l_cols = np.where(l_alpha[img_y, :])[0]
        if len(l_cols) > 0:
            l_min, l_max = l_cols[0], l_cols[-1]
            # Left image: facing left (-X). Width in image corresponds to depth in Z
            rz = max(0.015, (l_max - l_min) / 2.0 * SCALE)
            cz = ((l_min + l_max) / 2.0 - center_x_left) * SCALE
        else:
            rz = 0.015
            cz = 0.0

        # Create radial vertices for this ring
        for r_idx in range(NUM_RADIAL):
            theta = 2.0 * np.pi * (r_idx / NUM_RADIAL)
            # Superellipse exponent (p=2.2 gives natural human cross section)
            cos_t = np.cos(theta)
            sin_t = np.sin(theta)
            p = 2.2
            dx = rx * np.sign(cos_t) * (abs(cos_t) ** (2.0 / p))
            dz = rz * np.sign(sin_t) * (abs(sin_t) ** (2.0 / p))

            vx = cx + dx
            vy = world_y
            vz = cz + dz

            # Normal vector approximation
            nx = dx / (rx ** 2) if rx > 0 else 0
            nz = dz / (rz ** 2) if rz > 0 else 0
            n_len = np.sqrt(nx * nx + nz * nz + 0.001)
            nx /= n_len
            nz /= n_len
            ny = 0.0

            vertices.extend([round(float(vx), 5), round(float(vy), 5), round(float(vz), 5)])
            normals.extend([round(float(nx), 4), round(float(ny), 4), round(float(nz), 4)])

            # UV coordinate: u = theta / 2pi, v = 1 - v_norm
            u = r_idx / NUM_RADIAL
            v = 1.0 - v_norm
            uvs.extend([round(float(u), 4), round(float(v), 4)])

    # Generate face indices (quads split into 2 triangles)
    for s in range(NUM_SLICES - 1):
        for r in range(NUM_RADIAL):
            r_next = (r + 1) % NUM_RADIAL
            p0 = s * NUM_RADIAL + r
            p1 = s * NUM_RADIAL + r_next
            p2 = (s + 1) * NUM_RADIAL + r
            p3 = (s + 1) * NUM_RADIAL + r_next

            # Two triangles: (p0, p2, p1) and (p1, p2, p3)
            indices.extend([p0, p2, p1, p1, p2, p3])

    print(f"Generated 3D mesh: {len(vertices)//3} vertices, {len(indices)//3} triangles.")

    # Save as JSON for direct Three.js loading
    mesh_data = {
        "vertices": vertices,
        "normals": normals,
        "uvs": uvs,
        "indices": indices,
        "height": MODEL_HEIGHT,
        "aspect": W / H,
    }
    json_path = os.path.join(base_dir, "vikas_3d_body.json")
    with open(json_path, "w") as f:
        json.dump(mesh_data, f)
    print(f"Saved Three.js buffer geometry: {json_path} ({os.path.getsize(json_path)} bytes)")

    # Also export as standard OBJ for 3D viewers
    obj_path = os.path.join(base_dir, "vikas_3d_body.obj")
    with open(obj_path, "w") as f:
        f.write("# Vikas Jangid 3D Body Mesh from Orthogonal Studio Photos\n")
        f.write(f"# Vertices: {len(vertices)//3}, Faces: {len(indices)//3}\n")
        for i in range(0, len(vertices), 3):
            f.write(f"v {vertices[i]} {vertices[i+1]} {vertices[i+2]}\n")
        for i in range(0, len(uvs), 2):
            f.write(f"vt {uvs[i]} {uvs[i+1]}\n")
        for i in range(0, len(normals), 3):
            f.write(f"vn {normals[i]} {normals[i+1]} {normals[i+2]}\n")
        for i in range(0, len(indices), 3):
            # OBJ is 1-indexed: v/vt/vn
            i0, i1, i2 = indices[i]+1, indices[i+1]+1, indices[i+2]+1
            f.write(f"f {i0}/{i0}/{i0} {i1}/{i1}/{i1} {i2}/{i2}/{i2}\n")
    print(f"Saved Wavefront OBJ: {obj_path} ({os.path.getsize(obj_path)} bytes)")

if __name__ == "__main__":
    build_3d_volumetric_mesh()
