import {test, expect} from '../fixtures/fixtures';

test.describe('Testing for products page', () => {

    test('should sort products by price from low to high', async ({productsPage}) => {
        //sort products by price from low to high
        await productsPage.sortBy('lohi');

        // verify that the products are sorted correctly
        const prices = await productsPage.getProductsPrice();
        console.log(prices);

        //verify that the prices are sorted in ascending order
        [...prices].sort((a, b) => a - b).forEach((price, index) => {
            expect(price).toEqual(prices[index]);
        });
    });

    test('sort products by price from high to low', async ({productsPage}) => {

        //sort products by price from high to low
        await productsPage.sortBy('hilo');

        const prices = await productsPage.getProductsPrice();
        console.log(prices);

        [...prices].sort((a,b) => b - a).forEach((price, index) => {
            expect(price).toEqual(prices[index]);
        });
    });

    test('sort products by name from A to Z', async({productsPage}) => {
        //sort products by name from A to Z
        await productsPage.sortBy('az');

        const names = await productsPage.getProductsName();
        console.log(names);

        [...names].sort().forEach((name, index) => {
            expect(name).toEqual(names[index]);
        });
    });

    test('sort products by name from Z to A', async({productsPage}) => {

        //sort products by name from Z to A

        await productsPage.sortBy('za');

        const names = await productsPage.getProductsName();
        console.log(names);
        
        [...names].sort().reverse().forEach((name, index) => {
            expect(name).toEqual(names[index])
        })
    })
})