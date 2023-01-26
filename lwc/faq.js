/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import getFaqs from "@salesforce/apex/FaqsController.getFaqs";
 
export default class Faq extends LightningElement {
    @track data = [];
    error;
    searchWords = '';
    isSearchNotAvailable = false;    

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

                if(this.data.length > 0){
                    this.isSearchNotAvailable = false;
                }else {
                    this.isSearchNotAvailable = true;
                }               
            })
            .catch(error => {
                this.isSearchNotAvailable = false;
                this.error = error;
            })
    }
}