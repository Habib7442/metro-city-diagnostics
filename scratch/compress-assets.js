const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');

async function compress() {
  console.log('Starting image compression...');

  const targets = [
    {
      input: 'banner.png',
      output: 'banner.webp',
      options: { quality: 80, effort: 6 }
    },
    {
      input: 'metro-city-diagnostics-exterior.png',
      output: 'metro-city-diagnostics-exterior.webp',
      options: { quality: 80, effort: 6 }
    }
  ];

  for (const target of targets) {
    const inputPath = path.join(assetsDir, target.input);
    const outputPath = path.join(assetsDir, target.output);

    if (fs.existsSync(inputPath)) {
      console.log(`Compressing ${target.input} to ${target.output}...`);
      try {
        await sharp(inputPath)
          .webp(target.options)
          .toFile(outputPath);
        console.log(`Saved: ${target.output} (${fs.statSync(outputPath).size} bytes)`);
        
        // Remove the original massive file
        fs.unlinkSync(inputPath);
        console.log(`Removed original: ${target.input}`);
      } catch (err) {
        console.error(`Error processing ${target.input}:`, err);
      }
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }

  console.log('Compression complete!');
}

compress();
