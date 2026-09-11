import {test, expect} from '../fixtures/fixtures'

test('cart page visual regression test', async({cartPage}) => {
    await cartPage.addProducttoCart('Sauce Labs Backpack')
    await cartPage.goToCartPage()

    await expect(cartPage.page).toHaveScreenshot(
        'cart-with-item.png', 
        {maxDiffPixels: 500, 
            threshold: 0.3
        }
    )
})