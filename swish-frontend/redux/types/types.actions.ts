
import { removeContactFromTransaction } from '../contactTransactionPair/contactTransactionPair.action'
import {Contact} from './types.contact'
import {Transaction, TRANSACTION_TYPE} from './types.transaction';

export const ADD_CONTACT_TO_TRANSACTION = "ADD_CONTACT_TO_TRANSACTION"
export const REMOVE_CONTACT_FROM_TRANSACTION = "REMOVE_CONTACT_FROM_TRANSACTION"
export const EDIT_AMOUNT = "EDIT_AMOUNT"

export interface addContactToTransactionAction {
    type: typeof ADD_CONTACT_TO_TRANSACTION,
    contact: Contact,
    transaction: Transaction
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


export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const UPDATE_TRANSACTION_BY_PROPERTY = 'UPDATE_TRANSACTION_BY_PROPERTY';
export const UPDATE_TRANSACTION_TYPE = 'UPDATE_TRANSACTION_TYPE';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

export interface updateTransactionTypeAction {
    type: typeof UPDATE_TRANSACTION_TYPE,
    transactionType: TRANSACTION_TYPE,
    transactionId: Transaction
}

export interface updateTransactionAction {
    type: typeof UPDATE_TRANSACTION,
    transaction: Transaction
}

export interface updateTransactionByPropertyAction {
    type: typeof UPDATE_TRANSACTION_BY_PROPERTY,
    id: string,
    propertyName: string,
    value: any
}

export type TransactionActionTypes = updateTransactionTypeAction | updateTransactionAction | updateTransactionByPropertyAction



//Add more as we expand our redux
export type AppActions = ContactTransactionPairActionTypes | TransactionActionTypes