
import { test as base } from '@playwright/test';
import { WelcomePage } from '../pageObjects/WelcomePage';


export const test = base.extend<{
  welcomePage: WelcomePage;
}>({
  welcomePage: async ({ page }, use) => {   
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
          




        
        await use(welcomePage);
        

  }
});



