import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  timeout: 60000,

  use: {
    baseURL: 'https://allwarehouses--awhuat.sandbox.lightning.force.com',
    storageState: 'storageState.json',

    headless: false,
    viewport: null,

    // 🎥 RECORD VIDEO ALWAYS
    video: 'on',
    slowMo: 300,

    // 📸 Evidence
    trace: 'on',
    screenshot: 'on',
  },

  globalSetup: './global-setup.ts',

  reporter: [['html', { open: 'never' }]],
});
