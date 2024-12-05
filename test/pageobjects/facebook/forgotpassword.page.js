import { $ } from '@wdio/globals';
import actionhelper from '../../helpers/action.helper.js';
import { logInfo, logError } from '../../helpers/logger.helper.js';
class ForgotPassword extends actionhelper {

    get otpField() {
        return $('input[name="n"]');
    }

    // Locator for the 'Continue' button
    get continueButton() {
        return $('button[type="submit"]');
    }

    /**
    * Method to input OTP in the OTP field
    * @param {string} otp - The OTP value to be entered.
    * @throws {Error} Throws an error if there's an issue entering the OTP.
    */
    async enterOtp(otp) {
        try {
            logInfo(`Entering OTP: ${otp}`);  // Log the OTP entry attempt
            // Set value to the OTP field using the helper function
            await this.setValueToElement(this.otpField, otp);
            logInfo(`OTP entered successfully`);  // Log success message
        } catch (error) {
            logError(`Error entering OTP: ${otp}`, error);  // Log error if OTP entry fails
            throw error;  // Rethrow the error for further handling
        }
    }

    /**
     * Method to click the 'Continue' button to submit the OTP
     * @throws {Error} Throws an error if there's an issue clicking the 'Continue' button.
     */
    async clickContinue() {
        try {
            logInfo('Clicking the "Continue" button');  // Log the attempt to click the continue button
            // Use the helper method to click the button
            await this.clickElement(this.continueButton);
            logInfo('Successfully clicked the "Continue" button');  // Log success message
        } catch (error) {
            logError('Error clicking the "Continue" button', error);  // Log error if button click fails
            throw error;  // Rethrow the error for further handling
        }
    }
}
export default new ForgotPassword();