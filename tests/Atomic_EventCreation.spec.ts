import { test, expect } from '../fixtures/velosFixtures';
import { VelosHelper } from '../helpers/VelosHelper';
import { type Page } from '@playwright/test';
import eventLibraryData from '../test-data/calendarLibEvents.json';

let sharedPage: Page;
let sharedNav: VelosHelper;
let createdEventCategoryName: string;

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

test('Add Event Category and Create Events', async () => {
  // Create unique event category name with timestamp
  const timestamp = Date.now();
  createdEventCategoryName = `EventCategory_${timestamp}`;
  
  // Step 1: Add Event Category
  await sharedNav.navigateTo("Libraries", "Events", "Add Category");

  await sharedPage.waitForLoadState('domcontentloaded');
  // Select library type and fill category name
  await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 1 });
  await sharedPage.locator('input[name="categoryName"]').fill(createdEventCategoryName);
  
  // Fill eSign and submit
  await sharedNav.fillESignAndSubmit();
  
  console.log(`Created event category: ${createdEventCategoryName}`);
  
  // Step 2: Navigate to Search page and search for the created category
  await sharedNav.navigateTo("Libraries", "Events", "Search");
  await sharedPage.waitForLoadState('domcontentloaded');
  await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 0 });
  await sharedPage.waitForTimeout(500); // Wait for category dropdown to populate
  await sharedPage.locator('select[name="catId"]').selectOption({ label: createdEventCategoryName });
  await sharedPage.getByRole('button', { name: 'Search' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
  
  // Step 3: Create Multiple Events from JSON data
  for (const eventData of eventLibraryData.events) {
    const uniqueEventName = `${eventData.eventName}_${timestamp}`;
    await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 0 });
  await sharedPage.waitForTimeout(500); 
     await sharedPage.locator('select[name="catId"]').selectOption({ label: createdEventCategoryName });
  await sharedPage.getByRole('button', { name: 'Search' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
    
   await sharedPage.getByRole('link', { name: 'New Event', exact: true }).click(); 
    // Fill event details
    await sharedPage.locator('textarea[name="eventName"]').fill(uniqueEventName);
    await sharedPage.locator('textarea[name="cptcode"]').fill(eventData.cptCode);
    await sharedPage.locator('input[name="eventDuration"]').fill(eventData.duration);
    await sharedPage.locator('select[name="eventDurDays"]').selectOption(eventData.durationUnit);
    
    // Fill eSign and submit
    await sharedNav.fillESignAndSubmit();
    
    console.log(`Created event: ${uniqueEventName}`);
    
    // Step 4: Add Cost to Event
    await sharedPage.getByRole('link', { name: 'Resource' }).click();
    await sharedPage.getByRole('link', { name: 'Cost' }).click();
    await sharedPage.getByRole('link', { name: 'Specify Cost' }).click();
    await sharedPage.waitForLoadState('domcontentloaded');
    
    // Select cost type and fill amount
    await sharedPage.getByRole('combobox').first().selectOption({ label: 'Research Cost' });
    await sharedPage.getByRole('row', { name: 'Research Cost US Dollars' }).getByRole('textbox').fill(eventData.researchCost);
    
    // Fill eSign and submit
    await sharedNav.fillESignAndSubmit();
    
    console.log(`Added cost $${eventData.researchCost} to event: ${uniqueEventName}`);
    
    // Step 5: Link Forms to Event
    await sharedPage.getByRole('link', { name: 'Resource' }).click();
    await sharedPage.getByRole('link', { name: 'CRF Details' }).click();
    await sharedPage.waitForLoadState('domcontentloaded');
    
    const formsPopupPromise = sharedPage.waitForEvent('popup');
    await sharedPage.getByRole('link', { name: 'Link Forms' }).click();
    const formsPopup = await formsPopupPromise;
    await formsPopup.waitForLoadState('domcontentloaded');
    
    // Select first form and submit
    await formsPopup.getByRole('checkbox').first().check();
    await formsPopup.getByRole('button', { name: 'Submit' }).click();
    
    await formsPopup.close().catch(() => {});
    
    console.log(`Linked forms to event: ${uniqueEventName}`);
    
    // Navigate back to event list to create next event
    await sharedPage.getByRole('link', { name: 'Back' }).click();
    await sharedPage.waitForLoadState('domcontentloaded');
  }
  
  console.log(`Successfully created ${eventLibraryData.events.length} events`);
});

test.afterAll(async () => {
  await sharedPage?.close();
});
