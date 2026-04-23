import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — handles all login page interactions.
 * Demonstrates Page Object Model pattern.
 */
export class LoginPage extends BasePage {
  // Locators — defined as getters for lazy evaluation
  get usernameInput() { return this.page.getByLabel('Username'); }
  get passwordInput() { return this.page.getByLabel('Password'); }
  get loginButton()   { return this.page.getByRole('button', { name: /log in/i }); }
  get errorMessage()  { return this.page.getByTestId('error-message'); }
  get forgotPassword(){ return this.page.getByRole('link', { name: /forgot password/i }); }

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async expectLoginError(message: string) {
    await this.expectVisible(this.errorMessage);
    await this.expectText(this.errorMessage, message);
  }

  async expectLoginPage() {
    await this.expectVisible(this.loginButton);
    await expect(this.page).toHaveTitle(/login/i);
  }
}
