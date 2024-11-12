/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

import { browser } from '@wdio/globals'


export default class actionhelper {
     
    /**
     * @description Click the element
     * @param {Webelement} element 
     */
    async clickElement(element) {
        await this.waitForElementToClickable(element);
        await this.highLightElement(element)
        await element.click();
    }

    /**
     * @description Double Click the element
     * @param {Web Element} element 
     */
    async doubleClickElement(element) {
        await this.waitForElementToClickable(element);
        await this.highLightElement(element)
        await element.doubleClick();
    }

    /**
     * @description Set Value to the Element
     * @param {Webelement} element 
     * @param {Data} value 
     */
    async setValueToElement(element, value) {
        await this.waitForElementVisible(element);
        await this.highLightElement(element)
        await element.setValue(value);
    }
    /**
   * @description Set Value to the Element
   * @param {Webelement} element 
   * @param {Data} value 
   */
    async clearValueFromelement(element) {
        await this.waitForElementVisible(element);
        await element.clearValue();

    }

    /**
     * @description Scroll to the Element
     * @param {Webelement} element 
     */
    async scrollToElement(element) {
        await this.waitForExist(element);
        await element.scrollIntoView();

    }
    /**
     * @description Scroll and Click the element
     * @param {Webelement} element 
     * @returns 
     */
    async scrollElementandClick(element) {
        await element.scrollIntoView();
        return await element.click();
    }


    /**
     *@description Scroll to element location center
     * @param {Webelement} element 
     * @returns 
     */
    async scrollElementintoCenter(element) {
        await this.waitForExist(element);
        return await element.scrollIntoView({ block: 'center', inline: 'center' });
    }

    /**
     * @description Wait for element to visible
     * @param Webelement element 
     */
    async waitForElementVisible(element) {
        await browser.waitUntil(() => element.isDisplayed())
    }

    /**
     * @description Wait for element to be in clickable state
     * @param Webelement element 
     */
    async waitForElementToClickable(element) {
        await browser.waitUntil(() => element.isClickable())
    }

    /**
     * @description Wait for Element is Exist in DOM
     * @param {Webelement} element 
     */
    async waitForExist(element) {
        await element.waitForExist({ timeout: 5000 });
    }
    /**
    * @description Wait for Cancel Element loading is completed
    * @param {Webelement} element 
    */
    async waitForExistForCancelLoading(element) {
        await element.waitForExist({ reverse: true, timeout: 10000 });
    }

    /**
     * @description Wait for element to not displayed
     */
    async waitForElementNotToBeDisplayed(element) {
        await element.waitForDisplayed({ reverse: true });
    }

    /**
     * @description Switch To frame
     * @param {Webelement} element 
     * @returns 
     */
    switchToIframe(element) {
        return browser.switchToFrame(element);
    }

    /**
     * @description Switch to the window using tab or title
     * @param {Webelement} titleorUrl 
     * @returns 
     */
    switchBackViaTitleorUrl(titleorUrl) {
        return browser.switchWindow(titleorUrl);
    }

    /**
     * @description Get Title of the current page
     */
    async getTitle() {
        return await browser.getTitle();
    }

    /**
     * @description sClose current browser
     * @returns 
     */
    async closeBrowser() {
        return await browser.closeWindow();
    }

    /**
      * @description High light the current element
      * @param {*} element 
      */
    async highLightElement(element) {
        await browser.execute((arg) => {
            arg.style.border = "2px solid red";
        }, await element);

    }

    /**
      * @description Get text from element
      * @param {*} element 
      */
    async getTextFromElement(element) {
        await this.waitForExist(element);
        return await element.getText();

    }

    /** 
     * @returns value of the element
     */
    async getValueAttribureFromElement(element) {
        await this.waitForExist(element);
        return await element.getAttribute('value')
    }


    /** scroll from broswer to element
     * 
     * @param {any} selector 
     */
    async scroll(selector) {
        browser.execute(function (elSelector) {
            document.querySelector(elSelector).scrollIntoView();
        }, selector)
    }

    /**
     * @description get the presence of element
     * 
     * @param {any} element 
     * @returns return boolean if element is displayed in the page
     */
    async getPresenceOfElement(element) {
        return await element.isExisting();
    }

    /**
     * 
     * @description fetch the 'aria-checked' attribute from the element
     * @param {any} element 
     * @returns text
     */
    async getCheckedattibute(element) {
        return await element.getAttribute('aria-checked');
    }

    /**
     * 
     * @description clear the value with keys
     * @param {any} element 
     */
    async clearValueWithKeys(element) {
        await element.click();
        await browser.keys([Key.Ctrl, 'a']);
        await browser.keys([Key.Backspace]);

    }


    /**
     * 
     * @description update the testdata JSON file
     */
    async updateJSON(fileObjet, filePath) {
        let path = "./test/utils/jsonfiles/" + filePath;
        fs.writeFile(path, JSON.stringify(fileObjet, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }

    /**
    *
    * @description wait for page to load fully
    * 
    */
    async waitForCustomLoading() {
        let condition = true;
        while (condition) {
            var visibility = await this.customLoad.getAttribute("visible");
            if (visibility === "false") {
                condition = false;
            }
        }
        await browser.pause(1000);
        await this.waitForSkeletonLoading();

    };

   
    /**
     * 
     * @description navigate back to previous page
     */
    async navigateBack() {
        await browser.back();
        await this.waitForCustomLoading();
    }

    /*
    * 
    * 
    * @returns value of the element
   * */
    async getIdAttribureFromElement(element) {
        await this.waitForExist(element);
        return await element.getAttribute('id');
    }
    /**
    * @description to get color code from the element
    * @returns the rgb color code for the element
    */
    async getColorFromElement(selector) {
        const result = await browser.execute(function (elSelector) {
            return window.getComputedStyle(elSelector).color;
        }, selector);
        return result;
    }

    /**
    * 
    * @description Wait for the skeleton loading
    */
    async waitForSkeletonLoading() {
        let condition = true;
        while (condition) {
            var visibility = await this.getPresenceOfElement(await this.skeletonLoaderSelector);
            if (visibility === false) {
                condition = false;
            }
        }
        await browser.pause(200);


    };

    /**
     * 
     * @description Wait for the skeleton loading old logic
     */
    async waitForSkeletonLoadingoldlogic() {
        const notLoading = await this.skeletonLoaderSelector.every(async element => {
            return !(await element.isDisplayed())
        })
        console.log(notLoading, "notLoading...............")

        if (!notLoading) {
            await this.waitForSkeletonLoading()
        }
        else {
            await this.addlog("skeleton loading is completed");
            return true
        }

    }

    async uploadfile(element,filePath){
        await element.setValue(filePath);
    }
}
