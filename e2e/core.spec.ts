import { test, expect } from '@playwright/test'

test('core loop: sample cards, search, editor AI, export', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Inkwell' })).toBeVisible()
  await expect(page.getByText('SAMPLE').first()).toBeVisible()
  await page.getByPlaceholder(/Search title/).fill('Zettel')
  await expect(page.getByRole('button', { name: /Zettelkasten habit/i })).toBeVisible()
  await page.getByRole('button', { name: /Zettelkasten habit/i }).click()
  await expect(page.getByLabel('Edit notecard')).toBeVisible()
  await expect(page.getByRole('heading', { name: /Backlinks/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Tag' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Tighten' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Find links' })).toBeVisible()
  await page.getByRole('button', { name: 'Find links' }).click()
  await expect(page.getByText(/Nearby cards|Quiet desk/i)).toBeVisible({ timeout: 15000 })
  await page.getByRole('button', { name: 'Close' }).click()
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export Markdown' }).click(),
  ])
  expect(download.suggestedFilename()).toMatch(/inkwell-notes-.*\.zip/)
})
