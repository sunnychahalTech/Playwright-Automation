const {test, expect, request} =  require('@playwright/test');
const loginPayload = {userEmail: "sunnychaha555@gmail.com", userPassword: "sunnyChahal@1"};


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


});

test('API login test', async () => {
    console.log('API login test is running');
});