import {test as base} from "@playwright/test";

interface TestOrderData
{
    username: string;
        password: string;
        productName: string;
}

export const customtest = base.extend<{testOrderData: TestOrderData}>({
    testOrderData: {
        username: "sunnychaha555@gmail.com",
        password: "sunnyChahal@1",
        productName: "ZARA COAT 3"
    }
});