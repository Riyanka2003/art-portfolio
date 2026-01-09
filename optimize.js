import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// CONFIGURATION
const TARGET_WIDTH = 1080; // Standard HD width
const QUALITY = 80; // High quality, low file size
const ASSETS_DIR = 'public/assets/**/*.+(jpg|jpeg|png)'; // Finds all images

async function optimizeImages() {
  console.log("🔍 Scanning for heavy images...");
  
  const files = await glob(ASSETS_DIR);
  
  if (files.length === 0) {
    console.log("❌ No images found! Did you move the 'assets' folder into 'public'?");
    return;
  }

  console.log(`⚡ Found ${files.length} images. Optimizing...`);

  for (const file of files) {
    const ext = path.extname(file);
    const dir = path.dirname(file);
    const name = path.basename(file, ext);
    const outputPath = path.join(dir, `${name}.webp`);

    // Skip if WebP already exists (don't re-do work)
    if (fs.existsSync(outputPath)) continue;

    try {
      await sharp(file)
        .resize(TARGET_WIDTH) // Resize to 1080p width (height auto)
        .webp({ quality: QUALITY }) // Convert to efficient WebP
        .toFile(outputPath);

      console.log(`✅ Optimized: ${name}${ext} -> ${name}.webp`);
      
      // OPTIONAL: Delete original heavy file to save space? 
      // fs.unlinkSync(file); // Uncomment this line if you want to auto-delete originals
      
    } catch (err) {
      console.error(`❌ Error with ${file}:`, err);
    }
  }
  console.log("🎉 All Done! Your portfolio is now crash-proof.");
}

optimizeImages();