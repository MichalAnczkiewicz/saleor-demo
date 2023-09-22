import { FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CreditCardPage extends BasePage {

    private readonly cardNumberFrame: FrameLocator;
    private readonly paymentMethods: Locator;
    private readonly cardNumberError: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.paymentMethods = page.locator('[data-testid="paymentMethods"]');
        this.cardNumberFrame = page.frameLocator('[title="Iframe for secured card number"]');
        this.cardNumberError = page.locator('span[class="adyen-checkout__error-text"]');
    }

    async enterCardNumber(cardNumber: string) {

        await this.hoverOverElement(this.paymentMethods);
        await this.page.mouse.wheel(0, 50); // scroll a little bit down as sometimes the adyen checkout doesn't show up
        await this.typeTextToInput(this.cardNumberFrame.locator('input[data-fieldtype="encryptedCardNumber"]'), cardNumber);
        await this.click(this.paymentMethods); //to ensure error is shown
    }

    async getCardNumberError(): Promise<string | null> {

        return await this.getTextFromElement(this.cardNumberError);
    }
}