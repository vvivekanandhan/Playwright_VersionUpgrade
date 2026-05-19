// spec: FinalRegressionVeloseResearch_13_2_1/FinalYUIRTC856
import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosESamplePage } from '../pages/VelosESamplePage';

const URL = 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp';
const USER = 'TestAutomation';
const PASS = 'Velos123';
const ESIGN = '1234';

test.describe('Final Regression - eSample Module', () => {
  let portalPage: VelosPortalPage;
  let eSamplePage: VelosESamplePage;

  test.beforeEach(async ({ page }) => {
    portalPage = new VelosPortalPage(page);
    eSamplePage = new VelosESamplePage(page);
    await portalPage.login(USER, PASS, URL);
  });

  test.afterEach(async ({ page }) => {
    await portalPage.logout();
  });

  test('TC856 - eSample - Storage Administration CRUD', async ({ page }) => {
    // Step 1: Navigate to eSample > Storage Admin
    await portalPage.navigateTo('Manage', 'Application', 'eSample');
    await expect(page.getByText('eSample')).toBeVisible();

    // Step 2: Add new storage unit
    await eSamplePage.addStorageUnit({
      name: 'TC856Storage',
      type: 'Freezer',
      location: 'Lab A',
      esign: ESIGN,
    });
    await expect(page.getByText('Data Saved Successfully')).toBeVisible();

    // Step 3: Add child storage details
    await eSamplePage.addChildStorageDetails({
      parentName: 'TC856Storage',
      childName: 'TC856Shelf1',
      type: 'Shelf',
      esign: ESIGN,
    });

    // Step 4: Search storage
    await eSamplePage.searchStorage('TC856Storage');
    await expect(page.getByText('TC856Storage')).toBeVisible();

    // Step 5: Toggle grid view
    await eSamplePage.toggleGridView();
    await eSamplePage.verifyGridViewChecked();
  });

  test('TC856 - eSample - Specimen Types and Fields CRUD', async ({ page }) => {
    // Step 8: Navigate to Specimen Types
    await portalPage.navigateTo('Manage', 'Application', 'eSample');
    await page.getByRole('link', { name: 'Specimen Types' }).first().click();

    // Step 9: Add specimen text field
    await eSamplePage.addSpecimenTextField({
      name: 'TC856TextField',
      label: 'Test Text Field',
      esign: ESIGN,
    });

    // Step 10: Add specimen dropdown
    await eSamplePage.addSpecimenDropdown({
      name: 'TC856Dropdown',
      label: 'Test Dropdown',
      options: ['Option1', 'Option2', 'Option3'],
      esign: ESIGN,
    });

    // Step 11: Add specimen checkbox
    await eSamplePage.addSpecimenCheckbox({
      name: 'TC856Checkbox',
      label: 'Test Checkbox',
      esign: ESIGN,
    });

    // Step 12: Select specimen type
    await eSamplePage.selectSpecimenType('Blood');
    await expect(page.getByText('Blood')).toBeVisible();
  });

  test('TC856 - eSample - Storage Status Management', async ({ page }) => {
    // Step 15: Navigate to Storage Status
    await portalPage.navigateTo('Manage', 'Application', 'eSample');
    await page.getByRole('link', { name: 'Storage Status' }).first().click();

    // Step 16: Add storage status
    await eSamplePage.addStorageStatus({
      name: 'TC856Status',
      esign: ESIGN,
    });

    // Step 17: Update storage status
    await eSamplePage.updateStorageStatus({
      oldName: 'TC856Status',
      newName: 'TC856StatusUpdated',
      esign: ESIGN,
    });

    // Step 18: Verify column presence
    await eSamplePage.verifyColumnPresent('Status');
    await eSamplePage.verifyColumnPresent('Name');
  });

  test('TC856 - eSample - Specimen search by patient ID', async ({ page }) => {
    // Step 20: Search study
    await portalPage.searchStudyInHomepage('RSTC846');

    // Step 21: Navigate to eSample specimens
    await portalPage.navigateTo('Manage', 'Application', 'eSample');

    // Step 22: Search specimen by patient ID
    await eSamplePage.searchSpecimenByPatientId('TC851MRN');

    // Step 23-25: Verify storage kits
    await eSamplePage.addStorageKit({
      kitName: 'TC856Kit',
      esign: ESIGN,
    });

    // Step 26: Verify links present
    await eSamplePage.verifyLinkPresent('Storage');
    await eSamplePage.verifyLinkPresent('Specimens');
  });
});
