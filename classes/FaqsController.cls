public with sharing class FaqsController {
	
	@AuraEnabled	
	public static List<FAQ__c> loadFaqsRecords() {
        	return [
            	SELECT Question__c, Answe__c
            	FROM FAQ__c
        	];
    }
}