import { chromium } from 'playwright'
import { mkdir, readFile, writeFile } from 'fs/promises'

const round = process.argv[2] || '5'
const deskUrl = process.argv[3] || 'http://127.0.0.1:5177/'
const out = 'gauntlet/shots-r4'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ headless: true })
const bar = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const desk = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await bar.goto('https://supernotes.app/', { waitUntil: 'domcontentloaded', timeout: 45000 })
await desk.goto(deskUrl, { waitUntil: 'domcontentloaded', timeout: 45000 })
await bar.waitForTimeout(1400)
await desk.waitForTimeout(800)
const restore = desk.getByRole('button', { name: /Restore desk/i })
if (await restore.count()) {
  await restore.click().catch(() => {})
  await desk.waitForTimeout(450)
}
const barPath = `${out}/r${round}-bar.png`
const deskPath = `${out}/r${round}-desk.png`
await bar.screenshot({ path: barPath, fullPage: false })
await desk.screenshot({ path: deskPath, fullPage: false })
// side-by-side via playwright evaluate + canvas
const barBuf = await readFile(barPath)
const deskBuf = await readFile(deskPath)
const page = await browser.newPage({ viewport: { width: 2560, height: 800 } })
await page.setContent(`<!doctype html><html><body style="margin:0;background:#111;display:flex">
<canvas id="c" width="2560" height="800"></canvas>
<script>
const barB64 = "data:image/png;base64,${barBuf.toString('base64')}";
const deskB64 = "data:image/png;base64,${deskBuf.toString('base64')}";
const c = document.getElementById('c');
const ctx = c.getContext('2d');
const a = new Image(); const b = new Image();
let n = 0;
function done(){ if(++n<2) return; ctx.drawImage(a,0,0,1280,800); ctx.drawImage(b,1280,0,1280,800); ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(16,16,220,36); ctx.fillRect(1296,16,180,36); ctx.fillStyle='#fff'; ctx.font='600 16px system-ui'; ctx.fillText('BAR supernotes.app',28,40); ctx.fillText('OURS Inkwell',1308,40); document.title='ready'; }
a.onload=done; b.onload=done; a.src=barB64; b.src=deskB64;
</script></body></html>`)
await page.waitForFunction(() => document.title === 'ready', { timeout: 15000 })
await page.locator('#c').screenshot({ path: `${out}/r${round}-ab.png` })
console.log('wrote', barPath, deskPath, `${out}/r${round}-ab.png`)
await browser.close()
