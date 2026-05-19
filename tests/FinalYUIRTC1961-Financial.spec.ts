// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC1961
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosFinancialPage } from '../pages/VelosFinancialPage';
import { VelosMilestonesPage } from '../pages/VelosMilestonesPage';

const URL = 'https://ctrlval-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';
const STUDY = 'RSTC846';

test.describe('Final Regression - Financial Module', () => {
  let portalPage: VelosPortalPage;
  let financialPage: VelosFinancialPage;
  let milestonesPage: VelosMilestonesPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    financialPage = new VelosFinancialPage(page);
    milestonesPage = new VelosMilestonesPage(page);
    await portalPage.login(USER, PASS, URL);
    await portalPage.searchStudyInHomepage(STUDY);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC1961 - Financial - Milestones CRUD', async ({ page }) => {
    // Step 1: Navigate to Financials > Milestones
    await portalPage.navigateTo('Financials', 'Milestones', '');
    await expect(page.getByText('Financials Browser')).toBeVisible();

    // Step 2: Navigate to Milestone tab
    await financialPage.navigateToTab('Milestones');

    // Step 3: Add milestone rows
    await financialPage.addMilestoneRows(2);

    // Step 4: Set milestone dropdown values
    await financialPage.setMilestoneDropdownValue(1, 'Type', 'Study');
    await financialPage.setMilestoneInputValue(1, 'Description', 'TC1961Milestone1');
    await financialPage.setMilestoneInputValue(1, 'Amount', '1000');

    // Step 5: Preview and save milestones
    await financialPage.previewAndSaveMilestones(ESIGN);
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 6: Verify milestone is displayed
    await financialPage.verifyMilestoneDisplayed('TC1961Milestone1');

    // Step 7: Expand milestone rule
    await financialPage.expandMilestoneRule('TC1961Milestone1');
  });

  test('TC1961 - Financial - Achievements and Notifications', async ({ page }) => {
    // Step 10: Navigate to Financials > Milestones
    await portalPage.navigateTo('Financials', 'Milestones', '');

    // Step 11: Navigate to Achievements tab
    await financialPage.navigateToTab('Achievements');
    await expect(page.getByText('Achievements')).toBeVisible();

    // Step 12: Search milestone field
    await financialPage.searchMilestoneField('TC1961Milestone1');

    // Step 13: Verify Exclude Inactive checkbox
    await financialPage.verifyExcludeInactiveChecked();

    // Step 14: Uncheck Exclude Inactive
    await financialPage.uncheckExcludeInactive();

    // Step 15: Navigate to Notifications tab
    await financialPage.navigateToTab('Notifications');
    await expect(page.getByText('Notifications')).toBeVisible();
  });

  test('TC1961 - Financial - Invoicing workflow', async ({ page }) => {
    // Step 20: Navigate to Financials > Invoicing
    await portalPage.navigateTo('Financials', 'Invoicing', '');
    await expect(page.getByText('Invoicing')).toBeVisible();

    // Step 21: Create new invoice
    await financialPage.createInvoice({
      invoiceName: 'TC1961Invoice',
      esign: ESIGN,
    });

    // Step 22: Select milestone type
    await financialPage.selectMilestoneType('Study');

    // Step 23: Select Include Holdback
    await financialPage.selectIncludeHoldback('Yes');

    // Step 24: Submit invoice
    await financialPage.submitInvoice(ESIGN);
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 25: Generate invoice
    await financialPage.generateInvoice(ESIGN);

    // Step 26: Verify invoice grid
    await financialPage.verifyInvoiceGridVisible();

    // Step 27: Select and delete invoice
    await financialPage.selectInvoice('TC1961Invoice');
    await financialPage.deleteSelectedInvoices(ESIGN);
  });

  test('TC1961 - Financial - Payments and Reconciliation', async ({ page }) => {
    // Step 30: Navigate to Financials > Payments
    await portalPage.navigateTo('Financials', 'Payments', '');

    // Step 31: Add payment
    await financialPage.addPayment({
      amount: '500',
      date: '07/15/2023',
      esign: ESIGN,
    });

    // Step 32: Verify payment in grid
    await financialPage.verifyPaymentInGrid('500');

    // Step 33: Click Add New Payment link
    await financialPage.clickAddNewPaymentLink();

    // Step 34: Perform payment action
    await financialPage.performPaymentAction('Approve');

    // Step 35: Navigate to Reconciliation
    await financialPage.navigateToTab('Reconciliation');

    // Step 36: Click Reconcile
    await financialPage.clickReconcile();

    // Step 37: Select reconcile checkbox
    await financialPage.selectReconcileBox(0);

    // Step 38: Select invoice on popup
    await financialPage.selectInvoiceOnPopup('TC1961Invoice');
  });

  test('TC1961 - Financial - Appendix and Quick Access', async ({ page }) => {
    // Step 40: Navigate to Financials
    await portalPage.navigateTo('Financials', 'Milestones', '');

    // Step 41: Verify Quick Access icon
    await financialPage.verifyQuickAccessIcon('Milestones');

    // Step 42: Verify column in grid
    await financialPage.verifyColumnInGrid('Type');
    await financialPage.verifyColumnInGrid('Description');
    await financialPage.verifyColumnInGrid('Amount');

    // Step 43: Verify text present
    await financialPage.verifyTextPresent('Financials Browser');

    // Step 44: Verify field present
    await financialPage.verifyFieldPresent('Milestone Type');

    // Step 45: Upload file in appendix
    const appendixPopupPromise = page.waitForEvent('popup');
    await page.locator('img[title="Appendix"]').first().click();
    const appendixWin = await appendixPopupPromise;
    await appendixWin.waitForLoadState('domcontentloaded');
    await appendixWin.close();

    // Step 46: Add link in appendix
    await financialPage.addLinkInAppendix('http://www.velos.com', ESIGN);
  });
});
