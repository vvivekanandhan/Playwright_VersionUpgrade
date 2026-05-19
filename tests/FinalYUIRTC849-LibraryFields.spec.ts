// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC849
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Library Fields Module', () => {
  let portalPage: VelosPortalPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC849 - Library Fields - Search, add, edit, delete field categories', async ({ page }) => {
    // Step 1: Navigate to Library > Fields > Field Categories
    await portalPage.navigateTo('Libraries', 'Fields', 'Field Categories');
    await expect(page.getByText('Field Categories')).toBeVisible();

    // Step 2: Add new field category
    await page.getByRole('link', { name: /ADD A/ }).first().click();
    await page.locator('input[name="categoryName"]').first().fill('TC849Category');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 3: Verify newly created category in list
    await expect(page.getByText('TC849Category')).toBeVisible();

    // Step 4: Edit field category name
    await page.getByText('TC849Category').first().click();
    await page.locator('input[name="categoryName"]').first().fill('TC849CategoryRenamed');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 5: Delete field category
    page.on('dialog', d => d.accept());
    await page.locator(`//td[contains(text(),'TC849CategoryRenamed')]//following::img[@title='Delete']`).first().click();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC849 - Library Fields - Search fields, verify field types', async ({ page }) => {
    // Step 6: Navigate to Library Fields Search
    await portalPage.navigateTo('Libraries', 'Fields', 'Search');
    await expect(page.getByText('Field Search')).toBeVisible();

    // Step 7: Search for fields
    await page.getByRole('button', { name: 'Search' }).first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('table.dataGrid').first()).toBeVisible();

    // Step 8-11: Navigate to Add New Field page, verify field types
    await portalPage.navigateTo('Libraries', 'Fields', 'Add Field');
    await expect(page.getByText('Add Field')).toBeVisible();

    // Verify field type dropdown options
    const fieldTypes = ['Edit Box', 'Multi Choice', 'Checkbox', 'Text Area', 'Label'];
    for (const ft of fieldTypes) {
      await expect(page.locator('select[name="fieldType"]').first()).toContainText(ft);
    }

    // Step 12: Create a new field
    await page.locator('input[name="fieldName"]').first().fill('TC849Field');
    await page.locator('select[name="fieldCategory"]').first().selectOption({ index: 1 });
    await page.locator('select[name="fieldType"]').first().selectOption({ label: 'Edit Box' });
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();
  });

  test('TC849 - Library Fields - Link field to form linked to study', async ({ page }) => {
    // Step 14-16: Navigate to Library Forms, search for form, add field
    await portalPage.navigateTo('Libraries', 'Forms', 'Search');
    await page.locator('input[name="search_data"]').first().fill('TC849');
    await page.getByRole('button', { name: 'Search' }).first().click();

    // Step 17: Select form and add field from library
    await page.getByRole('link', { name: /TC849/ }).first().click();
    await page.getByRole('link', { name: 'Add Fields' }).first().click();

    const libraryPopupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'SELECT FROM YOUR LIBRARY' }).first().click();
    const libraryWin = await libraryPopupPromise;
    await libraryWin.waitForLoadState('domcontentloaded');

    // Search field in library
    await libraryWin.locator('input[name="search_data"]').first().fill('TC849Field');
    await libraryWin.getByRole('button', { name: 'Search' }).first().click();
    await libraryWin.close();
  });
});
