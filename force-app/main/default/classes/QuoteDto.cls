public with sharing class QuoteDto extends BaseDto {
  // Added new attributes to map it in LWC
  @AuraEnabled
  public Date endDate;
  @AuraEnabled
  public Date startDate;
  @AuraEnabled
  public Decimal totalQuoteAmount;

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.name = quote.Name;
    this.totalQuoteAmount = quote.TotalQuotedAmount__c;
  }

  public override SObject refreshSo() {
     return this.sObj;

  }
}
