import { test, expect } from '@playwright/test';
import { landingPage } from '../pages/landingPage';
import { loginPage } from '../pages/loginPage';
import { homePage } from '../pages/homePage';
import { signupPage } from '../pages/signUpPage';
import {managecoursePage} from '../pages/managecoursePage';
import { manageCategoryPage } from '../pages/manageCategoryPage';  

test.beforeEach(async ({ page }) => {
    //LANDING PAGE
    const lp = new landingPage(page);
    await lp.launchWebsite();
})

test.only('Landing Page Test', async ({ page }) => {
    //LANDING PAGE
    const lp = new landingPage(page);
    const title = await lp.checkTitle();
    expect(title).toBe("Learn Automation Courses");
    const count = await lp.countCourses();
    expect(count).not.toBe(0);
    const iconVisibility = await lp.iconsVisibility();
    expect(iconVisibility).toBeTruthy();
})

test('Login and Out Test', async ({ page }) => {
    //LANDING PAGE
    const lp = new landingPage(page);
    await lp.clickMenu();
    await lp.clickLogin();
    expect(page.url()).toContain('/login');

    //LOGIN PAGE
    const lip = new loginPage(page);
    await lip.signIn("admin@email.com","admin@123");

    //HOME PAGE
    const hp = new homePage(page);
    const successMsg = await hp.successMsgToast();
    expect(successMsg).toBe("Welcome Admin Manager to Learn Automation Courses");
    await hp.signOut();
    const signInTextVisible = await lip.isSignInVisible();
    expect(signInTextVisible).toBeTruthy();

})

test('Sign up link and Signup Test',async ({ page }) => {
     //LANDING PAGE
    const lp = new landingPage(page);
    await lp.clickMenu();
    await lp.clickLogin();

    //LOGIN PAGE
    const lip = new loginPage(page);
    await lip.clickSignUp();

    //SIGNUP PAGE
    const sup = new signupPage(page);
    let email = `test${Math.floor(Math.random()*10000)}@email.com`;
    await sup.signUp("Test User",email,"test@123","Playwright",
                    "Assam",["Playing","Singing","Reading"]);


    //BACK TO LOGIN PAGE
    const signUpMsg = await lip.signUpSuccessMessage();
    expect(signUpMsg).toBe("Signup successfully, Please login!");

    await page.waitForTimeout(5000);

})

test('Create Course Test', async ({ page }) => {
   
    //LANDING PAGE
    const lp = new landingPage(page);
    await lp.clickMenu();
    await lp.clickLogin();

    //LOGIN PAGE
    const lip = new loginPage(page);
    await lip.signIn("admin@email.com","admin@123");

    //HOME PAGE
    const hp = new homePage(page);
    await hp.navigateToCourse();

    //MANAGE COURSE PAGE
    const mcp = new managecoursePage(page);
    await mcp.addNewCourse();
    await mcp.uploadImageWithValidation("tests/Testfiles/5mbfile.jpg","tests/Testfiles/download.png");
    const checkbox = await mcp.permanentCheckboxUnchecked();
    expect(checkbox).toBeTruthy();
    let number = `${Math.floor(Math.random()*10000)}`;
    let courseName = "Playwright with JS"+number;
    await mcp.fillCourseDetails(courseName,"Learn Playwright from scratch",
                            "Admin Manager","10000","03-07-2026","05-12-2026","Java");
                            
    await page.waitForTimeout(2000);

    await mcp.sortCreatedCourse(courseName);

    const isTrue = await mcp.verifyDeletedCourse(courseName);
    expect(isTrue).toBeTruthy();

    await page.waitForTimeout(2000);

    await hp.signOut();
    const signInTextVisible = await lip.isSignInVisible();
    expect(signInTextVisible).toBeTruthy();

})

test("Create, Update and Delete Category", async ({ page, context }) => {
    const lp = new landingPage(page)
    await lp.clickMenu()
    await lp.clickLogin()

    const lip = new loginPage(page)
    await lip.signIn("admin@email.com", "admin@123")

    const hp = new homePage(page)

    const newTab = await Promise.all([
        context.waitForEvent("page"),
        hp.navigateToCategory()
    ]).then(result => result[0])

    const mcatp = new manageCategoryPage(newTab)

    let number = `${Math.floor(Math.random() * 10000)}`
    let categoryName = "Playwright" + number

    await mcatp.addNewCategory(categoryName)
    expect(await mcatp.isNewCategoryAdded(categoryName)).toBeTruthy()
    
    let updateCatName = categoryName + number
    await mcatp.updateNewCategory(updateCatName)

    const updatedNameInTable = await mcatp.isCategoryUpdated(updateCatName)
    expect(updatedNameInTable).toBeTruthy()

    await mcatp.deleteAddedCategory()
    console.log("updateCatName is:" +updateCatName);
    expect(await mcatp.isCategoryDeleted(updateCatName)).toBeTruthy()

})









