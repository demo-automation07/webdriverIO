import { $ } from '@wdio/globals' 
import actionhelper from '../../helpers/action.helper.js'
import {logInfo,logError} from '../../helpers/logger.helper.js'


/**
 * @class LoginPage
 * @description Page object for the Home page, containing specific selectors and methods for interacting with the home page.
 */
class LoginPage extends actionhelper {
    
      /**
     * Gets the username input field on the login page.
     * @returns {WebdriverIO.Element} The username input field element.
     */
      get usernameField() {
        return $('#username');
    }

    /**
     * Gets the password input field on the login page.
     * @returns {WebdriverIO.Element} The password input field element.
     */
    get passwordField() {
        return $('#password');
    }

    /**
     * Gets the login button on the login page.
     * @returns {WebdriverIO.Element} The login button element.
     */
    get loginButton() {
        return $('#submit');
    }

    /**
     * Gets the error message element on the login page.
     * @returns {WebdriverIO.Element} The error message element (if login fails).
     */
    get errorMessage() {
        return $('#error');
    }

    /**
     * Performs the login action with the provided username and password.
     * @param {string} username - The username to be entered into the login form.
     * @param {string} password - The password to be entered into the login form.
     * @returns {Promise<void>} A promise that resolves once the login action is completed.
     */
    async login(username, password) {
        try {
            logInfo('enter username and password in the','loginPage')
            await this.setValueToElement(this.usernameField,username);  // Set the username value
            await this.setValueToElement(this.passwordField,password);  // Set the password value
            await this.clickElement(this.loginButton)  // Click the login button
        } catch (error) {
            // Log the error and throw a custom error message
            logError(`Login failed with ${error.message}`);
            throw new Error(`Login action failed: ${error.message}`);
        }
    }

    /**
     * Retrieves the error message shown when the login fails.
     * @returns {Promise<string>} The text of the error message displayed on the page.
     */
    async getErrorMessage() {
        try{
            return await this.getTextFromElement(this.errorMessage)  // Get the text of the error message
        }catch(error){
            logError(`Login failed with error message${error.message}`);
            throw new Error('Failed to retrieve the error message from the page.');
        }
    }
}

export default new LoginPage();