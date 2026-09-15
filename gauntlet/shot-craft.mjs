import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { statSync } from 'fs'

const name = process.argv[2] || 'desk'
const url = process.argv[3] || 'http://127.0.0.1:4177/'
const out = process.argv[4] || '/workspace/build-games/narrow/shots/inkwell-craft'
mkdirSync(out, { recursive: true })
mkdirSync('gauntlet/shots-craft', { recursive: true })

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.setDefaultTimeout(25000)
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(900)
  // dismiss onboard if present
  try {
    const skip = page.getByTestId('onboard-skip')
    if (await skip.isVisible({ timeout: 1500 })) {
      await skip.click()
      await page.waitForTimeout(350)
    }
  } catch {}
  try {
    const btn = page.getByRole('button', { name: /Reset press|Restore/i })
    if (await btn.isVisible({ timeout: 1500 })) {
      await btn.click()
      await page.waitForTimeout(500)
    }
  } catch {}

  if (name.includes('editor') || name.includes('writing')) {
    const card = page.locator('.note-card').first()
    await card.click()
    await page.waitForTimeout(500)
  }

  const path = `${out}/${name}.png`
  await page.screenshot({ path, animations: 'disabled' })
  // mirror into repo gauntlet
  await page.screenshot({ path: `gauntlet/shots-craft/${name}.png`, animations: 'disabled' })
  console.log('ok', path, statSync(path).size)
} finally {
  await browser.close()
}
