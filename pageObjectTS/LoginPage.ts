import {Page, Locator} from '@playwright/test';
export class LoginPage
{
    page: Page;
    signInBtn: Locator;
    username: Locator;
    password: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.signInBtn = page.locator("[value='Login']");
        this.username = page.locator("#userEmail");
        this.password =  page.locator("#userPassword");
    }


    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();

    };
}


module.exports = {LoginPage};