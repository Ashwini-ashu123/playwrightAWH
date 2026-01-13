import { Page } from '@playwright/test';

export class EnquiryPage {
  constructor(private page: Page) {}

  async openEnquiries() {
    await this.page.waitForURL(/lightning/, { timeout: 60000 });

    const tab = this.page.getByRole('link', { name: 'Enquiries' });
    await tab.waitFor({ state: 'visible', timeout: 60000 });
    await tab.click();
  }


  async clickNew() {
    await this.page.getByRole('button', { name: 'New' }).click();
  }
  // Click New button
  async clickNew() {
    await this.page.getByRole('button', { name: 'New' }).click();

  }

  // Enter Phone
  async enterPhone(phone: string) {
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
  }

  // Enter Email
  async enterEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  // Click Next
  async next() {
    await this.page.getByRole('button', { name: 'Next' }).click();

  }

  // Enter Last Name
  async enterLastName(lastName: string) {
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  }

  // Save record and verify toast
  async saveRecord() {
    await this.page.getByRole('button', { name: 'Save' }).click();

    console.log('Record saved successfully');
  }

 async selectIntentType(intent: string) {
   // Locate the actual <select> inside Flow picklist
   const select = this.page.locator(
     'flowruntime-picklist-input-lwc select'
   );

   await select.waitFor({ state: 'attached', timeout: 60000 });

   // Select using visible label from JSON (Tenant)
   await select.selectOption({ label: intent });
 }


  // Enter Budget
  async enterBudget(budget: string) {
    const budgetInput = this.page.locator(
      'input[name="Budget_Range1__c"]'
    );

    await budgetInput.waitFor({ state: 'visible', timeout: 60000 });
    await budgetInput.fill(budget);
  }

  // Select Nature of Purchase
  async selectNatureOfPurchase(value: string) {
    await this.page.getByRole('combobox', { name: 'Nature of Purchase' }).click();
    await this.page.getByRole('option', { name: value }).click();
  }

  // Select Service Required
       async selectServiceRequired(service: string) {
          await this.page.getByRole('combobox', { name: 'Service Required' }).click();
          await this.page.getByRole('option', { name: service }).click();
       }

  // Enter Size
        async enterSize(size: string) {
          const size1 = this.page.locator('input[name="Size_in_sqfts__c"]');
          await size1.waitFor({ state: 'visible', timeout: 60000 });
          await size1.fill(size);
      }


        async selectEnquirySource(source: string, subSource: string) {
           await this.page.getByRole('combobox', { name: 'Enquiry Source' }).click();
           await this.page.getByRole('option', { name: source }).click();
           await this.page.getByRole('combobox', { name: 'Enquiry Sub Source' }).click();
           await this.page.getByRole('option', { name: subSource }).click();
       }

        async getRecordId(objectName?: string): Promise<string> {
              if (objectName) {
           await this.page.waitForURL(
           new RegExp(`/lightning/r/${objectName}/`),
           { timeout: 120000 }
            );
           } else {
           await this.page.waitForURL(/\/lightning\/r\//, { timeout: 120000 });
            }
         const url = this.page.url();
         console.log('Record URL:', url);
         const recordId = url.split('/')[6];
         console.log('Captured Record ID:', recordId);
         return recordId;
       }


         async editRecordID(recordId:String){
            await this.page.goto(`/lightning/r/Enquiry__c/${recordId}/view`);
            const highlightsPanel = this.page.locator('records-highlights2');
            await highlightsPanel.getByRole('button', { name: 'Edit' }).click();
         }

//          async getRecordIdFromUrl(): Promise<string> {
//            await this.page.waitForURL(/\/lightning\/r\//);
//
//            const url = this.page.url();
//            const recordId = url.split('/lightning/r/')[1].split('/')[1];
//
//            return recordId;
//            }

         async editDetails(sizeRange: String){

            await this.page.getByRole('combobox', { name: 'Size Range' }).click();
            const option = this.page.getByRole('option', { name: sizeRange });
            await option.scrollIntoViewIfNeeded();
            await option.click({ force: true });
            const footer = this.page.locator('records-form-footer');
            await footer.getByRole('button', { name: 'Save', exact: true }).click();
         }

          async interestedLocation(InameLocation: String,Irange: String){
             const relatedList = this.page.locator('lst-dynamic-related-list',{has: this.page.getByRole('heading', { name: 'Interested Locations' })});
             await relatedList.scrollIntoViewIfNeeded();
             await relatedList.waitFor({ state: 'visible' });
             const newButton = relatedList.getByRole('button', { name: 'New' });
             await newButton.waitFor({ state: 'visible' });
             await newButton.click({ force: true });
             const Iname = this.page.locator('input[name="Name"]');
             await Iname.waitFor({ state: 'visible', timeout: 60000 });
             await Iname.fill(InameLocation);
             const range =  this.page.locator('input[name="Interested_Location_Range__c"]');
             await range.waitFor({state: 'visible',timeout:60000});
             await range.fill(Irange);
             const footer = this.page.locator('records-form-footer');
             await footer.getByRole('button', { name: 'Save', exact: true }).click();

           }
          async qualifiedEnquiry(status: String , reason: String){
             const highlightsPanel = this.page.locator('records-highlights2');
             await highlightsPanel.getByRole('button', { name: 'Edit' }).click();
             await this.page.getByRole('combobox', { name: 'Status' }).click();
             await this.page.getByRole('option', { name: status }).click();
             await this.page.getByRole('combobox', { name: 'Reason for Closed' }).click();
             await this.page.getByRole('option', { name: reason , exact: true }).click();
             const footer = this.page.locator('records-form-footer');
             await footer.getByRole('button', { name: 'Save', exact: true }).click();
             await this.page.getByRole('button',{ name: 'Submit'}).click();

  }

          async openRecordView(objectApiName: string, recordId: string) {
            await this.page.goto(`/lightning/r/${objectApiName}/${recordId}/view`);

            // Wait until Salesforce record page is fully loaded
            await this.page.locator('records-highlights2').waitFor({ timeout: 120000 });
          }

}
