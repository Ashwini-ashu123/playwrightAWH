import { test } from '@playwright/test';
import { EnquiryPage } from '../pages/enquiry';
import { OpportunityPage } from '../pages/opportunity';
import { SiteVisitPage } from '../pages/siteVisit';
const testData = require('../testData/enquiryData.json');

test('Create Enquiry – Tenant Enquiry', async ({ page }) => {
   test.setTimeout(180000);
  const enquiryPage = new EnquiryPage(page);
  const opportunityPage = new OpportunityPage(page);
  const siteVisitPage = new SiteVisitPage(page);
   const data = testData.enquiryFlow[0];

// //  Navigate to Lightning home
//      await page.goto('/lightning/page/home');
// // Open Enquiries tab
//   await enquiryPage.openEnquiries();
//
//   // Perform Enquiry actions using data from JSON
//   await enquiryPage.clickNew();
//   await enquiryPage.enterPhone(data.phone);
//   await enquiryPage.enterEmail(data.email);
//   await enquiryPage.next();
//
//   await enquiryPage.enterLastName(data.lastName);
//   await enquiryPage.saveRecord();
//
//   await enquiryPage.selectIntentType(data.intentType);
//   await enquiryPage.next();
//
//   await enquiryPage.enterBudget(data.budget);
//   await enquiryPage.selectNatureOfPurchase(data.natureOfPurchase);
//   await enquiryPage.selectServiceRequired(data.serviceRequired);
//   await enquiryPage.enterSize(data.size);
//   await enquiryPage.selectEnquirySource(data.enquirySource, data.enquirySubSource);
//
//   await enquiryPage.next();
//   const recordId = await enquiryPage.getRecordId();
//   await enquiryPage.editRecordID(recordId);
//   await enquiryPage.editDetails(data.sizeRange);
//   await enquiryPage.interestedLocation(data.InameLocation, data.IRange);
//   await enquiryPage.qualifiedEnquiry(data.Status,data.Reason);
//   await page.getByRole('heading', { name: 'Opportunity' }).waitFor({ timeout: 120000 });
//   const opportunityRecordId = await enquiryPage.getRecordId();
//   console.log('Opportunity Record ID:', opportunityRecordId);
  await enquiryPage.openRecordView('Opportunity__c', 'a0E9I000002dhiHUAQ');
//   await opportunityPage.verifyStages('Qualified');
//   await opportunityPage.searchUnit();
//   await opportunityPage.SendProposal(data.FileName);
//   await opportunityPage.VerifyInFiles(data.FileName);
//   await opportunityPage.sendProposal();
//   await opportunityPage.verifyStages('Proposal');
  await siteVisitPage.createSiteVisit();
  await siteVisitPage.verifySiteVisit(data.lastName);
  await siteVisitPage.markCompleteSV();
  await siteVisitPage.verifyComplete(data.lastName);


});