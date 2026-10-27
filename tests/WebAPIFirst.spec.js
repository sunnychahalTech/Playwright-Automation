const {test, expect, request} =  require('@playwright/test');
const loginPayload = {userEmail: "sunnychaha555@gmail.com", userPassword: "sunnyChahal@1"};
const orderPayload = {orders: [{country: "Albania", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};


test.beforeAll(async() =>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;

    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers: {
            'Authorization' :token,
            'content-type' :'application/json'

        }
    }
    );
     const orderResponseJson = await orderResponse.json();
     console.log(orderResponseJson);
     const orderId = orderResponseJson.orders[0];



});

test('API login test', async () => {
    

    await page.getByRole('button', {name: 'ORDERS'}).click();

    await page.locator("tbody").waitFor();
});