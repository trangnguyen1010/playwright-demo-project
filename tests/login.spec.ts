import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {validUser, invalidUser, lockedOutUser} from '../test-data/users';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    const loginTestCases = [
        {
            description: 'invalid password',
            username: invalidUser.username,
            password: invalidUser.password,
            expectedError: 'Epic sadface: Username and password do not match any user in this service'
        }, 
        {
            description : 'locked out user',
            username: lockedOutUser.username,
            password: lockedOutUser.password,
            expectedError: 'Epic sadface: Sorry, this user has been locked out.'
        }
    ]

    test('should login successfully with valid credentials', async ({page}) => {
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    for(const {description, username, password, expectedError} of loginTestCases){
        test(`should show error for ${description}`, async() => {
            await loginPage.login(username, password)
            await expect(loginPage.getErrorMessage()).toHaveText(expectedError)
        })
    }
});