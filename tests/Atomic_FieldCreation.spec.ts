import { test, expect } from '../fixtures/velosFixtures';
import { VelosHelper } from '../helpers/VelosHelper';
import { VelosFieldPage } from '../pages1/VelosFieldPage';
import { type Page } from '@playwright/test';

let sharedPage: Page;
let sharedNav: VelosHelper;
let fieldPage: VelosFieldPage;

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
  
  // Initialize helpers
  sharedNav = new VelosHelper(sharedPage);
  fieldPage = new VelosFieldPage(sharedPage);
});

test('Add Category and Fields', async () => {
  // Create unique category name with timestamp
  const timestamp = Date.now();
  const categoryName = `TestCategory_${timestamp}`;
  
  // Step 1: Add Category
  let popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Category");
  await fieldPage.addCategory({
    name: categoryName,
    description: 'Category for field testing'
  }, popupPromise);

  // Step 2: Add Edit Box Fields
  // Text Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: categoryName,
    name: 'Field edit1',
    uniqueId: 'Field edit11',
    fieldType: 'text'
  }, popupPromise);

  // Number Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: categoryName,
    name: 'Field number1',
    uniqueId: 'Field number11',
    fieldType: 'number'
  }, popupPromise);

  // Date Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: categoryName,
    name: 'Field date1',
    uniqueId: 'Field date11',
    fieldType: 'date'
  }, popupPromise);

  // Step 3: Add Multiple Choice Fields
  // Dropdown Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: categoryName,
    name: 'field multi 1',
    uniqueId: 'field multi 1y',
    choiceType: 'dropdown',
    choices: ['yes', 'no1']
  }, popupPromise);

  // Checkbox Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: categoryName,
    name: 'field checkbox 1',
    uniqueId: 'field checkbox 1y',
    choiceType: 'checkbox',
    choices: ['option1', 'option2']
  }, popupPromise);

  // Radio Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: categoryName,
    name: 'field radio 1',
    uniqueId: 'field radio 1y',
    choiceType: 'radio',
    choices: ['choice1', 'choice2']
  }, popupPromise);
});

test.afterAll(async () => {
  await sharedPage?.close();
});
