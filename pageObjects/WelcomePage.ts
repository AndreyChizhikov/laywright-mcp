import { Page } from '@playwright/test';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchComponent } from './SearchComponent';

export class WelcomePage {
  readonly header: Header;
  readonly footer: Footer;
  readonly searchComponent: SearchComponent;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.searchComponent = new SearchComponent(page);
  }

  async navigate() {
    await this.page.goto('/');
  }
}