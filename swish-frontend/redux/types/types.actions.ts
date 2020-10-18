
import { removeContactFromTransaction } from '../contactTransactionPair/contactTransactionPair.action'
import { addContactToTransaction } from '../transaction/transaction.actions'
import {Contact} from './types.contact'


export const ADD_CONTACT_TO_TRANSACTION = "ADD_CONTACT_TO_TRANSACTION"
export const REMOVE_CONTACT_FROM_TRANSACTION = "REMOVE_CONTACT_FROM_TRANSACTION"
export const EDIT_AMOUNT = "EDIT_AMOUNT"

export interface addContactToTransactionAction {
    type: typeof ADD_CONTACT_TO_TRANSACTION,
    contact: Contact
}

export interface removeContactFromTransactionAction {
    type: typeof REMOVE_CONTACT_FROM_TRANSACTION,
    contactId: string
}

export interface editAmountAction {
    type: typeof EDIT_AMOUNT,
    contactId: string,
    amount: number
}

export type ContactTransactionPairActionTypes = 
addContactToTransactionAction | removeContactFromTransactionAction | editAmountAction



//Add more as we expand our redux
export type AppActions = ContactTransactionPairActionTypes