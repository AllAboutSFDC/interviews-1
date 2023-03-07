import { api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class QuoteModalForm extends LightningModal {
    @api label;
    @api content;
 
    handleSaveClick() {
       this.close(this.refs.adjustedAmountValue.value);   
    }
    handleCloseClick() {
        this.close();
    }
}