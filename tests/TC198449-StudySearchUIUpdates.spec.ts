import { test, expect } from '@playwright/test';
import { VelosPortalPage } from '../pages/VelosPortalPage.ts';
import { VelosStudyPage } from '../pages/VelosStudyPage.ts';
import { VelosUserPage } from '../pages/VelosUserPage.ts';

/**
 * TC198449 – eResearch – Study Search UI updates
 *
 * Converted from the Cucumber/Selenium feature file.
 *
 * Removed (not needed in Playwright):
 *  - "I clear cache in IE browser"   → Playwright uses isolated contexts
 *  - "I start / close default Browser" → Playwright manages browsers
 *  - "I wait N seconds"               → Playwright auto-waits on actions
 *  - Redundant logout → re-login      → collapsed where possible
 */

const CREDENTIALS = {
  url: 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp',
  username: 'nmohan',
  password: 'Velos@123',
  securityPin: '1234',
};

const STUDY = {
  number: 'FT-198449A',
  title: 'FormalStudy-198449A',
  division: 'Cancer Center',
  therapeuticArea: 'Anal Dysplasia',
  phase: 'Phase I',
  pi: 'User198449FT',
};

test.describe('TC198449 – Study Search UI updates', () => {
  // Give the whole suite enough time (data-setup + verification steps)
  test.setTimeout(300_000);

  let portal: VelosPortalPage;
  let studyPage: VelosStudyPage;
  let userPage: VelosUserPage;

  test.beforeEach(async ({ page }) => {
    portal = new VelosPortalPage(page);
    studyPage = new VelosStudyPage(page);
    userPage = new VelosUserPage(page);
  });

  /* ─────────────────────────────────────────────────────
   * DATA SETUP – create PI user & study (runs once)
   * ────────────────────────────────────────────────────── */
  test('Data setup – create PI user and study', async ({ page }) => {
    await portal.login(CREDENTIALS.username, CREDENTIALS.password, CREDENTIALS.url);

    // Create user to serve as Principal Investigator
    await portal.navigateTo('Manage', 'Application', 'Users');
    await userPage.createUser(
      {
        firstName: 'User198449FT',
        lastName: 'Test',
        timezone: '(GMT+05:30) Bombay, Calcutta, Madras, New Delhi',
        status: 'Active',
        email: 'veloswcg@gmail.com',
        primaryOrg: 'Velos',
        defaultGroup: 'Admin',
        securityPin: CREDENTIALS.securityPin,
        password: CREDENTIALS.password,
      },
      portal,
    );

    // Delete existing study if present, then create a new one
    await studyPage.deleteStudyIfExists(STUDY.number, CREDENTIALS.securityPin, portal);
    await studyPage.createStudy(
      {
        studyNumber: STUDY.number,
        title: STUDY.title,
        division: STUDY.division,
        therapeuticArea: STUDY.therapeuticArea,
        phase: STUDY.phase,
        pi: STUDY.pi,
        securityPin: CREDENTIALS.securityPin,
      },
      portal,
    );

    await portal.expectTextOnPage('Data Saved Successfully');
    await portal.logout();
  });

  /* ─────────────────────────────────────────────────────
   * ACTUAL TEST – verify search UI filters & functionality
   * ────────────────────────────────────────────────────── */
  test.only('@Velos_TC198449 – Verify search filters and study search', async ({ page }) => {
    await portal.login(CREDENTIALS.username, CREDENTIALS.password, CREDENTIALS.url);

    // Step 2 – Navigate to Studies > Search and verify default filters
    await portal.navigateTo('Manage', 'Studies', 'Search');
    await studyPage.verifyDefaultFilters();

    // Step 3 – Search by "Study #, Title or Keyword"
    await studyPage.fillField('Study #, Title or Keyword:', 'Regression Mohan');
    await studyPage.clickSearch();

    // Step 4 – Search by "Study#"
    await studyPage.fillField('Study #, Title or Keyword:', '');
    await studyPage.fillField('Study#:', 'Regression Mohan');
    await studyPage.clickSearch();

    // Step 5 – Search by "PI"
    await studyPage.fillField('Study#:', '');
    await studyPage.fillField('PI:', 'Mohan Nethaji');
    await studyPage.clickSearch();

    // Step 6 – Search by "Study Team"
    await studyPage.fillField('PI:', '');
    await studyPage.fillField('Study Team:', 'Mohan Nethaji');
    await studyPage.clickSearch();

    // Step 7 – Re-search "Study Team" (same value)
    await studyPage.fillField('Study Team:', 'Mohan Nethaji');
    await studyPage.clickSearch();

    // Step 8 – Advanced Search
    await portal.navigateTo('Manage', 'Studies', 'Search');
    await studyPage.openAdvancedSearch();
    const filterText = await studyPage.getAdvancedFilterText();
    console.log('Advanced Search filters:', filterText);

    // Step 9 – Logout
    await portal.logout();
  });
});
