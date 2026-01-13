import { Page, expect } from '@playwright/test';

export class OpportunityPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

       async verifyStages(stageName : String){
         await this.page.getByRole('heading', { name: 'Opportunity' }).waitFor({ timeout: 120000 });
         const stage = this.page.locator('li.slds-is-current, li.slds-is-active', {hasText : stageName});
         await expect(stage).toBeVisible();
         console.log("User is in" +stageName+ "qualified stage");
        }

       async searchUnit(){
       await this.page.getByRole('tab', { name: 'Search Units'}).click();
       await this.page.getByPlaceholder('Enter Unit Number....').fill('Test');
       await this.page.keyboard.press('Enter');
       await this.page.waitForTimeout(2000);
       await this.page.getByRole('button', { name: 'Add Unit' }).scrollIntoViewIfNeeded();
       const rows = this.page.locator('c-search-units-row');
       const count = await rows.count();
       for (let i = 0; i < Math.min(count, 3); i++) {
         const row = rows.nth(i);

         await row.scrollIntoViewIfNeeded();
         await row.getByRole('checkbox').check({ force: true });
       }
       await this.page.getByRole('button', { name: 'Add Unit' }).click();
       await this.page.waitForTimeout(5000);
       const modal = this.page.locator('.slds-modal__header');
       await modal.getByRole('button', { hasText: 'Close' }).click();
       await this.page.reload();

     }

     async SendProposal(FileName1 : String){
        await this.page.getByRole('button',{name: 'Generate Proposal'}).click();
        const labels = this.page.locator('div.quick-actions-panel label');
        await labels.nth(0).click();
        await labels.nth(1).click();
        await labels.nth(2).click();
        const footer = this.page.locator('.slds-modal__footer');
        await footer.locator('button.slds-button_neutral', { hasText: 'Next' }).click();
        const proposalName = this.page.getByLabel('Save Proposal as');
        await proposalName.fill(FileName1);
        await footer.locator('button.slds-button_neutral', { hasText: 'Next' }).click();
//         await this.page.waitForTimeout(10000);
        await this.page.reload();
     }


     async VerifyInFiles(FileName :String){
       const filesSec = this.page.locator(
           'div.slds-page-header__name',
           { hasText: 'Files' }
         );
         await filesSec.scrollIntoViewIfNeeded();

         const fileRow = this.page.locator('td', { hasText: FileName });

         // 🔁 Poll until file is created by Salesforce backend
         await expect.poll(
           async () => await fileRow.count(),
           {
             timeout: 60000,
             intervals: [2000], // retry every 2s
             message: `Waiting for proposal PDF "${FileName}" to appear in Files`
           }
         ).toBeGreaterThan(0);

         await expect(fileRow.first()).toBeVisible();
     }
     async sendProposal(){
        await this.page.getByRole('button',{name:'Send Proposal to Customer'})
        .click();
        await this.page.waitForTimeout(5000);
        const modal = this.page.locator('.slds-modal__header');
        await modal.getByRole('button', { hasText: 'Close' }).click();



     }



}