import { expect } from 'chai';
import { logInfo, logError } from './logger.helper.js';
import ActionHelper from './action.helper.js';

class Assertion extends ActionHelper {

    /**
     * Custom assertion to check if the page title matches the expected value
     * @param {string} expectedTitle - The expected title of the page
     */
    async assertPageTitle(expectedTitle) {
        try {
            // Wait for the page to load
            await this.waitForPageToLoad();
            
            // Get the actual page title
            const actualTitle = await browser.getTitle();
    
            // Log the title comparison info
            const message = `Checking if page title is "${expectedTitle}" (Actual: "${actualTitle}")`;
            logInfo(message, 'assertion');
            
            // Assert the current title matches the expected title
            await expect(actualTitle).to.equal(expectedTitle, `Expected title to be "${expectedTitle}", but found "${actualTitle}"`);
        } catch (error) {
            // Log the error if the assertion fails or any other issue occurs
            logError('Error in title assertion:', error);
            throw new Error(`Failed to assert page title: ${error.message}`);
        }
    }

    /**
     * Custom assertion to check if an element is displayed
     * @param {WebdriverIO.Element} element - The element to check
     */
    async assertElementIsVisible(element) {
        try {
            const isDisplayed = await element.isDisplayed();
            const message = `Checking visibility of element (Displayed: ${isDisplayed})`;
            logInfo(message, 'assertion');
            await expect(isDisplayed).to.be.true;
        } catch (error) {
            logError('Error in element visibility assertion:', error);
            throw new Error(`Failed to assert element visibility: ${error.message}`);
        }
    }

    /**
     * Custom assertion to check if an element's text matches the expected text
     * @param {WebdriverIO.Element} element - The element whose text is to be checked
     * @param {string} expectedText - The expected text value
     */
    async assertElementTextByElement(element, expectedText) {
        try {
            const actualText = await element.getText();
            const message = `Checking if element text is "${expectedText}" (Actual: "${actualText}")`;
            logInfo(message, 'assertion');
            await expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        } catch (error) {
            logError('Error in element text assertion:', error);
            throw new Error(`Failed to assert element text: ${error.message}`);
        }
    }

       /**
   * Custom assertion to check if an element's text matches the expected text
   * @param {string} actualText - The actual value in page
   * @param {string} expectedText - The expected text value
   */
       async assertElementText(actualText, expectedText) {

        try {
            const message = `Checking if element text is "${expectedText}" (Actual: "${actualText}")`;
            logInfo(message, 'assertion');
        
            // Perform the assertion
            await expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        } catch (error) {
            // Log the error if the assertion fails
            logError(`Assertion failed: ${error.message}`, 'assertion');
            throw new Error(`Assertion failed: ${error.message}`);
        }
        
    }

    /**
     * Custom assertion to check if the current URL matches the expected URL
     * @param {string} expectedUrl - The expected URL value
     */
    async assertCurrentUrl(expectedUrl) {
        try {
            // Wait for the page to load
            await this.waitForPageToLoad();
            
            // Get the actual URL
            const actualUrl = await browser.getUrl();
    
            // Log the URL comparison info
            const message = `Checking if current URL is "${expectedUrl}" (Actual: "${actualUrl}")`;
            logInfo(message, 'assertion');
            
            // Assert the current URL matches the expected URL
            await expect(actualUrl).to.equal(expectedUrl, `Expected URL to be "${expectedUrl}", but found "${actualUrl}"`);
        } catch (error) {
            // Log the error if the assertion fails or any other issue occurs
            logError('Error in URL assertion:', error);
            throw new Error(`Failed to assert current URL: ${error.message}`);
        }
    }

    /**
     * Custom assertion to check if the current URL contains the expected substring
     * @param {string} expectedUrlSubstring - The expected substring of the URL
     */
    async assertCurrentUrlContains(expectedUrlSubstring) {
        try {
            const actualUrl = await browser.getUrl();
            const message = `Checking if current URL contains "${expectedUrlSubstring}" (Actual: "${actualUrl}")`;
            logInfo(message, 'assertion');
            await expect(actualUrl).to.include(expectedUrlSubstring,
                `Expected URL to contain "${expectedUrlSubstring}", but found "${actualUrl}"`);
        } catch (error) {
            logError('Error in URL substring assertion:', error);
            throw new Error(`Failed to assert URL contains substring: ${error.message}`);
        }
    }

    /**
     * Custom assertion to check that the value is not null or undefined
     * @param {string|null} value - The value to check
     * @throws {Error} If the value is null or undefined
     */
    async assertNotNull(value) {
        try {
            // Assert that the value is not null or undefined
            expect(value, 'value should not be null or undefined').to.not.be.null;
            
            // Log the result
            logInfo(`Value is not null: ${value}`, 'assertion');
        } catch (error) {
            logError('Error validating value null check:', error);
            throw error;
        }
    }

    /**
     * Custom assertion to check if the value matches the provided regex pattern
     * @param {string} value - The value to check
     * @param {RegExp} regex - The regular expression to validate against
     * @throws {Error} If the value does not match the regex pattern
     */
    async assertValueMatchesRegex(value, regex) {
        try {
            // Assert that the value matches the provided regex
            expect(value, `Value "${value}" should match the given regex pattern`).to.match(regex);

            // Log the result
            logInfo(`Value matches regex pattern: ${value}`, 'assertion');
        } catch (error) {
            logError('Error validating value against regex pattern:', error);
            throw error;
        }
    }
}

export default new Assertion();
