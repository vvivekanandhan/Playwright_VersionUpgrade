// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC850
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosApplicationPage } from '../pages/VelosApplicationPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Application Module', () => {
  let portalPage: VelosPortalPage;
  let appPage: VelosApplicationPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    appPage = new VelosApplicationPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC850 - Application - Organizations CRUD', async ({ page }) => {
    // Step 1: Navigate to Manage > Application > Organizations
    await portalPage.navigateTo('Manage', 'Application', 'Organizations');
    await expect(page.getByText('Organization')).toBeVisible();

    // Step 2: Search Content
    await appPage.searchContent('TC850Org');

    // Step 3-5: Create new Sponsor Organization
    await appPage.createOrganization('TC850OrgSponsor', 'Sponsor');
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 6: Edit Organization
    await page.getByRole('link', { name: 'TC850OrgSponsor' }).first().click();
    await page.locator('input[name="organizationNameTxt"]').first().fill('TC850OrgSponsorEdited');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 7: Verify Appendix popup
    const appendixPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Appendix"]').first().click();
    const appendixWin = await appendixPopupPromise;
    await expect(appendixWin.getByText('Appendix')).toBeVisible();
    await appendixWin.close();

    // Step 8: Verify Forms popup
    const formsPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Forms"]').first().click();
    const formsWin = await formsPopupPromise;
    await expect(formsWin.getByText('Form')).toBeVisible();
    await formsWin.close();

    // Step 9: Delete organization
    page.on('dialog', d => d.accept());
    await page.locator(`//td[contains(text(),'TC850OrgSponsorEdited')]//following::img[@title='Delete']`).first().click();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC850 - Application - Groups and User Management', async ({ page }) => {
    // Step 10-15: Navigate to Groups
    await portalPage.navigateTo('Manage', 'Application', 'Groups');
    await expect(page.getByText('Group')).toBeVisible();

    // Search existing groups
    await page.locator('input[name="search_data"]').first().fill('Admin');
    await page.getByRole('button', { name: 'Search' }).first().click();
    await expect(page.getByText('Admin')).toBeVisible();

    // Step 16: Create new group
    await appPage.createGroup('TC850TestGroup');

    // Step 18: Assign rights to group
    await page.locator(`//td[contains(text(),'TC850TestGroup')]//following::img[@title='Assign Rights']`).first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 20-21: Navigate to Users
    await portalPage.navigateTo('Manage', 'Application', 'Users');
    await expect(page.getByText('User')).toBeVisible();

    // Step 22: Search users
    await page.locator('input[name="search_data"]').first().fill('TestAutomation');
    await page.getByRole('button', { name: 'Search' }).first().click();

    // Step 23: Create new user
    await appPage.createUser('TC850User', 'TC850', 'User', 'Velos123', ESIGN);
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();
  });

  test('TC850 - Application - Links CRUD', async ({ page }) => {
    // Step 30: Navigate to Links
    await portalPage.navigateTo('Manage', 'Application', 'Links');
    await expect(page.getByText('Links')).toBeVisible();

    // Step 31: Add new link
    await appPage.addNewLink('TestLink850', 'http://www.Velos.com');
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 32: Edit link
    await page.getByRole('link', { name: 'TestLink850' }).first().click();
    await page.locator('input[name="url"]').first().fill('http://www.centerwatch.com');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 33: Delete link
    page.on('dialog', d => d.accept());
    await page.locator(`//td[contains(text(),'TestLink850')]//following::img[@title='Delete']`).first().click();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });
});
