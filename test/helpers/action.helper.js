import { browser } from '@wdio/globals';
import fs from 'fs';
import { logError, logInfo } from './logger.helper';

export default class ActionHelper {

    /**
 * @description Opens the provided URL in the browser.
 * @param {string} url - The URL to open in the browser.
 * @throws {Error} Throws an error if the URL is invalid or the page cannot be opened.
 */
    async openUrl(url) {
        try {
            // Check if the provided URL is a valid string
            if (typeof url !== 'string' || !url.trim()) {
                logError('Invalid URL provided. Please provide a valid URL string.')
                throw new Error('Invalid URL provided. Please provide a valid URL string.');
            }

            // Open the URL in the browser
            await browser.url(url);  // WebDriverIO's built-in method to navigate to a URL
            logInfo(`Successfully opened the URL: ${url}`);
            

        } catch (error) {
            // Log the error if there is an issue with opening the URL
            logError(`Error opening the URL: ${error.message}`);
            throw new Error(`Failed to open URL: ${error.message}`);
        }
    }

    /**
     * @description Maximizes the browser window
     * @throws {Error} Throws an error if the browser window fails to maximize.
     */
    async maximizeBrowserWindow() {
        try {
            await browser.maximizeWindow();  // Maximize the window
            logInfo('Browser window maximized.');
        } catch (error) {
            logError(`Error maximizing browser window: ${error}`);
            throw error;  // Re-throw the error after logging it
        }
    }

    /**
     * @description Clicks the provided element after ensuring it's clickable.
     * @param {Webelement} element - The web element to be clicked.
     * @throws {Error} Throws error if the element is not clickable or any other issue occurs during the click action.
     */
    async clickElement(element) {
        try {
            await this.waitForExist(element);
            await this.waitForElementToClickable(element);
            await this.highLightElement(element);
            await element.click();
        } catch (error) {
            logError(`Error clicking element: ${error}`);
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
            await this.waitForExist(element);
            await this.waitForElementToClickable(element);
            await this.highLightElement(element);
            await element.doubleClick();
        } catch (error) {
            logError(`Error double-clicking element: ${error}`);
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
            await this.waitForExist(element);
            await this.waitForElementVisible(element);
            await this.highLightElement(element);
            await element.setValue(value);
        } catch (error) {
            logError(`Error setting value to element: ${error}`);
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
            await this.waitForExist(element);
            await this.waitForElementVisible(element);
            await element.clearValue();
        } catch (error) {
            logError(`Error clearing value from element: ${error}`);
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
            logError(`Error scrolling to element: ${error}`);
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
            logError(`Error scrolling and clicking element: ${error}`);
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
            logError(`Error scrolling element to center: ${error}`);
            throw error;
        }
    }

    /**
     * @description Scrolls the provided element to the nearest of the viewport.
     * @param {Webelement} element - The web element to scroll into the nearest.
     * @returns {Promise} A promise that resolves when the element is scrolled to the center.
     * @throws {Error} Throws error if the element is not found or any issue occurs during the scroll action.
     */
    async scrollElementIntoNearest(element) {
        try {
            await this.waitForExist(element);
            return await element.scrollIntoView({ block: 'center', inline: 'nearest' });
        } catch (error) {
            logError(`Error scrolling element to nearest: ${error}`);
            throw error;
        }
    }

