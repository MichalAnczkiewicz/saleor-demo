import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ShippingAddressPage extends BasePage {

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
    }
}