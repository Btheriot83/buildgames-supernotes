import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const out = '/workspace/build-games/narrow/shots/inkwell-anshu'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()

// Local first-run (clear storage)
await page.goto('http://127.0.0.1:4177/', { waitUntil: 'networkidle' })
await page.evaluate(() => {
  localStorage.removeItem('inkwell.onboarded.v1')
  localStorage.removeItem('inkwell.onboard.step.v1')
})
await page.reload({ waitUntil: 'networkidle' })
await page.waitForSelector('[data-testid="onboarding"]', { timeout: 8000 })
await page.screenshot({ path: `${out}/01-onboard-start.png`, fullPage: false })

await page.click('[data-testid="onboard-next"]')
await page.waitForTimeout(400)
await page.screenshot({ path: `${out}/02-onboard-desk.png`, fullPage: false })

await page.click('[data-testid="onboard-next"]') // open sample
await page.waitForTimeout(500)
await page.screenshot({ path: `${out}/03-onboard-link-with-editor.png`, fullPage: false })

await page.click('[data-testid="onboard-next"]') // got linking
await page.waitForTimeout(350)
await page.click('[data-testid="onboard-next"]') // next from find
await page.waitForTimeout(350)
await page.screenshot({ path: `${out}/04-onboard-done.png`, fullPage: false })

await page.click('[data-testid="onboard-next"]') // done
await page.waitForTimeout(400)
await page.screenshot({ path: `${out}/05-desk-after-onboard.png`, fullPage: false })

// Skip path
await page.evaluate(() => {
  localStorage.removeItem('inkwell.onboarded.v1')
  localStorage.removeItem('inkwell.onboard.step.v1')
})
await page.reload({ waitUntil: 'networkidle' })
await page.waitForSelector('[data-testid="onboarding"]')
await page.click('[data-testid="onboard-skip"]')
await page.waitForTimeout(300)
await page.screenshot({ path: `${out}/06-desk-after-skip.png`, fullPage: false })

// Live prod (may already be onboarded in fresh context — clear)
const live = await context.newPage()
await live.goto('https://buildgames-supernotes.vercel.app/', { waitUntil: 'networkidle' })
await live.evaluate(() => {
  localStorage.removeItem('inkwell.onboarded.v1')
  localStorage.removeItem('inkwell.onboard.step.v1')
})
await live.reload({ waitUntil: 'networkidle' })
await live.waitForSelector('[data-testid="onboarding"]', { timeout: 12000 })
await live.screenshot({ path: `${out}/07-live-onboard.png`, fullPage: false })
await live.click('[data-testid="onboard-skip"]')
await live.waitForTimeout(400)
await live.screenshot({ path: `${out}/08-live-desk.png`, fullPage: false })

await browser.close()
console.log('shots ok')
