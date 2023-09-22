import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class ProductPage extends BasePage {

    private readonly productName: Locator;
    private readonly productVersion: Locator;
    private readonly addToCardButton: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.productName = page.locator("[data-testid='productName']");
        this.productVersion = page.locator("div[role='radiogroup'] div[role='radio']")
        this.addToCardButton = page.locator("[data-testid='addToCartButton']");
    }

    async getProductName(): Promise<string | null> {

        return await this.getTextFromElement(this.productName);
    }

    async selectProductVersion(versionToClick: number) {

        versionToClick === 0 ?
            await this.click(this.productVersion.first()) :
            await this.click(this.productVersion.last())
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