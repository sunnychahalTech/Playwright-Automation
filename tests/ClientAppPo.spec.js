const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobject/POManager');
const {customtest} = require('../tests/utils/test-base');


const dataSet = JSON.parse(JSON.stringify(require('../tests/utils/placeOrder.json')));

 // for loop more more data ****** IMP**

test('Client App Login PO', async ({ browser }) => {
    //     console.log("Username:", dataSet.username);
    // console.log("Product:", dataSet.productName);
    // console.log("Password exists:", !!dataSet.password);
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);




    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);


    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(dataSet.productName);
    await dashboardPage.navigateToCart();




    //await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(2000);

    await expect(page.getByText(dataSet.productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor({ state: "visible" });

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();









});

customtest.only('client App', async ({page, testOrderData})=>
{
    const poManager = new POManager(page);




    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testOrderData.username, testOrderData.password);


    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testOrderData.productName);
    await dashboardPage.navigateToCart();




    //await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(2000);

    await expect(page.getByText(testOrderData.productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor({ state: "visible" });

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();







});





