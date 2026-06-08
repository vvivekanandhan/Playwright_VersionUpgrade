import { type Page, type Locator, expect } from '@playwright/test';
import { VelosHelper } from '../helpers/VelosHelper';
import { DBHelper } from '../helpers/DBHelper';
import path from 'path';
/**
 * Page Object Model for the Study Creation page in Velos.
 * All locators that the Atomic_StudyCreation test uses live here.
 */
export class StudyPage {
  private page: Page;

  // ── Study Creation Locators ──
  private helper: VelosHelper;
  lastStudyNumber: string = '';
  readonly studyNumber: Locator;
  readonly title: Locator;
  readonly studyDivision: Locator;
  readonly studyTherapeuticArea: Locator;
  readonly studyPhase: Locator;
  readonly eSign: Locator;
  readonly studyStatusTab: Locator;
  readonly addNewStatusLink: Locator;
  readonly protocolStatus: Locator;
  readonly expandAllButton: Locator;

  // ── Study Setup / Calendar Locators ──
  readonly studySetupTab: Locator;
  readonly selectCalendarLink: Locator;
  readonly importCalendarLink: Locator;
  readonly chooseFileButton: Locator;
  readonly submitButton: Locator;
  readonly saveButton: Locator;
  readonly calendarNameLink: Locator;
  readonly defineCalendarLink: Locator;
  readonly calendarStatus: Locator;
  readonly moveEventCheckbox: Locator;
  readonly selectAnOptionCell: Locator;
  readonly protocolName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helper = new VelosHelper(page);

    // Study Creation
    this.studyNumber = page.locator('#studyNumber');
    this.title = page.locator('#studyTitle');
    this.studyDivision = page.locator('#studyDivision');
    this.studyTherapeuticArea = page.locator('#studyTArea');
    this.studyPhase = page.locator('#studyPhase');
    this.eSign = page.locator('#eSign');
    this.studyStatusTab = page.getByRole('link', { name: 'Study Status' });
    this.addNewStatusLink = page.getByRole('link', { name: 'ADD NEW STATUS' });
    this.protocolStatus = page.getByLabel('protocolStatus');
    this.expandAllButton = page.getByRole('button', { name: 'Expand All' });

