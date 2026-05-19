// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC860
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosReportsPage } from '../pages/VelosReportsPage';

const URL = 'https://ctrlval-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = '1Reg';
const PASS = 'Velos@123';
const ESIGN = '1234';

test.describe('Final Regression - Reports Module', () => {
  let portalPage: VelosPortalPage;
  let reportsPage: VelosReportsPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    reportsPage = new VelosReportsPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC860 - Reports - Accrual Report and export formats', async ({ page }) => {
    // Step 1: Navigate to Report Central
    await portalPage.navigateTo('Report Central', '', '');
    await expect(page.getByText('Report Central')).toBeVisible();

    // Step 2: Select Accrual report type
    await reportsPage.selectReportType('Accrual');

    // Step 3: Select report and display
    await reportsPage.selectReport('Accrual Detail');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify report title
    await reportsPage.verifyReportTitle('Accrual Detail');

    // Step 5: Download CSV
    await reportsPage.downloadCSV();

    // Step 6: Download Excel
    await reportsPage.downloadExcel();

    // Step 7: Click Printer Friendly
    await reportsPage.clickPrinterFriendly();
  });

  test('TC860 - Reports - Data Safety Report with filters', async ({ page }) => {
    // Step 10: Navigate to Report Central
    await portalPage.navigateTo('Report Central', '', '');

    // Step 11: Select Data Safety report type
    await reportsPage.selectReportType('Data Safety');

    // Step 12: Select report with filter
    await reportsPage.selectReportWithFilter('SAE Listing', 'All Studies');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');

    // Step 13: Verify report columns
    await reportsPage.verifyReportColumns(['Study', 'Patient', 'Event', 'Status']);

    // Step 14: Select report with additional filter
    await reportsPage.selectReportWithAdditionalFilter(
      'SAE Listing',
      'All Studies',
      'Active'
    );
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC860 - Reports - Financial Reports', async ({ page }) => {
    // Step 20: Navigate to Report Central
    await portalPage.navigateTo('Report Central', '', '');

    // Step 21: Select Financial report type
    await reportsPage.selectReportType('Financial');

    // Step 22: Invoice Summary report
    await reportsPage.selectReport('Invoice Summary');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
    await reportsPage.verifyReportTitle('Invoice Summary');

    // Step 23: Budget Variance report
    await reportsPage.selectReport('Budget Variance');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
    await reportsPage.verifyReportTitle('Budget Variance');
  });

  test('TC860 - Reports - System Admin Reports', async ({ page }) => {
    // Step 30: Navigate to Report Central
    await portalPage.navigateTo('Report Central', '', '');

    // Step 31: Select System Administration report type
    await reportsPage.selectReportType('System Administration');

    // Step 32: Audit Trail report
    await reportsPage.selectReport('Audit Trail');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
    await reportsPage.verifyReportTitle('Audit Trail');

    // Step 33: User Access report
    await reportsPage.selectReport('User Access');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
    await reportsPage.verifyReportTitle('User Access');

    // Step 34: Export formats
    await reportsPage.clickExcelFormat();
    await reportsPage.clickWordFormat();
  });

  test('TC860 - Reports - Mouseover info and column verification', async ({ page }) => {
    // Step 40: Navigate to Report Central
    await portalPage.navigateTo('Report Central', '', '');

    // Step 41: Select report type and verify mouseover info
    await reportsPage.selectReportType('Accrual');
    const info = await reportsPage.getMouseoverInfo('Accrual Detail');
    expect(info).toBeTruthy();

    // Step 42: Verify column in grid
    await reportsPage.selectReport('Accrual Detail');
    await reportsPage.clickDisplay();
    await page.waitForLoadState('domcontentloaded');
    await reportsPage.verifyColumnInGrid('Study');
    await reportsPage.verifyColumnInGrid('Protocol Number');
  });
});
