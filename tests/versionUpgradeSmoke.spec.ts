import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
import { PatientDetails } from '../pages1/PatientDetails';
import { VelosCalendarPage } from '../pages1/VelosCalendarPage';
import { VelosPortalPage } from '../pages1/VelosPortalPage';
import { VelosHelper } from '../helpers/VelosHelper';
import { type Page } from '@playwright/test';

let studyPage: StudyPage;
let calendarPage: VelosCalendarPage;
let portalPage: VelosPortalPage;
let sharedNav: VelosHelper;
let sharedPage: Page;
let createdCalendarName: string;
let createdPatientId: string;

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
