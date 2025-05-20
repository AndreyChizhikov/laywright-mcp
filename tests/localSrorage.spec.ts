import { test,expect } from "@playwright/test";
import { loginHelper, setCookies } from "../helpers/loginHelper";
import { setLocalStorageValue, getLocalStorageValue } from "../helpers/localStorageHelper";
import { get } from "http";

test('login by API', { tag: '@cookie' }, async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    var cookie = await loginHelper(page);
    await setCookies(page, cookie);

    // Check if the user is logged in by verifying the URL
  await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
});

test('local Storage', { tag: '@localStoradge' }, async ({ page }) => {

    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');

    const value = await page.evaluate(() => {
       
        return document.title;
      });
   
    console.log(value);
    
    await setLocalStorageValue(page, 'myKey', 'myValue');

    let storedValue = await getLocalStorageValue(page, 'myKey');
    
      console.log(storedValue);
});
 
test('browser context', { tag: '@localStoradge' }, async ({ context }) => {

    const page = await context.newPage();
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');


    const page1 = await context.newPage();
   
    await page1.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    });

test('browser', { tag: '@localStoradge' }, async ({ browser }) => {

    const context = await browser.newContext();

        const page = await context.newPage();
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    
    
        const page1 = await context.newPage();
       
        await page1.goto('https://guest:welcome2qauto@qauto.forstudy.space');
});
