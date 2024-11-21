import { browser, expect } from '@wdio/globals';
import HomePage from '../../pageobjects/automationdemosite/home.page.js';
import RegisterPage from '../../pageobjects/automationdemosite/register.page.js';
import DataGenerator from '../../helpers/data.generator.js';
import EmailGenerator from '../../helpers/email.generator.js';  
import assertion from '../../helpers/assertion.js';
import constant from '../../data/constant.js';
import { getStagingEnv } from '../../utils/envParam.js';
import configData from '../../config/config.json' assert { type: 'json' };

describe('Register a user in automation demo application', () => {

    let firstName, lastName, email, phoneNumber, gender, language;
   
   
        // Generate random data for each test
        const user = DataGenerator.validUserName(); // Generate random names
        firstName = user.firstName;
        lastName = user.lastName;
       
        // Generate other required data
        email = EmailGenerator.generateEmail({ username: firstName, domain: constant.emailDomain })
        //email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
        phoneNumber = DataGenerator.validIndianPhoneNumber(); // Generate a valid phone number
        gender = DataGenerator.validGender(); // Generate a random gender
        language = DataGenerator.validLanguage(); // You can set this as per your data source, or you can also generate it dynamically if needed
        before(async () => {
            HomePage.openUrl(configData[getStagingEnv()].demosite.url);
            HomePage.maximizeBrowserWindow();
        })    
    

    it('User should click on skip sign-in button on the home page', async () => {     
        await assertion.assertPageTitle(constant.demoHometitle);   
      
        await HomePage.clickSkipSignIn();

       
        await assertion.assertCurrentUrl(constant.demoRegisterUrl)
       
    });

    it('Enter the mandatory values in the register form', async () => {
       // Enter the mandatory details in the registration form
        await RegisterPage.enterFirstName(firstName);
        await RegisterPage.enterLastName(lastName);
        await RegisterPage.enterEmail(email);
        await RegisterPage.enterPhoneNumber(phoneNumber);
        
        // Optionally select gender
        if (gender === 'Male') {
            await RegisterPage.selectGenderMale();
        } else {
            await RegisterPage.selectGenderFemale();
        }

      
        await RegisterPage.selectLanguage(language);     
        
    });


    it('User should be able to submit the registration form', async () => {
        // Click the submit button
        await RegisterPage.clickSubmitButton();

        await assertion.assertCurrentUrl(constant.demoLoginUrl)
    
    });

});