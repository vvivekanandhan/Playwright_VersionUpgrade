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
    const db = new DBHelper();
    try {
      // Get active enrolling study status from database
      const { pkCodelst, statusTypePk } = await db.getActiveEnrollingStudyStatusCode();
      console.log(`[DB Values] pkCodelst: ${pkCodelst}, statusTypePk: ${statusTypePk}`);
      await this.page.pause (); // Debugging pause to inspect the page before adding enrolled status
      // Navigate to add new status
      await this.addNewStatusLink.click();
      
      // Select study status type and protocol status (by value attribute)
      await this.page.locator('#studyStatusType').selectOption({ value: statusTypePk.toString() });
      await this.page.locator('#protocolStatus').selectOption({ value: pkCodelst.toString() });
      
      // Click start date and select current date
      await this.page.locator('input[name="startDate"]').click();
      await this.page.getByRole('button', { name: 'Current' }).click();
      
      // Submit with eSign
      await this.helper.fillESignAndSubmit();
    } finally {
      await db.close();
    }
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
    await popup.getByRole('link', { name: 'Select' }).first().click();
  }

  /**
   * Import a calendar file.
   * @param filePath - Relative path to the CSV file under test-data/
   * @param eSignValue - eSign value to enter (defaults to process.env.ESIGN)
   */
  async importCalendar(filePath: string, eSignValue?: string) {
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
await this.page.pause(); // Debugging pause to inspect the page after login

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
}
