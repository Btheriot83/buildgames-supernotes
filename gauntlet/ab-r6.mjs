import sharp from 'sharp'
import { copyFileSync, statSync } from 'fs'
const round = process.argv[2]
const desk = process.argv[3]
const bar = process.argv[4] || 'gauntlet/shots-r6/bar-supernotes-home.png'
const left = await sharp(bar).resize(1280,800,{fit:'cover',position:'top'}).png().toBuffer()
const right = await sharp(desk).resize(1280,800,{fit:'cover',position:'top'}).png().toBuffer()
const svg = Buffer.from(`<svg width="2560" height="800"><rect x="16" y="16" width="220" height="36" fill="rgba(0,0,0,0.55)"/><rect x="1296" y="16" width="180" height="36" fill="rgba(0,0,0,0.55)"/><text x="28" y="40" fill="#fff" font-size="16" font-family="system-ui" font-weight="600">BAR supernotes.app</text><text x="1308" y="40" fill="#fff" font-size="16" font-family="system-ui" font-weight="600">OURS Inkwell</text></svg>`)
await sharp({create:{width:2560,height:800,channels:3,background:{r:17,g:17,b:17}}})
  .composite([{input:left,left:0,top:0},{input:right,left:1280,top:0},{input:svg,left:0,top:0}])
  .png().toFile(`gauntlet/shots-r6/r${round}-ab.png`)
copyFileSync(bar, `gauntlet/shots-r6/r${round}-bar.png`)
console.log('ab', statSync(`gauntlet/shots-r6/r${round}-ab.png`).size)
