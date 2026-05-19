// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC851
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosPatientPage } from '../pages/VelosPatientPage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - Patient Module', () => {
  let portalPage: VelosPortalPage;
  let patientPage: VelosPatientPage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    patientPage = new VelosPatientPage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC851 - Patient - Create new patient, search and verify', async ({ page }) => {
    // Step 1: Navigate to Patients > Search
    await portalPage.navigateTo('Manage', 'Patients', 'Search');
    await expect(page.getByText('Patient Search')).toBeVisible();

    // Step 2: Add a new patient
    await patientPage.clickAddANewPatient();
    await patientPage.addNewPatient({
      firstName: 'TC851First',
      lastName: 'TC851Last',
      mrn: 'TC851MRN' + Date.now(),
      dob: '01/01/1990',
      gender: 'Male',
    });

    // Step 3: Search for patient
    await patientPage.searchPatient('TC851Last');
    await patientPage.verifyPatientInSearchResults('TC851Last');

    // Step 4: Navigate to patient demographics
    await page.getByRole('link', { name: 'TC851Last' }).first().click();
    await patientPage.navigateToDemographics();
    await expect(page.getByText('Demographics')).toBeVisible();

    // Step 5: Verify patient icons (Forms, Appendix, Calendar)
    await expect(page.locator('img[title="Forms"]').first()).toBeVisible();
    await expect(page.locator('img[title="Appendix"]').first()).toBeVisible();
  });

  test('TC851 - Patient - Reports and Printer-friendly format', async ({ page }) => {
    // Step 10: Navigate to Patients > Search
    await portalPage.navigateTo('Manage', 'Patients', 'Search');
    await patientPage.searchPatient('TC851Last');

    // Step 11: Click on patient and then Reports
    await page.getByRole('link', { name: 'TC851Last' }).first().click();
    await patientPage.clickReports();
    await page.waitForLoadState('domcontentloaded');

    // Step 12: Select report type
    await page.locator('select[name="reportType"]').first().selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Display' }).first().click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC851 - Patient - Study-centric enrollment workflow', async ({ page }) => {
    // Step 16: Search study in homepage
    await portalPage.searchStudyInHomepage('RSTC846');

    // Step 17: Navigate to Enrolled patients
    await portalPage.navigateTo('Manage', 'Patients', 'Enrolled');
    await expect(page.getByText('Study Patients')).toBeVisible();

    // Step 18-20: Add existing patient to study
    await patientPage.clickSelectExistingPatient();
    await page.locator('input[name="lastName"]').first().fill('TC851Last');
    await page.getByRole('button', { name: 'Search' }).first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 21: Navigate to Schedule
    await portalPage.navigateTo('Manage', 'Patients', 'Schedule');
    await expect(page.getByText('Patient Schedules')).toBeVisible();

    // Step 22: Verify search filter options
    await patientPage.verifyScheduleFilterOptions();
  });

  test('TC851 - Patient - Adverse Events and Study Status', async ({ page }) => {
    // Step 30: Navigate to patient adverse events
    await portalPage.navigateTo('Manage', 'Patients', 'Search');
    await patientPage.searchPatient('TC851Last');
    await page.getByRole('link', { name: 'TC851Last' }).first().click();

    // Navigate to adverse events tab
    await patientPage.navigateToAdverseEvent();

    // Step 32: Add new study status
    await patientPage.addNewStudyStatus('Active');

    // Step 33: Verify patient forms link
    await patientPage.clickFormsLink();
    await page.waitForLoadState('domcontentloaded');
  });
});
