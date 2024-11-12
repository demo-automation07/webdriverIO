import { $ } from '@wdio/globals'
import actionhelper from '../../helpers/action.helper.js'
import LoggerHelper from '../../helpers/logger.helper.js'

const log = new LoggerHelper();
/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends actionhelper {
    /**
     * define selectors using getter methods
     */
    get inputFirstName () {
        return $('//input[@placeholder="First Name"]');
    }

    get inputLastName () {
        return $('//input[@placeholder="Last Name"]');
    }

    get inputAddress () {
        return $('div textarea[ng-model=Adress]');
    }

    get inputEmail () {
        return $('//input[@type="email"]');
    }

    get inputPhone () {
        return $('//input[@type="tel"]');
    }

    get radioBtnGenderMale () {
        return $('//input[@value="Male"]');
    }

    get radioBtnGenderFemale () {
        return $('//input[@value="FeMale"]');
    }

    get hobbiesCheckBoxGroup(){
        return $('//div[@class="form-group"]/label[text()="Hobbies"]')
    }

    get dropdownCountry(){
        return $('#countries')
    }

    get btnSubmit(){
        return $('#submitbtn')
    }
    
    get btnRefresh(){
        return $('#Button1')
    }

    get btnChoseFile(){
        return $('#imagesrc')
    }

    /**
     * @description enter the name in the firstname text box
     * @param firstname
     */
    async enterFirstName (firstname) {
        log.logInfo('enter firts name','regiter')
        await this.setValueToElement(this.inputFirstName,firstname)
    }

    /**
     * @description enter the name in the lastname text box
     * @param lastname
     */
    async enterLastName (lastname) {
        await this.setValueToElement(this.LastNameName,lastname)
    }

     /**
     * @description click on the submit button
     */
    async clickSubmitButton(){
        log.logInfo('click submit button','regiter')
        await this.clickElement(this.btnSubmit)
    }

    
}

export default new RegisterPage();