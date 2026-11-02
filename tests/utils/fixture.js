const base = require("@playwright/test");
const { request } = require("@playwright/test");
const { APiUtils } = require('./APiUtils');
const loginPayload = { userEmail: "sunnychaha555@gmail.com", userPassword: "sunnyChahal@1" };
const orderPayload = { orders: [{ country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

exports.customTest = base.test.extend({
    authenticatedPage: async ({ page }, use) => {
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("sunnychaha555@gmail.com");
        await page.locator("#userPassword").fill("sunnyChahal@1");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);
        //teardown
    },

    createOrder: async ({ }, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);

        //tearDown

        apiContext.dispose();

    }
})