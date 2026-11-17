import os
import glob
from PIL import Image
from rembg import remove, new_session

def process_all_angles():
    output_dir = "public/assets/portrait_3d"
    os.makedirs(output_dir, exist_ok=True)

    angle_mapping = [
        ("WhatsApp Image 2026-09-22 at 12.51.15 PM (1).jpeg", "left_90.png", "Left Profile (-90 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.15 PM.jpeg", "front_0.png", "Front View (0 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.16 PM (1).jpeg", "right_45.png", "Front Right 3/4 (+45 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.16 PM.jpeg", "right_90.png", "Right Profile (+90 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.17 PM (2).jpeg", "right_135.png", "Rear Right 3/4 (+135 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.17 PM.jpeg", "back_180.png", "Full Back View (180 deg)"),
        ("WhatsApp Image 2026-09-22 at 12.51.17 PM (1).jpeg", "left_135.png", "Rear Left 3/4 (-135 deg)"),
    ]

    print("Initializing rembg session...")
    session = new_session("u2net_human_seg")

    for src_name, out_name, label in angle_mapping:
        src_path = os.path.join("public/assets", src_name)
        out_path = os.path.join(output_dir, out_name)

        if not os.path.exists(src_path):
            print(f"Warning: {src_path} not found, skipping.")
            continue

        print(f"Processing {label}: {src_name} -> {out_name}...")
        input_image = Image.open(src_path)
        
        # Remove background with human segmentation model
        output_image = remove(input_image, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15)
        
        # Save output PNG with alpha channel
        output_image.save(out_path, format="PNG", optimize=True)
        print(f"✓ Saved {out_path} ({output_image.size})")

    print("\nAll angles processed successfully into public/assets/portrait_3d/!")

if __name__ == "__main__":
    process_all_angles()
