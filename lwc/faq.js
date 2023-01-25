/* eslint-disable no-alert */
import { LightningElement, wire, track } from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import loadFaqsRecords from '@salesforce/apex/FaqsController.loadFaqsRecords';


export default class Faq extends LightningElement {

    @wire(loadFaqsRecords) FAQ;    
    @track recordId;
    handleClickAsk() {
        this.recordId = e.target.value;
        alert(this.recordId);
    }

    connectedCallback() {
        loadStyle(this, noHeader)
            .then(result => {});
    }
}