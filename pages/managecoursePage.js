class managecoursePage {
    constructor(page){
        this.page = page;
        this.chooseFile="#thumbnail";
        this.addNewCourseBtn="//button[normalize-space()='Add New Course']";
        this.courseNameInput="#name";
        this.courseDescInput="#description";
        this.instructorNameInput="#instructorNameId";
        this.priceInput="#price";
        this.startDateInput="//input[@name='startDate']";
        this.endDateInput="//input[@name='endDate']";
        this.permanentCheckbox="#isPermanent";
        this.categoryDrpDwn=".menu-btn"
        this.categoryOptions=".menu-item";
        this.saveBtn="button[class='action-btn']";
        this.createdCourseName="//table[contains(@class,'courses-table')]//tbody/tr[1]/td[2]";
        this.deleteCourseBtn="//table[contains(@class,'courses-table')]//tbody/tr[1]//button[contains(@class,'delete-btn')]";

    }

    async addNewCourse(){
        return await this.page.click(this.addNewCourseBtn);
    }

    async uploadImageWithValidation(largeFilePath, validFilePath) {
        let alertAppeared = false;
        
        // Listen for alert only once
        this.page.once('dialog', async (dialog) => {
            alertAppeared = true;
            await dialog.accept();
        });

        // First upload (expected to fail)
        await this.page.locator(this.chooseFile).setInputFiles(largeFilePath);

        // Give UI time to trigger alert
        await this.page.waitForTimeout(1000);

        // If alert appeared, retry with valid file
        if (alertAppeared) {
            await this.page.locator(this.chooseFile).setInputFiles(validFilePath);
        }
    }

    async fillCourseDetails(courseName,courseDesc,instructorName,price,startDate,endDate,selectedCategory) {

        await this.page.fill(this.courseNameInput, courseName);
        await this.page.fill(this.courseDescInput, courseDesc);
        await this.page.fill(this.instructorNameInput, instructorName);
        await this.page.fill(this.priceInput, price);
        await this.page.fill(this.startDateInput, startDate);
        await this.page.fill(this.endDateInput, endDate);
        
       
        await this.page.click(this.categoryDrpDwn);
        
        const categories = await this.page.$$(this.categoryOptions);
        for(const category of categories){
            const desiredCategory = await category.textContent();
            if(desiredCategory.includes(selectedCategory)){
                await category.click();
                break;
            }
        }
        await this.page.click(this.saveBtn);
    }

    async permanentCheckboxUnchecked() { 
        const ischecked = await this.page.locator(this.permanentCheckbox).isChecked();
        return !ischecked;
    }


    async sortCreatedCourse(newCourse){
        const course = await this.page.locator(this.createdCourseName).textContent();
        
        if(course.trim()===newCourse){
            const deleteBtn = this.page.locator(this.deleteCourseBtn);
            await deleteBtn.click();
        }
    }

    async verifyDeletedCourse(deletedCourseName) {
    await this.page.waitForLoadState("networkidle")

    const currentCourseName = await this.page
        .locator(this.createdCourseName)
        .textContent();
        
    return currentCourseName.trim() !== deletedCourseName
}

}

module.exports = { managecoursePage };