/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */


import { LightningElement, api, wire, track } from "lwc";
import getQuoteData from "@salesforce/apex/QuoteHandler.getQuoteDetails";
import manageQuoteData from "@salesforce/apex/QuoteHandler.manageQuoteData";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import QuoteMsglabel from '@salesforce/label/c.QuoteSaveMsg';
import QuoteErrorMsg from '@salesforce/label/c.QuoteErrorMsg';

const errorVariant = 'error';
const successVariant = 'success';
const opType='update';

export default class EditQuote extends LightningElement {
  @api recordId;


  label = {
    QuoteMsglabel,
    QuoteErrorMsg
  };

  quoteData = {
    name: "",
    endDate: '',
    startDate: '',
    totalQuoteAmount: ''
  };


  @wire(getQuoteData, { quoteId: '$recordId' })
  quoteWireData({ error, data }) {

    //console.log('parse',JSON.parse(data));
    if (data) {
      console.log("data", data);
      this.quoteData = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;

    }
  }

  handleDateChange(evt) {

    if (evt.target.name == 'startDate') {
      this.quoteData = { ...this.quoteData, startDate: evt.detail.value };

    } else if (evt.target.name == 'endDate') {
      this.quoteData = { ...this.quoteData, endDate: evt.detail.value };
    }
    this.quoteData = { ...this.quoteData, operationType: opType };

  }

  handleSave() {

    let quoteSobj = this.quoteData.sObj;

    quoteSobj = { ...quoteSobj, StartDate__c: this.quoteData.startDate };
    quoteSobj = { ...quoteSobj, EndDate__c: this.quoteData.endDate };

    manageQuoteData({
      quoteDTL: JSON.stringify(quoteSobj),
      operationType: opType
    })
      .then(result => {
        this.showToast(this.label.QuoteMsglabel, successVariant);
      })
      .catch((error) => {
        this.showToast(this.label.QuoteErrorMsg, errorVariant);
      });


  }
  // to show the toast message
  showToast(msg, variant) {
    const evt = new ShowToastEvent({
      message: msg,
      variant: variant,
      mode: 'dismissable'
    });
    this.dispatchEvent(evt);
  }

}
