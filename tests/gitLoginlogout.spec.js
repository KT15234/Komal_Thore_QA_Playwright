import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env from parent folder
dotenv.config({ path: './.env' });
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PASSWORD = process.env.GITHUB_PASSWORD;
if (!GITHUB_USERNAME || !GITHUB_PASSWORD) {
  console.warn('GITHUB_USERNAME or GITHUB_PASSWORD not set. Set them in environment or .env before running login tests.');
}
test('test', async ({ page }) => {
  await page.goto('https://github.com/login');
  const repoName = 'abdce' + Math.floor(Math.random() * 1000000);
  await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill(GITHUB_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(GITHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('link', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Repository name *' }).click();
  await page.getByRole('textbox', { name: 'Repository name *' }).fill(repoName);
  await page.waitForTimeout(500);
  //await expect(page.getByRole('button', { name: 'Create repository' })).toBeVisible();
 const createButton = page.locator('button:has(span.prc-Button-Label-pTQ3x:text("Create repository"))');
 await createButton.scrollIntoViewIfNeeded();
 await createButton.waitFor({ state: 'visible', timeout: 5000});
 await page.waitForTimeout(500);
 try{ await createButton.click();  }
    catch(e){ console.log("Button not clicked", e);
        await createButton.click({ force:true });
    }    
  await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('button', { name: 'Delete this repository' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete this repository' }).click();
  await page.getByRole('button', { name: 'I want to delete this' }).click();
  await page.getByRole('button', { name: 'I have read and understand' }).click();
  await page.getByText(`To confirm, type "KomalT1599/${repoName}"`).click();
  console.log(`To confirm, type "KomalT1599/${repoName}"`);
  console.log('Responsitory deleted successfully');
  
  await page.goto(`https://github.com/KomalT1599/${repoName}/upload/main`);
  await page.locator('//a[normalize-space(text())="uploading an existing file"]').click();

const filePath = 'D:\\Komal\\komal.txt';
  await page.setInputFiles('input[aria-label="Choose your files"]', filePath);


  // Commit upload
  await page.fill('#commit-summary-input', 'Add komal.txt via Playwright test');
 await page.click('//button[normalize-space(text())="Commit changes"]');

});
