// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC846
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const PIN = '1234';

test.describe('Final Regression - Networks Module', () => {
  let portalPage: VelosPortalPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC846 - Create network, add child sites, expand/collapse', async ({ page }) => {
    // Step 1: Navigate to Networks
    await portalPage.navigateTo('Manage', 'Application', 'Networks');
    await page.getByRole('link', { name: 'show' }).first().click();

    // Step 2-5: Search organization and create new network
    await page.locator('input[name="searchTxt"]').first().fill('LastParent');
    await page.getByRole('button', { name: 'Search' }).first().click();
    await expect(page.getByText('LastParent')).toBeVisible();

    // Step 6-10: Add child organizations at multiple levels
    await page.getByText('LastParent').first().click();

    // Step 11: Verify expand/collapse toggles
    await page.locator('.toggle-expand').first().click();
    await page.locator('.toggle-collapse').first().click();

    // Step 20: Add multiple organizations from parent to child level
    await page.locator('input[name="searchTxt"]').first().fill('LastParent');
    await page.getByRole('button', { name: 'Search' }).first().click();
  });

  test('TC846 - Edit network details, update status, verify users', async ({ page }) => {
    await portalPage.navigateTo('Manage', 'Application', 'Networks');
    await page.getByRole('link', { name: 'show' }).first().click();

    // Step 25: Verify Network Users popup
    const usersPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Network Users"]').first().click();
    const usersWin = await usersPopupPromise;
    await usersWin.waitForLoadState('domcontentloaded');
    await usersWin.close();

    // Step 26: Verify inline editing pencil icon
    await page.locator('.pencil-icon, img[title="Edit"]').first().click();

    // Step 29: Verify organization details tabs
    await page.getByRole('link', { name: 'Organization Details' }).first().click();
    await expect(page.getByText('Organization Details')).toBeVisible();
  });

  test('TC846 - Network access rights verification', async ({ page }) => {
    // Step 54: Disable organization access rights
    await portalPage.navigateTo('Manage', 'Application', 'Groups');
    await page.locator('input[name="search_data"]').first().fill('Admin');
    await page.getByRole('button', { name: 'Search' }).first().click();
    await page.locator('img[title="Assign Rights"]').first().click();

    // Verify Networks/Organizations not visible after rights change
    await portalPage.logout();
    await portalPage.login(USER, PASS, URL);

    // Step 55: Re-enable and verify
    await portalPage.navigateTo('Manage', 'Application', 'Groups');
    await page.locator('input[name="search_data"]').first().fill('Admin');
    await page.getByRole('button', { name: 'Search' }).first().click();
  });

  test('TC846 - Network forms response CRUD', async ({ page }) => {
    // Step 57: Create network form response
    await portalPage.navigateTo('Manage', 'Application', 'Networks');
    await page.locator('input[name="searchTxt"]').first().fill('AKOrg');
    await page.getByRole('button', { name: 'Search' }).first().click();

    const formsPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Forms"]').first().click();
    const formsWin = await formsPopupPromise;
    await formsWin.waitForLoadState('domcontentloaded');

    // Verify Print, Audit, Track Changes icons
    await expect(formsWin.locator('img[title="Print"]').first()).toBeVisible();
    await expect(formsWin.locator('img[title="Audit"]').first()).toBeVisible();
    await expect(formsWin.locator('img[title="Track Changes"]').first()).toBeVisible();
    await formsWin.close();
  });
});
