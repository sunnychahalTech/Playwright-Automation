const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobject/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../tests/utils/placeOrder.json')));

for (const data of dataSet)
{
test(`Client App Login PO ${data.productName}`, async ({ browser }) => {
    //     console.log("Username:", dataSet.username);
    // console.log("Product:", dataSet.productName);
    // console.log("Password exists:", !!dataSet.password);
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);




    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);


    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();




    //await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(2000);

    await expect(page.getByText(data.productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor({ state: "visible" });

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();









});
}


