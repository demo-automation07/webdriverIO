import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/automationdemosite/home.page.js';
import RegisterPage from '../../pageobjects/automationdemosite/register.page.js';
import DataGenerator from '../../helpers/data.generator.js';
import EmailGenerator from '../../helpers/email.generator.js';  
import assertion from '../../helpers/assertion.js';

describe('Register a user in automation demo application', () => {

    let firstName, lastName, email, phoneNumber, gender, address, country;

    beforeEach(async () => {
        // Generate random data for each test
        const user = DataGenerator.validUserName(); // Generate random names
        firstName = user.firstName;
        lastName = user.lastName;

        // Generate other required data
        email = EmailGenerator.generateEmail({ username: firstName, domain: 'example.com' })
        //email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
        phoneNumber = DataGenerator.validIndianPhoneNumber(); // Generate a valid phone number
        gender = DataGenerator.validGender(); // Generate a random gender
        address = DataGenerator.validAddress(); // Generate a valid address
        country = 'India'; // You can set this as per your data source, or you can also generate it dynamically if needed
    });

    it('User should click on skip sign-in button on the home page', async () => {     
        assertion.assertPageTitle('Index');   
        // Click the skip sign-in button
        await HomePage.clickSkipSignIn();

        // Optional: Assert that the user is navigated to the registration page
        const currentUrl = await browser.getUrl();
        assertion.assertCurrentUrl("https://demo.automationtesting.in/Register.html")
       // expect(currentUrl).toContain('Register');
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

        // Select hobbies (Choose one or more from an array of valid hobbies)
        await RegisterPage.selectHobbies(['Cricket', 'Movies']);
        
        // Enter address (optional field)
        await RegisterPage.enterAddress(address.fullAddress);
        
        // Select country
        await RegisterPage.selectCountry(country);
        
        // Upload a sample profile picture (if necessary)
        const filePath = 'path/to/sample-image.jpg'; // Update with a real image path
        await RegisterPage.uploadFile(filePath);
    });

    it('User should be able to submit the registration form', async () => {
        // Click the submit button
        await RegisterPage.clickSubmitButton();

        // // Optional: Add assertions to verify that the form was submitted successfully
        // const successMessage = await $('div.alert-success'); // Assuming a success message appears
        // expect(await successMessage.isDisplayed()).toBe(true);

        // Verify that the user is redirected to a success page or another page after submission
        const currentUrl = await browser.getUrl();
        assertion.assertCurrentUrl('https://demo.automationtesting.in/user.html')
    
    });

});