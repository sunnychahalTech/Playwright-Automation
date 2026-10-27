const { test, expect } = require('@playwright/test');

test('@register', async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[style*= 'cursor']").click();
    await page.locator("[placeholder = 'First Name']").fill("sunny");
    await page.locator("[placeholder = 'Last Name']").fill("chahal");
    await page.locator("[placeholder = 'email@example.com']").fill("sunnychaha555@gmail.com");
    await page.locator("[placeholder = 'enter your number']").fill("9536210225");
    await page.locator("select").selectOption("Doctor");

    await page.locator("[value = 'Male']").click();
    
    //console.log("Password fields:", await page.locator("[placeholder='Password']").count());
    
    //await page.pause();
    await page.locator("[type = 'password']").nth(0).fill("sunnyChahal@1");
    await page.locator("[type = 'password']").nth(1).fill("sunnyChahal@1");
    await page.locator("[type = 'checkbox']").click();
    await page.locator("[type = 'submit']").click();

    // await page.locator("#userEmail").fill("sunnychaha555@gmail.com");
    // await page.locator("#userPassword").fill("sunnyChahal@1");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    // const list = await page.locator(".card").allTextContents();
    // console.log(list);
    
    


    


    //await expect(page.locator("[placeholder = 'email@example.com']")).toHaveValue("sunnychaha555@gmail.com")
});


test.only('@Web client App Login', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sunnychaha555@gmail.com");
    await page.locator("#userPassword").fill("sunnyChahal@1");
    await page.locator("[value='Login']").click();
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




test('Playwright Special Locators', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

});