import { test, expect } from '@playwright/test';

test('GitHub - loging HTTP-requests', async ({ page }) => {
 
  let alertTriggered = false;
    
  page.on('request', async (request) => {
    const url = request.url();
    
    if (!alertTriggered && url.includes('https://collector.github.com/github/collect')) {
      alertTriggered = true;

      console.log(`Request detected! : ${url}`);

      await page.evaluate(() => {
        alert('https://collector.github.com/github/collect');
      });
    }
  });
    

 page.on('dialog', async dialog => {
    console.log(`Alert: ${dialog.message()}`);
    await new Promise(r => setTimeout(r, 3000)); 
    await dialog.accept();
  });
    
  await page.goto('https://github.com/');


  await page.waitForTimeout(5000);


  await expect(page).toHaveTitle(/GitHub/);
});


test('alert', async ({ page }) => {

 page.on('dialog', async dialog => {
    console.log(`Alert: ${dialog.message()}`);
    await new Promise(r => setTimeout(r, 3000)); 
    await dialog.accept();
  });


await page.goto('https://github.com/'); 
 await page.evaluate(() => alert('Test alert'));
   
  
await page.route('https://dog.ceo/api/breeds/list/all', async route => {
	const response = await route.fetch();
	const json = {
	    user: "John Doe",
	    age: 27
	}
	await route.fulfill({ response, json });
});
    
    
    
});