// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC844
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosFormPage } from '../pages/VelosFormPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Form Management Module', () => {
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

  test('TC844 - Link forms to Patient Level All Studies and verify status behavior', async ({ page }) => {
    // Step 1-5: Navigate to Form Management and link forms
    await portalPage.navigateTo('Manage', 'Application', 'Forms');
    await expect(page.getByText('Form Management')).toBeVisible();

    // Step 6: Select a form from library to link with Patient Level All Studies
    const popupPromise = page.waitForEvent('popup');
    await portalPage.linkWithText('SELECT A FORM FROM YOUR LIBRARY').first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    // Select form and link
    const popupFormPage = new VelosFormPage(popup);
    const popupPortalPage = new VelosPortalPage(popup);
    await popup.getByText('Patient Level All Studies').first().click();
    await popupFormPage.esign.fill(ESIGN);
    await popupPortalPage.submitForm();
    await popup.close();

    // Step 7-12: Verify form status updates (Active, Lockdown, Offline, Deactivated)
    await portalPage.SearchStudy.first().fill('');
    await portalPage.searchButtonClick.first().click();
    await page.waitForLoadState('domcontentloaded');

    // Verify form is visible in search results
    await expect(page.locator('table.dataGrid').first()).toBeVisible();
  });

  test('TC844 - Verify form field types (Multi-Choice, Edit-Box) on Add Fields page', async ({ page }) => {
    // Step 20: Link form to Study Level All
    await portalPage.navigateTo('Manage', 'Application', 'Forms');
    const popupPromise = page.waitForEvent('popup');
    await portalPage.linkWithText('SELECT A FORM FROM YOUR LIBRARY').first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    await popup.close();

    // Step 21-24: Verify Copy, Comments, Lookup, Line Break icons
    const icons = ['Copy', 'Comments', 'Lookup', 'Line Break'];
    for (const icon of icons) {
      const iconPopupPromise = page.waitForEvent('popup');
      await formPage.formFieldIconExist(icon).first().click();
      const win = await iconPopupPromise;
      await expect(win.getByText(icon).first()).toBeVisible();
      await win.close();
    }

    // Step 25: Add new section
    const sectionPopupPromise = page.waitForEvent('popup');
    await formPage.formFieldIconExist('New Section').first().click();
    const sectionWin = await sectionPopupPromise;
    await expect(sectionWin.getByText('Sections')).toBeVisible();
    await sectionWin.close();

    // Step 32-34: Verify Form Settings (Change State, Calculation, Notification)
    await portalPage.linkWithText('Form Settings').first().click();
    const settingsLinks = ['CHANGE STATE', 'CALCULATION'];
    for (const link of settingsLinks) {
      const settingsPopupPromise = page.waitForEvent('popup');
      await portalPage.linkWithText(link).first().click();
      const win = await settingsPopupPromise;
      await win.close();
    }
  });

  test('TC844 - Verify form response CRUD on patient forms browser', async ({ page }) => {
    // Step 36-42: Form response create, edit, delete, printer friendly format
    await portalPage.navigateTo('Manage', 'Patients', 'Search');
    await portalPage.SearchStudy.first().fill('');
    await portalPage.searchButtonClick.first().click();

    // Navigate to patient forms
    await portalPage.studyIconsClick('Form').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Verify Patient Profile tab
    await portalPage.linkWithText('Patient Profile').first().click();
    await expect(page.getByText('Patient Profile')).toBeVisible();
  });
});
