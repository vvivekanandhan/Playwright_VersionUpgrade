import { test, expect } from '../fixtures/velosFixtures';
import { StudyPage } from '../pages1/Studypage';
import { VelosHelper } from '../helpers/VelosHelper';
import { type Page } from '@playwright/test';

let studyPage: StudyPage;
let sharedNav: VelosHelper;
let sharedPage: Page;

test('Create a new study and add status', async ({ login, nav, page, studyData }) => {
  sharedNav = nav;
  sharedPage = page;
  studyPage = new StudyPage(page);
   await nav.navigateTo("Manage", "Studies", "New");
  await studyPage.createStudy(studyData);
   await studyPage.selectCalendarFromPopup('Velos v72 Demo Calendar');
   await studyPage.changeCalendarStatus('Velos v72 Demo Calendar', 'Active');
 await studyPage.importCalendar('calendar_template (8).csv');
await page.getByPlaceholder('Study #, Title or Keyword').fill(studyPage.lastStudyNumber!);
 await page.keyboard.press('Enter');
 await page.locator('.studyMenuPop').click();
 
 await page.getByRole('link', { name: 'Study Status' }).click();
 await studyPage.addEnrolledStatus(); 
 await studyPage.addPatientToStudy(studyPage.lastStudyNumber, '00008');
 await studyPage.createPatientSchedule('Velos v72 Demo Calendar')
 //  await studyPage.defineCalendar('velos play');

  //await studyPage.addStudyStatus(studyData.protocolStatus);
});

// Runs after each test regardless of pass or fail
// test.afterEach(async () => {
//   
//   if (!sharedPage || !sharedNav || !studyPage?.lastStudyNumber) return;
//   const createdStudyNumber = studyPage.lastStudyNumber;
//   sharedPage.on('dialog', async dialog => { await dialog.accept().catch(() => {}); });
//   await sharedNav.navigateTo("Manage", "Studies", "Search");
//   await sharedPage.getByRole('textbox', { name: 'Study #, Title or Keyword' }).fill(createdStudyNumber);
//   await sharedPage.keyboard.press('Enter'); // Ensure search field is focused  

//   await sharedPage.getByRole('link', { name: 'Delete' }).first().click();
//   await sharedPage.waitForLoadState('domcontentloaded');
//   await sharedNav.fillESignAndSubmit();
// });
