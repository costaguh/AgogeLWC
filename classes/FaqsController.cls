public with sharing class FaqsController {
	@AuraEnabled	
	public static List<FAQ__c> getFaqs(String searchKey, Integer pageNumber, Integer pageSize) {
		if(searchKey != ''){
			String key = '%'+searchKey+'%';	
			Integer offset = (pageNumber - 1) * pageSize;
			
			List<FAQ__c> faqSearchList = [
				SELECT Id, Question__c, Answe__c
				FROM FAQ__c				
				WHERE Question__c Like :key
				LIMIT :pageSize OFFSET :offset				
			];

			return faqSearchList;
		}
		else {
			Integer offset = (pageNumber - 1) * pageSize;
			List<FAQ__c> faqList = [
            	SELECT Id, Question__c, Answe__c
            	FROM FAQ__c
				LIMIT :pageSize OFFSET :offset
			];

			if(!faqList.isEmpty()){
				return faqList;
			}

			return null;
		}
    }	
}