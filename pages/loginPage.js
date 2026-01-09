class loginPage{
    constructor(page){
        this.page=page;
        this.emailInput="#email1"
        this.passwordInput="#password1"
        this.signInButton=".submit-btn"
        this.signInText="//h2[normalize-space()='Sign In']"
        this.signUpLink="//a[normalize-space()='New user? Signup']"
        this.signUpSuccessMsg="//div[contains(text(),'Signup successfully, Please login!')]"
    }

    async signIn(email, password){
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.signInButton);
    }

    async isSignInVisible(){
        await this.page.waitForSelector(this.signInText);
        return await this.page.locator(this.signInText).isVisible();
    }

    async isSignUpClickable(){
        return await this.page.locator(this.signUpLink).isClickable();
    }

    async clickSignUp(){
        await this.page.click(this.signUpLink);
    }

    async signUpSuccessMessage(){
        await this.page.waitForSelector(this.signUpSuccessMsg);
        return await this.page.locator(this.signUpSuccessMsg).textContent();
    }

}

module.exports = { loginPage };