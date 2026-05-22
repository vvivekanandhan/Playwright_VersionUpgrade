import { type Page } from '@playwright/test';
import { VelosHelper } from '../helpers/VelosHelper';

/**
 * VelosFieldPage – Field library operations
 * Handles adding edit boxes, multiple choice fields, and categories
 */
export class VelosFieldPage {
  page: Page;
  helper: VelosHelper;

  constructor(page: Page) {
    this.page = page;
    this.helper = new VelosHelper(page);
  }

  /**
   * Add Edit Box Field
   * @param fieldData - Field configuration
   * @param fieldData.categoryName - Category name to select (optional, defaults to index 1)
   * @param fieldData.categoryIndex - Category dropdown index (optional, used if categoryName not provided)
   * @param fieldData.name - Field name
   * @param fieldData.uniqueId - Unique identifier
   * @param fieldData.fieldType - 'text' | 'number' | 'date' (default: 'text')
   *   - 'text': 1st radio button
   *   - 'number': 2nd radio button
   *   - 'date': 3rd radio button
   * @param popupPromise - Promise for the popup page (must be set up before navigation)
   */
  async addEditBoxField(
    fieldData: {
      categoryName?: string;
      categoryIndex?: number;
      name: string;
      uniqueId: string;
      fieldType?: 'text' | 'number' | 'date';
    },
    popupPromise: Promise<Page>
  ) {
    const { categoryName, categoryIndex = 1, name, uniqueId, fieldType = 'text' } = fieldData;

    // Wait for popup page
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    // Create helper for popup
    const popupHelper = new VelosHelper(popup);

    // Select category by name or index
    if (categoryName) {
      await popup.locator('#category').selectOption({ label: categoryName });
    } else {
      await popup.locator('#category').selectOption({ index: categoryIndex });
    }

    // Fill field name
    await popup.locator('input[name="name"]').fill(name);

    // Fill unique ID
    await popup.locator('input[name="uniqueId"]').fill(uniqueId);

    // Select field type radio button
    switch (fieldType) {
      case 'text':
        await popup.getByRole('radio').first().check();
        break;
      case 'number':
        await popup.getByRole('radio').nth(1).check();
        break;
      case 'date':
        await popup.getByRole('radio').nth(2).check();
        break;
    }

    // Fill eSign and submit
    await popupHelper.fillESignAndSubmit();

    console.log(`Added Edit Box field "${name}" with type "${fieldType}"`);
    
    // Close popup
    await popup.close().catch(() => {});
  }

  /**
   * Add Multiple Choice Field
   * @param fieldData - Field configuration
   * @param fieldData.categoryName - Category name to select (optional, defaults to index 1)
   * @param fieldData.categoryIndex - Category dropdown index (optional, used if categoryName not provided)
   * @param fieldData.name - Field name
   * @param fieldData.uniqueId - Unique identifier
   * @param fieldData.choiceType - 'dropdown' | 'checkbox' | 'radio' (default: 'dropdown')
   *   - 'dropdown': 1st radio button
   *   - 'checkbox': 2nd radio button
   *   - 'radio': 3rd radio button
   * @param fieldData.choices - Array of choice values to add
   * @param popupPromise - Promise for the popup page (must be set up before navigation)
   */
  async addMultipleChoiceField(
    fieldData: {
      categoryName?: string;
      categoryIndex?: number;
      name: string;
      uniqueId: string;
      choiceType?: 'dropdown' | 'checkbox' | 'radio';
      choices: string[];
    },
    popupPromise: Promise<Page>
  ) {
    const { categoryName, categoryIndex = 1, name, uniqueId, choiceType = 'dropdown', choices } = fieldData;

    // Wait for popup page
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    // Create helper for popup
    const popupHelper = new VelosHelper(popup);

    // Select category by name or index
    if (categoryName) {
      await popup.locator('#category').selectOption({ label: categoryName });
    } else {
      await popup.locator('#category').selectOption({ index: categoryIndex });
    }

    // Fill field name
    await popup.locator('input[name="name"]').fill(name);

    // Fill unique ID
    await popup.locator('input[name="uniqueId"]').fill(uniqueId);

    // Select choice type radio button
    switch (choiceType) {
      case 'dropdown':
        await popup.getByRole('radio').first().check();
        break;
      case 'checkbox':
        await popup.getByRole('radio').nth(1).check();
        break;
      case 'radio':
        await popup.getByRole('radio').nth(2).check();
        break;
    }

    // Fill choice values
    for (let i = 0; i < choices.length; i++) {
      const rowIndex = i + 1;
      await popup
        .getByRole('row', { name: `${rowIndex} 0` })
        .locator('input[name="newTxtDispVal"]')
        .fill(choices[i]);
    }

    // Fill eSign and submit
    await popupHelper.fillESignAndSubmit();

    console.log(`Added Multiple Choice field "${name}" with type "${choiceType}" and ${choices.length} choices`);
    
    // Close popup
    await popup.close().catch(() => {});
  }

  /**
   * Add Category
   * @param categoryData - Category configuration
   * @param categoryData.name - Category name
   * @param categoryData.description - Category description (optional)
   * @param popupPromise - Promise for the popup page (must be set up before navigation)
   */
  async addCategory(
    categoryData: {
      name: string;
      description?: string;
    },
    popupPromise: Promise<Page>
  ) {
    const { name, description } = categoryData;

    // Wait for popup page
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    // Create helper for popup
    const popupHelper = new VelosHelper(popup);

    // Fill category name
    await popup.locator('input[name="categoryName"]').fill(name);

    // Fill category description if provided
    if (description) {
      await popup.locator('input[name="categoryDesc"]').fill(description);
    }

    // Fill eSign and submit
    await popupHelper.fillESignAndSubmit();

    console.log(`Added category "${name}"`);
    
    // Close popup
    await popup.close().catch(() => {});
  }
}
