class manageCategoryPage {
    constructor(page){
        this.page = page;
        this.addNewCategoryBtn="div[class='manage-btns'] button"
        this.newCatUpdateBtn="//tbody/tr[last()] /td[3]/button"
        this.newCatName="//tbody/tr[last()] /td[1]"
        this.newCatDeleteBtn="//tbody/tr[last()] /td[2]/button"
        this.confirmDeleteBtn="//button[@class='action-btn'][normalize-space()='Delete']"
        
    }

    async addNewCategory(categoryName) {
        this.page.once('dialog', async dialog => {
                await dialog.accept(categoryName);
            });
        await this.page.click(this.addNewCategoryBtn);
    }

    async isNewCategoryAdded(addedCategoryName) {
        
        await this.page.waitForTimeout(2000); // allow slow UI update
        const catNameText = await this.page.locator(this.newCatName).textContent();
        return addedCategoryName === catNameText.trim();
    }

    async updateNewCategory(updatedCategoryName) {
        this.page.once('dialog', async dialog => {
                await dialog.accept(updatedCategoryName);
            });
        await this.page.click(this.newCatUpdateBtn);
    }

    async isCategoryUpdated(updatedCategoryName) {
        
        await this.page.waitForTimeout(5000) // allow slow UI update
        const lastRowtText = await this.page.locator(this.newCatName).textContent()
        return lastRowtText.trim() === updatedCategoryName
    }

    async deleteAddedCategory(){
        await this.page.click(this.newCatDeleteBtn);
        await this.page.click(this.confirmDeleteBtn);
    }

    async isCategoryDeleted(updatedCategoryName){

        await this.page.waitForTimeout(5000) // allow slow UI update
        const catNameText = await this.page.locator(this.newCatName).textContent();
        return updatedCategoryName !== catNameText.trim();
    }
    
}

module.exports = { manageCategoryPage };