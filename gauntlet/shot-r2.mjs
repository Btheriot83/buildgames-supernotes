import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const out = 'gauntlet/shots-r2'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto('http://127.0.0.1:4177/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Restore desk' }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: `${out}/r2-desk-job-strip.png`, fullPage: false })

await page.getByPlaceholder(/Search linked cards/i).fill('diesel')
await page.waitForTimeout(250)
await page.screenshot({ path: `${out}/r2-search-diesel.png`, fullPage: false })

await page.getByRole('button', { name: /Pump house log/i }).first().click()
await page.waitForTimeout(400)
await page.screenshot({ path: `${out}/r2-editor-links.png`, fullPage: false })
await page.getByRole('button', { name: 'Close' }).click()
await page.getByRole('button', { name: 'Clear' }).click().catch(() => {})
await page.waitForTimeout(200)
await page.screenshot({ path: `${out}/r2-wiki-chips.png`, fullPage: false })

await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Export Markdown' }).click(),
])
await page.waitForTimeout(350)
await page.screenshot({ path: `${out}/r2-export-success.png`, fullPage: false })
console.log('shots ok')
await browser.close()
