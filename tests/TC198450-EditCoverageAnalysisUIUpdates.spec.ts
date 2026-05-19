import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage';
import { VelosCalendarPage } from '../pages/VelosCalendarPage';
import { VelosStudyPage } from '../pages/VelosStudyPage';

/**
 * TC198450 – [Vel-14528] – eResearch – Edit Coverage Analysis UI Updates
 *
 * Validates that the Coverage Analysis popup opens at ~75% of the window,
 * is resizable via drag, and can be closed — across Library calendars,
 * Study Setup calendars, and Admin Schedule calendars.
 *
 * Removed (Playwright handles automatically):
 *  - "I clear cache in IE browser"       → isolated browser contexts
 *  - "I start / close default Browser"   → managed by Playwright
 *  - "I wait N seconds"                  → auto-waiting on every action
 *  - Redundant logout → re-login cycles  → collapsed into single session
 *  - "I switch to new/previous window"   → handled via page.waitForEvent('popup')
 *  - Post-test cleanup block (skip from/end) → moved to afterAll or omitted
 */

const CREDENTIALS = {
  url: 'https://ctrlval.veloseresearch.com/velos/jsp/ereslogin.jsp',
  username: 'dkaviraj',
  password: 'Velos@123',
  securityPin: '1234',
};

const TEST_DATA = {
  studyNumber: 'FT-198450A',
  title: 'FormalStudy-198450A',
  division: 'Cancer Center',
  therapeuticArea: 'Anal Dysplasia',
  phase: 'Phase I',
  libraryCalendarName: 'LibraryCalendar-TC198450A',
  studyCalendarName: 'StudyCalendar-TC198450A',
  calendarCategory: 'CategoryTC198450',
  eventCategory: 'EventCategoryTC198450',
  eventCategoryDescription: 'TestCategoryTC198450',
  calendarDuration: '999',
  csvFileName: 'CalendarTemplate198450.csv',
};

