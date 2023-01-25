public with sharing class FaqsController {

	@AuraEnabled	
	public static List<FAQ__c> getFaqs() {
		return [
            	SELECT Id, Question__c, Answe__c
            	FROM FAQ__c
		];
    }
}