    // Study Setup / Calendar
    this.studySetupTab = page.getByRole('link', { name: 'Study Setup' });
    this.selectCalendarLink = page.getByRole('link', { name: 'SELECT A CALENDAR FROM YOUR' });
    this.importCalendarLink = page.getByRole('link', { name: 'IMPORT A CALENDAR' });
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.calendarNameLink = page.getByRole('link', { name: 'velos play' });
    this.defineCalendarLink = page.getByRole('link', { name: 'Define the Calendar' });
    this.calendarStatus = page.locator('select[name="calStatus"]');
    this.moveEventCheckbox = page.getByRole('cell', { name: 'Move this event only.' }).getByRole('checkbox');
    this.selectAnOptionCell = page.getByRole('cell', { name: 'Select an option' });
    this.protocolName = page.locator('#protocolName');
  }

  /**
   * Generate a unique study number using a prefix + timestamp.
   * @param prefix - Prefix for the study number (default: 'STD_')
   */
  static generateUniqueStudyNumber(prefix = 'STD_'): string {
    return `${prefix}${Date.now()}`;
  }

  /**
   * Fill in the study creation form.
   * @param data - Study data object (matches studycreation.json shape)
   */
  async createStudy(data: {
    studyNumberPrefix?: string;
    title: string;
    division: string;
    therapeuticArea: string;
    phase: string;
    eSign?: string;
    [key: string]: any;
  }) {
      await this.helper.navigateTo("Manage", "Studies", "New");

    const studyNumber = StudyPage.generateUniqueStudyNumber(data.studyNumberPrefix);
    this.lastStudyNumber = studyNumber;
   await VelosHelper.checkIfAppears(this.expandAllButton, 1000);

    await this.studyNumber.fill(studyNumber);
    await this.title.fill(data.title);
    await this.studyDivision.selectOption({ index: 0 });
    await this.studyTherapeuticArea.click();
    await this.studyTherapeuticArea.selectOption({ index: 0 });
    await this.studyTherapeuticArea.selectOption({ index: 1 });
    await this.studyPhase.selectOption({ index: 1 });
    const eSignCount = await this.eSign.count();
    if (eSignCount > 0) {
      await this.helper.fillESignAndSubmit();
    } else {
      await this.page.getByRole('button', { name: 'Save' }).first().click();
      await this.page.waitForLoadState('domcontentloaded');
    }

  }

  /**
   * Add a study status after study creation.
   */
  async addStudyStatus(statusValue: string) {
    await this.studyStatusTab.click();
    await this.addNewStatusLink.click();
    await this.protocolStatus.selectOption({ index: 0 });
  }

  /**
   * Add an enrolled status using data from the database.
   * Retrieves active enrolling study status from database and fills the form.
   */
  async addEnrolledStatus() {
    // Navigate to add new status
      await this.page.getByRole('link', { name: 'Study Status' }).click();

    await this.addNewStatusLink.click();

    let selectedByValue = false;
    const db = new DBHelper();
    try {
      // Try DB lookup for exact option values
      const { pkCodelst, statusTypePk } = await db.getActiveEnrollingStudyStatusCode();
      console.log(`[DB Values] pkCodelst: ${pkCodelst}, statusTypePk: ${statusTypePk}`);
      await this.page.locator('#studyStatusType').selectOption({ value: statusTypePk.toString() });
      await this.page.waitForTimeout(1000);
      await this.page.locator('#protocolStatus').selectOption({ value: pkCodelst.toString() });
      selectedByValue = true;
    } catch (err) {
      console.warn(`[DB Fallback] DB connection failed, selecting by label. Error: ${err}`);
    } finally {
      await db.close().catch(() => {});
    }

    if (!selectedByValue) {
      // Fallback: select by label text directly
      await this.page.locator('#studyStatusType').selectOption({ label: 'Study Activity' });
      await this.page.waitForTimeout(1000);
      await this.page.locator('#protocolStatus').selectOption({ label: 'Active/Enrolling' });
    }

    // Click start date and select current date
    await this.page.locator('input[name="startDate"]').click();
    await this.page.getByRole('button', { name: 'Today' }).click();

    // Submit with eSign
    await this.helper.fillESignAndSubmit();
  }

  /**
   * Navigate to Study Setup and select a calendar from a popup search.
   * @param searchTerm - Search keyword for calendar (default: 'velos')
   */
  async selectCalendarFromPopup(searchTerm = 'velos') {
    await this.studySetupTab.click();
    const popupPromise = this.page.waitForEvent('popup');
    await this.selectCalendarLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.locator("//input[@name='searchName']").fill(searchTerm);
    await popup.getByRole('button', { name: 'Search' }).click();
    await popup.getByRole('link', { name: 'Select', exact: true }).first().click();
  }

  /**
   * Import a calendar file.
   * @param filePath - Relative path to the CSV file under test-data/
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async importCalendarandVerifyImport(filePath: string, eSignValue?: string) {
    await this.importCalendarLink.click();
    await this.chooseFileButton.setInputFiles(path.resolve('test-data', filePath));
    const calendarName=`Import_${Date.now()}`;
    await this.protocolName.fill(calendarName);  
    await this.page.locator('//input[@name="durNum"]').fill('10'); // Assuming this is a required field based on the original code
    await this.page.locator('#calendartyp').selectOption({ index: 0 }); // Assuming this is a required field based on the original code
    await this.page.selectOption('select[name="durUnit"]', 'Year(s)'); // Assuming this is a required field based on the original code
await this.submitButton.click(); 
await this.helper.fillESignAndSubmit(eSignValue);
await this.page.getByRole('link', { name: calendarName }).click();
 await this.page.getByPlaceholder('Study #, Title or Keyword').fill(this.lastStudyNumber);
  await this.page.keyboard.press('Enter');
  await this.page.locator('.studyMenuPop').click();
  await this.page.getByRole('link', { name: 'Study Setup' }).click();
  expect(this.page.getByRole('link', { name: calendarName })).toBeVisible();
  }

  /**
   * Define the calendar status.
   * @param calendarName - The calendar link name to navigate to
   * @param status - Calendar status option value (default: 'A')
   */
  async defineCalendar(calendarName: string, status = 'A') {
    await this.page.getByRole('link', { name: calendarName }).click();
    await this.defineCalendarLink.click();
    await this.calendarStatus.selectOption(status);
    await this.moveEventCheckbox.check();
    await this.selectAnOptionCell.click();
    await this.moveEventCheckbox.press('ArrowDown');
  }

  /**
   * Change calendar status to Active (or specified status) and submit with eSign.
   * @param calendarName - The calendar link name to navigate to
   * @param status - Calendar status option value (default: 'A' for Active)
   */
  async changeCalendarStatus(calendarName: string, status: string) {
    await this.page.getByRole('link', { name: calendarName }).click();
    await this.page.getByRole('link', { name: 'Define the Calendar ' }).click();
    await this.calendarStatus.selectOption(status);
    await this.page.getByRole('cell', { name: 'Move this event only.' }).getByRole('checkbox').check();
    await this.helper.fillESignAndSubmit();
    await this.page.getByRole('link', { name: 'Back to Calendars' }).click();
  }

  /**
   * Select a calendar from the library popup and activate it.
   * Combines selectCalendarFromPopup + changeCalendarStatus.
   * @param calendarName - Calendar name to search and activate
   */
  async importCalendarFromLibraryAndActivateCalendar(calendarName: string) {
    await this.selectCalendarFromPopup(calendarName);
    await this.changeCalendarStatus(calendarName, 'Active');
  }

  /**
   * Add an existing patient to a study with enrolled status.
   * @param studyNumber - Study number to search for
   * @param patientId - Patient ID to search and select
   */
  async addPatientToStudy(studyNumber: string, patientId: string) {
      // Search for study in header search box
      await this.page.getByPlaceholder('Study #, Title or Keyword').fill(studyNumber);
      await this.page.keyboard.press('Enter');
      // Navigate to Patient Management - Enrolled
      await this.page.getByRole('link', { name: 'Patient Management - Enrolled' }).click();

      // Click SELECT AN EXISTING PATIENT button
      await this.page.getByRole('link', { name: 'SELECT AN EXISTING PATIENT' }).click();

      // Search for patient
      await this.page.locator('input[name="patCode"]').fill(patientId);
      await this.page.getByRole('button', { name: 'Search' }).click();

      // Select patient from results (first link with patient ID)
      const popupPromise = this.page.waitForEvent('popup');
      await this.page.getByRole('link', { name: 'Select', exact: true }).first().click();
      const popup = await popupPromise;
      await popup.waitForLoadState();

      let enrolledStatus = 'Enrolled';
      const db = new DBHelper();
      try {
        enrolledStatus = await db.getEnrolledPatientStatus();
        console.log(`[DB Value] Enrolled Status: ${enrolledStatus}`);
      } catch (err) {
        console.warn(`[DB Fallback] DB connection failed, using hardcoded 'Enrolled'. Error: ${err}`);
      } finally {
        await db.close().catch(() => {});
      }

      // Set patient status
      await popup.locator('select[name="patstatus"]').selectOption(enrolledStatus);
      await popup.waitForLoadState('domcontentloaded');
      await popup.locator('input[name="patStudyId"]').fill(patientId);
      await popup.locator('input[name="StatusDate"]').click();
      await popup.getByRole('button', { name: 'Today' }).click();
      // Submit with eSign on popup
      const popupHelper = new VelosHelper(popup);
      await popupHelper.fillESignAndSubmit();
      await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Create patient schedule by selecting calendar and setting start date.
   * @param calendarName - Calendar name to select from dropdown
   */
  async createPatientSchedule(calendarName: string) {
    // Click Schedule tab
    await this.page.getByRole('link', { name: 'Schedule', exact: true }).click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for popup and click Edit Calendar/Date
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Edit Calendar/Date' }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();

    // Select calendar from dropdown
    await popup.locator('select[name="protocolId"]').click();
    await popup.locator('select[name="protocolId"]').selectOption({ label: calendarName });

    // Click start date input and select Today
    await popup.locator('input[name="protStDate"]').click();
    await popup.getByRole('button', { name: 'Today' }).click();
    // Fill eSign and submit
    const popupHelper = new VelosHelper(popup);
    await popupHelper.fillESignAndSubmit();
  }

  /**
   * Mark all visits as Done for a patient in a study.
   * @param studyNumber - Study number to search for
   * @param patientId - Patient ID to navigate to
   */
  async markAllVisitsAsDone(studyNumber: string, patientId: string) {
    // Navigate to patient schedule if not already there
    if (!this.page.url().includes('patientschedule.jsp')) {
      await this.helper.navigateToStudyPatient(studyNumber, patientId);

      await this.page.getByRole('link', { name: 'Schedule', exact: true }).click({ force: true });
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Open Update All popup
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Edit Multiple Events' }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    // Select all rows
    await popup.locator('input[name="selDeSelAll"]').check();

    // Set status to Done (value 25)
    await popup.locator('select[name="status"]').selectOption('25');

    // Set date to today
    await popup.locator('input[name="caldate"]').click();
    await popup.getByRole('button', { name: 'Today' }).click();

    // Click Update All Selected Rows
    await popup.getByRole('link', { name: 'Update All Selected Rows' }).click();

    // Fill eSign and submit
    const popupHelper = new VelosHelper(popup);
    await popupHelper.fillESignAndSubmit();
  }

  /**
   * Navigate to Budget tab and create a combined budget by selecting all calendars,
   * setting calendar status to Active, choosing a budget template, and submitting.
   * @param budgetTemplate - Budget template option value (default: '273:C')
   */
  async createCombinedBudget(budgetTemplate: string = '273:C') {
    // Navigate to Budget tab
    await this.page.getByRole('link', { name: 'Budget' }).last().click();
    await this.page.waitForLoadState('domcontentloaded');

    // Select all calendars
    await this.page.locator('#bgtAllCal').check();

    // Set calendar status to Active
    await this.page.locator('#calstatus').selectOption('A');

    // Select budget template
    await this.page.locator('select[name="budgetTemplate"]').selectOption(budgetTemplate);

    // Fill eSign and submit
    await this.helper.fillESignAndSubmit();
  }

  /**
   * Add a user as a study team member.
   * Navigates to Study Team tab, clicks ADD/EDIT, searches for the user, selects them, assigns a role, and submits.
   * @param userName - User's last name or display name to search for
   * @param role - Role to assign (e.g. 'Finance', 'PI', 'Coordinator')
   * @param organization - Organization to filter by (optional)
   * @param studyNumber - Study number to open (optional, defaults to lastStudyNumber)
   */
  async addStudyTeamMember(userName: string, role: string, organization?: string, studyNumber?: string) {
    const study = studyNumber ?? this.lastStudyNumber;
    // Navigate to Study Team tab, opening the study first if needed
    if (!this.page.url().includes('teamBrowser.jsp')) {
      await this.helper.searchAndOpenStudy(study);
    }
    await this.page.getByRole('link', { name: 'Study Team' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Click ADD/EDIT STUDY TEAM MEMBER
    await this.page.getByRole('link', { name: 'ADD/EDIT STUDY TEAM MEMBER' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Optionally filter by organization
    if (organization) {
      await this.page.locator('select[name="orgName"]').selectOption({ label: organization });
    }

    // Search for the user
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Select the user checkbox
    const userRow = this.page.locator('tr').filter({ hasText: userName });
    await userRow.getByRole('checkbox').first().check();

    // Select role from dropdown
    const roleDropdown = this.page.locator('#role').first();
    await roleDropdown.selectOption({ label: 'Finance' });

    // Submit
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
