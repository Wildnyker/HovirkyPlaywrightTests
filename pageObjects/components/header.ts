import { type Page, type Locator } from "@playwright/test";

export class HeaderElements {
  readonly page: Page;
  readonly dialectsDropdown:Locator;
  readonly loggedUsernameIndicator:Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialectsDropdown = this.page.locator('#id_dialect')
    this.loggedUsernameIndicator = this.page.locator('div.account-name .engraved')
  }

  async switchDialect(dialect: string) {
      console.log(`Switching to dialect: ${dialect}`);
      await this.dialectsDropdown.selectOption({ label: dialect });
  }
}
