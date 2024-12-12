import HomePage from '../../pageobjects/automationdemosite/home.page.js';
import RegisterPage from '../../pageobjects/automationdemosite/register.page.js';
import DataGenerator from '../../helpers/data.generator.js';
import EmailGenerator from '../../helpers/email.generator.js';
import assertion from '../../helpers/assertion.js';
import path from 'path';
const filePath = path.resolve('./test/data/uploadfile/sample-pdf-file.pdf');
import constant from '../../data/constant.js';
import datafeed from '../../data/data.feed.json' with { type: 'json' };
import { getStagingEnv } from '../../utils/envParam.js';
import configData from '../../../config/config.json' assert { type: 'json' };


describe('Register a user in automation demo application with fileupload', () => {
    before(async () => {
        HomePage.openUrl(configData[getStagingEnv()].demosite.url);
        HomePage.maximizeBrowserWindow();
    });



    const user = DataGenerator.validUserName(); // Generate random names
    const firstName = user.firstName;
    const lastName = user.lastName;
    const skills = DataGenerator.validValue(datafeed.skills);
    // Generate other required data
    const email = EmailGenerator.generateEmail({ username: firstName, domain: constant.emailDomain });
    //email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phoneNumber = DataGenerator.validIndianPhoneNumber(); // Generate a valid phone number
    const gender = DataGenerator.validGender(); // Generate a random gender
    //const address = DataGenerator.validAddress(); // Generate a valid address
    const country = DataGenerator.validCountry(); // You can set this as per your data source, or you can also generate it dynamically if needed
    const languageToSelect = DataGenerator.validValue(datafeed.languages);
    const hobbies = DataGenerator.validArray(datafeed.hobbies);

    it('User should click on skip sign-in button on the home page', async () => {
        await assertion.assertPageTitle(constant.demoHometitle);
        // Click the skip sign-in button
        await HomePage.clickSkipSignIn();
        await assertion.assertCurrentUrl(constant.demoRegisterUrl);

    });

    it('Enter the optional and mandatory values in the register form', async () => {
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

        // Select hobbies (Choose one or more from an array of valid hobbies)
        await RegisterPage.selectHobbies(hobbies);


        await RegisterPage.selectLanguage(languageToSelect);

        // Select country

        await RegisterPage.selectSkills(skills);
        await RegisterPage.selectCountry(country);


    });

    it('User should able to upload pdf file', async () => {

        // Upload a sample profile picture (if necessary)
        // Update with a real image path
        await RegisterPage.uploadFile(filePath);
    });

    it('User should be able to submit the registration form', async () => {
        // Click the submit button
        await RegisterPage.clickSubmitButton();

        await assertion.assertCurrentUrlContains(constant.demoUrl);

    });

});