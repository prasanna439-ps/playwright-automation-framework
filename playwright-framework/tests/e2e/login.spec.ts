import { test, expect } from '../../fixtures';

/**
 * Login Flow — E2E Tests
 * Covers: valid login, invalid credentials, empty fields, logout
 */
test.describe('Login Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC001 — Valid login navigates to dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(
      process.env.TEST_USER ?? 'testuser@example.com',
      process.env.TEST_PASS ?? 'TestPass123!'
    );
    await dashboardPage.expectWelcomeMessage();
    await expect(loginPage.page).toHaveURL(/dashboard/);
  });

  test('TC002 — Invalid password shows error message', async ({ loginPage }) => {
    await loginPage.login('testuser@example.com', 'WrongPassword');
    await loginPage.expectLoginError('Invalid username or password');
  });

  test('TC003 — Empty username shows validation error', async ({ loginPage }) => {
    await loginPage.login('', 'SomePassword123');
    await loginPage.expectLoginError('Username is required');
  });

  test('TC004 — Empty password shows validation error', async ({ loginPage }) => {
    await loginPage.login('testuser@example.com', '');
    await loginPage.expectLoginError('Password is required');
  });

  test('TC005 — Login page elements are visible', async ({ loginPage }) => {
    await loginPage.expectLoginPage();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPassword).toBeVisible();
  });

  test('TC006 — Successful login then logout returns to login page', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(
      process.env.TEST_USER ?? 'testuser@example.com',
      process.env.TEST_PASS ?? 'TestPass123!'
    );
    await dashboardPage.expectWelcomeMessage();
    await dashboardPage.logout();
    await loginPage.expectLoginPage();
  });

});
