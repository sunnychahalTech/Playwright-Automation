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

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sunnychaha555@gmail.com");
    await page.locator("#userPassword").fill("sunnyChahal@1");
    await page.locator("[value='Login']").click();
    
    


});