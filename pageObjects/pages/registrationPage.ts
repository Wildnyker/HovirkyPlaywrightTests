import { type Page, type Locator } from "@playwright/test";
import { PassThrough } from "stream";

export class RegistrationPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator('[name = "new-username"]')
    this.passwordField = this.page.locator('[name = "password1"]')
    this.confirmPasswordField = this.page.locator('[name = "password2"]')
    this.registerButton = this.page.getByRole('button',{name:'REGISTER'})
  }

  async registerUser(userName:string, passWord:string){
    await this.usernameField.fill(userName)
    await this.passwordField.fill(passWord)
    await this.confirmPasswordField.fill(passWord)
    await this.registerButton.click()
  }

}


