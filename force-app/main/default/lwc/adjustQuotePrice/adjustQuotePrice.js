/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */


import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AdjustQuotePrice extends LightningModal {
  @api label;
  @api content;
  handleSaveClick() {
     this.close(this.refs.adjustedAmountValue.value);
  }
  handleCloseClick() {
      this.close();
  }
  
}
