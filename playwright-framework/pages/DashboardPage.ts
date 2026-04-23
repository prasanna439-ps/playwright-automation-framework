import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage — interactions after successful login.
 */
export class DashboardPage extends BasePage {
  get welcomeMessage()  { return this.page.getByTestId('welcome-message'); }
  get userMenu()        { return this.page.getByRole('button', { name: /account/i }); }
  get logoutButton()    { return this.page.getByRole('menuitem', { name: /log out/i }); }
  get navItems()        { return this.page.getByRole('navigation').getByRole('link'); }

  constructor(page: Page) {
    super(page);
  }

  async expectWelcomeMessage(username?: string) {
    await this.expectVisible(this.welcomeMessage);
    if (username) await this.expectText(this.welcomeMessage, username);
  }

  async logout() {
    await this.clickElement(this.userMenu);
    await this.clickElement(this.logoutButton);
  }

  async getNavItemCount(): Promise<number> {
    return this.navItems.count();
  }
}
