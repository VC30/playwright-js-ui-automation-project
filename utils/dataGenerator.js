export function generateRandomNumber() {
    return Math.floor(Math.random() * 10000)
}

export function generateCourseName(prefix = "Playwright with JS") {
    return `${prefix}${generateRandomNumber()}`
}

export function generateCategoryName(prefix = "Playwright") {
    return `${prefix}${generateRandomNumber()}`
}

export function generateEmail() {
    return `test${generateRandomNumber()}@email.com`
}

export function generateUpdatedCategoryName(){
    return `${generateCategoryName()}${generateRandomNumber()}`
}
