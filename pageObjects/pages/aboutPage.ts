import { type Page, type Locator, expect } from "@playwright/test";
import { PageManager } from "../pageManager";
import { ABOUT_PAGE_SOURCES_TEXT } from "../../test_data/aboutPageContent";

export class AboutPage {
  readonly page: Page;
  readonly aboutHeader: Locator;
  readonly aboutDescription: Locator;
  readonly aboutSourcesList: Locator;
  readonly aboutSourcesElementsList: Locator;
  constructor(page: Page) {
    this.page = page;
    this.aboutHeader = this.page.getByRole('heading');
    this.aboutDescription = this.page.getByText(
      "Welcome to the online library"
    );
    this.aboutSourcesElementsList = this.page.locator("ol > li");
  }

  // This function checks if the text content of all <li> items on the About page
  // matches the expected list of source texts (ABOUT_PAGE_SOURCES_TEXT)
  async verifySourcesTextMatchExpected() {
    const actualTexts = await this.aboutSourcesElementsList.allTextContents();
    await expect(actualTexts.length).toBe(ABOUT_PAGE_SOURCES_TEXT.length);
    
    // Loop through each expected item and compare it with the actual one
    for (let i = 0; i < ABOUT_PAGE_SOURCES_TEXT.length; i++) {
      // Check if the actual text at position i exactly matches the expected text
      const actual = actualTexts[i].replace(/\s+/g, " ").trim();
      const expected = ABOUT_PAGE_SOURCES_TEXT[i].replace(/\s+/g, " ").trim();
      await expect(actual).toBe(expected);
    }
  }
}
