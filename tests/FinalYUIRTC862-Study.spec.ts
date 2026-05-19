// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC862
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosStudyPage } from '../pages/VelosStudyPage';
import { VelosStudyDetailsPage } from '../pages/VelosStudyDetailsPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Study Module', () => {
  let portalPage: VelosPortalPage;
  let studyPage: VelosStudyPage;
  let studyDetailsPage: VelosStudyDetailsPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    studyPage = new VelosStudyPage(page);
    studyDetailsPage = new VelosStudyDetailsPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC862 - Study - Create new study with details', async ({ page }) => {
    // Step 1: Navigate to Manage Protocols > Add
    await portalPage.navigateTo('Manage', 'Protocols', 'Add');
    await expect(page.getByText('Add Protocol')).toBeVisible();

    // Step 2: Fill study details
    await studyPage.fillField('protocolNumber', 'TC862Study');
    await studyPage.fillField('protocolTitle', 'TC862 Test Study');
    await page.locator('select[name="protocolStatus"]').first().selectOption({ label: 'Active' });
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();
  });

  test('TC862 - Study - Status change workflow', async ({ page }) => {
    // Step 5: Search study
    await portalPage.navigateTo('Manage', 'Protocols', 'Search');
    await studyPage.fillField('search_data', 'TC862Study');
    await studyPage.clickSearch();

    // Step 6: Click on study and update status
    await page.getByRole('link', { name: 'TC862Study' }).first().click();
    await page.locator('select[name="protocolStatus"]').first().selectOption({ label: 'Closed' });
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 7: Verify status change
    await expect(page.locator('select[name="protocolStatus"]').first()).toHaveValue('Closed');
  });

  test('TC862 - Study - Dictionaries and custom fields', async ({ page }) => {
    // Step 10: Navigate to Study Dictionaries
    await portalPage.searchStudyInHomepage('RSTC846');
    await portalPage.navigateTo('Setup', 'Dictionaries', '');
    await expect(page.getByText('Dictionaries')).toBeVisible();

    // Step 11: Verify dictionary categories
    await page.locator('select[name="dictionaryType"]').first().selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Search' }).first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 12: Add new dictionary entry
    await page.getByRole('link', { name: /ADD/ }).first().click();
    await page.locator('input[name="entryName"]').first().fill('TC862DictEntry');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC862 - Study - Search, team, calendar and form association', async ({ page }) => {
    // Step 15: Advanced search
    await portalPage.navigateTo('Manage', 'Protocols', 'Advanced Search');
    await studyPage.verifyDefaultFilters();

    // Step 16: Search study
    await studyPage.fillField('search_data', 'RSTC846');
    await studyPage.clickSearch();
    await expect(page.getByText('RSTC846')).toBeVisible();

    // Step 17-18: Navigate to study and verify Team tab
    await portalPage.searchStudyInHomepage('RSTC846');
    await portalPage.navigateTo('Setup', 'Team', '');
    await expect(page.getByText('Team')).toBeVisible();

    // Step 19: Add team member
    await page.getByRole('link', { name: /ADD/ }).first().click();
    await page.locator('input[name="searchTxt"]').first().fill('TestAutomation');
    await page.getByRole('button', { name: 'Search' }).first().click();

    // Step 20: Verify Calendar association
    await portalPage.navigateTo('Setup', 'Calendar', '');
    await expect(page.getByText('Calendar')).toBeVisible();

    // Step 21: Verify Form association
    await portalPage.navigateTo('Setup', 'Forms', '');
    await expect(page.getByText('Forms')).toBeVisible();

    // Step 22: Verify Study Appendix
    const appendixPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Appendix"]').first().click();
    const appendixWin = await appendixPopupPromise;
    await expect(appendixWin.getByText('Appendix')).toBeVisible();
    await appendixWin.close();
  });
});
