import { type Page, type Locator } from '@playwright/test';

/**
 * Combined helper class for common Velos operations — navigation, dropdowns, etc.
 */
export class VelosHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
/**
 * Check if a locator appears within the given timeout. If visible, click it.
 * @param locator - The Playwright Locator to check
 * @param timeout - Max wait time in ms (default: 3000)
 */
static async checkIfAppears(locator: Locator, timeout = 3000): Promise<boolean> {
  try {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
    return true;
  } catch {
    console.log('[checkIfAppears] Element not found, skipping click');
    return false;
  }
}
  /**
   * Navigate through the Velos menu dynamically.
   * @param menuName - Top-level menu (e.g., 'Manage', 'Reports')
   * @param section  - Section heading (e.g., 'Patient', 'Studies', 'Budget')
   * @param action   - Action link under the section (e.g., 'New', 'Search', 'List')
   *
   * @example
   * await helper.navigateTo('Manage', 'Patient', 'New');
   * await helper.navigateTo('Manage', 'Studies', 'Search');
   */
  async navigateTo(menuName: string, section: string, action: string) {
    await this.page.getByRole('link', { name: menuName }).first().click();
    await this.page
      .locator(`//h2[contains(text(),"${section}")]/ancestor::ul[1]`)
      .getByRole('link', { name: action, exact: true })
      .click();
  }

  /**
   * Select the first available option in a dropdown (index 1 to skip the blank/default).
   */
  static async selectFirstOption(dropdown: Locator) {
    await dropdown.selectOption({ index: 1 });
  }

  /**
   * Fill the eSign field only (without clicking any button).
   * Uses process.env.ESIGN if no value is provided.
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async fillESign(eSignValue?: string) {
    const value = eSignValue ?? process.env.ESIGN!;
    const eSign = this.page.locator('#eSign, #eSigns').last();
    await eSign.click();
    await this.page.keyboard.type(value, { delay: 100 });
  }

  /**
   * Fill the eSign field and click Submit.
   * Uses process.env.ESIGN if no value is provided.
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async fillESignAndSubmit(eSignValue?: string) {
    await this.fillESign(eSignValue);
    await this.page.getByRole('button', { name: 'Submit' }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill the eSign field and click Save.
   * Uses process.env.ESIGN if no value is provided.
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async fillESignAndSave(eSignValue?: string) {
    await this.fillESign(eSignValue);
    await this.page.getByRole('button', { name: 'Save', exact: true }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Preview and Save, fill eSign, and click Save.
   * Uses process.env.ESIGN if no value is provided.
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async previewAndSave(eSignValue?: string) {
    await this.page.getByRole('button', { name: 'Preview and Save' }).last().click();
    const value = eSignValue ?? process.env.ESIGN!;
    await this.page.locator('#eSign, #eSigns').last().click();
    await this.page.keyboard.type(value, { delay: 100 });
    await this.page.getByRole('button', { name: 'Save', exact: true }).last().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to a study's Financial Summary and optionally open a specific tab.
   * @param studyNumber - Study number to search for
   * @param tab - Optional tab name to navigate to (e.g., 'Milestones', 'Invoicing', 'Payments')
   */
  async navigateToFinancialTab(studyNumber: string, tab?: string) {
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().click();
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().fill(studyNumber);
    await this.page.keyboard.press('Enter');
    await this.page.locator('.studyMenuPop').click();
    await this.page.getByRole('link', { name: 'Financial Summary' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    if (tab && tab !== 'Milestones') {
      await this.page.getByRole('link', { name: tab, exact: false }).click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  /**
   * Navigate to a patient's page within a study.
   * Searches for the study, clicks Patient Management - Enrolled, then clicks the patient link.
   * @param studyNumber - Study number to search for
   * @param patientId - Patient ID link to click
   */
  async navigateToStudyPatient(studyNumber: string, patientId: string) {
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().click();
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().fill(studyNumber);
    await this.page.keyboard.press('Enter');

    await this.page.getByRole('link', { name: 'Patient Management - Enrolled' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    await this.page.getByRole('link', { name: patientId }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Search for a study by number and open it.
   * @param studyNumber - Study number to search for
   */
  async searchAndOpenStudy(studyNumber: string) {
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().click();
    await this.page.getByPlaceholder('Study #, Title or Keyword').first().fill(studyNumber);
    await this.page.keyboard.press('Enter');
    await this.page.locator('.studyMenuPop').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
