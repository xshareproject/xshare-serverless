import { AppActions } from '../types/types.actions';
import {Transaction, TRANSACTION_TYPE} from '../types/types.transaction';

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
        case "UPDATE_TRANSACTION_TYPE":
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
        case "UPDATE_TRANSACTION":
            let indexTransaction = state.findIndex(transaction => transaction.id === action.transaction.id);
            state[indexTransaction] = action.transaction;
            return [
                ...state
            ]
        case "UPDATE_TRANSACTION_BY_PROPERTY":
            let indexProperty = state.findIndex(transaction => transaction.id === action.id)
            
            return [
                ...state.slice(0,indexProperty),
                {   
                    //not sure why this doesn't work?
                    ...state[indexProperty][action.propertyName] = action.value

                },
                ...state.slice(indexProperty+1)
            ]
        default:
            return state;
    }
}
