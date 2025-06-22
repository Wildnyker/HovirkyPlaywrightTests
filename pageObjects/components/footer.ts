import { type Page, type Locator } from "@playwright/test";

export class FooterElements {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
