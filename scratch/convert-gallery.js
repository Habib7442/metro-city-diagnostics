const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/assets/gallery');
const files = ['1.png', '2.png', '3.png', '4.png'];

async function convert() {
  console.log('Starting image conversion to WebP...');
  for (const file of files) {
    const inputPath = path.join(galleryDir, file);
    const outputPath = path.join(galleryDir, file.replace('.png', '.webp'));

    if (fs.existsSync(inputPath)) {
      console.log(`Converting ${file} to WebP...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        console.log(`Successfully converted to ${path.basename(outputPath)}`);
        
        // Remove the original massive PNG to save space
        fs.unlinkSync(inputPath);
        console.log(`Removed original PNG: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
  console.log('Conversion complete!');
}

convert();
