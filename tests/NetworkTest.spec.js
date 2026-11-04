const { test, expect, request } = require("@playwright/test");

const { APiUtils } = require("./utils/APiUtils");
const loginPayload = { userEmail: "sunnychaha555@gmail.com", userPassword: "sunnyChahal@1" };
const orderPayload = { orders: [{ country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

let fakeResponse = {data: [], message: "No Orders" };
let apiContext, response;



test.beforeAll(async () => {
    apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test.only("@SP network route", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const responseApi = await route.fetch();
    
            route.fulfill(
                {
                    response: responseApi,
                    body: JSON.stringify(fakeResponse)
                }
            )
            // ApiResponse -> fakeResponse -> browswer
        });

        await page.locator("button[routerlink*='myorders']").click();
    
    
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());


});