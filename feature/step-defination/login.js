
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, chromium } = require("@playwright/test");

const { POManager } = require("../../pageobject/POManager");

Given('a login page with {string} and {string}', { timeout: 100*1000 }, async function (username, password) {

    const browser = await chromium.launch({
        headless: false,
    });

    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
    this.loginPage = this.poManager.getLoginPage();

    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {

    this.dashboardPage = this.poManager.getDashboardPage();

    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is added in Cart', async function (productName) {

    await expect(this.page.getByText(productName)).toBeVisible();
});

When('Enter details and place order', async function () {

    await this.page.getByRole("button", { name: "Checkout" }).click();

    await this.page.getByPlaceholder("Select Country")
        .pressSequentially("ind", { delay: 150 });

    this.dropDown = this.page.locator(".ta-results");

    await this.dropDown.waitFor({ state: "visible" });

    await this.page.getByRole("button", { name: "India" }).nth(1).click();

    await this.page.getByText("PLACE ORDER").click();
});

Then('Verify order is placed', async function () {

    await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();
});
