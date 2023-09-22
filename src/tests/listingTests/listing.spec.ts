import { test } from "@playwright/test";
import { ProductListPage } from "../../main/pages/listingPages/ProductListPage";
import { assert } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ProductPage } from "../../main/pages/productPages/ProductPage";

let testHelpers: TestHelpers;
let productListPage : ProductListPage;
let productPage : ProductPage;

test.beforeEach(async ({page, isMobile}) => {

    productListPage = new ProductListPage(page, isMobile);
    productPage = new ProductPage(page, isMobile);
    testHelpers = new TestHelpers(page, isMobile);
    await testHelpers.openWebsite(ServiceUrls.MAIN_PAGE);
})

test.describe('Listing - products', () => {

    test('Listing should contain products', async() => {
        
        assert(await productListPage.getNumberOfProductItems() > 0, AssertMessages.WRONG_NUMBER_OF_ELEMENTS)
    })

    test('Products should contain href attributes', async() => {

        for(let i = 0; i < await productListPage.getNumberOfProductItems(); i++) {

            assert.notEqual(await productListPage.getHrefAttributeFromProduct(i), '', AssertMessages.WRONG_VALUE_OF_ATTRIBUTE)
          }
    })

    test('Product name on listing and details page should be the same', async () => {

        let randomIndex = testHelpers.getRandomIndex(await productListPage.getNumberOfProductItems());

        let listingProductName = await productListPage.getSpecificProductName(randomIndex);
        productListPage.clickRandomProduct(randomIndex);
    
        let detailsProductName = await productPage.getProductName();

        assert.strictEqual(listingProductName, detailsProductName, AssertMessages.WRONG_VALUE_OF_ELEMENT);
    })
})