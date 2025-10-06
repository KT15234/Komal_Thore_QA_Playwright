
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env from parent folder
dotenv.config({ path: './.env' }); 
console.log(process.env.GITHUB_TOKEN);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

test('Validate GitHub API token', async ({ request }) => {
  const response = await request.get('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`, // "token " is correct
      Accept: 'application/vnd.github+json'
    }
  });

  console.log('Status:', response.status());
  const data = await response.json();
  console.log('Response:', data);

  // Validation
  expect(response.status()).toBe(200);

  // Since /users/:username/repos returns an array, check first repo exists
  expect(data.length).toBeGreaterThan(0);
  expect(data[0].name).toBeDefined();
});
