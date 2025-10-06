# Komal_Thore_QA_Playwright

This repository contains Playwright tests and API tests for GitHub. It's prepared to be shared with potential employers.

Quick start

1. Copy `.env.example` to `.env` and fill in the required variables (GITHUB_TOKEN, GITHUB_USER, GITHUB_PASS)
2. Install dependencies:

   npm install

3. Run tests:

   npx playwright test

Notes
- Do NOT commit your `.env` file; it contains sensitive credentials. Use environment variables or CI secrets instead.
- The repository excludes `node_modules/`, `playwright-report/`, and `test-results/` via `.gitignore` to keep the repo small.

If you want, I can help remove already-pushed secrets from history and rotate any exposed credentials.
