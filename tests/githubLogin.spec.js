import { test, expect, chromium } from '@playwright/test';

const USERNAME = process.env.GITHUB_USER || 'KT15234';
const PASSWORD = process.env.GITHUB_PASS || 'Komal@1599';

test('GitHub session persists after browser restart', async () => {
  // --- 1. First login and save session ---
  const browser1 = await chromium.launch({ headless: false });
  const context1 = await browser1.newContext();
  const page1 = await context1.newPage();

  await page1.goto('https://github.com/login');
  await page1.fill('[name="login"]', USERNAME);
  await page1.fill('[name="password"]', PASSWORD);
  await page1.click('[name="commit"]');
  await expect(page1.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page1.getByRole('button', { name: 'Open user navigation menu' })).toBeVisible();
  await page1.getByRole('button', { name: 'Open user navigation menu' }).click();
  await page1.locator('//span[@class="Button-label"]/img').click();

  // Save session state (cookies + local storage)
  await context1.storageState({ path: 'github-session.json' });

  // Close browser
  await browser1.close();


  // --- 2. Reopen browser with saved session ---
  const browser2 = await chromium.launch({ headless: false });
  const context2 = await browser2.newContext({ storageState: 'github-session.json' });
  const page2 = await context2.newPage();

  // Navigate to GitHub again
  await page2.goto('https://github.com/');

  // Verify session is still valid (user menu visible)
  await expect(page2.getByRole('button', { name: 'Open user navigation menu' })).toBeVisible();
  await page2.getByRole('button', { name: 'Open user navigation menu' }).click();

  console.log("✅ Session persisted successfully after browser restart");

  await page2.getByText('Sign out').click();

  const browser3 = await chromium.launch({ headless: false });
  const context3 = await browser3.newContext({ storageState: 'github-session.json' });
  const page3 = await context3.newPage();

  // Navigate to GitHub again
  
  await page3.goto('https://github.com/login');
  await page3.fill('[name="login"]', USERNAME);
  await page3.fill('[name="password"]', PASSWORD);
  await page3.click('[name="commit"]');
  await page3.getByRole('link', { name: 'New' }).click();
  await page3.getByRole('textbox', { name: 'Repository name *' }).click();
  await page3.getByRole('textbox', { name: 'Repository name *' }).fill('qa-automation-test-repo');
  await page3.getByRole('button', { name: 'Create repository' }).click();
  await expect(page3.locator('#repo-title-component').getByRole('link', { name: 'qa-automation-test-repo' })).toBeVisible();
  await page3.locator('#repo-title-component').getByRole('link', { name: 'qa-automation-test-repo' }).click();
  await page3.goto('https://github.com/KT15234/qa-automation-test-repo');
  await page3.getByRole('link', { name: 'KT15234' }).click();
  await page3.getByRole('link', { name: 'Repositories' }).click();
  await page3.getByText('qa-automation-test-repo Public Updated Oct 3, 20251 minute ago').click();
  await page3.getByRole('link', { name: 'qa-automation-test-repo' }).click();
  await page3.getByRole('link', { name: 'Settings' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'I want to delete this' }).click();
  await page3.getByRole('button', { name: 'I have read and understand' }).click();
  await page3.getByText('To confirm, type "KT15234/qa-').click();
  await page3.getByText('To confirm, type "KT15234/qa-').click();
  await page3.getByText('To confirm, type "KT15234/qa-').click();
  await page3.getByText('To confirm, type "KT15234/qa-').click();
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('CapsLock');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('CapsLock');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-tesy-reso');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowRight');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-test-reso');
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).click();
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).click();
  await page3.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-test-repo');
  await page3.getByLabel('Delete KT15234/qa-automation-').getByRole('button', { name: 'Delete this repository' }).click();
  await expect(page3.getByText('Your repository "KT15234/qa-')).toBeVisible();
  await expect(page3.getByText('Your repository "KT15234/qa-')).toBeVisible();
});





