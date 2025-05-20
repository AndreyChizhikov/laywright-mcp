import { Page } from '@playwright/test';


 async function setLocalStorageValue(page: Page, key: string, value: string) : Promise<void> { 
     await page.evaluate(({key,value}) => {
        localStorage.setItem(key, value);
    }, { key, value });
}
 
async function getLocalStorageValue(page: Page, key: string): Promise<string | null> {  
   
    let storedValue = await page.evaluate((key) =>
    { 
        return localStorage.getItem(key);
    }, key);
    return storedValue;
}

export { setLocalStorageValue, getLocalStorageValue };

    
    
    
