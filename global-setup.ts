import { chromium } from '@playwright/test';

export default async function globalSetup() {

  console.log('✅ GLOBAL SETUP STARTED');

  const browser = await chromium.launch({
    headless: false,      // so you can SEE login
    slowMo: 50,           // slow typing (Salesforce-friendly)

  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  // 1️⃣ Open Salesforce login page
  await page.goto('https://test.salesforce.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });


  // 2️⃣ Wait for login inputs (IMPORTANT)
  await page.waitForSelector('#username', { timeout: 60000 });
  await page.waitForSelector('#password', { timeout: 60000 });

  // 3️⃣ Fill credentials (AS YOU WANT)
  await page.fill('#username', 'ashwinimca96@gmail.com');
  await page.fill('#password', 'RIS@2026');

  // 4️⃣ Click Login and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('#Login'),
  ]);

  // 5️⃣ Wait until Lightning home loads
  await page.waitForURL(/lightning/, { timeout: 60000 });




  // 6️⃣ Save logged-in state
  await page.context().storageState({ path: 'storageState.json' });

  console.log('✅ STORAGE STATE SAVED');

  await browser.close();
}
