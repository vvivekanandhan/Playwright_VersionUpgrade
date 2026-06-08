import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
import { PatientDetails } from '../pages1/PatientDetails';
import { VelosCalendarPage } from '../pages1/VelosCalendarPage';
import { VelosPortalPage } from '../pages1/VelosPortalPage';
import { VelosFieldPage } from '../pages1/VelosFieldPage';
import { VelosHelper } from '../helpers/VelosHelper';
import { VelosFinancialPage } from '../pages1/VelosFinancialPage';
import { Velos_BudgetPage } from '../pages1/Velos_BudgetPage';
import { type Page } from '@playwright/test';
import { DBHelper } from '../helpers/DBHelper';
import { TestState } from '../helpers/TestState';
import eventLibraryData from '../test-data/calendarLibEvents.json';

let studyPage: StudyPage;
let calendarPage: VelosCalendarPage;
let portalPage: VelosPortalPage;
let fieldPage: VelosFieldPage;
let sharedNav: VelosHelper;
let sharedPage: Page;
const state = new TestState();

test.describe.configure({ mode: 'serial' });

/** Set up shared browser context, login once, and initialize page helpers for all serial tests */
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

/** Create a new field category and add edit box (text, number, date) and multiple choice (dropdown, checkbox, radio) fields */
test('Add Category and Fields', async () => {
  // Create unique category name with timestamp
  const timestamp = Date.now();
  state.categoryName = `TestCategory_${timestamp}`;
  
  // Step 1: Add Category
  let popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Category");
  await fieldPage.addCategory({
    name: state.categoryName,
    description: 'Category for field testing'
  }, popupPromise);

  // Step 2: Add Edit Box Fields
  // Text Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: state.categoryName,
    name: 'Field edit1',
    uniqueId: 'Field edit11',
    fieldType: 'text'
  }, popupPromise);

  // Number Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: state.categoryName,
    name: 'Field number1',
    uniqueId: 'Field number11',
    fieldType: 'number'
  }, popupPromise);

  // Date Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: state.categoryName,
    name: 'Field date1',
    uniqueId: 'Field date11',
    fieldType: 'date'
  }, popupPromise);

  // Step 3: Add Multiple Choice Fields
  // Dropdown Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: state.categoryName,
    name: 'field multi 1',
    uniqueId: 'field multi 1y',
    choiceType: 'dropdown',
    choices: ['yes', 'no1']
  }, popupPromise);

  // Checkbox Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: state.categoryName,
    name: 'field checkbox 1',
    uniqueId: 'field checkbox 1y',
    choiceType: 'checkbox',
    choices: ['option1', 'option2']
  }, popupPromise);

  // Radio Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: state.categoryName,
    name: 'field radio 1',
    uniqueId: 'field radio 1y',
    choiceType: 'radio',
    choices: ['choice1', 'choice2']
  }, popupPromise);
});

