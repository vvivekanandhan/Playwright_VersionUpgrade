import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
import { PatientDetails } from '../pages1/PatientDetails';
import { VelosCalendarPage } from '../pages1/VelosCalendarPage';
import { VelosPortalPage } from '../pages1/VelosPortalPage';
import { VelosFieldPage } from '../pages1/VelosFieldPage';
import { VelosHelper } from '../helpers/VelosHelper';
import { VelosFinancialPage } from '../pages1/VelosFinancialPage';
import { type Page } from '@playwright/test';
import { DBHelper } from '../helpers/DBHelper';
import eventLibraryData from '../test-data/calendarLibEvents.json';

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

  // Final submit
  await fieldsPopup.getByRole('button', { name: 'Submit' }).click();
  
  
  console.log('Added fields to form');
});

test('Add Event Category and Create Events', async () => {
  // Create unique event category name with timestamp
  const timestamp = Date.now();
  createdEventCategoryName = `EventCategory_${timestamp}`;
  
  // Step 1: Add Event Category
  await sharedNav.navigateTo("Libraries", "Events", "Add Category");
  await sharedPage.waitForLoadState('domcontentloaded');
  await sharedPage.waitForTimeout(500); // Wait for page to stabilize
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

test('Add Library Calendar', async ({ studyData, calendarData }) => {
  studyPage = new StudyPage(sharedPage);
  calendarPage = new VelosCalendarPage(sharedPage);
  portalPage = new VelosPortalPage(sharedPage);
  createdCalendarName = calendarData.calendarName;
  
  await sharedNav.navigateTo("Libraries", "Calendars", "Add Calendar");
  await calendarPage.fillDefineCalendar(calendarData);
  await calendarPage.selectEventsFromPopup(createdEventCategoryName);
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

test('Create and Achieve Milestone Rules', async () => {
  const financialPage = new VelosFinancialPage(sharedPage);

  // ── Helper: dismiss inline editor by clicking neutral area ──
  const dismissEditor = async () => {
    await sharedPage.getByText(' Milestone Type:').first().click();
  };

  // ── Helper: enter row count and click add for a milestone type ──
  const addMilestoneRow = async (prefix: 'PM' | 'VM' | 'EM' | 'SM' | 'AM') => {
    await sharedPage.locator(`#${prefix}_rowCount`).click();
    await sharedPage.waitForTimeout(2000);
    await sharedPage.locator(`#${prefix}_rowCount`).pressSequentially('1', { delay: 1000 });
    const plusIcon = {
      PM: financialPage.addPM_MilestonePlusIcon,
      VM: financialPage.addVM_MilestonePlusIcon,
      EM: financialPage.addEM_MilestonePlusIcon,
      SM: financialPage.addSM_MilestonePlusIcon,
      AM: financialPage.addAM_MilestonePlusIcon,
    };
    await plusIcon[prefix].click();
  };

  // ── Helper: select dropdown and dismiss ──
  const selectDropdown = async (label?: string, index?: number) => {
    if (label) {
      await financialPage.milestoneActiveDropdownEditor.selectOption({ label });
    } else if (index !== undefined) {
      await financialPage.milestoneActiveDropdownEditor.selectOption({ index });
    }
    await dismissEditor();
    await sharedPage.waitForTimeout(1000);
  };

  // ── Helper: fill text field and dismiss ──
  const fillText = async (value: string) => {
    await financialPage.milestoneActiveTextEditor.fill(value);
    await dismissEditor();
    await sharedPage.waitForTimeout(500);
  };

  // ────────────────────────────────────────────────────────────────
  // CREATE PATIENT STATUS MILESTONE (PM) — Status: Enrolled
  // ────────────────────────────────────────────────────────────────
  const createPatientStatusMilestone = async (patientStatus: string, amount: string) => {
    await financialPage.expandMilestoneTypeByName('Patient Status Milestones').click();
    await addMilestoneRow('PM');

    await financialPage.clickPatientStatusField();
    await selectDropdown(patientStatus);

    await financialPage.clickMilestoneStatusField();
    await selectDropdown('Active');

    await financialPage.clickAmountField();
    await fillText(amount);

    await financialPage.milestonePreviewAndSave();
    console.log(`Created PM milestone: patientStatus=${patientStatus}, amount=${amount}`);
  };

  // ────────────────────────────────────────────────────────────────
  // CREATE STUDY STATUS MILESTONE (SM) — Same status as study
  // ────────────────────────────────────────────────────────────────
  const createStudyStatusMilestone = async (studyStatus: string, amount: string) => {
    await financialPage.expandMilestoneTypeByName('Study Status Milestones').click();
    await addMilestoneRow('SM');

    await financialPage.clickSM_StdStatusField();
    await selectDropdown(studyStatus);

    await financialPage.clickSM_MilestoneStatusField();
    await selectDropdown('Active');

    await financialPage.clickSM_AmountField();
    await fillText(amount);

    await financialPage.milestonePreviewAndSave();
    console.log(`Created SM milestone: studyStatus=${studyStatus}, amount=${amount}`);
  };

  // ────────────────────────────────────────────────────────────────
  // CREATE VISIT MILESTONE (VM)
  // ────────────────────────────────────────────────────────────────
  const createVisitMilestone = async (calendarName: string, visitName: string, amount: string) => {
    await financialPage.expandMilestoneTypeByName('Visit Milestones').click();
    await addMilestoneRow('VM');

    await financialPage.clickVM_CalendarField();
    await selectDropdown(calendarName);

    await financialPage.clickVM_VisitField();
    await selectDropdown(visitName);

    await financialPage.clickVM_MileRuleField();
    await selectDropdown('All events within the visit are  marked as -');

    await financialPage.clickVM_EvtStatusField();
    await selectDropdown('Done');
   await sharedPage.pause();
    await financialPage.clickVM_MilestoneStatusField();
    await selectDropdown('Active');

    await financialPage.clickVM_AmountField();
    await fillText(amount);

    await financialPage.milestonePreviewAndSave();
    console.log(`Created VM milestone: calendar=${calendarName}, visit=${visitName}, amount=${amount}`);
  };

  // ────────────────────────────────────────────────────────────────
  // CREATE EVENT MILESTONE (EM)
  // ────────────────────────────────────────────────────────────────
  const createEventMilestone = async (calendarName: string, visitName: string, eventName: string, amount: string) => {
    await financialPage.expandMilestoneTypeByName('Event Milestones').click();
    await addMilestoneRow('EM');

    await financialPage.clickEM_CalendarField();
    await selectDropdown(calendarName);

    await financialPage.clickEM_VisitField();
    await selectDropdown(visitName);

    await financialPage.clickEM_EventField();
    await selectDropdown(eventName);

    await financialPage.clickEM_MileRuleField();
    await selectDropdown('Event Marked As');

    await financialPage.clickEM_EvtStatusField();
    await selectDropdown('Done');

    await financialPage.clickEM_MilestoneStatusField();
    await selectDropdown('Active');

    await financialPage.clickEM_AmountField();
    await fillText(amount);

    await financialPage.milestonePreviewAndSave();
    console.log(`Created EM milestone: calendar=${calendarName}, visit=${visitName}, event=${eventName}, amount=${amount}`);
  };

  // ────────────────────────────────────────────────────────────────
  // CREATE ADDITIONAL MILESTONE (AM)
  // ────────────────────────────────────────────────────────────────
  const createAdditionalMilestone = async (description: string, amount: string) => {
    await financialPage.expandMilestoneTypeByName('Additional Milestones').click();
    await addMilestoneRow('AM');

    await financialPage.clickAM_MileDescField();
    await fillText(description);

    await financialPage.clickAM_MilestoneStatusField();
    await selectDropdown('Active');

    await financialPage.clickAM_AmountField();
    await fillText(amount);

    await financialPage.milestonePreviewAndSave();
    console.log(`Created AM milestone: desc=${description}, amount=${amount}`);
  };

  // ────────────────────────────────────────────────────────────────
  // BUILD NAMES FROM CALENDAR LIBRARY DATA
  // ────────────────────────────────────────────────────────────────
  const calName = createdCalendarName;                                   // e.g. Pet Calendar_1716800000000
  const firstVisitName = 'v1';                                           // First visit from calendarDetails.json
  const firstEventName = eventLibraryData.events[0].eventName;           // "Blood Draw" (without timestamp suffix in dropdown)

  await sharedPage.pause();

  // Navigate to Milestones tab
  await sharedPage.getByPlaceholder('Study #, Title or Keyword').first().fill(studyPage.lastStudyNumber!);
  await sharedPage.keyboard.press('Enter');
  await sharedPage.locator('.studyMenuPop').click();
  await sharedPage.getByRole('link', { name: 'Financial Summary' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');
  await financialPage.navigateToTab('Milestones');

  // ── Create all 5 milestones ──
  // Get study status label from DB (same status used when creating the study)
  const db = new DBHelper();
  let studyStatusLabel: string;
  try {
    studyStatusLabel = await db.getActiveEnrollingStudyStatusDesc();
    console.log(`[DB] Study status label for milestone: ${studyStatusLabel}`);
  } finally {
    await db.close();
  }

  await createPatientStatusMilestone('Enrolled', '500');
  await createStudyStatusMilestone(studyStatusLabel, '400');
  await createVisitMilestone(calName, firstVisitName, '300');
  await createEventMilestone(calName, firstVisitName, firstEventName, '200');
  await createAdditionalMilestone('Additional Test Milestone', '100');

  // ── Achieve Milestone ──
  await sharedPage.getByRole('button', { name: 'Achieve Milestone' }).click();
  await sharedPage.waitForLoadState('domcontentloaded');

  // Select all rows and save achievements
  const checkboxes = sharedPage.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).check().catch(() => {});
  }

  await sharedNav.fillESignAndSubmit();
  await sharedPage.waitForLoadState('domcontentloaded');

  console.log('Milestone rules created and achieved successfully');
});
