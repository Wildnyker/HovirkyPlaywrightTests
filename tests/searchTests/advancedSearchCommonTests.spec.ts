import { test, expect } from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  page.goto("/advanced");
});
