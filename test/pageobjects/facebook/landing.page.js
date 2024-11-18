import { $ } from '@wdio/globals' 

class LandingPage {

    get emailField() {
        return $('input#email');
    }

    get passwordField() {
        return $('input#pass');
    }

    get loginButton() {
        return $('button[name="login"]');
    }

    get forgotPasswordLink() {
        return $('//a[text()="Forgotten password?"]');
    }

    get tryAnotherWayButton() {
        return $('//a[text()="Try another way"]');
    }

    get continueButton() {
        return $('button[type="submit"]');
    }

    async open() {
        await browser.url('https://www.facebook.com/');
        await browser.pause(3000);
    }

    async login(email, password) {
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
        await browser.pause(5000);
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
        await browser.pause(5000);
    }

    async clickTryAnotherWay() {
        await this.tryAnotherWayButton.click();
        await browser.pause(5000);
    }

    async submit() {
        await this.continueButton.click();
        await browser.pause(10000);
    }
}

export default new LandingPage();