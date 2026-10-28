const {test, expect, request} =  require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayload = {userEmail: "sunnychaha555@gmail.com", userPassword: "sunnyChahal@1"};
const orderPayload = {orders: [{country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let response;
test.beforeAll(async() =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('@API Place The Order', async ({page}) => {
    await page.addInitScript((token) => {
        window.localStorage.setItem('token', token);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); i++)
    {
        const rawOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rawOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails =await page.locator(".col-text").textContent();

     expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
     console.log(orderIdDetails);

});