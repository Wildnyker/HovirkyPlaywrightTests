import { type Page, type Locator } from "@playwright/test";

export class AdvancedSearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
