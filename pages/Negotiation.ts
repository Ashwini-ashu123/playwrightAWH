import { Page, expect } from '@playwright/test';

export class NegotiationPage{
  private page : Page;

  constructor(page : Page){
  this.page = page;
  }

  async selectNego(documentname : String){
     await this.page.locator('.slds-grid.slds-grid_vertical-align-center').getByRole('button').nth(5).click();
     await this.page.locator('.slds-dropdown__item').filter({ hasText: 'Negotiation Checklist' }).click();
     const unit = this.page.locator('select[name="Select_a_Unit_Bundle"]');
     await unit.click();
     await unit.selectOption({index:1});
     const name1 =  this.page.getByRole('textbox', { name: 'Save Negotiation Document As' });
     await name1.click();
     await name1.fill(documentname);
     const footer = this.page.locator('.flow-button__NEXT',{hasText:'Next'});
     await footer.click();
     const footer2 = this.page.locator('.slds-button.slds-button_brand',{ hasText: 'Save' });
     await footer2.click();
     await this.page.reload();

        }

  async verifyFilesNego(documentname1 : String){
      const filesSec = this.page.locator(
                'div.slds-page-header__name',
                { hasText: 'Files' }
              );
              await filesSec.scrollIntoViewIfNeeded();

              const fileRow = this.page.locator('td', { hasText: documentname1 });

              // 🔁 Poll until file is created by Salesforce backend
              await expect.poll(
                async () => await fileRow.count(),
                {
                  timeout: 60000,
                  intervals: [2000], // retry every 2s
                  message: `Waiting for proposal PDF "${documentname1}" to appear in Files`
                }
              ).toBeGreaterThan(0);

              await expect(fileRow.first()).toBeVisible();
  }



  }