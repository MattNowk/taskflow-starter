import { test, expect } from '@playwright/test'

test.describe('TaskFlow App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should add a task and display it', async ({ page }) => {
    await page.locator('#task-input').fill('Acheter du pain')
    await page.locator('#task-form button[type="submit"]').click()

    await expect(page.getByText('Acheter du pain')).toBeVisible()
  })

  test('should toggle a task as completed', async ({ page }) => {
    await page.locator('#task-input').fill('Tâche à cocher')
    await page.locator('#task-form button[type="submit"]').click()

    const firstCheckbox = page.locator('.task-checkbox').first()
    await firstCheckbox.check()
    await expect(firstCheckbox).toBeChecked()
  })

  test('should delete a task', async ({ page }) => {
    await page.locator('#task-input').fill('Tâche à supprimer')
    await page.locator('#task-form button[type="submit"]').click()

    await page.locator('.task-delete').first().click()
    await expect(page.getByText('Tâche à supprimer')).not.toBeVisible()
  })
})