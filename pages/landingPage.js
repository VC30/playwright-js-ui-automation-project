class landingPage{
    constructor(page){
        this.page=page;
        this.courseList="//div[@class='home-container']/div"
        this.icons="div[class='footer-inside-div'] div[class='social-btns']"
        this.menuButton="//img[@alt='menu']"
        this.loginButton="//button[normalize-space()='Log in']"
    }

    async launchWebsite(){
        await this.page.goto("https://freelance-learn-automation.vercel.app/")
    }

    async checkTitle(){
        return await this.page.title();
    }

    async countCourses(){
         return await this.page.locator(this.courseList).count();
    }

    async iconsVisibility(){
         return await this.page.locator(this.icons).isVisible();
    }

    async clickMenu(){
        await this.page.click(this.menuButton);
    }
    
    async clickLogin(){
        await this.page.click(this.loginButton);
    }

}
module.exports = { landingPage };
