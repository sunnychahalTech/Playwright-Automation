const {test, expect} = require('@playwright/test');
const { promises } = require('dns');


test('First Playwright test', async ({browser})=>
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


test('Complete login', async({page})=>
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



test('@Child Windows handl', async({browser})=>
{
    const context  = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const documentLink =  page.locator("[href*= 'documents-request']");
     
    const [newPage] = await Promise.all([
         context.waitForEvent('page'),
         documentLink.click(),
    ])

    // await expect (newPage.locator(".inner-box")).toContainText("DOCUMENTS REQUEST");

    const text =  await newPage.locator(".im-para.red").textContent();

    const arrayText = text.split("@");

    const domain = arrayText[1].split(" ")[0];


    await userName.fill(domain);

    console.log(await userName.inputValue());





});