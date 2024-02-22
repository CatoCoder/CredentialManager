import { LightningElement, wire } from 'lwc';
import getCredentialList from '@salesforce/apex/ExamEntryController.getCredentialList';
import getCertTopics from '@salesforce/apex/ExamEntryController.getCertTopics';

const COLS = [
    { label: 'Topic', fieldName: 'Name', editable: false },
    { label: 'Weight %', fieldName: 'Weighting__c', editable: false },
    { label: 'Result', fieldName: 'Result__c', editable: true }
];

export default class ExamResultsSelector extends LightningElement {
    credentialOptions = [];
    error;
    shopwTopics = false;
    topics;
    credentialId;
    grandTotal = 0;


    @wire(getCredentialList)
    wiredCredentials({ error, data }) {
        if (data) {
            this.credentialOptions = data.map((record) => ({
                value: record.Id,
                label: record.Name
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.credentialOptions = undefined;
        }
    }

    async handleRecordSelected(event) {
        this.shopwTopics = true;
        this.credentialId = event.target.value;
        console.log('Credential: ' + this.credentialId);
        try {
            let data = await getCertTopics({ credentialId: this.credentialId });
            this.topics = JSON.parse(JSON.stringify(data));
            console.log('Records: ' + this.topics);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    handleResult(event) {
        console.log('Input: ' + event.target.name);

        let topicNumber = Number(event.target.name);
        let topicResult = Number(event.target.value);

        console.log('Topic Number: ' + topicNumber);
        console.log('Value: ' + topicResult);
        console.log('Topic Name: ' + this.topics[topicNumber].Name);
        console.log('Topic Weight: ' + this.topics[topicNumber].Weighting__c);

        try {
            this.topics[topicNumber].Result__c = topicResult;        
        } catch (ex) {
            console.log('Error: ' + ex);
        }
        console.log('Topic Result: ' + this.topics[topicNumber].Result__c);

        this.grandTotal = 0;
        for (let i = 0; i < this.topics.length; i++) {
            this.grandTotal += (this.topics[i].Weighting__c / 100) * (this.topics[i].Result__c / 100);
        }
        this.grandTotal *= 100;
        console.log('Grand Total: ' + this.grandTotal);
    }

    get showList() {
        return this.shopwTopics;
    }

    get totalResult() {
        return Number(this.grandTotal).toFixed(1) + '%';
    }

}


