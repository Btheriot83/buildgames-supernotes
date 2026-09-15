import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { statSync } from 'fs'
const name = process.argv[2]
const url = process.argv[3] || 'http://127.0.0.1:5177/'
const out = 'gauntlet/shots-r4'
await mkdir(out, { recursive: true })
const b = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process'] })
try {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } })
  await p.goto(url, { waitUntil: 'commit', timeout: 25000 })
  await p.waitForTimeout(1000)
  if (/127\.0\.0\.1|localhost|buildgames/.test(url)) {
    try { await p.getByRole('button', { name: /Restore desk/i }).click({ timeout: 2500 }); await p.waitForTimeout(400) } catch {}
  }
  await p.screenshot({ path: `${out}/${name}.png`, animations: 'disabled' })
  console.log('ok', `${out}/${name}.png`, statSync(`${out}/${name}.png`).size)
} finally { await b.close() }
