import {Locator, Page} from "@playwright/test";

export class CartPage{
    readonly cartItem: Locator;
    readonly cartBadge: Locator;
    readonly cartList: Locator;
    readonly cartBadgeCount: Locator;

    constructor(readonly page: Page){
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
        this.cartList = page.locator('[data-test="inventory-item"]');
        this.cartBadgeCount = page.locator('[data-test="shopping-cart-link"]');
    }
    async addProducttoCart(itemName: string){
        await this.cartItem.filter({hasText: itemName}).getByRole('button', {name: 'Add to cart'}).click();
    }

    async getCartBadgeCount(){
        const text = await this.cartBadgeCount.textContent();
        return text ? parseInt(text) : 0;
    }

    async goToCartPage(){
        await this.cartBadge.click();
    }
    async removeProductFromCart(itemName: string){
        const removeButton = this.cartList.filter({hasText: itemName}).getByRole('button', {name: 'Remove'});
        await removeButton.click();
    }

}