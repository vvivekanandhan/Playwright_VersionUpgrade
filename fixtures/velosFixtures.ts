import { test as base } from '@playwright/test';
import { LoginPage } from '../pages1/LoginPage';
import { VelosHelper } from '../helpers/VelosHelper';
import patientDataJson from '../test-data/patientcreation.json';
import studyDataJson from '../test-data/studycreation.json';
import calendarDataJson from '../test-data/calendarDetails.json';

/**
 * Test data type definitions
 */
type PatientData = typeof patientDataJson;
type StudyData = typeof studyDataJson;
type CalendarData = typeof calendarDataJson & { calendarName: string };

/**
 * Custom fixture types
 */
type VelosFixtures = {
  login: LoginPage;
  nav: VelosHelper;
  patientData: PatientData;
  studyData: StudyData;
  calendarData: CalendarData;
};

/**
 * Extended test with shared fixtures.
 * - `page`        → automatically accepts all dialogs (alerts, confirms, prompts)
 * - `login`       → opens the app and logs in automatically (uses patientcreation.json creds)
 * - `patientData` → test data from patientcreation.json
 * - `studyData`   → test data from studycreation.json
 * - `nav`         → VelosHelper for menu navigation
 */
export const test = base.extend<VelosFixtures>({
  page: async ({ page }, use) => {
    // Automatically accept all dialogs
    page.on('dialog', async (dialog) => {
      console.log(`[Dialog Auto-Accept] ${dialog.type()}: ${dialog.message()}`);
      await dialog.accept();
    });
    await use(page);
  },

  patientData: async ({}, use) => {
    await use(patientDataJson);
  },

  studyData: async ({}, use) => {
    await use(studyDataJson);
  },

  calendarData: async ({}, use) => {
    const timestamp = Date.now();
    const calendarName = `${calendarDataJson.calendarNamePrefix}${timestamp}`;
    await use({ ...calendarDataJson, calendarName });
  },

  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(process.env.URL!);
    await loginPage.login(process.env.VELOS_USERNAME!, process.env.VELOS_PASSWORD!);
    await use(loginPage);
  },

  nav: async ({ page }, use) => {
    await use(new VelosHelper(page));
  },
});

export { expect } from '@playwright/test';
