const { test, expect } = require('@playwright/test');

test('More Validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://chatgpt.com/c/6ae5d18d-2d2c-83e8-be6f-091192ddadd9");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*= 'lifetime-access']:visible").click();




});


test("Screenshot", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'screnshot.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: "screenshot1.png"});


});

test.only("Valid", async({page}) =>
{
    await page.goto("https://flightaware.com");
    //create ss first 
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});