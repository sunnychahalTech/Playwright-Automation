const { test: base } = require('@playwright/test');

exports.customtest = base.extend({
    testOrderData: {
        username: "sunnychaha555@gmail.com",
        password: "sunnyChahal@1",
        productName: "ZARA COAT 3"
    }
});