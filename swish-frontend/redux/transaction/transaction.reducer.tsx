import { CREATE_TRANSACTION, LOAD_TRANSACTIONS, UPDATE_TRANSACTION, UPDATE_TRANSACTION_BY_PROPERTY, UPDATE_TRANSACTION_TYPE, DELETE_TRANSACTION, AppActions } from '../types/types.actions';
import {Transaction, TRANSACTION_TYPE} from '../types/types.Transaction';

const transaction_INITIAL_STATE : Transaction[] = [{
    id: "",
    lenderId: "",
    transactionName: "",
    note: "",
    totalAmount: 0,
    createdDate: "",
    paymentDate: "",
    recurring: false,
    recurringId: "",
    groupId: "",
    transactionType: TRANSACTION_TYPE.STANDARD
}]


export const transactionReducer = (state = transaction_INITIAL_STATE, action: AppActions) 
: Transaction[] => {
    switch(action.type) {
        case LOAD_TRANSACTIONS:
            let transactionDefault : Transaction[] = [
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
                    "groupId": "",
                    "transactionType": TRANSACTION_TYPE.MEAL
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
                    "groupId": "",
                    "transactionType": TRANSACTION_TYPE.RECURRING
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
                    "groupId": "",
                    "transactionType": TRANSACTION_TYPE.STANDARD
                },
                {
                    "id": "122atest-e4aa-4a57-a420-818fed3060f0",
                    "lenderId": "33test-1578-4be5-87eb-e9211fedd90f",
                    "transactionName": "Test",
                    "totalAmount": 12.20,
                    "note": "Test Transaction with different lenderId",
                    "createdDate": "July 20th",
                    "paymentDate": "August 20th",
                    "recurring": false,
                    "recurringId": "",
                    "groupId": "",
                    "transactionType": TRANSACTION_TYPE.STANDARD
                },
            ];
            return transactionDefault;
        case UPDATE_TRANSACTION_TYPE:
            //find index that wants to change the transactionType
            let index = state.findIndex(transaction => transaction.id === action.transaction.id);

            return [
                //before the transaction, no need to change
                ...state.slice(0, index),
                {
                    //change this current index transaction type
                    ...state[index],
                    transactionType: action.transactionType
                },
                //rest of the transaction
                ...state.slice(index+1),
            ]
        case UPDATE_TRANSACTION:
            let indexTransaction = state.findIndex(transaction => transaction.id === action.transaction.id);
            state[indexTransaction] = action.transaction;
            return [
                ...state
            ]
        case UPDATE_TRANSACTION_BY_PROPERTY:
            let indexProperty = state.findIndex(transaction => transaction.id === action.id)
            
            return [
                ...state.slice(0,indexProperty),
                {   
                    //TypeScript throws an error because it expects value inside [] to be numeral, but action.propertyName is a string 
                    //The code is still compiled and executed correctly for now, but will require changing error-checking rule later
                    ...state[indexProperty][action.propertyName] = action.value
                },
                ...state.slice(indexProperty+1)
            ]
        default:
            return state;
    }
}
