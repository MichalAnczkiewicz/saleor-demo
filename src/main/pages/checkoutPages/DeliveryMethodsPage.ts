import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class DelivertMethodsPage extends BasePage {

    private readonly methodDelivery: Locator;

    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.methodDelivery = page.locator('[data-testid="deliveryMethods"] div[class="select-box"]');
    }

    async getNumberOfDeliveryMethods() : Promise<number>{

        return await this.getNumberOfElements(this.methodDelivery);
    }

    async clickDeliveryMethod(index: number) {

        await this.click(this.methodDelivery.nth(index));
    }
}