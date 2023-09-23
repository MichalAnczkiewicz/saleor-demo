import { test } from "@playwright/test";
import { assert } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ProductPage } from "../../main/pages/productPages/ProductPage";
import { NavbarPage } from "../../main/pages/navbarPages/NavbarPage";

let testHelpers: TestHelpers;
let productPage: ProductPage;
let navbarPage: NavbarPage;

test.beforeEach(async ({ page, isMobile }) => {

    productPage = new ProductPage(page, isMobile);
    navbarPage = new NavbarPage(page, isMobile);
    testHelpers = new TestHelpers(page, isMobile);
    await testHelpers.openWebsite(ServiceUrls.EXAMPLE_PRODUCT);
})

test.describe('Products', () => {

    test('Button should be disabled if no version selected', async () => {

        assert(
            await productPage.getAddToCartButtonState('disabled'),
            AssertMessages.WRONG_ELEMENT_STATE)
    })

    test('Button should enabled if selected version', async () => {

        await productPage.selectProductVersion(1);
        assert(
            await productPage.getAddToCartButtonState('enabled'),
            AssertMessages.WRONG_ELEMENT_STATE)
    })

    test('Adding product to cart should update cart counter', async () => {

        await productPage.selectProductVersion(1);
        await productPage.clickAddToCartButton();

        assert.strictEqual(
            "1",
            await navbarPage.getCartCounter(),
            AssertMessages.WRONG_VALUE_OF_ELEMENT)
    })
})