import { $ } from '@wdio/globals';
import actionhelper from '../../helpers/action.helper.js';
import { logError, logInfo } from '../../helpers/logger.helper.js';


class LandingPage extends actionhelper {
    //locators for landing page
    get emailField() {
        return $('input#email');
    }

    get passwordField() {
        return $('input#pass');
    }

    get loginButton() {
        return $('button[name="login"]');
    }

    get forgotPasswordLink() {
        return $('//a[text()="Forgotten password?"]');
    }

    get tryAnotherWayButton() {
        return $('//a[text()="Try another way"]');
    }

    get continueButton() {
        return $('button[type="submit"]');
    }


    /**
     * Logs in to Facebook using the provided email and password
     * @param {string} email - The email to use for login.
     * @param {string} password - The password to use for login.
     * @throws {Error} Throws an error if login fails.
     */
    async login(email, password) {
        try {
            logInfo(`Attempting to log in with email: ${email}`);  // Log the email used for login
            // Set values to email and password fields
            await this.setValueToElement(this.emailField, email);
            await this.setValueToElement(this.passwordField, password);
            // Click the login button
            await this.clickElement(this.loginButton);
            logInfo('Successfully clicked login button');  // Log success message
        } catch (error) {
            logError('Error during login', error);  // Log any errors encountered during login
            throw error;  // Throw error if login fails
        }
    }

    /**
     * Clicks the 'Forgot Password' link to begin password recovery
     * @throws {Error} Throws an error if the link cannot be clicked.
     */
    async clickForgotPassword() {
        try {
            logInfo('Clicking the "Forgot Password" link');  // Log attempt to click the forgot password link
            await this.clickElement(this.forgotPasswordLink);
            logInfo('Successfully clicked "Forgot Password" link');  // Log success message
        } catch (error) {
            logError('Error clicking "Forgot Password" link', error);  // Log error if link click fails
            throw error;  // Throw error to stop further execution
        }
    }

    /**
     * Clicks the 'Try Another Way' button in the password recovery flow
     * @throws {Error} Throws an error if the button cannot be clicked.
     */
    async clickTryAnotherWay() {
        try {
            logInfo('Clicking the "Try Another Way" button');  // Log attempt to click the try another way button
            const checkelement = await this.getPresenceOfElement(this.tryAnotherWayButton);
            if (checkelement) {
                await this.clickElement(this.tryAnotherWayButton);
            }
            logInfo('Successfully clicked "Try Another Way" button');  // Log success message
        } catch (error) {
            logError('Error clicking "Try Another Way" button', error);  // Log error if button click fails
            throw error;  // Throw error to stop further execution
        }
    }

    /**
     * Clicks the 'Continue' button, typically after entering recovery information
     * @throws {Error} Throws an error if the continue button cannot be clicked.
     */
    async submit() {
        try {
            logInfo('Clicking the "Continue" button');  // Log attempt to click the continue button
            await this.clickElement(this.continueButton);
            logInfo('Successfully clicked "Continue" button');  // Log success message
        } catch (error) {
            logError('Error clicking "Continue" button', error);  // Log error if button click fails
            throw error;  // Throw error to stop further execution
        }
    }
}

export default new LandingPage();