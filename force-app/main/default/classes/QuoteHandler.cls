public with sharing class QuoteHandler  {

/*
* @Method:      getQuoteDetails
* @Created by:  VIvek Deshmukh
* @Description: This method returns Quotedetails 
* @Param:       String quoteId
* @Return:      QuoteDto which can be used by LWC
*/
@AuraEnabled(Cacheable=true)
public static QuoteDto getQuoteDetails(String quoteId){
    QuoteDto quoteDTOObj = null;
    try {
        if(Schema.sObjectType.Quote__c.IsAccessible()){
  
        Quote__c qObj =  [SELECT Id,name , StartDate__c , EndDate__c , TotalQuotedAmount__c
                          FROM   QUOTE__c
                          WHERE Id=: quoteId
                          WITH SECURITY_ENFORCED];
        
        quoteDTOObj = new QuoteDto(qObj);
    }
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
    return quoteDTOObj;
}

/*
* @Method:      manageQuoteData
* @Created by:  VIvek Deshmukh
* @Description: This method manage insert,update,delete of Quote
* @Param:       String quoteDTL
* @Param:       String operationType
* @Return:      
*/

@AuraEnabled
public static void manageQuoteData(String quoteDTL,String operationType){
    try {
        QuoteDto quoteDTOObj = new  QuoteDto ((Quote__c)JSON.deserialize(quoteDTL,Quote__c.class));
        quoteDTOObj.operationType = operationType;
       
           Quote__c sObj = (Quote__c)quoteDTOObj.refreshSo();
           if (quoteDTOObj.isUpdate() && Schema.sObjectType.Quote__c.IsUpdateable()) {
                update sObj;
           } else if(quoteDTOObj.isInsert() && Schema.sObjectType.Quote__c.IsCreateable()) {
                //  handle DML here
               insert sObj;
           } else if(quoteDTOObj.isDelete() && Schema.sObjectType.Quote__c.isDeletable()){
                // handle DML here
                delete sObj;
           }
                 
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        // persist it in database
    }
}


}