import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
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

test.only('Create a new Lib Calendar and verify', async ({ login, nav, page, studyData, calendarData }) => {
  sharedNav = nav;
  sharedPage = page;
  studyPage = new StudyPage(page);
  calendarPage = new VelosCalendarPage(page);
  portalPage = new VelosPortalPage(page);
  createdCalendarName = calendarData.calendarName;
  await nav.navigateTo("Libraries", "Calendars", "Add Calendar");
  await calendarPage.fillCalendarForm(calendarData);
  await calendarPage.selectEventsFromPopup(calendarData.eventRowCount);
   await calendarPage.manageVisitsLink.click();
  // Create Fixed Time Point visit
  await calendarPage.createFixedTimePointVisit(calendarData.fixedTimePointVisit);
  // Create Dependent Time Point visit
  await calendarPage.createDependentTimePointVisit(calendarData.dependentTimePointVisit);
  // Create No Time Point visit
  await calendarPage.createNoTimePointVisit(calendarData.noTimePointVisit);
  await nav.previewAndSave();
  
  // Navigate to Event-Visit Grid and check all header checkboxes
  await calendarPage.navigateToEventVisitGrid();
  await calendarPage.checkAllEventVisitGridHeaders();
  await nav.previewAndSave();
});

test('test', async ({ page }) => {
  const cal = new VelosCalendarPage(page);
  await cal.helper.fillESignAndSubmit('1234');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Search' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('row', { name: 'Clinical Visits 7568 Baseline Evaluation Baseline Evaluation - [ Research Cost - 1,950.00 US Dollars ] - ORG NAMES', exact: true }).getByRole('checkbox').check();
  await page1.getByRole('row', { name: 'Clinical Visits 546879 Follow Up Event Description 1 QA_Added Notes [ Billable to Insurance - 10.00 US Dollars ], [ Billable to Patient - 20.00 US Dollars ], [ Billable to Site - 25.00 US Dollars ], [ Equipment - 50.00 US Dollars ], [ Miscellaneous - 25.00 US Dollars ], [ Research Cost - 50.00 US Dollars ] [ Additional_Code - CODE3 ], [ Text Fld02 - CODE2 ... Velos', exact: true }).getByRole('checkbox').check();
  await page1.getByRole('row', { name: 'Clinical Visits - Informed Consent - - - - -', exact: true }).getByRole('checkbox').check();
  await page1.locator('td:nth-child(2) > a').click();
  
  const popupCal = new VelosCalendarPage(page1);
  await popupCal.helper.fillESignAndSubmit('1234');
  await cal.addVisitRows('03');
  await cal.firstVisitNameCell.click();
  await page.getByRole('row', { name: '1 Copy Visit Delete Row 0' }).getByRole('textbox').fill('v1');
  await page.getByText('No Time Point Defined').first().click();
  await page.getByRole('combobox').selectOption('Fixed Time Point');
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('spinbutton').fill('10');
  await page.locator('.yui-dt-col-intervalUnit > .yui-dt-liner').first().click();
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(4).click();
  await page.locator('.even > .yui-dt-col-visitName').click();
  await page.getByRole('row', { name: '2 Copy Visit Delete Row 0' }).getByRole('textbox').fill('v2');
  await page.getByText('No Time Point Defined').first().click();
  await page.getByRole('combobox').selectOption('Dependent Time Point');
  await page.locator('.even > .yui-dt-col-weeks > .yui-dt-liner').click();
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(2).click();
  await page.locator('.even > .yui-dt-col-insertAfterInterval').click();
  await page.getByRole('spinbutton').fill('2');
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(5).click();
  await page.locator('.even > .yui-dt-col-intervalUnit').click();
  await page.getByRole('combobox').selectOption('Weeks');
  await page.locator('.even > .yui-dt-col-insertAfter').click();
  await page.getByRole('combobox').selectOption('First Visit');
  await page.locator('.odd.yui-dt-highlighted > .yui-dt-col-visitName > .yui-dt-liner').click();
  await page.getByRole('row', { name: '3 Copy Visit Delete Row 0' }).getByRole('textbox').fill('v3');
  await cal.previewSaveAndSign('1234');
  await cal.eventVisitGridLink.click();
  await page.locator('#yui-dt-e285411v12250').check();
  await page.locator('#all_v12250').check();
  await page.locator('#all_v12251').check();
  await page.locator('#all_v12252').check();
  await cal.previewSaveAndSign('1234');
  await cal.coverageAnalysisLink.click();
  await cal.defineTheCalendarLink.click();
});

// Runs after each test regardless of pass or fail
// test.afterEach(async () => {
//   if (createdCalendarName && sharedPage && calendarPage && portalPage) {
//     try {
//       await sharedNav.navigateTo("Libraries", "Calendars", "Search");
//       await calendarPage.deleteCalendar(createdCalendarName, process.env.ESIGN!, portalPage);
//       console.log(`✓ Cleanup: Calendar "${createdCalendarName}" deleted successfully`);
//     } catch (error) {
//       console.log(`✗ Cleanup failed: ${error}`);
//     }
//   }
// });