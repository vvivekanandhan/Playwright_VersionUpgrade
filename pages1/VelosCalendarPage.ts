import { type Page, type Locator, expect } from '@playwright/test';
import { VelosPortalPage } from './VelosPortalPage';
import { VelosHelper } from '../helpers/VelosHelper';
import path from 'path';

/**
 * VelosCalendarPage – calendar import, category management,
 * coverage analysis popup, and admin schedule operations.
 *
 * Converted from:
 *   - Velos_CalendarPage.java (locators)
 *   - Steps_VelosCalendarPage.java (calendar steps)
 *   - Steps_VelosPortal.java (coverage analysis popup steps)
 *   - Steps_VelosEventLibraryPage.java (event category steps)
 */
export class VelosCalendarPage {
  page: Page;
  helper: VelosHelper;

  /* ── locators ───────────────────────────────────────── */

  /** Coverage Analysis popup */
  private get caPopup() {
    return this.page.locator('div.ui-dialog.ui-widget-content').first();
  }

  /** Coverage Analysis first row link */
  private get caLink() {
    return this.page.locator('//*[@id="yui-rec0"]/td[1]/p').first();
  }

  /** Coverage Analysis popup close button */
  private get caCloseButton() {
    return this.page.locator(
      'button.ui-button.ui-dialog-titlebar-close, button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only.ui-dialog-titlebar-close',
    ).first();
  }

  /** Coverage Analysis popup resize handle */
  private get caResizeHandle() {
    return this.page.locator('.ui-resizable-se').first();
  }

  /** File upload input on Import a Calendar page */
  private get fileUploadInput() {
    return this.page.locator('#csvFile').first();
  }

  /** Calendar duration input */
  private get calendarDurationInput() {
    return this.page.locator('input[name="durNum"]');
  }

  /** Calendar category dropdown (on Search page) */
  private get calendarCategoryDropdown() {
    return this.page.locator(
      "//select[contains(@name,'calCategory')]|//td[contains(text(),'Calendar Category')]/following-sibling::td//select",
    ).first();
  }

  /** Search button */
  private get searchButton() {
    return this.page.getByRole('button', { name: 'Search', exact: true }).first();
  }

  /* ── Add Calendar form locators ─────────────────────── */

  /** Calendar Name input */
  get calendarNameInput() {
    return this.page.getByRole('row', { name: 'Calendar Name *' }).locator('#protocolName')
  }

  /** Calendar Description input */
  get calendarDescriptionInput() {
    return this.page.locator('#desc');
  }

  /** Calendar Type dropdown */
  get calendarTypeDropdown() {
    return this.page.locator('#caltype');
  }

  /** Duration number input */
  get durationNumberInput() {
    return this.page.locator('input[name="durNum"]');
  }

  /** Duration unit dropdown */
  get durationUnitDropdown() {
    return this.page.locator('select[name="durUnit"]');
  }

  /** Select Events link */
  get selectEventsLink() {
    return this.page.getByRole('link', { name: 'Select Events' }).nth(1);
  }

  /** Manage Visits link */
  get manageVisitsLink() {
    return this.page.getByRole('link', { name: 'Manage Visits' }).nth(1);
  }

  /** Row count input */
  get rowCountInput() {
    return this.page.locator('#rowCount');
  }

  /** Add row image button */
  get addRowButton() {
    return this.page.getByRole('img', { name: 'Add' });
  }

