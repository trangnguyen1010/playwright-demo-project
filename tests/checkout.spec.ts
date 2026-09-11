import {test, expect} from '../fixtures/fixtures';

test.describe('Checkout process testing', () => {
    const productName = ['Sauce Labs Bike Light'];
    
    test("checkout process with single item", async({checkoutPage, cartPage, productsPage}) => {

        await cartPage.addProducttoCart(productName[0]);

        //get product price
        const expectedSubtotal = await productsPage.getProductPriceByName(productName[0])

        //navigate to cart page
        await cartPage.goToCartPage();

        //navigate to checkout page
        await checkoutPage.goToCheckout();

        //fill in the checkout information
        await checkoutPage.fillInformation('John', 'Doe', '12345');

        //click continue button
        await checkoutPage.clickContinue();

        //get order summary information
        const orderSummary = await checkoutPage.getOrderSummaryInfo();
        const subtotal = orderSummary.subtotal;
        const tax = orderSummary.tax;
        const total = orderSummary.total;

        //verify the order summary info
        expect(subtotal).toBe(expectedSubtotal);
        expect(total).toBeCloseTo(subtotal + tax, 2);

        //finish order
        await checkoutPage.finishOrder();

        //verify confirmation message
        const confirmationMessage = await checkoutPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order!')
    })
})