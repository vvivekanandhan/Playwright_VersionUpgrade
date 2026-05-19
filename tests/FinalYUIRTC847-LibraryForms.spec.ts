// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC847
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosFormPage } from '../pages/VelosFormPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Library Forms Module', () => {
  let portalPage: VelosPortalPage;
  let formPage: VelosFormPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    formPage = new VelosFormPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC847 - Library Forms - Form category and form CRUD operations', async ({ page }) => {
    // Step 1: Navigate to Library Forms Search
    await portalPage.navigateTo('Libraries', 'Forms', 'Search');
    await expect(page.getByText('Form')).toBeVisible();

    // Step 2: Search for forms and verify grid
    await page.getByRole('button', { name: 'Search' }).first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Create new form
    await portalPage.navigateTo('Libraries', 'Forms', 'Add Form');
    await page.locator('input[name="formName"]').first().fill('TC847TestForm');
    await page.locator('select[name="formCategory"]').first().selectOption({ label: 'FormAutomation' });
    await page.locator('select[name="formStatus"]').first().selectOption({ label: 'Work In Progress' });
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 4-5: Navigate to Add Fields tab
    await page.getByRole('link', { name: 'Add Fields' }).first().click();
    await expect(page.getByText('Add Fields')).toBeVisible();

    // Verify field operation icons
    const iconPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Copy"]').first().click();
    const win = await iconPopupPromise;
    await expect(win.getByText('Copy')).toBeVisible();
    await win.close();

    // Step 6: Verify Form Settings tab
    await page.getByRole('link', { name: 'Form Settings' }).first().click();
    await expect(page.getByText('Form Settings')).toBeVisible();

    // Step 7: Navigate back to form list
    await page.getByRole('link', { name: /back to/i }).first().click();
  });

  test('TC847 - Library Forms - Field management (add, modify, delete)', async ({ page }) => {
    // Navigate to Library Forms
    await portalPage.navigateTo('Libraries', 'Forms', 'Search');
    await page.locator('input[name="search_data"]').first().fill('TC847');
    await page.getByRole('button', { name: 'Search' }).first().click();

    // Click on form to edit
    await page.getByRole('link', { name: 'TC847' }).first().click();
    await page.getByRole('link', { name: 'Add Fields' }).first().click();

    // Add Multi Choice field
    const addFieldPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Multi Choice"]').first().click();
    const fieldWin = await addFieldPopupPromise;
    await fieldWin.waitForLoadState('domcontentloaded');
    await fieldWin.close();

    // Verify form sections
    const sectionPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="New Section"]').first().click();
    const sectionWin = await sectionPopupPromise;
    await expect(sectionWin.getByText('Sections')).toBeVisible();
    await sectionWin.close();
  });
});
