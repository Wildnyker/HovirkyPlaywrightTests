import { type Page } from "@playwright/test";
import { FooterElements } from "./components/footer";
import { HeaderElements } from "./components/header";
import { AboutPage } from "./pages/aboutPage";
import { AdvancedSearchPage } from "./pages/advancedSearchPage";
import { RegistrationPage } from "./pages/registrationPage";
import { SearchPage } from "./pages/searchPage";

export class PageManager {
  private readonly page: Page;
  private readonly footerElements: FooterElements;
  private readonly headerElements: HeaderElements;
  private readonly aboutPage: AboutPage;
  private readonly advancedSearchPage: AdvancedSearchPage;
  private readonly registrationPage: RegistrationPage;
  private readonly searchPage: SearchPage;

  constructor(page: Page) {
    this.page = page;
    this.footerElements = new FooterElements(this.page);
    this.headerElements = new HeaderElements(this.page);
    this.aboutPage = new AboutPage(this.page);
    this.advancedSearchPage = new AdvancedSearchPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
    this.searchPage = new SearchPage(this.page);
  }

  public onFooter() {
    return this.footerElements;
  }

  public onHeader() {
    return this.headerElements;
  }

  public onAboutPage() {
    return this.aboutPage;
  }

  public onAdvancedSearchPage() {
    return this.advancedSearchPage;
  }

  public onRegistrationPage() {
    return this.registrationPage;
  }

  public onSearchPage() {
    return this.searchPage;
  }
}
