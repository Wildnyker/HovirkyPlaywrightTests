import { type Page, type Locator } from "@playwright/test";

export class FooterElements {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly loginButton: Locator;
  readonly formloginButton:Locator;
  readonly usernameField:Locator;
  readonly passwordField:Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = this.page.locator('a.engraved', { hasText: 'LOGOUT' });
    this.logoutButton = this.page.getByText('LOG IN Register');
    this.formloginButton = this.page.getByRole('button', {name:"LOG IN"});
    this.usernameField = this.page.getByPlaceholder('Username')
    this.passwordField = this.page.getByPlaceholder('Password')
  }

  async login(userName:string, passWord:string){
    await this.loginButton.click()
    await this.usernameField.fill(userName)
    await this.passwordField.fill(passWord)
    await this.formloginButton.click()

  }
}
