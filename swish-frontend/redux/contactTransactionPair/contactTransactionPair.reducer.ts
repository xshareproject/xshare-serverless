import { ContactTransactionPairActionTypes, LOAD_CONTACT_TRANSACTION_PAIRS, ADD_CONTACT_TO_TRANSACTION, REMOVE_CONTACT_FROM_TRANSACTION, REMOVE_CONTACTS_BY_TRANSACTION_ID, EDIT_AMOUNT, ADD_MULTIPLE_TRANSACTION_PAIRS } from '../types/types.actions';
import { ContactTransactionPair, PaymentStatus } from '../types/types.ContactTransactionPair';

const contactTransactionPair_INITIAL_STATE: ContactTransactionPair[] = [];

export const contactTransactionPairReducer = 
(state = contactTransactionPair_INITIAL_STATE, action: ContactTransactionPairActionTypes)
: ContactTransactionPair[] => {
    switch(action.type) {
        case LOAD_CONTACT_TRANSACTION_PAIRS:
            let contactTransactionPairsDefault : ContactTransactionPair[] = [
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eae",
                    transactionId: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
                    contactId: "1",
                    paymentStatus: PaymentStatus.Unpaid,
                    amountOwned: 12.20
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eab",
                    transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
                    contactId: "2",
                    paymentStatus: PaymentStatus.Pending,
                    amountOwned: 22.65,
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eac",
                    transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
                    contactId: "3",
                    paymentStatus: PaymentStatus.Pending,
                    amountOwned: 22.65,
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eff",
                    transactionId: "8558845a-919f-4487-a5e4-19353ab944b4",
                    contactId: "3",
                    paymentStatus: PaymentStatus.Unpaid,
                    amountOwned: 20.00,
                }
            ];
            return contactTransactionPairsDefault;        
        case ADD_CONTACT_TO_TRANSACTION:
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
        case ADD_MULTIPLE_TRANSACTION_PAIRS:
            state.concat(action.contactTransactionPairs);
        case REMOVE_CONTACT_FROM_TRANSACTION:
            let indexToRemove = state.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === action.contactId});
            state.splice(indexToRemove, 1);
            return state;
        case REMOVE_CONTACTS_BY_TRANSACTION_ID:
            let filteredContacts : ContactTransactionPair[] = state.filter((contactTransactionPair) => {return contactTransactionPair.transactionId !== action.transactionId});
            state = filteredContacts;
            return state;
        case EDIT_AMOUNT:
            let amountNum = action.amount;
            let indexToModify = state.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === action.contactId});
            let contactTransactionPairList = state;
            contactTransactionPairList[indexToModify]["amountOwned"] = amountNum;          
            return contactTransactionPairList;
        
        default:
            return state;

    }
    
}