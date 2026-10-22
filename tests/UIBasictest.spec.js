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


test.only('Complete login', async({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const userName = page.locator("#username");
   const dropDown = page.locator("select.form-control");

   await userName.fill("rahulshettyacademy");
   await page.locator("#password").fill("Learning@830$3mK2");
   await dropDown.selectOption("consult");
   

   await page.locator(".radiotextsty").nth(1).click();  //or can use last also :)
   await page.locator("#okayBtn").click();

   await page.locator("#terms").click();


   
   await page.locator("#signInBtn").click();

   //await page.pause();
   



}
);