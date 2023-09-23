import { test } from "@playwright/test";
import { assert } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ContactDetailsPage } from "../../main/pages/checkoutPages/ContactDetailsPage";
import { ProductPage } from "../../main/pages/productPages/ProductPage";
import { NavbarPage } from "../../main/pages/navbarPages/NavbarPage";
import { CreditCardPage } from "../../main/pages/checkoutPages/CreditCardPage";
import { CreateDataFromPreviousSteps } from "../../main/utils/CreateDataFromPreviousSteps";

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';


let testHelpers: TestHelpers;
let createDateFromPreviousSteps: CreateDataFromPreviousSteps;

let contactDetailsPage: ContactDetailsPage;
let productPage: ProductPage
let navbarPage: NavbarPage;
let creditCardPage: CreditCardPage;

const emailTestData = parse(fs.readFileSync(path.join(__dirname, "../testData/email.csv")), {
    columns: true,
    skip_empty_lines: true
});

const cardNumberTestData = [
    '1', '1111111111111111'
]

test.beforeEach(async ({ page, isMobile }) => {

    testHelpers = new TestHelpers(page, isMobile);
    createDateFromPreviousSteps = new CreateDataFromPreviousSteps(page);

    productPage = new ProductPage(page, isMobile);
    navbarPage = new NavbarPage(page, isMobile);
    contactDetailsPage = new ContactDetailsPage(page, isMobile);
    creditCardPage = new CreditCardPage(page, isMobile);
    
    await testHelpers.openWebsite(ServiceUrls.EXAMPLE_PRODUCT);
    await createDateFromPreviousSteps.addProductToCartAndProceedToCheckout(productPage, navbarPage);
})

test.describe('Input validations on checkout page', () => {

    for (const record of emailTestData) {
        test(`Email input validation - ${record.email}`, async () => {

            await contactDetailsPage.enterEmail(record.email);
            assert(await contactDetailsPage.isEmailInputErrorVisible(), AssertMessages.WRONG_VALUE_OF_ELEMENT)
        })
    }

    for (const data of cardNumberTestData) {
        test(`Card number validation - ${data}`, async () => {

            await creditCardPage.enterCardNumber(data)
            if (data === '1')
                assert.strictEqual('Card number is the wrong length', await creditCardPage.getCardNumberError(), AssertMessages.WRONG_VALUE_OF_ELEMENT)
            if (data === '1111111111111111')
                assert.strictEqual('Card number is not valid', await creditCardPage.getCardNumberError(), AssertMessages.WRONG_VALUE_OF_ELEMENT)
        })
    }
})