    /**
     * Scroll within a container to make the element visible.
     * @param {WebDriverIO.Element} container - The scrollable container (ul).
     * @param {WebDriverIO.Element} element - The element (language) to scroll into view.
     */
    async scrollWithinContainer(container, element) {
        try {
            
                // First, check if the element is already in the visible part of the container
                const isElementVisible = await element.isDisplayed();
                if (isElementVisible) {
                    logInfo('Element is already visible in the container, no need to scroll.');
                    return;
                }

        // Scroll using the browser's execute method if the element is out of view
        await browser.execute(function(conatainer,element) {
            // Scroll the container to the target element using `scrollIntoView`
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, container, element);

       // logInfo(`Scrolled element ${element} into view successfully.`);
        } catch (error) {
            logError('Error scrolling within container:', error);
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
            await browser.waitUntil(
                async () => {
                    const isDisplayed = await element.isDisplayed(); // Check if the element is visible
                    return isDisplayed === true; // Return a boolean
                },
                {
                    timeout: 5000,  // Timeout in ms
                    timeoutMsg: 'Element was not visible after 5 seconds', // Custom message
                }
            );
        } catch (error) {
            logError(`Error waiting for element to be visible: ${error}`);
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
            logError(`Error waiting for element to be clickable: ${error}`);
            throw error;
        }
    }

   /**
 * @description Waits for the provided element to exist in the DOM.
 * @param {Webelement} element - The web element to wait for existence.
 * @param {number} [timeout=5000] - Timeout duration in milliseconds (default: 5000ms).
 * @param {string} [errorMessage] - Optional custom error message.
 * @throws {Error} Throws error if the element does not exist within the timeout.
 */
async waitForExist(element, timeout = 6000, errorMessage = 'Element not found within the timeout') {
    try {
        // Wait for the element to exist within the specified timeout
        await element.waitForExist({ timeout: timeout });
        logInfo(`Element found: ${element.selector}`);  // Optional log if element is found
    } catch (error) {
        // Handle error if the element does not exist within the timeout
        if (error.message.includes('timeout')) {
            const errorMsg = errorMessage || `Element with selector "${element.selector}" was not found within ${timeout}ms.`;
            logError(errorMsg);
            throw new Error(errorMsg);  // Throw a custom error message
        }
        // Rethrow the error if it is not related to timeout
        logError(`Unexpected error while waiting for element: ${error.message}`);
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
            logError(`Error waiting for cancel loading element: ${error}`);
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
            logError(`Error waiting for element to not be displayed: ${error}`);
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
            logError(`Error switching to iframe: ${error}`);
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
            logError(`Error switching back to window via title or URL: ${error}`);
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
            logError(`Error getting page title: ${error}`);
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
            logError(`Error closing browser: ${error}`);
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
            logError(`Error highlighting element: ${error}`);
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
            logError(`Error getting text from element: ${error}`);
            throw error;
        }
    }

     /**
      
    * @description Selects an option from a dropdown by its value.
    * @param {Webelement} element - The web element to select
    * @param {string} text - The text of the option to be selected from the dropdown.
    * @throws {Error} Throws error if the dropdown or the value option cannot be found or if any issue occurs during the selection.

     */
    async SelectElementByVisibleText(element,text) {
        try {
            await this.waitForExist(element);
            await element.selectByVisibleText(text);
        } catch (error) {
            logError(`Error selecting element from value: ${error}`);
            throw error;
        }
    }

     /**
      
    * @description Selects an option from a dropdown by its value.
    * @param {Webelement} element - The web element to select
    * @param {string} value - The value of the option to be selected from the dropdown.
    * @throws {Error} Throws error if the dropdown or the value option cannot be found or if any issue occurs during the selection.

     */
     async SelectElementByValue(element,value) {
        try {
            await this.waitForExist(element);
            await element.selectByValue(value);
        } catch (error) {
            logError(`Error selecting element from value: ${error}`);
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
            logError(`Error getting value attribute from element: ${error}`);
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
            logError(`Error scrolling to element: ${error}`);
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
            logError(`Error checking presence of element: ${error}`);
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
            logError(`Error getting 'aria-checked' attribute: ${error}`);
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
            logError(`Error clearing value with keys: ${error}`);
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
                    logError(`Error writing to JSON file: ${err}`);
                    throw err;
                }
            });
        } catch (error) {
            logError(`Error updating JSON file: ${error}`);
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
        logInfo('Successfully switched to iframe.');
    } catch (error) {
        logError('Error while switching to iframe:', error);
        throw new Error('Failed to switch to iframe.');
    }
}

/**
 * Switches back to the main document from an iframe.
 */
async switchToMainFrame() {
    try {
        await browser.switchToParentFrame();
        logInfo('Successfully switched back to the main document.');
    } catch (error) {
        logError('Error while switching back to the main document:', error);
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
        logInfo(`Successfully pressed the key: ${key}`);
    } catch (error) {
        logError(`Error while pressing the key ${key}:`, error);
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
        logInfo(`Text "${text}" found in element.`);
    } catch (error) {
        logError(`Error while waiting for text "${text}" in element:`, error);
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
        logInfo(`URL containing "${partialUrl}" loaded successfully.`);
    } catch (error) {
        logError(`Error while waiting for URL containing "${partialUrl}":`, error);
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
        logInfo(`File "${fileName}" downloaded successfully.`);
    } catch (error) {
        logError(`Error while waiting for file download "${fileName}":`, error);
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
            logInfo(`Created screenshot directory: ${outputDir}`);
        }

        await browser.saveScreenshot(filePath);
        logInfo(`Screenshot saved at ${filePath}`);
    } catch (error) {
        logError(`Error while capturing screenshot:`, error);
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
        logInfo(`${element} Element is visible.`);
    } catch (error) {
        logError('Error while waiting for element to be visible:', error);
        throw new Error(`Failed to wait for element to be visible within ${timeout} ms.`);
    }
}

/**
 * @description Maximizes the browser window or sets a custom size.
 * If width and height are provided, the window will be resized to those dimensions.
 * If no width and height are provided, the window will be maximized.
 * 
 * @param {number} [width] - The width of the browser window (in pixels). Optional.
 * @param {number} [height] - The height of the browser window (in pixels). Optional.
 * 
 * @throws {Error} Throws an error if the browser window cannot be resized or maximized.
 */
async maximizeOrSetWindowSize(width, height) {
    try {
        // If width and height are provided, resize the browser window to the specified dimensions
        if (width && height) {
            await browser.setWindowSize(width, height);  // Set custom window size
            logInfo(`Browser window resized to ${width}x${height}.`);
        } else {
            // If no dimensions are provided, maximize the window
            browser.maximizeWindow();
            logInfo('Browser window maximized.');
        }
    } catch (error) {
        // Log and re-throw the error if resizing or maximizing fails
        logError(`Error resizing or maximizing browser window: ${error}`);
        throw error;
    }
}
/**
 * @description Waits for the browser to load completely before executing further steps.
 * This function waits for the page's readyState to be "complete", indicating that the page has finished loading.
 */
async waitForPageToLoad() {
    try {
       // Wait for the body element to be present (i.e., page loaded)
       await browser.waitUntil(async () => {
            const body = await $('body');  // You can replace this with another element
            return body.isDisplayed();  // Check if the body is displayed, meaning the page loaded
        }, {
            timeout: 10000,  // Wait up to 10 seconds
            timeoutMsg: 'Page did not load within 10 seconds',
            interval: 500  // Check every 500ms
        });
        logInfo('Page has loaded successfully.');
    } catch (error) {
        logError(`Error waiting for page to load: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
}
}