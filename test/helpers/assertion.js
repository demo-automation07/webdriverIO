const { expect } = require('chai');

class assertion{

        /**
         * Custom assertion to check if the page title matches the expected value
         * @param {string} actualTitle - The actual title of the page
         * @param {string} expectedTitle - The expected title of the page
         */
        assertPageTitle(actualTitle, expectedTitle) {
            expect(actualTitle).to.equal(expectedTitle, `Expected title to be "${expectedTitle}", but found "${actualTitle}"`);
        }

        /**
         * Custom assertion to check if an element is displayed
         * @param {WebdriverIO.Element} element - The element to check
         */
        assertElementIsVisible(element) {
            const isDisplayed = element.isDisplayed();
            expect(isDisplayed).to.be.true;
        }

        /**
         * Custom assertion to check if an element's text matches the expected text
         * @param {WebdriverIO.Element} element - The element whose text is to be checked
         * @param {string} expectedText - The expected text value
         */
        assertElementText(element, expectedText) {
            const actualText = element.getText();
            expect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        }

}

export default new assertion();