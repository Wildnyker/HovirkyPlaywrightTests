import { test, expect } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";
import {
  ABOUT_PAGE_DESCRIPTION_TEXT,
  ABOUT_PAGE_HEADER_TEXT,
} from "../test_data/aboutPageContent";

test("should open About page by default with correct content", async ({page}) => {
  await page.goto("/");
  const pm = new PageManager(page);

  await expect(page).toHaveTitle(ABOUT_PAGE_HEADER_TEXT);
  await expect(pm.onAboutPage().aboutDescription).toHaveText(
    ABOUT_PAGE_DESCRIPTION_TEXT
  );
  await pm.onAboutPage().verifySourcesTextMatchExpected();
});
