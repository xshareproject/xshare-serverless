import * as React from 'react';

export interface TransactionSchema {
    id: string,
    transactionName: string,
    description: string,
    amount: number,
    createdDate: string,
    paymentDate: string,
    recurring: boolean
}


//default mockup data. Should be loaded from backend api on integration?
//Or refactored into using Redux
var transactionDefault : TransactionSchema[] = [
    {
        "id": "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        "transactionName": "SkipTheDishes",
        "amount": 12.20,
        "description": "SkipTheDishes for fried chicken",
        "createdDate": "July 20th",
        "paymentDate": "August 20th",
        "recurring": false
    },
    {
        "id": "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        "transactionName": "Water Bill",
        "amount": 45.30,
        "description": "July water bill",
        "createdDate": "July 10th",
        "paymentDate": "July 31st",
        "recurring": true
    },
    {
        "id": "8558845a-919f-4487-a5e4-19353ab944b4",
        "transactionName": "Bday giftcard",
        "amount": 20.00,
        "description": "Gift card for Tracy's birthday",
        "createdDate": "July 18",
        "paymentDate": "August 18th",
        "recurring": false
    },
];

export class Transactions {
    private _transactions : TransactionSchema[];

    public constructor(){
        this._transactions = transactionDefault;
    }

    public get transactions(){
        return this._transactions;
    }

    public updateTransaction = (transaction : TransactionSchema) => {
        let index = this._transactions.findIndex(element => element.id === transaction.id);
        this._transactions[index] = transaction;
        console.log("Updated transaction", this._transactions[index]);
    }

    public updateTransactionByProperty = (id: string, propertyName: string, value: any) => {
        let index = this._transactions.findIndex(element => element.id === id);
        this._transactions[index][propertyName] = value; 
        console.log("Updated transaction", this._transactions[index]);
    }

    public createNewTransaction(transaction : TransactionSchema){
        this._transactions.push(transaction);
    }
}

export const TransactionsContext = React.createContext<Transactions>(
    new Transactions
);



