import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '..', 'public', 'assets');

const images = [
  'book-isolated.png',
  'samurailogo.png',
  'logo.png',
  'samuraioferta.png',
  'merch.png',
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(assetsDir, img);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img} — not found`);
      continue;
    }
    const name = path.parse(img).name;
    const outputPath = path.join(assetsDir, `${name}.webp`);

    const stat = fs.statSync(inputPath);
    const sizeKB = (stat.size / 1024).toFixed(1);

    // lossless WebP for PNGs (no quality loss)
    await sharp(inputPath)
      .webp({ lossless: true, quality: 100 })
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    const outSizeKB = (outStat.size / 1024).toFixed(1);
    const pct = ((1 - outStat.size / stat.size) * 100).toFixed(1);

    console.log(`${img}: ${sizeKB}KB → ${outSizeKB}KB (${pct}% smaller)`);
  }

  // Also convert hero-bg.jpg to WebP (lossy, high quality)
  const jpgInput = path.join(assetsDir, 'hero-bg.jpg');
  if (fs.existsSync(jpgInput)) {
    const jpgOutput = path.join(assetsDir, 'hero-bg.webp');
    const stat = fs.statSync(jpgInput);
    const sizeKB = (stat.size / 1024).toFixed(1);

    await sharp(jpgInput)
      .webp({ quality: 85 })
      .toFile(jpgOutput);

    const outStat = fs.statSync(jpgOutput);
    const outSizeKB = (outStat.size / 1024).toFixed(1);
    const pct = ((1 - outStat.size / stat.size) * 100).toFixed(1);
    console.log(`hero-bg.jpg: ${sizeKB}KB → ${outSizeKB}KB (${pct}% smaller)`);
  }

  // Also convert book.jpg
  const bookJpgInput = path.join(assetsDir, 'book.jpg');
  if (fs.existsSync(bookJpgInput)) {
    const bookJpgOutput = path.join(assetsDir, 'book.webp');
    const stat = fs.statSync(bookJpgInput);
    const sizeKB = (stat.size / 1024).toFixed(1);

    await sharp(bookJpgInput)
      .webp({ quality: 85 })
      .toFile(bookJpgOutput);

    const outStat = fs.statSync(bookJpgOutput);
    const outSizeKB = (outStat.size / 1024).toFixed(1);
    const pct = ((1 - outStat.size / stat.size) * 100).toFixed(1);
    console.log(`book.jpg: ${sizeKB}KB → ${outSizeKB}KB (${pct}% smaller)`);
  }
}

optimize().catch(console.error);
