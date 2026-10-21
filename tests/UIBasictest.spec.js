const {test} = require('@playwright/test');


test('First Playwright test', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://sso.teachable.com/secure/9521/identity/sign_up/otp?wizard_id=dGn4iboGJgMIQZbiQ4r0-ZNcBT94nqXJ27rYhCCg6v7nNQw761ddZd4oXM6wjVYrsSsoI8bm834BFp3rW2EaXg");



});


test.only('Page Playwright test', async({page})=>
{
    await page.goto("https://google.com");
});