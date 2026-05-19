import { type Page, type Locator, expect } from '@playwright/test';
import { VelosHelper } from '../helpers/VelosHelper';

/**
 * Page Object Model for the Patient Details page in Velos.
 */
export class PatientDetails {
  private page: Page;

  // ── Locators ──
  readonly patientId: Locator;
  readonly patientFirstName: Locator;
  readonly patientLastName: Locator;
  readonly patientGender: Locator;
  readonly patientEthnicity: Locator;
  readonly patientRace: Locator;
  readonly selectEthnicityLink: Locator;
  readonly patientFacilityId: Locator;
  readonly patientDob: Locator;
  readonly eSign: Locator;
  readonly submitButton: Locator;
  readonly searchButton: Locator;
  readonly patientCode: Locator;
  readonly todayButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patientId = page.locator('#patid');
    this.patientFirstName = page.locator('#patfname');
    this.patientLastName = page.locator('#patlname');
    this.patientGender = page.getByLabel('patgender');
    this.patientEthnicity = page.getByLabel('patethnicity');
    this.patientRace = page.getByLabel('patrace');
    this.selectEthnicityLink = page.getByRole('link', { name: 'Select Ethnicity' });
    this.patientFacilityId = page.locator('input[name="patFacilityID"]');
    this.patientDob = page.locator('#patdob');
    this.eSign = page.locator('#eSign');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.patientCode = page.locator('#patCode');
    this.todayButton = page.getByRole('button', { name: 'Today' });
  }

  /**
   * Create a new patient with all details.
   * @param patientId - The patient identifier to use
   * @param eSignValue - E-signature value (default: '1111')
   */
  async createPatient(patientId: string, eSignValue: string = process.env.ESIGN || '1234') {
    await this.patientId.fill(patientId);
    await this.patientFirstName.fill('Patient_Test_First');
    await this.patientLastName.fill('Patient_Last Name');
    await this.patientDob.click();
    await this.todayButton.click();

    // Select first option for dropdowns
    await VelosHelper.selectFirstOption(this.patientGender);
    await VelosHelper.selectFirstOption(this.patientEthnicity);
    await VelosHelper.selectFirstOption(this.patientRace);

    // Handle Select Ethnicity popup
    const popupPromise = this.page.waitForEvent('popup');
    await this.selectEthnicityLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();

    await popup.getByRole('checkbox').first().check();
    await popup.getByRole('button', { name: 'Submit' }).click();

    await this.patientFacilityId.fill('pat_facility_id');

    await this.eSign.focus();
    await this.eSign.fill(eSignValue);
    await this.submitButton.click();
  }

  /**
   * Search for a patient by code/ID.
   * @param patientCode - The patient code to search
   */
  async searchPatient(patientCode: string) {
    await this.patientCode.fill(patientCode);
    await this.searchButton.click();
  }

  /**
   * Verify a patient link is visible in search results.
   * @param patientId - The patient ID to verify
   */
  async verifyPatientVisible(patientId: string) {
    await expect(this.page.getByRole('link', { name: patientId })).toBeVisible();
  }
}
