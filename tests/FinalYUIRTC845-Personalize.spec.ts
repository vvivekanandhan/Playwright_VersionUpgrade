// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC845
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'wcgReg';
const PASS = 'Velos@123';
const PIN = '1234';

test.describe('Final Regression - Personalize Module', () => {
  let portalPage: VelosPortalPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
  });

  test('TC845 - Edit User Profile and Appendix CRUD', async ({ page }) => {
    await portalPage.login(USER, PASS, URL);

    // Step 1: Navigate to Profile and edit user details
    await portalPage.navigateTo('Personalize', '', 'Profile');
    await expect(page.getByText('User Details')).toBeVisible();
    await page.locator('input[name="postalCode"]').first().fill('20978');

    // Step 2: Submit with security PIN
    await page.locator('#eSign').first().fill(PIN);
    await portalPage.submitDetails();

    // Step 6: Add My Link in Appendix
    const appendixPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Appendix"]').first().click();
    const appendixWin = await appendixPopupPromise;
    await appendixWin.getByRole('link', { name: /CLICK HERE/i }).first().click();
    await appendixWin.locator('input[name="url"]').first().fill('http://www.centerwatch.com');
    await appendixWin.locator('#eSign').first().fill(PIN);
    await appendixWin.locator('#submit_btn').first().click();

    // Step 7: Edit link
    await appendixWin.locator('img[title="Edit"]').first().click();
    await appendixWin.locator('input[name="url"]').first().fill('http://www.Velos.com');
    await appendixWin.locator('#eSign').first().fill(PIN);
    await appendixWin.locator('#submit_btn').first().click();

    // Step 8: Delete link
    appendixWin.on('dialog', d => d.accept());
    await appendixWin.locator('img[title="Delete"]').first().click();
    await appendixWin.close();
  });

  test('TC845 - Form Responses (Single and Multiple Entry)', async ({ page }) => {
    await portalPage.login(USER, PASS, URL);
    await portalPage.navigateTo('Personalize', '', 'Profile');

    // Step 9: Open Forms window, create multiple entry form response
    const formsPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Forms"]').first().click();
    const formsWin = await formsPopupPromise;
    await formsWin.locator('select[name="formName"]').first().selectOption({ label: 'FinalTC845' });
    await formsWin.getByRole('button', { name: 'New' }).first().click();
    await formsWin.locator('input[name="dataEntryDate"]').first().fill('07/15/2021');
    await formsWin.locator('#eSign').first().fill(PIN);
    await formsWin.locator('#submit_btn').first().click();

    // Step 10: Edit form response
    await formsWin.getByRole('link', { name: '07/15/2021' }).first().click();
    await formsWin.locator('input[name="dataEntryDate"]').first().fill('07/17/2021');
    await formsWin.locator('#eSign').first().fill(PIN);
    await formsWin.locator('#submit_btn').first().click();

    // Step 11: Delete form response
    formsWin.on('dialog', d => d.accept());
    await formsWin.locator('img[title="Delete"]').first().click();
    await formsWin.locator('#eSign').first().fill(PIN);
    await formsWin.locator('#submit_btn').first().click();
    await formsWin.close();
  });

  test('TC845 - My Links CRUD and New Trials', async ({ page }) => {
    await portalPage.login(USER, PASS, URL);

    // Step 15: Navigate to Links, add new link
    await portalPage.navigateTo('Personalize', '', 'Links');
    await expect(page.getByText('Links')).toBeVisible();
    await page.getByRole('link', { name: 'ADD NEW LINKS' }).first().click();
    await page.locator('input[name="url"]').first().fill('http://www.Velos.com');
    await page.locator('#eSign').first().fill(PIN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 17: Delete link
    page.on('dialog', d => d.accept());
    await page.locator(`//td[contains(text(),'http://www.Velos.com')]//following::img[@title='Delete']`).first().click();
    await page.locator('#eSign').first().fill(PIN);
    await portalPage.submitDetails();

    // New Trials
    await portalPage.navigateTo('Personalize', '', 'New Trials');
  });

  test('TC845 - Default Homepage Validation', async ({ page }) => {
    const USER2 = 'FinalTC845';
    const PASS2 = 'Velos123';
    await portalPage.login(USER2, PASS2, URL);

    const homepages = [
      { name: 'Ad Hoc Query Home', verify: 'Ad Hoc' },
      { name: 'Budget > Open', verify: 'Budget Browser' },
      { name: 'Manage Patients > Enrolled', verify: 'Study Patients' },
      { name: 'Manage Patients > Open', verify: 'Patient Search' },
      { name: 'Manage Patients > Schedule', verify: 'Patient Schedules' },
      { name: 'Manage Protocols > Advanced Search', verify: 'Search' },
      { name: 'Milestones', verify: 'Financials Browser' },
      { name: 'My HomePage', verify: 'Homepage' },
      { name: 'Report Central', verify: 'Report Central' },
      { name: 'My Gadgets', verify: 'My Gadgets' },
    ];

    for (const hp of homepages) {
      await portalPage.navigateTo('Personalize', '', 'Settings');
      await page.locator('select[name="defaultHomepage"]').first().selectOption({ label: hp.name });
      await page.locator('#eSign').first().fill(PIN);
      await portalPage.submitDetails();
      await portalPage.logout();
      await portalPage.login(USER2, PASS2, URL);
      await expect(page.getByText(hp.verify, { exact: false }).first()).toBeVisible();
    }
  });

  test('TC845 - Password/Security PIN update', async ({ page }) => {
    const USER2 = 'FinalTC845';
    const PASS2 = 'Velos123';
    await portalPage.login(USER2, PASS2, URL);

    // Step 24: Navigate to Password/Security PIN
    await portalPage.navigateTo('Personalize', '', 'Password/Security PIN');
    const criteriaPopupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Criteria for selecting a password' }).first().click();
    const criteriaWin = await criteriaPopupPromise;
    await expect(criteriaWin.getByText('Criteria for choosing a valid password')).toBeVisible();
    await criteriaWin.close();

    // Step 26: Update Security PIN
    await page.locator('input[name="currentSecurityPin"]').first().fill(PIN);
    await page.locator('input[name="newSecurityPin"]').first().fill('2345');
    await page.locator('input[name="confirmSecurityPin"]').first().fill('2345');
    await page.locator('#eSign').first().fill(PIN);
    await portalPage.submitDetails();

    // Revert Security PIN
    await page.locator('input[name="currentSecurityPin"]').first().fill('2345');
    await page.locator('input[name="newSecurityPin"]').first().fill(PIN);
    await page.locator('input[name="confirmSecurityPin"]').first().fill(PIN);
    await page.locator('#eSign').first().fill('2345');
    await portalPage.submitDetails();
    await expect(page.getByText('Your new Security PIN will be applicable immediately')).toBeVisible();
  });
});
