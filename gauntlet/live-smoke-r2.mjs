import { chromium } from 'playwright'
const url = 'https://buildgames-supernotes.vercel.app'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
console.log('http', res?.status())
await page.getByRole('button', { name: 'Restore desk' }).click()
await page.waitForTimeout(500)
const sample = await page.getByText('SAMPLE').count()
const job = await page.getByLabel('What this desk does').innerText()
await page.getByPlaceholder(/Search linked cards/i).fill('diesel')
await page.waitForTimeout(300)
const match = await page.locator('.search-count').innerText().catch(() => '?')
const pump = await page.getByRole('heading', { name: 'Pump house log' }).isVisible()
await page.locator('.note-card', { has: page.getByRole('heading', { name: 'Pump house log' }) }).click()
const editor = page.getByLabel('Edit notecard')
await editor.getByRole('button', { name: 'Find links', exact: true }).click()
await editor.getByText('Nearby cards').waitFor({ timeout: 15000 })
await editor.getByRole('button', { name: 'Close', exact: true }).click()
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Export Markdown', exact: true }).click(),
])
await page.waitForTimeout(500)
await page.screenshot({ path: 'gauntlet/shots-r2/r2-live-prod-smoke.png', fullPage: false })
console.log(JSON.stringify({
  sampleCount: sample,
  job: job.replace(/\n/g, ' '),
  match,
  pump,
  zip: download.suggestedFilename(),
}, null, 2))
await browser.close()
