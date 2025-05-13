import { expect, Page } from '@playwright/test';

export class Footer {
  constructor(private page: Page) {}

  async verifyFooterLinks(links: { name: string; url: string }[]) {
    for (const link of links) {
      const footerLink = this.page.getByRole('link', { name: link.name, exact: true });
      await expect(footerLink).toBeVisible();
      await expect(footerLink).toHaveAttribute('href', link.url);
    }
  }

  async verifyNonExistentLink(linkName: string) {
    const nonExistentLink = this.page.getByRole('link', { name: linkName });
    await expect(nonExistentLink).not.toBeVisible();
  }
}