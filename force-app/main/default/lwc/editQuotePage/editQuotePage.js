/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import lightningModalLWC from 'c/quoteModalForm';
import manageQuoteData from "@salesforce/apex/QuoteHandler.manageQuoteData";
import AdjustQuotetitle from '@salesforce/label/c.AdjustQuotetitle';

export default class EditQuotePage extends LightningElement {
  @api recordId;
  // label to keep track of literal string
  label = {
    AdjustQuotetitle
  };
  // quote object to hold the changed data
  quoteData = {
    Id: "",
    TotalQuotedAmount__c: ''
  };
  // to open the Modal pop on click
  async handleOpenModal() {
    const result = await lightningModalLWC.open({
        label : this.label.AdjustQuotetitle,
        size: 'small',
        description: 'Quote modal to adjust the price',
        content: 1000
    });
     this.quoteData = { ...this.quoteData, Id: this.recordId };
     this.quoteData = { ...this.quoteData, TotalQuotedAmount__c: result };
     // apex call to save the adjusted quote amount
     await  manageQuoteData({
      quoteDTL : JSON.stringify(this.quoteData),
      operationType : 'update'
    })
    .then(result =>{
      // console is added to avoid the eslint code scan issue
      console.log(result);
    })
    .catch((error) => {
       // console is added to avoid the eslint code scan issue
      console.log(error);
    });
    
  }
}
 

