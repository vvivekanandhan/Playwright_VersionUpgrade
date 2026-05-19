// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC854
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosBudgetPage } from '../pages/VelosBudgetPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';
const STUDY = 'RSTC846';

test.describe('Final Regression - Budget Module', () => {
  let portalPage: VelosPortalPage;
  let budgetPage: VelosBudgetPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    budgetPage = new VelosBudgetPage(page);
    await portalPage.login(USER, PASS, URL);
    await portalPage.searchStudyInHomepage(STUDY);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC854 - Budget - Create study budget with sections and line items', async ({ page }) => {
    // Step 1: Navigate to Budget (Open)
    await portalPage.navigateTo('Budget', '', 'Open');
    await expect(page.getByText('Budget Browser')).toBeVisible();

    // Step 2: Create new budget
    await budgetPage.createNewBudget('TC854Budget', ESIGN);
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 3: Add new section
    await budgetPage.addNewSection('TC854Section', ESIGN);
    await expect(page.getByText('TC854Section')).toBeVisible();

    // Step 4: Select calendar for budget
    await budgetPage.selectCalendar('TC854Cal');

    // Step 5: Add new line item
    await budgetPage.addNewLineItem({
      description: 'TC854LineItem',
      unitCost: '100',
      quantity: '5',
      esign: ESIGN,
    });
    await expect(page.getByText('TC854LineItem')).toBeVisible();

    // Step 6: Exclude line item
    await budgetPage.excludeLineItem('TC854LineItem');

    // Step 7: Add repeat line items
    await budgetPage.addRepeatLineItems({
      description: 'TC854RepeatItem',
      unitCost: '50',
      quantity: '10',
      esign: ESIGN,
    });
  });

  test('TC854 - Budget - Patient budget sections and line items', async ({ page }) => {
    // Step 10: Navigate to Budget (Open)
    await portalPage.navigateTo('Budget', '', 'Open');

    // Step 11: Search study budget
    await budgetPage.searchBudget('TC854Budget');

    // Step 12: Click on budget and navigate to Patient Budget section
    await page.getByRole('link', { name: 'TC854Budget' }).first().click();

    // Step 13: Add new section in patient budget
    await budgetPage.addNewSectionInPatientBudget('TC854PatSection', ESIGN);

    // Step 14: Add calendar to patient budget
    await budgetPage.addNewCalendar('TC854PatCal', ESIGN);

    // Step 15: Verify budget section display
    await budgetPage.verifyBudgetSection('TC854PatSection');
  });

  test('TC854 - Budget - Copy budget and verify access rights', async ({ page }) => {
    // Step 20: Navigate to Budget
    await portalPage.navigateTo('Budget', '', 'Open');

    // Step 21: Copy budget
    await budgetPage.copyBudget('TC854Budget', 'TC854BudgetCopy', ESIGN);
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 22: Verify copied budget
    await budgetPage.searchBudget('TC854BudgetCopy');
    await expect(page.getByText('TC854BudgetCopy')).toBeVisible();

    // Step 25: Delete test budgets
    await budgetPage.deleteBudget('TC854BudgetCopy', ESIGN);
    await budgetPage.deleteBudget('TC854Budget', ESIGN);
  });
});
