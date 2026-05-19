// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC853
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosCalendarPage } from '../pages/VelosCalendarPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Library Calendar Module', () => {
  let portalPage: VelosPortalPage;
  let calendarPage: VelosCalendarPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    calendarPage = new VelosCalendarPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC853 - Library Calendar - Search and verify calendar tabs', async ({ page }) => {
    // Step 1: Navigate to Library Calendar Search
    await portalPage.navigateTo('Libraries', 'Calendar', 'Search');
    await expect(page.getByText('Calendar')).toBeVisible();

    // Step 2: Search for existing calendar
    await calendarPage.searchCalendar('TC853Cal');

    // Step 3: Verify tab navigation (Events, Manage Visits, Event-Visit Grid)
    await page.getByRole('link', { name: 'Events' }).first().click();
    await expect(page.getByText('Events')).toBeVisible();

    await page.getByRole('link', { name: 'Manage Visits' }).first().click();
    await expect(page.getByText('Manage Visits')).toBeVisible();

    await page.getByRole('link', { name: 'Event - Visit Grid' }).first().click();
    await expect(page.getByText('Event - Visit Grid')).toBeVisible();
  });

  test('TC853 - Library Calendar - Calendar categories CRUD', async ({ page }) => {
    // Step 5: Navigate to Calendar Categories
    await portalPage.navigateTo('Libraries', 'Calendar', 'Calendar Categories');
    await expect(page.getByText('Calendar Categories')).toBeVisible();

    // Step 6: Add new calendar category
    await calendarPage.ensureCalendarCategoryExists('TC853CalCategory');
    await expect(page.getByText('TC853CalCategory')).toBeVisible();

    // Step 7: Edit category
    await page.getByText('TC853CalCategory').first().click();
    await page.locator('input[name="categoryName"]').first().fill('TC853CalCategoryEdited');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 8: Delete category
    page.on('dialog', d => d.accept());
    await page.locator(`//td[contains(text(),'TC853CalCategoryEdited')]//following::img[@title='Delete']`).first().click();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC853 - Library Calendar - Event categories CRUD', async ({ page }) => {
    // Step 10: Navigate to Event Categories
    await portalPage.navigateTo('Libraries', 'Calendar', 'Event Categories');
    await expect(page.getByText('Event Categories')).toBeVisible();

    // Step 11: Add new event category
    await calendarPage.ensureEventCategoryExists('TC853EvtCategory');

    // Step 12: Edit event category
    await page.getByText('TC853EvtCategory').first().click();
    await page.locator('input[name="categoryName"]').first().fill('TC853EvtCategoryEdited');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC853 - Library Calendar - Events and Visits management', async ({ page }) => {
    // Step 15: Navigate to Library Calendar search and open a calendar
    await portalPage.navigateTo('Libraries', 'Calendar', 'Search');
    await calendarPage.searchCalendar('TC853Cal');
    await page.getByRole('link', { name: /TC853Cal/ }).first().click();

    // Step 16: Navigate to Events tab, add event
    await page.getByRole('link', { name: 'Events' }).first().click();
    await page.getByRole('link', { name: /ADD/ }).first().click();
    await page.locator('input[name="eventName"]').first().fill('TC853Event');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();

    // Step 18: Navigate to Manage Visits tab
    await page.getByRole('link', { name: 'Manage Visits' }).first().click();
    await expect(page.getByText('Manage Visits')).toBeVisible();

    // Step 19: Add visit
    await page.getByRole('link', { name: /ADD/ }).first().click();
    await page.locator('input[name="visitName"]').first().fill('TC853Visit');
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 20: Navigate to Event - Visit Grid
    await page.getByRole('link', { name: 'Event - Visit Grid' }).first().click();
    await expect(page.getByText('Event - Visit Grid')).toBeVisible();

    // Step 21: eSigned Event/Visit mapping
    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('#eSign').first().fill(ESIGN);
    await portalPage.submitDetails();
  });

  test('TC853 - Library Calendar - Import calendar and Coverage Analysis', async ({ page }) => {
    // Step 25: Navigate to Library Calendar, import
    await portalPage.navigateTo('Libraries', 'Calendar', 'Import Calendar');
    await expect(page.getByText('Import')).toBeVisible();

    // Step 27: Verify Coverage Analysis link
    await portalPage.navigateTo('Libraries', 'Calendar', 'Search');
    await calendarPage.searchCalendar('TC853Cal');
    await page.getByRole('link', { name: /TC853Cal/ }).first().click();
    await calendarPage.clickCoverageAnalysisLink();
    await page.waitForLoadState('domcontentloaded');
  });
});
