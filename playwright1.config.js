// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'safari execution',
      use: {
        browserName: 'webkit',
        screenshot: 'only-on-failure',
        trace: 'on',
        ...devices['iPhone Air'],
      },
    },
    {
      name: 'chromium execution',
      use: {
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        trace: 'on',
        ignoreHTTPSErrors: true,
        //  permissions:['geolocation'], (allows the location permission)
        // viewport : {width:720, height:720}, 
      },
    },
  ],
});