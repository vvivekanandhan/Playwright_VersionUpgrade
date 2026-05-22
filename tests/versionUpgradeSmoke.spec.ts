import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
import { PatientDetails } from '../pages1/PatientDetails';
import { VelosCalendarPage } from '../pages1/VelosCalendarPage';
import { VelosPortalPage } from '../pages1/VelosPortalPage';
import { VelosFieldPage } from '../pages1/VelosFieldPage';
import { VelosHelper } from '../helpers/VelosHelper';
import { type Page } from '@playwright/test';

let studyPage: StudyPage;
let calendarPage: VelosCalendarPage;
let portalPage: VelosPortalPage;
let fieldPage: VelosFieldPage;
let sharedNav: VelosHelper;
let sharedPage: Page;
let createdCalendarName: string;
let createdPatientId: string;
let createdCategoryName: string;
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
  
  // Initialize helpers
  sharedNav = new VelosHelper(sharedPage);
  fieldPage = new VelosFieldPage(sharedPage);
});

test('Add Category and Fields', async () => {
  // Create unique category name with timestamp
  const timestamp = Date.now();
  createdCategoryName = `TestCategory_${timestamp}`;
  
  // Step 1: Add Category
  let popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Category");
  await fieldPage.addCategory({
    name: createdCategoryName,
    description: 'Category for field testing'
  }, popupPromise);

  // Step 2: Add Edit Box Fields
  // Text Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: createdCategoryName,
    name: 'Field edit1',
    uniqueId: 'Field edit11',
    fieldType: 'text'
  }, popupPromise);

  // Number Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: createdCategoryName,
    name: 'Field number1',
    uniqueId: 'Field number11',
    fieldType: 'number'
  }, popupPromise);

  // Date Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Edit Box");
  await fieldPage.addEditBoxField({
    categoryName: createdCategoryName,
    name: 'Field date1',
    uniqueId: 'Field date11',
    fieldType: 'date'
  }, popupPromise);

  // Step 3: Add Multiple Choice Fields
  // Dropdown Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: createdCategoryName,
    name: 'field multi 1',
    uniqueId: 'field multi 1y',
    choiceType: 'dropdown',
    choices: ['yes', 'no1']
  }, popupPromise);

  // Checkbox Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: createdCategoryName,
    name: 'field checkbox 1',
    uniqueId: 'field checkbox 1y',
    choiceType: 'checkbox',
    choices: ['option1', 'option2']
  }, popupPromise);

  // Radio Field
  popupPromise = sharedPage.waitForEvent('popup');
  await sharedNav.navigateTo("Libraries", "Fields", "Add Multiple Choice");
  await fieldPage.addMultipleChoiceField({
    categoryName: createdCategoryName,
    name: 'field radio 1',
    uniqueId: 'field radio 1y',
    choiceType: 'radio',
    choices: ['choice1', 'choice2']
  }, popupPromise);
});

test('Add Form Category and Create Form', async () => {
  // Create unique form category and form names with timestamp
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
  
  // Select field category using the created field category name
  await fieldsPopup.locator('#category').selectOption({ label: createdCategoryName });
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
    await sharedPage.pause  ();

  // Final submit
  await fieldsPopup.getByRole('button', { name: 'Submit' }).click();
  
  await fieldsPopup.close().catch(() => {});
  
  console.log('Added fields to form');
});

test('Add Library Calendar', async ({ studyData, calendarData }) => {
  studyPage = new StudyPage(sharedPage);
  calendarPage = new VelosCalendarPage(sharedPage);
  portalPage = new VelosPortalPage(sharedPage);
  createdCalendarName = calendarData.calendarName;
  
  await sharedNav.navigateTo("Libraries", "Calendars", "Add Calendar");
  await calendarPage.fillDefineCalendar(calendarData);
  await calendarPage.selectEventsFromPopup();
  await calendarPage.manageVisitsLink.click();
  
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

test('Create Patient and Verify', async ({ patientData }) => {
  const patientDetails = new PatientDetails(sharedPage);
  createdPatientId = `${patientData.patientIdPrefix}${Date.now()}`;
  
  // Create patient
  await sharedNav.navigateTo("Manage", "Patients", "New");
  await patientDetails.createPatient(createdPatientId);

  // Search and verify patient
  await sharedNav.navigateTo("Manage", "Patients", "Search");
  await patientDetails.searchPatient(createdPatientId);
  await patientDetails.verifyPatientVisible(createdPatientId);
});

test('Create Study and Add Status', async ({ studyData, calendarData, patientData }) => {
  studyPage = new StudyPage(sharedPage);
  
  await sharedNav.navigateTo("Manage", "Studies", "New");
  await studyPage.createStudy(studyData);
  await studyPage.selectCalendarFromPopup(createdCalendarName);
  await studyPage.changeCalendarStatus(createdCalendarName, 'Active');
  await studyPage.importCalendar('calendar_template (8).csv');
  
  await sharedPage.getByPlaceholder('Study #, Title or Keyword').fill(studyPage.lastStudyNumber!);
  await sharedPage.keyboard.press('Enter');
  await sharedPage.locator('.studyMenuPop').click();
  
  await sharedPage.getByRole('link', { name: 'Study Status' }).click();
  await studyPage.addEnrolledStatus();
  await studyPage.addPatientToStudy(studyPage.lastStudyNumber, createdPatientId);
  await studyPage.createPatientSchedule(createdCalendarName);
});
