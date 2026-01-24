import { test, expect } from '@playwright/test';
import { landingPage } from '../pages/landingPage';
import { loginPage } from '../pages/loginPage';
import { homePage } from '../pages/homePage';
import { signupPage } from '../pages/signupPage';
import {managecoursePage} from '../pages/managecoursePage';
import { manageCategoryPage } from '../pages/manageCategoryPage';
import { adminUser } from "../test-data/userData"
import { messages } from "../test-data/messages"  
import { testFilePaths } from '../test-data/filePaths';
import { generateCourseName, generateCategoryName, 
        generateEmail, generateUpdatedCategoryName } from '../utils/dataGenerator';

test.beforeEach(async ({ page }) => {
    //LANDING PAGE
    const lp = new landingPage(page);
    await lp.launchWebsite();
})

test('Landing Page Test', async ({ page }) => {
    //LANDING PAGE
    const lp = new landingPage(page);
    const title = await lp.checkTitle();
    expect(title).toBe(messages.pageTitle);
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
    await lip.signIn(adminUser.email,adminUser.password);

    //HOME PAGE
    const hp = new homePage(page);
    const successMsg = await hp.successMsgToast();
    expect(successMsg).toBe(messages.welcomeAdmin);
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
    const email = generateEmail();
    //let email = `test${Math.floor(Math.random()*10000)}@email.com`;
    await sup.signUp("Test User",email,"test@123","Playwright",
                    "Assam",["Playing","Singing","Reading"]);

    //BACK TO LOGIN PAGE
    const signUpMsg = await lip.signUpSuccessMessage();
    //expect(signUpMsg).toBe("Signup successfully, Please login!");
    expect(signUpMsg).toBe(messages.signupSuccess);

    await page.waitForTimeout(5000);

})

test('Create Course Test', async ({ page }) => {
   
    //LANDING PAGE
    const lp = new landingPage(page);
    await lp.clickMenu();
    await lp.clickLogin();

    //LOGIN PAGE
    const lip = new loginPage(page);
    await lip.signIn(adminUser.email,adminUser.password);
    
    //HOME PAGE
    const hp = new homePage(page);
    await hp.navigateToCourse();

    //MANAGE COURSE PAGE
    const mcp = new managecoursePage(page);
    await mcp.addNewCourse();
    await mcp.uploadImageWithValidation(testFilePaths.inValidImage,testFilePaths.validImage);

    const checkbox = await mcp.permanentCheckboxUnchecked();
    expect(checkbox).toBeTruthy();

    let courseName = generateCourseName();
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
    await lip.signIn(adminUser.email,adminUser.password);

    const hp = new homePage(page)

    const newTab = await Promise.all([
        context.waitForEvent("page"),
        hp.navigateToCategory()
    ]).then(result => result[0])

    const mcatp = new manageCategoryPage(newTab)

    let categoryName = generateCategoryName();

    await mcatp.addNewCategory(categoryName)
    expect(await mcatp.isNewCategoryAdded(categoryName)).toBeTruthy()
    
    let updateCatName = generateUpdatedCategoryName();
    await mcatp.updateNewCategory(updateCatName)

    const updatedNameInTable = await mcatp.isCategoryUpdated(updateCatName)
    expect(updatedNameInTable).toBeTruthy()

    await mcatp.deleteAddedCategory()
    //console.log("updateCatName is:" +updateCatName);
    expect(await mcatp.isCategoryDeleted(updateCatName)).toBeTruthy()

})