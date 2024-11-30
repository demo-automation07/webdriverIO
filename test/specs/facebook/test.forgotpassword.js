import landingPage from '../../pageobjects/facebook/landing.page.js';
import forgotpassword from '../../pageobjects/facebook/forgotpassword.page.js';
import emailUtil from '../../utils/emailUtils.js';
import assertion from '../../helpers/assertion.js';

import { logInfo } from '../../helpers/logger.helper.js';
import { getStagingEnv } from '../../utils/envParam.js';
import configData from '../../../config/config.json' with { type: 'json' };

describe("validate forgot password", function () {
    const data = configData[getStagingEnv()].facebooksite;

    before('before starting teststeps', async () => {
        landingPage.openUrl(data.url);
        landingPage.maximizeBrowserWindow();
    });

    it('Go to facebook site and enter email and invalid password', async function () {
        await landingPage.login(data.username, data.password);
    });

    it('Click Forgot Password Link', async function () {
        await landingPage.clickForgotPassword();
    });

    it('Click "Try another way" button', async function () {
        await landingPage.clickTryAnotherWay();

    });

    it('continue and send otp', async function () {
        await landingPage.submit();
    });

    it('Fetch OTP from email', async function () {
        const emailData = await emailUtil.getEmailBodyAndSubject(60000);
        logInfo('Email Subject:', emailData.subject);
        logInfo('Email Body:', emailData.body);

        const codeMatch = emailData.body.match(/enter this code in Facebook:(\d{6})/);
        const resetCodeRegex = /^\d{6}$/;
        if (codeMatch) {
            global.resetCode = codeMatch[1];
            assertion.assertValueMatchesRegex(global.resetCode, resetCodeRegex);
            logInfo('OTP Code:', global.resetCode);
        }
    });

    it('Provide OTP to textbox', async function () {
        await forgotpassword.enterOtp(global.resetCode);
        await forgotpassword.clickContinue();
    });

});