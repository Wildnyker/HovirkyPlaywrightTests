import { test, request, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import fs from 'fs';

if (!fs.existsSync('.auth')) {
  fs.mkdirSync('.auth');
}
const authFile1 = '.auth/user1.json';

test('register & authenticate', async ({ page }) => {
  await page.goto('/login');

  const middlewareToken = await page.locator('input[name="csrfmiddlewaretoken"]').nth(0).getAttribute('value');
  const userName = faker.person.firstName();
  const userPassword = faker.internet.password({ length: 8 });

  await page.request.post('http://localhost:8000/register', {
    form: {
      csrfmiddlewaretoken: middlewareToken,
      'new-username': userName,
      password1: userPassword,
      password2: userPassword,
    },
  });

  await page.request.post('http://localhost:8000/register',{
    data:{
      'passWord':userPassword,
      'userName':userName
    }
  })
  await page.context().storageState({ path: authFile1 });
});
