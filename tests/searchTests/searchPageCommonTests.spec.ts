import { test, expect } from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  page.goto("/search");
});


test.describe('standard search tests',()=>{

  test('submit empty search query', async({page})=>{
    
  })


  test('submit 1 letter search query', async({page})=>{

  })


  test('submit 1 word serch query', async({page})=>{

  })


  test('submit a search query with 0 results', async({page})=>{

  })

})
