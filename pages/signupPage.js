class signupPage{
    constructor(page){
        this.page=page;
        this.name="#name"
        this.email="#email"
        this.password="#password"
        this.interestCheckboxes=".interest"
        this.genderRadioBtn="#gender2"
        this.stateDrpDwn="#state"
        this.hobbiesList="//*[@id='hobbies']//option"
        this.signUpButton=".submit-btn"
    }

    async signUp(name, email, password, interest, state, hobbies=[])
    {
        await this.page.fill(this.name, name);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        
        const interestLists = await this.page.$$(this.interestCheckboxes);
        for(const interestList of interestLists){
            const interestValue = await interestList.textContent();
            if(interestValue.includes(interest)){
                await interestList.click();
                break;
            }
        }

        await this.page.check(this.genderRadioBtn);
        await this.page.selectOption(this.stateDrpDwn, {label: state});

        const hobbiesOptions = await this.page.$$(this.hobbiesList);
        const hobbiesToSelect = hobbies.map(h => h.toLowerCase());

        

        for(const hobbiesOption of hobbiesOptions){
            const hobbiesText = (await hobbiesOption.textContent()).toLowerCase();
            if(hobbiesToSelect.includes(hobbiesText)){
                // Hold Shift before selecting multiple hobbies
                await this.page.keyboard.down('Meta');
                // Click on the hobby option
                await hobbiesOption.click();
                // Release Shift after selection
                await this.page.keyboard.up('Meta');

            }
        }
        

        await this.page.waitForTimeout(3000);
        await this.page.click(this.signUpButton);
    }

}

module.exports = { signupPage };