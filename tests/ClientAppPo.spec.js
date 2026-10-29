const { test, expect } = require('@playwright/test');
const { POManager} = require('../pageobject/POManager');


test.only('Client App Login', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);
   
    const productName = 'ZARA COAT 3';


    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin("sunnychaha555@gmail.com", "sunnyChahal@1");


    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();



    
    //await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(2000);

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    await page.getByRole("button", {name: "Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor({ state: "visible" });

    await page.getByRole("button",{name :"India"}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


    






});


