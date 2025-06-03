import { expect, Page } from '@playwright/test';

export class Header {
  constructor(private page: Page) {}

  async verifyNavigationLinks(links: { name: string; url: string }[]) {
    for (const link of links) {
      // Check if the link is visible and has the correct URL
      const navLink = this.page.getByRole('link', { name: link.name });
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveAttribute('href', link.url);
    }
  }
}