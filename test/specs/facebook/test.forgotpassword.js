import landingPage from '../../pageobjects/facebook/landing.page.js';
import emailUtil from '../../utils/emailUtils.js';

describe('validate forgot password',function(){

    it('Go to facebook site and enter email and invalid password', async function() {
        await landingPage.open();
        await landingPage.login('saranyatestemailv@gmail.com', 'your_password');
    });

    it('Click Forgot Password Link', async function() {
        await landingPage.clickForgotPassword();
    });

    it('Click "Try another way" button', async function() {
        await landingPage.clickTryAnotherWay();
        await landingPage.submit();
    });

    it('Fetch OTP from email', async function() {
        const emailData = await emailUtil.getEmailBodyAndSubject(50000);
        console.log('Email Subject:', emailData.subject);
        console.log('Email Body:', emailData.body);
        
        const codeMatch = emailData.body.match(/password reset code:(\d{6})/);
        if (codeMatch) {
            global.resetCode = codeMatch[1];
            console.log('OTP Code:', global.resetCode);
        }
    });

    it('Provide OTP to textbox', async function() {
        const otpField = await $('input[name="n"]');
        const continueButton = await $('button[type="submit"]');
        
        await otpField.setValue(global.resetCode);
        await browser.pause(5000);
        await continueButton.click();
        await browser.pause(10000);
    });

})