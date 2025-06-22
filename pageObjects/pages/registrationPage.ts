import { type Page, type Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
