import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContactDetailsPage extends BasePage {

    private readonly emailInput: Locator;
    private readonly emailInputError: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.emailInput = page.locator("input[name='email']");
        this.emailInputError = page.locator("input[name='email']~p");
    }

    async enterEmail(email: string) {

        await this.typeTextToInput(this.emailInput, email);
    }

    async isEmailInputErrorVisible(): Promise<boolean> {

        return this.isElementVisible(this.emailInputError);
    }
}