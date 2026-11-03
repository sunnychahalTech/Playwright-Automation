Feature: Ecommerce Validation

    Scenario: Placing the Order
    Given a login page with "sunnychaha555@gmail.com" and "sunnyChahal@1"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is added in Cart
    When Enter details and place order
    Then Verify order is placed


