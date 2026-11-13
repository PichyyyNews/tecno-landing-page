const fs = require('fs');
const path = require('path');
const sharp = require('../node_modules/sharp');

const dir = path.join(__dirname, '../public/department');
const files = fs.readdirSync(dir);

async function convert() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const baseName = path.parse(file).name;
      const outputPath = path.join(dir, `${baseName}.webp`);

      console.log(`Converting ${file} -> ${baseName}.webp...`);
      const beforeStat = fs.statSync(inputPath);
      
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const afterStat = fs.statSync(outputPath);
      const reduction = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(1);
      console.log(`Done! ${Math.round(beforeStat.size / 1024)}KB -> ${Math.round(afterStat.size / 1024)}KB (${reduction}% smaller)`);
    }
  }
}

convert().catch(err => {
  console.error('Error during WebP conversion:', err);
  process.exit(1);
});
