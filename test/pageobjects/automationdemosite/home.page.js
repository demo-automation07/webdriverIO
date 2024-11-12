import { $ } from '@wdio/globals'
import actionhelper from '../../helpers/action.helper.js'
import LoggerHelper from '../../helpers/logger.helper.js'
const log = new LoggerHelper();
/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends actionhelper {
    /**
     * @description define selectors using getter methods for home page elements
     */
    get btnSignIn () {
        return $('#btn1');
    }

    get btnSkipSignIn () {
        return $('#btn2');
    }

    get inputEmail () {
        return $('#email');
    }

    /**
     * @description click on the skip sign in button in home page
     */
    async clickSkipSignIn () {
        log.logInfo('click on the sign in button','home')   
        await this.clickElement(this.btnSkipSignIn);
    }

    
}

export default new HomePage();