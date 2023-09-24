import { Page } from "@playwright/test";

export class TestHelpers {

    private readonly page: Page;
    private readonly isMobile: Boolean | undefined;

    constructor(page: Page, isMobile: Boolean | undefined) {

        this.page = page;
        this.isMobile = isMobile;
    }

    async openWebsite(url: string) {

        await Promise.all([
            this.page.waitForResponse(response => response.url().includes(url) && response.status() == 200),
            this.page.goto(url),
        ]);
    }

    getRandomIndex(numberOfElements: number): number {

        return Math.floor(Math.random() * numberOfElements);
    }
}