import { test } from '@playwright/test';

test('test one', async ({ page }) => {

    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        await page.waitForTimeout(5000);
    await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
});


test('test two', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    await page.waitForTimeout(5000);
  await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
});
