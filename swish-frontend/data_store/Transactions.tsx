import * as React from 'react';
import harold from '../assets/images/profile_test.webp';

export interface TransactionSchema {
    id: string,
    name: string,
    description: string,
    amount: number,
    createdDate: string,
    paymentDate: string,
    image: any,
    status: PaymentStatus, 
    recurring: boolean
}

export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}

//default mockup data. Should be loaded from backend api on integration?
//Or refactored into using Redux
var transactionDefault : TransactionSchema[] = [
    {
        "id": "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        "name": "User 1",
        "amount": 12.20,
        "description": "SkipTheDishes",
        "createdDate": "July 20th",
        "paymentDate": "August 20th",
        "image": harold,
        "status": PaymentStatus.Pending,
        "recurring": false
    },
    {
        "id": "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        "name": "User 2",
        "amount": 45.30,
        "description": "Water Bill",
        "createdDate": "July 10th",
        "paymentDate": "July 31st",
        "image": harold,
        "status": PaymentStatus.Unpaid,
        "recurring": true
    },
    {
        "id": "8558845a-919f-4487-a5e4-19353ab944b4",
        "name": "User 3",
        "amount": 20.00,
        "description": "Bday giftcard",
        "createdDate": "July 18",
        "paymentDate": "August 18th",
        "image": harold,
        "status": PaymentStatus.Pending,
        "recurring": false
      }
];

export class Transactions {
    private _transactions : TransactionSchema[];

    public constructor(){
        this._transactions = transactionDefault;
    }

    public get transactions() : TransactionSchema[] {
        return this._transactions;
    }

    public updateTransactions = (transaction : TransactionSchema) => {
        let index = this._transactions.findIndex(element => element.id === transaction.id);
        this._transactions[index] = transaction;
        console.log("Updated transaction", this._transactions[index]);
    }

    public updateTransaction = (id: string, name: string, propertyName: string) => {
        let index = this._transactions.findIndex(element => element.id === id);
        this._transactions[index][propertyName] = name; 
        console.log("Updated transaction", this._transactions[index]);
    }
}

export const TransactionsContext = React.createContext<Transactions>(
    new Transactions
);



