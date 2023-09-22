import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class NavbarPage extends BasePage {

    private readonly cartIcon: Locator;
    private readonly cartCounter: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.cartIcon = page.locator("[data-testid='cartIcon']");
        this.cartCounter = this.cartIcon.locator("[data-testid='cartCounter']");
    }

    async getCartCounter() : Promise<string | null> {

        await this.page.waitForLoadState("networkidle");
        return await this.getTextFromElement(this.cartCounter);
    }

    async clickCart() {

        await this.click(this.cartIcon);
    }
}