/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import getFaqs from "@salesforce/apex/FaqsController.getFaqs";
 
export default class Faq extends LightningElement {
    @track data = [];
    error;
    searchWords = '';    

    connectedCallback() {
        this.loadFaqs(this.searchWords);

        loadStyle(this, noHeader)
            .then(result => {});
    }

    handleSearch(event){
        this.searchWords = event.target.value;
        this.loadFaqs(this.searchWords);
    }

    loadFaqs(searchWords){
        getFaqs({ searchKey: searchWords})
            .then(result =>{
                this.data = result;                
            })
            .catch(error => {
                this.error = error;
            })
    }
    
}