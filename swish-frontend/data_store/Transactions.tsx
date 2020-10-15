import * as React from 'react';
import * as lodash from 'lodash';

export interface TransactionSchema {
    id: string,
    lenderId: string,
    transactionName: string,
    note: string,
    totalAmount: number,
    createdDate: string,
    paymentDate: string,
    recurring: boolean,
    recurringId: string,
    groupId: string
}


//default mockup data. Should be loaded from backend api on integration?
//Or refactored into using Redux
var transactionDefault : TransactionSchema[] = [
    {
        "id": "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        "lenderId": "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        "transactionName": "SkipTheDishes",
        "totalAmount": 12.20,
        "note": "SkipTheDishes for fried chicken",
        "createdDate": "July 20th",
        "paymentDate": "August 20th",
        "recurring": false,
        "recurringId": "",
        "groupId": ""
    },
    {
        "id": "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        "lenderId": "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        "transactionName": "Water Bill",
        "totalAmount": 45.30,
        "note": "July water bill",
        "createdDate": "July 10th",
        "paymentDate": "July 31st",
        "recurring": true,
        "recurringId": "",
        "groupId": ""
    },
    {
        "id": "8558845a-919f-4487-a5e4-19353ab944b4",
        "lenderId": "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        "transactionName": "Bday giftcard",
        "totalAmount": 20.00,
        "note": "Gift card for Tracy's birthday",
        "createdDate": "July 18",
        "paymentDate": "August 18th",
        "recurring": false,
        "recurringId": "",
        "groupId": ""
    },
];

export class Transactions {
    private _transactions : TransactionSchema[];

    public constructor(){
        this._transactions = transactionDefault;
    }

    public get transactions(){
        return lodash.cloneDeep(this._transactions);
    }

    public getTransactionById = (transactionId: string) => {
        let index = this._transactions.findIndex(element => element.id === transactionId);
        return lodash.cloneDeep(this.transactions[index]);
    } 

    public getTransactionByName = (nameToSearch: string) => {
        let transactionByName : TransactionSchema[] = this._transactions.filter(element => element.transactionName.includes(nameToSearch));
        return lodash.cloneDeep(transactionByName);
    }

    public getTransactionByLender = (lenderId: string) => {
        let transactionByLender : TransactionSchema[] = this._transactions.filter(element => element.lenderId == lenderId);
        return lodash.cloneDeep(transactionByLender); 
    }

    public updateTransaction = (transaction : TransactionSchema) => {
        let index = this._transactions.findIndex(element => element.id === transaction.id);
        console.log("BEFORE UPDATE: ", this._transactions[index]);
        this._transactions[index] = transaction;
        console.log("AFTER UPDATE: ", this._transactions[index]);
    }

    public updateTransactionByProperty = (id: string, propertyName: string, value: any) => {
        let index = this._transactions.findIndex(element => element.id === id);
        this._transactions[index][propertyName] = value; 
    }

    public createNewTransaction(transaction : TransactionSchema){
        this._transactions.push(transaction);
    }
}

export const TransactionsContext = React.createContext<Transactions>(
    new Transactions
);



