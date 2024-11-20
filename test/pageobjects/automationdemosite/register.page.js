import { $ } from '@wdio/globals'
import actionhelper from '../../helpers/action.helper.js'
import {logInfo,logError} from '../../helpers/logger.helper.js'


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

    get multiSelectDropdown() {
        return $('#msdd'); // Selector for the multi-select dropdown
    }

    get languageListContainer() {
        return $('ul.ui-autocomplete');
    }

    // Selector for a language item (example: French)
    get LanguageItem() {
        return "//div[@id='msdd']/following-sibling::div//a[text()='{language}']";
    }

    get languagesList() {
        return $$('.ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content.ui-corner-all li'); // List of languages
    }

    get inputEmail() {
        return $('#basicBootstrapForm input[type="email"]');
    }

    get languageLabel(){
        return $("//div[@class='form-group']/label[text()='Languages']");
    }

    get inputPhone() {
        return $('#basicBootstrapForm input[type="tel"]');
    }

    get genderRadioButton(){
        return '#basicBootstrapForm input[value="{gender}"]';
    }
    // Gender radio buttons
    get radioBtnGenderMale() {
        return $('#basicBootstrapForm input[value="Male"]');
    }

    get radioBtnGenderFemale() {
        return $('#basicBootstrapForm input[value="FeMale"]');
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

    get ddSkills(){
        return $('#Skills');
    }

    /**
     * @description Enter the first name in the first name input field.
     * @param {string} firstName - The first name to be entered.
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if entering the first name fails.
     */
    async enterFirstName(firstName) {
        try {
            logInfo(`Entering first name: ${firstName}`, 'Register Page');
            await this.setValueToElement(this.inputFirstName, firstName);
        } catch (error) {
            logError(`Failed to enter first name: ${firstName}`, 'Register Page');
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
            logInfo(`Entering last name: ${lastName}`, 'Register Page');
            await this.setValueToElement(this.inputLastName, lastName);
        } catch (error) {
            logError(`Failed to enter last name: ${lastName}`, 'Register Page');
            throw new Error(`Error entering last name: ${error.message}`);
        }
    }

    /**
     * @description Opens the multi-select dropdown.
     * @throws {Error} Throws error if the dropdown cannot be opened.
     */
    async openLanguageDropdown() {
        try {
            logInfo('Opening language selection dropdown');
            await this.clickElement(this.multiSelectDropdown); // Click to open the dropdown
            logInfo('Dropdown opened successfully');
        } catch (error) {
            logError('Failed to open the dropdown: ' + error);
            throw new Error('Failed to open the language selection dropdown');
        }
    }

     /**
     * @description clsose the multi-select dropdown.
     * @throws {Error} Throws error if the dropdown cannot be closed.
     */
     async closeLanguageDropDown() {
        try {
            logInfo('closing language selection dropdown');
            await this.clickElement(this.languageLabel); 
            logInfo('Dropdown closed successfully');
        } catch (error) {
            logError('Failed to close the dropdown: ' + error);
            throw new Error('Failed to close the language selection dropdown');
        }
    }


 /**
 * @description Selects a language from the dropdown.
 * @param {string} languageToSelect - The language to select.
 * @throws {Error} Throws error if the language is not found.
 */
  async selectLanguage(languageToSelect) {
    try {
        logInfo(`Attempting to select language: ${languageToSelect}`);
        await this.openLanguageDropdown();  // Open the dropdown
        await this.scrollElementIntoCenter(this.languageListContainer);
        const langSelector = $(this.LanguageItem.replace("{language}", languageToSelect));
                try {
                    // Scroll the language option into view
                    await this.scrollWithinContainer(this.languageListContainer, langSelector);
                  
                } catch (scrollError) {
                    logError('Error scrolling to the language: ' + scrollError);
                    throw new Error(`Error scrolling to ${langSelector}`);
                }

                // Click the language
                await this.clickElement(langSelector)
                
              
            
        } catch (error) {
        logError(`Error selecting language ${languageToSelect}: ` + error);
        throw error;  // Re-throw error after logging
    }
    await this.closeLanguageDropDown();
}
    /**
     * @description Gets the currently selected language from the dropdown.
     * @returns {string} The selected language.
     */
    async getSelectedLanguage() {
        try {
            const selectedLanguage = await this.getTextFromElement(this.multiSelectDropdown);
            logInfo(`Currently selected language: ${selectedLanguage}`);
            return selectedLanguage;
        } catch (error) {
            logError('Error getting the selected language: ' + error);
            throw new Error('Error retrieving the selected language');
        }
    }

   /**
 * @description Selects a skill from a dropdown by its visible text.
 * @param {string} value - The visible text of the skill to be selected from the dropdown.
 * @throws {Error} Throws error if the selection fails or if any issue occurs while selecting the skill.
 */
async selectSkills(value) {
    
    try {
        // Log the action being performed
        logInfo(`Attempting to select skill with visible text: ${value}`);
        
        // Ensure the select element is available and select the option by visible text
        await this.SelectElementByVisibleText(this.ddSkills,value);
        
        // Log success after selecting the skill
        logInfo(`Successfully selected the skill with visible text: ${value}`);
    } catch (error) {
        // Log the error and rethrow it for further handling
        logError(`Error selecting skill with visible text: ${value}. Error: ${error.message}`);
        throw new Error(`Failed to select skill with value "${value}": ${error.message}`);
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
            logInfo(`Entering email: ${email}`, 'Register Page');
            await this.setValueToElement(this.inputEmail, email);
        } catch (error) {
            logError(`Failed to enter email: ${email}`, 'Register Page');
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
            logInfo(`Entering phone number: ${phone}`, 'Register Page');
            await this.setValueToElement(this.inputPhone, phone);
        } catch (error) {
            logError(`Failed to enter phone number: ${phone}`, 'Register Page');
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
            logInfo('Selecting gender: Male', 'Register Page');
            await this.clickElement(this.radioBtnGenderMale);
        } catch (error) {
            logError('Failed to select gender: Male', 'Register Page');
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
            logInfo('Selecting gender: Female', 'Register Page');
            await this.clickElement(this.radioBtnGenderFemale);
        } catch (error) {
            logError('Failed to select gender: Female', 'Register Page');
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
            logInfo('Selecting hobbies', 'Register Page');
            if (hobbies.includes('Cricket')) await this.clickElement(this.hobbiesCheckBoxCricket);
            if (hobbies.includes('Movies')) await this.clickElement(this.hobbiesCheckBoxMovies);
            if (hobbies.includes('Hockey')) await this.clickElement(this.hobbiesCheckBoxHockey);
        } catch (error) {
            logError(`Failed to select hobbies: ${hobbies.join(', ')}`, 'Register Page');
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
            logInfo(`Selecting country: ${country}`, 'Register Page');
            await this.setValueToElement(this.dropdownCountry, country);
        } catch (error) {
            logError(`Failed to select country: ${country}`, 'Register Page');
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
            logInfo(`Uploading file: ${filePath}`, 'Register Page');
            await this.setValueToElement(this.btnChooseFile, filePath);
        } catch (error) {
            logError(`Failed to upload file: ${filePath}`, 'Register Page');
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
            logInfo('Clicking submit button', 'Register Page');
            await this.clickElement(this.btnSubmit);
        } catch (error) {
            logError('Failed to click submit button', 'Register Page');
            throw new Error(`Error clicking submit button: ${error.message}`);
        }
    }
}

export default new RegisterPage();