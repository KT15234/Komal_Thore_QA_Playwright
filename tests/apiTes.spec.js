import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env from parent folder
dotenv.config({ path: './.env' }); 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN not set. API tests that require authentication will fail without a valid token.');
}

test('Validate GitHub API token', async ({ request }) => {
  const response = await request.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`, // "token " is correct,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  console.log('Status:', response.status());
  const data = await response.json();
  console.log('Response:', data);

  // Validation
  expect(response.status()).toBe(200);
  expect(data.login).toBeDefined();
});
