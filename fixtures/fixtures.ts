import {test as base, expect, Page} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { validUser } from '../test-data/users'

type MyFixtures = {
    loggedInPage: Page
    productsPage: ProductsPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
}

export const test = base.extend<MyFixtures>({
    loggedInPage: async({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login(validUser.username, validUser.password)
        await use(page)
    },
    productsPage: async({loggedInPage}, use) => {
        await use(new ProductsPage(loggedInPage))
    },

    cartPage: async({loggedInPage}, use) => {
        await use(new CartPage(loggedInPage))
    },

    checkoutPage: async ({loggedInPage}, use) => {
        await use(new CheckoutPage(loggedInPage))
    }
})

export {expect}