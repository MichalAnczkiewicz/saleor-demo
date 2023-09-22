import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class ProductPage extends BasePage {

    private readonly productName: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.productName = page.locator("[data-testid='productName']");
    }

    async getProductName() : Promise<string | null> {

        return await this.getTextFromElement(this.productName);
    }

}