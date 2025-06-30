import { test, expect } from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  page.goto("/search");
});


test.describe('standard search tests with all dialects enabled',()=>{
    
  test('submit empty search query', async({page})=>{
    //Arrange: page object
    const pm = new PageManager(page)
    
    //Act: performing a search with an empty query
    await pm.onSearchPage().performSearch()

    //Assert: full dictionary returned starting from a first entry 'АБА́ЗЬ'
    await expect(pm.onSearchPage().articleHeading.first()).toHaveText('АБА́ЗЬ')
  })


  test('submit 1 letter search query', async({page})=>{
    //Arrange: page object
    const pm = new PageManager(page)
    
    //Act: performing a search with an empty query
    await pm.onSearchPage().performSearch('ї')

    //Assert: А́ЇСТ is returned as a first entry
    await expect(pm.onSearchPage().articleHeading.first()).toHaveText('А́ЇСТ') 
  })


  test('submit 1 word serch query', async({page})=>{
    //Arrange: page object
    const pm = new PageManager(page)
    
    //Act: performing a search with 'кофта'
    await pm.onSearchPage().performSearch('кофта')

    //Assert: БА́СКА(other type of кофта) is returned as firts entry
    await expect(pm.onSearchPage().articleHeading.first()).toHaveText('БА́СКА') 

  })


  test('submit a search query with 0 results', async({page})=>{
    //Arrange: page object
    const pm = new PageManager(page)
    
    //Act: performing a search with an empty query
    await pm.onSearchPage().performSearch('rocket')

    //Assert that no article headings are visible on the page
    await expect(pm.onSearchPage().articleHeading).toHaveCount(0)
  })

})

test.describe("standard search with dialects being switched ", () => {
  const dialects = ['Західнополіський', 'Гуцульський', 'Слобожанський']

  test('submit 1 word search query for each seaparate dialect switched via header dropdown', async({page})=>{
    //Arrange: page object & data for test
    const pm = new PageManager(page)
    //Act performing a search for every dialect
    
    const query = 'дах'
    const referenceWords = ['ВИВИШЕНЬ', 'БАБРАТИСИ', 'ВІРА́НДА']

    //Assert that every time the first found query = to expected
    for (let i = 0; i < dialects.length; i++) {
      pm.onSearchPage().performSearchWithDialect(dialects[i], query)
      await expect(pm.onSearchPage().articleHeading.first()).toHaveText(referenceWords[i])
    }
  })
  test('verify search refults after aplying dialect filter post general search', async({page})=>{
    //Arrange: page object & data for test
    const pm = new PageManager(page)
    //Act performing a search for every dialect
    const referenceWordsAfterFilter = ['БУБЛЕНЯ', 'САМОГОНКА', 'БАРА́НЧИК']
    await pm.onSearchPage().performSearch('відро')
    
    //Assert that every time the first filtered query = to expected
    for (let i = 0; i < dialects.length; i++){
      //apply dialect via filters
      await pm.onSearchPage().switchDialectInFilters(dialects[i])

      //check that correct entry is shown as a first one
      await expect(pm.onSearchPage().articleHeading.first()).toHaveText(referenceWordsAfterFilter[i])
      //unselect same dialect(clear filters option is not implemented)

      await pm.onSearchPage().switchDialectInFilters(dialects[i])
    }
  })    
})
test.describe('verify links to other vocabularies', ()=>{
  test('verfy that links to other vocablaries are visible for a search result',async ({page})=>{
    //Arrange: prepare a page manager object
    const pm = new PageManager(page)
    
    //Act: perform a valid search
    await pm.onSearchPage().performSearch('кофта')
    
    //Assert: that first search results has coresponding links to other vocabularies
    await expect(pm.onSearchPage().articleOtherDictionarySUMLink.first()).toBeVisible()
    await expect(pm.onSearchPage().articleOtherDictionaryGrinLink.first()).toBeVisible()
    await expect(pm.onSearchPage().articleOtherDictionarySlovMeLink.first()).toBeVisible()
    await expect(pm.onSearchPage().articleOtherDictionarySlovUaLink.first()).toBeVisible()
    await expect(pm.onSearchPage().articleOtherDictionaryEngLink.first()).toBeVisible()
  });
});