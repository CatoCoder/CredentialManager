public with sharing class ExamEntryController {
    public ExamEntryController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Credential__c> getCredentialList() {
        return [
            SELECT
                Id,
                Name
            FROM Credential__c
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Topic__c> getCertTopics(Id credentialId) {

        List<Credential_Topic__c> topicTemplates = [SELECT Credential__c, Name, Weighting__c, Order__c 
                                                    FROM Credential_Topic__c 
                                                    WHERE Credential__c = :credentialId
                                                    ORDER BY Order__c];
        List<Certification_Topic__c> topicList = new List<Certification_Topic__c>();

        Integer pos = 0;
        for(Credential_Topic__c topic :topicTemplates) {
            topicList.add(new Certification_Topic__c(Name = topic.Name, Weighting__c = topic.Weighting__c, Result__c = 0, Order__c = pos++));
        }

        return topicList;            
    }
}
