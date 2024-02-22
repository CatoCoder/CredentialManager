@isTest
public class ExamEntryController_Test {

    @isTest 
    private static void getCertTopics_Found() {

        // Arrange
        Credential__c cred = new Credential__c(Name = 'Test Credential 1',Passing_Score__c = 65, Number_of_Questions__c = 60);
        insert cred;

        List<Credential_Topic__c> topics = new List<Credential_Topic__c>{
            new Credential_Topic__c(Credential__c = cred.Id, Name = 'Topic 2', Weighting__c = 25, Order__c = 2),
            new Credential_Topic__c(Credential__c = cred.Id, Name = 'Topic 1', Weighting__c = 75, Order__c = 1)
        };
        insert topics;
        
        // Act
        Test.startTest();
        List<Certification_Topic__c> result = ExamEntryController.getCertTopics(cred.Id);
        Test.stopTest();
        
        // Assert
        Assert.areEqual(2, result.size(), 'Should have records');
        Assert.areEqual(0, result[0].Order__c, 'Should be order 1');
        Assert.areEqual(1, result[1].Order__c, 'Should be order 2');
    }
}