const {test, expect} = require('@playwright/test');


test.only('First Playwright test', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   console.log(await page.title());

   //css 

   const userName =  page.locator("#username");


   await userName.fill("SunnyChahal");

   await page.locator("[name = password]").fill("learning");

   await page.locator("#signInBtn").click();


   console.log(await page.locator(".alert.alert-danger.col-md-12").textContent());


});


test('Page Playwright test', async({page})=>
{
    await page.goto("https://google.com");


    console.log(await page.title());


    await expect(page).toHaveTitle("Google");
});