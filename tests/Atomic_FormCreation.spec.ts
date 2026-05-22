import { test, expect } from '../fixtures/velosFixtures';
import { VelosHelper } from '../helpers/VelosHelper';
import { type Page } from '@playwright/test';

let sharedPage: Page;
let sharedNav: VelosHelper;
let createdFormCategoryName: string;
let createdFormName: string;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  sharedPage = await context.newPage();
  
  // Auto-accept dialogs
  sharedPage.on('dialog', async (dialog) => {
    console.log(`[Dialog Auto-Accept] ${dialog.type()}: ${dialog.message()}`);
    await dialog.accept();
  });
  
  // Login once
  const { LoginPage } = await import('../pages1/LoginPage');
  const loginPage = new LoginPage(sharedPage);
  await loginPage.goto(process.env.URL!);
  await loginPage.login(process.env.VELOS_USERNAME!, process.env.VELOS_PASSWORD!);
  
  // Initialize helper
  sharedNav = new VelosHelper(sharedPage);
});

test('Add Form Category and Create Form', async () => {
  // Create unique category name with timestamp
  const timestamp = Date.now();
  createdFormCategoryName = `FormCategory_${timestamp}`;
  createdFormName = `Form_${timestamp}`;
  
  // Step 1: Add Form Category (opens in popup)
  const categoryPopupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Forms", "Add Category");
  const categoryPopup = await categoryPopupPromise;
  await categoryPopup.waitForLoadState('domcontentloaded');
  
  // Fill category details
  await categoryPopup.locator('input[name="categoryName"]').fill(createdFormCategoryName);
  
  // Fill eSign and submit
  const categoryHelper = new VelosHelper(categoryPopup);
  await categoryHelper.fillESignAndSubmit();
  
  await categoryPopup.close().catch(() => {});
  
  console.log(`Created form category: ${createdFormCategoryName}`);
  
  // Step 2: Add Form
  await sharedNav.navigateTo("Libraries", "Forms", "Add Form");
  await sharedPage.waitForLoadState('domcontentloaded');
  
  // Fill form details
  await sharedPage.locator('input[name="txtName"]').fill(createdFormName);
  await sharedPage.locator('#formType').selectOption({ label: createdFormCategoryName });
  
  // Fill eSign and submit
  await sharedNav.fillESignAndSubmit();
  
  console.log(`Created form: ${createdFormName}`);
  
  // Wait for page to load after form creation
  await sharedPage.waitForLoadState('domcontentloaded');
  
  // Step 3: Add Fields to Form
  await sharedPage.getByRole('link', { name: 'Add Fields' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
  
  const fieldsPopupPromise = sharedPage.waitForEvent('popup');
  await sharedPage.locator('a').filter({ hasText: 'local_library' }).click();
  const fieldsPopup = await fieldsPopupPromise;
  await fieldsPopup.waitForLoadState('domcontentloaded');
  
  // Select field category
  await fieldsPopup.locator('#category').selectOption({ index: 1 });
  
  // Check fields to add
  await fieldsPopup.getByRole('row', { name: 'SampleText Text123 Text', exact: true }).getByRole('checkbox').check();
  await fieldsPopup.getByRole('row', { name: 'SampleMultiChoice mcchoice Dropdown', exact: true }).getByRole('checkbox').check();
  
  // Submit field selection
  await fieldsPopup.getByRole('button', { name: 'Submit' }).click();
  
  // Select section for fields
  await fieldsPopup.locator('#section').selectOption({ index: 1 });
  
  // Final submit
  await fieldsPopup.getByRole('button', { name: 'Submit' }).click();
  
  await fieldsPopup.close().catch(() => {});
  
  console.log('Added fields to form');
});

test.afterAll(async () => {
  await sharedPage?.close();
});
