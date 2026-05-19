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
    const eSign = this.page.locator('#eSign').first();
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
  }

  /**
   * Click Preview and Save, fill eSign, and click Save.
   * Uses process.env.ESIGN if no value is provided.
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async previewAndSave(eSignValue?: string) {
    await this.page.getByRole('button', { name: 'Preview and Save' }).click();
    const value = eSignValue ?? process.env.ESIGN!;
    await this.page.locator('#eSign').click();
    await this.page.keyboard.type(value, { delay: 100 });
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
  }
}
