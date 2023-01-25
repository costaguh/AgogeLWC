/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import getFaqs from "@salesforce/apex/FaqsController.getFaqs";

 
export default class Faq extends LightningElement {
    @track data = [];    

    connectedCallback() {
        getFaqs()
            .then(result =>{
                this.data = result;                
            })
            .catch(error => {
                console.log('erro');
            })

        loadStyle(this, noHeader)
            .then(result => {});
    }
}