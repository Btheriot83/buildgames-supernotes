import sharp from 'sharp'
import { statSync } from 'fs'
const live = process.argv[2]
const dream = process.argv[3] || 'gauntlet/shots-r6/dream-target.png'
const out = process.argv[4] || 'gauntlet/shots-r6/r10-dream-vs-live.png'
const left = await sharp(dream).resize(1280,800,{fit:'cover',position:'top'}).png().toBuffer()
const right = await sharp(live).resize(1280,800,{fit:'cover',position:'top'}).png().toBuffer()
const svg = Buffer.from(`<svg width="2560" height="800"><rect x="16" y="16" width="160" height="36" fill="rgba(0,0,0,0.55)"/><rect x="1296" y="16" width="160" height="36" fill="rgba(0,0,0,0.55)"/><text x="28" y="40" fill="#fff" font-size="16" font-family="system-ui" font-weight="600">DREAM target</text><text x="1308" y="40" fill="#fff" font-size="16" font-family="system-ui" font-weight="600">LIVE desk</text></svg>`)
await sharp({create:{width:2560,height:800,channels:3,background:{r:17,g:17,b:17}}})
  .composite([{input:left,left:0,top:0},{input:right,left:1280,top:0},{input:svg,left:0,top:0}])
  .png().toFile(out)
console.log('dream-vs', statSync(out).size)
