# REST API Automation Testing with Playwright

This project demonstrates automated REST API testing using the Playwright framework.
It includes positive and negative test scenarios for multiple API resources.

## Tested API
Fake Store API  
https://fakestoreapi.com

## Test Coverage
- Products API
  - GET products
  - GET product by ID
  - POST product
  - PUT product
  - DELETE product
- Authentication API
  - POST /auth/login (valid and invalid credentials)
- Users API
  - GET users
  - GET user by ID
  - POST user (single and multiple users)
  - Negative scenarios

## Technologies Used
- Playwright
- JavaScript (Node.js)
- REST API

## Project Structure
```
playwright-rest-api-testing/
│
├── e2e/
│ ├── products.spec.js
│ ├── auth.spec.js
│ └── users.spec.js
│
├── data/
│ ├── productData.json
│ ├── authData.json
│ └── userData.json
│
├── utils/
│ └── apiClient.js
│
├── playwright.config.js
├── package.json
├── README.md
└── .gitignore
```


## How to Run the Tests
```bash
npm install
npx playwright test
```

# Test Report
Playwright HTML report is generated after test execution and can be viewed with:
```bash
npx playwright show-report
```
Or view the latest test report online:
https://mihajlovb.github.io/REST-API-Automation-Testing-with-Playwright/

The report is automatically updated after each successful GitHub Actions run.

## CI
Automated API tests are executed using GitHub Actions on every push to the master branch.

# Notes
The tested API is a mock/demo API. Some endpoints return non-standard HTTP status codes.
Test assertions were adapted accordingly.
