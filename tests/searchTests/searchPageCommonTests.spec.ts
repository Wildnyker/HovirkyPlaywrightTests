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

test.describe("standard search with dialects being switched", () => {
  test('submit 1 word search query for each seaparate dialect', async({})=>{
    //Arrange: page object

    //Act performing a search for every dialect

    //Assert that every time the result = to expected
  })
});

