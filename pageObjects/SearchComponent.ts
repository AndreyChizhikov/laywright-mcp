import { expect, Page } from '@playwright/test';

export class SearchComponent {
  constructor(private page: Page) {}

  async performSearch(query: string) {
    const searchButton = this.page.getByRole('button', { name: 'Search (Command+K)' });
    await searchButton.click();
    const searchBox = this.page.getByRole('searchbox', { name: 'Search' });
    await searchBox.fill(query);
  }

  async verifySearchResults(expectedToBeEmpty: boolean) {

    if (expectedToBeEmpty) {
      const noReuslts = this.page.getByText('No results for');
      await expect(noReuslts).toBeVisible();
      
    } else {
      const searchResult = this.page.getByRole('listbox').nth(0);
      await expect(searchResult).toBeVisible();
      await expect(searchResult).not.toBeEmpty();
    }
  }
}