import {expect } from '@playwright/test';
import { WelcomePage } from '../pageObjects/WelcomePage';
import { test } from "../cusomFixtures/myFixture";
test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('header navigation links', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();

  const links = [
    { name: 'Docs', url: '/docs/intro' },
    { name: 'API', url: '/docs/api/class-playwright' },
    { name: 'Community', url: '/community/welcome' },
    { name: 'GitHub repository', url: 'https://github.com/microsoft/playwright' },
    { name: 'Discord server', url: 'https://aka.ms/playwright/discord' }
  ];

  await welcomePage.header.verifyNavigationLinks(links);
});

test('footer links - positive scenarios', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();

  const footerLinks = [
    { name: 'Getting started', url: '/docs/intro' },
    { name: 'Playwright Training', url: 'https://learn.microsoft.com/en-us/training/modules/build-with-playwright/' },
    { name: 'Learn Videos', url: '/community/learn-videos' },
    { name: 'Feature Videos', url: '/community/feature-videos' },
    { name: 'GitHub', url: 'https://github.com/microsoft/playwright' },
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg' },
    { name: 'Blog', url: 'https://dev.to/playwright' },
    { name: 'Ambassadors', url: '/community/ambassadors' }
  ];

  await welcomePage.footer.verifyFooterLinks(footerLinks);
});

test('footer links - negative scenarios', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();

  await welcomePage.footer.verifyNonExistentLink('Non-existent Link');
});

test('search component - valid search', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();

  await welcomePage.searchComponent.performSearch('Writing tests');
  await welcomePage.searchComponent.verifySearchResults(false);
});

test('search component - invalid search', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();

  await welcomePage.searchComponent.performSearch('invalidquery123');
  await welcomePage.searchComponent.verifySearchResults(true);
});

test('custom fixture', async ({ welcomePage }) => {
    await welcomePage.searchComponent.performSearch('invalidquery123');
    await welcomePage.searchComponent.verifySearchResults(true); 
  }); 


