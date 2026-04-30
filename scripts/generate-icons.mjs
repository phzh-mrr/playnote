// Script to generate PNG icons from the SVG source.
// Run once: node scripts/generate-icons.mjs
// Requires: npm install --save-dev sharp (in client workspace)

import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = join(__dirname, '../client/public/icon.svg')
const outDir = join(__dirname, '../client/public')
const svg = readFileSync(svgPath)

mkdirSync(outDir, { recursive: true })

const sizes = [
  { file: 'favicon-16.png',       size: 16  },
  { file: 'favicon-32.png',       size: 32  },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png',         size: 192 },
  { file: 'icon-512.png',         size: 512 },
]

for (const { file, size } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(outDir, file))
  console.log(`✓ ${file} (${size}x${size})`)
}

console.log('All icons generated.')