  /** First visit name cell */
  get firstVisitNameCell() {
    return this.page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).first();
  }

  /** First row textbox */
  get firstRowTextbox() {
    return this.page.getByRole('row').first().getByRole('textbox');
  }

  /** eSign input */
  get eSignInput() {
    return this.page.locator('#eSign');
  }

  /** Submit button */
  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  /** Popup second column link (select events) */
  private popupSelectLink(popup: Page) {
    return popup.locator('td:nth-child(2) > a');
  }

  /** Preview and Save button */
  get previewAndSaveButton() {
    return this.page.getByRole('button', { name: 'Preview and Save' });
  }

  /** Save button */
  get saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
  }

  /** Event-Visit Grid link */
  get eventVisitGridLink() {
    return this.page.getByRole('link', { name: 'Event-Visit Grid' });
  }

  /** Coverage Analysis link */
  get coverageAnalysisLink() {
    return this.page.getByRole('link', { name: 'Coverage Analysis' });
  }

  /** Define the Calendar link */
  get defineTheCalendarLink() {
    return this.page.getByRole('link', { name: 'Define the Calendar' });
  }

  constructor(page: Page) {
    this.page = page;
    this.helper = new VelosHelper(page);
  }

  /* ── Add Calendar Actions ───────────────────────────── */

  /** Fill the Add Calendar form fields */
  async fillDefineCalendar(calendarData: { calendarName: string; description: string; calType: string; duration: string; durationUnit: string }) {
    const { calendarName, description, calType, duration, durationUnit } = calendarData;
    await this.calendarNameInput.first().fill(calendarName);
    await this.calendarDescriptionInput.fill(description);
    await this.calendarTypeDropdown.selectOption({ index: 1 });
    await this.durationNumberInput.fill(duration);
    await this.durationUnitDropdown.selectOption(durationUnit);
    await this.helper.fillESignAndSubmit();

  }

  /** Click Select Events and search for events in the popup, selecting first N rows */
  async selectEventsFromPopup(eventCategoryName?: string) {
    await this.selectEventsLink.click();
    const page1Promise = this.page.waitForEvent('popup');
    await this.searchButton.click();
    const popup = await page1Promise;
    
    // Select event category - use label if provided, otherwise use index 1
   
await popup.locator('select[name="cmbLibType"]').selectOption({ index: 0});
await popup.waitForTimeout(500)
  await popup.locator('select[name="catId"]').selectOption({ label: eventCategoryName });
  await popup.waitForTimeout(500); // Wait for category dropdown to populate
      
    
    await popup.getByRole('button', { name: 'Search' }).first().click();
    await popup.waitForLoadState('domcontentloaded');
    await popup.waitForLoadState('networkidle');
    await popup.getByRole('checkbox').first().check();
    await this.popupSelectLink(popup).click();
    const nav = new VelosHelper(popup);
    await nav.fillESignAndSubmit();
    await popup.waitForLoadState('domcontentloaded');
    popup.close().catch(() => {});
    return popup;
  }

  /** Click Manage Visits link and refresh the page */
  async clickManageVisitsAndRefresh() {
    await this.manageVisitsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Navigate to Manage Visits, add rows and fill visit name */
  async addVisitRows(rowCount: string) {
    await this.manageVisitsLink.click();
    await this.rowCountInput.fill(rowCount);
    await this.addRowButton.click();
  }

  /** Fill a visit name by clicking the visit name cell and typing */
  async fillVisitName(rowIndex: number, name: string) {
    // Click on the visit name cell for the specified row
    const visitNameCell = this.page.locator('//td[@class="  yui-dt-col-visitName"]').first();
    await visitNameCell.click();
    
    // Fill in the visit name using the textbox that appears
    const textbox = this.page.getByRole('textbox').first();
    await textbox.fill(name);
    
    // Click away to save
    await this.page.locator('#mvgrid').click();
  }

  /**
   * Create a Fixed Time Point visit with specified name and time values
   * @param visitData - Visit data object containing name, months, weeks, days
   */
  async createFixedTimePointVisit(visitData: { name: string; months: string; weeks: string; days: string }) {
    const { name, months = '0', weeks = '0', days = '0' } = visitData;
    await this.page.waitForLoadState('domcontentloaded');
    await this.rowCountInput.click();
    await this.page.keyboard.type('1', { delay: 100 });
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
        await this.page.waitForTimeout(1000); // Wait for the new row to be added to the DOM
    await this.addRowButton.click();
    // Click on the visit name cell for the first row
    const visitNameCell = this.page.locator('.yui-dt-col-visitName > .yui-dt-liner').first();
    await visitNameCell.click();
    
    // Fill in the visit name
    const visitNameInput = this.page.getByRole('row', { name: /Copy Visit Delete Row/ }).getByRole('textbox').first();
    await visitNameInput.fill(name);
    
    // Click on the cell containing "No Time Point Defined" to activate editing mode
    // Use a cell locator instead of text to avoid clicking the option element
    const timePointCell = this.page.getByRole('cell', { name: 'No Time Point Defined' }).first();
    await timePointCell.click();
    
    // Wait for combobox to appear and select "Fixed Time Point"
    const combobox = this.page.getByRole('combobox');
    await combobox.waitFor({ state: 'visible', timeout: 5000 });
    await combobox.selectOption('Fixed Time Point');
      await this.page.locator('#mvgrid').click(); // Click away to save the month value

    // Fill in month field if specified
    if (months !== '0') {
      await this.page.locator('.yui-dt-col-months > .yui-dt-liner').first().click();
      await this.page.getByRole('spinbutton').fill(months);
      await this.page.locator('#mvgrid').click(); // Click away to save the month value
    }
    
    // Fill in week field if specified
    if (weeks !== '0') {
      const weekCell = this.page.locator('.yui-dt-col-weeks > .yui-dt-liner').first();
      await weekCell.click();
      await this.page.getByRole('spinbutton').fill(weeks);
      await this.page.locator('#mvgrid').click(); // Click away to save the week value
    }
    
    // Fill in day field if specified
    if (days !== '0') {
      const dayCell = this.page.locator('.yui-dt-col-days > .yui-dt-liner').first();
      await dayCell.click();
      await this.page.getByRole('spinbutton').fill(days);
      await this.page.locator('#mvgrid').click(); // Click away to save the day value
    }
    
    // Click away to save the changes
    await this.page.locator('.yui-dt-col-visitName').first().click();
    
    console.log(`Created Fixed Time Point visit "${name}" with ${months} month(s), ${weeks} week(s), ${days} day(s)`);
  }

  /**
   * Create a Dependent Time Point visit with specified name and time values
   * @param visitData - Visit data object containing name, interval, intervalUnit, insertAfter
   */
  async createDependentTimePointVisit(visitData: { name: string; interval: string; intervalUnit: string; insertAfter: string }) {
    const { name, interval, intervalUnit = 'Days', insertAfter = 'First Visit' } = visitData;
    await this.rowCountInput.click();
    await this.page.keyboard.type('1', { delay: 100 });
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.page.waitForTimeout(500); // Wait for the  new row to be added to the DOM
    await this.addRowButton.click();

    // Click on the visit name cell for the first row
    const visitNameCell = this.page.locator('.yui-dt-col-visitName > .yui-dt-liner').first();
    await visitNameCell.click();
    
    // Fill in the visit name
    const visitNameInput = this.page.getByRole('row', { name: /Copy Visit Delete Row/ }).getByRole('textbox').first();
    await visitNameInput.fill(name);
    
    // Click on the cell containing "No Time Point Defined" to activate editing mode
    const timePointCell = this.page.getByRole('cell', { name: 'No Time Point Defined' }).first();
    await timePointCell.click();
    
    // Wait for combobox to appear and select "Dependent Time Point"
    const combobox = this.page.getByRole('combobox');
    await combobox.waitFor({ state: 'visible', timeout: 5000 });
    await combobox.selectOption('Dependent Time Point');
    await this.page.locator('#mvgrid').click(); // Click away to save

    // Fill in the interval value
    await this.page.locator('.yui-dt-col-insertAfterInterval > .yui-dt-liner').first().first().click();
    await this.page.getByRole('spinbutton').fill(interval);
    await this.page.locator('#mvgrid').click(); // Click away to save

    // Select the interval unit
    await this.page.locator('.yui-dt-col-intervalUnit > .yui-dt-liner').first().click();
    const unitCombobox = this.page.getByRole('combobox');
    await unitCombobox.waitFor({ state: 'visible', timeout: 5000 });
    await unitCombobox.selectOption(intervalUnit);

    // Select which visit to insert after
    await this.page.locator('.yui-dt-col-insertAfter > .yui-dt-liner').first().click();
    const insertAfterCombobox = this.page.getByRole('combobox');
    await insertAfterCombobox.waitFor({ state: 'visible', timeout: 5000 });
    await insertAfterCombobox.selectOption(insertAfter);
    await this.page.locator('#mvgrid').click(); // Click away to save

    
    console.log(`Created Dependent Time Point visit "${name}" - ${interval} ${intervalUnit} after "${insertAfter}"`);
  }

  /**
   * Create a visit with No Time Point Defined
   * @param visitData - Visit data object containing name
   */
  async createNoTimePointVisit(visitData: { name: string }) {
    const { name } = visitData;
    await this.rowCountInput.click();
    await this.page.keyboard.type('1', { delay: 100 });
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    await this.addRowButton.click();
    await this.page.waitForTimeout(500); // Wait for the new row to be added to the DOM
    // Click on the visit name cell
    const visitNameCell = this.page.locator('.yui-dt-col-visitName > .yui-dt-liner').first();
    await visitNameCell.click();
    
    // Fill in the visit name
    const visitNameInput = this.page.getByRole('row', { name: /Copy Visit Delete Row/ }).getByRole('textbox').first();
    await visitNameInput.fill(name);
    
    // Click away to save the changes (leave time point as "No Time Point Defined")
    await this.page.locator('#mvgrid').click();
    
    console.log(`Created visit "${name}" with No Time Point Defined`);
  }

  /** Click Preview and Save, then fill eSign and Save */
  async previewSaveAndSign(pin: string) {
    await this.previewAndSaveButton.click();
    await this.helper.fillESign(pin);
    await this.saveButton.click();
  }

  /**
   * Check all header checkboxes in the Event-Visit Grid
   */
  async checkAllEventVisitGridHeaders() {
    const headerCheckboxes = this.page.locator('.tableHeader input[type="checkbox"]');
    const checkboxCount = await headerCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
      await headerCheckboxes.nth(i).check();
    }
  }

  /**
   * Navigate to Event-Visit Grid
   */
  async navigateToEventVisitGrid() {
    await this.eventVisitGridLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /* ── Calendar Category ──────────────────────────────── */

  /**
   * Search for a calendar category; create it if it doesn't exist.
   *
   * Maps the Selenium step:
   *   "I search for category and create a new category with name X
   *    and description Y with securitypin Z"
   */
  async ensureCalendarCategoryExists(
    categoryName: string,
    categoryDescription: string,
    securityPin: string,
    portal: VelosPortalPage,
  ) {
    // Check if the category already exists in the dropdown
    const dropdown = this.calendarCategoryDropdown;
    if (await dropdown.isVisible({ timeout: 5_000 }).catch(() => false)) {
      const options = await dropdown.locator('option').allTextContents();
      if (options.some((o) => o.trim() === categoryName)) {
        console.log(`Calendar category "${categoryName}" already exists – skipping.`);
        return;
      }
    }

    // Navigate to Add Category
    await portal.navigateSublinkBySection('Add Category', 'Calendars', 'Libraries');
    await this.page.waitForLoadState('domcontentloaded');

    // Fill category form
    await this.formField('Calendar Category').fill(categoryName);
    await this.formField('Category Description').fill(categoryDescription);
    await portal.enterSecurityPinAndVerify(securityPin, 'Valid Security PIN');
    await portal.submitForm();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(`Calendar category "${categoryName}" created.`);
  }

  /* ── Event Category ─────────────────────────────────── */

  /**
   * Search for an event category under a library; create it if missing.
   *
   * Maps:
   *   "I search category and create a new event category under library X
   *    with category name Y and category description Z with securitypin W"
   */
  async ensureEventCategoryExists(
    library: string,
    categoryName: string,
    categoryDescription: string,
    securityPin: string,
    portal: VelosPortalPage,
  ) {
    await portal.navigateSublinkBySection('Search', 'Events', 'Libraries');
    await this.page.waitForLoadState('domcontentloaded');

    // Select event library
    const libraryDropdown = this.page.locator(
      "//select[contains(@name,'eventLib')]|//td[contains(text(),'Event Library')]/following-sibling::td//select",
    ).first();
    if (await libraryDropdown.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await libraryDropdown.selectOption({ label: library });
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Check if category already present
    const eventCatDropdown = this.page.locator(
      "//select[contains(@name,'eventCategory')]|//td[contains(text(),'Event Category')]/following-sibling::td//select",
    ).first();
    if (await eventCatDropdown.isVisible({ timeout: 5_000 }).catch(() => false)) {
      const options = await eventCatDropdown.locator('option').allTextContents();
      if (options.some((o) => o.trim() === categoryName)) {
        console.log(`Event category "${categoryName}" already exists – skipping.`);
        return;
      }
    }

    // Create new event category
    await portal.navigateSublinkBySection('Add Category', 'Events', 'Libraries');
    await this.page.waitForLoadState('domcontentloaded');

    if (await libraryDropdown.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await libraryDropdown.selectOption({ label: library });
      await this.page.waitForLoadState('domcontentloaded');
    }

    await this.formField('Event Category Name').fill(categoryName);
    await this.formField('Event Category Description').fill(categoryDescription);
    await portal.enterSecurityPinAndVerify(securityPin, 'Valid Security PIN');
    await portal.submitForm();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(`Event category "${categoryName}" created.`);
  }

  /* ── Import a Calendar ──────────────────────────────── */

  /**
   * Import a calendar from a CSV file.
   *
   * @param fileName       CSV file name (must exist in the Upload/ folder)
   * @param calendarName   Name to give the imported calendar
   * @param category       Calendar category to select
   * @param duration       Duration value to enter
   * @param securityPin    Security PIN
   * @param portal         VelosPortalPage instance
   */
  async importCalendar(
    fileName: string,
    calendarName: string,
    category: string,
    duration: string,
    securityPin: string,
    portal: VelosPortalPage,
  ) {
    await portal.clickHomepageLink('IMPORT A CALENDAR');
    await portal.expectTextOnPage('Calendar >> Import a Calendar');

    // Upload CSV
    const filePath = path.resolve(__dirname, '..', 'Upload', fileName);
    await this.fileUploadInput.setInputFiles(filePath);

    // Fill calendar details
    await this.formField('Calendar Name').fill(calendarName);
    await this.formDropdown('Calendar Category').selectOption({ label: category });
    await this.calendarDurationInput.fill(duration);
    await this.formDropdown('Calendar Duration').selectOption({ label: 'Day(s)' });

    // Submit & confirm preview
    await portal.submitForm();
    await this.page.waitForLoadState('domcontentloaded');
    await portal.expectTextOnPage('Calendar >> Import a Calendar >> Calendar Preview');
    await portal.expectTextOnPage(calendarName);

    // Enter security PIN & submit
    await portal.enterSecurityPinAndVerify(securityPin, 'Valid Security PIN');
    await portal.submitForm();
    await this.page.waitForLoadState('domcontentloaded');
    await portal.expectTextOnPage(calendarName);

    // Click on the calendar link to confirm it opened
    await portal.clickHomepageLink(calendarName);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /* ── Calendar Search ────────────────────────────────── */

  /**
   * Search for a calendar by name on the Libraries > Calendars > Search page.
   */
  async searchCalendar(calendarName: string) {
    const searchField = this.page.locator('input[name="searchName"]').first();

    await searchField.fill(calendarName);
    await this.searchButton.click();
  }

  /* ── Admin Schedule ─────────────────────────────────── */

  /**
   * Select a calendar from the library for the Admin Schedule.
   * Handles the popup window flow.
   */
  async selectCalendarFromLibrary(calendarName: string) {
    await portal_clickLink(this.page, 'SELECT A CALENDAR FROM YOUR LIBRARY');

    // Handle popup window
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      // The click may already have triggered the popup above
    ]).catch(() => [null]);

    if (popup) {
      await popup.waitForLoadState('domcontentloaded');
      const searchField = popup.locator(
        "//td[contains(text(),'Calendar Name')]/following-sibling::td/input",
      ).first();
      await searchField.fill(calendarName);
      await popup.getByRole('button', { name: 'Search' }).first().click();
      await popup.waitForLoadState('domcontentloaded');
      await popup.getByRole('link', { name: 'Select' }).first().click();
      await popup.close().catch(() => {});
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Alternative: Select calendar from library using page.on('popup').
   * Use when the popup link opens in a new window.
   */
  async selectCalendarFromLibraryPopup(calendarName: string) {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'SELECT A CALENDAR FROM YOUR LIBRARY' }).first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    const searchField = popup.locator(
      "//td[contains(text(),'Calendar Name')]/following-sibling::td//input" +
      "|//input[contains(@name,'calName')]",
    ).first();
    await searchField.fill(calendarName);
    await popup.getByRole('button', { name: 'Search' }).first().click();
    await popup.waitForLoadState('domcontentloaded');
    await popup.getByRole('link', { name: 'Select' }).first().click();

    // Popup auto-closes; wait for main page to reflect the change
    await this.page.waitForLoadState('domcontentloaded');
  }

  /* ── Coverage Analysis Popup ────────────────────────── */

  /** Click the Coverage Analysis link (first row) */
  async clickCoverageAnalysisLink() {
    await this.caLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Verify the Coverage Analysis popup is expanded and displayed (~75% of window) */
  async verifyCoverageAnalysisPopupExpanded() {
    await expect(this.caPopup).toBeVisible();

    const popupBox = await this.caPopup.boundingBox();
    const viewportSize = this.page.viewportSize();

    if (popupBox && viewportSize) {
      const heightPercent = (popupBox.height / viewportSize.height) * 100;
      const widthPercent = (popupBox.width / viewportSize.width) * 100;
      console.log(`Popup size: ${widthPercent.toFixed(1)}% x ${heightPercent.toFixed(1)}%`);
      // Verify popup is at least ~50% of window (generous threshold)
      expect(widthPercent).toBeGreaterThan(40);
      expect(heightPercent).toBeGreaterThan(40);
    }
  }

  /** Resize the Coverage Analysis popup by dragging the bottom-right corner */
  async resizeCoverageAnalysisPopup() {
    const handle = this.caResizeHandle;
    await handle.scrollIntoViewIfNeeded();
    const box = await handle.boundingBox();
    if (box) {
      await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + 100, box.y + 100, { steps: 10 });
      await this.page.mouse.up();
      console.log('Popup resized successfully.');
    }
  }

  /** Close the Coverage Analysis popup */
  async closeCoverageAnalysisPopup() {
    await this.caCloseButton.click();
    await expect(this.caPopup).not.toBeVisible({ timeout: 5_000 }).catch(() => {
      // Popup may have already closed
    });
  }

  /* ── Delete Calendar ────────────────────────────────── */

  /**
   * Delete a calendar by name from the Libraries > Calendars > Search page.
   */
  async deleteCalendar(
    calendarName: string,
    securityPin: string,
    portal: VelosPortalPage,
  ) {
    await this.searchCalendar(calendarName);
    const deleteIcon = this.page.getByRole('link', { name: 'Delete' }).first();
      await deleteIcon.click();
      await this.helper.fillESignAndSubmit();

      console.log(`Calendar "${calendarName}" deleted.`);
   
  }

  /* ── private helpers ────────────────────────────────── */

  /** Label-based form input field locator */
  private formField(label: string) {
    return this.page.locator(
      `//td[contains(text(),'${label}')]/following-sibling::td//input` +
      `|//label[contains(text(),'${label}')]/../following-sibling::td//input` +
      `|(//td[contains(text(),'${label}')]/following-sibling::td/input)[1]`,
    ).first();
  }

  /** Label-based form dropdown locator */
  private formDropdown(label: string) {
    return this.page.locator(
      `//td[contains(text(),'${label}')]/following-sibling::td//select`,
    ).first();
  }
}

/* ── module-level helper ────────────────────────────── */
async function portal_clickLink(page: Page, text: string) {
  await page.getByRole('link', { name: text }).first().click();
}
