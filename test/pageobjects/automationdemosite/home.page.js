import { $ } from '@wdio/globals' 
import actionhelper from '../../helpers/action.helper.js'
import LoggerHelper from '../../helpers/logger.helper.js'

const log = new LoggerHelper();

/**
 * @class HomePage
 * @description Page object for the Home page, containing specific selectors and methods for interacting with the home page.
 */
class HomePage extends actionhelper {
    
    /**
     * @description Gets the sign-in button on the home page.
     * @returns {WebdriverIO.Element} The sign-in button element.
     */
    get btnSignIn () {
        return $('#btn1');
    }

    /**
     * @description Gets the skip sign-in button on the home page.
     * @returns {WebdriverIO.Element} The skip sign-in button element.
     */
    get btnSkipSignIn () {
        return $('#btn2');
    }

    /**
     * @description Gets the email input field on the home page.
     * @returns {WebdriverIO.Element} The email input element.
     */
    get inputEmail () {
        return $('#email');
    }

    /**
     * @description Clicks the "Skip Sign In" button on the home page to bypass the sign-in process.
     * Logs the action and handles any potential errors.
     * @throws {Error} Throws an error if unable to click the skip sign-in button.
     */
    async clickSkipSignIn () {
        try {
            log.logInfo('Clicking on the "Skip Sign In" button', 'HomePage');
            await this.clickElement(this.btnSkipSignIn);
        } catch (error) {
            log.logError('Failed to click the "Skip Sign In" button', 'HomePage');
            throw new Error('Error clicking the "Skip Sign In" button: ' + error.message);
        }
    }

    /**
     * @description Clicks the sign-in button on the home page.
     * Logs the action and handles any potential errors.
     * @throws {Error} Throws an error if unable to click the sign-in button.
     */
    async clickSignIn () {
        try {
            log.logInfo('Clicking on the "Sign In" button', 'HomePage');
            await this.clickElement(this.btnSignIn);
        } catch (error) {
            log.logError('Failed to click the "Sign In" button', 'HomePage');
            throw new Error('Error clicking the "Sign In" button: ' + error.message);
        }
    }

    /**
     * @description Enters an email address in the email input field on the home page.
     * Logs the action and handles any potential errors.
     * @param {string} email - The email address to be entered.
     * @throws {Error} Throws an error if unable to enter the email address.
     */
    async enterEmail (email) {
        try {
            log.logInfo(`Entering email: ${email}`, 'HomePage');
            await this.setValueToElement(this.inputEmail, email);
        } catch (error) {
            log.logError(`Failed to enter email: ${email}`, 'HomePage');
            throw new Error('Error entering email address: ' + error.message);
        }
    }
}

export default new HomePage();