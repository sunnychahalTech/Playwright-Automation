const {test, expect, request} = require('@playwright/test');


let webContext
test.beforeAll(async({browser})=>
{
    const newContext = await browser.newContext();
    const page = await newContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sunnychaha555@gmail.com");
    await page.locator("#userPassword").fill("sunnyChahal@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await newContext.storageState({path: 'state.json'});
   webContext = await browser.newContext({storageState: 'state.json'});

});


test('@Web client App Login', async()=>
{
    
    const page = await webContext.newPage();
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const list = await page.locator(".card-body b").allTextContents();
    const count = await products.count();


    for (let i = 0; i < count; i++)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }


    await page.getByRole("listitem").getByRole("button", {name :"Cart"}).click();
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


