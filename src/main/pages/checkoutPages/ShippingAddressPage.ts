import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ShippingAddressPage extends BasePage {

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyNameInput: Locator;
    private readonly streetAddress1Input: Locator;
    private readonly streetAddress2Input: Locator;
    private readonly cityInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly countryAreaSelect: Locator;
    private readonly phoneNumberInput: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.firstNameInput = this.page.locator('input[name="firstName"]');
        this.lastNameInput = this.page.locator('input[name="lastName"]');
        this.companyNameInput = this.page.locator('input[name="companyName"]');
        this.streetAddress1Input = this.page.locator('input[name="streetAddress1"]');
        this.streetAddress2Input = this.page.locator('input[name="streetAddress2"]');
        this.cityInput = this.page.locator('input[name="city"]');
        this.postalCodeInput = this.page.locator('input[name="postalCode"]');
        this.countryAreaSelect = this.page.locator('select[name="countryArea"]');
        this.phoneNumberInput = this.page.locator('input[name="phone"]');
    }

    async enterFirstName(firstName: string) {

        await this.typeTextToInput(this.firstNameInput, firstName);
    }

    async enterLastName(lastName: string) {

        await this.typeTextToInput(this.lastNameInput, lastName);
    }

    async enterCompanyName(companyName: string) {

        await this.typeTextToInput(this.companyNameInput, companyName);
    }

    async enterStreetAddress1(streetAddress1: string) {

        await this.typeTextToInput(this.streetAddress1Input, streetAddress1);
    }

    async enterStreetAddress2(streetAddress2: string) {

        await this.typeTextToInput(this.streetAddress2Input, streetAddress2);
    }

    async enterCity(city: string) {

        await this.typeTextToInput(this.cityInput, city);
    }

    async enterPostalCode(postalCode: string) {

        await this.typeTextToInput(this.postalCodeInput, postalCode);
    }

    async selectCountryArea(countryArea: string) {

        await this.countryAreaSelect.selectOption({ value: countryArea });
    }

    async enterPhoneNumber(phoneNumber: string) {

        await this.typeTextToInput(this.phoneNumberInput, phoneNumber);
    }
}