import { $ } from '@wdio/globals'
import actionhelper from '../../helpers/action.helper.js'
import LoggerHelper from '../../helpers/logger.helper.js'
const log = new LoggerHelper();

/**
 * RegisterPage class that contains specific selectors and methods for interacting with the registration page.
 */
class RegisterPage extends actionhelper {
    /**
     * Define selectors using getter methods to target elements on the page
     */

    // Input fields for personal information
    get inputFirstName() {
        return $('#basicBootstrapForm input[placeholder="First Name"]');
    }

    get inputLastName() {
        return $('#basicBootstrapForm input[placeholder="Last Name"]');
    }

    get inputAddress() {
        return $('#basicBootstrapForm textarea[placeholder="Address"]');
    }

    get inputEmail() {
        return $('#basicBootstrapForm input[type="email"]');
    }

    get inputPhone() {
        return $('#basicBootstrapForm input[type="tel"]');
    }

    // Gender radio buttons
    get radioBtnGenderMale() {
        return $('#basicBootstrapForm input[value="Male"]');
    }

    get radioBtnGenderFemale() {
        return $('#basicBootstrapForm input[value="Female"]');
    }

    // Hobbies checkbox group
    get hobbiesCheckBoxCricket() {
        return $('#checkbox1');
    }

    get hobbiesCheckBoxMovies() {
        return $('#checkbox2');
    }

    get hobbiesCheckBoxHockey() {
        return $('#checkbox3');
    }

    // Country dropdown
    get dropdownCountry() {
        return $('#countries');
    }

    // Submit button
    get btnSubmit() {
        return $('#submitbtn');
    }

    // File upload button
    get btnChooseFile() {
        return $('#imagesrc');
    }

    /**
     * @description Enter the first name in the first name input field.
     * @param {string} firstName - The first name to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the first name fails.
     */
    async enterFirstName(firstName) {
        try {
            log.logInfo(`Entering first name: ${firstName}`, 'Register Page');
            await this.setValueToElement(this.inputFirstName, firstName);
        } catch (error) {
            log.logError(`Failed to enter first name: ${firstName}`, 'Register Page');
            throw new Error(`Error entering first name: ${error.message}`);
        }
    }

    /**
     * @description Enter the last name in the last name input field.
     * @param {string} lastName - The last name to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the last name fails.
     */
    async enterLastName(lastName) {
        try {
            log.logInfo(`Entering last name: ${lastName}`, 'Register Page');
            await this.setValueToElement(this.inputLastName, lastName);
        } catch (error) {
            log.logError(`Failed to enter last name: ${lastName}`, 'Register Page');
            throw new Error(`Error entering last name: ${error.message}`);
        }
    }

    /**
     * @description Enter the address in the address input field.
     * @param {string} address - The address to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the address fails.
     */
    async enterAddress(address) {
        try {
            log.logInfo(`Entering address: ${address}`, 'Register Page');
            await this.setValueToElement(this.inputAddress, address);
        } catch (error) {
            log.logError(`Failed to enter address: ${address}`, 'Register Page');
            throw new Error(`Error entering address: ${error.message}`);
        }
    }

    /**
     * @description Enter the email in the email input field.
     * @param {string} email - The email to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the email fails.
     */
    async enterEmail(email) {
        try {
            log.logInfo(`Entering email: ${email}`, 'Register Page');
            await this.setValueToElement(this.inputEmail, email);
        } catch (error) {
            log.logError(`Failed to enter email: ${email}`, 'Register Page');
            throw new Error(`Error entering email: ${error.message}`);
        }
    }

    /**
     * @description Enter the phone number in the phone input field.
     * @param {string} phone - The phone number to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the phone number fails.
     */
    async enterPhoneNumber(phone) {
        try {
            log.logInfo(`Entering phone number: ${phone}`, 'Register Page');
            await this.setValueToElement(this.inputPhone, phone);
        } catch (error) {
            log.logError(`Failed to enter phone number: ${phone}`, 'Register Page');
            throw new Error(`Error entering phone number: ${error.message}`);
        }
    }

    /**
     * @description Select the gender as Male.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if selecting the gender fails.
     */
    async selectGenderMale() {
        try {
            log.logInfo('Selecting gender: Male', 'Register Page');
            await this.clickElement(this.radioBtnGenderMale);
        } catch (error) {
            log.logError('Failed to select gender: Male', 'Register Page');
            throw new Error(`Error selecting gender: Male: ${error.message}`);
        }
    }

    /**
     * @description Select the gender as Female.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if selecting the gender fails.
     */
    async selectGenderFemale() {
        try {
            log.logInfo('Selecting gender: Female', 'Register Page');
            await this.clickElement(this.radioBtnGenderFemale);
        } catch (error) {
            log.logError('Failed to select gender: Female', 'Register Page');
            throw new Error(`Error selecting gender: Female: ${error.message}`);
        }
    }

    /**
     * @description Select hobbies from the checkbox group.
     * @param {string[]} hobbies - List of hobbies to be selected.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if selecting hobbies fails.
     */
    async selectHobbies(hobbies) {
        try {
            log.logInfo('Selecting hobbies', 'Register Page');
            if (hobbies.includes('Cricket')) await this.clickElement(this.hobbiesCheckBoxCricket);
            if (hobbies.includes('Movies')) await this.clickElement(this.hobbiesCheckBoxMovies);
            if (hobbies.includes('Hockey')) await this.clickElement(this.hobbiesCheckBoxHockey);
        } catch (error) {
            log.logError(`Failed to select hobbies: ${hobbies.join(', ')}`, 'Register Page');
            throw new Error(`Error selecting hobbies: ${error.message}`);
        }
    }

    /**
     * @description Select the country from the dropdown.
     * @param {string} country - The country to be selected.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if selecting the country fails.
     */
    async selectCountry(country) {
        try {
            log.logInfo(`Selecting country: ${country}`, 'Register Page');
            await this.setValueToElement(this.dropdownCountry, country);
        } catch (error) {
            log.logError(`Failed to select country: ${country}`, 'Register Page');
            throw new Error(`Error selecting country: ${error.message}`);
        }
    }

    /**
     * @description Upload a file using the file upload input.
     * @param {string} filePath - The path of the file to be uploaded.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if file upload fails.
     */
    async uploadFile(filePath) {
        try {
            log.logInfo(`Uploading file: ${filePath}`, 'Register Page');
            await this.setValueToElement(this.btnChooseFile, filePath);
        } catch (error) {
            log.logError(`Failed to upload file: ${filePath}`, 'Register Page');
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }

    /**
     * @description Submit the registration form.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if submitting the form fails.
     */
    async clickSubmitButton() {
        try {
            log.logInfo('Clicking submit button', 'Register Page');
            await this.clickElement(this.btnSubmit);
        } catch (error) {
            log.logError('Failed to click submit button', 'Register Page');
            throw new Error(`Error clicking submit button: ${error.message}`);
        }
    }
}

export default new RegisterPage();