export const validUser = {
    username: process.env.TEST_USERNAME || 'standard_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce'
}

export const invalidUser = {
    username: 'invalid_user',
    password: 'invalid_password'
}

export const lockedOutUser = {
    username: 'locked_out_user',
    password: 'secret_sauce'
}