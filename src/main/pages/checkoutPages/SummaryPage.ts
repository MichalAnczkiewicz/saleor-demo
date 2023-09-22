import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class SummaryPage extends BasePage {

    private readonly productQuantity: Locator;
    private readonly productPrice: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.productQuantity = page.locator("input[name='quantity']")
        this.productPrice = page.locator("li[class='summary-item'] p[aria-label='total price']")
    }

    async getProductQuantity() : Promise<string | null> {

        return await this.getAttributeFromElement(this.productQuantity, "value");
    }

    async getProductPrice() : Promise<string | null> {

        return await this.getTextFromElement(this.productPrice);
    }
}