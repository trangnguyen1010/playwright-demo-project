import {Locator, Page} from "@playwright/test";

export class ProductsPage {
    readonly productSortDropdown: Locator;
    readonly productsPrice: Locator;
    readonly productsName: Locator;

    constructor(private readonly page: Page) {
        this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productsPrice = page.locator('[data-test="inventory-item-price"]');
        this.productsName = page.locator('[data-test="inventory-item-name"]');

    }

    async sortBy(sortOptions: string): Promise<void> {
        await this.productSortDropdown.selectOption(sortOptions);
    }

    async getProductsPrice(){
        const priceTexts = await this.productsPrice.allTextContents();
        return priceTexts.map(priceText => parseFloat(priceText.replace('$', '')));
    }

    async getProductsName(){
        const productsName = await this.productsName.allTextContents();
        return productsName
    }

    async getProductPriceByName(productName: string): Promise<number> {
        const item = this.page.locator('[data-test="inventory-item"]').filter({hasText: productName})
        const priceText = await item.locator('[data-test="inventory-item-price"]').textContent()
        return priceText ? parseFloat(priceText.replace('$', '')):0
    }
}