import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object Model for the Velos Login page.
 */
export class LoginPage {
  private page: Page;

  // ── Locators ──
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    this.loginButton = page.getByRole('button', { name: 'log in arrow_forward' });
    this.okButton = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Navigate to the login page.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Login with the given credentials and handle the "already logged in" dialog if visible.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    const loggedInText = this.page.getByText('You are currently logged in');
    if (await loggedInText.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.okButton.click();
    }
  }
}
