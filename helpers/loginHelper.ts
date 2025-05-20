import { request } from 'playwright-core';
import { Page } from '@playwright/test';

  async function loginHelper(page:Page) :Promise<string>
  { 
    let sidValue = '';
     var client = await request.newContext();
     var response = await  client.post('https://qauto.forstudy.space/api/auth/signin', {
        data: {
            email: 'aaaawa@gmail.com',
            password: 'eADv!qe5EEyjAg6',
            remember: true
            }
        }); 

        if (response.ok()) {
            const cookies = await response.headersArray();
            const sidCookie = cookies.find(cookie => cookie.value.startsWith('sid'));

            if (sidCookie) {
                 sidValue = sidCookie.value.split(';')[0].split('=')[1] ;
                console.log(`Extracted cookie: ${sidValue}`);
            }
            }   else {
              throw new Error(`Login request failed with status: ${response.status()}`);
        }
      
      return sidValue;
}  
    
async function setCookies(page: Page, sidValue: string): Promise<void> {
    if (!sidValue) {
        throw new Error('SID value is empty or undefined');
    }
    
    await page.context().addCookies([
        {
            name: 'sid',
            value: sidValue,
            domain: '.forstudy.space',
            path: '/'
        }
    ]);

    // Reload the page to ensure the cookie is applied
    await page.reload();
}

export { loginHelper, setCookies };

