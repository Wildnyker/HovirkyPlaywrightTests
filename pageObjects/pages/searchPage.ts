import { type Page, type Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
