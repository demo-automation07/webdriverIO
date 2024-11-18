import { expect } from 'chai'; 
import LoggerHelper from './logger.helper';
const log = new LoggerHelper();

class assertion{

        /**
         * Custom assertion to check if the page title matches the expected value
         * @param {string} actualTitle - The actual title of the page
         * @param {string} expectedTitle - The expected title of the page
         */
        async assertPageTitle(expectedTitle) {
            const actualTitle = await browser.getTitle();
            const message = `Checking if page title is "${expectedTitle}" (Actual: "${actualTitle}")`;
            log.logInfo(message, 'assertion')
            expect(actualTitle).to.equal(expectedTitle, `Expected title to be "${expectedTitle}", but found "${actualTitle}"`);
        }

        /**
         * Custom assertion to check if an element is displayed
         * @param {WebdriverIO.Element} element - The element to check
         */
        async assertElementIsVisible(element) {
            const isDisplayed = await element.isDisplayed();
            const message = `Checking visibility of element (Displayed: ${isDisplayed})`;
            log.logInfo(message, 'assertion');
            expect(isDisplayed).to.be.true;
        }

        /**
         * Custom assertion to check if an element's text matches the expected text
         * @param {WebdriverIO.Element} element - The element whose text is to be checked
         * @param {string} expectedText - The expected text value
         */
        assertElementText(element, expectedText) {
            const actualText = element.getText();
            const message = `Checking if element text is "${expectedText}" (Actual: "${actualText}")`;
            log.logInfo(message, 'assertion');
            expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        }

        /**
         * Custom assertion to check if the current URL matches the expected URL
         * @param {string} expectedUrl - The expected URL value
         */
        async assertCurrentUrl(expectedUrl) {
        const actualUrl = await browser.getUrl();
        const message = `Checking if current URL is "${expectedUrl}" (Actual: "${actualUrl}")`;
        log.logInfo(message, 'assertion');
        expect(actualUrl).to.equal(expectedUrl, `Expected URL to be "${expectedUrl}", but found "${actualUrl}"`);
        }

        /**
         * Custom assertion to check if the current URL contains the expected substring
         * @param {string} expectedUrlSubstring - The expected substring of the URL
         */
        async assertCurrentUrlContains(expectedUrlSubstring) {
            const actualUrl = await browser.getUrl();
            const message = `Checking if current URL contains "${expectedUrlSubstring}" (Actual: "${actualUrl}")`;
            log.logInfo(message, 'assertion');
            expect(actualUrl.includes(expectedUrlSubstring)).to.be.true(
                `Expected URL to contain "${expectedUrlSubstring}", but found "${actualUrl}"`
            );
        }

}

export default new assertion();