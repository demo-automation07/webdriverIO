import { expect } from '@wdio/globals';
import LoginPage from '../../pageobjects/practiceautomation/login.page.js';
import assertion from '../../helpers/assertion.js';
import {decryptPassword } from '../../utils/encrypt.js';
import constant from '../../data/constant.js';
import testdata from '../../helpers/data.generator.js';

import { getStagingEnv } from '../../utils/envParam.js';
import configData from '../../config/config.json' assert { type: 'json' };

  describe('Login Page Tests', () => {
    const data = configData[getStagingEnv()].practicesite
    const username = data.username;
    const password = data.password;
    const iv = data.iv;
    const invalidPass = testdata.invalidPassword().shortPassword;
    const decryptedPassword = decryptPassword(password, iv);
    
    before(async () => {
        LoginPage.openUrl(data.url);
        LoginPage.maximizeBrowserWindow();
    })   
    
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

