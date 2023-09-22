import { test } from "@playwright/test";
import { assert, expect } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ContactDetailsPage } from "../../main/pages/checkoutPages/ContactDetailsPage";
import { ProductPage } from "../../main/pages/productPages/ProductPage";
import { NavbarPage } from "../../main/pages/navbarPages/NavbarPage";
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

let testHelpers: TestHelpers;
let contactDetailsPage: ContactDetailsPage;
let productPage: ProductPage
let navbarPage: NavbarPage;

const testData = parse(fs.readFileSync(path.join(__dirname, "../testData/email.csv")), {
    columns: true,
    skip_empty_lines: true
});

test.beforeEach(async ({ page, isMobile }) => {

    testHelpers = new TestHelpers(page, isMobile);
    await testHelpers.openWebsite(ServiceUrls.EXAMPLE_PRODUCT);

    productPage = new ProductPage(page, isMobile);
    navbarPage = new NavbarPage(page, isMobile);
    contactDetailsPage = new ContactDetailsPage(page, isMobile);

    await productPage.selectProductVersion(1);
    await productPage.clickAddToCartButton();
    await navbarPage.clickCartIcon();
})

test.describe('Input validations on checkout page', () => {

    for (const record of testData) {
        test(`Email input validation - ${record.email}`, async () => {

            await contactDetailsPage.enterEmail(record.email);
            assert(await contactDetailsPage.isEmailInputErrorVisible(), AssertMessages.WRONG_VALUE_OF_ELEMENT)
        })
    }
})