import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';

/*
  Converted from:
  - Feature file:      feature.interface/Login.feature
  - Page Object:       objectRepositories/interfaces/Login.java
  - Step Definitions:  stepDefinition/interfaces/LoginInterface.java
*/

test.describe('Login into Application', () => {

  const testData = {
    url: 'https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp',
    username: 'nmohan',
    password: 'Velos@123',
  };

  test('@Interface_TC001 - Check the modules in the eResearch application', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // I launch the eResearch URL
    await loginPage.navigate(testData.url);

    // I Click on Username field and enter the username
    await loginPage.enterUsername(testData.username);

    // I Click on password field and enter the password
    await loginPage.enterPassword(testData.password);

    // I click on Submit button
    await loginPage.clickSubmit();

    // I Click Ok on the alert
    await loginPage.clickAlertOk();

    // The modules are displayed
    await loginPage.verifyModulesDisplayed();
  });
});
