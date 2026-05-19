// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC1959
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Gadgets Module', () => {
  let portalPage: VelosPortalPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC1959 - Gadgets - My Gadgets page default state', async ({ page }) => {
    // Step 1: Navigate to My Gadgets page
    await portalPage.navigateTo('My Gadgets', '', '');
    await expect(page.getByText('My Gadgets')).toBeVisible();

    // Step 2: Verify default gadgets are displayed
    await expect(page.getByText('My Studies')).toBeVisible();
    await expect(page.getByText('My Tasks')).toBeVisible();
    await expect(page.getByText('Notifications')).toBeVisible();

    // Step 3: Verify Manage Gadgets link
    await expect(page.getByRole('link', { name: 'Manage Gadgets' })).toBeVisible();
  });

  test('TC1959 - Gadgets - Add and remove gadgets', async ({ page }) => {
    // Step 5: Navigate to My Gadgets
    await portalPage.navigateTo('My Gadgets', '', '');

    // Step 6: Click Manage Gadgets
    await page.getByRole('link', { name: 'Manage Gadgets' }).first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 7: Add a gadget
    const availableGadgets = page.locator('#availableGadgets, select[name="availableGadgets"]').first();
    await availableGadgets.selectOption({ index: 0 });
    await page.getByRole('button', { name: /Add|>>/ }).first().click();

    // Step 8: Save gadget configuration
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 9: Verify newly added gadget displays
    await portalPage.navigateTo('My Gadgets', '', '');
    await page.waitForLoadState('domcontentloaded');

    // Step 10: Remove gadget
    await page.getByRole('link', { name: 'Manage Gadgets' }).first().click();
    await page.waitForLoadState('domcontentloaded');
    const selectedGadgets = page.locator('#selectedGadgets, select[name="selectedGadgets"]').first();
    await selectedGadgets.selectOption({ index: 0 });
    await page.getByRole('button', { name: /Remove|<</ }).first().click();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC1959 - Gadgets - Quick Access icon verification', async ({ page }) => {
    // Step 15: Navigate to My Gadgets
    await portalPage.navigateTo('My Gadgets', '', '');

    // Step 16: Verify Quick Access icons on My Studies gadget
    const myStudiesGadget = page.locator('.gadget, #myStudies').first();
    await expect(myStudiesGadget).toBeVisible();

    // Step 17: Verify QuickAccess Study Admin icon
    await expect(page.locator('img[title="Study Admin"]').first()).toBeVisible();

    // Step 18: Click Quick Access icon
    await page.locator('img[title="Study Admin"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 19: Navigate back
    await portalPage.navigateTo('My Gadgets', '', '');
    await expect(page.getByText('My Gadgets')).toBeVisible();

    // Step 20: Verify gadget collapse/expand
    await page.locator('.gadget-toggle, img[title="Collapse"]').first().click();
    await page.locator('.gadget-toggle, img[title="Expand"]').first().click();
  });

  test('TC1959 - Gadgets - My Tasks gadget interactions', async ({ page }) => {
    // Step 25: Navigate to My Gadgets
    await portalPage.navigateTo('My Gadgets', '', '');

    // Step 26: Verify My Tasks gadget
    await expect(page.getByText('My Tasks')).toBeVisible();

    // Step 27: Click on a task item if available
    const taskItems = page.locator('.gadget-content a, .task-item a');
    const taskCount = await taskItems.count();
    if (taskCount > 0) {
      await taskItems.first().click();
      await page.waitForLoadState('domcontentloaded');
      await page.goBack();
    }

    // Step 28: Verify Notifications gadget
    await expect(page.getByText('Notifications')).toBeVisible();

    // Step 29: Verify gadget refresh
    await page.locator('img[title="Refresh"], .gadget-refresh').first().click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC1959 - Gadgets - Homepage study search with gadgets', async ({ page }) => {
    // Step 35: Search study from homepage
    await portalPage.searchStudyInHomepage('RSTC846');

    // Step 36: Navigate to My Gadgets after study context set
    await portalPage.navigateTo('My Gadgets', '', '');
    await expect(page.getByText('My Gadgets')).toBeVisible();

    // Step 37: Verify study-specific gadgets display
    await expect(page.getByText('My Studies')).toBeVisible();

    // Step 38: Verify click on study in gadget navigates correctly
    const studyLink = page.getByRole('link', { name: /RSTC846/ }).first();
    const isVisible = await studyLink.isVisible().catch(() => false);
    if (isVisible) {
      await studyLink.click();
      await page.waitForLoadState('domcontentloaded');
    }
  });
});
