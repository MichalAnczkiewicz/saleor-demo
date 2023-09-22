import { test } from "@playwright/test";
import { assert } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ProductPage } from "../../main/pages/productPages/ProductPage";
import { NavbarPage } from "../../main/pages/navbarPages/NavbarPage";
import { SummaryPage } from "../../main/pages/checkoutPages/SummaryPage";

let testHelpers: TestHelpers;
let productPage: ProductPage;
let navbarPage: NavbarPage;
let summaryPage: SummaryPage;

let productPriceOnDetails;

test.beforeEach(async ({ page, isMobile }) => {

    testHelpers = new TestHelpers(page, isMobile);
    productPage = new ProductPage(page, isMobile);
    navbarPage = new NavbarPage(page, isMobile);
    summaryPage = new SummaryPage(page, isMobile);
    
    await testHelpers.openWebsite(ServiceUrls.EXAMPLE_PRODUCT);

    productPriceOnDetails = await productPage.getSelectedProductPrice(1);
    await productPage.selectProductVersion(1);
    await productPage.clickAddToCartButton();
    await navbarPage.clickCartIcon();
})

test.describe('Product summary', () =>{

    test('Product quantity and price should be the same as choosen on product card', async () => {
        
        const productPriceOnSummary = await summaryPage.getProductPrice();
        const productQuantityOnSummary = await summaryPage.getProductQuantity();

        assert.strictEqual(productPriceOnDetails, productPriceOnSummary, AssertMessages.WRONG_VALUE_OF_ELEMENT);
        assert.strictEqual("1", productQuantityOnSummary, AssertMessages.WRONG_VALUE_OF_ELEMENT);
    })
})