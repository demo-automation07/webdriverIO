import { browser } from '@wdio/globals';
import fs from 'fs';

export default class ActionHelper {

    /**
     * @description Clicks the provided element after ensuring it's clickable.
     * @param {Webelement} element - The web element to be clicked.
     * @throws {Error} Throws error if the element is not clickable or any other issue occurs during the click action.
     */
    async clickElement(element) {
        try {
            await this.waitForElementToClickable(element);
            await this.highLightElement(element);
            await element.click();
        } catch (error) {
            console.error(`Error clicking element: ${error}`);
            throw error;  // Re-throw error after logging it
        }
    }

    /**
     * @description Double clicks the provided element after ensuring it's clickable.
     * @param {Web Element} element - The web element to be double-clicked.
     * @throws {Error} Throws error if the element is not clickable or any other issue occurs during the double-click action.
     */
    async doubleClickElement(element) {
        try {
            await this.waitForElementToClickable(element);
            await this.highLightElement(element);
            await element.doubleClick();
        } catch (error) {
            console.error(`Error double-clicking element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Sets a value to the provided element.
     * @param {Webelement} element - The web element to set the value on.
     * @param {string} value - The value to be set.
     * @throws {Error} Throws error if the element is not visible or any other issue occurs during setting the value.
     */
    async setValueToElement(element, value) {
        try {
            await this.waitForElementVisible(element);
            await this.highLightElement(element);
            await element.setValue(value);
        } catch (error) {
            console.error(`Error setting value to element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Clears the value from the provided element.
     * @param {Webelement} element - The web element to clear the value from.
     * @throws {Error} Throws error if the element is not visible or any other issue occurs during the clearing action.
     */
    async clearValueFromElement(element) {
        try {
            await this.waitForElementVisible(element);
            await element.clearValue();
        } catch (error) {
            console.error(`Error clearing value from element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Scrolls to the provided element.
     * @param {Webelement} element - The web element to scroll to.
     * @throws {Error} Throws error if the element is not found or any other issue occurs during scrolling.
     */
    async scrollToElement(element) {
        try {
            await this.waitForExist(element);
            await element.scrollIntoView();
        } catch (error) {
            console.error(`Error scrolling to element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Scrolls to the element and clicks it.
     * @param {Webelement} element - The web element to scroll to and click.
     * @returns {Promise} A promise that resolves when the element is clicked.
     * @throws {Error} Throws error if the element is not found or any issue occurs during the click action.
     */
    async scrollElementAndClick(element) {
        try {
            await element.scrollIntoView();
            return await element.click();
        } catch (error) {
            console.error(`Error scrolling and clicking element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Scrolls the provided element to the center of the viewport.
     * @param {Webelement} element - The web element to scroll into the center.
     * @returns {Promise} A promise that resolves when the element is scrolled to the center.
     * @throws {Error} Throws error if the element is not found or any issue occurs during the scroll action.
     */
    async scrollElementIntoCenter(element) {
        try {
            await this.waitForExist(element);
            return await element.scrollIntoView({ block: 'center', inline: 'center' });
        } catch (error) {
            console.error(`Error scrolling element to center: ${error}`);
            throw error;
        }
    }

    /**
     * @description Waits for the provided element to become visible.
     * @param {Webelement} element - The web element to wait for visibility.
     * @throws {Error} Throws error if the element is not visible within the timeout.
     */
    async waitForElementVisible(element) {
        try {
            await browser.waitUntil(() => element.isDisplayed());
        } catch (error) {
            console.error(`Error waiting for element to be visible: ${error}`);
            throw error;
        }
    }

    /**
     * @description Waits for the provided element to be clickable.
     * @param {Webelement} element - The web element to wait for clickable state.
     * @throws {Error} Throws error if the element is not clickable within the timeout.
     */
    async waitForElementToClickable(element) {
        try {
            await browser.waitUntil(() => element.isClickable());
        } catch (error) {
            console.error(`Error waiting for element to be clickable: ${error}`);
            throw error;
        }
    }

    /**
     * @description Waits for the provided element to exist in the DOM.
     * @param {Webelement} element - The web element to wait for existence.
     * @throws {Error} Throws error if the element does not exist within the timeout.
     */
    async waitForExist(element) {
        try {
            await element.waitForExist({ timeout: 5000 });
        } catch (error) {
            console.error(`Error waiting for element to exist: ${error}`);
            throw error;
        }
    }

    /**
     * @description Waits for the cancel loading element to disappear.
     * @param {Webelement} element - The web element that indicates loading completion.
     * @throws {Error} Throws error if the loading element is not found.
     */
    async waitForExistForCancelLoading(element) {
        try {
            await element.waitForExist({ reverse: true, timeout: 10000 });
        } catch (error) {
            console.error(`Error waiting for cancel loading element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Waits for the provided element to not be displayed.
     * @param {Webelement} element - The web element to wait for it to not be displayed.
     * @throws {Error} Throws error if the element is still displayed after the waiting time.
     */
    async waitForElementNotToBeDisplayed(element) {
        try {
            await element.waitForDisplayed({ reverse: true });
        } catch (error) {
            console.error(`Error waiting for element to not be displayed: ${error}`);
            throw error;
        }
    }

    /**
     * @description Switches to the specified iframe.
     * @param {Webelement} element - The iframe element to switch to.
     * @returns {Promise} A promise that resolves when the frame is switched.
     * @throws {Error} Throws error if switching to the iframe fails.
     */
    switchToIframe(element) {
        try {
            return browser.switchToFrame(element);
        } catch (error) {
            console.error(`Error switching to iframe: ${error}`);
            throw error;
        }
    }

    /**
     * @description Switches to a window based on the title or URL.
     * @param {string} titleOrUrl - The title or URL of the window to switch to.
     * @returns {Promise} A promise that resolves when the window is switched.
     * @throws {Error} Throws error if switching to the window fails.
     */
    switchBackViaTitleOrUrl(titleOrUrl) {
        try {
            return browser.switchWindow(titleOrUrl);
        } catch (error) {
            console.error(`Error switching back to window via title or URL: ${error}`);
            throw error;
        }
    }

    /**
     * @description Retrieves the title of the current page.
     * @returns {Promise<string>} A promise that resolves with the page title.
     * @throws {Error} Throws error if the title cannot be retrieved.
     */
    async getTitle() {
        try {
            return await browser.getTitle();
        } catch (error) {
            console.error(`Error getting page title: ${error}`);
            throw error;
        }
    }

    /**
     * @description Closes the current browser window.
     * @returns {Promise} A promise that resolves when the browser window is closed.
     * @throws {Error} Throws error if the window cannot be closed.
     */
    async closeBrowser() {
        try {
            return await browser.closeWindow();
        } catch (error) {
            console.error(`Error closing browser: ${error}`);
            throw error;
        }
    }

    /**
     * @description Highlights the specified element by adding a red border.
     * @param {Webelement} element - The web element to highlight.
     * @throws {Error} Throws error if the element cannot be highlighted.
     */
    async highLightElement(element) {
        try {
            await browser.execute((arg) => {
                arg.style.border = "2px solid red";
            }, await element);
        } catch (error) {
            console.error(`Error highlighting element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Retrieves the text content from the provided element.
     * @param {Webelement} element - The web element to retrieve text from.
     * @returns {Promise<string>} A promise that resolves with the text content of the element.
     * @throws {Error} Throws error if the element cannot be found or if any issue occurs while retrieving the text.
     */
    async getTextFromElement(element) {
        try {
            await this.waitForExist(element);
            return await element.getText();
        } catch (error) {
            console.error(`Error getting text from element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Retrieves the value attribute from the provided element.
     * @param {Webelement} element - The web element to retrieve the 'value' attribute from.
     * @returns {Promise<string>} A promise that resolves with the 'value' attribute of the element.
     * @throws {Error} Throws error if the element cannot be found or if there is an issue while retrieving the value.
     */
    async getValueAttributeFromElement(element) {
        try {
            await this.waitForExist(element);
            return await element.getAttribute('value');
        } catch (error) {
            console.error(`Error getting value attribute from element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Scrolls the browser window to the provided element.
     * @param {string} selector - The CSS selector of the element to scroll to.
     * @throws {Error} Throws error if the element cannot be found or if there is an issue during the scrolling process.
     */
    async scroll(selector) {
        try {
            browser.execute(function (elSelector) {
                document.querySelector(elSelector).scrollIntoView();
            }, selector);
        } catch (error) {
            console.error(`Error scrolling to element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Checks whether the provided element is present in the DOM.
     * @param {Webelement} element - The web element to check for presence.
     * @returns {Promise<boolean>} A promise that resolves with `true` if the element is present, otherwise `false`.
     * @throws {Error} Throws error if there is an issue checking the element's presence.
     */
    async getPresenceOfElement(element) {
        try {
            return await element.isExisting();
        } catch (error) {
            console.error(`Error checking presence of element: ${error}`);
            throw error;
        }
    }

    /**
     * @description Retrieves the 'aria-checked' attribute from the provided element.
     * @param {Webelement} element - The web element to retrieve the 'aria-checked' attribute from.
     * @returns {Promise<string>} A promise that resolves with the 'aria-checked' attribute value.
     * @throws {Error} Throws error if the attribute cannot be retrieved.
     */
    async getCheckedAttribute(element) {
        try {
            return await element.getAttribute('aria-checked');
        } catch (error) {
            console.error(`Error getting 'aria-checked' attribute: ${error}`);
            throw error;
        }
    }

    /**
     * @description Clears the value of an element using keyboard shortcuts (Ctrl + A, Backspace).
     * @param {Webelement} element - The web element to clear the value from.
     * @throws {Error} Throws error if there is an issue with the keyboard shortcuts or element interaction.
     */
    async clearValueWithKeys(element) {
        try {
            await element.click();
            await browser.keys([Key.Ctrl, 'a']);
            await browser.keys([Key.Backspace]);
        } catch (error) {
            console.error(`Error clearing value with keys: ${error}`);
            throw error;
        }
    }

    /**
     * @description Updates a JSON file with the provided object data.
     * @param {object} fileObject - The data to be written to the JSON file.
     * @param {string} filePath - The path to the JSON file.
     * @throws {Error} Throws error if there is an issue writing to the JSON file.
     */
    async updateJSON(fileObject, filePath) {
        try {
            const path = `./test/utils/jsonfiles/${filePath}`;
            fs.writeFile(path, JSON.stringify(fileObject, null, 2), function writeJSON(err) {
                if (err) {
                    console.error(`Error writing to JSON file: ${err}`);
                    throw err;
                }
            });
        } catch (error) {
            console.error(`Error updating JSON file: ${error}`);
            throw error;
        }
    }

   /**
     * Switches to an iframe by element reference.
     * @param {WebdriverIO.Element} iframe - The iframe element to switch to.
     */
   async switchToIframe(iframe) {
    try {
        await this.waitForElementToBeVisible(iframe);
        await browser.switchToFrame(iframe);
        console.log('Successfully switched to iframe.');
    } catch (error) {
        console.error('Error while switching to iframe:', error);
        throw new Error('Failed to switch to iframe.');
    }
}

/**
 * Switches back to the main document from an iframe.
 */
async switchToMainFrame() {
    try {
        await browser.switchToParentFrame();
        console.log('Successfully switched back to the main document.');
    } catch (error) {
        console.error('Error while switching back to the main document:', error);
        throw new Error('Failed to switch to main frame.');
    }
}

/**
 * Performs a key press action.
 * @param {string} key - The key to press (e.g., 'Enter', 'ArrowDown').
 */
async pressKey(key) {
    try {
        await browser.keys([key]);
        console.log(`Successfully pressed the key: ${key}`);
    } catch (error) {
        console.error(`Error while pressing the key ${key}:`, error);
        throw new Error(`Failed to press key ${key}.`);
    }
}

/**
 * Waits for an element to contain specific text.
 * @param {WebdriverIO.Element} element - The element to check text for.
 * @param {string} text - The text to wait for.
 * @param {number} timeout - Maximum wait time.
 */
async waitForTextInElement(element, text, timeout = 5000) {
    try {
        await browser.waitUntil(
            async () => (await element.getText()).includes(text),
            {
                timeout,
                timeoutMsg: `Expected text "${text}" not found within ${timeout} ms`
            }
        );
        console.log(`Text "${text}" found in element.`);
    } catch (error) {
        console.error(`Error while waiting for text "${text}" in element:`, error);
        throw new Error(`Failed to find text "${text}" within ${timeout} ms.`);
    }
}

/**
 * Waits for a new URL to load based on partial URL match.
 * @param {string} partialUrl - Partial URL to wait for.
 * @param {number} timeout - Maximum wait time.
 */
async waitForUrlContains(partialUrl, timeout = 5000) {
    try {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(partialUrl),
            {
                timeout,
                timeoutMsg: `URL containing "${partialUrl}" not loaded within ${timeout} ms`
            }
        );
        console.log(`URL containing "${partialUrl}" loaded successfully.`);
    } catch (error) {
        console.error(`Error while waiting for URL containing "${partialUrl}":`, error);
        throw new Error(`Failed to load URL containing "${partialUrl}" within ${timeout} ms.`);
    }
}

/**
 * Downloads a file and waits until the file is present in the download directory.
 * @param {string} fileName - The name of the file to wait for.
 * @param {string} downloadDir - The directory to check for the file.
 * @param {number} timeout - Maximum wait time.
 */
async waitForFileDownload(fileName, downloadDir = './downloads', timeout = 10000) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(downloadDir, fileName);

    try {
        await browser.waitUntil(
            () => fs.existsSync(filePath),
            {
                timeout,
                timeoutMsg: `File "${fileName}" not downloaded within ${timeout} ms`
            }
        );
        console.log(`File "${fileName}" downloaded successfully.`);
    } catch (error) {
        console.error(`Error while waiting for file download "${fileName}":`, error);
        throw new Error(`Failed to download file "${fileName}" within ${timeout} ms.`);
    }
}

/**
 * Captures a screenshot with a specific file name.
 * @param {string} fileName - Name of the screenshot file.
 * @param {string} outputDir - Directory to save the screenshot.
 */
async captureScreenshot(fileName, outputDir = './screenshots') {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(outputDir, fileName);

    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(`Created screenshot directory: ${outputDir}`);
        }

        await browser.saveScreenshot(filePath);
        console.log(`Screenshot saved at ${filePath}`);
    } catch (error) {
        console.error(`Error while capturing screenshot:`, error);
        throw new Error('Failed to capture screenshot.');
    }
}

/**
 * Helper function to wait for an element to be visible before interacting with it.
 * @param {WebdriverIO.Element} element - The element to check visibility for.
 * @param {number} timeout - Maximum wait time.
 */
async waitForElementToBeVisible(element, timeout = 5000) {
    try {
        await element.waitForDisplayed({ timeout });
        console.log(`Element is visible.`);
    } catch (error) {
        console.error('Error while waiting for element to be visible:', error);
        throw new Error(`Failed to wait for element to be visible within ${timeout} ms.`);
    }
}

}