import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class ProductPage extends BasePage {

    private readonly productName: Locator;
    private readonly productVersion: Locator;
    private readonly addToCardButton: Locator;
    private readonly productPrice: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.productName = page.locator("[data-testid='productName']");
        this.productVersion = page.locator("div[role='radiogroup'] div[role='radio']")
        this.addToCardButton = page.locator("[data-testid='addToCartButton']");
        this.productPrice = page.locator("div[data-testid]+div");
    }

    async getProductName(): Promise<string | null> {

        return await this.getTextFromElement(this.productName);
    }

    async selectProductVersion(versionToClick: number) {

        await this.click(this.productVersion.nth(versionToClick))
    }

    async getSelectedProductPrice(productPriceToGet: number): Promise<string | null> {

        return await this.getTextFromElement(this.productPrice.nth(productPriceToGet))
    }

    async getAddToCartButtonState(buttonState: string): Promise<boolean> {

        return buttonState === 'enabled' ?
            await this.isElementEnabled(this.addToCardButton) :
            await this.isElementDisabled(this.addToCardButton);
    }

    async clickAddToCartButton() {

        await this.click(this.addToCardButton)
    }
}