import { Frame, FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CreditCardPage extends BasePage {

    private readonly cardNumberFrame: FrameLocator;
    private readonly cardExpiryDateFrame: FrameLocator;
    private readonly cardSecurityCodeFrame: FrameLocator;
    private readonly paymentMethods: Locator;
    private readonly cardNumberError: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.paymentMethods = page.locator('[data-testid="paymentMethods"]');
        this.cardNumberFrame = page.frameLocator('[title="Iframe for secured card number"]');
        this.cardExpiryDateFrame = page.frameLocator('[title="Iframe for secured card expiry date"]');
        this.cardSecurityCodeFrame = page.frameLocator('[title="Iframe for secured card security code"]')
        this.cardNumberError = page.locator('span[class="adyen-checkout__error-text"]');
    }

    async enterCardNumber(cardNumber: string) {

        await this.hoverOverElement(this.paymentMethods);
        await this.page.mouse.wheel(0, 50); // scroll a little bit down as sometimes the adyen checkout doesn't show up
        await this.typeTextToInput(this.cardNumberFrame.locator('input[data-fieldtype="encryptedCardNumber"]'), cardNumber);
        await this.click(this.paymentMethods); //to ensure error is shown
    }

    async enterCardExpiryDate(expiryDate: string) {

        await this.typeTextToInput(this.cardExpiryDateFrame.locator('input[data-fieldtype="encryptedExpiryDate"]'), expiryDate)
    }

    async enterCardSecurityCode(securityCode: string) {

        await this.typeTextToInput(this.cardSecurityCodeFrame.locator('input[data-fieldtype="encryptedSecurityCode"]'), securityCode)
    }

    async getCardNumberError(): Promise<string | null> {

        return await this.getTextFromElement(this.cardNumberError);
    }
}