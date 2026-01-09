class homePage{
    constructor(page){
        this.page=page;
        this.loginSuccess="//h4[normalize-space()='Welcome Admin Manager to Learn Automation Courses']"
        this.menuButton="//img[@alt='menu']"
        this.signOutButton="//button[normalize-space()='Sign out']"
        this.manageMenu="//span[normalize-space()='Manage']";
        this.manageCourseBtn="//a[normalize-space()='Manage Courses']";
        this.manageCategoryBtn="//a[normalize-space()='Manage Categories']";
    }

    async successMsgToast(){
        await this.page.waitForSelector(this.loginSuccess);
        return await this.page.locator(this.loginSuccess).textContent();
    }

    async signOut(){
        await this.page.click(this.menuButton);
        await this.page.click(this.signOutButton);
    }

    async navigateToCourse(){
        await this.page.click(this.manageMenu);
        await this.page.click(this.manageCourseBtn);
    }   

    async navigateToCategory(){
        await this.page.click(this.manageMenu);
        await this.page.click(this.manageCategoryBtn);
    }   
}

module.exports = { homePage };