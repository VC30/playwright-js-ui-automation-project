# Playwright JavaScript UI Automation Framework

#Project Overview
This project is an end-to-end UI automation framework built using Playwright with JavaScript.
It automates critical user flows on the demo application:
https://freelance-learn-automation.vercel.app/
The framework follows Page Object Model (POM) and industry best practices.

#Tech Stack
- Playwright
- JavaScript
- Node.js
- VS Code
- GitHub

#Framework Design
- Page Object Model (POM)
- Reusable page classes
- Stable locators (XPath & CSS)
- Dialog handling
- Multi-tab handling
- Explicit waits for UI stability

#Test Scenarios Covered
- User login
- User sign up
- Create Courses
- Navigation across modules
- Add category
- Update category
- Delete category
- Verification of table updates
- Handling browser dialogs
- Handling multiple tabs/pages

#How to Run the Tests
- Run all tests in headless mode: npx playwright test
- Run all tests in headed mode: npx playwright test --headed
