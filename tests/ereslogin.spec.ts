import { test, expect } from '@playwright/test';

test('eResearch Login test', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://ctrlv13.veloseresearch.com/velos/jsp/ereslogin.jsp');

  // Enter username
  await page.fill('input[name="username"]', 'jupiter1');

  // Enter password
  await page.fill('input[name="password"]', 'Velos@123');

  // Click login button
  await page.click('button[type="submit"]');
  await page.waitForLoadState('domcontentloaded');
  if (await page.getByText('You are currently logged in').isVisible()) {
    await page.getByRole('button', { name: 'Ok' }).click();
  }

  await page.getByRole('link', { name: 'Manage', exact: true }).click();
  await page.locator('.submenu ul').filter({ hasText: 'Patients' }).getByRole('link', { name: 'New' }).click();
  const patientId = `ewplaywright${Date.now()}${Math.floor(Math.random() * 1000)}`;
  await page.locator('#patid').fill(patientId);
  await page.locator('#patdob').click();
  await page.getByRole('button', { name: 'Today' }).click();
  await page.locator('#eSign').click();
  await page.locator('#eSign').fill('1234');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});
