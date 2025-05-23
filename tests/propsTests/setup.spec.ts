import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email').fill('aaaawa@gmail.com');
  await page.getByLabel('Password').fill('eADv!qe5EEyjAg6');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
 
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});