import { Page, expect } from '@playwright/test';

export class SiteVisitPage{
  private page : Page;

  constructor(page : Page){
  this.page = page;
  }

  async createSiteVisit(){
    await this.page.locator('button[name="Opportunity__c.Schedule_Site_Visit"]').click();
    const dateField = this.page.locator('input[name="Visit_Date"]').first();
    const timeField = this.page.locator('input[name="Visit_Date"]').last();
    await dateField.click();
    await dateField.fill('28-Jan-2026');
    await timeField.click();
    await timeField.fill('5:00pm');
    const peoplePlanned = this.page.locator('input[name="No_of_People_Planned"]');
    await peoplePlanned.click();
    await peoplePlanned.fill('4');
    const unitBundle =  this.page.locator('select[name="Unit_Bundle"]');
    await unitBundle.click();
    await unitBundle.selectOption({index:1});
    const footer = this.page.locator('div.navigation-bar__right-align');
    await footer.getByRole('button', { hasText: 'Save' }).click();
    await this.page.reload();
      }

  async verifySiteVisit(name : String){
     const svLink = this.page.locator('c-show-related-site-visit a',{hasText:name});
     await expect (svLink).toBeVisible();
     await svLink.click();
     await expect(this.page).toHaveURL(/\/Site_Visit__c\//);
    }

  async markCompleteSV(){
     await this.page.getByRole('button', { name: 'Mark Complete' }).click();
     const cameraToggle = this.page.getByRole('checkbox');
//      if (!(await cameraToggle.isChecked())) {
//        await cameraToggle.check({ force: true });
//      }
//      await expect(cameraToggle).toBeChecked();
//      await this.page.getByRole('button',{name:'Capture Image'}).click();
     const footer = this.page.locator('div.navigation-bar__right-align');
     await this.page.locator('//button[contains(text(),"Next")]').click();
     await this.page.locator('//button[contains(text(),"Next")]').click();
     }

  async verifyComplete(name: string) {
        const statusLabel = this.page.locator('div.test-id__field-label-container', { hasText: 'Site Visit Status' } );
        await expect(statusLabel).toBeVisible();
        const completedStatus = this.page.getByText('Completed', { exact: true });
        await expect(completedStatus).toBeVisible();
        const oppValue = this.page
         .locator('record_flexipage-record-field') // each row
         .filter({ has: this.page.locator('div.test-id__field-label-container', { hasText: 'Opportunity' }) })
         .locator('records-hoverable-link', { hasText: name });

       await expect(oppValue).toBeVisible();
       await oppValue.click();

  }




}