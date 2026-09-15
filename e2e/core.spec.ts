import { test, expect } from '@playwright/test'

test('core loop: linked cards, search, editor AI, export', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Inkwell' })).toBeVisible()
  await expect(page.getByText('SAMPLE')).toHaveCount(0)
  await expect(page.getByLabel('What this desk does')).toContainText('Export Markdown')
  await expect(page.getByRole('heading', { name: 'Verde River morning' })).toBeVisible()
  await page.getByPlaceholder(/Search linked cards/i).fill('diesel')
  await expect(page.getByRole('heading', { name: 'Pump house log' })).toBeVisible()
  await page.locator('.note-card', { has: page.getByRole('heading', { name: 'Pump house log' }) }).click()
  const editor = page.getByLabel('Edit notecard')
  await expect(editor).toBeVisible()
  await expect(editor.getByRole('heading', { name: /Backlinks/ })).toBeVisible()
  await expect(editor.getByRole('button', { name: 'Tag', exact: true })).toBeVisible()
  await expect(editor.getByRole('button', { name: 'Tighten', exact: true })).toBeVisible()
  await expect(editor.getByRole('button', { name: 'Find links', exact: true })).toBeVisible()
  await editor.getByRole('button', { name: 'Find links', exact: true }).click()
  await expect(editor.getByText(/Nearby cards|Quiet desk/i)).toBeVisible({ timeout: 15000 })
  await editor.getByRole('button', { name: 'Close', exact: true }).click()
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export Markdown', exact: true }).click(),
  ])
  expect(download.suggestedFilename()).toMatch(/inkwell-notes-.*\.zip/)
})
