import {TransactionContactPair, PaymentStatus} from '../../data_store/Contacts';
import { ContactTransactionPairActionTypes } from '../types/types.actions';
import { ContactTransactionPair } from '../types/types.ContactTransactionPair';


const contactTransactionPair_INITIAL_STATE: ContactTransactionPair[] = [];

export const contactTransactionPairReducer = 
(state = contactTransactionPair_INITIAL_STATE, action: ContactTransactionPairActionTypes)
: ContactTransactionPair[] => {
    switch(action.type) {
        case "ADD_CONTACT_TO_TRANSACTION":
            let transactionId = action.transaction.id;
            let newContactTransactionPair : ContactTransactionPair = {
                id: "",
                transactionId,
                contactId: action.contact.id,
                paymentStatus: PaymentStatus.Pending,
                amountOwned: 0
            };    
            state.push(newContactTransactionPair);
            return state;
        
        case "REMOVE_CONTACT_FROM_TRANSACTION":
            let indexToRemove = state.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === action.contactId});
            state.splice(indexToRemove, 1);
            return state;

        case "EDIT_AMOUNT":
            let amountNum = action.amount;
            let indexToModify = state.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === action.contactId});
            let contactTransactionPairList = state;
            contactTransactionPairList[indexToModify]["amountOwned"] = amountNum;          
            return contactTransactionPairList;
        
        default:
            return state;

    }
    
}