import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { statSync } from 'fs'

const name = process.argv[2] || 'desk'
const url = process.argv[3] || 'http://127.0.0.1:5177/'
const out = 'gauntlet/shots-r5'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process'],
})
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.setDefaultTimeout(25000)
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(1200)
  if (/127\.0\.0\.1|localhost|buildgames-supernotes/.test(url)) {
    try {
      const btn = page.getByRole('button', { name: /Restore desk/i })
      if (await btn.isVisible({ timeout: 2500 })) {
        await btn.click()
        await page.waitForTimeout(500)
      }
    } catch {}
  }
  await page.screenshot({ path: `${out}/${name}.png`, animations: 'disabled' })
  console.log('ok', `${out}/${name}.png`, statSync(`${out}/${name}.png`).size)
} finally {
  await browser.close()
}
