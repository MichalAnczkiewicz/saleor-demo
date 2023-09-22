import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage"

export class ProductListPage extends BasePage {

    private readonly productItem : Locator;
    private readonly productItemName: Locator;
    
    constructor(page: Page, isMobile: boolean | undefined) {

        super(page, isMobile);
        this.productItem = page.locator("[data-testid='productsList'] li a");
        this.productItemName = this.productItem.locator("p[data-testid]");
    }

    async getNumberOfProductItems() : Promise<number> { 

        return await this.getNumberOfElements(this.productItem);
    }

    async getHrefAttributeFromProduct(index: number) : Promise<string | null> {

        return await this.getAttributeFromElement(this.productItem.nth(index), 'href');
    }

    async clickRandomProduct(index: number) {

        await this.click(this.productItem.nth(index));
    }

    async getSpecificProductName(index: number) : Promise<string | null>{

        return await this.getTextFromElement(this.productItemName.nth(index));
    }
}

