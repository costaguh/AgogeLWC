public with sharing class FaqsController {

	@AuraEnabled	
	public static List<FAQ__c> getFaqs(String searchKey) {
		if(searchKey != ''){
			String key = '%'+searchKey+'%';

			List<FAQ__c> faqSearchList = [
				SELECT Id, Question__c, Answe__c
				FROM FAQ__c
				WHERE Question__c Like :key 
				];

			return faqSearchList;
		}
		else {
			List<FAQ__c> faqList = [
            	SELECT Id, Question__c, Answe__c
            	FROM FAQ__c
			];

			if(!faqList.isEmpty()){
				return faqList;
			}

			return null;
		}
    }
}