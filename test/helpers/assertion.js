import { expect } from 'chai'; 
import {logInfo,logError} from './logger.helper.js';

class assertion{

        /**
         * Custom assertion to check if the page title matches the expected value
         * @param {string} actualTitle - The actual title of the page
         * @param {string} expectedTitle - The expected title of the page
         */
        async assertPageTitle(expectedTitle) {
            const actualTitle = await browser.getTitle();
            const message = `Checking if page title is "${expectedTitle}" (Actual: "${actualTitle}")`;
            logInfo(message, 'assertion')
            await expect(actualTitle).to.equal(expectedTitle, `Expected title to be "${expectedTitle}", but found "${actualTitle}"`);
        }

        /**
         * Custom assertion to check if an element is displayed
         * @param {WebdriverIO.Element} element - The element to check
         */
        async assertElementIsVisible(element) {
            const isDisplayed = await element.isDisplayed();
            const message = `Checking visibility of element (Displayed: ${isDisplayed})`;
            logInfo(message, 'assertion');
            await expect(isDisplayed).to.be.true;
        }

        /**
         * Custom assertion to check if an element's text matches the expected text
         * @param {WebdriverIO.Element} element - The element whose text is to be checked
         * @param {string} expectedText - The expected text value
         */
        async assertElementTextbyElement(element, expectedText) {
            const actualText = await element.getText();
            const message = `Checking if element text is "${expectedText}" (Actual: "${actualText}")`;
            logInfo(message, 'assertion');
            await expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        }

          /**
         * Custom assertion to check if an element's text matches the expected text
         * @param {string} actualText - The actual value in page
         * @param {string} expectedText - The expected text value
         */
          async assertElementText(actualText, expectedText) {
           
            const message = `Checking if element text is "${expectedText}" (Actual: "${actualText}")`;
            logInfo(message, 'assertion');
            await expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        }


        /**
         * Custom assertion to check if the current URL matches the expected URL
         * @param {string} expectedUrl - The expected URL value
         */
        async assertCurrentUrl(expectedUrl) {
            const actualUrl = await browser.getUrl();
            const message = `Checking if current URL is "${expectedUrl}" (Actual: "${actualUrl}")`;
            logInfo(message, 'assertion');
            await expect(actualUrl).to.equal(expectedUrl, `Expected URL to be "${expectedUrl}", but found "${actualUrl}"`);
            }

        /**
         * Custom assertion to check if the current URL contains the expected substring
         * @param {string} expectedUrlSubstring - The expected substring of the URL
         */
        async assertCurrentUrlContains(expectedUrlSubstring) {
            const actualUrl = await browser.getUrl();
            const message = `Checking if current URL contains "${expectedUrlSubstring}" (Actual: "${actualUrl}")`;
            logInfo(message, 'assertion');
            await expect(actualUrl).to.include(expectedUrlSubstring,
                `Expected URL to contain "${expectedUrlSubstring}", but found "${actualUrl}"`
            );
        }

        /**
 * Custom assertion to check that the value is not null or undefined
 * @param {string|null} value - The reset code to check
 * @throws {Error} If the reset code is null or undefined
 */
    async  assertNotNull(value) {
        try {
            // Assert that the reset code is not null or undefined
            expect(value, 'value should not be null or undefined').to.not.be.null;

            // Log the result
            logInfo(`Reset code is not null: ${value}`, 'assertion');
            
        } catch (error) {
            // Log and throw the error if validation fails
            logError('Error validating value null check:', error);
            throw error;
        }
    }

   /**
 * Custom assertion to check if the value matches the provided regex pattern
 * @param {string} value - The value to check (e.g., reset code)
 * @param {RegExp} regex - The regular expression to validate against
 * @throws {Error} If the value does not match the regex pattern
 */
async  assertValueMatchesRegex(value, regex) {
    try {
        // Assert that the value matches the provided regex
        expect(value, `Value "${value}" should match the given regex pattern`).to.match(regex);

        // Log the result
        logInfo(`Value matches regex pattern: ${value}`, 'assertion');
        
    } catch (error) {
        // Log and throw the error if validation fails
        logError('Error validating value against regex pattern:', error);
        throw error;
    }
}
}

export default new assertion();