/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import getFaqs from "@salesforce/apex/FaqsController.getFaqs";
 
export default class Faq extends LightningElement {
    @track data = [];
    @track pageNumber = 1;
    @track pageSize = 5;

    error;
    searchWords = '';
    isSearchNotAvailable = false;
    typingTimer;
    doneTypingInterval = 1000;    

    connectedCallback() {
        this.loadFaqs(this.searchWords);
    
        loadStyle(this, noHeader)
            .then(result => {});  
        
    }
    
    handleSearch(event){
        this.searchWords = event.target.value;
        this.typingTimer = setTimeout(() => {
            this.pageNumber = 1;
            this.loadFaqs(this.searchWords);
        }, this.doneTypingInterval);                 
    }
    
    loadFaqs(searchWords){        
        getFaqs({ searchKey: searchWords, pageNumber: this.pageNumber, pageSize: this.pageSize})
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
    
    handlePreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.loadFaqs(this.searchWords);
        }
    }
    
    handleNextPage() {
        this.pageNumber++;
        this.loadFaqs(this.searchWords);
    }

    
}