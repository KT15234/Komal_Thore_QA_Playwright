import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

test('Create GitHub repository via API', async ({ request }) => {
  const repoName = 'test-repo-1234'; // unique repo name
  const response = await request.post('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      
    },
    data: {
      name: repoName,
      description: 'Repository created via Playwright API test',
      private: false
    }
  });

  console.log('Status:', response.status());
  const data = await response.json();
  console.log('Created repo:', data.full_name);

  expect(response.status()).toBe(201); // 201 Created
  expect(data.name).toBe(repoName);
});
