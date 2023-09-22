import { Locator, Page } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;
    protected readonly isMobile: Boolean | undefined;

    constructor(page: Page, isMobile: Boolean | undefined) {
        this.page = page;
        this.isMobile = isMobile;
    }

    protected async click(locator: Locator) {

        await this.waitForElementToBeVisible(locator);
        await locator.hover();
        await locator.click();
    }

    protected async getNumberOfElements(locator: Locator): Promise<number> {

        await this.waitForElementToBeVisible(locator.first())
        return await locator.count();
    }

    protected async getTextFromElement(locator: Locator): Promise<string | null> {

        await this.waitForElementToBeVisible(locator);
        return await locator.textContent();
    }

    protected async typeTextToInput(locator: Locator, text: string) {

        await this.click(locator);
        await locator.fill(text);
    }

    protected async getAttributeFromElement(locator: Locator, attribute: string) {

        await locator.hover();
        await this.waitForElementToBeVisible(locator);
        return await locator.getAttribute(attribute);
    }

    protected async isElementEnabled(locator: Locator): Promise<boolean> {

        await this.waitForElementToBeVisible(locator);
        return await locator.isEnabled();
    }

    protected async isElementDisabled(locator: Locator): Promise<boolean> {

        await this.waitForElementToBeVisible(locator);
        return await locator.isDisabled();
    }

    protected async isElementVisible(locator: Locator): Promise<boolean> {

        await this.waitForElementToBeVisible(locator);
        return await locator.first().isVisible();
    }

    private async waitForElementToBeVisible(locator: Locator) {

        await locator.first().waitFor({ state: "visible" });
    }
}