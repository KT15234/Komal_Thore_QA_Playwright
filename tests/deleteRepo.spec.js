import { test, expect } from '@playwright/test';
test('test', async ({page}) => {
  await page.goto('https://github.com/login');
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('KomalT1599');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Komal@1599');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('link', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Repository name *' }).click();
  await page.getByRole('textbox', { name: 'Repository name *' }).fill('qa-automation-test-repo');
  //await page.locator('div').filter({ hasText: 'Create a new repositoryRepositories contain a project\'s files and version' }).nth(2).click();
 // Click the "Create repository" button using XPath
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
  //await page.locator("//button[@class='prc-Button-ButtonBase-c50BI mt-4']/span/span").click();
  //await page.getByRole('button', { name: 'Create repository' }).click();
  //await page.locator('#repo-title-component').getByRole('link', { name: 'qa-automation-test-repo' }).click();
  //await page.goto('https://github.com/KT15234/qa-automation-test-repo');
  //await page.getByRole('link', { name: 'KT15234' }).click();
  // await expect(page).toHaveURL(`https://github.com/KT15234}/qa-automation-test-repo}`);
   //await page.getByRole('link', { name: 'Repositories' }).click();
  // await page.getByText('qa-automation-test-repo Public Updated Oct 4, 20251 minute ago').click();
  // await page.getByRole('link', { name: 'qa-automation-test-repo' }).click();
  await page.locator("//a[@class='ActionListContent ActionListContent--visual16' and .//span[text()='Settings']]").click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'I want to delete this' }).click();
  await page.getByRole('button', { name: 'I have read and understand' }).click();
  await page.getByText('To confirm, type "KT15234/qa-').click();
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-tesy-reso');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowLeft');
 
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-test-reso');
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).click();
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).click();
  await page.getByRole('textbox', { name: 'To confirm, type "KT15234/qa-' }).fill('KT15234/qa-automation-test-repo');
  await page.getByLabel('Delete KT15234/qa-automation-').getByRole('button', { name: 'Delete this repository' }).click();
  await expect(page.getByText('Your repository "KT15234/qa-')).toBeVisible();
  await expect(page.getByText('Your repository "KT15234/qa-')).toBeVisible();

});