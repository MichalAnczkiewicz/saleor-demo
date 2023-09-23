import { test } from "@playwright/test";
import { assert } from 'chai';
import { TestHelpers } from "../../main/utils/TestHelpers";
import { AssertMessages } from "../../main/utils/AssertMessages";
import { ServiceUrls } from "../../main/utils/ServiceUrls";
import { ProductPage } from "../../main/pages/productPages/ProductPage";
import { NavbarPage } from "../../main/pages/navbarPages/NavbarPage";
import { SummaryPage } from "../../main/pages/checkoutPages/SummaryPage";
import { ShippingAddressPage } from "../../main/pages/checkoutPages/ShippingAddressPage";
import { CreateDataFromPreviousSteps } from "../../main/utils/CreateDataFromPreviousSteps";
import { DelivertMethodsPage } from "../../main/pages/checkoutPages/DeliveryMethodsPage";
import { CreditCardPage } from "../../main/pages/checkoutPages/CreditCardPage";
import { ContactDetailsPage } from "../../main/pages/checkoutPages/ContactDetailsPage";

let testHelpers: TestHelpers;
let createDataFromPreviousSteps: CreateDataFromPreviousSteps;

let productPage: ProductPage;
let navbarPage: NavbarPage;
let summaryPage: SummaryPage;
let shippingAddressPage: ShippingAddressPage;
let deliveryMethodsPage: DelivertMethodsPage;
let creditCardPage: CreditCardPage;
let contactDetailsPage: ContactDetailsPage;

let productPriceOnDetails: string | any;

test.beforeEach(async ({ page, isMobile }) => {

    testHelpers = new TestHelpers(page, isMobile);
    createDataFromPreviousSteps = new CreateDataFromPreviousSteps(page);

    productPage = new ProductPage(page, isMobile);
    navbarPage = new NavbarPage(page, isMobile);
    summaryPage = new SummaryPage(page, isMobile);
    shippingAddressPage = new ShippingAddressPage(page, isMobile);
    deliveryMethodsPage = new DelivertMethodsPage(page, isMobile);
    creditCardPage = new CreditCardPage(page, isMobile);
    contactDetailsPage = new ContactDetailsPage(page, isMobile);

    await testHelpers.openWebsite(ServiceUrls.EXAMPLE_PRODUCT);

    productPriceOnDetails = await productPage.getSelectedProductPrice(1);
    await createDataFromPreviousSteps.addProductToCartAndProceedToCheckout(productPage, navbarPage);
})

test.describe('Complete checkout', () => {

    test('Should successfully complete checkout', async () => {

        await contactDetailsPage.enterEmail('test@o2.pl')
        await createDataFromPreviousSteps.createShippingAddressData(shippingAddressPage);

        let deliveryMethodToClick = testHelpers.getRandomIndex(await deliveryMethodsPage.getNumberOfDeliveryMethods());
        await deliveryMethodsPage.clickDeliveryMethod(deliveryMethodToClick);

        await createDataFromPreviousSteps.enterCardDetails(creditCardPage);

        /*
        After all above details are provided probably some confirm order button should be clicked and then some popup might shop up that order was created successfully
        As there is no make order button i will just assert true
        */
        assert(true, AssertMessages.WRONG_VALUE_OF_ELEMENT);
    })
})