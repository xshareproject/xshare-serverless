import { AppActions, ADD_CONTACT_TO_TRANSACTION, REMOVE_CONTACT_FROM_TRANSACTION, EDIT_AMOUNT, REMOVE_CONTACTS_BY_TRANSACTION_ID, ADD_MULTIPLE_TRANSACTION_PAIRS} from "../types/types.actions"
import { Contact } from "../types/types.Contact";
import {Transaction} from '../types/types.Transaction';
import { ContactTransactionPair } from "../types/types.ContactTransactionPair";

export const addContactToTransaction = (contact: Contact, transaction: Transaction): AppActions => ({
    type: ADD_CONTACT_TO_TRANSACTION,
    contact,
    transaction
})

export const addMultipleContactTransactionPairs = (contactTransactionPairs: ContactTransactionPair[]): AppActions => ({
    type: ADD_MULTIPLE_TRANSACTION_PAIRS,
    contactTransactionPairs
})

export const removeContactFromTransaction = (contactId: string) : AppActions => ({
    type: REMOVE_CONTACT_FROM_TRANSACTION,
    contactId
})

export const removeContactsByTransactionId = (transactionId: string) : AppActions => ({
    type: REMOVE_CONTACTS_BY_TRANSACTION_ID,
    transactionId
})

export const editAmount = (contactId: string, amount: number) : AppActions => ({
    type: EDIT_AMOUNT,
    contactId,
    amount
})