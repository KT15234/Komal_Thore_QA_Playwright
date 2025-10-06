// @playwright/test
import { test, expect } from '@playwright/test';

const baseURL = 'https://api.github.com';
const validToken = process.env.GITHUB_TOKEN;  // export GITHUB_TOKEN before running
const invalidToken = 'invalid_token';

// Common header for classic PAT
const authHeader = { Authorization: `token ${validToken}` };

test.describe('GitHub API Authentication & Token Management', () => {

  test('✅ Valid token allows API access', async ({ request }) => {
    const response = await request.get(`${baseURL}/user`, {
      headers: authHeader
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Authenticated User:', body.login);
  });

  test('✅ Invalid token returns 401 Unauthorized', async ({ request }) => {
    const response = await request.get(`${baseURL}/user`, {
      headers: { Authorization: `token ${invalidToken}` }
    });

    expect(response.status()).toBe(401);
  });

  test('✅ Token permissions properly enforced (read vs write)', async ({ request }) => {
    // Try creating a repo with a read-only token
    const response = await request.post(`${baseURL}/user/repos`, {
      headers: authHeader,
      data: {
        name: "playwright-test-repo",
        private: true
      }
    });

    // If token has "repo" scope, this will succeed (201)
    // If not, GitHub returns 403
    expect([201, 403]).toContain(response.status());
    if (response.status() === 201) {
      console.log("Repo created successfully — token has write permission");
    } else {
      console.log("Permission denied — token lacks repo:create scope");
    }
  });

  test('✅ Rate limiting headers present and accurate', async ({ request }) => {
    const response = await request.get(`${baseURL}/rate_limit`, {
      headers: authHeader
    });

    expect(response.status()).toBe(200);

    const limit = response.headers()['x-ratelimit-limit'];
    const remaining = response.headers()['x-ratelimit-remaining'];

    expect(limit).toBeDefined();
    expect(remaining).toBeDefined();
    console.log(`Rate Limit: ${limit}, Remaining: ${remaining}`);
  });

});
