import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const name = process.argv[2] || 'desk'
const url = process.argv[3] || 'http://127.0.0.1:5177/'
const out = 'gauntlet/shots-r4'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
})
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.setDefaultTimeout(20000)
  await page.goto(url, { waitUntil: 'load', timeout: 30000 })
  await page.waitForTimeout(700)
  if (/127\.0\.0\.1|localhost|buildgames-supernotes/.test(url)) {
    try {
      const btn = page.getByRole('button', { name: /Restore desk/i })
      if (await btn.isVisible({ timeout: 2000 })) {
        await btn.click()
        await page.waitForTimeout(400)
      }
    } catch {}
  }
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false })
  console.log('wrote', `${out}/${name}.png`)
} finally {
  await browser.close()
}