/** Create a form category, create a form under it, and link all fields from the previously created field category */
test('Add Form Category and Create Form', async () => {
  // Create unique form category and form names with timestamp
  const timestamp = Date.now();
  state.formCategoryName = `FormCategory_${timestamp}`;
  state.formName = `Form_${timestamp}`;
  
  // Step 1: Add Form Category (opens in popup)
  const categoryPopupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Forms", "Add Category");
  const categoryPopup = await categoryPopupPromise;
  await categoryPopup.waitForLoadState('domcontentloaded');
  // Fill category details
  await categoryPopup.locator('input[name="categoryName"]').fill(state.formCategoryName);
  
  // Fill eSign and submit
  const categoryHelper = new VelosHelper(categoryPopup);
  await categoryHelper.fillESignAndSubmit();
  
  await categoryPopup.close().catch(() => {});
  
  console.log(`Created form category: ${state.formCategoryName}`);
  
  // Step 2: Add Form
  await sharedNav.navigateTo("Libraries", "Forms", "Add Form");
  await sharedPage.waitForLoadState('domcontentloaded');
  // Fill form details
  await sharedPage.locator('input[name="txtName"]').fill(state.formName);
  await sharedPage.locator('#formType').selectOption({ label: state.formCategoryName });
  
  // Fill eSign and submit
  await sharedNav.fillESignAndSubmit();
  
  console.log(`Created form: ${state.formName}`);
  
  // Wait for page to load after form creation
  await sharedPage.waitForLoadState('domcontentloaded');
  
  // Step 3: Add Fields to Form
  await sharedPage.getByRole('link', { name: 'Add Fields' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
  const fieldsPopupPromise = sharedPage.waitForEvent('popup');
  await sharedPage.locator('a').filter({ hasText: 'local_library' }).click();
  const fieldsPopup = await fieldsPopupPromise;
  await fieldsPopup.waitForLoadState('domcontentloaded');
  
  // Select field category using the created field category name
  await fieldsPopup.locator('#category').selectOption({ label: state.categoryName });
  await fieldsPopup.getByRole('button', { name: 'Search' }).click();
  // Wait for fields to load
  await fieldsPopup.waitForLoadState('domcontentloaded');
  await fieldsPopup.waitForTimeout(1000);
  
  // Check all checkboxes (all fields from created category)
  const checkboxes = fieldsPopup.getByRole('checkbox');
  const checkboxCount = await checkboxes.count();
  for (let i = 0; i < checkboxCount; i++) {
    await checkboxes.nth(i).check();
  }
  

  await fieldsPopup.getByRole('img').first().click();
  // Select section for fields
  await fieldsPopup.locator('#section').selectOption('Section 1');

  // Final submit
  await fieldsPopup.getByRole('button', { name: 'Submit' }).click();
  
  
  console.log('Added fields to form');
});

/** Create an event category and multiple events from JSON data, each with research cost and linked forms */
test('Add Event Category and Create Events', async () => {
  // Create unique event category name with timestamp
  const timestamp = Date.now();
  state.eventCategoryName = `EventCategory_${timestamp}`;
  
  // Step 1: Add Event Category
  await sharedNav.navigateTo("Libraries", "Events", "Add Category");
  await sharedPage.waitForLoadState('domcontentloaded');
  await sharedPage.waitForTimeout(500); // Wait for page to stabilize
  // Select library type and fill category name
  await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 1 });
  await sharedPage.locator('input[name="categoryName"]').fill(state.eventCategoryName);
  
  // Fill eSign and submit
  await sharedNav.fillESignAndSubmit();
    await sharedPage.waitForLoadState('networkidle');

  console.log(`Created event category: ${state.eventCategoryName}`);
  
  // Step 2: Navigate to Search page and search for the created category
  await sharedNav.navigateTo("Libraries", "Events", "Search");
  await sharedPage.waitForLoadState('domcontentloaded');
  
  await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 0 });
  await sharedPage.waitForTimeout(500); // Wait for category dropdown to populate
  await sharedPage.locator('select[name="catId"]').selectOption({ label: state.eventCategoryName });
  await sharedPage.getByRole('button', { name: 'Search' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
  
  // Step 3: Create Multiple Events from JSON data
  for (const eventData of eventLibraryData.events) {
    const uniqueEventName = eventData.eventName;
    await sharedPage.locator('select[name="cmbLibType"]').selectOption({ index: 0 });
    await sharedPage.waitForTimeout(500); 
    await sharedPage.locator('select[name="catId"]').selectOption({ label: state.eventCategoryName });
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

/** Create a library calendar with fixed, dependent, and no time point visits, then configure the event-visit grid */
test('Add Library Calendar', async ({ studyData, calendarData }) => {
  studyPage = new StudyPage(sharedPage);
  calendarPage = new VelosCalendarPage(sharedPage);
  portalPage = new VelosPortalPage(sharedPage);
  state.calendarName = calendarData.calendarName;
  
  await sharedNav.navigateTo("Libraries", "Calendars", "Add Calendar");
  await calendarPage.fillDefineCalendar(calendarData);
  await calendarPage.selectEventsFromPopup(state.eventCategoryName);
  await calendarPage.clickManageVisitsAndRefresh();
  
  // Create Fixed Time Point visit
  await calendarPage.createFixedTimePointVisit(calendarData.fixedTimePointVisit);
  // Create Dependent Time Point visit
  await calendarPage.createDependentTimePointVisit(calendarData.dependentTimePointVisit);
  // Create No Time Point visit
  await calendarPage.createNoTimePointVisit(calendarData.noTimePointVisit);
  await sharedNav.previewAndSave();
  
  // Navigate to Event-Visit Grid and check all header checkboxes
  await calendarPage.navigateToEventVisitGrid();
  await calendarPage.checkAllEventVisitGridHeaders();
  await sharedNav.previewAndSave();
});

/** Create a new patient with a unique ID and verify the patient is visible in the system */
test('Create Patient and Verify', async ({ patientData }) => {
  const patientDetails = new PatientDetails(sharedPage);
  state.patientId = `${patientData.patientIdPrefix}${Date.now()}`;
  
  // Create patient
  await patientDetails.createPatient(state.patientId);

  // Search and verify patient
  
  await patientDetails.verifyPatientVisible(state.patientId);
});

/** Create a study, import and activate calendar, add enrolled status, add patient, create schedule, and mark all visits as done */
test('Create Study and Add Status', async ({ studyData, calendarData, patientData }) => {
  studyPage = new StudyPage(sharedPage);
  await sharedPage.pause(); // Pause to ensure previous test's patient creation is fully complete before starting study creation
//  await studyPage.createStudy(studyData);
//   state.studyNumber = studyPage.lastStudyNumber;
//   await sharedNav.searchAndOpenStudy(state.studyNumber);
//   await studyPage.importCalendarFromLibraryAndActivateCalendar(state.calendarName);
//   await studyPage.createCombinedBudget();
//   await studyPage.importCalendarandVerifyImport('calendar_template (8).csv');
//   await studyPage.addEnrolledStatus();
  await studyPage.addStudyTeamMember('Velos Admin', 'Data Manager', undefined, state.studyNumber);

  await studyPage.addPatientToStudy(state.studyNumber, state.patientId);
  await studyPage.createPatientSchedule(state.calendarName);
  await studyPage.markAllVisitsAsDone(state.studyNumber, state.patientId);

});

/** Create all 5 milestone types (Patient Status, Study Status, Visit, Event, Additional) and achieve them */
test('Create and Achieve Milestone Rules', async () => {
  const financialPage = new VelosFinancialPage(sharedPage);

  // ────────────────────────────────────────────────────────────────
  // BUILD NAMES FROM CALENDAR LIBRARY DATA
  // ────────────────────────────────────────────────────────────────
  const calName = state.calendarName;
  const resolvedStudyNumber = state.studyNumber;
  const firstVisitName = 'v1';                                           // First visit from calendarDetails.json
  const firstEventName = eventLibraryData.events[0].eventName;

  // Navigate to Milestones tab
  await sharedNav.navigateToFinancialTab(resolvedStudyNumber, 'Milestones');

  // // ── Create all 5 milestones ──
  const studyStatusLabel = 'Active/Enrolling';
  const patientStatusLabel = 'Enrolled';
  console.log(`[Milestone] Using study status: ${studyStatusLabel}, patient status: ${patientStatusLabel}`);

  await financialPage.createPatientStatusMilestone(patientStatusLabel, '500');
  await financialPage.createStudyStatusMilestone(studyStatusLabel, '400');
  await financialPage.createVisitMilestone(calName, firstVisitName, '300');
  await financialPage.createEventMilestone(calName, firstVisitName, firstEventName, '200');
  await financialPage.createAdditionalMilestone('Additional Test Milestone', '100');

  // ── Achieve Milestone ──
  await sharedPage.getByRole('button', { name: 'Achieve Milestone' }).click();
  
  await sharedPage.waitForLoadState('domcontentloaded');

  
  await sharedNav.fillESignAndSave();
  await sharedPage.waitForLoadState('domcontentloaded');

  console.log('Milestone rules created and achieved successfully');
});

/** Create an invoice from achieved milestones via the Invoicing tab and store the invoice number */
test('Create Invoice', async () => {
  const financialPage = new VelosFinancialPage(sharedPage);
  const resolvedStudyNumber = state.studyNumber;

  // Navigate to study Financial Summary and Create invoice from Invoicing tab
  const invoiceNumber = await financialPage.createInvoiceFromInvoicing( resolvedStudyNumber);
  state.invoiceNumber = invoiceNumber;

  console.log(`Invoice created successfully: ${invoiceNumber}`);
});

/** Create two payments: reconcile the first by invoice and the second by selecting all milestone types */
test('Create Payment and Reconcile', async () => {
  const financialPage = new VelosFinancialPage(sharedPage);
  const resolvedStudyNumber = state.studyNumber;
  const invoiceNumber = state.invoiceNumber;
  const paymentDescription = `Payment_${Date.now()}`;

  // Navigate to study Financial Summary - Payments tab
  await sharedNav.navigateToFinancialTab(resolvedStudyNumber, 'Payments');
  await sharedPage.pause(); // Wait for payments page to stabilize

  // Create first payment (Received) and reconcile against invoice
  await financialPage.createPayment('500', "payment1a","Received");
  await financialPage.reconcilePaymentByInvoice("payment1a", invoiceNumber);

  // Create second payment (Made) and reconcile against all milestone types
  await financialPage.createPayment('500', "payment2","Made");
  await financialPage.reconcilePaymentByMilestone("payment2", "All");

});

/** Create a new budget, link it to a study, and select a calendar from the study */
test('Create Budget with Calendar', async () => {
  const budgetPage = new Velos_BudgetPage(sharedPage);
  const budgetName = `Budget_${Date.now()}`;
  const budgetTemplate = "Comparative Budget"
  const studyOptionValue =state.studyNumber
  const calendarName = state.calendarName;

  // Navigate to Manage → Budgets → New, fill details, and link calendar
  await budgetPage.createBudgetWithCalendar(budgetName, budgetTemplate, studyOptionValue, calendarName);

  console.log(`Budget created: ${budgetName} with calendar: ${calendarName}`);
});
