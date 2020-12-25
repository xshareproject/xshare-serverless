import { CREATE_TRANSACTION, LOAD_TRANSACTIONS, UPDATE_TRANSACTION, UPDATE_TRANSACTION_BY_PROPERTY, UPDATE_TRANSACTION_TYPE, DELETE_TRANSACTION, AppActions } from '../types/types.actions';
import {Transaction, TRANSACTION_TYPE} from '../types/types.Transaction';
import * as lodash from 'lodash';
import { transactionData }from '../transaction/transaction.data';

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
            return transactionData;
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
            let transactions = lodash.cloneDeep(state);
            let transactionId = action.transaction.id;
            let indexTransaction = state.findIndex( (transaction : Transaction) => {return transaction.id == transactionId});
            transactions[indexTransaction] = action.transaction;

            let test =  [
                ...transactions,
            ];
            return test;
        case UPDATE_TRANSACTION_BY_PROPERTY:
            let indexProperty = state.findIndex(transaction => transaction.id == action.id)
            
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
