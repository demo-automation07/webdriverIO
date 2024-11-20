import { expect } from '@wdio/globals';
import LoginPage from '../../pageobjects/practiceautomation/login.page.js';
import assertion from '../../helpers/assertion.js';
import {decryptPassword } from '../../utils/encrypt.js';
import config from '../../config/config.json';
import constant from '../../data/constant.js';
import testdata from '../../helpers/data.generator.js';



  describe('Login Page Tests', () => {
    const logindata = config.qa.practicesite;
    const username = logindata.username;
    const password = logindata.password;
    const iv = logindata.iv;
    const invalidPass = testdata.invalidPassword().shortPassword;
    const decryptedPassword = decryptPassword(password, iv);
        before(() => {
           
            browser.url('https://practicetestautomation.com/practice-test-login/');
        });
    
        it('should show error message with invalid credentials', async () => {
            // Perform login with invalid credentials
            await LoginPage.login(username, invalidPass);
    
            // Verify that the error message is shown
            const errorMessage = await LoginPage.getErrorMessage();
            await assertion.assertElementText(errorMessage,constant.invalidPasswordMessage);
        });

        it('should successfully log in with valid credentials', async () => {
            // Perform login with valid credentials
            await LoginPage.login(username, decryptedPassword);
    
            // Verify that the user is redirected to the correct page
            await assertion.assertPageTitle(constant.practiceLoginTitle)
          
        });
    
       
});

