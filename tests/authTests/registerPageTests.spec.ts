import {test, expect} from '@playwright/test';
import { PageManager } from '../../pageObjects/pageManager';
import { faker } from '@faker-js/faker';


test.beforeEach(async ({page})=>{
    page.goto("/login")
})

test.describe('valid registration case(s)', ()=>{
    test('valid registration case', async ({page})=>{
        const pm = new PageManager(page)

        const userName = faker.person.firstName();
        const userPassword = faker.internet.password({ length: 8 });

        await pm.onRegistrationPage().registerUser(userName,userPassword)

        await expect(page).toHaveURL('/')
        await expect(pm.onHeader().loggedUsernameIndicator).toContainText(userName)
    })
})