import * as React from 'react';
import harold from '../assets/images/profile_test.webp';
import {TransactionDetailSchema, PaymentStatus} from '../schema/Schema';

//default properties. Should be loaded from backend api on integration?
//Or refactored into using Redux
export const transactions : TransactionDetailSchema[] = [
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

export const updateTransactions = (transaction : TransactionDetailSchema) => {
    console.log('Update transaction triggered');
}

//export default values
export const TransactionsContext = React.createContext({
    transactions,
    updateTransactions: (transaction : TransactionDetailSchema) => {},
});


