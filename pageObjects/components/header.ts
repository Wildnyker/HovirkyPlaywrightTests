import { type Page, type Locator } from "@playwright/test";
import { PageManager } from "../pageManager";

export class HeaderElements {
  readonly page: Page;
  readonly dialectsDropdownButton:Locator;
  readonly dialectDropdownOption:(text: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialectsDropdownButton = this.page.locator('#id_dialect')
    this.dialectDropdownOption = (text: string) => this.page.locator('option', { hasText: text });
  }

  async switchDialect(dialect:string){
    await this.dialectsDropdownButton.click()
    await this.dialectDropdownOption(dialect).click()
  }
}
