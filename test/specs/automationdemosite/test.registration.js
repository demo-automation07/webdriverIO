import { expect } from '@wdio/globals'
import HomePage from '../../pageobjects/automationdemosite/home.page.js'
import RegisterPage from '../../pageobjects/automationdemosite/register.page.js'


describe('Register an user in automation demo application', () => {

    it('User should click on skip sign in button in home page', async () => {        
        await HomePage.clickSkipSignIn();
    })

    it('Enter the mandatory values in the register form', async () => {
        await RegisterPage.enterFirstName("hello")
        await RegisterPage.enterFirstName("world")
    })

    it('click on the submit button', async () => {
        await RegisterPage.clickSubmitButton()
    })
})