import {test, expect} from '../fixtures/fixtures';

test.describe('test for cart page', () => {
    
    const productName = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    
    test('Adding an item to the cart and verifying the badge count', async({ cartPage }) => {

        //adding item to the cart
        await cartPage.addProducttoCart('Sauce Labs Backpack');

        //verifying the badge count
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe(1);
    })

    test('adding multiple items to the cart and verifying the badge count', async({cartPage}) => {

        //adding multiple items to the cart
        await cartPage.addProducttoCart('Sauce Labs Backpack');
        await cartPage.addProducttoCart('Sauce Labs Bike Light');

        //verifying the badge count
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe(2);
    })

    test('removing an item from the cart and verifying the badge count', async({cartPage}) => {
        //adding an item to the cart
        for(const name of productName){
            await cartPage.addProducttoCart(name);
        }
        //navigate to cart page
        await cartPage.goToCartPage();
        //verify the badge count
        const initialBadgeCount = await cartPage.getCartBadgeCount();
        expect(initialBadgeCount).toBe(2);

        //removing the item from the cart
        await cartPage.removeProductFromCart(productName[0]);
        //verify the badge count
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe(1);
    })

    test('removing all items from the cart and verifying the badge count', async({cartPage}) => {
        
        //adding an item to the cart
        for(const name of productName){
            await cartPage.addProducttoCart(name);
        }
        //navigate to cart page
        await cartPage.goToCartPage();
        //verify the badge count
        const initialBadgeCount = await cartPage.getCartBadgeCount();
        expect(initialBadgeCount).toBe(2);

        //removing all items from the cart
        for(const name of productName){
            await cartPage.removeProductFromCart(name);
        }
        //verify the badge count
        const badgeCount = await cartPage.getCartBadgeCount();
        expect(badgeCount).toBe(0);
    })
})