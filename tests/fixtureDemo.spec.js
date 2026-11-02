const {test, expect, request} = require('@playwright/test');
const {customTest} = require('./utils/fixture.js');




customTest("Fixtures Demo", async({authenticatedPage, createOrder})=>
{
    const orderId = createOrder.orderId;
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await authenticatedPage.locator("button[routerLink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();

    await expect(authenticatedPage.getByText(orderId)).toBeVisible();

});