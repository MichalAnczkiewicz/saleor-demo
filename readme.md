# UI TESTS FOR SALEOR.DEMO.IO

This repository contains a test automation framework built using Playwright and TypeScript. 
The framework is designed for automating web applications, ensuring reliable and efficient testing.

## ToC
1. [Technologies used](#technologies)
2. [Project structure](#test-structure)
3. [Concept of tests](#test-concept)
4. [What more could've been done](#what-more)
5. [Running tests](#running-tests)

<a name="technologies"></a>

# 1. Technologies used: 

* Playwright with Typescript support
* chai for assertions
* Csv-parse for parsing test data

<a name="test-structure"></a>

# 2. Project structure

The project was structured in such way, that src folder splits to two subfolders:
* **src/main** -  Contains all the main logic and page objects required for test automation.
* **src/tests** - Contains test scripts and related data.

<a name="test-concept"></a>

# 3. Concept of tests

All tests are written in an atomic way and are independent of each other. This allows us to run the tests fully in
parallel mode and ensures that the execution time is very short.

Also I've decided to create `BasePage.ts` class which contains playwright methods wrapped to custom methods,
which in my opinion makes the methods which interacts with elements in `Pages` folder looks cleaner. 


#### The tests cover important functions of the application such as: 

* ensuring that products are visible on listing and have correct hrefs to their details page
* ensuring that product data is the same on listing and on details
* ensuring that product is correctly added to cart and have correct data
* example input validations on checkout page
* successful checkout

<a name="what-more"></a>

# 4. What more could've been done

As it's only demo of the tests, here are some ideas of what could've been done if this was real project: 

* of course there should be tests, for example covering the login/register functionality 
(as it was possible to place order without login I've decided to skip that part)
* some reporting and logging tool might be added
* custom assertions
* ensure that tests will run without problems on all browsers and mobile devices
* group tests for suites - regression/smoke/and so on
* create docker image with tests so it can run on container (that would be especially good as there will be no conflicts with node/npm versions)

<a name="running-tests"></a>

# 5. Running tests

Tests can be run both on localhost and remotely on github.

#### Local

Follow these steps to set up and run the tests using this framework:

1. Clone the repository:

   ```shell
   git clone https://github.com/MichalAnczkiewicz/saleor-demo.git
   cd saleor-demo
   ```
2. Install dependencies:

    ```shell 
    npm install
    ```
3. Run tests:

    ```shell
   npx playwright test
   ```
   
#### Remote

The pipeline with tests runs automatically when there is a pull request or push to main branch. After tests finish there will be test report uploaded.
   