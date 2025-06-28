import { type Page, type Locator } from "@playwright/test";
import { HeaderElements } from "../components/header";

export class SearchPage {
  readonly page: Page;
  readonly searchField: Locator;
  readonly resultsBox: Locator;
  readonly resultsFilterDropdown: Locator;
  readonly dialectCheckbox:(text:string)=> Locator;
  readonly applyFilterButton: Locator;
  readonly youSearchedParagraph: Locator;
  readonly articleBox: Locator;
  readonly articleHeading: Locator;
  readonly articleDialect: Locator;
  readonly articleFirstDefinition: Locator;
  readonly articleFirtsDefinitionSource: Locator;
  readonly articleOtherDictionarySUMLink: Locator;
  readonly articleOtherDictionaryGrinLink: Locator;
  readonly articleOtherDictionarySlovMeLink: Locator;
  readonly articleOtherDictionarySlovUaLink: Locator;
  readonly articleOtherDictionaryEngLink: Locator;
  readonly header:HeaderElements;


  constructor(page: Page) {
    this.page = page;
    this.searchField = this.page.getByRole('textbox', { name: 'search' })
    this.resultsBox = this.page.locator('.center')
    this.resultsFilterDropdown = this.page.getByRole('button', { name: 'Filter' })
    this.dialectCheckbox = (dialect:string) => this.page.getByRole('checkbox', { name: `${dialect}` })
    this.applyFilterButton = this.page.locator('#dialectFilter').getByRole('button', { name: 'Filter' })
    this.youSearchedParagraph = this.page.getByText('You searched:')
    this.articleBox = this.page.locator('article')
    this.articleHeading = this.articleBox.getByRole('heading')
    this.articleDialect = this.articleBox.locator("p",{hasText:/Filter/})
    this.articleFirstDefinition = this.articleBox.locator('li').first()
    this.articleFirtsDefinitionSource = this.articleBox.locator('.small-font')
    this.articleOtherDictionarySUMLink = this.articleBox.locator('a', {hasText:"СУМ"})
    this.articleOtherDictionaryGrinLink = this.articleBox.locator('a', {hasText:"Грінченка"})
    this.articleOtherDictionarySlovMeLink = this.articleBox.locator('a', {hasText:"Slovnyk.me"})
    this.articleOtherDictionarySlovUaLink = this.articleBox.locator('a', {hasText:"Slovnyk.ua"})
    this.articleOtherDictionaryEngLink = this.articleBox.locator('a', {hasText:"ENG"})
    this.header = new HeaderElements(page);
  }

  

  async performSearch(query?: string) {
    if (query) {
      await this.searchField.fill(query);
    }
    await this.searchField.press('Enter');
  }

  async performSearchWithDialect(dialect:string, query:string){
    await this.header.switchDialect(dialect)
    await this.performSearch(query)
  }

  async switchDialectInFilters(dialect:string){
    await this.resultsFilterDropdown.click()

    await this.dialectCheckbox(dialect).click()

    await this.applyFilterButton.click()
  }

  

}
