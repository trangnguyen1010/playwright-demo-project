import {Page, Locator} from '@playwright/test';

export class CheckoutPage{
    readonly checkOutButton: Locator;
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly taxInfo: Locator;
    readonly subtotalInfo: Locator;
    readonly totalPrice: Locator;
    readonly confirmationMessage: Locator;

    constructor(readonly page: Page){
        this.checkOutButton = page.getByRole('button', {name: 'Checkout'});
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.finishButton = page.getByRole('button', {name: 'Finish'});
        this.subtotalInfo = page.locator('[data-test="subtotal-label"]');
        this.taxInfo = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
    }

    async goToCheckout(){
        await this.checkOutButton.click();
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(){
        await this.continueButton.click();
    }
    
    async finishOrder(){
        await this.finishButton.click();
    }

    async getOrderSummaryInfo(){
        const subtotal = await this.subtotalInfo.textContent();
        const tax = await this.taxInfo.textContent();
        const total = await this.totalPrice.textContent();

        const parsePrice = (text: string | null) : number => {
            if(!text) return 0;
            const match = text.match(/\$([\d.]+)/);
            return match ? parseFloat(match[1]) : 0;
        } 
        return {
            subtotal: parsePrice(subtotal),
            tax: parsePrice(tax),
            total: parsePrice(total)
        }
    }

    async getConfirmationMessage(){
        return await this.confirmationMessage.textContent();
    }

}