import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — all page objects extend this class.
 * Contains shared utility methods used across all pages.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillField(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  async expectVisible(locator: Locator, message?: string) {
    await expect(locator, message).toBeVisible();
  }

  async expectText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async expectURL(urlPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async selectDropdown(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
