import { ProductPage } from "../pages/productPages/ProductPage";
import { NavbarPage } from "../pages/navbarPages/NavbarPage";
import { ShippingAddressPage } from "../pages/checkoutPages/ShippingAddressPage";
import { CreditCardPage } from "../pages/checkoutPages/CreditCardPage";

export class CreateDataFromPreviousSteps {

    async addProductToCartAndProceedToCheckout(productPage: ProductPage, navbarPage: NavbarPage) {

        await productPage.selectProductVersion(1);
        await productPage.clickAddToCartButton();
        await navbarPage.clickCartIcon();
    }

    async createShippingAddressData(shippingAddressPage: ShippingAddressPage) {

        await shippingAddressPage.enterFirstName('TestName');
        await shippingAddressPage.enterLastName('TestLastName');
        await shippingAddressPage.enterCompanyName('TestCompany');
        await shippingAddressPage.enterStreetAddress1('2406 ALLRED DR APT A');
        await shippingAddressPage.enterCity('Austin')
        await shippingAddressPage.enterPostalCode('73301')
        await shippingAddressPage.selectCountryArea('TX');
        await shippingAddressPage.enterPhoneNumber('+48123123123')
    }

    async enterCardDetails(creditCardPage: CreditCardPage) {

        await creditCardPage.enterCardNumber("4242424242424242");
        await creditCardPage.enterCardExpiryDate("02/34");
        await creditCardPage.enterCardSecurityCode("222");
    }
}