test.describe('TC198450 – Edit Coverage Analysis UI Updates', () => {
  test.setTimeout(600_000); // generous timeout for data setup + test steps

  let portal: VelosPortalPage;
  let calendarPage: VelosCalendarPage;
  let studyPage: VelosStudyPage;

  test.beforeEach(async ({ page }) => {
    portal = new VelosPortalPage(page);
    calendarPage = new VelosCalendarPage(page);
    studyPage = new VelosStudyPage(page);
  });

  /* ─────────────────────────────────────────────────────
   * DATA SETUP
   * ────────────────────────────────────────────────────── */
  test('Data setup – categories, study, and calendars', async ({ page }) => {
    await portal.login(CREDENTIALS.username, CREDENTIALS.password, CREDENTIALS.url);

    // 1. Delete study if it already exists
    await studyPage.deleteStudyIfExists(
      TEST_DATA.studyNumber,
      CREDENTIALS.securityPin,
      portal,
    );

    // 2. Create Calendar Category (if not present)
    await portal.navigateSublinkBySection('Search', 'Calendars', 'Libraries');
    await calendarPage.ensureCalendarCategoryExists(
      TEST_DATA.calendarCategory,
      'test',
      CREDENTIALS.securityPin,
      portal,
    );

    // 3. Create Event Category (if not present)
    await calendarPage.ensureEventCategoryExists(
      'Default',
      TEST_DATA.eventCategory,
      TEST_DATA.eventCategoryDescription,
      CREDENTIALS.securityPin,
      portal,
    );

    // 4. Create new study
    await portal.navigateTo('Manage', 'Studies', 'Search');
    await studyPage.createStudy(
      {
        studyNumber: TEST_DATA.studyNumber,
        title: TEST_DATA.title,
        division: TEST_DATA.division,
        therapeuticArea: TEST_DATA.therapeuticArea,
        phase: TEST_DATA.phase,
        pi: '',
        securityPin: CREDENTIALS.securityPin,
      },
      portal,
    );
    await portal.expectTextOnPage('Data Saved Successfully');

    // 5. Import Study Calendar (under the study)
    await portal.searchStudyInHomepage(TEST_DATA.studyNumber);
    await portal.clickStudyAdminIcon(TEST_DATA.studyNumber);
    await portal.navigateToTab('Study Setup');
    await calendarPage.importCalendar(
      TEST_DATA.csvFileName,
      TEST_DATA.studyCalendarName,
      TEST_DATA.calendarCategory,
      TEST_DATA.calendarDuration,
      CREDENTIALS.securityPin,
      portal,
    );

    // 6. Import Library Calendar
    await portal.navigateSublinkBySection('Search', 'Calendars', 'Libraries');
    await calendarPage.importCalendar(
      TEST_DATA.csvFileName,
      TEST_DATA.libraryCalendarName,
      TEST_DATA.calendarCategory,
      TEST_DATA.calendarDuration,
      CREDENTIALS.securityPin,
      portal,
    );

    // 7. Associate Library Calendar to Admin Schedule
    await portal.searchStudyInHomepage(TEST_DATA.studyNumber);
    await portal.clickStudyAdminIcon(TEST_DATA.studyNumber);
    await portal.navigateToTab('Admin Schedule');
    await calendarPage.selectCalendarFromLibraryPopup(TEST_DATA.libraryCalendarName);

    await portal.logout();
  });

  /* ─────────────────────────────────────────────────────
   * TEST – Coverage Analysis popup behaviour
   * ────────────────────────────────────────────────────── */
  test('@Velos_TC198450 – Verify Coverage Analysis popup on Library, Study & Admin calendars', async ({ page }) => {
    await portal.login(CREDENTIALS.username, CREDENTIALS.password, CREDENTIALS.url);
    await portal.expectTextOnPage('Velos eResearch >> Homepage');

    // ── Step 2: Navigate to Library Calendars and search ──
    await portal.navigateSublinkBySection('Search', 'Calendars', 'Libraries');
    await calendarPage.searchCalendar(TEST_DATA.libraryCalendarName);
    await portal.expectTextOnPage(TEST_DATA.libraryCalendarName);

    // ── Step 3: Open Library Calendar → Coverage Analysis popup ──
    await portal.clickHomepageLink(TEST_DATA.libraryCalendarName);
    await portal.navigateToTab('Coverage Analysis');
    await calendarPage.clickCoverageAnalysisLink();
    await calendarPage.verifyCoverageAnalysisPopupExpanded();

    // ── Step 4: Resize and close the popup ──
    await calendarPage.resizeCoverageAnalysisPopup();
    await calendarPage.closeCoverageAnalysisPopup();

    // ── Step 5: Navigate to Study Setup calendar ──
    await portal.searchStudyInHomepage(TEST_DATA.studyNumber);
    await portal.clickStudyAdminIcon(TEST_DATA.studyNumber);
    await portal.navigateToTab('Study Setup');
    await portal.expectTextOnPage('Study >> Setup');
    await portal.expectTextOnPage(TEST_DATA.studyCalendarName);

    // ── Step 6: Open Study Calendar → Coverage Analysis popup ──
    await portal.clickHomepageLink(TEST_DATA.studyCalendarName);
    await portal.navigateToTab('Coverage Analysis');
    await calendarPage.clickCoverageAnalysisLink();
    await calendarPage.verifyCoverageAnalysisPopupExpanded();

    // ── Step 7: Resize and close the popup ──
    await calendarPage.resizeCoverageAnalysisPopup();
    await calendarPage.closeCoverageAnalysisPopup();

    // ── Step 8: Navigate to Admin Schedule calendar ──
    await portal.clickHomepageLink('Back to Calendars');
    await portal.navigateToTab('Admin Schedule');
    await portal.expectTextOnPage(TEST_DATA.libraryCalendarName);
    await portal.expectTextOnPage('Study >> Admin Schedule');

    // ── Step 9 & 10: Open Admin Calendar → Coverage Analysis popup, resize, close ──
    await portal.clickHomepageLink(TEST_DATA.libraryCalendarName);
    await portal.navigateToTab('Coverage Analysis');
    await calendarPage.clickCoverageAnalysisLink();
    await calendarPage.verifyCoverageAnalysisPopupExpanded();
    await calendarPage.resizeCoverageAnalysisPopup();
    await calendarPage.closeCoverageAnalysisPopup();

    // ── Cleanup ──
    await portal.logout();
  });
});
